import React, { useState, useEffect, useRef } from 'react'

function PersonalShopper() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState('initial') // initial, snap, avatar, spiral, tuxedo, message
  const [sparkles, setSparkles] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  const startAnimation = () => {
    // Fase 1: Chasquido de plumas con chispas (0.5s)
    setTimeout(() => {
      setAnimationPhase('snap')
      generateSparkles()
    }, 100)
    
    // Fase 2: Silueta fluorescente del avatar (0.5s)
    setTimeout(() => setAnimationPhase('avatar'), 700)
    
    // Fase 3: Avatar nace en espiral (1s)
    setTimeout(() => setAnimationPhase('spiral'), 1200)
    
    // Fase 4: Se pone de smoking (0.8s)
    setTimeout(() => setAnimationPhase('tuxedo'), 2200)
    
    // Fase 5: Aparece el mensaje (1s después)
    setTimeout(() => setAnimationPhase('message'), 3000)
  }

  const generateSparkles = () => {
    const newSparkles = []
    for (let i = 0; i < 12; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 0.5 + Math.random() * 0.5
      })
    }
    setSparkles(newSparkles)
    
    // Limpiar chispas después de la animación
    setTimeout(() => setSparkles([]), 1000)
  }

  return (
    <section className="personal-shopper" ref={sectionRef}>
      <div className="personal-shopper-container">
        <div className={`shopper-animation phase-${animationPhase}`}>
          <div className="peacock-wrapper">
            <img 
              src="/personal-shopper.png" 
              alt="Personal Shopper" 
              className="peacock-image"
            />
            <div className="avatar-silhouette"></div>
            <div className="avatar-spiral"></div>
            <div className="tuxedo-overlay"></div>
            <div className="feather-particles">
              {sparkles.map(sparkle => (
                <div
                  key={sparkle.id}
                  className="sparkle"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                    animationDelay: `${sparkle.delay}s`,
                    animationDuration: `${sparkle.duration}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`shopper-message ${animationPhase === 'message' ? 'visible' : ''}`}>
          <h2 className="message-title">
            A Revolutionary System to Get Online Shopping Right?
          </h2>
          <p className="message-subtitle">
            Don't let them tell you about it.
          </p>
          <p className="message-cta">
            <strong>Live it :)</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PersonalShopper
