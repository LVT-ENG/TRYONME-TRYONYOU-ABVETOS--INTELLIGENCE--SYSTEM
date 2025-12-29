/**
 * ABVETOS Matching Engine
 * Deterministic logic for garment fitting based on biometric data and fabric physics.
 * Patent: PCT/EP2025/067317
 */

export const analyzeFit = (userMeasurements, garment) => {
  if (!userMeasurements || !garment || !garment.dimensions) {
    return { score: 0, explanation: "Insufficient data for analysis." };
  }

  const fabric = garment.fabric || { elasticity: 0, drape_score: 5 };
  let explanation = "";
  let score = 100;

  // Key dimension check (Chest for tops/jackets, Waist for pants)
  let diff = 0;
  let keyMetric = "";
  let garmentMetric = 0;

  if (garment.type === 'jacket' || garment.type === 'shirt') {
    keyMetric = "chest";
    garmentMetric = garment.dimensions.chest;
  } else if (garment.type === 'pants') {
    keyMetric = "waist";
    garmentMetric = garment.dimensions.waist;
  } else {
    // Default fallback
    keyMetric = "chest";
    garmentMetric = garment.dimensions.chest || 95;
  }

  const userValue = parseInt(userMeasurements[keyMetric] || 0);
  diff = garmentMetric - userValue; // Positive: garment larger, Negative: garment smaller

  // Logic:
  // If diff is roughly 0: Perfect fit.
  // If diff is negative (garment smaller): Check elasticity.
  // If diff is positive (garment larger): Check drape.

  if (Math.abs(diff) <= 2) {
    explanation = `Perfect anatomical match. The garment's ${keyMetric} (${garmentMetric}cm) aligns precisely with your measurement (${userValue}cm).`;
    score = 100;
  } else if (diff < 0) {
    // Garment is smaller than user. Needs stretch.
    const requiredStretch = (Math.abs(diff) / garmentMetric) * 100;
    if (requiredStretch <= fabric.elasticity) {
      explanation = `Fits your ${keyMetric} comfortably despite being form-fitting. The fabric's ${fabric.elasticity}% elasticity accommodates the ${Math.abs(diff)}cm difference without restriction.`;
      score = 95 - (requiredStretch * 0.5); // Slight penalty for tight fit
    } else {
      explanation = `Tight fit detected. Your ${keyMetric} is ${Math.abs(diff)}cm larger than the garment, exceeding the fabric's ${fabric.elasticity}% stretch limit.`;
      score = 60;
    }
  } else {
    // Garment is larger than user. Needs drape.
    if (fabric.drape_score > 6) {
      explanation = `Relaxed fit. The ${diff}cm extra room allows for fluid movement, supported by the fabric's high drape score (${fabric.drape_score}/10).`;
      score = 90;
    } else {
      explanation = `Structured fit. The garment provides ${diff}cm of ease around the ${keyMetric}, maintaining a sharp silhouette due to the rigid fabric structure.`;
      score = 85;
    }
  }

  return { score: Math.round(score), explanation };
};
