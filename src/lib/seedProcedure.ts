import { protectedProcedure, router } from "./_core/trpc";
import { seedDatabase } from "./seed";

export const seedRouter = router({
  runSeed: protectedProcedure.mutation(async ({ ctx }) => {
    // Only allow admin users to run seed
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized: Only admins can run seed data");
    }

    try {
      await seedDatabase();
      return {
        success: true,
        message: "Database seeded successfully with demo data",
      };
    } catch (error) {
      console.error("Seed error:", error);
      throw new Error(`Seed failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }),
});
