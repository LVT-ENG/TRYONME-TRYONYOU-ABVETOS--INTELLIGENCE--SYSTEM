# ADBET Stripe Integration - Setup Guide

## 🚀 Configuración rápida

### 1. Variables de entorno

Crea o actualiza tu archivo `.env.local` con tus claves de Stripe:

```bash
# Stripe Test Keys (obtén las tuyas en https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY_TEST=sk_test_tu_clave_secreta_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui
```

### 2. Configurar webhook en Stripe

1. Ve a [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Crea un nuevo webhook con URL: `https://tu-dominio.vercel.app/api/payments/webhook`
3. Selecciona estos eventos:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copia el webhook secret a tu `.env.local`

### 3. Deploy en Vercel

```bash
npm run build
vercel --prod
```

## 🧪 Testing del flujo ADBET

### Flujo completo:
1. Visita tu aplicación desplegada
2. Haz clic en "Pagar con ADBET (demo)"
3. Espera la simulación biométrica (1-2 segundos)
4. Serás redirigido a Stripe Checkout
5. Usa la tarjeta de prueba: `4242 4242 4242 4242`
   - Fecha: cualquier fecha futura
   - CVC: cualquier 3 dígitos
   - Código postal: cualquier código
6. Completa el pago
7. Serás redirigido con mensaje de éxito

### Logs esperados:

**En el navegador (consola):**
```
🔐 Initiating ADBET biometric authentication...
🎉 ADBET Biometric authentication successful: {type: "webauthn_simulation", ...}
🚀 Starting ADBET payment flow with auth: {...}
✅ Checkout session created, redirecting...
```

**En Vercel Functions (logs):**
```
💳 Checkout session created: {sessionId: "cs_...", amount: 5000, currency: "eur"}
🎣 Webhook received: checkout.session.completed
✅ Payment successful! {sessionId: "cs_...", paymentStatus: "paid", ...}
📊 ADBET Demo Payment Registered: {timestamp: "...", type: "adbet_biometric_demo", ...}
```

## 🎯 Características implementadas

- ✅ **Simulación WebAuthn**: Biometría simulada con fallback
- ✅ **Stripe Checkout**: Sesiones de pago completas
- ✅ **Webhook handling**: Registro automático de pagos
- ✅ **UI responsiva**: Estados de loading, éxito y error
- ✅ **Metadata ADBET**: Tracking de autenticación biométrica
- ✅ **Multi-producto**: Precios dinámicos según selección

## 🔧 Troubleshooting

### Error 404 en `/api/payments/*`
- Asegúrate de estar probando en el dominio desplegado de Vercel, no en localhost
- Los endpoints `/api/*` solo funcionan en producción con Vercel

### Webhook no recibe eventos
- Verifica que la URL del webhook sea correcta
- Confirma que el `STRIPE_WEBHOOK_SECRET` coincida
- Revisa los logs en Stripe Dashboard > Webhooks > Attempts

### Error en autenticación biométrica
- Es una simulación, debería funcionar en el 90% de los casos
- Si falla, usar el botón "Reintentar" del modal

## 📱 Compatibilidad

- ✅ Chrome/Safari/Firefox (escritorio y móvil)
- ✅ iOS Safari (con simulación de Face ID)
- ✅ Android Chrome (con simulación de huella)
- ✅ Dispositivos sin WebAuthn (fallback automático)