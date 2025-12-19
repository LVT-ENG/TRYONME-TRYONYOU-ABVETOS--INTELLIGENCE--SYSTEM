import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Demo = () => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedGarment, setSelectedGarment] = useState('blazer')

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  
  const garments = [
    { id: 'blazer', name: 'Navy Blazer', brand: 'TRYONYOU Collection', price: 189, fit: 94 },
    { id: 'shirt', name: 'White Oxford Shirt', brand: 'TRYONYOU Collection', price: 79, fit: 97 },
    { id: 'trousers', name: 'Tailored Trousers', brand: 'TRYONYOU Collection', price: 129, fit: 91 },
  ]

  const selectedGarmentData = garments.find(g => g.id === selectedGarment)

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Virtual Try-On Demo
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience how TRYONYOU technology matches garments to your body measurements
          </p>
        </div>
      </section>

      {/* Main Demo Area */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Garment Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Select Garment</h2>
              {garments.map((garment) => (
                <motion.button
                  key={garment.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGarment(garment.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedGarment === garment.id
                      ? 'bg-blue-500/20 border-2 border-blue-500'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold text-white">{garment.name}</div>
                  <div className="text-sm text-white/60">{garment.brand}</div>
                  <div className="text-sm text-blue-400 mt-1">${garment.price}</div>
                </motion.button>
              ))}
            </div>

            {/* Center - Avatar Display */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[3/4] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10">
                {/* Human Avatar - Realistic silhouette representation */}
                <svg 
                  viewBox="0 0 200 300" 
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background gradient */}
                  <defs>
                    <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4A574" />
                      <stop offset="100%" stopColor="#C4956A" />
                    </linearGradient>
                    <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3D2314" />
                      <stop offset="100%" stopColor="#2A1810" />
                    </linearGradient>
                    <linearGradient id="blazerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E3A5F" />
                      <stop offset="100%" stopColor="#152A45" />
                    </linearGradient>
                    <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F0F0F0" />
                    </linearGradient>
                    <linearGradient id="trousersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2C3E50" />
                      <stop offset="100%" stopColor="#1A252F" />
                    </linearGradient>
                  </defs>

                  {/* Hair */}
                  <ellipse cx="100" cy="45" rx="28" ry="30" fill="url(#hairGradient)" />
                  
                  {/* Head */}
                  <ellipse cx="100" cy="55" rx="22" ry="26" fill="url(#skinGradient)" />
                  
                  {/* Neck */}
                  <rect x="92" y="78" width="16" height="15" fill="url(#skinGradient)" />

                  {/* Shirt collar visible */}
                  <path d="M85 90 L100 100 L115 90 L115 95 L100 105 L85 95 Z" fill="url(#shirtGradient)" />

                  {/* Torso - Blazer or Shirt */}
                  {selectedGarment === 'blazer' ? (
                    <>
                      {/* Blazer */}
                      <path d="M70 93 L85 90 L100 95 L115 90 L130 93 L135 180 L65 180 Z" fill="url(#blazerGradient)" />
                      {/* Blazer lapels */}
                      <path d="M85 90 L95 110 L100 95 L105 110 L115 90 L100 100 Z" fill="url(#shirtGradient)" />
                      {/* Blazer buttons */}
                      <circle cx="100" cy="130" r="3" fill="#1A1A1A" />
                      <circle cx="100" cy="150" r="3" fill="#1A1A1A" />
                    </>
                  ) : selectedGarment === 'shirt' ? (
                    <>
                      {/* Shirt */}
                      <path d="M75 93 L85 90 L100 95 L115 90 L125 93 L130 180 L70 180 Z" fill="url(#shirtGradient)" />
                      {/* Shirt buttons */}
                      <circle cx="100" cy="110" r="2" fill="#CCCCCC" />
                      <circle cx="100" cy="125" r="2" fill="#CCCCCC" />
                      <circle cx="100" cy="140" r="2" fill="#CCCCCC" />
                      <circle cx="100" cy="155" r="2" fill="#CCCCCC" />
                    </>
                  ) : (
                    <>
                      {/* Default shirt for trousers selection */}
                      <path d="M75 93 L85 90 L100 95 L115 90 L125 93 L130 180 L70 180 Z" fill="url(#shirtGradient)" />
                    </>
                  )}

                  {/* Arms */}
                  <path d="M70 93 L55 100 L45 160 L55 162 L62 110 L70 100 Z" fill={selectedGarment === 'blazer' ? 'url(#blazerGradient)' : 'url(#shirtGradient)'} />
                  <path d="M130 93 L145 100 L155 160 L145 162 L138 110 L130 100 Z" fill={selectedGarment === 'blazer' ? 'url(#blazerGradient)' : 'url(#shirtGradient)'} />
                  
                  {/* Hands */}
                  <ellipse cx="50" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
                  <ellipse cx="150" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />

                  {/* Trousers */}
                  <path d="M70 178 L75 280 L95 280 L100 200 L105 280 L125 280 L130 178 Z" fill={selectedGarment === 'trousers' ? 'url(#trousersGradient)' : '#34495E'} />
                  
                  {/* Belt */}
                  <rect x="68" y="175" width="64" height="8" fill="#1A1A1A" rx="2" />
                  <rect x="96" y="176" width="8" height="6" fill="#B8860B" rx="1" />

                  {/* Facial features */}
                  <ellipse cx="92" cy="50" rx="3" ry="2" fill="#2A1810" />
                  <ellipse cx="108" cy="50" rx="3" ry="2" fill="#2A1810" />
                  <path d="M96 60 Q100 63 104 60" stroke="#8B6914" strokeWidth="1.5" fill="none" />
                  <path d="M93 68 Q100 72 107 68" stroke="#C4956A" strokeWidth="2" fill="none" />
                </svg>

                {/* Fit indicator overlay */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-xs text-white/60">Fit Score</div>
                  <div className="text-2xl font-bold text-green-400">{selectedGarmentData?.fit}%</div>
                </div>
              </div>

              {/* Size selector */}
              <div className="mt-6 w-full max-w-md">
                <h3 className="text-sm font-medium text-white/60 mb-3">Select Size</h3>
                <div className="flex gap-2 justify-center">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Fit Analysis */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Fit Analysis</h2>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-white mb-4">{selectedGarmentData?.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Shoulder Fit</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Chest Fit</span>
                      <span className="text-green-400">Good</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Waist Fit</span>
                      <span className="text-blue-400">Optimal</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Length</span>
                      <span className="text-green-400">Perfect</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-white mb-3">Recommendation</h3>
                <p className="text-white/70 text-sm">
                  Based on your measurements, size <span className="text-blue-400 font-semibold">{selectedSize}</span> provides 
                  the best fit for this {selectedGarmentData?.name.toLowerCase()}. The garment will sit comfortably 
                  across your shoulders with optimal room in the chest area.
                </p>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
                Add to Cart - ${selectedGarmentData?.price}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Input Measurements</h3>
              <p className="text-white/60 text-sm">Enter your body measurements or use our 3D scanning technology</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">AI Analysis</h3>
              <p className="text-white/60 text-sm">Our algorithm compares your measurements with garment specifications</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Perfect Fit</h3>
              <p className="text-white/60 text-sm">Get personalized size recommendations with confidence scores</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Demo
