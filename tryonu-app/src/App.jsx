import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackFashionEvent, captureException, SentryErrorBoundary } from "./sentry.js";
import MetricsDashboard from "./MetricsDashboard.jsx";

const PEACOCK = "#0F5E68";

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
  const [currentView, setCurrentView] = useState('app'); // 'app' or 'dashboard'

  // Track app initialization
  useEffect(() => {
    try {
      trackFashionEvent("app_loaded", {
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
    } catch (error) {
      captureException(error);
    }
  }, []);

  // Handle product selection with tracking
  const handleProductSelect = (product) => {
    try {
      setSelected(product);
      trackFashionEvent("product_view", {
        productId: product.id,
        productName: product.name,
        price: product.price,
        timestamp: Date.now()
      });
    } catch (error) {
      captureException(error);
    }
  };

  // Navigation component
  const Navigation = () => (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      <button
        onClick={() => setCurrentView('app')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentView === 'app'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border'
        }`}
      >
        Fashion App
      </button>
      <button
        onClick={() => setCurrentView('dashboard')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentView === 'dashboard'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border'
        }`}
      >
        📊 Dashboard
      </button>
    </div>
  );

  return (
    <SentryErrorBoundary fallback={({ error, resetError }) => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">We're working to fix this issue. Please try again.</p>
          <button 
            onClick={resetError}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )}>
      <Navigation />
      
      {currentView === 'dashboard' ? (
        <MetricsDashboard />
      ) : (
        <div className="font-sans bg-white text-gray-900">
      {/* Hero Section */}
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

      {/* Shop Grid */}
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
              onClick={() => handleProductSelect(p)}
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

      {/* About */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: PEACOCK }}>
          Sobre TryonU
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          TryonU redefine el lujo en la moda digital, fusionando experiencia
          interactiva, sostenibilidad y la tecnología más avanzada.
          Nuestro sistema conecta armarios inteligentes, pagos seguros ADBET
          y actualizaciones en tiempo real con el Fashion Trend Tracker (FTT).
        </p>
      </section>

      {/* Modal */}
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
              onClick={() => {
                try {
                  trackFashionEvent("product_close", {
                    productId: selected.id,
                    productName: selected.name,
                    viewDuration: Date.now() // Could calculate actual duration
                  });
                  setSelected(null);
                } catch (error) {
                  captureException(error);
                  setSelected(null);
                }
              }}
            >
              ✕
            </button>
            <img src={selected.img} alt={selected.name} className="w-full h-80 object-cover rounded-lg" />
            <h3 className="text-2xl font-bold mt-4">{selected.name}</h3>
            <p className="text-lg text-gray-600 mt-2">{selected.price}</p>
            <button
              className="mt-6 px-6 py-2 rounded-xl text-white"
              style={{ backgroundColor: PEACOCK }}
              onClick={() => {
                try {
                  trackFashionEvent("purchase_intent", {
                    productId: selected.id,
                    productName: selected.name,
                    price: selected.price,
                    timestamp: Date.now()
                  });
                  // Here you would normally integrate with shopping cart/checkout
                  alert(`${selected.name} añadido al Armario Inteligente`);
                } catch (error) {
                  captureException(error);
                }
              }}
            >
              Añadir al Armario Inteligente
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
      )}
    </SentryErrorBoundary>
  );
}
