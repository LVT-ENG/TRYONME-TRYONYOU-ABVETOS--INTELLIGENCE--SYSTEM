/**
 * Calculates the cosine distance between two vectors.
 * 
 * Cosine distance = 1 - cosine similarity
 * Cosine similarity = (A · B) / (||A|| * ||B||)
 * 
 * The cosine distance ranges from 0 (identical vectors) to 2 (opposite vectors).
 * In practice, for normalized vectors, it ranges from 0 to 1.
 * 
 * @param vectorA - First vector (array of numbers)
 * @param vectorB - Second vector (array of numbers)
 * @returns The cosine distance between the two vectors
 * @throws {Error} If vectors have different lengths or are empty
 */
export function cosineDistance(vectorA: number[], vectorB: number[]): number {
  if (!vectorA || !vectorB) {
    throw new Error('Vectors cannot be null or undefined');
  }

  if (vectorA.length === 0 || vectorB.length === 0) {
    throw new Error('Vectors cannot be empty');
  }

  if (vectorA.length !== vectorB.length) {
    throw new Error(
      `Vectors must have the same length. Got ${vectorA.length} and ${vectorB.length}`
    );
  }

  // Calculate dot product and magnitudes in a single loop for efficiency
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  // Handle zero vectors
  if (magnitudeA === 0 || magnitudeB === 0) {
    throw new Error('Vector magnitude cannot be zero');
  }

  // Calculate cosine similarity
  const cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);

  // Return cosine distance (1 - similarity)
  // Clamp to [0, 2] range to handle numerical errors
  return Math.max(0, Math.min(2, 1 - cosineSimilarity));
}
