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
    // Pass weight for drape analysis
    const bestSize = findBestSize(garment, userMeasurements, fitPreference);
    return {
      garment,
      bestSize,
      score: bestSize ? bestSize.score : -1
    };
  });

  // Filter out garments that don't fit at all and sort by score (higher is better)
  const ranked = scoredGarments
    .filter(item => item.bestSize !== null)
    .sort((a, b) => b.score - a.score);

  return ranked.length > 0 ? ranked[0] : null;
}

function findBestSize(garment, measurements, fitPreference) {
  let bestSize = null;
  let bestScore = -Infinity;

  garment.size_table.forEach(sizeVariant => {
    const score = calculateVariantScore(sizeVariant, garment.fabric, measurements, fitPreference, garment.cut_type);

    if (score.totalScore > bestScore) {
      bestScore = score.totalScore;
      bestSize = {
        name: sizeVariant.size,
        details: sizeVariant,
        score: score.totalScore,
        fitStatus: getFitStatus(score.totalScore),
        explanation: score.explanation
      };
    }
  });

  // Threshold for "fitting"
  return bestScore > 50 ? bestSize : null;
}

function calculateVariantScore(variant, fabric, userMeasurements, fitPreference, cutType) {
  // Key measurements to check based on garment type
  const keys = ['chest', 'waist', 'hips', 'shoulders'];
  let totalDiff = 0;
  let checks = 0;
  const reasons = [];

  // 1. Basic Dimensional Match
  keys.forEach(key => {
    if (variant[key] && userMeasurements[key]) {
      checks++;
      const garmentVal = variant[key];
      const userVal = userMeasurements[key];
      const diff = garmentVal - userVal;

      // Elasticity Logic:
      const maxStretch = garmentVal * fabric.elasticity;

      let keyScore = 0;

      if (diff >= 0) {
        // Garment is bigger than body
        if (diff <= variant.tolerance) {
          keyScore = 100; // Perfect fit range
        } else {
          // Too loose
          keyScore = Math.max(0, 100 - (diff - variant.tolerance) * 5);
          if (keyScore < 80) reasons.push(`${key} too loose`);
        }
      } else {
        // Garment is smaller than body (Needs stretch)
        const stretchNeeded = Math.abs(diff);
        if (stretchNeeded <= maxStretch) {
          // Fits with stretch
          if (fitPreference === 'slim') {
            keyScore = 95;
            reasons.push(`${key} fits snug (stretch used)`);
          }
          else if (fitPreference === 'regular') {
            keyScore = 80;
            reasons.push(`${key} slightly tight`);
          }
          else {
            keyScore = 60; // Relaxed preferer hates stretch
            reasons.push(`${key} too tight for relaxed fit`);
          }
        } else {
          // Too small even with stretch
          keyScore = 0;
          reasons.push(`${key} too small`);
        }
      }
      totalDiff += keyScore;
    }
  });

  let finalScore = checks > 0 ? totalDiff / checks : 0;

  // 2. Advanced: Drape & Comfort Analysis (Weight/BMI Logic)
  // If user is heavier (BMI > 25 approx proxy), penalize High Rigidity fabrics unless cut is relaxed
  if (userMeasurements.weight && userMeasurements.height) {
    const heightM = userMeasurements.height / 100;
    const bmi = userMeasurements.weight / (heightM * heightM);

    // Logic: Higher BMI + High Rigidity (Low Drape) + Slim Cut = Uncomfortable
    // fabric.rigidity is 0 (soft) to 1 (stiff)
    if (bmi > 25 && fabric.rigidity > 0.6 && cutType === 'slim') {
      finalScore -= 15;
      reasons.push("Fabric rigidity might be uncomfortable for this cut");
    }

    // Logic: High Elasticity bonus for comfort
    if (fabric.elasticity > 0.10) {
      finalScore += 5; // Bonus for comfort
      // reasons.push("High elasticity fabric selected for comfort"); // Optional, maybe too verbose
    }
  }

  // Cap score at 100
  finalScore = Math.min(100, Math.max(0, finalScore));

  // Generate generic explanation if no specific issues
  let explanation = "Fits well based on your measurements.";
  if (reasons.length > 0) {
    explanation = reasons.join(", ");
  } else if (finalScore >= 95) {
    explanation = "Perfect match on dimensions and fabric physics.";
  }

  return { totalScore: finalScore, explanation };
}

function getFitStatus(score) {
  if (score >= 90) return "Perfect Fit";
  if (score >= 75) return "Great Fit";
  if (score >= 60) return "Good Fit";
  return "Poor Fit";
}
