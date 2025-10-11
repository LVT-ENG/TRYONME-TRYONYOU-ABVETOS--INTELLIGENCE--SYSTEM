import React from 'react'

function Solution() {
  return (
    <section className="solution">
      <div className="solution-container">
        <div className="solution-header">
          <h2 className="section-title">The TRYONYOU Solution</h2>
          <p className="solution-intro">
            We've created an intelligent, end-to-end fashion technology platform that eliminates the guesswork 
            from online shopping. Our system combines cutting-edge AI, 3D visualization, and biometric security 
            to deliver a shopping experience that's more accurate than trying on clothes in a physical store.
          </p>
        </div>

        <div className="solution-visual-wrapper">
          <img 
            src="/illustrations/solution-tech.svg" 
            alt="Technology solution visualization" 
            className="solution-illustration"
          />
        </div>

        <div className="solution-features">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Perfect Fit Guarantee</h3>
            <p>
              Our 3D avatar technology creates a photorealistic digital twin with millimeter-precise measurements, 
              ensuring every garment fits perfectly before you buy.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Recommendations</h3>
            <p>
              Our Personal Avatar Universe (PAU) learns your style preferences and body characteristics to 
              recommend items that match your unique taste and fit requirements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Biometric Payments</h3>
            <p>
              ABVET technology combines iris and voice recognition for frictionless, ultra-secure checkout 
              in seconds—no cards, no passwords, just you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>On-Demand Production</h3>
            <p>
              Our LiveIt Factory orchestration enables just-in-time manufacturing, reducing waste while 
              delivering custom-fit garments faster than traditional retail.
            </p>
          </div>
        </div>

        <div className="solution-impact">
          <h3>Measurable Impact</h3>
          <div className="impact-stats">
            <div className="impact-item">
              <span className="impact-value">-85%</span>
              <span className="impact-label">Return Rate Reduction</span>
            </div>
            <div className="impact-item">
              <span className="impact-value">+40%</span>
              <span className="impact-label">Customer Satisfaction</span>
            </div>
            <div className="impact-item">
              <span className="impact-value">-60%</span>
              <span className="impact-label">Inventory Waste</span>
            </div>
            <div className="impact-item">
              <span className="impact-value">+25%</span>
              <span className="impact-label">Conversion Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solution
