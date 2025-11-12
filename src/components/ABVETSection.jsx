import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function ABVETSection() {
  const { t } = useLanguage()
  const [activeFeature, setActiveFeature] = useState('biometric')

  return (
    <section className="abvet-section" id="abvet">
      <div className="abvet-container">
        {/* Section Header */}
        <div className="abvet-header">
          <span className="abvet-badge">
            <span className="badge-icon">👁️</span>
            <span className="badge-text">ABVET + PAU Technology</span>
          </span>
          <h2 className="abvet-title">
            Biometric Security
            <br />
            <span className="title-gradient">Meets Emotional Intelligence</span>
          </h2>
          <p className="abvet-subtitle">
            The future of fashion commerce combines dual-biometric authentication 
            with AI that understands your emotions and style preferences.
          </p>
        </div>

        {/* Feature Toggle */}
        <div className="abvet-toggle">
          <button 
            className={`toggle-button ${activeFeature === 'biometric' ? 'active' : ''}`}
            onClick={() => setActiveFeature('biometric')}
          >
            <span className="toggle-icon">👁️</span>
            <span className="toggle-text">ABVET Biometric</span>
          </button>
          <button 
            className={`toggle-button ${activeFeature === 'emotional' ? 'active' : ''}`}
            onClick={() => setActiveFeature('emotional')}
          >
            <span className="toggle-icon">🦚</span>
            <span className="toggle-text">PAU Emotional AI</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="abvet-content">
          {/* ABVET Biometric Payment */}
          {activeFeature === 'biometric' && (
            <div className="abvet-feature-content fade-in">
              <div className="feature-visual">
                <div className="biometric-display">
                  <div className="iris-scanner">
                    <div className="iris-ring iris-ring-1"></div>
                    <div className="iris-ring iris-ring-2"></div>
                    <div className="iris-ring iris-ring-3"></div>
                    <div className="iris-center">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="30" stroke="url(#iris-gradient)" strokeWidth="2"/>
                        <circle cx="32" cy="32" r="20" stroke="url(#iris-gradient)" strokeWidth="1.5"/>
                        <circle cx="32" cy="32" r="10" fill="url(#iris-gradient)"/>
                        <defs>
                          <linearGradient id="iris-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <img 
                    src="/payment-module.png" 
                    alt="ABVET Biometric Payment System"
                    className="biometric-module-image"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="feature-details">
                <h3 className="feature-title">Dual-Biometric Authentication</h3>
                <p className="feature-description">
                  ABVET (Advanced Biometric Verification & Emotional Technology) combines 
                  iris recognition and voice biometrics for the most secure, frictionless 
                  payment experience in fashion e-commerce.
                </p>

                <div className="feature-benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Sub-Second Checkout</h4>
                      <p className="benefit-text">Complete purchases in under 0.8 seconds</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Bank-Grade Security</h4>
                      <p className="benefit-text">Military-level encryption and biometric verification</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Zero Fraud Risk</h4>
                      <p className="benefit-text">Impossible to replicate biometric signatures</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Privacy First</h4>
                      <p className="benefit-text">Biometric data never leaves your device</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAU Emotional AI */}
          {activeFeature === 'emotional' && (
            <div className="abvet-feature-content fade-in">
              <div className="feature-visual">
                <div className="pau-display">
                  <div className="pau-peacock">
                    <img 
                      src="/assets/brand/logo_master_symbol_only_final.svg" 
                      alt="PAU le Paon - Emotional AI"
                      className="pau-logo"
                      loading="lazy"
                    />
                    <div className="pau-aura"></div>
                  </div>
                  <img 
                    src="/personal-shopper.png" 
                    alt="PAU Emotional Intelligence System"
                    className="pau-module-image"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="feature-details">
                <h3 className="feature-title">PAU le Paon: Your Emotional Stylist</h3>
                <p className="feature-description">
                  PAU (Personal Avatar Universe) is an AI that understands not just your 
                  body, but your feelings. It analyzes your emotional state, preferences, 
                  and context to recommend outfits that make you feel confident and authentic.
                </p>

                <div className="feature-benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">🎨</div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Emotion Recognition</h4>
                      <p className="benefit-text">Analyzes facial expressions and voice tone to understand your mood</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">🧠</div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Context Awareness</h4>
                      <p className="benefit-text">Considers weather, occasion, and your schedule</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">💫</div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Style Evolution</h4>
                      <p className="benefit-text">Learns and adapts to your changing preferences over time</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">🦚</div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">Confidence Boost</h4>
                      <p className="benefit-text">Recommends outfits proven to make you feel your best</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technology Stats */}
        <div className="abvet-stats">
          <div className="abvet-stat">
            <div className="stat-value">99.9%</div>
            <div className="stat-label">Authentication Accuracy</div>
          </div>
          <div className="abvet-stat">
            <div className="stat-value">&lt;0.8s</div>
            <div className="stat-label">Payment Speed</div>
          </div>
          <div className="abvet-stat">
            <div className="stat-value">0</div>
            <div className="stat-label">Fraud Cases</div>
          </div>
          <div className="abvet-stat">
            <div className="stat-value">AI</div>
            <div className="stat-label">Emotional Intelligence</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ABVETSection

