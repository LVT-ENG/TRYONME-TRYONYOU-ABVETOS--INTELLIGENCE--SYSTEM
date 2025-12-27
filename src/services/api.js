/**
 * ABVETOS Intelligence API Service
 * Centralized API communication layer with Hybrid Mode
 * Patent: PCT/EP2025/067317
 */

class AbvetosAPI {
  constructor() {
    this.baseURL = '/api';
    this.mockMode = true;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000;
  }

  // Allow switching modes dynamically
  setMockMode(enabled) {
      this.mockMode = enabled;
      console.log(`📡 API Mode: ${enabled ? 'MOCK' : 'REAL BACKEND'}`);
  }

  async request(endpoint, options = {}) {
    // Specific bypass for Gemini if backend is available
    if (endpoint.includes('/gemini') && !this.mockMode) {
        return this.callRealBackend(endpoint, options);
    }

    // Default behavior
    if (this.mockMode) {
      console.log(`🎭 MOCK API Request: ${endpoint}`);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
      return this.getMockData(endpoint, options);
    }

    return this.callRealBackend(endpoint, options);
  }

  async callRealBackend(endpoint, options) {
    try {
        // Adjust URL if running locally vs production
        const url = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? `http://localhost:3000${endpoint}` // Local Express
            : `${endpoint}`; // Relative path for Vercel

        const response = await fetch(url, {
            ...options,
            headers: { 'Content-Type': 'application/json', ...options.headers }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn("API Request failed, falling back to mock data", error);
        return this.getMockData(endpoint, options);
    }
  }

  getMockData(endpoint, options) {
    if (endpoint.includes('/gemini')) {
        const prompt = JSON.parse(options.body || '{}').prompt;
        return { text: `[MOCK AI Analysis]: Based on the prompt "${prompt}", I recommend a tailored fit with breathable fabrics.` };
    }

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

  // Methods
  async processBiometricScan(imageData) { return this.request('/biometric_scan', { method: 'POST', body: JSON.stringify({ image: imageData }) }); }
  async getRecommendations(userId) { return this.request('/recommendations?user_id=' + userId); }
  async getDigitalTwin(userId) { return this.request('/digital_twin/' + userId); }

  // New method for GenAI
  async generateAIAnalysis(prompt) {
      return this.request('/gemini', {
          method: 'POST',
          body: JSON.stringify({ prompt })
      });
  }
}

export const api = new AbvetosAPI();
export default api;
