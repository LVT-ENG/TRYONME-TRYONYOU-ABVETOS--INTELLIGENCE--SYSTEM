import { z } from 'zod';

// Input Schema (Raw Data)
export const RawMeasurementsSchema = z.object({
  height: z.number().positive(), // cm
  weight: z.number().positive().optional(), // kg
  chest: z.number().positive(), // cm
  waist: z.number().positive(), // cm
  hips: z.number().positive(), // cm
  inseam: z.number().positive().optional(), // cm
  shoulderWidth: z.number().positive().optional(), // cm
  armLength: z.number().positive().optional(), // cm
});

export type RawMeasurements = z.infer<typeof RawMeasurementsSchema>;

export interface NormalizedMeasurements {
  height: number; // mm
  weight?: number; // kg (passed through for BMI calc)
  chest: number; // mm
  waist: number; // mm
  hips: number; // mm
  inseam: number; // mm
  shoulderWidth: number; // mm
  armLength: number; // mm
  torsoLength: number; // mm
  neck?: number; // mm
  thigh?: number; // mm
}

export class AnthropometricService {
  
  /**
   * Validates raw inputs against physiological limits.
   * Throws error if values are impossible (e.g., waist > height).
   */
  validate(raw: RawMeasurements): void {
    if (raw.waist > raw.height * 0.8) {
      throw new Error("Waist circumference is physiologically improbable relative to height.");
    }
    if (raw.chest < raw.waist * 0.5) {
      throw new Error("Chest circumference is improbably small relative to waist.");
    }
    // Add more heuristic checks...
  }

  /**
   * Normalizes units to millimeters and standardizes format.
   */
  normalize(raw: RawMeasurements): Partial<NormalizedMeasurements> {
    return {
      height: Math.round(raw.height * 10),
      weight: raw.weight,
      chest: Math.round(raw.chest * 10),
      waist: Math.round(raw.waist * 10),
      hips: Math.round(raw.hips * 10),
      inseam: raw.inseam ? Math.round(raw.inseam * 10) : undefined,
      shoulderWidth: raw.shoulderWidth ? Math.round(raw.shoulderWidth * 10) : undefined,
      armLength: raw.armLength ? Math.round(raw.armLength * 10) : undefined,
    };
  }

  /**
   * Infers missing measurements using anthropometric ratios (Vitruvian Man logic + modern data).
   * Example: Inseam is approx 45-48% of height.
   */
  inferMissingValues(normalized: Partial<NormalizedMeasurements>): NormalizedMeasurements {
    const height = normalized.height!;
    
    // Ratios based on average human proportions
    const inferred: NormalizedMeasurements = {
      height: height,
      chest: normalized.chest || Math.round(height * 0.55), // Fallback
      waist: normalized.waist || Math.round(height * 0.45), // Fallback
      hips: normalized.hips || Math.round(height * 0.55), // Fallback
      
      // Inferences
      inseam: normalized.inseam || Math.round(height * 0.47),
      shoulderWidth: normalized.shoulderWidth || Math.round(height * 0.23),
      armLength: normalized.armLength || Math.round(height * 0.35),
      neck: normalized.neck || Math.round((inferred.chest * 0.22) - (height * 0.05) + 300), // Logic from Python script
      thigh: normalized.thigh || 0, // Placeholder, calculated below
      torsoLength: 0, // Calculated below
    };

    // Thigh Inference (Logic from Python script: Chest * 0.4 + BMI * 5 + 100)
    if (!inferred.thigh && normalized.weight) {
      const heightM = height / 1000;
      const bmi = normalized.weight / (heightM * heightM);
      inferred.thigh = Math.round((inferred.chest * 0.4) + (bmi * 5) + 100);
    } else if (!inferred.thigh) {
       inferred.thigh = Math.round(height * 0.32); // Fallback if no weight
    }

    // Derived calculation
    inferred.torsoLength = height - inferred.inseam - Math.round(height * 0.13); // Minus head/neck

    return inferred;
  }

  /**
   * Main pipeline: Raw -> Validated -> Normalized -> Complete Profile
   */
  processMeasurements(raw: RawMeasurements): { 
    normalized: NormalizedMeasurements, 
    confidence: number 
  } {
    this.validate(raw);
    const partialNorm = this.normalize(raw);
    const completeNorm = this.inferMissingValues(partialNorm);
    
    // Confidence calculation: More provided fields = higher confidence
    const providedFields = Object.keys(raw).length;
    const totalFields = 8; // Total expected fields
    const confidence = Math.min(1.0, 0.5 + (providedFields / totalFields) * 0.5);

    return { normalized: completeNorm, confidence };
  }
}
