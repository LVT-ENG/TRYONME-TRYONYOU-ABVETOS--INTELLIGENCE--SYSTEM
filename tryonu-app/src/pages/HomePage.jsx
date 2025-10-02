import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackFashionEvent, captureException } from "../sentry.js";

const PEACOCK = "#0F5E68";

const products = [
  { id: 1, name: "Luxury Jacket", price: "€1200", img: "https://via.placeholder.com/400x500" },
  { id: 2, name: "Digital Dress", price: "€980", img: "https://via.placeholder.com/400x500" },
  { id: 3, name: "Virtual Blazer", price: "€1500", img: "https://via.placeholder.com/400x500" },
  { id: 4, name: "AI Sneakers", price: "€680", img: "https://via.placeholder.com/400x500" },
  { id: 5, name: "LVT Coat", price: "€2200", img: "https://via.placeholder.com/400x500" },
  { id: 6, name: "TRYON Suit", price: "€1850", img: "https://via.placeholder.com/400x500" }
];

export default function HomePage() {
  const [selected, setSelected] = useState(null);

  // Track page view
  useEffect(() => {
    try {
      trackFashionEvent("home_page_view", {
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

  return (
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
          className="text-xl text-gray-600 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Revolutionizing fashion with AI-powered recommendations, virtual try-on, and biometric payments
        </motion.p>

        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="px-8 py-3 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: PEACOCK }}
            // Removed direct DOM style mutation; use Tailwind hover utility below
            // onMouseEnter and onMouseLeave removed
            // Use Tailwind's arbitrary value for hover background
            className="px-8 py-3 text-white font-semibold rounded-lg transition-colors hover:bg-[#0d4f57]"
          >
            Get Started
          </button>
          <button className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PEACOCK }}>
            Featured Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`cursor-pointer rounded-lg p-6 transition-all duration-300 ${
                  selected?.id === product.id ? 'bg-gray-100 scale-105' : 'bg-white hover:bg-gray-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleProductSelect(product)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold" style={{ color: PEACOCK }}>{product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12" style={{ color: PEACOCK }}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "👗", title: "Virtual Wardrobe", desc: "AI-powered closet management" },
              { icon: "🪞", title: "AR Try-On", desc: "Real-time virtual fitting" },
              { icon: "💳", title: "Biometric Payment", desc: "Secure iris + voice authentication" },
              { icon: "🎯", title: "Smart Recommendations", desc: "Personalized style suggestions" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}