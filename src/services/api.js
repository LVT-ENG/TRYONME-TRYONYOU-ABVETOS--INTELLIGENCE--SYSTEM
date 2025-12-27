/**
 * ABVETOS Intelligence API Service
 * Centralized API communication layer
 * Patent: PCT/EP2025/067317
 */

class AbvetosAPI {
  constructor() {
    this.baseURL = '/api';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }

  /**
   * Generic fetch wrapper with error handling and caching
   */
  async request(endpoint, options = {}) {
    const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        console.log(`📦 Cache hit: ${endpoint}`);
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-ABVETOS-Client': 'TryOnYou-Web-v3.0',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache successful GET requests
      if (!options.method || options.method === 'GET') {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
        });
      }

      return data;
    } catch (error) {
      console.error(`❌ API Error [${endpoint}]:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Biometric scan processing
   */
  async processBiometricScan(imageData) {
    return this.request('/biometric_scan', {
      method: 'POST',
      body: JSON.stringify({ image: imageData }),
    });
  }

  /**
   * Get personalized recommendations
   */
  async getRecommendations(userId, filters = {}) {
    const params = new URLSearchParams({ user_id: userId, ...filters });
    return this.request(`/recommendations?${params}`);
  }

  /**
   * Get user's digital twin profile
   */
  async getDigitalTwin(userId) {
    return this.request(`/digital_twin/${userId}`);
  }

  /**
   * Update user preferences
   */
  async updatePreferences(userId, preferences) {
    return this.request(`/preferences/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  /**
   * Try on simulation
   */
  async tryOnGarment(userId, garmentId) {
    return this.request('/tryon', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, garment_id: garmentId }),
    });
  }

  /**
   * Error handler with user-friendly messages
   */
  handleError(error) {
    const errorMap = {
      'Failed to fetch': 'No hay conexión con el servidor. Verifica tu conexión a internet.',
      'HTTP 401': 'Sesión expirada. Por favor, inicia sesión nuevamente.',
      'HTTP 403': 'No tienes permisos para realizar esta acción.',
      'HTTP 404': 'Recurso no encontrado.',
      'HTTP 500': 'Error interno del servidor. Inténtalo más tarde.',
    };

    const message = Object.keys(errorMap).find(key => error.message.includes(key));
    return new Error(message ? errorMap[message] : error.message);
  }

  /**
   * Clear cache (useful for logout or data refresh)
   */
  clearCache() {
    this.cache.clear();
    console.log('🧹 API cache cleared');
  }
}

// Singleton instance
export const api = new AbvetosAPI();
export default api;
