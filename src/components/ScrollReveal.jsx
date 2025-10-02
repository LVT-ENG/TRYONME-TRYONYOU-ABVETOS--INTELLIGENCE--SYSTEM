import React, { useEffect, useRef, useState } from 'react'

/**
 * ScrollReveal Component
 * Adds reveal animations when elements enter the viewport
 * Supports different animation types: fade, slide-left, slide-right, scale, rotate
 */
function ScrollReveal({ children, animation = 'fade', delay = 0, threshold = 0.2, className = '' }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Optionally unobserve after revealing
          // observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold])

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'reveal'
      case 'slide-left':
        return 'reveal-left'
      case 'slide-right':
        return 'reveal-right'
      case 'scale':
        return 'reveal-scale'
      case 'rotate':
        return 'reveal-rotate'
      default:
        return 'reveal'
    }
  }

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
