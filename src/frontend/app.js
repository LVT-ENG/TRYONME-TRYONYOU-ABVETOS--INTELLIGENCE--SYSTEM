/**
 * TRYONYOU - Frontend App
 * Main application orchestrator
 */

import Avatar3D from '../modules/avatar3D.js';
import PagoABVET from '../modules/pagoABVET.js';
import RecomendadorPAU from '../modules/recomendadorPAU.js';
import AutoDonate from '../modules/autoDonate.js';
import ABVETBot from '../modules/abvetBot.js';

export class TryonYouApp {
  constructor(config = {}) {
    this.config = config;
    this.modules = {};
    this.initialized = false;
  }

  /**
   * Initialize TRYONYOU application
   */
  async init() {
    console.log('🚀 Initializing TRYONYOU App...');

    try {
      // Initialize core modules
      this.modules.avatar = new Avatar3D({
        containerId: this.config.avatarContainer || 'avatar-container',
        modelPath: this.config.avatarModel || '/assets/pau/models/default.glb'
      });
      await this.modules.avatar.init();

      this.modules.payment = new PagoABVET({
        apiEndpoint: this.config.paymentEndpoint || '/api/payments',
        biometric: true,
        emotionalContext: true
      });
      await this.modules.payment.init();

      this.modules.recommender = new RecomendadorPAU({
        apiEndpoint: this.config.recommenderEndpoint || '/api/recommendations'
      });
      await this.modules.recommender.init();

      this.modules.autoDonate = new AutoDonate({
        enabled: this.config.autoDonateEnabled !== false,
        defaultAmount: this.config.defaultDonationAmount || 1
      });
      await this.modules.autoDonate.init();

      this.modules.bot = new ABVETBot({
        name: 'ABVET',
        personality: 'friendly',
        emotionalAwareness: true
      });
      await this.modules.bot.init();

      this.initialized = true;
      console.log('✅ TRYONYOU App initialized successfully');

      // Setup event listeners
      this.setupEventListeners();

      return this;
    } catch (error) {
      console.error('❌ Error initializing TRYONYOU App:', error);
      throw error;
    }
  }

  /**
   * Setup event listeners for UI interactions
   */
  setupEventListeners() {
    console.log('🔗 Setting up event listeners...');

    // Avatar emotion changes
    document.addEventListener('pau:emotion', (e) => {
      this.handleEmotionChange(e.detail);
    });

    // Chat messages
    document.addEventListener('chat:message', (e) => {
      this.handleChatMessage(e.detail);
    });

    // Product interactions
    document.addEventListener('product:view', (e) => {
      this.handleProductView(e.detail);
    });

    // Purchase events
    document.addEventListener('purchase:start', (e) => {
      this.handlePurchaseStart(e.detail);
    });
  }

  /**
   * Handle emotion change from PAU
   */
  async handleEmotionChange(emotionalData) {
    console.log('😊 Emotion changed:', emotionalData);

    // Update avatar
    if (this.modules.avatar) {
      this.modules.avatar.setEmotion(emotionalData.emotion);
    }

    // Check for auto-donation trigger
    if (this.modules.autoDonate && this.modules.payment) {
      try {
        await this.modules.autoDonate.triggerDonation(emotionalData, this.modules.payment);
      } catch (error) {
        console.error('Auto-donation error:', error);
      }
    }
  }

  /**
   * Handle chat message
   */
  async handleChatMessage(messageData) {
    console.log('💬 Chat message:', messageData);

    if (this.modules.bot) {
      const response = await this.modules.bot.processMessage(
        messageData.message,
        messageData.emotionalContext
      );

      // Dispatch response event
      document.dispatchEvent(new CustomEvent('chat:response', {
        detail: { response }
      }));
    }
  }

  /**
   * Handle product view
   */
  async handleProductView(productData) {
    console.log('👗 Product viewed:', productData);

    if (this.modules.recommender) {
      // Get related recommendations
      const recommendations = await this.modules.recommender.getRecommendations(
        productData.emotionalContext,
        { productId: productData.id }
      );

      // Dispatch recommendations event
      document.dispatchEvent(new CustomEvent('recommendations:updated', {
        detail: { recommendations }
      }));
    }
  }

  /**
   * Handle purchase start
   */
  async handlePurchaseStart(purchaseData) {
    console.log('💳 Purchase started:', purchaseData);

    if (this.modules.payment) {
      try {
        const result = await this.modules.payment.processPayment(
          purchaseData,
          purchaseData.emotionalContext
        );

        // Dispatch purchase complete event
        document.dispatchEvent(new CustomEvent('purchase:complete', {
          detail: { result }
        }));
      } catch (error) {
        console.error('Payment error:', error);
        document.dispatchEvent(new CustomEvent('purchase:error', {
          detail: { error: error.message }
        }));
      }
    }
  }

  /**
   * Get module instance
   */
  getModule(name) {
    return this.modules[name];
  }

  /**
   * Dispose all modules
   */
  dispose() {
    console.log('🧹 Disposing TRYONYOU App...');

    if (this.modules.avatar) {
      this.modules.avatar.dispose();
    }

    this.modules = {};
    this.initialized = false;
  }
}

export default TryonYouApp;
