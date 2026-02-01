/**
 * TRYONYOU Biometric Processing Hook
 * Patent: PCT/EP2025/067317
 * 
 * Core biometric extraction and digital twin management.
 * Implements ABVET (Advanced Biometric Verification & Emotional Tracking)
 * technology for precise body measurements and emotional state analysis.
 * 
 * @module hooks/useBiometrics
 * @copyright 2025 TRYONYOU - ABVETOS Intelligence System
 */

import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook for biometric processing
 * Handles digital twin creation and management
 */
export function useBiometrics() {
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Process biometric data from camera frame
   */
  const processBiometry = useCallback(async (imageData) => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      // Delegate progress tracking to API service
      const result = await api.processBiometricScan(imageData, setProgress);
      setProgress(100);

      // Enrich with computed data
      const enrichedTwin = {
        ...result,
        created_at: new Date().toISOString(),
        confidence: calculateConfidence(result),
        style_profile: generateStyleProfile(result),
      };

      setDigitalTwin(enrichedTwin);
      console.log('✅ Digital twin created:', enrichedTwin.user_id);
      
      return enrichedTwin;
    } catch (err) {
      setError(err.message);
      console.error('❌ Biometry processing failed:', err);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Update digital twin with new measurements
   */
  const updateMeasurements = useCallback(async (measurements) => {
    if (!digitalTwin) {
      throw new Error('No digital twin available');
    }

    try {
      const updated = {
        ...digitalTwin,
        measurements: { ...digitalTwin.measurements, ...measurements },
        updated_at: new Date().toISOString(),
      };

      setDigitalTwin(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [digitalTwin]);

  /**
   * Reset digital twin
   */
  const resetTwin = useCallback(() => {
    setDigitalTwin(null);
    setProgress(0);
    setError(null);
    console.log('🔄 Digital twin reset');
  }, []);

  /**
   * Calculate confidence score based on biometric data quality
   */
  const calculateConfidence = (data) => {
    let score = 0;
    if (data.measurements?.height) score += 33;
    if (data.measurements?.build) score += 33;
    if (data.skin_tone) score += 17;
    if (data.body_shape) score += 17;
    return Math.min(score, 100);
  };

  /**
   * Generate style profile from biometric data
   */
  const generateStyleProfile = (data) => {
    const profiles = {
      athletic: ['sporty', 'casual', 'active'],
      slim: ['tailored', 'fitted', 'modern'],
      average: ['classic', 'versatile', 'timeless'],
      muscular: ['structured', 'bold', 'confident'],
    };

    return profiles[data.measurements?.build] || profiles.average;
  };

  return {
    digitalTwin,
    isProcessing,
    progress,
    error,
    processBiometry,
    updateMeasurements,
    resetTwin,
  };
}
