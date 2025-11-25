import React, { useState, useEffect } from 'react'
import './ClaimsCarousel.css'

function ClaimsCarousel() {
  const [currentClaim, setCurrentClaim] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const claims = [
    {
      id: 1,
      title: 'Fit that feels you',
      subtitle: 'Context Engineering Layer',
      description: 'Revolutionary system architecture that dynamically adapts fashion recommendations based on multi-dimensional user context including biometric measurements, environmental factors, and real-time trend analysis.',
      icon: '🧠',
      color: '#D4AF37'
    },
    {
      id: 2,
      title: 'Your digital twin',
      subtitle: 'Adaptive Avatar Generation',
      description: 'Method for creating photorealistic 3D avatars with precise body measurements using multi-angle photography and AI-powered measurement extraction.',
      icon: '👤',
      color: '#B8941F'
    },
    {
      id: 3,
      title: 'Smart Wardrobe',
      subtitle: 'Fabric Fit Comparator',
      description: 'Advanced textile simulation engine that predicts garment fit and drape on individual body types with unprecedented accuracy.',
      icon: '📏',
      color: '#D4AF37'
    },
    {
      id: 4,
      title: 'Look with your eyes, pay with your voice',
      subtitle: 'ABVET Dual-Biometric Payment',
      description: 'Secure payment system combining iris recognition and voice biometric authentication with multi-factor verification and encrypted transaction processing.',
      icon: '👁️',
      color: '#B8941F'
    },
    {
      id: 5,
      title: 'Closet that cares',
      subtitle: 'Smart & Solidarity Wardrobes',
      description: 'Intelligent wardrobe management system that digitalizes existing clothing and facilitates circular fashion through automated donation and exchange.',
      icon: '👔',
      color: '#D4AF37'
    },
    {
      id: 6,
      title: 'Trend before it trends',
      subtitle: 'Fashion Trend Tracker (FTT)',
      description: 'Real-time trend analysis system that aggregates data from social media, runways, and sales to predict and identify emerging fashion trends.',
      icon: '📊',
      color: '#B8941F'
    },
    {
      id: 7,
      title: 'Design meets demand',
      subtitle: 'Creative Auto-Production (CAP)',
      description: 'Automated design-to-production pipeline that enables mass customization and on-demand manufacturing at scale.',
      icon: '⚙️',
      color: '#D4AF37'
    },
    {
      id: 8,
      title: 'Factory that thinks',
      subtitle: 'LiveIt Factory Orchestration',
      description: 'Intelligent supply chain management system that coordinates just-in-time production, optimizes factory resources, and minimizes waste.',
      icon: '🏭',
      color: '#B8941F'
    }
  ]

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentClaim((prev) => (prev + 1) % claims.length)
      }, 5000) // Change every 5 seconds
    }
    return () => clearInterval(interval)
  }, [isPlaying, claims.length])

  const goToSlide = (index) => {
    setCurrentClaim(index)
    setIsPlaying(false)
  }

  const nextSlide = () => {
    setCurrentClaim((prev) => (prev + 1) % claims.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentClaim((prev) => (prev - 1 + claims.length) % claims.length)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="claims-carousel" id="claims">
      <div className="claims-carousel-container">
        <div className="carousel-header">
          <h2 className="carousel-title">8 Super-Claims Patent Applications</h2>
          <p className="carousel-subtitle">
            Our technology is protected by a comprehensive IP portfolio valued at over <strong>€20M</strong>,
            providing a <strong>5-7 year competitive advantage</strong> in the fashion-tech market.
          </p>
        </div>

        <div className="carousel-main">
          <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous claim">
            ‹
          </button>

          <div className="carousel-content">
            {claims.map((claim, index) => (
              <div
                key={claim.id}
                className={`carousel-slide ${index === currentClaim ? 'active' : ''} ${
                  index < currentClaim ? 'prev' : index > currentClaim ? 'next' : ''
                }`}
                style={{ '--claim-color': claim.color }}
              >
                <div className="slide-icon">{claim.icon}</div>
                <div className="slide-number">Claim {claim.id}</div>
                <h3 className="slide-title">{claim.title}</h3>
                <h4 className="slide-subtitle">{claim.subtitle}</h4>
                <p className="slide-description">{claim.description}</p>
              </div>
            ))}
          </div>

          <button className="carousel-nav next" onClick={nextSlide} aria-label="Next claim">
            ›
          </button>
        </div>

        <div className="carousel-controls">
          <div className="carousel-indicators">
            {claims.map((claim, index) => (
              <button
                key={claim.id}
                className={`indicator ${index === currentClaim ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to claim ${claim.id}`}
              >
                <span className="indicator-number">{claim.id}</span>
              </button>
            ))}
          </div>

          <button className="play-pause-btn" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        <div className="carousel-progress">
          <div
            className="progress-bar"
            style={{
              width: `${((currentClaim + 1) / claims.length) * 100}%`,
              transition: 'width 0.5s ease'
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default ClaimsCarousel

