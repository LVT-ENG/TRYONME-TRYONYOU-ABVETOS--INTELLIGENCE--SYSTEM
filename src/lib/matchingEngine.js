/**
 * Deterministic Matching Engine for TRYONYOU Pilot
 *
 * Logic:
 * 1. Filter garments by Occasion and Category (if specified)
 * 2. Calculate "Fit Score" for each size of each garment
 *    - Difference between User Measurement and Garment Measurement
 *    - Adjust for Fabric Elasticity (Negative difference allowed up to elasticity %)
 * 3. Select Best Size for each garment
 * 4. Rank Garments by Best Size Fit Score
 */

import { garments } from '../data/garments';

export function findBestFit(userMeasurements, userPreferences) {
  const { occasion, fitPreference } = userPreferences; // fitPreference: 'slim', 'regular', 'relaxed'

  // 1. Filter by Occasion
  const relevantGarments = garments.filter(g =>
    g.occasion.includes(occasion)
  );

  const scoredGarments = relevantGarments.map(garment => {
    const bestSize = findBestSize(garment, userMeasurements, fitPreference);
    return {
      garment,
      bestSize,
      score: bestSize ? bestSize.score : -1
    };
  });

  // Filter out garments that don't fit at all and sort by score (lower is better, 0 is perfect)
  // Actually, let's say Score: 100 is perfect, 0 is bad.
  const ranked = scoredGarments
    .filter(item => item.bestSize !== null)
    .sort((a, b) => b.score - a.score);

  return ranked.length > 0 ? ranked[0] : null;
}

function findBestSize(garment, measurements, fitPreference) {
  let bestSize = null;
  let bestScore = -Infinity;

  garment.size_table.forEach(sizeVariant => {
    const score = calculateVariantScore(sizeVariant, garment.fabric, measurements, fitPreference);

    if (score > bestScore) {
      bestScore = score;
      bestSize = {
        name: sizeVariant.size,
        details: sizeVariant,
        score: score,
        fitStatus: getFitStatus(score)
      };
    }
  });

  // Threshold for "fitting"
  return bestScore > 50 ? bestSize : null;
}

function calculateVariantScore(variant, fabric, userMeasurements, fitPreference) {
  // Key measurements to check based on garment type
  // Simplified logic: Check Chest, Waist, Hips if they exist in both
  const keys = ['chest', 'waist', 'hips', 'shoulders'];
  let totalDiff = 0;
  let checks = 0;

  keys.forEach(key => {
    if (variant[key] && userMeasurements[key]) {
      checks++;
      const garmentVal = variant[key];
      const userVal = userMeasurements[key];
      const diff = garmentVal - userVal;

      // Elasticity Logic:
      // If fabric has elasticity, negative diff (User > Garment) is acceptable up to a point.
      // E.g. User Chest 90, Garment 88. Diff = -2.
      // If Elasticity 0.05 (5%), Max Stretch = 88 * 0.05 = 4.4.
      // -2 is within -4.4. So this is a "Tight/Fitted" fit, not "Too Small".

      const maxStretch = garmentVal * fabric.elasticity;

      let keyScore = 0;

      if (diff >= 0) {
        // Garment is bigger than body
        if (diff <= variant.tolerance) {
          keyScore = 100; // Perfect fit range
        } else {
          // Too loose
          // Penalize based on how much loose
          keyScore = 100 - (diff - variant.tolerance) * 5;
        }
      } else {
        // Garment is smaller than body (Needs stretch)
        const stretchNeeded = Math.abs(diff);
        if (stretchNeeded <= maxStretch) {
          // Fits with stretch
          // If preference is 'slim', this is good (100).
          // If preference is 'relaxed', this is bad.
          if (fitPreference === 'slim') keyScore = 95;
          else if (fitPreference === 'regular') keyScore = 80;
          else keyScore = 60; // Relaxed preferer hates stretch
        } else {
          // Too small even with stretch
          keyScore = 0;
        }
      }
      totalDiff += keyScore;
    }
  });

  return checks > 0 ? totalDiff / checks : 0;
}

function getFitStatus(score) {
  if (score >= 90) return "Perfect Fit";
  if (score >= 75) return "Great Fit";
  if (score >= 60) return "Good Fit";
  return "Poor Fit";
}
