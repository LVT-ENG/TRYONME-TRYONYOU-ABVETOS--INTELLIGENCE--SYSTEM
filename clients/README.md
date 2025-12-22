# Bao Identity Client

This module provides identity verification functionality for the Pau check system using biometric embeddings and cosine distance calculations.

## Overview

The Bao Identity Client (`baoClient.ts`) is the first step in the `runPauCheck` process. It compares an avatar image against stored biometric identity data to determine if they represent the same person.

## Core Function

### `computeIdentityDistance(avatarImage: Buffer, baoIdentityData: BaoIdentityData): Promise<number>`

Computes the identity distance between an avatar image and stored Bao Identity data.

**Parameters:**
- `avatarImage`: Buffer containing the avatar image data (JPEG, PNG, etc.)
- `baoIdentityData`: The stored identity data containing the reference embedding

**Returns:**
- Promise resolving to the cosine distance between the avatar and identity (0-2)
- Lower values indicate higher similarity
  - < 0.3: High confidence match
  - 0.3 - 0.6: Moderate confidence
  - > 0.6: Low confidence / likely not a match

**Throws:**
- Error if avatar image is invalid or empty
- Error if baoIdentityData is invalid or missing embedding
- Error if embedding extraction fails
- Error if vectors have incompatible dimensions

## Usage Example

```typescript
import { computeIdentityDistance } from './clients/baoClient';
import { BaoIdentityData } from './types/baoIdentity';
import * as fs from 'fs/promises';

async function verifyIdentity() {
  // Load avatar image
  const avatarBuffer = await fs.readFile('avatar.jpg');
  
  // Stored identity data (typically from database)
  const identityData: BaoIdentityData = {
    embedding: [0.1, 0.2, 0.3, /* ... */],
    metadata: {
      type: 'face',
      quality: 0.95,
      timestamp: '2025-01-01T00:00:00Z'
    }
  };
  
  try {
    const distance = await computeIdentityDistance(avatarBuffer, identityData);
    
    if (distance < 0.3) {
      console.log('Identity verified with high confidence');
      return { verified: true, confidence: 'high', distance };
    } else if (distance < 0.6) {
      console.log('Identity verification moderate confidence');
      return { verified: true, confidence: 'moderate', distance };
    } else {
      console.log('Identity verification failed');
      return { verified: false, confidence: 'low', distance };
    }
  } catch (error) {
    console.error('Identity check error:', error);
    throw error;
  }
}
```

## Data Structures

### BaoIdentityData

```typescript
interface BaoIdentityData {
  embedding: number[];  // High-dimensional feature vector
  metadata?: {
    timestamp?: string;  // When captured
    quality?: number;    // Quality score (0-1)
    type?: string;       // 'face', 'iris', 'voice', etc.
  };
}
```

## Implementation Notes

### Current Status

The core infrastructure is complete:
- ✅ Type definitions for `BaoIdentityData`
- ✅ Cosine distance utility function
- ✅ Input validation and error handling
- ✅ Comprehensive JSDoc documentation
- ⚠️ Image embedding extraction (placeholder - requires ML model integration)

### Image Embedding Extraction

The `extractEmbeddingFromImage` function is currently a placeholder. In production, this should:

1. Decode the image buffer
2. Preprocess (resize, normalize)
3. Run through a face recognition model (e.g., FaceNet, ArcFace, or similar)
4. Extract and return the embedding vector

**Recommended Integration Options:**

- **TensorFlow.js** with a pre-trained face recognition model
- **ONNX Runtime** for running pre-trained models in Node.js
- **External API** service (e.g., AWS Rekognition, Azure Face API)
- **Custom ML service** endpoint

Example integration with TensorFlow.js:

```typescript
import * as tf from '@tensorflow/tfjs-node';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

async function extractEmbeddingFromImage(avatarImage: Buffer): Promise<number[]> {
  // Load and decode image
  const tensor = tf.node.decodeImage(avatarImage);
  
  // Load face detection model
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );
  
  // Extract embeddings
  const predictions = await model.estimateFaces({
    input: tensor
  });
  
  // Process and return embedding
  // ... implementation details
  
  return embedding;
}
```

## Dependencies

- **cosineDistance**: From `../utils` - Calculates similarity between embedding vectors
- **BaoIdentityData**: From `../types/baoIdentity` - Type definition for identity data

## Error Handling

The function includes comprehensive error handling:
- Input validation (null checks, Buffer validation)
- Embedding validation (array checks, length checks)
- Distance calculation validation (NaN, infinity checks)
- Contextual error messages for debugging

## Integration with runPauCheck

This function is designed to be the first step in the Pau identity verification workflow:

```typescript
async function runPauCheck(avatarImage: Buffer, userIdentity: BaoIdentityData) {
  // Step 1: Compute identity distance
  const distance = await computeIdentityDistance(avatarImage, userIdentity);
  
  // Step 2: Determine if verification passes
  const verificationPassed = distance < IDENTITY_THRESHOLD; // e.g., 0.4
  
  // Step 3: Additional checks...
  // ...
  
  return { verified: verificationPassed, distance };
}
```

## Testing

See the `tests/` directory for unit tests covering:
- Input validation
- Error handling
- Edge cases
- Cosine distance calculations

Run tests:
```bash
npx ts-node --project tsconfig.test.json tests/baoClient.test.ts
npx ts-node --project tsconfig.test.json tests/cosineDistance.test.ts
```

## Future Enhancements

- [ ] Implement actual image embedding extraction with ML model
- [ ] Add support for multiple biometric types (iris, voice)
- [ ] Optimize embedding vector size for performance
- [ ] Add caching for frequently checked identities
- [ ] Implement adaptive thresholds based on use case
- [ ] Add telemetry and monitoring
