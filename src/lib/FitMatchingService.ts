import { PrismaClient, BodyProfile, GarmentVariant } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

interface FitAnalysisResult {
  score: number;
  zones: Record<string, { ratio: number; status: string }>;
}

export class FitMatchingService {
  
  /**
   * Core Algorithm: Calculates fit between a body profile and a garment variant.
   * This is the "Secret Sauce" logic.
   */
  private calculateFit(profile: BodyProfile, variant: GarmentVariant, elasticity: number): FitAnalysisResult {
    // 1. Normalize Units (DB is in mm)
    // 2. Calculate Ratios (Body / Garment)
    // Note: Garment dimensions are flat width, so we multiply by 2 for circumference approximation
    // (In a real system, we'd use more complex pattern geometry)
    
    const zones: Record<string, any> = {};
    let totalDeviation = 0;
    let zoneCount = 0;

    // Helper to analyze a zone
    const analyzeZone = (bodyMm: number, garmentFlatMm: number | null, zoneName: string) => {
      if (!garmentFlatMm) return;
      
      const garmentCircumference = garmentFlatMm * 2;
      const ratio = bodyMm / garmentCircumference;
      
      // Elasticity Logic
      const maxComfort = 1.0 + (elasticity * 0.2); // e.g., 1.2 for high stretch
      const minComfort = 0.92; // Negative ease allowed

      let status = 'PERFECT';
      if (ratio > maxComfort) status = 'TIGHT';
      if (ratio < minComfort) status = 'LOOSE';

      zones[zoneName] = { ratio, status };
      
      // Deviation from ideal (1.0)
      totalDeviation += Math.abs(1.0 - ratio);
      zoneCount++;
    };

    analyzeZone(profile.chest, variant.chestWidth, 'chest');
    analyzeZone(profile.waist, variant.waistWidth, 'waist');
    analyzeZone(profile.hips, variant.hipWidth, 'hips');

    // Calculate Score (0-100)
    const avgDeviation = zoneCount > 0 ? totalDeviation / zoneCount : 0;
    const score = Math.max(0, 100 - (avgDeviation * 100 * 2)); // Penalty factor

    return { score: Math.round(score), zones };
  }

  /**
   * Generates a hash of the profile to detect changes and use as cache key.
   */
  private hashProfile(profile: BodyProfile): string {
    const data = `${profile.height}-${profile.chest}-${profile.waist}-${profile.hips}`;
    return crypto.createHash('md5').update(data).digest('hex');
  }

  /**
   * EVENT HANDLER: Called when PROFILE_UPDATED event is received.
   * Re-calculates fit for all items in the user's wardrobe or wishlist.
   */
  async onProfileUpdated(profile: BodyProfile) {
    const profileHash = this.hashProfile(profile);
    console.log(`[FitMatchingService] Processing update for profile ${profile.id} (Hash: ${profileHash})`);

    // 1. Fetch relevant variants (e.g., from Wardrobe)
    // In a real scenario, we might process the whole catalog or just the user's items
    const wardrobeItems = await prisma.wardrobeItem.findMany({
      where: { userId: profile.userId },
      include: { variant: { include: { garment: true } } },
    });

    for (const item of wardrobeItems) {
      const variant = item.variant;
      const result = this.calculateFit(profile, variant, variant.garment.elasticity);

      // 2. Persist Prediction Cache
      await prisma.fitPrediction.upsert({
        where: {
          variantId_profileHash: {
            variantId: variant.id,
            profileHash: profileHash,
          },
        },
        update: {
          overallScore: result.score,
          zoneAnalysis: result.zones,
          calculatedAt: new Date(),
        },
        create: {
          variantId: variant.id,
          bodyProfileId: profile.id,
          profileHash: profileHash,
          overallScore: result.score,
          zoneAnalysis: result.zones,
        },
      });

      // 3. Check for "Fit Issue" Alerts
      if (result.score < 60) {
        console.log(`[ALERT] Fit Issue Detected for item ${item.id}: Score ${result.score}`);
        // Emit EVENT: FIT_ISSUE_DETECTED
      }
    }
  }
}
