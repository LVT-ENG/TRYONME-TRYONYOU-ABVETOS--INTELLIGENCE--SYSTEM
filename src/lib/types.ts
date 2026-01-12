
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface BiometricData {
  height: number;
  shoulders: number;
  chest: number;
  waist: number;
  hips: number;
  armLength: number;
  legLength: number;
  torsoLength: number;
  weight?: number;
}

export interface GarmentMeasurements {
  chest: number;
  waist: number;
  hips: number;
  length: number;
  shoulders: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  occasions: ('work' | 'event' | 'casual' | 'ceremony')[];
  properties: {
    elasticity: number; // Percentage 0-100
    drape: number;      // Rigidity score 1-10
    cut: 'slim' | 'regular' | 'relaxed';
  };
  sizeTable: Record<string, GarmentMeasurements>;
}

export interface RecommendationResult {
  product: Product;
  size: string;
  matchScore: number;
  logicExplanation: string;
}

export type PilotStep = 'LANDING' | 'BODY_SCAN' | 'INPUTS' | 'PROCESSING' | 'RESULT';

/**
 * Added for Creator Studio
 */
export interface Asset {
  id: string;
  type: 'logo' | 'product';
  name: string;
  data: string; // base64 or url
  mimeType: string;
}

export interface PlacedLayer {
  uid: string;
  assetId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface GeneratedMockup {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: number;
  layers: PlacedLayer[];
  productId: string;
  variant?: {
    color: string;
    size: string;
  };
}

export interface LoadingState {
  isGenerating: boolean;
  message: string;
}

export interface SavedLayout {
  id: string;
  name: string;
  productId: string;
  colorName: string;
  size: string;
  layers: PlacedLayer[];
  createdAt: number;
}

// Global declaration for the model-viewer web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
