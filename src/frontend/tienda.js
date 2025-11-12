/**
 * TRYONYOU - Tienda (Store)
 * E-commerce frontend module
 */

export class Tienda {
  constructor(config = {}) {
    this.containerId = config.containerId || 'store-container';
    this.apiEndpoint = config.apiEndpoint || '/api/store';
    this.products = [];
    this.cart = [];
    this.filters = {
      category: null,
      priceRange: null,
      colors: [],
      sizes: []
    };
  }

  /**
   * Initialize store
   */
  async init() {
    console.log('🛍️ Initializing Tienda...');

    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Container ${this.containerId} not found`);
    }

    // Load products
    await this.loadProducts();

    // Render store
    this.render();

    console.log('✅ Tienda initialized');
    return this;
  }

  /**
   * Load products from API
   */
  async loadProducts() {
    console.log('📦 Loading products...');

    try {
      const response = await fetch(this.apiEndpoint);
      this.products = await response.json();
      console.log(`✅ Loaded ${this.products.length} products`);
    } catch (error) {
      console.error('❌ Error loading products:', error);
      this.products = this.getFallbackProducts();
    }
  }

  /**
   * Get fallback products if API fails
   */
  getFallbackProducts() {
    return [
      {
        id: 'corset-kimono-black',
        name: 'Corset-Kimono Fusion (Black)',
        category: 'capsule',
        price: 149.99,
        currency: 'EUR',
        colors: ['black', 'gold'],
        sizes: ['S', 'M', 'L', 'XL'],
        image: '/assets/capsules/corset-kimono/black.jpg',
        description: 'Revolutionary fusion of Eastern and Western aesthetics',
        emotion: 'celebration'
      },
      {
        id: 'corset-kimono-white',
        name: 'Corset-Kimono Fusion (White)',
        category: 'capsule',
        price: 149.99,
        currency: 'EUR',
        colors: ['white', 'gold'],
        sizes: ['S', 'M', 'L', 'XL'],
        image: '/assets/capsules/corset-kimono/white.jpg',
        description: 'Pure elegance with emotional intelligence',
        emotion: 'joy'
      }
    ];
  }

  /**
   * Render store interface
   */
  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const filteredProducts = this.applyFilters(this.products);

    const html = `
      <div class="store-layout">
        <aside class="store-filters">
          ${this.renderFilters()}
        </aside>
        
        <main class="store-products">
          <div class="store-header">
            <h1>TRYONYOU Store</h1>
            <div class="product-count">${filteredProducts.length} items</div>
          </div>
          
          <div class="products-grid">
            ${filteredProducts.map(product => this.renderProduct(product)).join('')}
          </div>
        </main>
        
        <aside class="store-cart">
          ${this.renderCart()}
        </aside>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Render filters panel
   */
  renderFilters() {
    return `
      <div class="filters-panel">
        <h3>Filters</h3>
        
        <div class="filter-group">
          <h4>Category</h4>
          <label><input type="radio" name="category" value="all" checked> All</label>
          <label><input type="radio" name="category" value="capsule"> Capsule</label>
          <label><input type="radio" name="category" value="basic"> Basic</label>
        </div>
        
        <div class="filter-group">
          <h4>Colors</h4>
          <label><input type="checkbox" name="color" value="black"> Black</label>
          <label><input type="checkbox" name="color" value="white"> White</label>
          <label><input type="checkbox" name="color" value="gold"> Gold</label>
        </div>
        
        <div class="filter-group">
          <h4>Size</h4>
          <label><input type="checkbox" name="size" value="S"> S</label>
          <label><input type="checkbox" name="size" value="M"> M</label>
          <label><input type="checkbox" name="size" value="L"> L</label>
          <label><input type="checkbox" name="size" value="XL"> XL</label>
        </div>
        
        <button class="btn-clear-filters">Clear Filters</button>
      </div>
    `;
  }

  /**
   * Render single product card
   */
  renderProduct(product) {
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='/assets/brand/logo_master_symbol_only_final.png'">
          ${product.emotion ? `<span class="product-emotion">${this.getEmotionIcon(product.emotion)}</span>` : ''}
        </div>
        
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          
          <div class="product-colors">
            ${product.colors.map(color => `
              <span class="color-dot" style="background-color: ${this.getColorHex(color)}" title="${color}"></span>
            `).join('')}
          </div>
          
          <div class="product-price">€${product.price.toFixed(2)}</div>
          
          <div class="product-actions">
            <select class="size-select" data-product-id="${product.id}">
              <option value="">Select size</option>
              ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            
            <button class="btn-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render shopping cart
   */
  renderCart() {
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return `
      <div class="cart-panel">
        <h3>Shopping Cart</h3>
        
        <div class="cart-items">
          ${this.cart.length === 0 ? '<p class="cart-empty">Your cart is empty</p>' : ''}
          ${this.cart.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-size">Size: ${item.size}</div>
                <div class="cart-item-price">€${item.price.toFixed(2)}</div>
              </div>
              
              <div class="cart-item-controls">
                <button class="btn-decrease" data-item-id="${item.id}">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="btn-increase" data-item-id="${item.id}">+</button>
                <button class="btn-remove" data-item-id="${item.id}">×</button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="cart-total">
          <div class="total-label">Total:</div>
          <div class="total-amount">€${total.toFixed(2)}</div>
        </div>
        
        <button class="btn-checkout" ${this.cart.length === 0 ? 'disabled' : ''}>
          Checkout with ABVET
        </button>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.productId;
        const sizeSelect = document.querySelector(`.size-select[data-product-id="${productId}"]`);
        const size = sizeSelect?.value;

        if (!size) {
          alert('Please select a size');
          return;
        }

        this.addToCart(productId, size);
      });
    });

    // Cart controls
    document.querySelectorAll('.btn-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.updateCartQuantity(itemId, 1);
      });
    });

    document.querySelectorAll('.btn-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.updateCartQuantity(itemId, -1);
      });
    });

    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.removeFromCart(itemId);
      });
    });

    // Checkout
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.checkout());
    }

    // Filters
    document.querySelectorAll('input[name="category"]').forEach(input => {
      input.addEventListener('change', () => this.updateFilters());
    });

    document.querySelectorAll('input[name="color"], input[name="size"]').forEach(input => {
      input.addEventListener('change', () => this.updateFilters());
    });

    const clearBtn = document.querySelector('.btn-clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearFilters());
    }
  }

  /**
   * Add product to cart
   */
  addToCart(productId, size) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${size}`;
    const existingItem = this.cart.find(item => item.id === cartItemId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        size: size,
        price: product.price,
        quantity: 1
      });
    }

    console.log('🛒 Added to cart:', cartItemId);
    this.render();
  }

  /**
   * Update cart item quantity
   */
  updateCartQuantity(itemId, delta) {
    const item = this.cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
      this.removeFromCart(itemId);
    } else {
      this.render();
    }
  }

  /**
   * Remove item from cart
   */
  removeFromCart(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    console.log('🗑️ Removed from cart:', itemId);
    this.render();
  }

  /**
   * Update filters
   */
  updateFilters() {
    const categoryInput = document.querySelector('input[name="category"]:checked');
    this.filters.category = categoryInput?.value !== 'all' ? categoryInput?.value : null;

    const colorInputs = document.querySelectorAll('input[name="color"]:checked');
    this.filters.colors = Array.from(colorInputs).map(input => input.value);

    const sizeInputs = document.querySelectorAll('input[name="size"]:checked');
    this.filters.sizes = Array.from(sizeInputs).map(input => input.value);

    this.render();
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.filters = {
      category: null,
      priceRange: null,
      colors: [],
      sizes: []
    };

    // Reset form inputs
    document.querySelectorAll('input[name="category"]').forEach(input => {
      input.checked = input.value === 'all';
    });
    document.querySelectorAll('input[name="color"], input[name="size"]').forEach(input => {
      input.checked = false;
    });

    this.render();
  }

  /**
   * Apply filters to products
   */
  applyFilters(products) {
    return products.filter(product => {
      // Category filter
      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      // Color filter
      if (this.filters.colors.length > 0) {
        const hasColor = this.filters.colors.some(color => product.colors.includes(color));
        if (!hasColor) return false;
      }

      // Size filter
      if (this.filters.sizes.length > 0) {
        const hasSize = this.filters.sizes.some(size => product.sizes.includes(size));
        if (!hasSize) return false;
      }

      return true;
    });
  }

  /**
   * Checkout
   */
  checkout() {
    console.log('💳 Starting checkout...');

    // Dispatch checkout event
    document.dispatchEvent(new CustomEvent('purchase:start', {
      detail: {
        amount: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        currency: 'EUR',
        items: this.cart
      }
    }));
  }

  /**
   * Get emotion icon
   */
  getEmotionIcon(emotion) {
    const icons = {
      celebration: '🎉',
      joy: '✨',
      neutral: '😊',
      elegant: '👗'
    };
    return icons[emotion] || '💫';
  }

  /**
   * Get color hex value
   */
  getColorHex(color) {
    const colors = {
      black: '#000000',
      white: '#FFFFFF',
      gold: '#D4AF37',
      blue: '#0066CC',
      red: '#CC0000',
      green: '#00AA00'
    };
    return colors[color] || '#CCCCCC';
  }
}

export default Tienda;
