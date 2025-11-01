/**
 * TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 * PAU® Recommender Module  v1.4 (EPCT 2025)
 *
 * Emotionally-aware recommendation engine for the Personal Avatar Unit.
 * Connected to FTT (Fashion Trend Tracker) and ABVETOS Orchestrator.
 * Provides contextual, biometric-aware fashion suggestions.
 *
 * © 2025 TRYONYOU / ABVETOS SYSTEMS — All rights reserved.
 */

const PAU_API_ENDPOINT   = import.meta.env.VITE_PAU_API_ENDPOINT   || '/api/recommendations';
const TELEGRAM_ALERT_URL = import.meta.env.VITE_TELEGRAM_ALERT_URL || '';
const GIT_COMMIT_HASH    = import.meta.env.VITE_GIT_COMMIT_HASH    || 'dev-local';
const REQUEST_TIMEOUT_MS = 10000;

async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export class RecommenderPAU {
  constructor(config = {}) {
    this.apiEndpoint = config.apiEndpoint || PAU_API_ENDPOINT;
    this.userProfile = config.userProfile || null;
    this.emotionalWeight = config.emotionalWeight || 0.5;
  }

  async init() {
    console.log('🎯 Initializing PAU Recommender…');
    if (!this.userProfile) {
      console.warn('⚠️ No user profile provided, using default.');
      this.userProfile = this.getDefaultProfile();
    }
    console.log('✅ PAU Recommender initialized');
    return this;
  }

  getDefaultProfile() {
    return {
      size: 'M',
      preferences: {
        colors: ['black', 'white', 'gold'],
        styles: ['modern', 'elegant'],
        occasions: ['casual', 'formal']
      },
      body: { height: 170, measurements: {} }
    };
  }

  async getRecommendations(emotionalState, context = {}) {
    console.log('🔍 Generating PAU recommendations…');

    const payload = {
      userProfile: this.userProfile,
      emotionalState,
      context,
      commit: GIT_COMMIT_HASH,
      timestamp: new Date().toISOString()
    };

    try {
      const res = await fetchWithTimeout(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`PAU API error: ${res.status}`);
      const recommendations = await res.json();

      console.log(`✅ Generated ${recommendations.items?.length || 0} recommendations`);

      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent('ABVETOS_SYNC_EVENT', {
            detail: { module: 'PAU-Recommender', success: true, items: recommendations.items?.length }
          })
        );
      }

      return recommendations;
    } catch (error) {
      console.error('❌ Error getting recommendations:', error);

      if (TELEGRAM_ALERT_URL) {
        fetchWithTimeout(TELEGRAM_ALERT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            module: 'PAU-Recommender',
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
          })
        }, 5000).catch(() => {});
      }

      return this.getFallbackRecommendations();
    }
  }

  getFallbackRecommendations() {
    console.log('📋 Using fallback recommendations');
    return {
      items: [
        {
          id: 'corset-kimono-1',
          name: 'Corset Kimono Fusion',
          category: 'capsule',
          emotion: 'celebration',
          confidence: 0.85
        }
      ],
      metadata: {
        source: 'fallback',
        timestamp: new Date().toISOString()
      }
    };
  }

  async refineRecommendation(itemId, action, emotionalResponse) {
    console.log(`🎨 Refining recommendations (${action}) for item ${itemId}`);
    const feedback = {
      itemId,
      action,
      emotionalResponse,
      timestamp: new Date().toISOString(),
      commit: GIT_COMMIT_HASH
    };

    try {
      await fetchWithTimeout(`${this.apiEndpoint}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      });
      console.log('✅ Recommendation refined');
    } catch (error) {
      console.error('❌ Error refining recommendation:', error);
    }
  }

  getSizeRecommendation(measurements) {
    console.log('📏 Calculating size recommendation…');
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    let size = 'M';
    let confidence = 0.5; // Default low confidence when no measurements

    if (measurements.chest && measurements.waist) {
      const chest = parseFloat(measurements.chest);
      const waist = parseFloat(measurements.waist);
      
      // Validate measurements are numeric
      if (!isNaN(chest) && !isNaN(waist) && chest > 0 && waist > 0) {
        const avg = (chest + waist) / 2;
        if (avg < 80) size = 'XS';
        else if (avg < 88) size = 'S';
        else if (avg < 96) size = 'M';
        else if (avg < 104) size = 'L';
        else if (avg < 112) size = 'XL';
        else size = 'XXL';
        
        confidence = 0.9; // High confidence with valid measurements
      }
    }

    return { size, confidence, alternatives: sizes.filter(s => s !== size) };
  }
}

export const TRYONYOU_PAU_RECOMMENDER = RecommenderPAU;
export default RecommenderPAU;
