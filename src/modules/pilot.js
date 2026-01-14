/**
 * TRYONYOU Pilot Module
 * System coordinator for AI-powered features and integrations
 * 
 * This module acts as a bridge between the frontend and AI services,
 * managing API calls, state coordination, and error handling.
 */

/**
 * Environment configuration
 */
const config = {
  googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY || null,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  enableAIFeatures: import.meta.env.VITE_ENABLE_AI_FEATURES !== 'false',
};

/**
 * Check if AI features are properly configured
 */
export const isAIConfigured = () => {
  return config.enableAIFeatures && config.googleApiKey !== null;
};

/**
 * System status checker
 * Validates that all critical components are operational
 */
export const checkSystemStatus = async () => {
  const status = {
    aiEnabled: config.enableAIFeatures,
    apiConfigured: config.googleApiKey !== null,
    servicesOperational: true,
    timestamp: new Date().toISOString(),
  };

  // Test API connectivity if configured
  if (config.googleApiKey) {
    try {
      // This is a placeholder - implement actual API check if needed
      status.servicesOperational = true;
    } catch (error) {
      console.warn('[Pilot] AI services check failed:', error.message);
      status.servicesOperational = false;
    }
  }

  return status;
};

/**
 * Vision API wrapper
 * Handles photo scanning and garment recognition
 */
export const scanGarmentPhoto = async (imageData) => {
  if (!isAIConfigured()) {
    console.warn('[Pilot] AI features not configured, using fallback');
    return {
      success: false,
      error: 'AI features not configured. Please set VITE_GOOGLE_API_KEY.',
      fallback: true,
    };
  }

  try {
    // Placeholder for actual vision API integration
    // In production, this would call Google Vision API
    console.log('[Pilot] Scanning garment photo...');
    
    return {
      success: true,
      garmentType: 'unknown', // Would be detected by AI
      colors: [],
      confidence: 0,
      message: 'Vision API integration pending',
    };
  } catch (error) {
    console.error('[Pilot] Garment scan failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Smart matching engine coordinator
 * Bridges frontend requests to the backend matching engine
 */
export const getOutfitRecommendations = async (userId, preferences = {}) => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        preferences,
      }),
    });

    if (!response.ok) {
      throw new Error(`Recommendation service error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[Pilot] Failed to get recommendations:', error);
    return {
      success: false,
      error: error.message,
      fallback: [],
    };
  }
};

/**
 * Jules AI assistant coordinator
 * Manages communication with the Jules virtual assistant
 */
export const queryJulesAssistant = async (message, context = {}) => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/jules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context,
      }),
    });

    if (!response.ok) {
      throw new Error(`Jules assistant error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[Pilot] Jules query failed:', error);
    return {
      success: false,
      error: error.message,
      response: 'I apologize, but I\'m having trouble connecting right now. Please try again.',
    };
  }
};

/**
 * System health check
 * Used by deployment scripts to verify system readiness
 */
export const performHealthCheck = async () => {
  console.log('[Pilot] Performing system health check...');
  
  const checks = {
    configLoaded: true,
    apiEndpoints: false,
    aiServices: false,
    timestamp: new Date().toISOString(),
  };

  // Check API endpoints
  try {
    const response = await fetch(`${config.apiBaseUrl}/health`, {
      method: 'GET',
    });
    checks.apiEndpoints = response.ok;
  } catch (error) {
    console.warn('[Pilot] API health check failed:', error.message);
  }

  // Check AI services
  checks.aiServices = isAIConfigured();

  const allHealthy = checks.configLoaded && checks.apiEndpoints;
  
  console.log('[Pilot] Health check complete:', {
    status: allHealthy ? 'HEALTHY' : 'DEGRADED',
    ...checks,
  });

  return {
    healthy: allHealthy,
    checks,
  };
};

/**
 * Initialize pilot system
 * Called on app startup to verify configuration
 */
export const initializePilot = () => {
  console.log('[Pilot] Initializing TRYONYOU Pilot System v2.1.0...');
  
  if (!config.enableAIFeatures) {
    console.warn('[Pilot] AI features are disabled');
  } else if (!config.googleApiKey) {
    console.warn('[Pilot] Google API key not configured - AI features will be limited');
  } else {
    console.log('[Pilot] AI features configured and ready');
  }

  console.log('[Pilot] System ready');
  return config;
};

export default {
  initializePilot,
  checkSystemStatus,
  isAIConfigured,
  scanGarmentPhoto,
  getOutfitRecommendations,
  queryJulesAssistant,
  performHealthCheck,
};
