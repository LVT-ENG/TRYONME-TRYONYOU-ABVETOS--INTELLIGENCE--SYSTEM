import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import * as THREE from 'three';

// --- Garment Texture Component ---
function GarmentTexture({ url, measurements }) {
  const texture = useTexture(url);
  const { shoulderWidth = 0.45, torsoLength = 0.7 } = measurements || {};

  return (
    <mesh position={[0, 0, 0.11]} castShadow>
      <planeGeometry args={[shoulderWidth * 1.5, torsoLength * 1.2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.95}
        roughness={0.3}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Avatar 3D Component
function Avatar3D({ measurements, currentGarment }) {
  const meshRef = useRef();
  
  // Crear geometría del avatar basada en medidas
  const avatarGeometry = useMemo(() => {
    const { shoulderWidth = 0.45, torsoLength = 0.7, hipWidth = 0.4 } = measurements || {};
    
    // Crear forma humanoide básica
    const shape = new THREE.Shape();
    
    // Torso (Simplified)
    const w = shoulderWidth / 2;
    const h = torsoLength;
    const hw = hipWidth / 2;

    shape.moveTo(-w, 0);
    shape.lineTo(-w, -h * 0.6);
    shape.lineTo(-hw, -h);
    shape.lineTo(hw, -h);
    shape.lineTo(w, -h * 0.6);
    shape.lineTo(w, 0);
    shape.lineTo(-w, 0);
    
    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [measurements]);

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Avatar base */}
      <mesh geometry={avatarGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#E8D4B8" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Prenda virtual superpuesta (Texture or Color) */}
      {currentGarment && currentGarment['Image Src'] ? (
        <Suspense fallback={
            <mesh position={[0, 0, 0.11]}>
                 <planeGeometry args={[0.5, 0.8]} />
                 <meshStandardMaterial color="#C5A46D" wireframe />
            </mesh>
        }>
           <GarmentTexture url={currentGarment['Image Src']} measurements={measurements} />
        </Suspense>
      ) : (
        currentGarment && (
        <mesh position={[0, 0, 0.11]} castShadow>
          <planeGeometry args={[0.5, 0.8]} />
          <meshStandardMaterial 
            color="#C5A46D"
            transparent
            opacity={0.8}
          />
        </mesh>
        )
      )}
      
      {/* Cabeza */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>
    </group>
  );
}

export default function VirtualFitting() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraInstanceRef = useRef(null);
  const poseInstanceRef = useRef(null);

  const [step, setStep] = useState('intro'); // intro, scanning, result
  const [measurements, setMeasurements] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [currentGarmentIndex, setCurrentGarmentIndex] = useState(0);
  const [narrative, setNarrative] = useState("");
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const hasFetched = useRef(false);

  const currentGarment = recommendations[currentGarmentIndex];

  // Logic to determine category
  const getCategory = (score) => {
      if (score > 0.95) return { name: 'DIVINEO', class: 'text-amber-400', badge: 'MATCH PERFECTO' };
      if (score >= 0.85) return { name: 'LAFAYETTE', class: 'text-gray-200', badge: 'COLECCIÓN CURADA' };
      return { name: 'CAP', class: 'text-blue-400', badge: 'BESPOKE CREATION' };
  };

  const category = currentGarment ? getCategory(currentGarment.match_score || currentGarment.fit_score || 0) : null;

  // Cleanup
  useEffect(() => {
    return () => {
       if (cameraInstanceRef.current) cameraInstanceRef.current.stop();
       if (poseInstanceRef.current) poseInstanceRef.current.close();
    };
  }, []);

  const startScanning = () => {
    setStep('scanning');
    setRecommendations([]);
    setQrUrl(null);
    hasFetched.current = false;
    
    // Initialize MediaPipe
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    poseInstanceRef.current = pose;

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);

    if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => { await pose.send({ image: videoRef.current }); },
          width: 1280, height: 720
        });
        cameraInstanceRef.current = camera;
        camera.start();
    }
  };

  const onResults = (results) => {
      if (!canvasRef.current || !results.poseLandmarks) return;
      const ctx = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;
      
      // Draw video
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(results.image, 0, 0, width, height);
      ctx.restore();

      // Draw landmarks
      const lm = results.poseLandmarks;
      
      // Scanning Effect
      ctx.strokeStyle = '#C5A46D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lm[11].x * width, lm[11].y * height);
      ctx.lineTo(lm[12].x * width, lm[12].y * height);
      ctx.lineTo(lm[24].x * width, lm[24].y * height);
      ctx.lineTo(lm[23].x * width, lm[23].y * height);
      ctx.closePath();
      ctx.stroke();

      // Check for stability/fetch condition
      if (!hasFetched.current && lm[11].visibility > 0.8 && lm[12].visibility > 0.8) {
          // Calculate measurements (Normalized)
          const shoulderWidth = Math.abs(lm[11].x - lm[12].x);
          const torsoLength = Math.abs(lm[11].y - lm[23].y);
          const hipWidth = Math.abs(lm[23].x - lm[24].x);

          // Heuristic conversion to approximate cm (assuming 2m height frame)
          const chest = shoulderWidth * 200;
          const waist = hipWidth * 200;
          const heightCalc = torsoLength * 300;

          hasFetched.current = true;
          setMeasurements({ shoulderWidth, torsoLength, hipWidth });

          // Delay to show scanning effect briefly
          setTimeout(() => {
              fetchRecommendations(chest, waist, heightCalc);
          }, 1000);
      }
  };

  const fetchRecommendations = async (chest, waist, height) => {
      setLoading(true);
      try {
          const res = await fetch('/api/recommend', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chest, waist, height, user_id: 'PILOT_DEMO' })
          });
          const data = await res.json();
          if (data.recommendations && data.recommendations.length > 0) {
              setRecommendations(data.recommendations);
              setNarrative(data.narrative || "");
              setStep('result');
              // Stop camera to save resources
              if (cameraInstanceRef.current) cameraInstanceRef.current.stop();
              if (poseInstanceRef.current) poseInstanceRef.current.close();
          } else {
              // Retry or error
              hasFetched.current = false;
          }
      } catch (e) {
          console.error("Error fetching recommendations", e);
          hasFetched.current = false;
      } finally {
          setLoading(false);
      }
  };

  // Buttons Handlers
  const handleSelect = () => {
      if (!currentGarment) return;
      setToast(`Añadido al carrito: ${currentGarment.Title || currentGarment.name}`);
      setTimeout(() => setToast(null), 3000);
  };

  const handleReserve = async () => {
       if (!currentGarment) return;
       try {
           const res = await fetch(`/api/reserve/${currentGarment.id}`);
           const data = await res.json();
           if (data.qr_url) setQrUrl(data.qr_url);
       } catch (e) {
           console.error(e);
       }
  };

  const handleNext = () => {
      setCurrentGarmentIndex((prev) => (prev + 1) % recommendations.length);
      setQrUrl(null); // Reset QR on change
  };

  const handleSave = () => {
      setToast("Perfil Biométrico Guardado (Simulado)");
      setTimeout(() => setToast(null), 3000);
  };

  const handleShare = () => {
      setToast("Captura de pantalla guardada");
      setTimeout(() => setToast(null), 3000);
  };

  // Render ...
  return (
    <div className="relative min-h-screen bg-black text-[#F5F5F0] overflow-hidden font-sans">
        {/* Badge */}
        <div className="absolute top-4 right-4 z-50 bg-red-600 px-3 py-1 rounded text-xs font-bold tracking-widest animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.7)]">
            PILOTO ACTIVO
        </div>

        {/* Main Content */}
        {step === 'intro' && (
            // Intro UI
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
                <h1 className="text-6xl md:text-8xl font-serif text-[#C5A46D] mb-4 tracking-widest">TRYONYOU</h1>
                <p className="text-xl text-white/50 mb-12 tracking-[0.5em] uppercase">Digital Mirror Experience</p>
                <button
                    onClick={startScanning}
                    className="px-12 py-4 border border-[#C5A46D] text-[#C5A46D] font-bold text-xl rounded hover:bg-[#C5A46D] hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,164,109,0.5)]"
                >
                    INICIAR ESPEJO
                </button>
            </div>
        )}

        {step === 'scanning' && (
            // Scanning UI
             <div className="relative w-full h-screen flex items-center justify-center bg-black">
                <video ref={videoRef} className="hidden" />
                <canvas ref={canvasRef} width="1280" height="720" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/30">
                    <div className="w-24 h-24 border-t-4 border-[#C5A46D] rounded-full animate-spin mb-4"></div>
                    <p className="text-2xl text-[#C5A46D] animate-pulse tracking-widest font-serif">ESCANEANDO SILUETA...</p>
                </div>
             </div>
        )}

        {step === 'result' && (
            <div className="flex flex-col lg:flex-row h-screen animate-fade-in">
                {/* 3D View */}
                <div className="flex-1 relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                     <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 45 }}>
                        <ambientLight intensity={0.6} />
                        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
                        <Environment preset="studio" />
                        <Suspense fallback={null}>
                             <Avatar3D measurements={measurements} currentGarment={currentGarment} />
                        </Suspense>
                        <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2} />
                     </Canvas>

                     {/* Category Overlay */}
                     {category && (
                         <div className="absolute top-8 left-8 z-10">
                             <h2 className={`text-4xl md:text-6xl font-serif ${category.class} drop-shadow-lg`}>{category.name}</h2>
                             <div className="h-1 w-24 bg-[#C5A46D] my-2"></div>
                             <p className="text-sm tracking-[0.4em] uppercase text-white/80">{category.badge}</p>
                         </div>
                     )}
                </div>
                
                {/* Sidebar Controls */}
                <div className="w-full lg:w-96 bg-black/90 p-8 border-l border-[#C5A46D]/20 flex flex-col gap-6 z-20 overflow-y-auto backdrop-blur-md shadow-2xl">
                    {/* Narrative */}
                    <div className="p-6 bg-[#C5A46D]/5 border border-[#C5A46D]/30 rounded-lg">
                        <p className="italic text-sm text-[#C5A46D] leading-relaxed">"{narrative}"</p>
                    </div>

                    {/* Item Info */}
                    {currentGarment && (
                        <div className="animate-slide-up">
                            <h3 className="text-xl font-bold uppercase tracking-wider text-white">{currentGarment.Title || currentGarment.name}</h3>
                            <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide">{currentGarment.description || "Prenda seleccionada por IA"}</p>
                            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-2xl font-serif text-[#C5A46D]">{currentGarment['Variant Price'] || currentGarment.price} €</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase">Compatibility</span>
                                    <span className="text-sm font-bold text-white">{((currentGarment.match_score ?? currentGarment.fit_score ?? 0) * 100)}% FIT</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                        <button onClick={handleSelect} className="col-span-2 bg-[#C5A46D] text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-white transition-all rounded shadow-lg hover:shadow-[#C5A46D]/50">
                            SELECCIONAR
                        </button>
                        <button onClick={handleReserve} className="border border-[#C5A46D] py-3 text-[#C5A46D] text-xs font-bold uppercase tracking-wider hover:bg-[#C5A46D] hover:text-black transition-all rounded">
                            RESERVAR (QR)
                        </button>
                        <button onClick={handleNext} className="border border-white/20 py-3 text-white/70 text-xs uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all rounded">
                            COMBINAR
                        </button>
                        <button onClick={handleSave} className="border border-white/20 py-3 text-white/70 text-xs uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all rounded">
                            SILUETA
                        </button>
                        <button onClick={handleShare} className="col-span-2 border border-white/20 py-3 text-white/70 text-xs uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all rounded">
                            COMPARTIR LOOK
                        </button>
                    </div>

                    {/* QR Overlay */}
                    {qrUrl && (
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 animate-fade-in p-8" onClick={() => setQrUrl(null)}>
                            <div className="bg-white p-4 rounded-xl shadow-[0_0_50px_rgba(197,164,109,0.3)]">
                                <img src={qrUrl} alt="QR" className="w-48 h-48" />
                            </div>
                            <p className="mt-6 text-[#C5A46D] font-serif text-xl tracking-widest uppercase">Reserva VIP</p>
                            <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">(Click para cerrar)</p>
                        </div>
                    )}

                    {/* Toast */}
                    {toast && (
                        <div className="fixed bottom-8 left-1/2 lg:left-auto lg:right-96 lg:translate-x-0 transform -translate-x-1/2 bg-[#C5A46D] text-black px-6 py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(197,164,109,0.5)] z-50 animate-bounce uppercase text-xs tracking-widest">
                            {toast}
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
}
