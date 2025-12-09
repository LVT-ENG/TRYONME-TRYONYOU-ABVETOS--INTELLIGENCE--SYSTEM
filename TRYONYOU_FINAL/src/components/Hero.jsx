import React from 'react'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            TRY<span className="highlight">ON</span>YOU
          </h1>
          <p className="hero-subtitle">
            Experience Fashion in a New Dimension
          </p>
          <p className="hero-description">
            AI-Powered Virtual Try-On Platform
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Start Your Journey</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src="/hero_art_final.png" 
            alt="TRYONYOU Hero Art" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  )
}
