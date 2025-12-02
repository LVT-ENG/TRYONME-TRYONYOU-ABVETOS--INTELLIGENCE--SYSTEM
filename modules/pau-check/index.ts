import { PauCheckInput, PauCheckResult } from "./types";
import { normalizeImage } from "./utils/image";
import { computeIdentityDistance } from "./clients/baoClient";
import { analyzeBeauty } from "./clients/beautyClient";
import { analyzeDignity } from "./clients/dignityClient";

export async function runPauCheck(
  input: PauCheckInput
): Promise<PauCheckResult> {
  const img = await normalizeImage(input.avatarImage);

  // 1. Identidad
  const distance = await computeIdentityDistance(img, input.baoIdentityData);
  if (distance > 0.03) {
    return {
      decision: "rejected",
      notes: "Identity integrity failed",
      signature: "Rejected by Pau",
      diagnostics: { distance }
    };
  }

  // 2. Belleza
  const beauty = await analyzeBeauty(img);
  if (!beauty.passed) {
    return {
      decision: "rejected",
      notes: "Unnatural beauty",
      signature: "Rejected by Pau",
      diagnostics: { beauty }
    };
  }

  // 3. Dignidad
  const dignity = await analyzeDignity(img, input.styleData || {});
  if (!dignity.passed) {
    return {
      decision: "rejected",
      notes: "Insufficient dignity/elegance",
      signature: "Rejected by Pau",
      diagnostics: { dignity }
    };
  }

  // 4. Aprobado
  return {
    decision: "approved",
    notes: "Avatar aprobado. Belleza natural, identidad preservada.",
    signature: "Aprobado por Pau",
    diagnostics: { distance, beauty, dignity }
  };
}
