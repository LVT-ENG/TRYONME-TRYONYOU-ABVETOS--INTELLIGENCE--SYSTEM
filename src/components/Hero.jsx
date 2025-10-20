import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function Hero() {
  const { t } = useLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const scrollToDemo = () => {
    const element = document.getElementById('cta')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToModules = () => {
    const element = document.getElementById('modules')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero hero-modern">
      {/* Background with gradient overlay */}
      <div className="hero-background">
        <div className="hero-gradient-overlay"></div>
        <div className="hero-pattern"></div>
      </div>

      {/* Holographic Avatar Hero Image */}
      <div className="hero-holographic-avatar">
        <div className="holographic-glow"></div>
        <img 
          src="/press/images/hero-futuristic-fitting.jpg" 
          alt="Holographic Digital Avatar - TRYONYOU"
          className="hero-avatar-image"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="holographic-particles"></div>
      </div>
      
      <div className="hero-content hero-content-modern">
        {/* Badge */}
        <div className="hero-badge-modern">
          <span className="badge-icon">✨</span>
          <span className="badge-text">TRYONYOU – ABVETOS – ULTRA-PLUS-ULTIMATUM</span>
        </div>
        
        {/* Main Title */}
        <h1 className="hero-title-modern">
          {t('hero.titleLine1', 'Dress according to')}
          <br />
          <span className="hero-title-gradient-modern">
            {t('hero.titleLine2', 'how you feel')}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-subtitle-modern">
          {t('hero.subtitleEmotional', 'Your style, your rhythm, your energy. A fashion experience that understands who you are and how you want to look.')}
        </p>
        
        {/* Features Grid */}
        <div className="hero-features-grid-modern">
          <div className="hero-feature-modern">
            <div className="feature-icon-modern">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="feature-text-modern">{t('hero.feature1', 'Realistic 3D Avatar')}</span>
          </div>
          
          <div className="hero-feature-modern">
            <div className="feature-icon-modern">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM12 17C9.79 17 8 15.21 8 13C8 10.79 9.79 9 12 9C14.21 9 16 10.79 16 13C16 15.21 14.21 17 12 17Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="feature-text-modern">{t('hero.feature2', 'Personal AI')}</span>
          </div>
          
          <div className="hero-feature-modern">
            <div className="feature-icon-modern">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="feature-text-modern">{t('hero.feature3', 'Biometric Payment')}</span>
          </div>
          
          <div className="hero-feature-modern">
            <div className="feature-icon-modern">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V15H12V17H15C16.1 17 17 16.1 17 15V12ZM7 7H9V10H12V7H14V10C14 11.1 13.1 12 12 12H9C7.9 12 7 11.1 7 10V7Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="feature-text-modern">{t('hero.feature4', 'JIT Production')}</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="hero-cta-group-modern">
          <button 
            className="hero-cta-primary-modern hero-cta-holographic"
            onClick={scrollToDemo}
            aria-label="Experience Your Digital Style"
          >
            <span className="cta-holographic-text">EXPERIENCE YOUR DIGITAL STYLE™</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="hero-cta-secondary-modern"
            onClick={scrollToModules}
            aria-label="View Modules"
          >
            <span>{t('hero.ctaSecondary', 'View Modules')}</span>
          </button>
        </div>
        
        {/* Emotional Quote */}
        <p className="hero-quote-modern">
          {t('hero.emotional', '"You don\'t just dress your body, you dress your moment"')}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">{t('hero.scrollText', 'Discover more')}</span>
        <div className="scroll-line"></div>
      </div>

      {/* Floating Elements */}
      <div className="hero-floating-elements">
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
      </div>
    </section>
  )
}

export default Hero

