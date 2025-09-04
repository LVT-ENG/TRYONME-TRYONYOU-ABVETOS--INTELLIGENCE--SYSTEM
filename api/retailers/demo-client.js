/**
 * Demo client for AVBETOS Retailers API
 * Simulates external retailer consumption (Levi's integration example)
 */

const API_BASE_URL = 'http://localhost:3001';
const API_KEY = 'demo-key-levi'; // Mock API key for Levi's

class AVBETOSRetailerClient {
  constructor(apiKey, baseUrl = API_BASE_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async makeRequest(endpoint, method = 'GET', data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`API Error: ${result.message || response.statusText}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Request failed:`, error);
      throw error;
    }
  }

  async buildAvatar(measurements, photo = null, userId = null) {
    return this.makeRequest('/api/retailers/avatar/build', 'POST', {
      measurements,
      photo,
      userId
    });
  }

  async compareFit(avatarId, garments) {
    return this.makeRequest('/api/retailers/fit/compare', 'POST', {
      avatarId,
      garments
    });
  }

  async getRecommendations(avatarId, emotionalState = 'neutral', context = null, preferences = null) {
    return this.makeRequest('/api/retailers/recommend/pau', 'POST', {
      avatarId,
      emotionalState,
      context,
      preferences
    });
  }

  async generateDesign(measurements, preferences, brandPrompt) {
    return this.makeRequest('/api/retailers/cap/generate', 'POST', {
      measurements,
      preferences,
      brandPrompt
    });
  }

  async getAnalytics() {
    return this.makeRequest('/api/retailers/analytics');
  }

  async checkHealth() {
    return this.makeRequest('/health');
  }
}

// Demo usage example
async function runDemo() {
  console.log('🚀 Starting AVBETOS Retailers API Demo (Levi\'s Integration)');
  
  const client = new AVBETOSRetailerClient(API_KEY);

  try {
    // 1. Health check
    console.log('\n1. Checking API health...');
    const health = await client.checkHealth();
    console.log('✅ API Status:', health.status);

    // 2. Create avatar
    console.log('\n2. Creating customer avatar...');
    const measurements = {
      height: 180,
      weight: 75,
      chest: 100,
      waist: 85,
      hips: 98
    };
    
    const avatar = await client.buildAvatar(measurements, null, 'customer_001');
    console.log('✅ Avatar created:', avatar.data.avatarId);

    // 3. Compare Levi's jeans fit
    console.log('\n3. Comparing Levi\'s jeans fit...');
    const levisJeans = [
      { id: 'LEVI_501_32x32', brand: 'Levi\'s', size: '32x32', category: 'jeans' },
      { id: 'LEVI_511_32x32', brand: 'Levi\'s', size: '32x32', category: 'jeans' },
      { id: 'LEVI_502_32x32', brand: 'Levi\'s', size: '32x32', category: 'jeans' }
    ];
    
    const fitComparison = await client.compareFit(avatar.data.avatarId, levisJeans);
    console.log('✅ Best fit:', fitComparison.data.fitResults[0]);

    // 4. Get emotional recommendations
    console.log('\n4. Getting PAU emotional recommendations...');
    const recommendations = await client.getRecommendations(
      avatar.data.avatarId,
      'confident',
      'casual weekend',
      { colors: ['indigo', 'black'], styles: ['classic', 'vintage'] }
    );
    console.log('✅ Top recommendation:', recommendations.data.recommendations[0]);

    // 5. Generate custom design
    console.log('\n5. Generating custom Levi\'s design...');
    const customDesign = await client.generateDesign(
      measurements,
      { style: 'vintage', colors: ['indigo'] },
      'Create a classic Levi\'s 501 with vintage wash and modern comfort fit'
    );
    console.log('✅ Design generated:', customDesign.data.designId);

    // 6. Get analytics
    console.log('\n6. Checking API usage analytics...');
    const analytics = await client.getAnalytics();
    console.log('✅ Total API calls this month:', analytics.data.apiCalls.thisMonth);

    console.log('\n🎉 Demo completed successfully!');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    process.exit(1);
  }
}

// Browser compatibility
if (typeof window !== 'undefined') {
  // Browser environment
  window.AVBETOSRetailerClient = AVBETOSRetailerClient;
  window.runDemo = runDemo;
} else {
  // Node.js environment
  if (typeof fetch === 'undefined') {
    global.fetch = require('node-fetch');
  }
  
  // Run demo if this file is executed directly
  if (require.main === module) {
    runDemo();
  }
}

module.exports = { AVBETOSRetailerClient, runDemo };