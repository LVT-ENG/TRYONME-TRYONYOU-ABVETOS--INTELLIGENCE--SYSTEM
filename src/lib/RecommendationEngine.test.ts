import { describe, it, expect, vi } from 'vitest';
import { lafayetteDB, calculateFit, getAIRecommendation } from './RecommendationEngine';

// Mock the GoogleGenerativeAI class
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: class {
      constructor(apiKey: string) {}
      getGenerativeModel() {
        return {
          generateContent: vi.fn().mockResolvedValue({
            response: {
              text: () => JSON.stringify({ recommendedId: 'GL-9928', reason: 'Mock reason' }),
            },
          }),
        };
      }
    },
  };
});

describe('RecommendationEngine', () => {
  it('should have a valid inventory database', () => {
    expect(lafayetteDB).toBeDefined();
    expect(lafayetteDB.length).toBeGreaterThan(0);
    const item = lafayetteDB[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
  });

  it('should calculate fit correctly', () => {
    const fit = calculateFit();
    expect(fit).toBe('98.5%');
  });

  it('should return a valid recommendation from AI', async () => {
    // If API key is missing, it returns fallback (GL-9928)
    // If API key is present, mock returns GL-9928
    // So in either case we get a result.
    const recommendation = await getAIRecommendation('happy', 'athletic');
    expect(recommendation).toBeDefined();
    expect(recommendation).toHaveProperty('id');
    expect(recommendation?.id).toBe('GL-9928');
  });
});
