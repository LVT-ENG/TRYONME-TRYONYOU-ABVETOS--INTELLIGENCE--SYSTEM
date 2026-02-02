/**
 * ANALYTICS SYSTEM - TRYONYOU ULTRA V7.0
 * Sistema de métricas y análisis de comportamiento
 */

// Configuración de Analytics
const ANALYTICS_CONFIG = {
  enabled: import.meta.env.VITE_ANALYTICS_ENABLED !== 'false',
  googleAnalyticsId: import.meta.env.VITE_GA_TRACKING_ID,
  vercelAnalytics: import.meta.env.VITE_VERCEL_ANALYTICS === 'true',
  customEndpoint: '/api/analytics',
};

/**
 * Inicializar Google Analytics
 */
export const initGoogleAnalytics = () => {
  if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.googleAnalyticsId) {
    console.log('[Analytics] Google Analytics disabled or not configured');
    return;
  }

  // Cargar Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
  document.head.appendChild(script);

  // Inicializar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.googleAnalyticsId);

  console.log('[Analytics] Google Analytics initialized');
};

/**
 * Inicializar Vercel Analytics
 */
export const initVercelAnalytics = () => {
  if (!ANALYTICS_CONFIG.vercelAnalytics) {
    return;
  }

  // Vercel Analytics se inicializa automáticamente en producción
  console.log('[Analytics] Vercel Analytics enabled');
};

/**
 * Trackear evento personalizado
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (!ANALYTICS_CONFIG.enabled) return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Custom endpoint para métricas propias
  sendCustomMetric({
    type: 'event',
    name: eventName,
    data: eventData,
    timestamp: Date.now(),
  });

  console.log('[Analytics] Event tracked:', eventName, eventData);
};

/**
 * Trackear vista de página
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (!ANALYTICS_CONFIG.enabled) return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  // Custom endpoint
  sendCustomMetric({
    type: 'pageview',
    path: pagePath,
    title: pageTitle,
    timestamp: Date.now(),
  });

  console.log('[Analytics] Page view tracked:', pagePath);
};

/**
 * Trackear sesión de escaneo biométrico
 */
export const trackBiometricScan = (sessionId, data) => {
  trackEvent('biometric_scan', {
    session_id: sessionId,
    gender: data.gender,
    scan_duration: data.duration,
    scan_progress: data.progress,
  });
};

/**
 * Trackear recomendación aceptada
 */
export const trackRecommendationAccepted = (sessionId, garmentId, fitScore) => {
  trackEvent('recommendation_accepted', {
    session_id: sessionId,
    garment_id: garmentId,
    fit_score: fitScore,
  });
};

/**
 * Trackear conversión (compra/reserva)
 */
export const trackConversion = (sessionId, garmentId, value, currency = 'EUR') => {
  trackEvent('conversion', {
    session_id: sessionId,
    garment_id: garmentId,
    value,
    currency,
  });

  // Google Analytics ecommerce tracking
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: sessionId,
      value,
      currency,
      items: [{
        item_id: garmentId,
        item_name: 'Lafayette Garment',
      }],
    });
  }
};

/**
 * Trackear métricas de usuario
 */
export const trackUserMetrics = (metrics) => {
  const {
    sessionId,
    duration,
    scanCompletionRate,
    recommendationAcceptance,
    userRetention,
    fitScoreDistribution,
  } = metrics;

  sendCustomMetric({
    type: 'user_metrics',
    session_id: sessionId,
    duration,
    scan_completion_rate: scanCompletionRate,
    recommendation_acceptance: recommendationAcceptance,
    user_retention: userRetention,
    fit_score_distribution: fitScoreDistribution,
    timestamp: Date.now(),
  });
};

/**
 * Enviar métrica personalizada al backend
 */
const sendCustomMetric = async (metric) => {
  if (!ANALYTICS_CONFIG.customEndpoint) return;

  try {
    await fetch(ANALYTICS_CONFIG.customEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    });
  } catch (error) {
    console.error('[Analytics] Error sending custom metric:', error);
  }
};

/**
 * Inicializar todos los sistemas de analytics
 */
export const initAnalytics = () => {
  initGoogleAnalytics();
  initVercelAnalytics();
  
  // Trackear la primera vista de página
  trackPageView(window.location.pathname, document.title);
};

/**
 * Hook para React - usar en App.jsx
 */
export const useAnalytics = () => {
  return {
    trackEvent,
    trackPageView,
    trackBiometricScan,
    trackRecommendationAccepted,
    trackConversion,
    trackUserMetrics,
  };
};

// Exportar configuración para debugging
export const getAnalyticsConfig = () => ANALYTICS_CONFIG;
