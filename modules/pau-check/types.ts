/**
 * PAU-CHECK Types v4
 * Type definitions for the PAU-CHECK avatar approval module
 */

/**
 * Identity data from Bao system
 */
export interface BaoIdentityData {
  /** Facial embedding vector */
  embedding: number[];
  /** User identifier */
  userId: string;
  /** Optional timestamp of identity capture */
  timestamp?: number;
}

/**
 * Input for PAU-CHECK validation
 */
export interface PauCheckInput {
  /** Avatar image as Buffer or base64 string */
  avatarImage: Buffer | string;
  /** Identity data from Bao */
  baoIdentityData: BaoIdentityData;
  /** Style data from Tendency */
  styleData?: Record<string, unknown>;
  /** Optional metadata */
  meta?: Record<string, unknown>;
}

/**
 * Result of identity validation
 */
export interface IdentityDiagnostics {
  /** Whether identity check passed */
  passed: boolean;
  /** Distance between embeddings */
  distance: number;
}

/**
 * Result of beauty analysis
 */
export interface BeautyDiagnostics {
  /** Whether beauty check passed */
  passed: boolean;
  /** Skin smoothing level (0-1) */
  skinSmoothing: number;
  /** Makeup intensity level (0-1) */
  makeupIntensity: number;
  /** Natural light score (0-1) */
  lightScore: number;
  /** Optional reason for failure */
  reason?: string;
}

/**
 * Result of dignity analysis
 */
export interface DignityDiagnostics {
  /** Whether dignity check passed */
  passed: boolean;
  /** Dignity score (0-1) */
  dignityScore: number;
  /** Style adherence score (0-1) */
  styleScore: number;
}

/**
 * Full diagnostics from PAU-CHECK
 */
export interface PauCheckDiagnostics {
  /** Current step when diagnostics were captured */
  step: "identity" | "beauty" | "dignity" | "final";
  /** Identity check distance (if available) */
  distance?: number;
  /** Identity diagnostics */
  identityDiagnostics?: IdentityDiagnostics;
  /** Beauty diagnostics */
  beauty?: BeautyDiagnostics;
  /** Dignity diagnostics */
  dignity?: DignityDiagnostics;
}

/**
 * Final result from PAU-CHECK validation
 */
export interface PauCheckResult {
  /** Decision: approved or rejected */
  decision: "approved" | "rejected";
  /** Explanation notes */
  notes: string;
  /** Official signature */
  signature: string;
  /** Detailed diagnostics */
  diagnostics: PauCheckDiagnostics;
}

/**
 * Threshold configuration for PAU-CHECK
 */
export interface PauCheckThresholds {
  /** Maximum allowed identity distance (default: 0.03 = 3%) */
  identityMaxDistance: number;
  /** Maximum skin smoothing level (default: 0.7) */
  maxSkinSmoothingLevel: number;
  /** Maximum makeup intensity (default: 0.8) */
  maxMakeupIntensity: number;
  /** Minimum dignity score (default: 0.7) */
  minDignityScore: number;
  /** Minimum natural light score (default: 0.6) */
  minNaturalLightScore: number;
}

/**
 * Options for PAU-CHECK execution
 */
export interface PauCheckOptions {
  /** Custom thresholds */
  thresholds?: Partial<PauCheckThresholds>;
}
