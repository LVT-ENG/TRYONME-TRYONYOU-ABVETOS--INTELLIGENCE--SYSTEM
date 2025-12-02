/**
 * PAU-CHECK Math Utilities
 * Mathematical functions for identity comparison
 */

/**
 * Calculates the cosine distance between two vectors
 * @param vecA First vector
 * @param vecB Second vector
 * @returns Cosine distance (0 = identical, 1 = orthogonal, 2 = opposite)
 */
export function cosineDistance(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same length");
  }

  const dot = vecA.reduce((acc, v, i) => acc + v * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, v) => acc + v * v, 0));
  const magB = Math.sqrt(vecB.reduce((acc, v) => acc + v * v, 0));

  if (magA === 0 || magB === 0) {
    return 1;
  }

  return 1 - dot / (magA * magB);
}

/**
 * Clamps a value between min and max
 * @param value Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
