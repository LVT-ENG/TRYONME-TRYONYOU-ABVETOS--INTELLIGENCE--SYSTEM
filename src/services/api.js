/**
 * ABVETOS Intelligence API Service
 * Centralized API communication layer with MOCK MODE for Standalone Demo
 * Patent: PCT/EP2025/067317
 */

class AbvetosAPI {
  constructor() {
    this.baseURL = '/api';
    this.mockMode = true; // FORCE MOCK MODE for standalone deployment
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000;
  }

  async request(endpoint, options = {}) {
    // Check cache for GET requests
    const isGet = !options.method || options.method === 'GET';
    if (isGet) {
      const cached = this.cache.get(endpoint);
      if (cached && (Date.now() - cached.timestamp < this.cacheTimeout)) {
        console.log(`⚡ CACHE HIT: ${endpoint}`);
        return cached.data;
      }
    }

    // If mock mode is on, bypass fetch and return mock data
    if (this.mockMode) {
      console.log(`🎭 MOCK API Request: ${endpoint}`);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
      const data = this.getMockData(endpoint, options);

      if (isGet) {
        this.cache.set(endpoint, {
          timestamp: Date.now(),
          data: data
        });
      }

      return data;
    }

    // ... existing real fetch logic ...
    try {
        const response = await fetch(`${this.baseURL}${endpoint}`, options);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (isGet) {
          this.cache.set(endpoint, {
            timestamp: Date.now(),
            data: data
          });
        }

        return data;
    } catch (error) {
        console.warn("API Request failed, falling back to mock data", error);
        return this.getMockData(endpoint, options);
    }
  }

  // eslint-disable-next-line no-unused-vars
  getMockData(endpoint, _options) {
    if (endpoint.includes('/biometric_scan')) {
      return {
        user_id: `user_${Math.random().toString(36).substr(2, 9)}`,
        success: true,
        measurements: {
          height: 175 + Math.floor(Math.random() * 10),
          chest: 95 + Math.floor(Math.random() * 10),
          waist: 80 + Math.floor(Math.random() * 10),
          hips: 98 + Math.floor(Math.random() * 10),
          shoulders: 45 + Math.floor(Math.random() * 5),
          arm_length: 60 + Math.floor(Math.random() * 5),
          leg_length: 85 + Math.floor(Math.random() * 5),
          torso_length: 50 + Math.floor(Math.random() * 5),
          build: ['athletic', 'slim', 'average', 'muscular'][Math.floor(Math.random() * 4)]
        },
        skin_tone: 'type_3',
        body_shape: 'inverted_triangle'
      };
    }

    if (endpoint.includes('/recommendations')) {
      return [
        { id: 1, name: "Chaqueta Técnica ABVET", price: 299, type: "jacket", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400", match: 98 },
        { id: 2, name: "Pantalón Modular Zero-G", price: 189, type: "pants", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400", match: 95 },
        { id: 3, name: "Camisa Inteligente Bio-Mesh", price: 120, type: "shirt", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400", match: 92 },
        { id: 4, name: "Vestido Asimétrico Neural", price: 350, type: "dress", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400", match: 89 }
      ];
    }

    return {};
  }

  // ... keep existing methods signatures acting as proxies to request ...
  async processBiometricScan(imageData) { return this.request('/biometric_scan', { method: 'POST', body: JSON.stringify({ image: imageData }) }); }
  async getRecommendations(userId) { return this.request('/recommendations?user_id=' + userId); }
  async getDigitalTwin(userId) { return this.request('/digital_twin/' + userId); }
}

export const api = new AbvetosAPI();
export default api;
