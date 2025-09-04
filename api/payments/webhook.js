import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const body = req.body;

  let event;

  try {
    // For demo purposes, we'll skip signature verification if no secret is configured
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } else {
      // Parse the body as JSON for demo
      event = typeof body === 'string' ? JSON.parse(body) : body;
      console.log('⚠️  Webhook signature verification skipped (demo mode)');
    }
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  console.log('🎣 Webhook received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('✅ Payment successful!', {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          amountTotal: session.amount_total,
          currency: session.currency,
          customerEmail: session.customer_details?.email,
          metadata: session.metadata
        });
        
        // Here you would typically:
        // 1. Update your database
        // 2. Send confirmation emails
        // 3. Trigger fulfillment processes
        // 4. Log for analytics
        
        // For demo, we'll just log to console
        console.log('📊 ADBET Demo Payment Registered:', {
          timestamp: new Date().toISOString(),
          sessionId: session.id,
          type: 'adbet_biometric_demo',
          amount: session.amount_total / 100, // Convert from cents
          currency: session.currency,
          status: 'completed'
        });
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('💰 PaymentIntent succeeded:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('❌ Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`🔔 Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true, eventType: event.type });

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed', message: error.message });
  }
}

// Configure the API route to accept raw body for Stripe webhooks
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}