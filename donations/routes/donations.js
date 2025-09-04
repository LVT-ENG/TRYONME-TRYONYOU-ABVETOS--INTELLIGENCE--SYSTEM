/**
 * Donations routes - PayPal and Stripe integration
 */

const express = require('express');
const paypal = require('paypal-rest-sdk');
const Stripe = require('stripe');
const { generateReceiptPDF } = require('../utils/pdf-generator');
const { sendReceiptEmail } = require('../utils/email-sender');
const { saveDonation, getDonationById } = require('../utils/database');

const router = express.Router();

// Initialize payment gateways
paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID || 'demo',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || 'demo'
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2023-10-16'
});

// Create PayPal donation
router.post('/paypal/create', async (req, res) => {
  try {
    const { amount, currency = 'EUR', donorInfo, clothingItems } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Donation amount must be at least 1 EUR'
      });
    }

    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: `${process.env.BASE_URL || 'http://localhost:3002'}/api/donations/paypal/success`,
        cancel_url: `${process.env.BASE_URL || 'http://localhost:3002'}/api/donations/paypal/cancel`
      },
      transactions: [{
        item_list: {
          items: [{
            name: 'Armario Solidario Donation',
            sku: 'DONATION',
            price: amount.toString(),
            currency: currency,
            quantity: 1
          }]
        },
        amount: {
          currency: currency,
          total: amount.toString()
        },
        description: `Donation to Armario Solidario - Solidarity Wardrobe${clothingItems ? ` (${clothingItems.length} items)` : ''}`
      }]
    };

    // Save donation in database (pending status)
    const donationId = await saveDonation({
      amount,
      currency,
      status: 'pending',
      paymentMethod: 'paypal',
      donorInfo,
      clothingItems: clothingItems || []
    });

    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        console.error('PayPal error:', error);
        return res.status(500).json({
          error: 'Payment creation failed',
          message: error.message
        });
      }

      const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
      
      res.json({
        success: true,
        data: {
          donationId,
          paymentId: payment.id,
          approvalUrl,
          amount,
          currency
        }
      });
    });
  } catch (error) {
    console.error('PayPal donation creation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create PayPal donation'
    });
  }
});

// PayPal success callback
router.get('/paypal/success', async (req, res) => {
  try {
    const { paymentId, PayerID } = req.query;

    if (!paymentId || !PayerID) {
      return res.status(400).send('Missing payment parameters');
    }

    paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, payment) => {
      if (error) {
        console.error('PayPal execution error:', error);
        return res.status(500).send('Payment execution failed');
      }

      if (payment.state === 'approved') {
        // Update donation status
        await saveDonation({
          paymentId,
          status: 'completed',
          paypalTransactionId: payment.transactions[0].related_resources[0].sale.id
        });

        // Generate receipt and send email
        const donation = await getDonationById(paymentId);
        await processSuccessfulDonation(donation);

        res.send(`
          <html>
            <head><title>Donation Successful</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px;">
              <h1>🎉 Thank you for your donation!</h1>
              <p>Your donation to Armario Solidario has been processed successfully.</p>
              <p>You will receive a receipt via email shortly.</p>
              <p><a href="/">Make another donation</a></p>
            </body>
          </html>
        `);
      } else {
        res.status(400).send('Payment was not approved');
      }
    });
  } catch (error) {
    console.error('PayPal success handling error:', error);
    res.status(500).send('Error processing successful payment');
  }
});

// PayPal cancel callback
router.get('/paypal/cancel', (req, res) => {
  res.send(`
    <html>
      <head><title>Donation Cancelled</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>😔 Donation Cancelled</h1>
        <p>Your donation was cancelled. No charges were made.</p>
        <p><a href="/">Try again</a></p>
      </body>
    </html>
  `);
});

// Create Stripe donation intent
router.post('/stripe/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', donorInfo, clothingItems } = req.body;

    if (!amount || amount < 50) { // Stripe minimum is 50 cents
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Donation amount must be at least 0.50 EUR'
      });
    }

    // Save donation in database (pending status)
    const donationId = await saveDonation({
      amount: amount / 100, // Convert cents to euros
      currency,
      status: 'pending',
      paymentMethod: 'stripe',
      donorInfo,
      clothingItems: clothingItems || []
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
      metadata: {
        donationId: donationId.toString(),
        purpose: 'armario_solidario'
      },
      description: `Donation to Armario Solidario - Solidarity Wardrobe`
    });

    res.json({
      success: true,
      data: {
        donationId,
        clientSecret: paymentIntent.client_secret,
        amount,
        currency
      }
    });
  } catch (error) {
    console.error('Stripe intent creation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create Stripe payment intent'
    });
  }
});

// Stripe webhook for payment confirmation
router.post('/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const donationId = paymentIntent.metadata.donationId;

      // Update donation status
      await saveDonation({
        id: donationId,
        status: 'completed',
        stripePaymentIntentId: paymentIntent.id
      });

      // Generate receipt and send email
      const donation = await getDonationById(donationId);
      await processSuccessfulDonation(donation);
    }

    res.json({received: true});
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(500).json({error: 'Webhook processing failed'});
  }
});

// Get donation status
router.get('/:donationId/status', async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await getDonationById(donationId);

    if (!donation) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Donation not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: donation.id,
        amount: donation.amount,
        currency: donation.currency,
        status: donation.status,
        createdAt: donation.createdAt,
        paymentMethod: donation.paymentMethod
      }
    });
  } catch (error) {
    console.error('Get donation status error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get donation status'
    });
  }
});

// Get donation statistics
router.get('/stats', async (req, res) => {
  try {
    // Mock statistics - in real implementation, query database
    const stats = {
      totalDonations: Math.floor(Math.random() * 10000) + 5000,
      totalAmount: Math.floor(Math.random() * 50000) + 25000,
      itemsRedistributed: Math.floor(Math.random() * 5000) + 2500,
      activeVolunteers: Math.floor(Math.random() * 100) + 50,
      thisMonth: {
        donations: Math.floor(Math.random() * 500) + 200,
        amount: Math.floor(Math.random() * 2000) + 1000
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to get donation statistics'
    });
  }
});

// Helper function to process successful donations
async function processSuccessfulDonation(donation) {
  try {
    // Generate PDF receipt
    const receiptPath = await generateReceiptPDF(donation);
    
    // Send email with receipt
    if (donation.donorInfo && donation.donorInfo.email) {
      await sendReceiptEmail(donation.donorInfo.email, donation, receiptPath);
    }
    
    console.log(`✅ Donation ${donation.id} processed successfully`);
  } catch (error) {
    console.error('Error processing successful donation:', error);
  }
}

module.exports = router;