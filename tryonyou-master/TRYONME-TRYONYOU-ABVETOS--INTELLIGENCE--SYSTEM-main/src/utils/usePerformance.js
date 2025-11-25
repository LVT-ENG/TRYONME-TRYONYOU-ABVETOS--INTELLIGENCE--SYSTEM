import { useEffect, useCallback } from 'react'

/**
 * Custom hook for performance monitoring and optimization
 */
export const usePerformance = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window || typeof window !== 'undefined') {
      // Report performance metrics
      const reportWebVitals = (metric) => {
        console.log(`[Performance] ${metric.name}:`, metric.value)
        
        // Send to analytics if needed
        if (window.gtag) {
          window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          })
        }
      }

      // Use web-vitals library if available
      if (typeof window.webVitals !== 'undefined') {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals
        getCLS(reportWebVitals)
        getFID(reportWebVitals)
        getFCP(reportWebVitals)
        getLCP(reportWebVitals)
        getTTFB(reportWebVitals)
      }
    }
  }, [])
}

/**
 * Hook to defer non-critical operations until idle
 */
export const useIdleCallback = (callback, deps = []) => {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = requestIdleCallback(callback, { timeout: 2000 })
      return () => cancelIdleCallback(handle)
    } else {
      const timeout = setTimeout(callback, 1000)
      return () => clearTimeout(timeout)
    }
  }, deps)
}

/**
 * Hook to preload resources on hover (for better perceived performance)
 */
export const useHoverPreload = () => {
  const preloadOnHover = useCallback((url, type = 'script') => {
    return (e) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = type
      link.href = url
      document.head.appendChild(link)
    }
  }, [])

  return { preloadOnHover }
}

/**
 * Hook to measure component render time
 */
export const useRenderTime = (componentName) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (renderTime > 16) { // More than one frame (60fps)
        console.warn(`[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render`)
      }
    }
  })
}

/**
 * Hook to optimize images with Intersection Observer
 */
export const useImageOptimization = (imageRefs) => {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = img.dataset.src
            
            if (src) {
              img.src = src
              img.removeAttribute('data-src')
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    imageRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [imageRefs])
}

export default {
  usePerformance,
  useIdleCallback,
  useHoverPreload,
  useRenderTime,
  useImageOptimization
}

