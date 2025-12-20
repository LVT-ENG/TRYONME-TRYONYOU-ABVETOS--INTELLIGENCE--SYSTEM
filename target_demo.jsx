import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Demo = () => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedGarment, setSelectedGarment] = useState('blazer')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  
  const garments = [
    { 
      id: 'blazer', 
      name: 'Navy Blazer', 
      brand: 'TRYONYOU Collection', 
      price: 189, 
      fit: 94,
      shoulder: 95,
      chest: 88,
      waist: 92,
      length: 98,
      description: 'Classic navy blazer with modern tailoring'
    },
    { 
      id: 'shirt', 
      name: 'White Oxford Shirt', 
      brand: 'TRYONYOU Collection', 
      price: 79, 
      fit: 97,
      shoulder: 98,
      chest: 95,
      waist: 94,
      length: 96,
      description: 'Crisp white oxford with button-down collar'
    },
    { 
      id: 'trousers', 
      name: 'Tailored Trousers', 
      brand: 'TRYONYOU Collection', 
      price: 129, 
      fit: 91,
      shoulder: 0,
      chest: 0,
      waist: 93,
      length: 89,
      description: 'Slim-fit trousers with premium fabric'
    },
    { 
      id: 'tshirt', 
      name: 'Premium T-Shirt', 
      brand: 'TRYONYOU Collection', 
      price: 49, 
      fit: 96,
      shoulder: 97,
      chest: 96,
      waist: 95,
      length: 94,
      description: 'Soft cotton crew neck tee'
    },
    { 
      id: 'jacket', 
      name: 'Leather Jacket', 
      brand: 'TRYONYOU Collection', 
      price: 349, 
      fit: 89,
      shoulder: 91,
      chest: 87,
      waist: 88,
      length: 92,
      description: 'Classic leather jacket with zip closure'
    },
  ]

  const selectedGarmentData = garments.find(g => g.id === selectedGarment)

  const handleGarmentChange = (garmentId) => {
    if (garmentId !== selectedGarment) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedGarment(garmentId)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 300)
      }, 200)
    }
  }

  const getFitLabel = (value) => {
    if (value >= 95) return { text: 'Perfect', color: 'text-green-400' }
    if (value >= 90) return { text: 'Excellent', color: 'text-green-400' }
    if (value >= 85) return { text: 'Good', color: 'text-blue-400' }
    if (value >= 80) return { text: 'Fair', color: 'text-yellow-400' }
    return { text: 'Adjust', color: 'text-orange-400' }
  }

  const getBarColor = (value) => {
    if (value >= 95) return 'bg-green-500'
    if (value >= 90) return 'bg-green-500'
    if (value >= 85) return 'bg-blue-500'
    if (value >= 80) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  // Avatar SVG Component with garment rendering
  const AvatarSVG = () => {
    const renderTorso = () => {
      switch (selectedGarment) {
        case 'blazer':
          return (
            <g>
              {/* Blazer body */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M70 93 L85 90 L100 95 L115 90 L130 93 L135 180 L65 180 Z" 
                fill="url(#blazerGradient)" 
              />
              {/* Blazer lapels */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                d="M85 90 L95 115 L100 95 L105 115 L115 90 L100 100 Z" 
                fill="url(#shirtGradient)" 
              />
              {/* Pocket details */}
              <motion.rect 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                x="75" y="140" width="15" height="2" fill="#152A45" rx="1"
              />
              <motion.rect 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                x="110" y="140" width="15" height="2" fill="#152A45" rx="1"
              />
              {/* Blazer buttons */}
              <motion.circle 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                cx="100" cy="130" r="3" fill="#1A1A1A" 
              />
              <motion.circle 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                cx="100" cy="150" r="3" fill="#1A1A1A" 
              />
              {/* Arms with blazer */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M70 93 L55 100 L45 160 L55 162 L62 110 L70 100 Z" 
                fill="url(#blazerGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M130 93 L145 100 L155 160 L145 162 L138 110 L130 100 Z" 
                fill="url(#blazerGradient)" 
              />
            </g>
          )
        case 'shirt':
          return (
            <g>
              {/* Shirt body */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L85 90 L100 95 L115 90 L125 93 L130 180 L70 180 Z" 
                fill="url(#shirtGradient)" 
              />
              {/* Collar */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                d="M85 90 L92 100 L100 95 L108 100 L115 90 L100 85 Z" 
                fill="#E8E8E8" 
              />
              {/* Shirt buttons */}
              {[110, 125, 140, 155, 170].map((y, i) => (
                <motion.circle 
                  key={y}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + i * 0.05 }}
                  cx="100" cy={y} r="2" fill="#CCCCCC" 
                />
              ))}
              {/* Arms with shirt */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L55 100 L45 160 L55 162 L62 110 L75 100 Z" 
                fill="url(#shirtGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M125 93 L145 100 L155 160 L145 162 L138 110 L125 100 Z" 
                fill="url(#shirtGradient)" 
              />
            </g>
          )
        case 'tshirt':
          return (
            <g>
              {/* T-shirt body */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L85 88 L100 90 L115 88 L125 93 L130 180 L70 180 Z" 
                fill="url(#tshirtGradient)" 
              />
              {/* Crew neck */}
              <motion.ellipse 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                cx="100" cy="92" rx="12" ry="6" fill="#1A1A1A" 
              />
              {/* Arms with t-shirt (short sleeves) */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L60 100 L55 125 L65 127 L68 110 L75 100 Z" 
                fill="url(#tshirtGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M125 93 L140 100 L145 125 L135 127 L132 110 L125 100 Z" 
                fill="url(#tshirtGradient)" 
              />
              {/* Bare forearms */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                d="M55 125 L45 160 L55 162 L65 127 Z" 
                fill="url(#skinGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                d="M145 125 L155 160 L145 162 L135 127 Z" 
                fill="url(#skinGradient)" 
              />
            </g>
          )
        case 'jacket':
          return (
            <g>
              {/* Leather jacket body */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M68 93 L85 88 L100 92 L115 88 L132 93 L137 180 L63 180 Z" 
                fill="url(#leatherGradient)" 
              />
              {/* Collar */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                d="M80 88 L85 100 L100 95 L115 100 L120 88 L100 82 Z" 
                fill="#2A2015" 
              />
              {/* Zipper */}
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                x1="100" y1="95" x2="100" y2="175" 
                stroke="#C0C0C0" strokeWidth="3"
              />
              {/* Zipper pull */}
              <motion.rect 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.4 }}
                x="97" y="130" width="6" height="8" fill="#A0A0A0" rx="1"
              />
              {/* Pocket zippers */}
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                x1="75" y1="130" x2="90" y2="140" 
                stroke="#808080" strokeWidth="2"
              />
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                x1="125" y1="130" x2="110" y2="140" 
                stroke="#808080" strokeWidth="2"
              />
              {/* Arms with jacket */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M68 93 L53 100 L43 160 L53 162 L60 110 L68 100 Z" 
                fill="url(#leatherGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M132 93 L147 100 L157 160 L147 162 L140 110 L132 100 Z" 
                fill="url(#leatherGradient)" 
              />
            </g>
          )
        case 'trousers':
        default:
          return (
            <g>
              {/* Default shirt */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L85 90 L100 95 L115 90 L125 93 L130 180 L70 180 Z" 
                fill="url(#shirtGradient)" 
              />
              {/* Arms with shirt */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L55 100 L45 160 L55 162 L62 110 L75 100 Z" 
                fill="url(#shirtGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M125 93 L145 100 L155 160 L145 162 L138 110 L125 100 Z" 
                fill="url(#shirtGradient)" 
              />
            </g>
          )
      }
    }

    const renderTrousers = () => {
      const isHighlighted = selectedGarment === 'trousers'
      return (
        <g>
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            d="M70 178 L75 280 L95 280 L100 200 L105 280 L125 280 L130 178 Z" 
            fill={isHighlighted ? 'url(#trousersHighlightGradient)' : 'url(#trousersGradient)'} 
          />
          {/* Belt */}
          <motion.rect 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            x="68" y="175" width="64" height="8" fill="#1A1A1A" rx="2" 
          />
          <motion.rect 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            x="96" y="176" width="8" height="6" fill="#B8860B" rx="1" 
          />
          {/* Crease lines when highlighted */}
          {isHighlighted && (
            <>
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                x1="85" y1="185" x2="85" y2="275" 
                stroke="#1A252F" strokeWidth="1" opacity="0.5"
              />
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                x1="115" y1="185" x2="115" y2="275" 
                stroke="#1A252F" strokeWidth="1" opacity="0.5"
              />
            </>
          )}
        </g>
      )
    }

    return (
      <svg 
        viewBox="0 0 200 300" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
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
          <linearGradient id="tshirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D2D2D" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
          <linearGradient id="leatherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A3728" />
            <stop offset="100%" stopColor="#2A1F15" />
          </linearGradient>
          <linearGradient id="trousersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34495E" />
            <stop offset="100%" stopColor="#2C3E50" />
          </linearGradient>
          <linearGradient id="trousersHighlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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

        {/* Torso with selected garment */}
        <AnimatePresence mode="wait">
          <motion.g
            key={selectedGarment}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTorso()}
          </motion.g>
        </AnimatePresence>
        
        {/* Hands */}
        <ellipse cx="50" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
        <ellipse cx="150" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />

        {/* Trousers */}
        {renderTrousers()}

        {/* Facial features */}
        <ellipse cx="92" cy="50" rx="3" ry="2" fill="#2A1810" />
        <ellipse cx="108" cy="50" rx="3" ry="2" fill="#2A1810" />
        <path d="M96 60 Q100 63 104 60" stroke="#8B6914" strokeWidth="1.5" fill="none" />
        <path d="M93 68 Q100 72 107 68" stroke="#C4956A" strokeWidth="2" fill="none" />
      </svg>
    )
  }

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
                  onClick={() => handleGarmentChange(garment.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedGarment === garment.id
                      ? 'bg-blue-500/20 border-2 border-blue-500'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-white">{garment.name}</div>
                      <div className="text-sm text-white/60">{garment.brand}</div>
                      <div className="text-xs text-white/40 mt-1">{garment.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-400 font-semibold">${garment.price}</div>
                      <div className="text-xs text-green-400">{garment.fit}% fit</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Center - Avatar Display */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[3/4] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10">
                {/* Transition overlay */}
                <AnimatePresence>
                  {isTransitioning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent z-10 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Human Avatar */}
                <AvatarSVG />

                {/* Fit indicator overlay */}
                <motion.div 
                  key={selectedGarmentData?.fit}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <div className="text-xs text-white/60">Fit Score</div>
                  <div className="text-2xl font-bold text-green-400">{selectedGarmentData?.fit}%</div>
                </motion.div>

                {/* Garment name overlay */}
                <motion.div 
                  key={selectedGarmentData?.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center"
                >
                  <div className="text-sm font-semibold text-white">{selectedGarmentData?.name}</div>
                </motion.div>
              </div>

              {/* Size selector */}
              <div className="mt-6 w-full max-w-md">
                <h3 className="text-sm font-medium text-white/60 mb-3">Select Size</h3>
                <div className="flex gap-2 justify-center">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Fit Analysis */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Fit Analysis</h2>
              
              <motion.div 
                key={selectedGarment}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-semibold text-white mb-4">{selectedGarmentData?.name}</h3>
                
                <div className="space-y-4">
                  {selectedGarmentData?.shoulder > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">Shoulder Fit</span>
                        <span className={getFitLabel(selectedGarmentData.shoulder).color}>
                          {getFitLabel(selectedGarmentData.shoulder).text}
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedGarmentData.shoulder}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className={`h-full ${getBarColor(selectedGarmentData.shoulder)} rounded-full`}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedGarmentData?.chest > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">Chest Fit</span>
                        <span className={getFitLabel(selectedGarmentData.chest).color}>
                          {getFitLabel(selectedGarmentData.chest).text}
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedGarmentData.chest}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className={`h-full ${getBarColor(selectedGarmentData.chest)} rounded-full`}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Waist Fit</span>
                      <span className={getFitLabel(selectedGarmentData?.waist || 0).color}>
                        {getFitLabel(selectedGarmentData?.waist || 0).text}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedGarmentData?.waist || 0}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`h-full ${getBarColor(selectedGarmentData?.waist || 0)} rounded-full`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Length</span>
                      <span className={getFitLabel(selectedGarmentData?.length || 0).color}>
                        {getFitLabel(selectedGarmentData?.length || 0).text}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedGarmentData?.length || 0}%` }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className={`h-full ${getBarColor(selectedGarmentData?.length || 0)} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                key={`rec-${selectedGarment}-${selectedSize}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-semibold text-white mb-3">Recommendation</h3>
                <p className="text-white/70 text-sm">
                  Based on your measurements, size <span className="text-blue-400 font-semibold">{selectedSize}</span> provides 
                  the best fit for this {selectedGarmentData?.name.toLowerCase()}. The garment will sit comfortably 
                  across your shoulders with optimal room in the chest area.
                </p>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Add to Cart - ${selectedGarmentData?.price}
              </motion.button>
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
