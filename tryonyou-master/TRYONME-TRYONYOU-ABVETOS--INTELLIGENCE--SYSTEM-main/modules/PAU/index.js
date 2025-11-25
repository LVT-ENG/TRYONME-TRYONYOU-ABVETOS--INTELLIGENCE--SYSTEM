// ===========================================================
// PAU MODULE — Emotional Avatar System
// Entry Point for Prebuild
// TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
// ===========================================================

/**
 * PAU (Personal Avatar Unit)
 * Sistema de avatar emocional que detecta el estado anímico
 * y adapta la experiencia de moda en tiempo real
 */

export { default as PAUAvatar } from './src/PAUAvatar'
export { default as EmotionDetector } from './src/EmotionDetector'
export { default as AvatarRenderer } from './src/AvatarRenderer'
export { default as EmotionalWardrobe } from './src/EmotionalWardrobe'

// Utilities
export { detectEmotion, mapEmotionToStyle } from './src/utils/emotionMapping'
export { renderAvatar3D } from './src/utils/avatarUtils'

// Constants
export const PAU_VERSION = '1.0.0'
export const PAU_MODULE_NAME = 'PAU - Emotional Avatar System'

// Default configuration
export const PAU_DEFAULT_CONFIG = {
  emotionDetection: true,
  realtime3D: true,
  biometricSync: true,
  adaptiveWardrobe: true,
  emotionalRange: ['joy', 'confidence', 'calm', 'energy', 'elegance']
}

