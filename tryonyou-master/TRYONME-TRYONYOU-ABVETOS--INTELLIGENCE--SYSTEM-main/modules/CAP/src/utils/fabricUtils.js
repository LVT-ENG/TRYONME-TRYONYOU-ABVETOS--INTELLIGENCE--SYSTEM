/**
 * Simulate fabric behavior
 */
export const simulateFabric = (fabricType, pattern) => {
  return {
    fabricType: fabricType,
    drape: calculateDrape(fabricType),
    stretch: calculateStretch(fabricType),
    weight: calculateWeight(fabricType),
    texture: getTexture(fabricType)
  }
}

/**
 * Calculate materials needed
 */
export const calculateMaterials = (pattern, fabricType) => {
  const baseArea = pattern.bodyMetrics?.surfaceArea || 2.5 // m²
  const wasteFactor = 1.15 // 15% waste
  
  return {
    fabric: baseArea * wasteFactor,
    thread: baseArea * 50, // meters
    buttons: Math.floor(Math.random() * 10),
    zippers: Math.floor(Math.random() * 3)
  }
}

const calculateDrape = (fabricType) => {
  const drapeMap = {
    cotton: 0.7,
    silk: 0.9,
    polyester: 0.6,
    wool: 0.5
  }
  return drapeMap[fabricType] || 0.7
}

const calculateStretch = (fabricType) => {
  const stretchMap = {
    cotton: 0.3,
    silk: 0.2,
    polyester: 0.5,
    wool: 0.4
  }
  return stretchMap[fabricType] || 0.3
}

const calculateWeight = (fabricType) => {
  const weightMap = {
    cotton: 150, // g/m²
    silk: 80,
    polyester: 120,
    wool: 200
  }
  return weightMap[fabricType] || 150
}

const getTexture = (fabricType) => {
  const textureMap = {
    cotton: 'soft',
    silk: 'smooth',
    polyester: 'synthetic',
    wool: 'warm'
  }
  return textureMap[fabricType] || 'neutral'
}
