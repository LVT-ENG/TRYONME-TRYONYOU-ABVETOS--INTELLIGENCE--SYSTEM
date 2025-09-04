/**
 * TryOnYou Embed SDK
 * Embeddable virtual try-on widget for partner integration
 * 
 * Usage:
 * <script src="https://cdn.tryonyou.app/embed.js"></script>
 * <script>
 *   TryOnYou.init({
 *     partnerId: 'levis',
 *     apiKey: 'your-api-key',
 *     theme: 'light',
 *     products: ['product-123', 'product-456']
 *   });
 * </script>
 */

class TryOnYouEmbed {
  constructor() {
    this.config = {
      partnerId: null,
      apiKey: null,
      theme: 'light',
      apiEndpoint: 'https://api.tryonyou.app',
      cdnEndpoint: 'https://cdn.tryonyou.app',
      products: [],
      container: 'tryonyou-widget',
      language: 'es',
      currency: 'EUR'
    };
    
    this.isInitialized = false;
    this.widgetContainer = null;
    this.currentUser = null;
    this.products = [];
  }

  /**
   * Initialize the TryOnYou widget
   * @param {Object} options Configuration options
   */
  init(options = {}) {
    if (this.isInitialized) {
      console.warn('TryOnYou is already initialized');
      return;
    }

    // Merge options with default config
    this.config = { ...this.config, ...options };

    // Validate required options
    if (!this.config.partnerId) {
      throw new Error('partnerId is required for TryOnYou initialization');
    }

    // Initialize widget
    this._loadStyles();
    this._createWidget();
    this._loadProducts();
    
    this.isInitialized = true;
    
    // Trigger initialization event
    this._triggerEvent('initialized', { config: this.config });
    
    console.log('TryOnYou SDK initialized for partner:', this.config.partnerId);
  }

  /**
   * Load CSS styles for the widget
   * @private
   */
  _loadStyles() {
    if (document.getElementById('tryonyou-styles')) return;

    const link = document.createElement('link');
    link.id = 'tryonyou-styles';
    link.rel = 'stylesheet';
    link.href = `${this.config.cdnEndpoint}/embed.css`;
    document.head.appendChild(link);

    // Also inject critical CSS inline for immediate styling
    const style = document.createElement('style');
    style.id = 'tryonyou-critical-styles';
    style.textContent = this._getCriticalCSS();
    document.head.appendChild(style);
  }

  /**
   * Get critical CSS for immediate widget styling
   * @private
   */
  _getCriticalCSS() {
    return `
      .tryonyou-widget {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        background: #fff;
        transition: all 0.3s ease;
      }
      
      .tryonyou-widget.theme-dark {
        background: #1a1a1a;
        color: #fff;
      }
      
      .tryonyou-trigger {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        transition: transform 0.2s ease;
      }
      
      .tryonyou-trigger:hover {
        transform: scale(1.1);
      }
      
      .tryonyou-panel {
        width: 320px;
        height: 480px;
        display: none;
        flex-direction: column;
        position: absolute;
        bottom: 70px;
        right: 0;
        background: inherit;
        border-radius: 12px;
        overflow: hidden;
      }
      
      .tryonyou-panel.open {
        display: flex;
      }
      
      .tryonyou-header {
        padding: 16px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .theme-dark .tryonyou-header {
        border-bottom-color: #333;
      }
      
      .tryonyou-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      
      .tryonyou-product {
        display: flex;
        align-items: center;
        padding: 12px;
        margin-bottom: 8px;
        border: 1px solid #eee;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .tryonyou-product:hover {
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
      }
      
      .theme-dark .tryonyou-product {
        border-color: #333;
      }
      
      .tryonyou-product-image {
        width: 48px;
        height: 48px;
        border-radius: 6px;
        object-fit: cover;
        margin-right: 12px;
      }
      
      .tryonyou-product-info h4 {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 600;
      }
      
      .tryonyou-product-info p {
        margin: 0;
        font-size: 12px;
        color: #666;
      }
      
      .theme-dark .tryonyou-product-info p {
        color: #999;
      }
      
      .tryonyou-avatar-button {
        width: 100%;
        padding: 12px;
        margin-top: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }
      
      .tryonyou-avatar-button:hover {
        opacity: 0.9;
      }
      
      .tryonyou-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: #666;
      }
      
      .tryonyou-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #eee;
        border-top: 2px solid #667eea;
        border-radius: 50%;
        animation: tryonyou-spin 1s linear infinite;
        margin-right: 8px;
      }
      
      @keyframes tryonyou-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  /**
   * Create the widget DOM structure
   * @private
   */
  _createWidget() {
    // Find or create container
    let container = document.getElementById(this.config.container);
    if (!container) {
      container = document.createElement('div');
      container.id = this.config.container;
      document.body.appendChild(container);
    }

    this.widgetContainer = container;

    // Create widget HTML
    container.innerHTML = `
      <div class="tryonyou-widget ${this.config.theme === 'dark' ? 'theme-dark' : ''}">
        <button class="tryonyou-trigger" id="tryonyou-trigger">
          👗
        </button>
        <div class="tryonyou-panel" id="tryonyou-panel">
          <div class="tryonyou-header">
            <h3 style="margin: 0; font-size: 16px;">Probador Virtual</h3>
            <button id="tryonyou-close" style="background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
          </div>
          <div class="tryonyou-content" id="tryonyou-content">
            <div class="tryonyou-loading">
              <div class="tryonyou-spinner"></div>
              Cargando productos...
            </div>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    this._attachEventListeners();
  }

  /**
   * Attach event listeners to widget elements
   * @private
   */
  _attachEventListeners() {
    const trigger = document.getElementById('tryonyou-trigger');
    const close = document.getElementById('tryonyou-close');
    const panel = document.getElementById('tryonyou-panel');

    trigger?.addEventListener('click', () => this.togglePanel());
    close?.addEventListener('click', () => this.closePanel());

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.widgetContainer?.contains(e.target)) {
        this.closePanel();
      }
    });
  }

  /**
   * Load products from API or config
   * @private
   */
  async _loadProducts() {
    try {
      if (this.config.products && this.config.products.length > 0) {
        // Load specific products
        const products = await this._fetchProducts(this.config.products);
        this._renderProducts(products);
      } else {
        // Load featured products
        const products = await this._fetchFeaturedProducts();
        this._renderProducts(products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      this._renderError('Error cargando productos');
    }
  }

  /**
   * Fetch products from API
   * @private
   */
  async _fetchProducts(productIds) {
    // Mock data for now - in real implementation this would call the API
    return [
      {
        id: 'p1',
        name: 'Chaqueta Premium',
        price: '89.99',
        image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Chaqueta',
        brand: this.config.partnerId,
        category: 'outerwear'
      },
      {
        id: 'p2',
        name: 'Jeans Clásicos',
        price: '59.99',
        image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Jeans',
        brand: this.config.partnerId,
        category: 'pants'
      },
      {
        id: 'p3',
        name: 'Camiseta Básica',
        price: '24.99',
        image: 'https://via.placeholder.com/200x200/48bb78/ffffff?text=Camiseta',
        brand: this.config.partnerId,
        category: 'tops'
      }
    ];
  }

  /**
   * Fetch featured products
   * @private
   */
  async _fetchFeaturedProducts() {
    return this._fetchProducts(['featured']);
  }

  /**
   * Render products in the widget
   * @private
   */
  _renderProducts(products) {
    const content = document.getElementById('tryonyou-content');
    if (!content) return;

    this.products = products;

    const html = `
      ${products.map(product => `
        <div class="tryonyou-product" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="tryonyou-product-image">
          <div class="tryonyou-product-info">
            <h4>${product.name}</h4>
            <p>${this.config.currency} ${product.price}</p>
          </div>
        </div>
      `).join('')}
      <button class="tryonyou-avatar-button" id="tryonyou-create-avatar">
        Crear Mi Avatar 3D
      </button>
    `;

    content.innerHTML = html;

    // Attach product click listeners
    products.forEach(product => {
      const element = content.querySelector(`[data-product-id="${product.id}"]`);
      element?.addEventListener('click', () => this.tryOnProduct(product));
    });

    // Attach avatar button listener
    const avatarButton = document.getElementById('tryonyou-create-avatar');
    avatarButton?.addEventListener('click', () => this.createAvatar());
  }

  /**
   * Render error message
   * @private
   */
  _renderError(message) {
    const content = document.getElementById('tryonyou-content');
    if (!content) return;

    content.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #666;">
        <p>${message}</p>
        <button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: #f5f5f5; cursor: pointer;">
          Reintentar
        </button>
      </div>
    `;
  }

  /**
   * Toggle widget panel visibility
   */
  togglePanel() {
    const panel = document.getElementById('tryonyou-panel');
    if (!panel) return;

    const isOpen = panel.classList.contains('open');
    if (isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  /**
   * Open widget panel
   */
  openPanel() {
    const panel = document.getElementById('tryonyou-panel');
    if (!panel) return;

    panel.classList.add('open');
    this._triggerEvent('panelOpened');
  }

  /**
   * Close widget panel
   */
  closePanel() {
    const panel = document.getElementById('tryonyou-panel');
    if (!panel) return;

    panel.classList.remove('open');
    this._triggerEvent('panelClosed');
  }

  /**
   * Start virtual try-on for a product
   * @param {Object} product Product to try on
   */
  tryOnProduct(product) {
    console.log('Trying on product:', product);
    
    // In a real implementation, this would:
    // 1. Check if user has avatar
    // 2. Load 3D model
    // 3. Open virtual try-on interface
    // 4. Call Avatar3D + Fit Comparator APIs
    
    this._triggerEvent('tryOnStarted', { product });
    
    // For demo, show an alert
    alert(`¡Probándote ${product.name}! 
    
En la versión completa:
- Se abrirá el vestidor 3D
- Verás cómo te queda la prenda
- Recibirás recomendaciones personalizadas
- Podrás comprar directamente`);
  }

  /**
   * Create user avatar
   */
  createAvatar() {
    console.log('Creating avatar...');
    
    // In a real implementation, this would:
    // 1. Open avatar creation interface
    // 2. Capture user measurements
    // 3. Generate 3D avatar
    // 4. Store avatar for future use
    
    this._triggerEvent('avatarCreationStarted');
    
    // For demo, show an alert
    alert(`¡Creando tu avatar 3D!

En la versión completa:
- Capturaremos tus medidas
- Generaremos tu avatar 3D personalizado
- Habilitaremos el probador virtual
- Activaremos recomendaciones PAU`);
  }

  /**
   * Set user avatar data
   * @param {Object} avatarData Avatar information
   */
  setAvatar(avatarData) {
    this.currentUser = { ...this.currentUser, avatar: avatarData };
    this._triggerEvent('avatarSet', { avatar: avatarData });
  }

  /**
   * Get current user data
   */
  getUser() {
    return this.currentUser;
  }

  /**
   * Update widget configuration
   * @param {Object} newConfig New configuration options
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    
    // Re-render if theme changed
    if (newConfig.theme) {
      const widget = this.widgetContainer?.querySelector('.tryonyou-widget');
      if (widget) {
        widget.className = `tryonyou-widget ${newConfig.theme === 'dark' ? 'theme-dark' : ''}`;
      }
    }
    
    this._triggerEvent('configUpdated', { config: this.config });
  }

  /**
   * Destroy the widget
   */
  destroy() {
    if (this.widgetContainer) {
      this.widgetContainer.remove();
    }
    
    // Remove styles
    document.getElementById('tryonyou-styles')?.remove();
    document.getElementById('tryonyou-critical-styles')?.remove();
    
    this.isInitialized = false;
    this._triggerEvent('destroyed');
  }

  /**
   * Trigger custom events
   * @private
   */
  _triggerEvent(eventName, data = {}) {
    const event = new CustomEvent(`tryonyou:${eventName}`, {
      detail: { ...data, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
  }

  /**
   * Add event listener for TryOnYou events
   * @param {string} eventName Event name (without 'tryonyou:' prefix)
   * @param {Function} callback Event handler
   */
  on(eventName, callback) {
    document.addEventListener(`tryonyou:${eventName}`, callback);
  }

  /**
   * Remove event listener
   * @param {string} eventName Event name (without 'tryonyou:' prefix)
   * @param {Function} callback Event handler
   */
  off(eventName, callback) {
    document.removeEventListener(`tryonyou:${eventName}`, callback);
  }
}

// Create global instance
const TryOnYou = new TryOnYouEmbed();

// Auto-initialize if config is provided in script tag
document.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[src*="embed.js"]');
  if (script) {
    const partnerId = script.getAttribute('data-partner-id');
    const apiKey = script.getAttribute('data-api-key');
    const theme = script.getAttribute('data-theme');
    const products = script.getAttribute('data-products');
    
    if (partnerId) {
      const config = { partnerId };
      if (apiKey) config.apiKey = apiKey;
      if (theme) config.theme = theme;
      if (products) config.products = products.split(',');
      
      TryOnYou.init(config);
    }
  }
});

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TryOnYou;
}

// For UMD builds, make sure methods are available on the global object
if (typeof window !== 'undefined') {
  window.TryOnYou = TryOnYou;
}

export default TryOnYou;