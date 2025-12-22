/**
 * Calculate the cosine distance between two numeric vectors.
 * Cosine distance is defined as 1 - cosine similarity.
 * 
 * Cosine similarity = (A · B) / (||A|| × ||B||)
 * where:
 * - A · B is the dot product of vectors A and B
 * - ||A|| is the magnitude (Euclidean norm) of vector A
 * - ||B|| is the magnitude (Euclidean norm) of vector B
 * 
 * @param {number[]} vectorA - First numeric vector (array of numbers)
 * @param {number[]} vectorB - Second numeric vector (array of numbers)
 * @returns {number} The cosine distance between the two vectors (range: 0 to 2)
 * @throws {Error} If vectors are empty, have different lengths, or contain non-numeric values
 * 
 * @example
 * cosineDistance([1, 2, 3], [4, 5, 6]) // returns a number between 0 and 2
 */
export function cosineDistance(vectorA, vectorB) {
  // Input validation
  if (!Array.isArray(vectorA) || !Array.isArray(vectorB)) {
    throw new Error('Both inputs must be arrays');
  }

  if (vectorA.length === 0 || vectorB.length === 0) {
    throw new Error('Vectors cannot be empty');
  }

  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  // Validate that all elements are numbers
  for (let i = 0; i < vectorA.length; i++) {
    if (typeof vectorA[i] !== 'number' || isNaN(vectorA[i])) {
      throw new Error(`Vector A contains non-numeric value at index ${i}`);
    }
    if (typeof vectorB[i] !== 'number' || isNaN(vectorB[i])) {
      throw new Error(`Vector B contains non-numeric value at index ${i}`);
    }
  }

  // Calculate dot product
  let dotProduct = 0;
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
  }

  // Calculate magnitudes
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < vectorA.length; i++) {
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  // Handle zero vectors
  if (magnitudeA === 0 || magnitudeB === 0) {
    throw new Error('Cannot calculate cosine distance for zero vectors');
  }

  // Calculate cosine similarity
  const cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);

  // Calculate and return cosine distance
  return 1 - cosineSimilarity;
}
