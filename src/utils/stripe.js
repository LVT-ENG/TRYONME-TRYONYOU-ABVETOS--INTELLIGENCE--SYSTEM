/**
 * STRIPE INTEGRATION - TRYONYOU ULTRA V9.0
 * Sistema de monetización con Stripe
 * Version 9.0 "L'Ajustement Parfait"
 */

// Cargar Stripe desde CDN o instalación npm
// npm install @stripe/stripe-js

import { loadStripe } from '@stripe/stripe-js';

// Clave pública de Stripe (sandbox/test mode)
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_PLACEHOLDER';

let stripePromise;

/**
 * Inicializar Stripe
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

/**
 * Crear sesión de checkout para suscripción
 */
export const createSubscriptionCheckout = async (priceId) => {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        mode: 'subscription',
      }),
    });

    const session = await response.json();
    
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Crear sesión de checkout para compra única
 */
export const createOneTimeCheckout = async (priceId) => {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        mode: 'payment',
      }),
    });

    const session = await response.json();
    
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Planes de precios disponibles
 */
export const PRICING_PLANS = {
  PILOT_MONTHLY: {
    id: 'pilot_monthly',
    name: 'Pilot Access - Monthly',
    price: 29.99,
    currency: 'EUR',
    interval: 'month',
    features: [
      'Acceso completo al piloto Lafayette v9 "L\'Ajustement Parfait"',
      'Escaneo biométrico ilimitado (99.7% precisión)',
      'Recomendaciones personalizadas IA',
      'Sistema Zero-Display (sin números visibles)',
      'Reserva QR Code en cabinas',
      'Soporte por email',
    ],
  },
  PILOT_YEARLY: {
    id: 'pilot_yearly',
    name: 'Pilot Access - Yearly',
    price: 299.99,
    currency: 'EUR',
    interval: 'year',
    features: [
      'Acceso completo al piloto Lafayette v9 "L\'Ajustement Parfait"',
      'Escaneo biométrico ilimitado (99.7% precisión)',
      'Recomendaciones personalizadas IA',
      'Sistema Zero-Display (sin números visibles)',
      'Reserva QR Code en cabinas',
      'Soporte prioritario',
      'Ahorra 2 meses (17% descuento)',
    ],
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise License',
    price: 9999.99,
    currency: 'EUR',
    type: 'one_time',
    features: [
      'Licencia empresarial completa',
      'Implementación personalizada',
      'Soporte dedicado 24/7',
      'Integración con sistemas existentes',
      'Formación del equipo',
      'SLA garantizado',
    ],
  },
};

/**
 * Formatear precio para mostrar
 */
export const formatPrice = (price, currency = 'EUR') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(price);
};

/**
 * Verificar estado de suscripción
 */
export const checkSubscriptionStatus = async (userId) => {
  try {
    const response = await fetch(`/api/stripe/subscription-status?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return { active: false, error: error.message };
  }
};

/**
 * Cancelar suscripción
 */
export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await fetch('/api/stripe/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};
