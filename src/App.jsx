import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PEACOCK = "#0F5E68";

// Simulated WebAuthn for ADBET biometric authentication
const simulateWebAuthn = async () => {
  return new Promise((resolve, reject) => {
    // Check if WebAuthn is available (modern browsers)
    if (!window.navigator.credentials) {
      console.log('🔐 WebAuthn not available, using fallback simulation');
      // Fallback simulation
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        if (success) {
          resolve({
            type: 'fingerprint_simulation',
            timestamp: new Date().toISOString(),
            authenticatorId: 'demo_authenticator_' + Math.random().toString(36).substr(2, 9)
          });
        } else {
          reject(new Error('Biometric authentication failed'));
        }
      }, 2000);
      return;
    }

    // For browsers that support WebAuthn, we'll still simulate for demo
    setTimeout(() => {
      resolve({
        type: 'webauthn_simulation',
        timestamp: new Date().toISOString(),
        authenticatorId: 'webauthn_demo_' + Math.random().toString(36).substr(2, 9)
      });
    }, 1500);
  });
};

const WebAuthnModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const [step, setStep] = useState('idle'); // idle, authenticating, success, error
  const [authResult, setAuthResult] = useState(null);

  const startAuthentication = async () => {
    setStep('authenticating');
    try {
      const result = await simulateWebAuthn();
      setAuthResult(result);
      setStep('success');
      console.log('🎉 ADBET Biometric authentication successful:', result);
      setTimeout(() => {
        onSuccess(result);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('❌ ADBET Biometric authentication failed:', error);
      setStep('error');
      onError(error);
    }
  };

  useEffect(() => {
    if (isOpen && step === 'idle') {
      startAuthentication();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            {step === 'authenticating' && (
              <motion.div
                className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
            {step === 'success' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white text-2xl"
              >
                ✓
              </motion.div>
            )}
            {step === 'error' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white text-2xl"
              >
                ✕
              </motion.div>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-2">
            {step === 'authenticating' && 'Autenticación ADBET'}
            {step === 'success' && 'Autenticación Exitosa'}
            {step === 'error' && 'Error de Autenticación'}
          </h3>
          
          <p className="text-gray-600 text-sm">
            {step === 'authenticating' && 'Coloca tu dedo en el sensor o mira la cámara para verificar tu identidad biométrica...'}
            {step === 'success' && '¡Identidad verificada! Procediendo al pago seguro...'}
            {step === 'error' && 'No se pudo verificar la identidad. Inténtalo de nuevo.'}
          </p>
        </div>

        {step === 'error' && (
          <div className="flex gap-3">
            <button
              onClick={startAuthentication}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}

        {step === 'authenticating' && (
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

const products = [
  { id: 1, name: "Luxury Jacket", price: "€1200", img: "https://via.placeholder.com/400x500" },
  { id: 2, name: "Digital Dress", price: "€980", img: "https://via.placeholder.com/400x500" },
  { id: 3, name: "Virtual Blazer", price: "€1500", img: "https://via.placeholder.com/400x500" },
  { id: 4, name: "AI Sneakers", price: "€680", img: "https://via.placeholder.com/400x500" },
  { id: 5, name: "LVT Coat", price: "€2200", img: "https://via.placeholder.com/400x500" },
  { id: 6, name: "TRYON Suit", price: "€1850", img: "https://via.placeholder.com/400x500" }
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [showWebAuthn, setShowWebAuthn] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Check for payment success/cancellation from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
      setPaymentStatus('success');
      console.log('🎉 Payment completed successfully!');
    } else if (urlParams.get('canceled')) {
      setPaymentStatus('canceled');
      console.log('❌ Payment was canceled');
    }
  }, []);

  const handleADBETPayment = async (authResult) => {
    setPaymentLoading(true);
    try {
      console.log('🚀 Starting ADBET payment flow with auth:', authResult);
      
      // Create checkout session
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selected ? Math.floor(parseFloat(selected.price.replace('€', '')) * 100) : 5000,
          currency: 'eur',
          metadata: {
            productName: selected?.name || 'ADBET Demo Product',
            authType: authResult.type,
            authenticatorId: authResult.authenticatorId
          }
        }),
      });

      const session = await response.json();

      if (session.success) {
        console.log('✅ Checkout session created, redirecting...');
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        throw new Error(session.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('❌ Error creating payment session:', error);
      setPaymentStatus('error');
    } finally {
      setPaymentLoading(false);
    }
  };

  const startADBETFlow = () => {
    console.log('🔐 Initiating ADBET biometric authentication...');
    setShowWebAuthn(true);
  };

  return (
    <div className="font-sans bg-white text-gray-900">
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-gray-100">
        <motion.h1
          className="text-5xl font-bold mb-4"
          style={{ color: PEACOCK }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TryonU Luxury Digital Workflow Experience
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Vive el futuro de la moda digital. Colecciones interactivas,
          pruebas virtuales y experiencias inmersivas.
        </motion.p>
      </section>
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: PEACOCK }}>
          Colección Exclusiva
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(p)}
            >
              <img src={p.img} alt={p.name} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-gray-500">{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: PEACOCK }}>
          Sobre TryonU
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed mb-8">
          TryonU redefine el lujo en la moda digital, fusionando experiencia
          interactiva, sostenibilidad y la tecnología más avanzada.
          Nuestro sistema conecta armarios inteligentes, pagos seguros ADBET
          y actualizaciones en tiempo real con el Fashion Trend Tracker (FTT).
        </p>
        
        {/* Payment Status Messages */}
        <AnimatePresence>
          {paymentStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-6 p-4 bg-green-100 border border-green-300 rounded-lg"
            >
              <div className="flex items-center justify-center">
                <span className="text-green-600 text-2xl mr-2">✅</span>
                <div>
                  <h3 className="font-semibold text-green-800">¡Pago Exitoso!</h3>
                  <p className="text-sm text-green-600">Tu pago ADBET ha sido procesado correctamente</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {paymentStatus === 'canceled' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg"
            >
              <div className="flex items-center justify-center">
                <span className="text-yellow-600 text-2xl mr-2">⚠️</span>
                <div>
                  <h3 className="font-semibold text-yellow-800">Pago Cancelado</h3>
                  <p className="text-sm text-yellow-600">El proceso de pago fue cancelado</p>
                </div>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-6 p-4 bg-red-100 border border-red-300 rounded-lg"
            >
              <div className="flex items-center justify-center">
                <span className="text-red-600 text-2xl mr-2">❌</span>
                <div>
                  <h3 className="font-semibold text-red-800">Error en el Pago</h3>
                  <p className="text-sm text-red-600">Hubo un problema procesando tu pago</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo ADBET Payment Button */}
        <motion.button
          onClick={startADBETFlow}
          disabled={paymentLoading}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: paymentLoading ? 1 : 1.05 }}
          whileTap={{ scale: paymentLoading ? 1 : 0.95 }}
        >
          {paymentLoading ? (
            <span className="flex items-center">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Procesando...
            </span>
          ) : (
            'Pagar con ADBET (demo)'
          )}
        </motion.button>
        
        <p className="text-xs text-gray-500 mt-3">
          💳 Tarjeta de prueba: 4242 4242 4242 4242
        </p>
      </section>
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img src={selected.img} alt={selected.name} className="w-full h-80 object-cover rounded-lg" />
            <h3 className="text-2xl font-bold mt-4">{selected.name}</h3>
            <p className="text-lg text-gray-600 mt-2">{selected.price}</p>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 px-6 py-2 rounded-xl text-white"
                style={{ backgroundColor: PEACOCK }}
              >
                Añadir al Armario Inteligente
              </button>
              <button
                onClick={startADBETFlow}
                disabled={paymentLoading}
                className="flex-1 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {paymentLoading ? 'Procesando...' : 'Pagar con ADBET (demo)'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* WebAuthn Modal */}
      <AnimatePresence>
        <WebAuthnModal
          isOpen={showWebAuthn}
          onClose={() => setShowWebAuthn(false)}
          onSuccess={handleADBETPayment}
          onError={(error) => {
            console.error('WebAuthn error:', error);
            setShowWebAuthn(false);
            setPaymentStatus('error');
          }}
        />
      </AnimatePresence>
    </div>
  );
}
