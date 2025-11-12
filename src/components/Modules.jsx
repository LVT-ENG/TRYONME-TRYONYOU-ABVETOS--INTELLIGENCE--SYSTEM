import React, { useState, useEffect } from 'react'

function Modules() {
  const [selectedModule, setSelectedModule] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const modules = [
    {
      id: 'avatar',
      name: 'Avatar 3D (PAU)',
      title: 'Personal Avatar Universe',
      description: 'Generate photorealistic 3D avatars with precise body measurements for a perfect fit every time.',
      icon: '👤',
      image: '/modules/avatar-3d.svg',
      features: [
        'Millimeter-precise body scanning',
        'Photorealistic 3D rendering',
        'Real-time garment simulation',
        'Multi-angle visualization'
      ]
    },
    {
      id: 'comparator',
      name: 'Fabric Fit Comparator',
      title: 'Intelligent Fit Analysis',
      description: 'Advanced textile simulation that predicts how garments will fit your unique body shape.',
      icon: '📏',
      image: '/modules/fabric-comparator.svg',
      features: [
        'Fabric physics simulation',
        'Fit percentage analysis',
        'Size recommendation',
        'Material behavior prediction'
      ]
    },
    {
      id: 'smart-wardrobe',
      name: 'Smart Wardrobe',
      title: 'Digital Closet Management',
      description: 'Digitize your entire wardrobe and get AI-powered outfit recommendations.',
      icon: '👔',
      image: '/modules/smart-wardrobe.svg',
      features: [
        'Wardrobe digitization',
        'Outfit generation',
        'Weather integration',
        'Occasion matching'
      ]
    },
    {
      id: 'solidarity',
      name: 'Solidarity Wardrobe',
      title: 'Sustainable Fashion Ecosystem',
      description: 'Participate in circular fashion through donation, exchange, and recycling.',
      icon: '♻️',
      image: '/modules/smart-wardrobe.svg',
      features: [
        'Donation platform',
        'Clothing exchange',
        'Recycling programs',
        'Impact tracking'
      ]
    },
    {
      id: 'abvet',
      name: 'ABVET Payment',
      title: 'Dual-Biometric Authentication',
      description: 'Secure, frictionless payments using iris and voice recognition technology.',
      icon: '👁️',
      image: '/modules/biometric-payment.svg',
      features: [
        'Iris recognition',
        'Voice biometrics',
        'Multi-factor authentication',
        'Sub-second checkout'
      ]
    },
    {
      id: 'ftt',
      name: 'Fashion Trend Tracker',
      title: 'Real-Time Trend Analysis',
      description: 'Stay ahead with AI-powered trend forecasting and fashion intelligence.',
      icon: '📊',
      image: '/modules/trend-tracker.svg',
      features: [
        'Trend prediction AI',
        'Social media analysis',
        'Runway integration',
        'Market insights'
      ]
    },
    {
      id: 'cap',
      name: 'CAP System',
      title: 'Creative Auto-Production',
      description: 'Transform designs into reality with automated, on-demand production.',
      icon: '⚙️',
      image: '/modules/on-demand-production.svg',
      features: [
        'Design-to-production automation',
        'Mass customization at scale',
        'Quality control AI',
        'Sustainable manufacturing'
      ]
    },
    {
      id: 'liveit',
      name: 'LiveIt Factory',
      title: 'Intelligent Orchestration',
      description: 'Optimize supply chain with AI-driven factory management and JIT manufacturing.',
      icon: '🏭',
      image: '/modules/on-demand-production.svg',
      features: [
        'JIT orchestration',
        'Resource optimization',
        'Quality assurance',
        'Logistics integration'
      ]
    }
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setSelectedModule((prev) => (prev + 1) % modules.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, modules.length])

  const handleModuleSelect = (index) => {
    setSelectedModule(index)
    setIsAutoPlay(false)
  }

  const handlePrevious = () => {
    setSelectedModule((prev) => (prev - 1 + modules.length) % modules.length)
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setSelectedModule((prev) => (prev + 1) % modules.length)
    setIsAutoPlay(false)
  }

  const currentModule = modules[selectedModule]

  return (
    <section className="modules" id="modules">
      <div className="modules-container">
        <h2 className="section-title">Our Core Modules</h2>
        <p className="modules-intro">
          Eight intelligent modules working in perfect harmony to revolutionize the fashion industry
        </p>

        {/* Carousel Display */}
        <div className="module-carousel">
          <button className="carousel-nav carousel-prev" onClick={handlePrevious}>
            ‹
          </button>

          <div className="carousel-content">
            <div className="carousel-visual">
              <img 
                src={currentModule.image} 
                alt={currentModule.name}
                className="module-visual-image"
              />
            </div>
            <div className="carousel-text">
              <div className="carousel-icon">{currentModule.icon}</div>
              <h3 className="carousel-name">{currentModule.name}</h3>
              <h4 className="carousel-title">{currentModule.title}</h4>
              <p className="carousel-description">{currentModule.description}</p>
              
              <ul className="carousel-features">
                {currentModule.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-bullet">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button className="carousel-nav carousel-next" onClick={handleNext}>
            ›
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {modules.map((module, index) => (
            <button
              key={module.id}
              className={`indicator ${index === selectedModule ? 'active' : ''}`}
              onClick={() => handleModuleSelect(index)}
              title={module.name}
            >
              <span className="indicator-icon">{module.icon}</span>
            </button>
          ))}
        </div>

        {/* Grid View */}
        <div className="modules-grid">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className={`module-card ${index === selectedModule ? 'active' : ''}`}
              onClick={() => handleModuleSelect(index)}
            >
              <div className="module-icon">{module.icon}</div>
              <h3>{module.name}</h3>
              <p>{module.title}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="modules-cta">
          <button className="btn-primary btn-glow-gold">Book a Demo</button>
          <button className="btn-secondary">Experience the Future</button>
        </div>
      </div>
    </section>
  )
}

export default Modules
