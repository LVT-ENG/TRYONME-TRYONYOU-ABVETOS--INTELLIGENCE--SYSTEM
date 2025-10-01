import React from 'react'

function Patents() {
  const patents = [
    {
      id: 'context-layer',
      title: 'Context Engineering Layer',
      type: 'Patent Application',
      status: 'EPCT Pending',
      description: 'Revolutionary system architecture that dynamically adapts fashion recommendations based on multi-dimensional user context including biometric measurements, environmental factors, and real-time trend analysis.',
      claims: [
        'Context-aware recommendation engine',
        'Multi-factor personalization system',
        'Adaptive learning algorithms',
        'Real-time context integration'
      ]
    },
    {
      id: 'avatar-generation',
      title: 'Adaptive Avatar Generation',
      type: 'Patent Application',
      status: 'EPCT Pending',
      description: 'Method for creating photorealistic 3D avatars with precise body measurements using multi-angle photography and AI-powered measurement extraction.',
      claims: [
        '3D body scanning technology',
        'Photorealistic rendering engine',
        'Fabric simulation system',
        'Real-time fitting visualization'
      ]
    },
    {
      id: 'abvet-payment',
      title: 'ABVET Biometric Payment',
      type: 'Patent Application',
      status: 'EPCT Pending',
      description: 'Secure payment system combining iris recognition and voice biometric authentication with multi-factor verification and encrypted transaction processing.',
      claims: [
        'Iris recognition technology',
        'Voice biometric authentication',
        'Multi-factor verification',
        'Encrypted transaction processing'
      ]
    },
    {
      id: 'jit-orchestration',
      title: 'JIT Fashion Orchestration',
      type: 'Patent Application',
      status: 'EPCT Pending',
      description: 'Intelligent supply chain management system that coordinates on-demand production, optimizes factory resources, and enables mass customization at scale.',
      claims: [
        'Just-in-time production coordination',
        'AI-driven resource allocation',
        'Predictive waste minimization',
        'Mass customization engine'
      ]
    }
  ]

  const trademarks = [
    { name: 'TRYONYOU®', category: 'Core Brand' },
    { name: 'ABVET®', category: 'Payment System' },
    { name: 'LiveIt Factory®', category: 'Production Platform' },
    { name: 'PAU®', category: 'Avatar System' },
    { name: 'CAP®', category: 'Auto-Production' },
    { name: 'FTT®', category: 'Trend Analysis' }
  ]

  return (
    <section className="patents" id="patents">
      <div className="patents-container">
        <h2 className="section-title">Patents & Intellectual Property</h2>
        <p className="patents-intro">
          Our technology is protected by a comprehensive IP portfolio valued at over €20M, 
          providing a 5-7 year competitive advantage in the fashion-tech market.
        </p>

        <div className="ip-section">
          <h3 className="subsection-title">Patent Applications</h3>
          <div className="patents-grid">
            {patents.map((patent) => (
              <div key={patent.id} className="patent-card">
                <div className="patent-header">
                  <span className="patent-type">{patent.type}</span>
                  <span className={`patent-status ${patent.status.toLowerCase().replace(' ', '-')}`}>
                    {patent.status}
                  </span>
                </div>
                <h4 className="patent-title">{patent.title}</h4>
                <p className="patent-description">{patent.description}</p>
                <div className="patent-claims">
                  <strong>Key Claims:</strong>
                  <ul>
                    {patent.claims.map((claim, index) => (
                      <li key={index}>{claim}</li>
                    ))}
                  </ul>
                </div>
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
