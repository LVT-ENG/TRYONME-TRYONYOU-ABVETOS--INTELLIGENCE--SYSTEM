import { describe, it, expect } from 'vitest';
import { cosineDistance } from './cosineDistance.js';

describe('cosineDistance', () => {
  it('should calculate cosine distance for identical vectors', () => {
    const vector1 = [1, 2, 3];
    const vector2 = [1, 2, 3];
    const result = cosineDistance(vector1, vector2);
    // Cosine distance for identical vectors should be 0
    expect(result).toBeCloseTo(0, 10);
  });

  it('should calculate cosine distance for orthogonal vectors', () => {
    const vector1 = [1, 0, 0];
    const vector2 = [0, 1, 0];
    const result = cosineDistance(vector1, vector2);
    // Cosine distance for orthogonal vectors should be 1
    expect(result).toBeCloseTo(1, 10);
  });

  it('should calculate cosine distance for opposite vectors', () => {
    const vector1 = [1, 2, 3];
    const vector2 = [-1, -2, -3];
    const result = cosineDistance(vector1, vector2);
    // Cosine distance for opposite vectors should be 2
    expect(result).toBeCloseTo(2, 10);
  });

  it('should calculate cosine distance for arbitrary vectors', () => {
    const vector1 = [1, 2, 3];
    const vector2 = [4, 5, 6];
    const result = cosineDistance(vector1, vector2);
    // Result should be between 0 and 2
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
    // Expected value: 1 - (32 / (sqrt(14) * sqrt(77))) ≈ 0.0253
    expect(result).toBeCloseTo(0.0253, 3);
  });

  it('should calculate cosine distance for large vectors', () => {
    const vector1 = Array.from({ length: 100 }, (_, i) => i + 1);
    const vector2 = Array.from({ length: 100 }, (_, i) => i + 2);
    const result = cosineDistance(vector1, vector2);
    // Result should be a valid number between 0 and 2
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
    expect(typeof result).toBe('number');
    expect(isNaN(result)).toBe(false);
  });

  it('should calculate cosine distance with decimal values', () => {
    const vector1 = [1.5, 2.5, 3.5];
    const vector2 = [4.5, 5.5, 6.5];
    const result = cosineDistance(vector1, vector2);
    // Result should be a valid number between 0 and 2
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
    expect(typeof result).toBe('number');
  });

  it('should calculate cosine distance with negative values', () => {
    const vector1 = [-1, -2, -3];
    const vector2 = [4, 5, 6];
    const result = cosineDistance(vector1, vector2);
    // Result should be a valid number between 0 and 2
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
  });

  it('should throw error for empty vectors', () => {
    expect(() => cosineDistance([], [])).toThrow('Vectors cannot be empty');
  });

  it('should throw error for vectors with different lengths', () => {
    const vector1 = [1, 2, 3];
    const vector2 = [1, 2];
    expect(() => cosineDistance(vector1, vector2)).toThrow(
      'Vectors must have the same length'
    );
  });

  it('should throw error for non-array inputs', () => {
    expect(() => cosineDistance('not an array', [1, 2, 3])).toThrow(
      'Both inputs must be arrays'
    );
    expect(() => cosineDistance([1, 2, 3], 'not an array')).toThrow(
      'Both inputs must be arrays'
    );
  });

  it('should throw error for vectors with non-numeric values', () => {
    const vector1 = [1, 'two', 3];
    const vector2 = [1, 2, 3];
    expect(() => cosineDistance(vector1, vector2)).toThrow(
      'Vector A contains non-numeric value at index 1'
    );
  });

  it('should throw error for vectors with NaN values', () => {
    const vector1 = [1, 2, NaN];
    const vector2 = [1, 2, 3];
    expect(() => cosineDistance(vector1, vector2)).toThrow(
      'Vector A contains non-numeric value at index 2'
    );
  });

  it('should throw error for zero vectors', () => {
    const vector1 = [0, 0, 0];
    const vector2 = [1, 2, 3];
    expect(() => cosineDistance(vector1, vector2)).toThrow(
      'Cannot calculate cosine distance for zero vectors'
    );
  });

  it('should handle single element vectors', () => {
    const vector1 = [5];
    const vector2 = [10];
    const result = cosineDistance(vector1, vector2);
    // Both vectors point in the same direction
    expect(result).toBeCloseTo(0, 10);
  });

  it('should handle two-dimensional vectors', () => {
    const vector1 = [3, 4];
    const vector2 = [4, 3];
    const result = cosineDistance(vector1, vector2);
    // Result should be a valid number between 0 and 2
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
  });
});
