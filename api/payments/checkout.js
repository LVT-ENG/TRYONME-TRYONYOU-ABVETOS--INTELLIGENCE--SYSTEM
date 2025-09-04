import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount = 5000, currency = 'eur', metadata = {} } = req.body;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'ADBET Biometric Payment Demo',
              description: 'Pago de prueba con autenticación biométrica simulada',
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:3000'}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/?canceled=true`,
      metadata: {
        type: 'adbet_demo',
        ...metadata,
      },
    });

    console.log('💳 Checkout session created:', {
      sessionId: session.id,
      amount: amount,
      currency: currency,
      url: session.url
    });

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}