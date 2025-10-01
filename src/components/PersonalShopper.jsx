import React, { useState, useEffect, useRef } from 'react'

function PersonalShopper() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState('initial') // initial, snap, avatar, tuxedo, message
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
    // Fase 1: Chasquido de plumas (0.5s)
    setTimeout(() => setAnimationPhase('snap'), 100)
    
    // Fase 2: Silueta fluorescente del avatar (0.5s)
    setTimeout(() => setAnimationPhase('avatar'), 600)
    
    // Fase 3: Se pone de smoking (0.8s)
    setTimeout(() => setAnimationPhase('tuxedo'), 1100)
    
    // Fase 4: Aparece el mensaje (1s después)
    setTimeout(() => setAnimationPhase('message'), 1900)
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
            <div className="tuxedo-overlay"></div>
            <div className="feather-particles"></div>
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
