import { NormalizedMeasurements } from './AnthropometricService';

export interface AvatarParams {
  structure: {
    spineLength: number;
    legLength: number;
    armLength: number;
    shoulderWidth: number;
  };
  scale: {
    chestScale: number;
    waistScale: number;
    hipsScale: number;
    thighScale: number;
    globalScale: number;
  };
  pcaShapeCoefficients: number[]; // Added from Python script logic
  pose: {
    type: 'T-POSE' | 'A-POSE';
    armRotation: number; // degrees
  };
}

export class AvatarParameterService {
  
  /**
   * Transforms normalized anthropometric data (mm) into 3D engine parameters.
   * These parameters are engine-agnostic but designed for a standard rigged humanoid.
   */
  generateParameters(measurements: NormalizedMeasurements): AvatarParams {
    // Base reference model dimensions (e.g., standard 170cm model)
    const BASE_HEIGHT = 1700; 
    const BASE_CHEST = 950;
    const BASE_WAIST = 800;
    const BASE_HIPS = 950;

    // 1. Global Scale Factor
    const globalScale = measurements.height / BASE_HEIGHT;

    // 2. Structural Parameters (Bone Lengths)
    // These drive the skeleton rig
    const structure = {
      spineLength: measurements.torsoLength / 1000, // Convert to meters for engine
      legLength: measurements.inseam / 1000,
      armLength: measurements.armLength / 1000,
      shoulderWidth: measurements.shoulderWidth / 1000,
    };

    // 3. Scale/Morph Parameters (Volume)
    // These drive blendshapes or bone scaling for volume
    // We normalize against the global scale to isolate "width" from "height"
    const chestScale = (measurements.chest / BASE_CHEST) / globalScale;
    const waistScale = (measurements.waist / BASE_WAIST) / globalScale;
    const hipsScale = (measurements.hips / BASE_HIPS) / globalScale;
    
    // Heuristic for thigh scale based on hips
    const thighScale = hipsScale * 0.9; 

    const scale = {
      chestScale,
      waistScale,
      hipsScale,
      thighScale,
      globalScale,
    };

    // 4. PCA Shape Coefficients (Simulated from Python script)
    // These would drive blendshapes in a real engine
    const pcaShapeCoefficients = [
      (measurements.chest / 10000.0) * 0.85,  // Coeff 1: Torso thickness
      (measurements.hips / 10000.0) * -0.5,   // Coeff 2: Lower body shape
      (measurements.waist / 10000.0) * 0.2,   // Coeff 3: Waist definition
      0.05 // Random noise placeholder
    ];

    // 5. Pose Configuration
    // Default to A-Pose for better cloth simulation stability
    const pose: AvatarParams['pose'] = {
      type: 'A-POSE',
      armRotation: 45, 
    };

    return { structure, scale, pcaShapeCoefficients, pose };
  }
}
