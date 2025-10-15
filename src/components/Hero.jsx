import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function Hero() {
  const { t } = useLanguage()
  
  const scrollToDemo = () => {
    const element = document.getElementById('cta')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero hero-premium">
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
      
      <div className="hero-overlay-premium"></div>
      
      <div className="hero-content hero-content-premium">
        <div className="hero-badge">
          <span className="badge-icon">✨</span>
          <span>TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</span>
        </div>
        
        <h1 className="hero-title-premium">
          {t('hero.titleLine1', 'Vístete según')}
          <br />
          <span className="hero-title-gradient">
            {t('hero.titleLine2', 'cómo te sientes')}
          </span>
        </h1>
        
        <p className="hero-subtitle-premium">
          {t('hero.subtitleEmotional', 'Tu estilo, tu ritmo, tu energía. Una experiencia de moda que entiende quién eres y cómo quieres verte.')}
        </p>
        
        <div className="hero-features-grid">
          <div className="hero-feature-item">
            <span className="feature-icon">👤</span>
            <span>{t('hero.feature1', 'Avatar 3D Realista')}</span>
          </div>
          <div className="hero-feature-item">
            <span className="feature-icon">🎨</span>
            <span>{t('hero.feature2', 'IA Personal')}</span>
          </div>
          <div className="hero-feature-item">
            <span className="feature-icon">👁️</span>
            <span>{t('hero.feature3', 'Pago Biométrico')}</span>
          </div>
          <div className="hero-feature-item">
            <span className="feature-icon">⚡</span>
            <span>{t('hero.feature4', 'Producción JIT')}</span>
          </div>
        </div>
        
        <div className="hero-cta-group">
          <button className="hero-cta-primary" onClick={scrollToDemo}>
            <span>{t('hero.ctaPrimary', 'Experimenta el Futuro')}</span>
            <span className="cta-arrow">→</span>
          </button>
          <button className="hero-cta-secondary" onClick={() => {
            const element = document.getElementById('modules')
            if (element) element.scrollIntoView({ behavior: 'smooth' })
          }}>
            {t('hero.ctaSecondary', 'Ver Módulos')}
          </button>
        </div>
        
        <p className="hero-emotional-message">
          {t('hero.emotional', '"No solo vistes tu cuerpo, vistes tu momento"')}
        </p>
      </div>

      <div className="scroll-indicator-premium">
        <div className="mouse-premium">
          <div className="wheel-premium"></div>
        </div>
        <span className="scroll-text">{t('hero.scrollText', 'Descubre más')}</span>
      </div>
    </section>
  )
}

export default Hero

