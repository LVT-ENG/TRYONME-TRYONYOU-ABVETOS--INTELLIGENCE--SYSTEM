import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PEACOCK = "#0F5E68";

export default function TryOnExperience() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tryOnMode, setTryOnMode] = useState('2d'); // 2d, 3d, ar
  const [isLoading, setIsLoading] = useState(false);

  const products = [
    { id: 1, name: "Blue Formal Blazer", category: "Jackets", image: "https://via.placeholder.com/300x400", price: "€899" },
    { id: 2, name: "Red Summer Dress", category: "Dresses", image: "https://via.placeholder.com/300x400", price: "€329" },
    { id: 3, name: "Casual Denim Jacket", category: "Jackets", image: "https://via.placeholder.com/300x400", price: "€199" },
    { id: 4, name: "Black Evening Gown", category: "Dresses", image: "https://via.placeholder.com/300x400", price: "€1299" }
  ];

  const handleTryOn = (product) => {
    setSelectedProduct(product);
    setIsLoading(true);
    // Simulate loading time for AI processing
    setTimeout(() => setIsLoading(false), 2000);
  };

  const TryOnViewer = () => (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      {isLoading ? (
        <div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🔄
          </motion.div>
          <p className="text-lg">Processing with AI...</p>
          <p className="text-sm text-gray-600">Analyzing body measurements and fabric physics</p>
        </div>
      ) : selectedProduct ? (
        <div>
          <div className="relative">
            <img 
              src="https://via.placeholder.com/400x600" 
              alt="User Avatar"
              className="mx-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
              <p className="text-sm font-semibold">{selectedProduct.name}</p>
              <p className="text-xs text-gray-600">Fit: 95% match</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setTryOnMode('2d')}
              className={`px-4 py-2 rounded-lg ${tryOnMode === '2d' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              2D View
            </button>
            <button
              onClick={() => setTryOnMode('3d')}
              className={`px-4 py-2 rounded-lg ${tryOnMode === '3d' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              3D Model
            </button>
            <button
              onClick={() => setTryOnMode('ar')}
              className={`px-4 py-2 rounded-lg ${tryOnMode === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              AR Live
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-6xl mb-4">🪞</div>
          <p className="text-lg">Select a product to start virtual try-on</p>
          <p className="text-sm text-gray-600">AI-powered fitting with real-time physics simulation</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: PEACOCK }}>
            TryOn Experience
          </h1>
          <p className="text-xl text-gray-600">
            Revolutionary virtual fitting with AI-powered fabric physics
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: PEACOCK }}>
              Select Product to Try On
            </h2>
            <div className="space-y-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className={`flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer transition-all ${
                    selectedProduct?.id === product.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleTryOn(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold" style={{ color: PEACOCK }}>{product.price}</p>
                  </div>
                  <button
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                    style={{ backgroundColor: PEACOCK }}
                  >
                    Try On
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">TryOn Features</h3>
              <div className="space-y-3">
                {[
                  { icon: "🎯", text: "95% accuracy in size fitting" },
                  { icon: "🌈", text: "Real-time color and texture matching" },
                  { icon: "📐", text: "Advanced body measurement analysis" },
                  { icon: "🎭", text: "Multiple viewing angles and poses" },
                  { icon: "📱", text: "AR mode for mobile devices" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TryOn Viewer */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: PEACOCK }}>
              Virtual Mirror
            </h2>
            <TryOnViewer />
            
            {selectedProduct && !isLoading && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Fit Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Size Match</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <span className="text-sm font-semibold">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Style Compatibility</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="text-sm font-semibold">88%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Color Match</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button
                    className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90"
                    style={{ backgroundColor: PEACOCK }}
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    Save to Wishlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technology Info */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: PEACOCK }}>
            Powered by Advanced AI Technology
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🧠", title: "Neural Networks", desc: "Deep learning for accurate body analysis" },
              { icon: "📏", title: "3D Measurements", desc: "Precise body dimension calculations" },
              { icon: "🎨", title: "Fabric Physics", desc: "Realistic material behavior simulation" },
              { icon: "⚡", title: "Real-time Processing", desc: "Instant try-on rendering" }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{tech.title}</h3>
                <p className="text-gray-600 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}