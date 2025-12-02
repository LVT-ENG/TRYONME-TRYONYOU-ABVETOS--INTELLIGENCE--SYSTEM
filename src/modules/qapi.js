/**
 * Q-API Mock Endpoints
 * Provides mock API endpoints for TRYONYOU platform
 */

const QAPI_VERSION = '1.0.0';

// API Base configuration
const config = {
  baseUrl: '/api/v1',
  timeout: 5000,
  retryAttempts: 3
};

// Mock data stores
const mockData = {
  wardrobeItems: [
    { id: 1, name: 'Classic Blazer', category: 'outerwear', status: 'available' },
    { id: 2, name: 'Silk Scarf', category: 'accessories', status: 'available' },
    { id: 3, name: 'Tailored Trousers', category: 'bottoms', status: 'available' }
  ],
  tryOnSessions: [],
  userPreferences: {}
};

/**
 * Simulates API delay for realistic behavior
 * @param {number} ms - Delay in milliseconds
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Q-API Endpoints
 */
export const QAPI = {
  version: QAPI_VERSION,

  /**
   * Get wardrobe items
   * @returns {Promise<Array>} List of wardrobe items
   */
  async getWardrobeItems() {
    await delay(100);
    return { success: true, data: mockData.wardrobeItems };
  },

  /**
   * Start a try-on session
   * @param {Object} params - Session parameters
   * @returns {Promise<Object>} Session details
   */
  async startTryOnSession(params) {
    await delay(150);
    const session = {
      id: `session_${Date.now()}`,
      userId: params.userId,
      itemId: params.itemId,
      startedAt: new Date().toISOString(),
      status: 'active'
    };
    mockData.tryOnSessions.push(session);
    return { success: true, data: session };
  },

  /**
   * End a try-on session
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object>} Session result
   */
  async endTryOnSession(sessionId) {
    await delay(100);
    const session = mockData.tryOnSessions.find(s => s.id === sessionId);
    if (session) {
      session.status = 'completed';
      session.endedAt = new Date().toISOString();
    }
    return { success: true, data: session };
  },

  /**
   * Save user preferences
   * @param {string} userId - User ID
   * @param {Object} preferences - User preferences
   * @returns {Promise<Object>} Saved preferences
   */
  async savePreferences(userId, preferences) {
    await delay(100);
    mockData.userPreferences[userId] = {
      ...mockData.userPreferences[userId],
      ...preferences,
      updatedAt: new Date().toISOString()
    };
    return { success: true, data: mockData.userPreferences[userId] };
  },

  /**
   * Get user preferences
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User preferences
   */
  async getPreferences(userId) {
    await delay(50);
    return { 
      success: true, 
      data: mockData.userPreferences[userId] || {} 
    };
  },

  /**
   * Health check endpoint
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    return {
      success: true,
      data: {
        status: 'healthy',
        version: QAPI_VERSION,
        timestamp: new Date().toISOString()
      }
    };
  }
};

export default QAPI;
