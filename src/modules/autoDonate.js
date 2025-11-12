/**
 * TRYONYOU - Auto Donate Module
 * Automated donation system based on emotional resonance
 * Part of ABVET payment ecosystem
 */

export class AutoDonate {
  constructor(config = {}) {
    this.enabled = config.enabled !== false;
    this.defaultAmount = config.defaultAmount || 1; // EUR
    this.causes = config.causes || ['sustainable-fashion', 'local-artisans', 'education'];
    this.emotionalThreshold = config.emotionalThreshold || 0.7; // Minimum emotion confidence to trigger
    this.donationHistory = [];
    this.garmentRegistry = [];
  }

  /**
   * Initialize auto-donate system
   */
  async init() {
    console.log('💝 Initializing Auto-Donate System...');
    
    if (!this.enabled) {
      console.log('⚠️ Auto-Donate is disabled');
      return this;
    }

    console.log(`✅ Auto-Donate initialized with causes: ${this.causes.join(', ')}`);
    return this;
  }

  /**
   * Check if emotional state triggers a donation
   * @param {Object} emotionalData - Emotional state from PAU
   */
  shouldTriggerDonation(emotionalData) {
    if (!this.enabled) return false;

    // Trigger on strong positive emotions
    const positiveEmotions = ['celebration', 'joy', 'gratitude', 'love'];
    const isPositive = positiveEmotions.includes(emotionalData.emotion);
    const isConfident = emotionalData.confidence >= this.emotionalThreshold;

    return isPositive && isConfident;
  }

  /**
   * Trigger automatic donation based on emotion
   * @param {Object} emotionalData - Emotional state from PAU
   * @param {Object} paymentModule - PagoABVET instance
   */
  async triggerDonation(emotionalData, paymentModule) {
    console.log('💫 Evaluating auto-donation trigger...');

    if (!this.shouldTriggerDonation(emotionalData)) {
      console.log('⏭️ Emotional threshold not met, skipping donation');
      return null;
    }

    // Select cause based on emotion
    const cause = this.selectCause(emotionalData);
    const amount = this.calculateAmount(emotionalData);

    console.log(`🎁 Triggering donation: €${amount} to ${cause}`);

    try {
      const result = await paymentModule.autoDonate(amount, cause);
      
      // Record donation
      this.donationHistory.push({
        amount: amount,
        cause: cause,
        emotion: emotionalData.emotion,
        confidence: emotionalData.confidence,
        timestamp: new Date().toISOString(),
        success: result.success
      });

      console.log('✅ Auto-donation completed successfully');
      return result;
    } catch (error) {
      console.error('❌ Auto-donation failed:', error);
      throw error;
    }
  }

  /**
   * Select donation cause based on emotional context
   * @param {Object} emotionalData - Emotional state
   */
  selectCause(emotionalData) {
    // Map emotions to causes
    const emotionToCause = {
      'celebration': 'local-artisans',
      'joy': 'education',
      'gratitude': 'sustainable-fashion',
      'love': 'local-artisans'
    };

    const selectedCause = emotionToCause[emotionalData.emotion] || this.causes[0];
    console.log(`🎯 Selected cause: ${selectedCause} based on emotion: ${emotionalData.emotion}`);
    
    return selectedCause;
  }

  /**
   * Calculate donation amount based on emotional intensity
   * @param {Object} emotionalData - Emotional state
   */
  calculateAmount(emotionalData) {
    // Scale amount by confidence (1-5 EUR)
    const scaledAmount = this.defaultAmount * (1 + (emotionalData.confidence * 4));
    const amount = Math.round(scaledAmount * 100) / 100; // Round to 2 decimals
    
    console.log(`💰 Calculated donation amount: €${amount} (confidence: ${emotionalData.confidence})`);
    return amount;
  }

  /**
   * Get donation history
   */
  getHistory() {
    return {
      donations: this.donationHistory,
      totalAmount: this.donationHistory.reduce((sum, d) => sum + d.amount, 0),
      totalCount: this.donationHistory.length,
      causes: [...new Set(this.donationHistory.map(d => d.cause))]
    };
  }

  /**
   * Register a garment for donation (Solidarity Wardrobe)
   */
  async registerGarmentForDonation(garmentData, cause = null) {
    console.log('📝 Registering garment for donation...');
    const donation = {
      id: `DONATION_${Date.now()}`,
      garment: garmentData,
      cause: cause || this.causes[0],
      status: 'registered',
      registeredAt: new Date().toISOString()
    };
    this.garmentRegistry.push(donation);
    return donation;
  }

  /**
   * Enable/disable auto-donate
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    console.log(`💝 Auto-Donate ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Update donation settings
   */
  updateSettings(settings) {
    if (settings.defaultAmount) this.defaultAmount = settings.defaultAmount;
    if (settings.causes) this.causes = settings.causes;
    if (settings.emotionalThreshold) this.emotionalThreshold = settings.emotionalThreshold;
    
    console.log('⚙️ Auto-Donate settings updated');
  }
}

export default AutoDonate;
