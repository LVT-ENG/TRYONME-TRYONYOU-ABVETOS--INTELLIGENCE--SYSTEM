/**
 * Prefetch critical resources for better performance
 * Implements resource hints for fonts, images, and critical assets
 */

export const prefetchCriticalResources = () => {
  // Prefetch critical images
  const criticalImages = [
    '/logo.png',
    '/hero-bg.png',
    '/avatar-module.png',
    '/personal-shopper.png',
    '/payment-module.png',
    '/wardrobe-module.png',
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

export const prefetchNextPageChunks = () => {
  // Auto-detect and prefetch component chunks from link tags
  // Vite generates modulepreload links that we can convert to prefetch
  const modulePreloadLinks = document.querySelectorAll('link[rel="modulepreload"]')
  
  modulePreloadLinks.forEach(link => {
    // Create prefetch for non-critical chunks
    if (link.href && !link.href.includes('vendor-react')) {
      const prefetchLink = document.createElement('link')
      prefetchLink.rel = 'prefetch'
      prefetchLink.as = 'script'
      prefetchLink.href = link.href
      document.head.appendChild(prefetchLink)
    }
  })
}

export const preloadFonts = () => {
  // Preload critical fonts if any
  const criticalFonts = [
    // Add font URLs here when fonts are defined
  ]

  criticalFonts.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = href
    document.head.appendChild(link)
  })
}

export const addDNSPrefetch = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]

  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
  })
}

export const initPerformanceOptimizations = () => {
  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addDNSPrefetch()
      preloadFonts()
      
      // Prefetch non-critical resources after page load
      window.addEventListener('load', () => {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            prefetchCriticalResources()
            prefetchNextPageChunks()
          }, { timeout: 2000 })
        } else {
          setTimeout(() => {
            prefetchCriticalResources()
            prefetchNextPageChunks()
          }, 1000)
        }
      })
    })
  } else {
    addDNSPrefetch()
    preloadFonts()
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        prefetchCriticalResources()
        prefetchNextPageChunks()
      }, { timeout: 2000 })
    } else {
      setTimeout(() => {
        prefetchCriticalResources()
        prefetchNextPageChunks()
      }, 1000)
    }
  }
}

