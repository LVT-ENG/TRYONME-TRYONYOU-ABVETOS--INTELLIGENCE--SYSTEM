import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function UserJourney() {
  const { t } = useLanguage()

  const journeySteps = [
    {
      id: 1,
      icon: '👤',
      title: t('journey.step1.title', 'Your Preferences'),
      description: t('journey.step1.desc', 'Tell us about your style, mood, and what makes you feel confident'),
      image: '/images/people/beauty-emotion-portrait.jpg'
    },
    {
      id: 2,
      icon: '🎨',
      title: t('journey.step2.title', 'Digital Avatar'),
      description: t('journey.step2.desc', 'Create your realistic 3D avatar with precise measurements'),
      image: '/avatar-module.png'
    },
    {
      id: 3,
      icon: '✨',
      title: t('journey.step3.title', 'AI Recommendations'),
      description: t('journey.step3.desc', 'PAU analyzes your emotions and suggests perfect outfits'),
      image: '/personal-shopper.png'
    },
    {
      id: 4,
      icon: '👁️',
      title: t('journey.step4.title', 'Biometric Payment'),
      description: t('journey.step4.desc', 'Secure checkout with ABVET iris + voice recognition'),
      image: '/payment-module.png'
    }
  ]

  return (
    <section className="user-journey" id="user-journey">
      <div className="journey-container">
        {/* Section Header */}
        <div className="journey-header">
          <span className="journey-badge">
            <span className="badge-icon">🔄</span>
            <span className="badge-text">Your Fashion Journey</span>
          </span>
          <h2 className="journey-title">
            How TRYONYOU Works
          </h2>
          <p className="journey-subtitle">
            A seamless experience from emotion to style, powered by AI and biometric technology
          </p>
        </div>

        {/* Journey Steps */}
        <div className="journey-steps">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="journey-step" data-step={index + 1}>
              {/* Step Number */}
              <div className="step-number">
                <span className="step-number-text">{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Step Content */}
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              {/* Step Image */}
              <div className="step-image">
                <div className="step-image-glow"></div>
                <img 
                  src={step.image} 
                  alt={step.title}
                  loading="lazy"
                />
              </div>

              {/* Connector Line */}
              {index < journeySteps.length - 1 && (
                <div className="step-connector">
                  <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                    <line 
                      x1="0" 
                      y1="1" 
                      x2="100" 
                      y2="1" 
                      stroke="url(#gradient-line)" 
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <defs>
                      <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#4169E1', stopOpacity: 0.3 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Journey CTA */}
        <div className="journey-cta">
          <button 
            className="journey-cta-button"
            onClick={() => {
              const element = document.getElementById('cta')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>Start Your Journey</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default UserJourney

