import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Demo = () => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedTop, setSelectedTop] = useState('blazer')
  const [selectedBottom, setSelectedBottom] = useState('trousers-navy')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activeTab, setActiveTab] = useState('tops')
  const [rotation, setRotation] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const viewAngles = [
    { angle: 0, label: 'Front' },
    { angle: 45, label: 'Front-Right' },
    { angle: 90, label: 'Right' },
    { angle: 135, label: 'Back-Right' },
    { angle: 180, label: 'Back' },
    { angle: 225, label: 'Back-Left' },
    { angle: 270, label: 'Left' },
    { angle: 315, label: 'Front-Left' },
  ]
  
  const tops = [
    { id: 'blazer', name: 'Navy Blazer', brand: 'TRYONYOU Collection', price: 189, fit: 94, shoulder: 95, chest: 88, waist: 92, description: 'Classic navy blazer with modern tailoring' },
    { id: 'shirt', name: 'White Oxford Shirt', brand: 'TRYONYOU Collection', price: 79, fit: 97, shoulder: 98, chest: 95, waist: 94, description: 'Crisp white oxford with button-down collar' },
    { id: 'tshirt', name: 'Premium T-Shirt', brand: 'TRYONYOU Collection', price: 49, fit: 96, shoulder: 97, chest: 96, waist: 95, description: 'Soft cotton crew neck tee' },
    { id: 'jacket', name: 'Leather Jacket', brand: 'TRYONYOU Collection', price: 349, fit: 89, shoulder: 91, chest: 87, waist: 88, description: 'Classic leather jacket with zip closure' },
    { id: 'polo', name: 'Classic Polo', brand: 'TRYONYOU Collection', price: 69, fit: 95, shoulder: 96, chest: 94, waist: 93, description: 'Timeless polo shirt with ribbed collar' },
  ]

  const bottoms = [
    { id: 'trousers-navy', name: 'Navy Trousers', brand: 'TRYONYOU Collection', price: 129, fit: 91, waist: 93, hips: 90, length: 89, description: 'Slim-fit navy trousers' },
    { id: 'trousers-charcoal', name: 'Charcoal Trousers', brand: 'TRYONYOU Collection', price: 129, fit: 92, waist: 94, hips: 91, length: 90, description: 'Classic charcoal dress pants' },
    { id: 'jeans-dark', name: 'Dark Wash Jeans', brand: 'TRYONYOU Collection', price: 99, fit: 94, waist: 95, hips: 93, length: 92, description: 'Premium dark indigo denim' },
    { id: 'jeans-light', name: 'Light Wash Jeans', brand: 'TRYONYOU Collection', price: 99, fit: 93, waist: 94, hips: 92, length: 91, description: 'Relaxed light blue denim' },
    { id: 'chinos', name: 'Khaki Chinos', brand: 'TRYONYOU Collection', price: 89, fit: 95, waist: 96, hips: 94, length: 93, description: 'Versatile cotton chinos' },
  ]

  const selectedTopData = tops.find(t => t.id === selectedTop)
  const selectedBottomData = bottoms.find(b => b.id === selectedBottom)
  const totalPrice = (selectedTopData?.price || 0) + (selectedBottomData?.price || 0)
  const averageFit = Math.round(((selectedTopData?.fit || 0) + (selectedBottomData?.fit || 0)) / 2)

  // Auto-rotation effect
  useEffect(() => {
    let interval
    if (isAutoRotating) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360)
      }, 30)
    }
    return () => clearInterval(interval)
  }, [isAutoRotating])

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

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setIsAutoRotating(false)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const delta = e.clientX - dragStartX
      setRotation(prev => (prev + delta * 0.5) % 360)
      setDragStartX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setIsAutoRotating(false)
  }

  const handleTouchMove = (e) => {
    if (isDragging) {
      const delta = e.touches[0].clientX - dragStartX
      setRotation(prev => (prev + delta * 0.5) % 360)
      setDragStartX(e.touches[0].clientX)
    }
  }

  const rotateToAngle = (angle) => {
    setIsAutoRotating(false)
    setRotation(angle)
  }

  const startFullRotation = () => {
    setIsAutoRotating(true)
  }

  const stopRotation = () => {
    setIsAutoRotating(false)
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

  const getCurrentView = () => {
    const normalizedRotation = ((rotation % 360) + 360) % 360
    if (normalizedRotation < 22.5 || normalizedRotation >= 337.5) return 'front'
    if (normalizedRotation >= 22.5 && normalizedRotation < 67.5) return 'front-right'
    if (normalizedRotation >= 67.5 && normalizedRotation < 112.5) return 'right'
    if (normalizedRotation >= 112.5 && normalizedRotation < 157.5) return 'back-right'
    if (normalizedRotation >= 157.5 && normalizedRotation < 202.5) return 'back'
    if (normalizedRotation >= 202.5 && normalizedRotation < 247.5) return 'back-left'
    if (normalizedRotation >= 247.5 && normalizedRotation < 292.5) return 'left'
    return 'front-left'
  }

  // Avatar SVG Component with rotation views
  const AvatarSVG = () => {
    const currentView = getCurrentView()
    const normalizedRotation = ((rotation % 360) + 360) % 360
    
    // Calculate perspective scale based on rotation
    const perspectiveScale = 1 - Math.abs(Math.sin(normalizedRotation * Math.PI / 180)) * 0.15

    const getTopGradient = () => {
      switch (selectedTop) {
        case 'blazer': return 'url(#blazerGradient)'
        case 'shirt': return 'url(#shirtGradient)'
        case 'tshirt': return 'url(#tshirtGradient)'
        case 'jacket': return 'url(#leatherGradient)'
        case 'polo': return 'url(#poloGradient)'
        default: return 'url(#shirtGradient)'
      }
    }

    const getBottomGradient = () => {
      switch (selectedBottom) {
        case 'trousers-navy': return 'url(#trousersNavyGradient)'
        case 'trousers-charcoal': return 'url(#trousersCharcoalGradient)'
        case 'jeans-dark': return 'url(#jeansDarkGradient)'
        case 'jeans-light': return 'url(#jeansLightGradient)'
        case 'chinos': return 'url(#chinosGradient)'
        default: return 'url(#trousersNavyGradient)'
      }
    }

    const renderFrontView = () => (
      <g>
        {/* Hair */}
        <ellipse cx="100" cy="45" rx="28" ry="30" fill="url(#hairGradient)" />
        {/* Head */}
        <ellipse cx="100" cy="55" rx="22" ry="26" fill="url(#skinGradient)" />
        {/* Neck */}
        <rect x="92" y="78" width="16" height="15" fill="url(#skinGradient)" />
        {/* Torso */}
        <path d="M75 93 L85 88 L100 92 L115 88 L125 93 L130 180 L70 180 Z" fill={getTopGradient()} />
        {/* Arms */}
        <path d="M75 93 L55 100 L45 160 L55 162 L62 110 L75 100 Z" fill={getTopGradient()} />
        <path d="M125 93 L145 100 L155 160 L145 162 L138 110 L125 100 Z" fill={getTopGradient()} />
        {/* Hands */}
        <ellipse cx="50" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
        <ellipse cx="150" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
        {/* Trousers */}
        <path d="M70 178 L75 280 L95 280 L100 200 L105 280 L125 280 L130 178 Z" fill={getBottomGradient()} />
        {/* Belt */}
        <rect x="68" y="175" width="64" height="8" fill="#1A1A1A" rx="2" />
        <rect x="96" y="176" width="8" height="6" fill="#B8860B" rx="1" />
        {/* Face details */}
        <ellipse cx="92" cy="50" rx="3" ry="2" fill="#2A1810" />
        <ellipse cx="108" cy="50" rx="3" ry="2" fill="#2A1810" />
        <path d="M96 60 Q100 63 104 60" stroke="#8B6914" strokeWidth="1.5" fill="none" />
        <path d="M93 68 Q100 72 107 68" stroke="#C4956A" strokeWidth="2" fill="none" />
        {/* Top details based on selection */}
        {selectedTop === 'blazer' && (
          <>
            <path d="M85 90 L95 115 L100 95 L105 115 L115 90 L100 100 Z" fill="url(#shirtGradient)" />
            <circle cx="100" cy="130" r="3" fill="#1A1A1A" />
            <circle cx="100" cy="150" r="3" fill="#1A1A1A" />
          </>
        )}
        {selectedTop === 'shirt' && (
          <>
            <path d="M85 90 L92 100 L100 95 L108 100 L115 90 L100 85 Z" fill="#E8E8E8" />
            {[110, 125, 140, 155, 170].map((y) => (
              <circle key={y} cx="100" cy={y} r="2" fill="#CCCCCC" />
            ))}
          </>
        )}
        {selectedTop === 'jacket' && (
          <>
            <line x1="100" y1="95" x2="100" y2="175" stroke="#C0C0C0" strokeWidth="3" />
            <rect x="97" y="130" width="6" height="8" fill="#A0A0A0" rx="1" />
          </>
        )}
        {selectedTop === 'polo' && (
          <>
            <path d="M85 88 L90 95 L100 90 L110 95 L115 88 L100 82 Z" fill="#1A4A2E" />
            <circle cx="100" cy="100" r="2" fill="#D4AF37" />
            <circle cx="100" cy="112" r="2" fill="#D4AF37" />
          </>
        )}
      </g>
    )

    const renderBackView = () => (
      <g>
        {/* Hair back */}
        <ellipse cx="100" cy="45" rx="28" ry="30" fill="url(#hairGradient)" />
        {/* Head back */}
        <ellipse cx="100" cy="55" rx="22" ry="26" fill="url(#skinGradient)" />
        {/* Neck */}
        <rect x="92" y="78" width="16" height="15" fill="url(#skinGradient)" />
        {/* Back torso */}
        <path d="M75 93 L85 88 L100 90 L115 88 L125 93 L130 180 L70 180 Z" fill={getTopGradient()} />
        {/* Back seam line */}
        <line x1="100" y1="93" x2="100" y2="175" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        {/* Arms */}
        <path d="M75 93 L55 100 L45 160 L55 162 L62 110 L75 100 Z" fill={getTopGradient()} />
        <path d="M125 93 L145 100 L155 160 L145 162 L138 110 L125 100 Z" fill={getTopGradient()} />
        {/* Hands */}
        <ellipse cx="50" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
        <ellipse cx="150" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
        {/* Trousers back */}
        <path d="M70 178 L75 280 L95 280 L100 200 L105 280 L125 280 L130 178 Z" fill={getBottomGradient()} />
        {/* Belt */}
        <rect x="68" y="175" width="64" height="8" fill="#1A1A1A" rx="2" />
        {/* Back pockets */}
        <rect x="75" y="190" width="12" height="15" fill="rgba(0,0,0,0.15)" rx="2" />
        <rect x="113" y="190" width="12" height="15" fill="rgba(0,0,0,0.15)" rx="2" />
      </g>
    )

    const renderSideView = (isRight) => {
      const flip = isRight ? 1 : -1
      return (
        <g transform={isRight ? '' : 'translate(200, 0) scale(-1, 1)'}>
          {/* Hair side */}
          <ellipse cx="100" cy="45" rx="20" ry="30" fill="url(#hairGradient)" />
          {/* Head side */}
          <ellipse cx="105" cy="55" rx="18" ry="26" fill="url(#skinGradient)" />
          {/* Ear */}
          <ellipse cx="122" cy="55" rx="5" ry="8" fill="url(#skinGradient)" />
          {/* Neck */}
          <rect x="98" y="78" width="12" height="15" fill="url(#skinGradient)" />
          {/* Side torso */}
          <path d="M90 93 L95 88 L110 93 L115 180 L85 180 Z" fill={getTopGradient()} />
          {/* Visible arm */}
          <path d="M110 93 L125 100 L130 160 L120 162 L118 110 L110 100 Z" fill={getTopGradient()} />
          {/* Hand */}
          <ellipse cx="125" cy="165" rx="8" ry="10" fill="url(#skinGradient)" />
          {/* Trousers side */}
          <path d="M85 178 L88 280 L102 280 L105 200 L108 280 L115 280 L115 178 Z" fill={getBottomGradient()} />
          {/* Belt */}
          <rect x="83" y="175" width="34" height="8" fill="#1A1A1A" rx="2" />
          {/* Side profile face */}
          <path d="M118 50 L122 55 L118 60" stroke="#2A1810" strokeWidth="2" fill="none" />
          <path d="M115 68 Q118 70 115 72" stroke="#C4956A" strokeWidth="2" fill="none" />
        </g>
      )
    }

    const renderAngledView = (angle) => {
      const isBack = angle > 90 && angle < 270
      const isRight = angle < 180
      const skewFactor = Math.sin(angle * Math.PI / 180) * 0.3
      
      return (
        <g>
          {/* Hair */}
          <ellipse cx="100" cy="45" rx={28 - Math.abs(skewFactor) * 10} ry="30" fill="url(#hairGradient)" />
          {/* Head */}
          <ellipse cx="100" cy="55" rx={22 - Math.abs(skewFactor) * 8} ry="26" fill="url(#skinGradient)" />
          {/* Neck */}
          <rect x="92" y="78" width="16" height="15" fill="url(#skinGradient)" />
          {/* Torso */}
          <path d={`M${75 + skewFactor * 20} 93 L${85 + skewFactor * 15} 88 L100 92 L${115 - skewFactor * 15} 88 L${125 - skewFactor * 20} 93 L${130 - skewFactor * 25} 180 L${70 + skewFactor * 25} 180 Z`} fill={getTopGradient()} />
          {/* Arms with perspective */}
          <path d={`M${75 + skewFactor * 20} 93 L${55 + skewFactor * 30} 100 L${45 + skewFactor * 35} 160 L${55 + skewFactor * 30} 162 L${62 + skewFactor * 25} 110 L${75 + skewFactor * 20} 100 Z`} fill={getTopGradient()} opacity={isRight ? 0.7 : 1} />
          <path d={`M${125 - skewFactor * 20} 93 L${145 - skewFactor * 30} 100 L${155 - skewFactor * 35} 160 L${145 - skewFactor * 30} 162 L${138 - skewFactor * 25} 110 L${125 - skewFactor * 20} 100 Z`} fill={getTopGradient()} opacity={isRight ? 1 : 0.7} />
          {/* Hands */}
          <ellipse cx={50 + skewFactor * 35} cy="165" rx="8" ry="10" fill="url(#skinGradient)" opacity={isRight ? 0.7 : 1} />
          <ellipse cx={150 - skewFactor * 35} cy="165" rx="8" ry="10" fill="url(#skinGradient)" opacity={isRight ? 1 : 0.7} />
          {/* Trousers */}
          <path d={`M${70 + skewFactor * 25} 178 L${75 + skewFactor * 20} 280 L${95 + skewFactor * 5} 280 L100 200 L${105 - skewFactor * 5} 280 L${125 - skewFactor * 20} 280 L${130 - skewFactor * 25} 178 Z`} fill={getBottomGradient()} />
          {/* Belt */}
          <rect x={68 + skewFactor * 25} y="175" width={64 - Math.abs(skewFactor) * 50} height="8" fill="#1A1A1A" rx="2" />
          {/* Face - only show on front-facing angles */}
          {!isBack && (
            <>
              <ellipse cx={92 + skewFactor * 5} cy="50" rx="3" ry="2" fill="#2A1810" opacity={1 - Math.abs(skewFactor)} />
              <ellipse cx={108 - skewFactor * 5} cy="50" rx="3" ry="2" fill="#2A1810" opacity={1 - Math.abs(skewFactor)} />
              <path d={`M${96 + skewFactor * 3} 60 Q100 63 ${104 - skewFactor * 3} 60`} stroke="#8B6914" strokeWidth="1.5" fill="none" opacity={1 - Math.abs(skewFactor)} />
              <path d={`M${93 + skewFactor * 3} 68 Q100 72 ${107 - skewFactor * 3} 68`} stroke="#C4956A" strokeWidth="2" fill="none" opacity={1 - Math.abs(skewFactor)} />
            </>
          )}
        </g>
      )
    }

    const renderCurrentView = () => {
      const normalizedAngle = ((rotation % 360) + 360) % 360
      
      if (normalizedAngle < 15 || normalizedAngle >= 345) return renderFrontView()
      if (normalizedAngle >= 165 && normalizedAngle < 195) return renderBackView()
      if (normalizedAngle >= 75 && normalizedAngle < 105) return renderSideView(true)
      if (normalizedAngle >= 255 && normalizedAngle < 285) return renderSideView(false)
      
      return renderAngledView(normalizedAngle)
    }

    return (
      <svg 
        viewBox="0 0 200 300" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scaleX(${perspectiveScale})` }}
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
          <radialGradient id="platformGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
        </defs>

        {renderCurrentView()}
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
              360 Virtual Try-On
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Rotate the avatar to see your outfit from every angle
          </p>
        </div>
      </section>

      {/* Main Demo Area */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Garment Selection */}
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('tops')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'tops' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Tops
                </button>
                <button
                  onClick={() => setActiveTab('bottoms')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'bottoms' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Bottoms
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                  {activeTab === 'tops' ? (
                    <motion.div key="tops" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                      {tops.map((garment) => (
                        <motion.button
                          key={garment.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTopChange(garment.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedTop === garment.id ? 'bg-blue-500/20 border-2 border-blue-500' : 'bg-white/5 border border-white/10 hover:bg-white/10'
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
                    <motion.div key="bottoms" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                      {bottoms.map((garment) => (
                        <motion.button
                          key={garment.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleBottomChange(garment.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedBottom === garment.id ? 'bg-blue-500/20 border-2 border-blue-500' : 'bg-white/5 border border-white/10 hover:bg-white/10'
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

            {/* Center - Avatar Display with 360 Rotation */}
            <div className="flex flex-col items-center">
              <div 
                className="relative w-full max-w-md aspect-[3/4] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                {/* Platform glow effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-xl" />
                
                {/* Platform base */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-lg" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-36 h-2 bg-blue-500/20 rounded-full blur-sm" />

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
                <div className="absolute inset-0 flex items-center justify-center pb-12">
                  <AvatarSVG />
                </div>

                {/* Rotation indicator */}
                <motion.div 
                  className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <div className="text-xs text-white/60">View Angle</div>
                  <div className="text-lg font-bold text-blue-400">{Math.round(((rotation % 360) + 360) % 360)}°</div>
                  <div className="text-xs text-white/40 capitalize">{getCurrentView().replace('-', ' ')}</div>
                </motion.div>

                {/* Look Score */}
                <motion.div 
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <div className="text-xs text-white/60">Look Score</div>
                  <div className="text-2xl font-bold text-green-400">{averageFit}%</div>
                </motion.div>

                {/* Current Look Summary */}
                <motion.div 
                  className="absolute bottom-16 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <div className="text-xs text-white/60 mb-1">Current Look</div>
                  <div className="text-sm font-semibold text-white">{selectedTopData?.name}</div>
                  <div className="text-sm text-white/70">+ {selectedBottomData?.name}</div>
                </motion.div>

                {/* Drag hint */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/40">
                  Drag to rotate
                </div>
              </div>

              {/* Rotation Controls */}
              <div className="mt-4 w-full max-w-md space-y-3">
                {/* Quick angle buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {viewAngles.map((view) => (
                    <button
                      key={view.angle}
                      onClick={() => rotateToAngle(view.angle)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        Math.abs(((rotation % 360) + 360) % 360 - view.angle) < 22.5
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>

                {/* Auto-rotate button */}
                <div className="flex gap-2 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isAutoRotating ? stopRotation : startFullRotation}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      isAutoRotating
                        ? 'bg-red-500 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    }`}
                  >
                    {isAutoRotating ? 'Stop Rotation' : 'Auto Rotate 360'}
                  </motion.button>
                </div>

                {/* Size selector */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-white/60 mb-2 text-center">Select Size</h3>
                  <div className="flex gap-2 justify-center">
                    {sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          selectedSize === size ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
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
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white">{selectedTopData?.name}</h3>
                  <span className="text-sm text-blue-400">${selectedTopData?.price}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Shoulder</span>
                      <span className={getFitLabel(selectedTopData?.shoulder || 0).color}>{getFitLabel(selectedTopData?.shoulder || 0).text}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selectedTopData?.shoulder || 0}%` }} className={`h-full ${getBarColor(selectedTopData?.shoulder || 0)} rounded-full`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Chest</span>
                      <span className={getFitLabel(selectedTopData?.chest || 0).color}>{getFitLabel(selectedTopData?.chest || 0).text}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selectedTopData?.chest || 0}%` }} className={`h-full ${getBarColor(selectedTopData?.chest || 0)} rounded-full`} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Analysis */}
              <motion.div 
                key={`bottom-${selectedBottom}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white">{selectedBottomData?.name}</h3>
                  <span className="text-sm text-blue-400">${selectedBottomData?.price}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Waist</span>
                      <span className={getFitLabel(selectedBottomData?.waist || 0).color}>{getFitLabel(selectedBottomData?.waist || 0).text}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selectedBottomData?.waist || 0}%` }} className={`h-full ${getBarColor(selectedBottomData?.waist || 0)} rounded-full`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60">Length</span>
                      <span className={getFitLabel(selectedBottomData?.length || 0).color}>{getFitLabel(selectedBottomData?.length || 0).text}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${selectedBottomData?.length || 0}%` }} className={`h-full ${getBarColor(selectedBottomData?.length || 0)} rounded-full`} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Style Recommendation */}
              <motion.div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                <h3 className="font-semibold text-white mb-2">Style Match</h3>
                <p className="text-white/70 text-sm">
                  The <span className="text-blue-400">{selectedTopData?.name}</span> pairs 
                  excellently with <span className="text-blue-400">{selectedBottomData?.name}</span>. 
                  Rotate the avatar to see how the outfit looks from all angles.
                </p>
              </motion.div>

              {/* Add to Cart */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Add Complete Look - ${totalPrice}
              </motion.button>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm text-white/70 hover:bg-white/20 transition-all">
                  Top Only - ${selectedTopData?.price}
                </button>
                <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm text-white/70 hover:bg-white/20 transition-all">
                  Bottom Only - ${selectedBottomData?.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 bg-white/5 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">360 Virtual Try-On Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-white mb-1">Select Garments</h3>
              <p className="text-white/60 text-sm">Choose tops and bottoms</p>
            </div>
            <div className="p-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-white mb-1">Rotate 360</h3>
              <p className="text-white/60 text-sm">Drag or use controls</p>
            </div>
            <div className="p-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-white mb-1">Check Fit</h3>
              <p className="text-white/60 text-sm">View fit analysis</p>
            </div>
            <div className="p-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-400">4</span>
              </div>
              <h3 className="font-semibold text-white mb-1">Add to Cart</h3>
              <p className="text-white/60 text-sm">Buy with confidence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Demo
