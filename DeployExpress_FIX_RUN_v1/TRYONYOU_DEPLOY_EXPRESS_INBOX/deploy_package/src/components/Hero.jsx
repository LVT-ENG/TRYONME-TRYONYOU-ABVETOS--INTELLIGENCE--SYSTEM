import React from 'react'

function Hero() {
  const scrollToDemo = () => {
    const element = document.getElementById('cta')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <video 
        className="hero-video" 
        autoPlay 
        muted 
        loop 
        playsInline
        poster="/hero-bg.png"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          The Future of Fashion Intelligence
        </h1>
        <p className="hero-subtitle">
          3D Avatars · AI Recommendations · Biometric Payments · On-Demand Production
        </p>
        <button className="hero-cta" onClick={scrollToDemo}>
          Experience the Future
        </button>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
