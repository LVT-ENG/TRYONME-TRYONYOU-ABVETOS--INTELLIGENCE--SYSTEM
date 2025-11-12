import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import '../styles/TransitionScene.css'

function TransitionScene() {
  const { t } = useLanguage()
  const [activeScene, setActiveScene] = useState(0)
  const sectionRef = useRef(null)

  // Scroll-based scene activation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.top / viewportHeight)))
      
      // Determinar escena activa basada en el scroll
      if (scrollProgress < 0.2) {
        setActiveScene(0)
      } else if (scrollProgress < 0.4) {
        setActiveScene(1)
      } else if (scrollProgress < 0.6) {
        setActiveScene(2)
      } else if (scrollProgress < 0.8) {
        setActiveScene(3)
      } else {
        setActiveScene(4)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scenes = [
    {
      id: 'code-of-style',
      title: 'THE CODE OF STYLE',
      subtitle: 'Every body has a code',
      description: 'Cada cuerpo tiene un código. Cada emoción, una forma. TRYONYOU decodifica quién eres… para vestir lo que sientes.',
      image: '/scenes/mannequin-red-jacket.jpg',
      color: '#D4AF37',
      icon: '🧬'
    },
    {
      id: 'pau-mirror',
      title: 'PAU® — THE EMOTIONAL MIRROR',
      subtitle: 'Your style vibrates with your energy',
      description: 'Tu estilo vibra con tu energía. PAU percibe tu estado emocional y elige la versión de ti que el mundo necesita ver.',
      image: '/scenes/insurrection-fluorescent.jpg',
      color: '#00F5FF',
      icon: '👁️'
    },
    {
      id: 'cap-creation',
      title: 'CAP® — CREATION IN MOTION',
      subtitle: 'Your emotion becomes pattern',
      description: 'Tu emoción se convierte en patrón. Cada prenda nace digitalmente, sin residuos, sin límites, sin error.',
      image: '/scenes/holographic-dress.jpg',
      color: '#4169E1',
      icon: '⚙️'
    },
    {
      id: 'abvet-payment',
      title: 'ABVET® — DUAL BIOMETRIC PAYMENT',
      subtitle: 'One identity. Ultimate security.',
      description: 'Tu rostro. Tu voz. Una sola identidad. El lujo más seguro es ser tú.',
      image: '/scenes/abvet-logo-gold.jpg',
      color: '#FFD700',
      icon: '💳'
    },
    {
      id: 'abvetos-orchestra',
      title: 'ABVETOS® — THE INTELLIGENT ORCHESTRA',
      subtitle: 'The system that understands you',
      description: 'Un ecosistema que aprende, anticipa y crea. ABVETOS orquesta cada módulo para que tu experiencia sea perfecta.',
      image: '/scenes/peacock-metallic.jpg',
      color: '#9370DB',
      icon: '🧠'
    }
  ]

  return (
    <section id="transition" className="transition-scene" ref={sectionRef}>
      <div className="transition-container">
        {/* Header */}
        <div className="transition-header">
          <span className="transition-badge">🎬 WEAR YOUR INTELLIGENCE</span>
          <h2 className="transition-title">The Journey from Real to Digital</h2>
          <p className="transition-subtitle">
            Descubre cómo TRYONYOU transforma tu identidad en una experiencia de moda inteligente
          </p>
        </div>

        {/* Scenes */}
        <div className="scenes-wrapper">
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              className={`scene-card ${activeScene === index ? 'active' : ''} ${activeScene > index ? 'passed' : ''}`}
              style={{ '--scene-color': scene.color }}
            >
              {/* Scene Number */}
              <div className="scene-number">
                <span className="scene-icon">{scene.icon}</span>
                <span className="scene-index">SCENE {index + 1}</span>
              </div>

              {/* Scene Content */}
              <div className="scene-content">
                <div className="scene-text">
                  <h3 className="scene-title">{scene.title}</h3>
                  <p className="scene-subtitle">{scene.subtitle}</p>
                  <p className="scene-description">{scene.description}</p>
                  
                  {/* Scene Progress */}
                  <div className="scene-progress">
                    <div 
                      className="scene-progress-bar"
                      style={{ 
                        width: activeScene === index ? '100%' : activeScene > index ? '100%' : '0%' 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Scene Visual */}
                <div className="scene-visual">
                  <div className="scene-image-wrapper">
                    <div className="scene-image-placeholder">
                      <span className="placeholder-icon">{scene.icon}</span>
                      <span className="placeholder-text">{scene.title}</span>
                    </div>
                    {/* Aquí se cargarían las imágenes reales */}
                    {/* <img src={scene.image} alt={scene.title} className="scene-image" /> */}
                  </div>
                  
                  {/* Data Overlay Effect */}
                  <div className="scene-data-overlay">
                    <div className="data-line"></div>
                    <div className="data-line"></div>
                    <div className="data-line"></div>
                  </div>
                </div>
              </div>

              {/* Scene Glow Effect */}
              <div className="scene-glow"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="transition-cta">
          <p className="cta-text">
            "No solo vistes tu cuerpo, vistes tu momento"
          </p>
          <button className="cta-button">
            <span>Experience TRYONYOU</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="transition-bg-effects">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-particles"></div>
      </div>
    </section>
  )
}

export default TransitionScene

