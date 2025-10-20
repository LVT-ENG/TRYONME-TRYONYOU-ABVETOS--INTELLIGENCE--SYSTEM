/**
 * TRYONYOU Frontend Application
 * Main application entry point
 */

import { Avatar3D } from '../modules/avatar3D.js';
import { PagoABVET } from '../modules/pagoABVET.js';
import { RecomendadorPAU } from '../modules/recomendadorPAU.js';
import { AutoDonate } from '../modules/autoDonate.js';
import { ABVETBot } from '../modules/abvetBot.js';

class TryOnYouApp {
  constructor() {
    this.modules = {
      avatar: null,
      payment: null,
      recommender: null,
      donate: null,
      bot: null
    };
    this.initialized = false;
  }

  /**
   * Initialize all modules
   */
  async init() {
    console.log('🚀 Initializing TRYONYOU Application...');

    try {
      // Initialize modules
      this.modules.avatar = await new Avatar3D({ 
        canvas: document.getElementById('avatar-canvas') 
      }).init();
      
      this.modules.payment = await new PagoABVET({
        environment: 'production'
      }).init();
      
      this.modules.recommender = await new RecomendadorPAU().init();
      this.modules.donate = await new AutoDonate().init();
      this.modules.bot = await new ABVETBot({ name: 'PAU Assistant' }).init();

      this.initialized = true;
      console.log('✅ All modules initialized successfully');
      
      this.setupEventListeners();
      
      return this;
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    console.log('Setting up event listeners...');
    // Event listener setup logic
  }

  /**
   * Get module instance
   * @param {string} moduleName - Name of the module
   */
  getModule(moduleName) {
    return this.modules[moduleName];
  }

  /**
   * Start the application
   */
  start() {
    if (!this.initialized) {
      console.error('Application not initialized. Call init() first.');
      return;
    }
    console.log('🎨 TRYONYOU App is running...');
  }
}

// Export singleton instance
export const app = new TryOnYouApp();

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    app.init().then(() => app.start());
  });
}

export default app;
