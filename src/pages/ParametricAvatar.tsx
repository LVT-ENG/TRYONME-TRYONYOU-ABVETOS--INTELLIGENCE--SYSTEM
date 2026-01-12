import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ParametricAvatarProps {
  measurements: {
    height: number; // cm
    shoulders: number; // cm
    chest: number; // cm
    waist: number; // cm
    hips: number; // cm
    inseam: number; // cm
  };
  fitMap?: {
    chest: number; // 0-2 (1 = perfect, <1 tight, >1 loose)
    waist: number;
    hips: number;
  };
  showHeatmap?: boolean;
}

const ParametricAvatar: React.FC<ParametricAvatarProps> = ({ 
  measurements, 
  fitMap, 
  showHeatmap = false 
}) => {
  // Convert real measurements (cm) to 3D world units (approx 1 unit = 1 meter)
  const scale = measurements.height / 170; // Normalize to standard height
  
  // Body proportions (simplified)
  const torsoHeight = measurements.height * 0.3 * 0.01;
  const legHeight = measurements.inseam * 0.01;
  const headSize = 0.25 * scale;
  
  // Widths (circumference / PI approx diameter)
  const shoulderWidth = (measurements.shoulders / Math.PI) * 0.01;
  const chestWidth = (measurements.chest / Math.PI) * 0.01;
  const waistWidth = (measurements.waist / Math.PI) * 0.01;
  const hipsWidth = (measurements.hips / Math.PI) * 0.01;

  // Heatmap Color Logic
  const getHeatmapColor = (value: number | undefined) => {
    if (!showHeatmap || value === undefined) return "#e0e0e0"; // Default mannequin color
    
    // < 0.95 = Tight (Red)
    // 0.95 - 1.05 = Perfect (Green)
    // > 1.05 = Loose (Blue)
    
    if (value < 0.95) {
      // Interpolate Red to Orange
      return new THREE.Color(1, value, value); 
    } else if (value > 1.05) {
      // Interpolate Cyan to Blue
      return new THREE.Color(2 - value, 2 - value, 1);
    } else {
      return new THREE.Color(0.2, 0.8, 0.2); // Green
    }
  };

  return (
    <group position={[0, -1, 0]}>
      {/* Head */}
      <Sphere args={[headSize, 32, 32]} position={[0, legHeight + torsoHeight + headSize, 0]}>
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} />
      </Sphere>

      {/* Torso (Chest to Waist) */}
      <Cylinder 
        args={[chestWidth, waistWidth, torsoHeight / 2, 32]} 
        position={[0, legHeight + torsoHeight * 0.75, 0]}
      >
        <meshStandardMaterial 
          color={getHeatmapColor(fitMap?.chest)} 
          transparent 
          opacity={0.9} 
        />
        {showHeatmap && fitMap?.chest && (
          <Html position={[0.3, 0, 0]}>
            <div style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 5px', borderRadius: '4px', fontSize: '10px' }}>
              Chest: {fitMap.chest < 0.95 ? 'Tight' : fitMap.chest > 1.05 ? 'Loose' : 'Perfect'}
            </div>
          </Html>
        )}
      </Cylinder>

      {/* Lower Torso (Waist to Hips) */}
      <Cylinder 
        args={[waistWidth, hipsWidth, torsoHeight / 2, 32]} 
        position={[0, legHeight + torsoHeight * 0.25, 0]}
      >
        <meshStandardMaterial 
          color={getHeatmapColor(fitMap?.waist)} 
          transparent 
          opacity={0.9} 
        />
         {showHeatmap && fitMap?.waist && (
          <Html position={[0.3, 0, 0]}>
            <div style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 5px', borderRadius: '4px', fontSize: '10px' }}>
              Waist: {fitMap.waist < 0.95 ? 'Tight' : fitMap.waist > 1.05 ? 'Loose' : 'Perfect'}
            </div>
          </Html>
        )}
      </Cylinder>

      {/* Hips/Pelvis */}
      <Cylinder 
        args={[hipsWidth, hipsWidth * 0.9, 0.15, 32]} 
        position={[0, legHeight, 0]}
      >
        <meshStandardMaterial 
          color={getHeatmapColor(fitMap?.hips)} 
          transparent 
          opacity={0.9} 
        />
         {showHeatmap && fitMap?.hips && (
          <Html position={[0.3, 0, 0]}>
            <div style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 5px', borderRadius: '4px', fontSize: '10px' }}>
              Hips: {fitMap.hips < 0.95 ? 'Tight' : fitMap.hips > 1.05 ? 'Loose' : 'Perfect'}
            </div>
          </Html>
        )}
      </Cylinder>

      {/* Legs (Simplified) */}
      <Cylinder args={[hipsWidth * 0.4, 0.05, legHeight, 16]} position={[-hipsWidth/2, legHeight/2, 0]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Cylinder>
      <Cylinder args={[hipsWidth * 0.4, 0.05, legHeight, 16]} position={[hipsWidth/2, legHeight/2, 0]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Cylinder>

      {/* Shoulders/Arms (Simplified) */}
      <Cylinder 
        args={[0.04, 0.03, 0.6, 16]} 
        position={[-shoulderWidth - 0.1, legHeight + torsoHeight * 0.8, 0]} 
        rotation={[0, 0, 0.2]}
      >
        <meshStandardMaterial color="#e0e0e0" />
      </Cylinder>
      <Cylinder 
        args={[0.04, 0.03, 0.6, 16]} 
        position={[shoulderWidth + 0.1, legHeight + torsoHeight * 0.8, 0]} 
        rotation={[0, 0, -0.2]}
      >
        <meshStandardMaterial color="#e0e0e0" />
      </Cylinder>

    </group>
  );
};

export default ParametricAvatar;
