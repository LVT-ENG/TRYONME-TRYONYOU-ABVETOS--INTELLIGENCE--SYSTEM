export type FitStatus = 'fits' | 'tight' | 'loose' | 'unknown';
export type GarmentCategory = 'top' | 'bottom' | 'dress' | 'outerwear' | 'shoes' | 'accessory';

export interface Garment {
  id: string;
  userId: string;
  name: string;
  category: GarmentCategory;
  size: string;
  elasticity: 'low' | 'medium' | 'high';
  fitStatus: FitStatus;
  usageCount: number;
  lastUsed: Date | null;
  emotionalScore: number; // 0 to 100
  purchaseDate: Date;
  imageUrl?: string;
  tags: string[];
}

export interface UserWardrobe {
  userId: string;
  garments: Garment[];
  totalItems: number;
  lastUpdated: Date;
}

export interface WardrobeSummary {
  totalGarments: number;
  mostWorn: Garment | null;
  leastWorn: Garment | null;
  fitIssuesCount: number;
  emotionalWellbeingScore: number; // Average emotional score
  underusedCount: number; // Garments not worn in 30+ days
}

// Event Definitions
export type WardrobeEventType = 'GARMENT_USED' | 'GARMENT_UNUSED' | 'FIT_ISSUE_DETECTED' | 'WARDROBE_UPDATED';

export interface WardrobeEvent {
  type: WardrobeEventType;
  timestamp: Date;
  payload: any;
}
