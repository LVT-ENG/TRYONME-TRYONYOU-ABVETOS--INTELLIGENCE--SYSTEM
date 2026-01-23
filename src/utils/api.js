/**
 * API Utility for TRYONYOU
 * Connects frontend with backend API
 */

// Determine API base URL based on environment
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production: use relative path for Vercel serverless
  : 'http://localhost:5000/api';  // Development: local backend

/**
 * Fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Health check - verify API is accessible
 */
export async function checkHealth() {
  return apiRequest('/health');
}

/**
 * Get recommendation for user measurements
 */
export async function getRecommendation(measurements, conversation) {
  return apiRequest('/recommend', {
    method: 'POST',
    body: JSON.stringify({
      measurements,
      conversation,
    }),
  });
}

/**
 * Get fit analysis
 */
export async function getFitAnalysis(measurements, conversation) {
  return apiRequest('/fit-analysis', {
    method: 'POST',
    body: JSON.stringify({
      measurements,
      conversation,
    }),
  });
}

/**
 * List all available garments
 */
export async function listGarments() {
  return apiRequest('/garments');
}

/**
 * Get specific garment details
 */
export async function getGarment(garmentId) {
  return apiRequest(`/garment/${garmentId}`);
}

/**
 * Process biometric scan
 */
export async function processBiometricScan(scanData) {
  const params = new URLSearchParams(scanData);
  return apiRequest(`/scan/process?${params.toString()}`, {
    method: 'POST',
  });
}

/**
 * Process conversational input
 */
export async function processConversation(conversationData) {
  const params = new URLSearchParams(
    Object.entries(conversationData).filter(([_, v]) => v != null)
  );
  return apiRequest(`/conversation/process?${params.toString()}`, {
    method: 'POST',
  });
}

export default {
  checkHealth,
  getRecommendation,
  getFitAnalysis,
  listGarments,
  getGarment,
  processBiometricScan,
  processConversation,
};
