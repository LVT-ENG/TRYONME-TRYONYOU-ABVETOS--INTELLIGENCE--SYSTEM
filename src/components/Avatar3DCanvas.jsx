import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useHelper } from '@react-three/drei'
import * as THREE from 'three'

// Stylized avatar mannequin
function AvatarModel({ customizations = {} }) {
  const groupRef = useRef()
  const { skin = '#f5d0c5', outfit = null } = customizations

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

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

// Loading fallback
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#d4af37" wireframe />
    </mesh>
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

export default function Avatar3DCanvas({ 
  customizations = {}, 
  className = '',
  showControls = true,
}) {
  return (
    <div className={`avatar-canvas-container ${className}`}>
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
          <AvatarModel customizations={customizations} />
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

