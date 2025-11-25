/**
 * Generate pattern from emotion and body metrics
 */
export const generatePattern = (emotion, bodyMetrics) => {
  return {
    id: Date.now(),
    emotion: emotion,
    bodyMetrics: bodyMetrics,
    pattern: {
      type: 'custom',
      complexity: 'medium',
      style: mapEmotionToStyle(emotion)
    }
  }
}

/**
 * Optimize pattern for production
 */
export const optimizePattern = (pattern) => {
  return {
    ...pattern,
    optimized: true,
    materialEfficiency: 0.95,
    productionTime: calculateProductionTime(pattern)
  }
}

const mapEmotionToStyle = (emotion) => {
  const styleMap = {
    joy: 'vibrant',
    confidence: 'bold',
    calm: 'minimalist',
    energy: 'dynamic',
    elegance: 'sophisticated'
  }
  return styleMap[emotion] || 'classic'
}

const calculateProductionTime = (pattern) => {
  // Simulate production time calculation
  return Math.floor(Math.random() * 48) + 24 // 24-72 hours
}
