/**
 * PAU-CHECK Module v4
 * Director de aprobación de avatar (Pau)
 *
 * El sistema "PAU-CHECK" replica el rol del Director de Avatar Real: Pau.
 * El objetivo es garantizar que cada avatar:
 * - Mantiene la identidad del usuario (sin cambios de rasgos)
 * - Presenta embellecimiento profesional realista
 * - Conserva dignidad, elegancia y verdad
 * - No parece falso, exagerado o plástico
 * - Representa "la mejor versión del usuario"
 */

import {
  PauCheckInput,
  PauCheckResult,
  PauCheckOptions,
  PauCheckThresholds,
} from "./types";
import { normalizeImage } from "./utils/image";
import { computeIdentityDistance } from "./clients/baoClient";
import { analyzeBeauty } from "./clients/beautyClient";
import { analyzeDignity } from "./clients/dignityClient";

/**
 * Default thresholds for PAU-CHECK validation
 */
export const DEFAULT_THRESHOLDS: PauCheckThresholds = {
  identityMaxDistance: 0.03, // < 3% difference
  maxSkinSmoothingLevel: 0.7, // 0 = nothing, 1 = plastic skin
  maxMakeupIntensity: 0.8, // 0 = nothing, 1 = full drag
  minDignityScore: 0.7, // 0 = clown, 1 = royal portrait
  minNaturalLightScore: 0.6, // 0 = crazy lighting, 1 = coherent light
};

/**
 * Main entry point for PAU-CHECK validation.
 * Executes all validations and returns decision + notes.
 *
 * Pipeline:
 * 1. INPUT: Avatar rendered by Nano Render + Identity from Bao + Style from Tendency
 * 2. VALIDATIONS:
 *    - Identity: Comparison with Bao facial mesh
 *    - Beauty: Detection of artificial skin/lighting
 *    - Dignity: Elegance and coherence check
 * 3. DECISION: approved or rejected with detailed diagnostics
 *
 * @param input - PauCheckInput object containing avatar image and identity data
 * @param options - Optional configuration for thresholds
 * @returns Promise resolving to PauCheckResult
 */
export async function runPauCheck(
  input: PauCheckInput,
  options: PauCheckOptions = {}
): Promise<PauCheckResult> {
  const thresholds = { ...DEFAULT_THRESHOLDS, ...(options.thresholds || {}) };

  // 1) Normalize the image input (buffer / path / base64)
  const avatarImage = await normalizeImage(input.avatarImage);

  // 2) IDENTITY VALIDATION (with Bao)
  const distance = await computeIdentityDistance(
    avatarImage,
    input.baoIdentityData
  );

  if (distance > thresholds.identityMaxDistance) {
    return {
      decision: "rejected",
      notes: `Rejected: identity integrity failed (distance=${distance.toFixed(4)})`,
      signature: "Rejected by Pau",
      diagnostics: {
        step: "identity",
        distance,
        identityDiagnostics: {
          passed: false,
          distance,
        },
      },
    };
  }

  // 3) BEAUTY ANALYSIS (Maquillador Real + Peinador Real checks)
  const beauty = await analyzeBeauty(avatarImage, {
    maxSkinSmoothingLevel: thresholds.maxSkinSmoothingLevel,
    maxMakeupIntensity: thresholds.maxMakeupIntensity,
    minNaturalLightScore: thresholds.minNaturalLightScore,
  });

  if (!beauty.passed) {
    return {
      decision: "rejected",
      notes: `Rejected: unnatural beauty - ${beauty.reason}`,
      signature: "Rejected by Pau",
      diagnostics: {
        step: "beauty",
        distance,
        beauty,
      },
    };
  }

  // 4) DIGNITY ANALYSIS (Tendency style adherence)
  const dignity = await analyzeDignity(
    avatarImage,
    input.styleData || {},
    { minDignityScore: thresholds.minDignityScore }
  );

  if (!dignity.passed) {
    return {
      decision: "rejected",
      notes: `Rejected: insufficient dignity (score=${dignity.dignityScore.toFixed(2)})`,
      signature: "Rejected by Pau",
      diagnostics: {
        step: "dignity",
        distance,
        beauty,
        dignity,
      },
    };
  }

  // 5) APPROVED BY PAU
  return {
    decision: "approved",
    notes:
      "Avatar is dignified, natural and beautiful. " +
      "El avatar es la mejor versión del usuario. " +
      "Aprobado por Pau.",
    signature: "Aprobado por Pau — Versión Realista y Digna",
    diagnostics: {
      step: "final",
      distance,
      beauty,
      dignity,
    },
  };
}

// Re-export types for convenience
export * from "./types";
export { cosineDistance, clamp } from "./utils/math";
export { normalizeImage } from "./utils/image";
export { computeIdentityDistance } from "./clients/baoClient";
export { analyzeBeauty } from "./clients/beautyClient";
export { analyzeDignity } from "./clients/dignityClient";
