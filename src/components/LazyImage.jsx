import React, { useState, useEffect, useRef } from 'react'

/**
 * LazyImage Component
 * Optimized image loading with Intersection Observer API
 * Reduces initial page load by deferring off-screen images
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  threshold = 0.1,
  rootMargin = '50px',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load image immediately
      setImageSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    if (isInView && imageSrc !== src) {
      // Preload image
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`)
        setIsLoaded(true) // Mark as loaded even on error to prevent infinite loading
      }
    }
  }, [isInView, src, imageSrc])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'lazy-loaded' : 'lazy-loading'}`}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}

export default LazyImage

