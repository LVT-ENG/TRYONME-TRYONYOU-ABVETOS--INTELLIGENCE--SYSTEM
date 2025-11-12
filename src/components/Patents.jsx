import React, { useState } from 'react'

function Patents() {
  const [showTooltip, setShowTooltip] = useState(false)

  const superClaims = [
    {
      id: 1,
      title: 'Context Engineering Layer',
      description: 'Revolutionary system architecture that dynamically adapts fashion recommendations based on multi-dimensional user context including biometric measurements, environmental factors, and real-time trend analysis.',
      icon: '🧠'
    },
    {
      id: 2,
      title: 'Adaptive Avatar Generation',
      description: 'Method for creating photorealistic 3D avatars with precise body measurements using multi-angle photography and AI-powered measurement extraction.',
      icon: '👤'
    },
    {
      id: 3,
      title: 'Fabric Fit Comparator',
      description: 'Advanced textile simulation engine that predicts garment fit and drape on individual body types with unprecedented accuracy.',
      icon: '📏'
    },
    {
      id: 4,
      title: 'ABVET Dual-Biometric Payment',
      description: 'Secure payment system combining iris recognition and voice biometric authentication with multi-factor verification and encrypted transaction processing.',
      icon: '👁️'
    },
    {
      id: 5,
      title: 'Smart & Solidarity Wardrobes',
      description: 'Intelligent wardrobe management system that digitalizes existing clothing and facilitates circular fashion through automated donation and exchange.',
      icon: '👔'
    },
    {
      id: 6,
      title: 'Fashion Trend Tracker (FTT)',
      description: 'Real-time trend analysis system that aggregates data from social media, runways, and sales to predict and identify emerging fashion trends.',
      icon: '📊'
    },
    {
      id: 7,
      title: 'Creative Auto-Production (CAP)',
      description: 'Automated design-to-production pipeline that enables mass customization and on-demand manufacturing at scale.',
      icon: '⚙️'
    },
    {
      id: 8,
      title: 'LiveIt Factory Orchestration',
      description: 'Intelligent supply chain management system that coordinates just-in-time production, optimizes factory resources, and minimizes waste.',
      icon: '🏭'
    }
  ]

  const trademarks = [
    { name: 'TRYONYOU®', category: 'Core Brand' },
    { name: 'ABVETOS®', category: 'Biometric System' },
    { name: 'ULTRA-PLUS-ULTIMATUM®', category: 'Complete Platform' },
    { name: 'LiveIt Factory®', category: 'Production Platform' },
    { name: 'PAU®', category: 'Avatar System' },
    { name: 'CAP®', category: 'Auto-Production' },
    { name: 'FTT®', category: 'Trend Analysis' }
  ]

  return (
    <section className="patents" id="patents">
      <div className="patents-container">
        <div className="patent-badge-container">
          <span 
            className="patent-badge"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            EPCT Pending
            <span className="info-icon">ℹ️</span>
          </span>
          {showTooltip && (
            <div className="patent-tooltip">
              <strong>EPCT (European Patent Convention Treaty) Pending</strong>
              <p>
                Our patent applications are currently under review by the European Patent Office. 
                This status provides provisional protection across all EPO member states while the 
                examination process is ongoing. Full patent grants are expected within 18-36 months.
              </p>
            </div>
          )}
        </div>

        <h2 className="section-title">Protected Innovation Portfolio</h2>
        <p className="patents-intro">
          Our technology is protected by a comprehensive IP portfolio valued at over <strong>€20M</strong>, 
          providing a <strong>5-7 year competitive advantage</strong> in the fashion-tech market.
        </p>

        <div className="ip-section">
          <h3 className="subsection-title">8 Super-Claims Patent Applications</h3>
          <div className="claims-grid">
            {superClaims.map((claim) => (
              <div key={claim.id} className="claim-card">
                <div className="claim-number">{claim.id}</div>
                <div className="claim-icon">{claim.icon}</div>
                <h3>{claim.title}</h3>
                <p>{claim.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ip-section">
          <h3 className="subsection-title">Registered Trademarks</h3>
          <div className="trademarks-grid">
            {trademarks.map((tm, index) => (
              <div key={index} className="trademark-card">
                <span className="trademark-name">{tm.name}</span>
                <span className="trademark-category">{tm.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ip-value">
          <h3 className="subsection-title">IP Portfolio Value</h3>
          <div className="value-stats">
            <div className="value-item">
              <span className="value-amount">€17-26M</span>
              <span className="value-label">Total IP Value</span>
            </div>
            <div className="value-item">
              <span className="value-amount">5-7 years</span>
              <span className="value-label">Competitive Advantage</span>
            </div>
            <div className="value-item">
              <span className="value-amount">€2-5M</span>
              <span className="value-label">Annual Licensing Potential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Patents
