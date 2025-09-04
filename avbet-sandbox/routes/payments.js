/**
 * Biometric-verified payment routes with Stripe integration
 */

const express = require('express');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const { 
  savePaymentAttempt, 
  getPaymentById, 
  getUserByEmail,
  getPaymentHistory,
  logBiometricAttempt 
} = require('../utils/database');

const router = express.Router();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2023-10-16'
});

// Create payment intent with biometric requirement
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', email, description, metadata = {} } = req.body;

    if (!amount || amount < 50) { // Stripe minimum
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Payment amount must be at least 0.50 EUR'
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        message: 'Email is required for biometric verification'
      });
    }

    // Check if user exists and has biometric authentication set up
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        error: 'User not found',
        message: 'Please register for biometric authentication first'
      });
    }

    // Generate payment ID
    const paymentId = uuidv4();

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        paymentId,
        userId: user.id,
        requiresBiometric: 'true',
        ...metadata
      },
      description: description || 'AVBET Biometric Payment',
      confirmation_method: 'manual',
      confirm: false // Don't auto-confirm, require biometric verification first
    });

    // Save payment attempt
    await savePaymentAttempt({
      id: paymentId,
      userId: user.id,
      amount: amount / 100, // Convert cents to euros
      currency,
      status: 'pending_biometric',
      stripePaymentIntentId: paymentIntent.id,
      description,
      metadata: JSON.stringify(metadata)
    });

    res.json({
      success: true,
      data: {
        paymentId,
        clientSecret: paymentIntent.client_secret,
        amount,
        currency,
        requiresBiometric: true,
        status: 'pending_biometric'
      }
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create payment intent'
    });
  }
});

// Verify biometric before payment
router.post('/verify-biometric', async (req, res) => {
  try {
    const { paymentId, sessionToken, biometricType = 'webauthn' } = req.body;

    if (!paymentId || !sessionToken) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Payment ID and session token are required'
      });
    }

    // Get payment
    const payment = await getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found',
        message: 'Payment not found'
      });
    }

    if (payment.status !== 'pending_biometric') {
      return res.status(400).json({
        error: 'Invalid status',
        message: 'Payment is not pending biometric verification'
      });
    }

    // Verify session token (simplified - in production, use proper JWT verification)
    const [userId, timestamp] = Buffer.from(sessionToken, 'base64').toString().split(':');
    const sessionAge = Date.now() - parseInt(timestamp);
    
    if (userId !== payment.userId || sessionAge > 5 * 60 * 1000) { // 5 minutes max
      await logBiometricAttempt({
        userId: payment.userId,
        type: 'payment_biometric_verification',
        success: false,
        error: 'Invalid or expired session token',
        metadata: { paymentId }
      });

      return res.status(401).json({
        error: 'Invalid session',
        message: 'Session token is invalid or expired'
      });
    }

    // Update payment status
    await savePaymentAttempt({
      id: paymentId,
      status: 'biometric_verified',
      biometricVerifiedAt: new Date().toISOString(),
      biometricType
    });

    // Log successful biometric verification
    await logBiometricAttempt({
      userId: payment.userId,
      type: 'payment_biometric_verification',
      success: true,
      metadata: { paymentId, biometricType }
    });

    res.json({
      success: true,
      data: {
        paymentId,
        status: 'biometric_verified',
        message: 'Biometric verification successful, ready for payment'
      }
    });
  } catch (error) {
    console.error('Verify biometric error:', error);
    
    // Log error
    if (req.body.paymentId) {
      try {
        const payment = await getPaymentById(req.body.paymentId);
        if (payment) {
          await logBiometricAttempt({
            userId: payment.userId,
            type: 'payment_biometric_verification',
            success: false,
            error: error.message,
            metadata: { paymentId: req.body.paymentId }
          });
        }
      } catch (logError) {
        console.error('Error logging biometric attempt:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to verify biometric authentication'
    });
  }
});

// Process biometric-verified payment
router.post('/process', async (req, res) => {
  try {
    const { paymentId, paymentMethodId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        error: 'Missing payment ID',
        message: 'Payment ID is required'
      });
    }

    // Get payment
    const payment = await getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found',
        message: 'Payment not found'
      });
    }

    if (payment.status !== 'biometric_verified') {
      return res.status(400).json({
        error: 'Biometric verification required',
        message: 'Payment must be biometrically verified before processing'
      });
    }

    // Get the Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);

    let result;
    
    if (paymentMethodId) {
      // Attach payment method and confirm
      await stripe.paymentIntents.update(payment.stripePaymentIntentId, {
        payment_method: paymentMethodId
      });
      
      result = await stripe.paymentIntents.confirm(payment.stripePaymentIntentId);
    } else {
      // Confirm with existing payment method
      result = await stripe.paymentIntents.confirm(payment.stripePaymentIntentId);
    }

    // Update payment status based on result
    let status = 'processing';
    if (result.status === 'succeeded') {
      status = 'completed';
    } else if (result.status === 'requires_action') {
      status = 'requires_action';
    } else if (['canceled', 'failed'].includes(result.status)) {
      status = 'failed';
    }

    await savePaymentAttempt({
      id: paymentId,
      status,
      processedAt: new Date().toISOString(),
      stripeStatus: result.status
    });

    // Log payment processing
    await logBiometricAttempt({
      userId: payment.userId,
      type: 'payment_processed',
      success: status === 'completed',
      metadata: { 
        paymentId, 
        stripeStatus: result.status,
        amount: payment.amount
      }
    });

    res.json({
      success: true,
      data: {
        paymentId,
        status,
        stripeStatus: result.status,
        clientSecret: result.client_secret,
        message: status === 'completed' ? 'Payment completed successfully' : 
                status === 'requires_action' ? 'Payment requires additional action' :
                'Payment processing failed'
      }
    });
  } catch (error) {
    console.error('Process payment error:', error);
    
    // Update payment status to failed
    if (req.body.paymentId) {
      try {
        await savePaymentAttempt({
          id: req.body.paymentId,
          status: 'failed',
          processedAt: new Date().toISOString(),
          error: error.message
        });

        // Log failed payment
        const payment = await getPaymentById(req.body.paymentId);
        if (payment) {
          await logBiometricAttempt({
            userId: payment.userId,
            type: 'payment_processed',
            success: false,
            error: error.message,
            metadata: { paymentId: req.body.paymentId }
          });
        }
      } catch (logError) {
        console.error('Error logging payment failure:', logError);
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to process payment'
    });
  }
});

// Test payment with specific card
router.post('/test-card', async (req, res) => {
  try {
    const { 
      cardNumber = '4242424242424242', 
      email, 
      amount = 1000, // 10.00 EUR
      description = 'AVBET Test Payment'
    } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        message: 'Email is required for test payment'
      });
    }

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        error: 'User not found',
        message: 'Please register for biometric authentication first'
      });
    }

    // Create test payment method
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: 12,
        exp_year: 2030,
        cvc: '123'
      }
    });

    // Create payment intent with test card
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method: paymentMethod.id,
      confirmation_method: 'manual',
      confirm: false,
      metadata: {
        userId: user.id,
        testCard: cardNumber,
        requiresBiometric: 'true'
      },
      description: `${description} (Test Card: ${cardNumber})`
    });

    // Generate payment ID and save
    const paymentId = uuidv4();
    await savePaymentAttempt({
      id: paymentId,
      userId: user.id,
      amount: amount / 100,
      currency: 'eur',
      status: 'pending_biometric',
      stripePaymentIntentId: paymentIntent.id,
      description: `${description} (Test)`,
      metadata: JSON.stringify({ testCard: cardNumber })
    });

    res.json({
      success: true,
      data: {
        paymentId,
        clientSecret: paymentIntent.client_secret,
        paymentMethodId: paymentMethod.id,
        amount,
        currency: 'eur',
        testCard: cardNumber,
        cardType: getCardType(cardNumber),
        status: 'pending_biometric',
        message: 'Test payment created. Complete biometric verification to process.'
      }
    });
  } catch (error) {
    console.error('Test card payment error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create test payment'
    });
  }
});

// Get payment history for user
router.get('/history/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found'
      });
    }

    const payments = await getPaymentHistory(user.id, parseInt(limit), parseInt(offset));

    res.json({
      success: true,
      data: {
        payments,
        total: payments.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get payment history'
    });
  }
});

// Get payment status
router.get('/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found',
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        biometricType: payment.biometricType,
        createdAt: payment.createdAt,
        biometricVerifiedAt: payment.biometricVerifiedAt,
        processedAt: payment.processedAt
      }
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get payment status'
    });
  }
});

// Helper function to determine card type
function getCardType(cardNumber) {
  const testCards = {
    '4242424242424242': 'Visa (Success)',
    '4000000000000002': 'Visa (Decline)',
    '4000002500003155': 'Visa (Requires Authentication)',
    '5555555555554444': 'Mastercard (Success)',
    '2223003122003222': 'Mastercard (Success)',
    '4000000000000069': 'Visa (Expired)',
    '4000000000000127': 'Visa (Incorrect CVC)'
  };

  return testCards[cardNumber] || 'Unknown Test Card';
}

module.exports = router;