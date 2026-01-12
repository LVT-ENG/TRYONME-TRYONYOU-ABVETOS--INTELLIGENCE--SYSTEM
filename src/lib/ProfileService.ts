import { PrismaClient, BodyProfile, MeasurementSource } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation Schema
const BodyProfileSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1),
  height: z.number().int().min(500).max(3000), // mm
  weight: z.number().positive().optional(),
  chest: z.number().int().positive(),
  waist: z.number().int().positive(),
  hips: z.number().int().positive(),
  shoulderWidth: z.number().int().positive(),
  source: z.nativeEnum(MeasurementSource).default(MeasurementSource.MANUAL),
});

export class ProfileService {
  
  /**
   * Creates or updates a body profile.
   * Enforces business rule: Only one active profile per user.
   */
  async createProfile(data: z.infer<typeof BodyProfileSchema>): Promise<BodyProfile> {
    const validated = BodyProfileSchema.parse(data);

    return await prisma.$transaction(async (tx) => {
      // Deactivate other profiles if this one is active (default logic: new profile is active)
      await tx.bodyProfile.updateMany({
        where: { userId: validated.userId, isActive: true },
        data: { isActive: false },
      });

      return await tx.bodyProfile.create({
        data: {
          ...validated,
          isActive: true,
        },
      });
    });
  }

  /**
   * Retrieves the currently active profile for a user.
   * Throws if no profile exists.
   */
  async getActiveProfile(userId: string): Promise<BodyProfile> {
    const profile = await prisma.bodyProfile.findFirst({
      where: { userId, isActive: true },
    });

    if (!profile) {
      throw new Error(`No active profile found for user ${userId}`);
    }

    return profile;
  }

  /**
   * Updates specific measurements (e.g., from a new scan).
   * Triggers a "ProfileUpdated" event (simulated here).
   */
  async updateMeasurements(profileId: string, measurements: Partial<BodyProfile>): Promise<BodyProfile> {
    const updated = await prisma.bodyProfile.update({
      where: { id: profileId },
      data: measurements,
    });

    // TODO: Emit EVENT: PROFILE_UPDATED (payload: { userId, profileId })
    console.log(`[EVENT] PROFILE_UPDATED: ${updated.id}`);
    
    return updated;
  }
}
