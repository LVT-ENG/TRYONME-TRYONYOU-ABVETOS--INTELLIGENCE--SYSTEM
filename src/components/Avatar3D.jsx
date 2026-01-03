import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// 3D Model Loader Component
function AvatarModel({ modelPath, customizations = {} }) {
  const groupRef = useRef()
  const { skin = '#f5d0c5', outfit = null } = customizations

  // Try to load GLTF/GLB model, fallback to procedural if not found
  let model = null
  try {
    if (modelPath) {
      model = useGLTF(modelPath)
    }
  } catch (error) {
    console.log('Model not found, using procedural avatar')
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // If model loaded, use it
  if (model) {
    return (
      <group ref={groupRef} position={[0, -1.5, 0]} scale={[1, 1, 1]}>
        <primitive object={model.scene} />
      </group>
    )
  }

  // Fallback: Procedural avatar (stylized mannequin)
  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Head */}
      <mesh position={[0, 2.4, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.4} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
        <meshStandardMaterial color={skin} roughness={0.4} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.4, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
        <meshStandardMaterial 
          color={outfit?.top || '#1a1a1a'} 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.5, 1.6, 0]} rotation={[0, 0, 0.2]}>
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
          <meshStandardMaterial color={outfit?.top || '#1a1a1a'} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color={skin} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.5, 1.6, 0]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
          <meshStandardMaterial color={outfit?.top || '#1a1a1a'} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color={skin} roughness={0.4} />
        </mesh>
      </group>

      {/* Lower Body / Pants */}
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.28, 0.5, 16, 32]} />
        <meshStandardMaterial 
          color={outfit?.bottom || '#2d2d2d'} 
          roughness={0.7}
        />
      </mesh>

      {/* Left Leg */}
      <group position={[-0.18, 0, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
          <meshStandardMaterial color={outfit?.bottom || '#2d2d2d'} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
          <meshStandardMaterial color={outfit?.bottom || '#2d2d2d'} roughness={0.7} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0.05, -1.15, 0.08]}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color={outfit?.shoes || '#0a0a0a'} roughness={0.3} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.18, 0, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
          <meshStandardMaterial color={outfit?.bottom || '#2d2d2d'} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
          <meshStandardMaterial color={outfit?.bottom || '#2d2d2d'} roughness={0.7} />
        </mesh>
        {/* Shoe */}
        <mesh position={[-0.05, -1.15, 0.08]}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color={outfit?.shoes || '#0a0a0a'} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

// Platform/stage for avatar
function Stage() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.7, 0]} receiveShadow>
      <circleGeometry args={[2, 64]} />
      <meshStandardMaterial 
        color="#f5f5f5" 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#00A8E8" wireframe />
    </mesh>
  )
}

export default function Avatar3D({ 
  customizations = {},
  modelPath = '/models/avatar.glb', // Default path - will use procedural if not found
  className = '',
  showControls = true,
  height = '100%',
}) {
  // Optimization: Removed unused isLoading state and redundant HEAD request

  return (
    <div className={`avatar-canvas-container ${className}`} style={{ height }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#fafafa']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#fff8f0" />

        <Suspense fallback={<Loader />}>
          <AvatarModel 
            modelPath={modelPath} 
            customizations={customizations} 
          />
          <Stage />
          <ContactShadows
            position={[0, -2.69, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={3}
          />
          <Environment preset="city" />
        </Suspense>

        {showControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  )
}

// Note: Preload models in your main App or where needed
// useGLTF.preload('/models/avatar.glb')

