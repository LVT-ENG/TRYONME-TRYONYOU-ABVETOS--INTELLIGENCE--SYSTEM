import React from 'react'

export default function Claims() {
  const features = [
    {
      title: "AI-Powered Fitting",
      description: "Advanced AI technology creates your perfect digital twin for accurate virtual try-ons",
      icon: "🤖"
    },
    {
      title: "Real-Time 3D",
      description: "Experience garments in stunning 3D with realistic fabric physics and lighting",
      icon: "✨"
    },
    {
      title: "Smart Wardrobe",
      description: "Organize and manage your digital wardrobe with intelligent recommendations",
      icon: "👗"
    },
    {
      title: "Perfect Fit Guarantee",
      description: "Get accurate size recommendations based on your unique measurements",
      icon: "📏"
    }
  ]

  return (
    <section className="claims-section">
      <div className="container">
        <h2 className="section-title">Why Choose TRYONYOU?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
