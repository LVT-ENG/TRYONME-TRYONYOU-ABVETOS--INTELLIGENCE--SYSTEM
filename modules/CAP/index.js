// ===========================================================
// CAP MODULE — Creation & Production System
// Entry Point for Build
// TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
// ===========================================================

/**
 * CAP (Creation & Production)
 * Sistema de creación de patrones y producción JIT
 * Convierte emociones en diseños de moda únicos
 */

export { default as PatternGenerator } from './src/PatternGenerator'
export { default as FabricSimulator } from './src/FabricSimulator'
export { default as ProductionQueue } from './src/ProductionQueue'
export { default as QualityControl } from './src/QualityControl'

// Utilities
export { generatePattern, optimizePattern } from './src/utils/patternUtils'
export { simulateFabric, calculateMaterials } from './src/utils/fabricUtils'

// Constants
export const CAP_VERSION = '1.0.0'
export const CAP_MODULE_NAME = 'CAP - Creation & Production System'

// Default configuration
export const CAP_DEFAULT_CONFIG = {
  patternGeneration: true,
  fabricSimulation: true,
  jitProduction: true,
  qualityControl: true,
  sustainabilityMode: true,
  productionModes: ['express', 'standard', 'premium']
}

