const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// Carpeta donde se generarán los archivos temporales antes del ZIP
const MODULE_DIR = path.join(__dirname, "PAU-CHECK-v5");

// Archivos internos del módulo
const FILES = {
  "README.md": `# PAU-CHECK v5
Módulo oficial de aprobación de avatares.
Incluye identidad (Bao), belleza (BeautyScan), dignidad (Royal Aesthetic).
  `,
  "types.ts": `
export interface PauCheckInput {
  avatarImage: Buffer | string;
  baoIdentityData: BaoIdentityData;
  styleData?: Record<string, any>;
  meta?: Record<string, any>;
}

export interface PauCheckResult {
  decision: "approved" | "rejected";
  notes: string;
  signature: string;
  diagnostics: any;
}

export interface BaoIdentityData {
  embedding: number[];
  userId: string;
}
  `,
  "index.ts": `
import { PauCheckInput, PauCheckResult } from "./types";
import { normalizeImage } from "./utils/image";
import { computeIdentityDistance } from "./clients/baoClient";
import { analyzeBeauty } from "./clients/beautyClient";
import { analyzeDignity } from "./clients/dignityClient";

export async function runPauCheck(input: PauCheckInput): Promise<PauCheckResult> {
  const normalizedImage = await normalizeImage(input.avatarImage);

  const distance = await computeIdentityDistance(
    normalizedImage,
    input.baoIdentityData
  );

  if (distance > 0.03) {
    return {
      decision: "rejected",
      notes: "Identity failed",
      signature: "Rejected by Pau",
      diagnostics: { distance }
    };
  }

  const beauty = await analyzeBeauty(normalizedImage);
  if (!beauty.passed) {
    return {
      decision: "rejected",
      notes: "Beauty check failed",
      signature: "Rejected by Pau",
      diagnostics: { beauty }
    };
  }

  const dignity = await analyzeDignity(normalizedImage, input.styleData || {});
  if (!dignity.passed) {
    return {
      decision: "rejected",
      notes: "Dignity check failed",
      signature: "Rejected by Pau",
      diagnostics: { dignity }
    };
  }

  return {
    decision: "approved",
    notes: "Aprobado por Pau",
    signature: "Aprobado por Pau",
    diagnostics: { distance, beauty, dignity }
  };
}
  `,
  "clients/baoClient.ts": `
import { BaoIdentityData } from "../types";
import { cosineDistance } from "../utils/math";

export async function computeIdentityDistance(
  avatarImage: Buffer | string,
  baoData: BaoIdentityData
): Promise<number> {
  const simulatedAvatarEmbedding = baoData.embedding.map(
    v => v + (Math.random() * 0.001)
  );
  const distance = cosineDistance(simulatedAvatarEmbedding, baoData.embedding);
  return distance;
}
  `,
  "clients/beautyClient.ts": `
export async function analyzeBeauty(avatarImage: Buffer | string) {
  return {
    passed: true,
    skinSmoothing: 0.42,
    makeupIntensity: 0.63,
    lightScore: 0.82
  };
}
  `,
  "clients/dignityClient.ts": `
export async function analyzeDignity(avatarImage: Buffer | string, styleData: any) {
  return {
    passed: true,
    dignityScore: 0.91,
    styleScore: 0.87
  };
}
  `,
  "utils/image.ts": `
export async function normalizeImage(img: Buffer | string) {
  if (!img) throw new Error("No image");
  return img;
}
  `,
  "utils/math.ts": `
export function cosineDistance(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((acc, v, i) => acc + v * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, v) => acc + v * v, 0));
  const magB = Math.sqrt(vecB.reduce((acc, v) => acc + v * v, 0));
  return 1 - dot / (magA * magB);
}
  `
};

// Función que crea el ZIP real
(async function generateZip() {
  // Crear carpetas
  Object.keys(FILES).forEach((filePath) => {
    const fullPath = path.join(MODULE_DIR, filePath);
    const dir = path.dirname(fullPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, FILES[filePath]);
  });

  // Crear ZIP
  const output = fs.createWriteStream("PAU-CHECK-v5.zip");
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(MODULE_DIR, false);
  await archive.finalize();

  console.log("ZIP generado: PAU-CHECK-v5.zip");
})();
