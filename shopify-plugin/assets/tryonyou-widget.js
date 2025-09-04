/**
 * TRYONYOU Virtual Try-On Widget for Shopify
 * Integrates AVBETOS intelligence into Shopify checkout flow
 */

class TryOnYouWidget {
  constructor(options = {}) {
    this.apiKey = options.apiKey || '';
    this.apiBaseUrl = options.apiBaseUrl || 'https://api.tryonyou.app';
    this.containerId = options.containerId || 'tryonyou-widget';
    this.productId = options.productId || null;
    this.customerId = options.customerId || null;
    this.measurements = options.measurements || null;
    this.isInitialized = false;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    this.createWidget();
    this.bindEvents();
    this.isInitialized = true;
    
    console.log('🚀 TRYONYOU Widget initialized');
  }

  createWidget() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error('TRYONYOU: Container not found:', this.containerId);
      return;
    }

    container.innerHTML = `
      <div class="tryonyou-widget">
        <div class="tryonyou-header">
          <h3>👗 Virtual Try-On</h3>
          <p>See how this looks on you before buying!</p>
        </div>
        
        <div class="tryonyou-content">
          <div class="tryonyou-measurements" id="measurements-section">
            <h4>📏 Your Measurements</h4>
            <form id="measurements-form">
              <div class="measurement-group">
                <label>Height (cm):</label>
                <input type="number" id="height" placeholder="175" min="150" max="220">
              </div>
              <div class="measurement-group">
                <label>Weight (kg):</label>
                <input type="number" id="weight" placeholder="70" min="40" max="150">
              </div>
              <div class="measurement-group">
                <label>Chest/Bust (cm):</label>
                <input type="number" id="chest" placeholder="95" min="70" max="130">
              </div>
              <div class="measurement-group">
                <label>Waist (cm):</label>
                <input type="number" id="waist" placeholder="80" min="60" max="120">
              </div>
              <div class="measurement-group">
                <label>Hips (cm):</label>
                <input type="number" id="hips" placeholder="95" min="70" max="130">
              </div>
              <button type="submit" class="tryonyou-btn primary">
                Create My Avatar
              </button>
            </form>
          </div>

          <div class="tryonyou-avatar" id="avatar-section" style="display: none;">
            <h4>🧍 Your Avatar</h4>
            <div class="avatar-preview">
              <div class="avatar-placeholder">
                <span>3D Avatar will appear here</span>
              </div>
            </div>
            <button class="tryonyou-btn secondary" id="try-on-btn">
              Try On This Item
            </button>
          </div>

          <div class="tryonyou-results" id="results-section" style="display: none;">
            <h4>✨ Virtual Try-On Results</h4>
            <div class="fit-score">
              <div class="score-circle">
                <span id="fit-score-value">--</span>
                <small>Fit Score</small>
              </div>
            </div>
            <div class="fit-details">
              <div class="fit-item">
                <span class="fit-label">Waist:</span>
                <span class="fit-value" id="waist-fit">--</span>
              </div>
              <div class="fit-item">
                <span class="fit-label">Length:</span>
                <span class="fit-value" id="length-fit">--</span>
              </div>
              <div class="fit-item">
                <span class="fit-label">Shoulders:</span>
                <span class="fit-value" id="shoulders-fit">--</span>
              </div>
            </div>
            <div class="recommendation">
              <strong>Recommendation:</strong> <span id="recommendation-text">--</span>
            </div>
            <div class="tryonyou-actions">
              <button class="tryonyou-btn success" id="add-to-cart-btn">
                ✅ Perfect! Add to Cart
              </button>
              <button class="tryonyou-btn secondary" id="try-different-size">
                📏 Try Different Size
              </button>
            </div>
          </div>

          <div class="tryonyou-loading" id="loading-section" style="display: none;">
            <div class="loading-spinner"></div>
            <p>Processing your virtual try-on...</p>
          </div>

          <div class="tryonyou-error" id="error-section" style="display: none;">
            <p class="error-message"></p>
            <button class="tryonyou-btn secondary" id="retry-btn">Try Again</button>
          </div>
        </div>

        <div class="tryonyou-footer">
          <small>Powered by AVBETOS Intelligence System</small>
        </div>
      </div>
    `;

    this.addStyles();
  }

  addStyles() {
    if (document.getElementById('tryonyou-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'tryonyou-styles';
    styles.textContent = `
      .tryonyou-widget {
        border: 2px solid #e1e8ed;
        border-radius: 12px;
        padding: 20px;
        margin: 20px 0;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .tryonyou-header {
        text-align: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e1e8ed;
      }

      .tryonyou-header h3 {
        margin: 0 0 8px 0;
        color: #1a202c;
        font-size: 1.5em;
      }

      .tryonyou-header p {
        margin: 0;
        color: #718096;
        font-size: 0.9em;
      }

      .measurement-group {
        margin-bottom: 15px;
      }

      .measurement-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #2d3748;
      }

      .measurement-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #cbd5e0;
        border-radius: 6px;
        font-size: 14px;
      }

      .tryonyou-btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
        margin-top: 10px;
      }

      .tryonyou-btn.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .tryonyou-btn.secondary {
        background: #e2e8f0;
        color: #4a5568;
      }

      .tryonyou-btn.success {
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
      }

      .tryonyou-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .avatar-placeholder {
        height: 200px;
        background: #f7fafc;
        border: 2px dashed #cbd5e0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-bottom: 15px;
        color: #718096;
      }

      .fit-score {
        text-align: center;
        margin: 20px 0;
      }

      .score-circle {
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: bold;
      }

      .fit-details {
        background: white;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
      }

      .fit-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .fit-label {
        font-weight: 500;
        color: #2d3748;
      }

      .fit-value {
        color: #48bb78;
        font-weight: 600;
      }

      .recommendation {
        background: #edf2f7;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        text-align: center;
      }

      .loading-spinner {
        border: 3px solid #e2e8f0;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .tryonyou-loading {
        text-align: center;
        padding: 40px 20px;
        color: #718096;
      }

      .tryonyou-error {
        text-align: center;
        padding: 20px;
        background: #fed7d7;
        border-radius: 8px;
        color: #9b2c2c;
      }

      .tryonyou-footer {
        text-align: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #e1e8ed;
        color: #a0aec0;
        font-size: 0.8em;
      }
    `;

    document.head.appendChild(styles);
  }

  bindEvents() {
    const form = document.getElementById('measurements-form');
    const tryOnBtn = document.getElementById('try-on-btn');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const retryBtn = document.getElementById('retry-btn');

    form?.addEventListener('submit', (e) => this.handleMeasurementsSubmit(e));
    tryOnBtn?.addEventListener('click', () => this.handleTryOn());
    addToCartBtn?.addEventListener('click', () => this.handleAddToCart());
    retryBtn?.addEventListener('click', () => this.resetWidget());
  }

  async handleMeasurementsSubmit(e) {
    e.preventDefault();
    
    const measurements = {
      height: parseInt(document.getElementById('height').value),
      weight: parseInt(document.getElementById('weight').value),
      chest: parseInt(document.getElementById('chest').value),
      waist: parseInt(document.getElementById('waist').value),
      hips: parseInt(document.getElementById('hips').value)
    };

    if (!this.validateMeasurements(measurements)) {
      this.showError('Please fill in all measurements correctly');
      return;
    }

    this.measurements = measurements;
    this.showLoading();

    try {
      // Create avatar using AVBETOS API
      const response = await fetch(`${this.apiBaseUrl}/api/retailers/avatar/build`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          measurements,
          userId: this.customerId
        })
      });

      const result = await response.json();
      
      if (result.success) {
        this.avatarId = result.data.avatarId;
        this.showAvatarSection();
      } else {
        throw new Error(result.message || 'Failed to create avatar');
      }
    } catch (error) {
      this.showError('Failed to create avatar. Please try again.');
      console.error('Avatar creation error:', error);
    }
  }

  async handleTryOn() {
    if (!this.avatarId || !this.productId) {
      this.showError('Missing avatar or product information');
      return;
    }

    this.showLoading();

    try {
      // Get product information from Shopify
      const productInfo = await this.getShopifyProductInfo();
      
      // Compare fit using AVBETOS API
      const response = await fetch(`${this.apiBaseUrl}/api/retailers/fit/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          avatarId: this.avatarId,
          garments: [productInfo]
        })
      });

      const result = await response.json();
      
      if (result.success && result.data.fitResults.length > 0) {
        this.showResults(result.data.fitResults[0]);
      } else {
        throw new Error(result.message || 'Failed to analyze fit');
      }
    } catch (error) {
      this.showError('Failed to analyze fit. Please try again.');
      console.error('Try-on error:', error);
    }
  }

  async getShopifyProductInfo() {
    // Mock product info - in real implementation, this would come from Shopify APIs
    return {
      id: this.productId,
      brand: 'Demo Store',
      size: 'M',
      category: 'shirt'
    };
  }

  handleAddToCart() {
    // Integration with Shopify cart
    if (typeof Shopify !== 'undefined' && Shopify.addItem) {
      Shopify.addItem(this.productId, 1);
    } else {
      // Fallback to standard cart form submission
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/cart/add';
      form.innerHTML = `<input type="hidden" name="id" value="${this.productId}">`;
      document.body.appendChild(form);
      form.submit();
    }
  }

  validateMeasurements(measurements) {
    return Object.values(measurements).every(value => 
      !isNaN(value) && value > 0 && value < 300
    );
  }

  showLoading() {
    this.hideAllSections();
    document.getElementById('loading-section').style.display = 'block';
  }

  showAvatarSection() {
    this.hideAllSections();
    document.getElementById('avatar-section').style.display = 'block';
  }

  showResults(fitResult) {
    this.hideAllSections();
    
    document.getElementById('fit-score-value').textContent = fitResult.fitScore;
    document.getElementById('waist-fit').textContent = fitResult.adjustments.waist;
    document.getElementById('length-fit').textContent = fitResult.adjustments.length;
    document.getElementById('shoulders-fit').textContent = fitResult.adjustments.shoulders;
    document.getElementById('recommendation-text').textContent = fitResult.recommendation;
    
    document.getElementById('results-section').style.display = 'block';
  }

  showError(message) {
    this.hideAllSections();
    document.querySelector('.error-message').textContent = message;
    document.getElementById('error-section').style.display = 'block';
  }

  hideAllSections() {
    const sections = ['measurements-section', 'avatar-section', 'results-section', 'loading-section', 'error-section'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.style.display = 'none';
    });
  }

  resetWidget() {
    this.hideAllSections();
    document.getElementById('measurements-section').style.display = 'block';
    document.getElementById('measurements-form').reset();
  }
}

// Global initialization for Shopify themes
window.TryOnYouWidget = TryOnYouWidget;

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('tryonyou-widget')) {
    new TryOnYouWidget({
      apiKey: window.TRYONYOU_API_KEY || 'demo-key',
      productId: window.PRODUCT_ID || null,
      customerId: window.CUSTOMER_ID || null
    });
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TryOnYouWidget;
}