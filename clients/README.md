# Clients Module

This directory contains client modules for interfacing with external services and APIs.

## beautyClient.ts

The Beauty Client provides beauty analysis functionality for avatar images, used in the Pau Check workflow.

### Usage

```typescript
import { analyzeBeauty, BeautyAnalysisError } from './clients/beautyClient';

// Analyze an avatar image
const imageBuffer = /* your image buffer */;

try {
  const result = await analyzeBeauty(imageBuffer);
  console.log(`Score: ${result.score}, Passed: ${result.passed}`);
} catch (error) {
  if (error instanceof BeautyAnalysisError) {
    console.error('Analysis failed:', error.message);
  }
}
```

### API Reference

#### `analyzeBeauty(avatarImage: Buffer): Promise<BeautyAnalysisResult>`

Analyzes an avatar image and returns beauty metrics.

**Parameters:**
- `avatarImage`: Buffer containing the image data

**Returns:**
- `Promise<BeautyAnalysisResult>`: Object with `passed` (boolean) and `score` (number 0-100)

**Throws:**
- `BeautyAnalysisError`: If validation fails or analysis encounters an error

#### `meetsBeautyThreshold(score: number): boolean`

Utility function to check if a score passes the configured threshold.

#### `getBeautyConfig()`

Returns the current beauty analysis configuration.

### Configuration

Current thresholds:
- **Pass Threshold**: 60/100
- **Score Range**: 0-100

### Implementation Notes

This is currently a simulated implementation. In production, this would integrate with an actual beauty analysis API service. The simulation uses deterministic scoring based on image buffer characteristics to provide consistent results for testing.
