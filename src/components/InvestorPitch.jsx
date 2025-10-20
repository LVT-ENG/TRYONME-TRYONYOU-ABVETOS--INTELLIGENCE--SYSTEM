import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function InvestorPitch() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('market')

  const marketData = [
    { label: 'Global Fashion E-commerce', value: '$765B', growth: '+11.3% CAGR' },
    { label: 'Return Rate Problem', value: '$550B', impact: 'Annual Loss' },
    { label: 'Target Market (2025)', value: '$120M', segment: 'Premium Tech' },
    { label: 'Projected Revenue (2027)', value: '$400M', confidence: '85%' }
  ]

  const techMetrics = [
    { metric: 'Patent Portfolio Value', value: '€20M+', status: 'Protected' },
    { metric: 'Patent Applications', value: '8', status: 'Filed' },
    { metric: 'Competitive Advantage', value: '5-7 years', status: 'Secured' },
    { metric: 'Return Rate Reduction', value: '-85%', status: 'Proven' }
  ]

  const traction = [
    { milestone: 'Beta Users', count: '1,250+', trend: '+40% MoM' },
    { milestone: 'Satisfaction Score', count: '4.9/5', trend: '98% Positive' },
    { milestone: 'Avg. Session Time', count: '12.3 min', trend: '+35% vs Industry' },
    { milestone: 'Conversion Rate', count: '8.2%', trend: '3x Industry Avg' }
  ]

  return (
    <section className="investor-pitch" id="investor-pitch">
      <div className="pitch-container">
        {/* Section Header */}
        <div className="pitch-header">
          <span className="pitch-badge">
            <span className="badge-icon">📊</span>
            <span className="badge-text">Investment Opportunity</span>
          </span>
          <h2 className="pitch-title">
            Transforming Fashion Commerce
            <br />
            <span className="title-gradient">With Proven Technology</span>
          </h2>
          <p className="pitch-subtitle">
            Patent-protected innovation solving a $550B problem in global fashion e-commerce
          </p>
        </div>

        {/* Tabs */}
        <div className="pitch-tabs">
          <button 
            className={`pitch-tab ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            <span className="tab-icon">🌍</span>
            <span className="tab-text">Market Opportunity</span>
          </button>
          <button 
            className={`pitch-tab ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            <span className="tab-icon">🔬</span>
            <span className="tab-text">Technology & IP</span>
          </button>
          <button 
            className={`pitch-tab ${activeTab === 'traction' ? 'active' : ''}`}
            onClick={() => setActiveTab('traction')}
          >
            <span className="tab-icon">📈</span>
            <span className="tab-text">Traction & Metrics</span>
          </button>
        </div>

        {/* Content */}
        <div className="pitch-content">
          {/* Market Opportunity */}
          {activeTab === 'market' && (
            <div className="pitch-section fade-in">
              <div className="pitch-grid">
                {marketData.map((item, index) => (
                  <div key={index} className="pitch-card market-card">
                    <div className="card-label">{item.label}</div>
                    <div className="card-value">{item.value}</div>
                    <div className="card-meta">
                      {item.growth && <span className="meta-growth">{item.growth}</span>}
                      {item.impact && <span className="meta-impact">{item.impact}</span>}
                      {item.segment && <span className="meta-segment">{item.segment}</span>}
                      {item.confidence && <span className="meta-confidence">{item.confidence}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Visualization */}
              <div className="pitch-visual">
                <div className="visual-header">
                  <h3 className="visual-title">The Fashion Returns Crisis</h3>
                  <p className="visual-subtitle">How TRYONYOU solves the industry's biggest problem</p>
                </div>
                <div className="visual-chart">
                  <div className="chart-bar">
                    <div className="bar-label">Industry Average</div>
                    <div className="bar-container">
                      <div className="bar-fill bar-problem" style={{ width: '40%' }}>
                        <span className="bar-value">40% Return Rate</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-bar">
                    <div className="bar-label">With TRYONYOU</div>
                    <div className="bar-container">
                      <div className="bar-fill bar-solution" style={{ width: '6%' }}>
                        <span className="bar-value">6% Return Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="visual-impact">
                  <div className="impact-stat">
                    <div className="impact-value">-85%</div>
                    <div className="impact-label">Return Reduction</div>
                  </div>
                  <div className="impact-stat">
                    <div className="impact-value">$550B</div>
                    <div className="impact-label">Problem Size</div>
                  </div>
                  <div className="impact-stat">
                    <div className="impact-value">+25%</div>
                    <div className="impact-label">Conversion Lift</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Technology & IP */}
          {activeTab === 'tech' && (
            <div className="pitch-section fade-in">
              <div className="pitch-grid">
                {techMetrics.map((item, index) => (
                  <div key={index} className="pitch-card tech-card">
                    <div className="card-label">{item.metric}</div>
                    <div className="card-value">{item.value}</div>
                    <div className="card-status">
                      <span className="status-badge status-success">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology Stack Visual */}
              <div className="pitch-visual">
                <div className="visual-header">
                  <h3 className="visual-title">Patent-Protected Technology Stack</h3>
                  <p className="visual-subtitle">8 patent applications covering core innovations</p>
                </div>
                <div className="tech-stack">
                  <div className="tech-layer">
                    <div className="layer-icon">👤</div>
                    <div className="layer-content">
                      <h4 className="layer-title">3D Avatar Generation</h4>
                      <p className="layer-desc">Millimeter-precise body scanning & photorealistic rendering</p>
                    </div>
                  </div>
                  <div className="tech-layer">
                    <div className="layer-icon">🧠</div>
                    <div className="layer-content">
                      <h4 className="layer-title">Emotional AI (PAU)</h4>
                      <p className="layer-desc">Mood-based recommendations & style evolution learning</p>
                    </div>
                  </div>
                  <div className="tech-layer">
                    <div className="layer-icon">👁️</div>
                    <div className="layer-content">
                      <h4 className="layer-title">Dual-Biometric Auth (ABVET)</h4>
                      <p className="layer-desc">Iris + voice recognition for sub-second checkout</p>
                    </div>
                  </div>
                  <div className="tech-layer">
                    <div className="layer-icon">⚙️</div>
                    <div className="layer-content">
                      <h4 className="layer-title">On-Demand Production (CAP)</h4>
                      <p className="layer-desc">Automated design-to-manufacturing pipeline</p>
                    </div>
                  </div>
                </div>
                <img 
                  src="/docs/screenshots-modules.png" 
                  alt="TRYONYOU Technology Modules"
                  className="tech-screenshot"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Traction & Metrics */}
          {activeTab === 'traction' && (
            <div className="pitch-section fade-in">
              <div className="pitch-grid">
                {traction.map((item, index) => (
                  <div key={index} className="pitch-card traction-card">
                    <div className="card-label">{item.milestone}</div>
                    <div className="card-value">{item.count}</div>
                    <div className="card-trend">
                      <span className="trend-badge trend-up">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashboard Preview */}
              <div className="pitch-visual">
                <div className="visual-header">
                  <h3 className="visual-title">Real-Time Analytics Dashboard</h3>
                  <p className="visual-subtitle">Live monitoring of all system metrics and user engagement</p>
                </div>
                <div className="dashboard-preview">
                  <img 
                    src="/docs/agent_performance_dashboard.png" 
                    alt="ABVETOS Performance Dashboard"
                    className="dashboard-image"
                    loading="lazy"
                  />
                  <div className="dashboard-overlay">
                    <div className="overlay-stat">
                      <div className="overlay-value">99.9%</div>
                      <div className="overlay-label">Uptime</div>
                    </div>
                    <div className="overlay-stat">
                      <div className="overlay-value">1.2s</div>
                      <div className="overlay-label">Avg Load Time</div>
                    </div>
                    <div className="overlay-stat">
                      <div className="overlay-value">24/7</div>
                      <div className="overlay-label">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Investment CTA */}
        <div className="pitch-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Transform Fashion Together?</h3>
            <p className="cta-subtitle">Join us in revolutionizing how the world shops for fashion</p>
          </div>
          <button 
            className="cta-button"
            onClick={() => {
              const element = document.getElementById('cta')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>Request Investor Deck</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default InvestorPitch

