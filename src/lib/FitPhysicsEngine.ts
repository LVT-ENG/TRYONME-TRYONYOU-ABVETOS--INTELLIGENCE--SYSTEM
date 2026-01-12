interface BodyMeasurements {
  chest: number;
  waist: number;
  hips: number;
  shoulders: number;
}

interface GarmentDimensions {
  chest: number;
  waist: number;
  hips: number;
  shoulders: number;
  elasticity: number; // 0.0 (rigid) to 1.0 (super stretchy)
}

export interface FitResult {
  score: number; // 0-100
  zones: {
    chest: number; // Ratio: Body / Garment
    waist: number;
    hips: number;
    shoulders: number;
  };
  status: 'perfect' | 'tight' | 'loose' | 'unwearable';
  recommendation: string;
}

export class FitPhysicsEngine {
  /**
   * Calculates the fit tension map for a garment on a specific body.
   * Returns ratios where:
   * 1.0 = Perfect skin fit
   * < 1.0 = Loose (Garment is larger than body)
   * > 1.0 = Tight (Body is larger than garment)
   */
  static calculateFit(body: BodyMeasurements, garment: GarmentDimensions): FitResult {
    // Calculate tension ratios (Body / Garment)
    // Example: Body Chest 100cm / Garment Chest 95cm = 1.05 (Tight)
    const chestRatio = body.chest / garment.chest;
    const waistRatio = body.waist / garment.waist;
    const hipsRatio = body.hips / garment.hips;
    const shouldersRatio = body.shoulders / garment.shoulders;

    // Adjust for elasticity
    // If fabric is elastic, it can tolerate higher ratios before feeling "tight"
    const maxComfortRatio = 1.0 + (garment.elasticity * 0.15); // e.g., 1.15 for max elasticity
    const minComfortRatio = 0.95; // A bit of ease is usually desired

    // Determine overall status
    let status: FitResult['status'] = 'perfect';
    let maxRatio = Math.max(chestRatio, waistRatio, hipsRatio, shouldersRatio);
    let minRatio = Math.min(chestRatio, waistRatio, hipsRatio, shouldersRatio);

    if (maxRatio > maxComfortRatio + 0.05) {
      status = 'unwearable';
    } else if (maxRatio > maxComfortRatio) {
      status = 'tight';
    } else if (minRatio < 0.90) {
      status = 'loose';
    }

    // Calculate Score (100 is perfect)
    // Penalize deviation from 1.0 (or ideal ease)
    const idealRatio = 0.98; // Slight ease
    const deviation = 
      Math.abs(chestRatio - idealRatio) + 
      Math.abs(waistRatio - idealRatio) + 
      Math.abs(hipsRatio - idealRatio);
    
    const score = Math.max(0, 100 - (deviation * 100));

    // Generate Recommendation
    let recommendation = "Fits perfectly!";
    if (status === 'tight') recommendation = "This item is tight. Consider sizing up.";
    if (status === 'loose') recommendation = "A bit loose. Consider sizing down or tailoring.";
    if (status === 'unwearable') recommendation = "This size is likely too small for you.";

    return {
      score: Math.round(score),
      zones: {
        chest: chestRatio,
        waist: waistRatio,
        hips: hipsRatio,
        shoulders: shouldersRatio
      },
      status,
      recommendation
    };
  }
}
