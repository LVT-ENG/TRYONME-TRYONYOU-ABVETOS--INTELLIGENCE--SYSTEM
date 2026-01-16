import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Demo = () => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedTop, setSelectedTop] = useState('blazer')
  const [selectedBottom, setSelectedBottom] = useState('trousers-navy')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activeTab, setActiveTab] = useState('tops')

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  
  const tops = [
    { 
      id: 'blazer', 
      name: 'Navy Blazer', 
      brand: 'TRYONYOU Collection', 
      price: 189, 
      fit: 94,
      shoulder: 95,
      chest: 88,
      waist: 92,
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
      description: 'Crisp white oxford with button-down collar'
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
      description: 'Classic leather jacket with zip closure'
    },
    { 
      id: 'polo', 
      name: 'Classic Polo', 
      brand: 'TRYONYOU Collection', 
      price: 69, 
      fit: 95,
      shoulder: 96,
      chest: 94,
      waist: 93,
      description: 'Timeless polo shirt with ribbed collar'
    },
  ]

  const bottoms = [
    { 
      id: 'trousers-navy', 
      name: 'Navy Trousers', 
      brand: 'TRYONYOU Collection', 
      price: 129, 
      fit: 91,
      waist: 93,
      hips: 90,
      length: 89,
      description: 'Slim-fit navy trousers'
    },
    { 
      id: 'trousers-charcoal', 
      name: 'Charcoal Trousers', 
      brand: 'TRYONYOU Collection', 
      price: 129, 
      fit: 92,
      waist: 94,
      hips: 91,
      length: 90,
      description: 'Classic charcoal dress pants'
    },
    { 
      id: 'jeans-dark', 
      name: 'Dark Wash Jeans', 
      brand: 'TRYONYOU Collection', 
      price: 99, 
      fit: 94,
      waist: 95,
      hips: 93,
      length: 92,
      description: 'Premium dark indigo denim'
    },
    { 
      id: 'jeans-light', 
      name: 'Light Wash Jeans', 
      brand: 'TRYONYOU Collection', 
      price: 99, 
      fit: 93,
      waist: 94,
      hips: 92,
      length: 91,
      description: 'Relaxed light blue denim'
    },
    { 
      id: 'chinos', 
      name: 'Khaki Chinos', 
      brand: 'TRYONYOU Collection', 
      price: 89, 
      fit: 95,
      waist: 96,
      hips: 94,
      length: 93,
      description: 'Versatile cotton chinos'
    },
  ]

  const selectedTopData = tops.find(t => t.id === selectedTop)
  const selectedBottomData = bottoms.find(b => b.id === selectedBottom)

  const totalPrice = (selectedTopData?.price || 0) + (selectedBottomData?.price || 0)
  const averageFit = Math.round(((selectedTopData?.fit || 0) + (selectedBottomData?.fit || 0)) / 2)

  const handleTopChange = (topId) => {
    if (topId !== selectedTop) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedTop(topId)
        setTimeout(() => setIsTransitioning(false), 300)
      }, 200)
    }
  }

  const handleBottomChange = (bottomId) => {
    if (bottomId !== selectedBottom) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedBottom(bottomId)
        setTimeout(() => setIsTransitioning(false), 300)
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

  // Avatar SVG Component with complete look rendering
  const AvatarSVG = () => {
    const renderTop = () => {
      switch (selectedTop) {
        case 'blazer':
          return (
            <g>
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M70 93 L85 90 L100 95 L115 90 L130 93 L135 180 L65 180 Z" 
                fill="url(#blazerGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                d="M85 90 L95 115 L100 95 L105 115 L115 90 L100 100 Z" 
                fill="url(#shirtGradient)" 
              />
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
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L85 90 L100 95 L115 90 L125 93 L130 180 L70 180 Z" 
                fill="url(#shirtGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                d="M85 90 L92 100 L100 95 L108 100 L115 90 L100 85 Z" 
                fill="#E8E8E8" 
              />
              {[110, 125, 140, 155, 170].map((y, i) => (
                <motion.circle 
                  key={y}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + i * 0.05 }}
                  cx="100" cy={y} r="2" fill="#CCCCCC" 
                />
              ))}
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
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L85 88 L100 90 L115 88 L125 93 L130 180 L70 180 Z" 
                fill="url(#tshirtGradient)" 
              />
              <motion.ellipse 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                cx="100" cy="92" rx="12" ry="6" fill="#1A1A1A" 
              />
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
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M68 93 L85 88 L100 92 L115 88 L132 93 L137 180 L63 180 Z" 
                fill="url(#leatherGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                d="M80 88 L85 100 L100 95 L115 100 L120 88 L100 82 Z" 
                fill="#2A2015" 
              />
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                x1="100" y1="95" x2="100" y2="175" 
                stroke="#C0C0C0" strokeWidth="3"
              />
              <motion.rect 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.4 }}
                x="97" y="130" width="6" height="8" fill="#A0A0A0" rx="1"
              />
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
        case 'polo':
          return (
            <g>
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L85 88 L100 90 L115 88 L125 93 L130 180 L70 180 Z" 
                fill="url(#poloGradient)" 
              />
              {/* Polo collar */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                d="M85 88 L90 95 L100 90 L110 95 L115 88 L100 82 Z" 
                fill="#1A4A2E" 
              />
              {/* Polo buttons */}
              <motion.circle 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                cx="100" cy="100" r="2" fill="#D4AF37" 
              />
              <motion.circle 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.25 }}
                cx="100" cy="112" r="2" fill="#D4AF37" 
              />
              {/* Short sleeves */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M75 93 L60 100 L55 125 L65 127 L68 110 L75 100 Z" 
                fill="url(#poloGradient)" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                d="M125 93 L140 100 L145 125 L135 127 L132 110 L125 100 Z" 
                fill="url(#poloGradient)" 
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
        default:
          return null
      }
    }

    const renderBottom = () => {
      let gradientId = 'trousersNavyGradient'
      let beltColor = '#1A1A1A'
      
      switch (selectedBottom) {
        case 'trousers-navy':
          gradientId = 'trousersNavyGradient'
          break
        case 'trousers-charcoal':
          gradientId = 'trousersCharcoalGradient'
          break
        case 'jeans-dark':
          gradientId = 'jeansDarkGradient'
          beltColor = '#4A3728'
          break
        case 'jeans-light':
          gradientId = 'jeansLightGradient'
          beltColor = '#4A3728'
          break
        case 'chinos':
          gradientId = 'chinosGradient'
          beltColor = '#2A1F15'
          break
        default:
          gradientId = 'trousersNavyGradient'
      }

      return (
        <g>
          <motion.path 
            key={selectedBottom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            d="M70 178 L75 280 L95 280 L100 200 L105 280 L125 280 L130 178 Z" 
            fill={`url(#${gradientId})`}
          />
          {/* Belt */}
          <motion.rect 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            x="68" y="175" width="64" height="8" fill={beltColor} rx="2" 
          />
          <motion.rect 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            x="96" y="176" width="8" height="6" fill="#B8860B" rx="1" 
          />
          {/* Crease lines for dress pants */}
          {(selectedBottom === 'trousers-navy' || selectedBottom === 'trousers-charcoal') && (
            <>
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                x1="85" y1="185" x2="85" y2="275" 
                stroke="rgba(0,0,0,0.2)" strokeWidth="1"
              />
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                x1="115" y1="185" x2="115" y2="275" 
                stroke="rgba(0,0,0,0.2)" strokeWidth="1"
              />
            </>
          )}
          {/* Jeans stitching */}
          {(selectedBottom === 'jeans-dark' || selectedBottom === 'jeans-light') && (
            <>
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                x1="78" y1="185" x2="80" y2="275" 
                stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"
              />
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                x1="122" y1="185" x2="120" y2="275" 
                stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"
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
          <linearGradient id="poloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E5631" />
            <stop offset="100%" stopColor="#154023" />
          </linearGradient>
          <linearGradient id="trousersNavyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="100%" stopColor="#152A45" />
          </linearGradient>
          <linearGradient id="trousersCharcoalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36454F" />
            <stop offset="100%" stopColor="#2A363B" />
          </linearGradient>
          <linearGradient id="jeansDarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A2634" />
            <stop offset="100%" stopColor="#0F1922" />
          </linearGradient>
          <linearGradient id="jeansLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B8BA4" />
            <stop offset="100%" stopColor="#5A7A93" />
          </linearGradient>
          <linearGradient id="chinosGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C3B091" />
            <stop offset="100%" stopColor="#A89B7B" />
          </linearGradient>
        </defs>

        {/* Hair */}
        <ellipse cx="100" cy="45" rx="28" ry="30" fill="url(#hairGradient)" />
        
        {/* Head */}
        <ellipse cx="100" cy="55" rx="22" ry="26" fill="url(#skinGradient)" />
        
        {/* Neck */}
        <rect x="92" y="78" width="16" height="15" fill="url(#skinGradient)" />

        {/* Top garment */}
        <AnimatePresence mode="wait">
          <motion.g
            key={selectedTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTop()}
          </motion.g>
        </AnimatePresence>
        
        {/* Hands */}
        <ellipse cx="50" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
        <ellipse cx="150" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />

        {/* Bottom garment */}
        <AnimatePresence mode="wait">
          <motion.g
            key={selectedBottom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderBottom()}
          </motion.g>
        </AnimatePresence>

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
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Complete Look Builder
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Mix and match tops and bottoms to create your perfect outfit
          </p>
        </div>
      </section>

      {/* Main Demo Area */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Garment Selection */}
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('tops')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'tops'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Tops
                </button>
                <button
                  onClick={() => setActiveTab('bottoms')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'bottoms'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Bottoms
                </button>
              </div>

              {/* Garment List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                  {activeTab === 'tops' ? (
                    <motion.div
                      key="tops"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-3"
                    >
                      {tops.map((garment) => (
                        <motion.button
                          key={garment.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTopChange(garment.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedTop === garment.id
                              ? 'bg-blue-500/20 border-2 border-blue-500'
                              : 'bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-white">{garment.name}</div>
                              <div className="text-xs text-white/40 mt-1">{garment.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-blue-400 font-semibold">${garment.price}</div>
                              <div className="text-xs text-green-400">{garment.fit}% fit</div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bottoms"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-3"
                    >
                      {bottoms.map((garment) => (
                        <motion.button
                          key={garment.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleBottomChange(garment.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedBottom === garment.id
                              ? 'bg-blue-500/20 border-2 border-blue-500'
                              : 'bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-white">{garment.name}</div>
                              <div className="text-xs text-white/40 mt-1">{garment.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-blue-400 font-semibold">${garment.price}</div>
                              <div className="text-xs text-green-400">{garment.fit}% fit</div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

                {/* Complete Look Score */}
                <motion.div 
                  key={`${selectedTop}-${selectedBottom}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <div className="text-xs text-white/60">Look Score</div>
                  <div className="text-2xl font-bold text-green-400">{averageFit}%</div>
                </motion.div>

                {/* Current Look Summary */}
                <motion.div 
                  key={`summary-${selectedTop}-${selectedBottom}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <div className="text-xs text-white/60 mb-1">Current Look</div>
                  <div className="text-sm font-semibold text-white">{selectedTopData?.name}</div>
                  <div className="text-sm text-white/70">+ {selectedBottomData?.name}</div>
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
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Complete Look Analysis</h2>
              
              {/* Top Analysis */}
              <motion.div 
                key={`top-${selectedTop}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white">{selectedTopData?.name}</h3>
                  <span className="text-sm text-blue-400">${selectedTopData?.price}</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Shoulder</span>
                      <span className={getFitLabel(selectedTopData?.shoulder || 0).color}>
                        {getFitLabel(selectedTopData?.shoulder || 0).text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedTopData?.shoulder || 0}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${getBarColor(selectedTopData?.shoulder || 0)} rounded-full`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Chest</span>
                      <span className={getFitLabel(selectedTopData?.chest || 0).color}>
                        {getFitLabel(selectedTopData?.chest || 0).text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedTopData?.chest || 0}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`h-full ${getBarColor(selectedTopData?.chest || 0)} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Analysis */}
              <motion.div 
                key={`bottom-${selectedBottom}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white">{selectedBottomData?.name}</h3>
                  <span className="text-sm text-blue-400">${selectedBottomData?.price}</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Waist</span>
                      <span className={getFitLabel(selectedBottomData?.waist || 0).color}>
                        {getFitLabel(selectedBottomData?.waist || 0).text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedBottomData?.waist || 0}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${getBarColor(selectedBottomData?.waist || 0)} rounded-full`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Length</span>
                      <span className={getFitLabel(selectedBottomData?.length || 0).color}>
                        {getFitLabel(selectedBottomData?.length || 0).text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedBottomData?.length || 0}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`h-full ${getBarColor(selectedBottomData?.length || 0)} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Style Recommendation */}
              <motion.div 
                key={`rec-${selectedTop}-${selectedBottom}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20"
              >
                <h3 className="font-semibold text-white mb-2">Style Match</h3>
                <p className="text-white/70 text-sm">
                  The <span className="text-blue-400">{selectedTopData?.name}</span> pairs 
                  excellently with <span className="text-blue-400">{selectedBottomData?.name}</span>. 
                  This combination creates a {averageFit >= 93 ? 'perfect' : averageFit >= 90 ? 'great' : 'good'} balanced 
                  look for both casual and semi-formal occasions.
                </p>
              </motion.div>

              {/* Add Complete Look Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Add Complete Look - ${totalPrice}
              </motion.button>

              {/* Individual Items */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm text-white/70 hover:bg-white/20 transition-all">
                  Add Top Only - ${selectedTopData?.price}
                </button>
                <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm text-white/70 hover:bg-white/20 transition-all">
                  Add Bottom Only - ${selectedBottomData?.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 bg-white/5 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Build Your Perfect Look</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Choose Your Top</h3>
              <p className="text-white/60 text-sm">Select from blazers, shirts, t-shirts, and more</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Pick Your Bottom</h3>
              <p className="text-white/60 text-sm">Match with trousers, jeans, or chinos</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">See Your Complete Look</h3>
              <p className="text-white/60 text-sm">Visualize the outfit with fit analysis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Demo
