import React, { useEffect, useRef, useState, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
// import * as THREE from 'three';

// Avatar 3D Component
function Avatar3D() { return null; }

// Componente principal
export default function VirtualFitting() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraInstanceRef = useRef(null);
  const poseInstanceRef = useRef(null);
  const [step, setStep] = useState('intro'); // intro, scanning, avatar, fitting
  const [measurements, setMeasurements] = useState(null);
  const [currentGarment, setCurrentGarment] = useState(null);
  const [garments, setGarments] = useState([]);
  const hasFetched = useRef(false);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (cameraInstanceRef.current) {
        cameraInstanceRef.current.stop();
        cameraInstanceRef.current = null;
      }
      if (poseInstanceRef.current) {
        poseInstanceRef.current.close();
        poseInstanceRef.current = null;
      }
    };
  }, []);

  // Catálogo de prendas
  const garmentCatalog = [
    {
      id: 'blazer_001',
      name: 'Blazer Signature',
      color: '#2C2C2C',
      fitScore: 99.7,
      description: 'Corte perfecto para tu silueta',
      price: '€890'
    },
    {
      id: 'dress_001',
      name: 'Robe Élégante',
      color: '#8B4513',
      fitScore: 98.2,
      description: 'Diseño fluido y sofisticado',
      price: '€1,200'
    },
    {
      id: 'coat_001',
      name: 'Manteau Classique',
      color: '#1A1A1A',
      fitScore: 97.8,
      description: 'Elegancia atemporal',
      price: '€1,500'
    }
  ];

  // Iniciar escaneo
  const startScanning = () => {
    setStep('scanning');
    
    // Ensure previous instances are cleaned up if any
    if (poseInstanceRef.current) poseInstanceRef.current.close();
    if (cameraInstanceRef.current) cameraInstanceRef.current.stop();

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

    pose.onResults((results) => {
      if (!canvasRef.current || !results.poseLandmarks) return;
      const ctx = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;

      ctx.clearRect(0, 0, width, height);
      
      // Espejo
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(results.image, 0, 0, width, height);
      ctx.restore();

      const lm = results.poseLandmarks;
      
      // Efecto de escaneo con líneas
      ctx.strokeStyle = '#C5A46D';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#C5A46D';
      
      // Líneas de escaneo horizontales animadas
      const scanY = (Date.now() % 2000) / 2000 * height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();
      
      ctx.shadowBlur = 0;

      if (!hasFetched.current && lm[11].visibility > 0.8) {
        hasFetched.current = true;
        
        // Extraer medidas
        const shoulderWidth = Math.abs(lm[11].x - lm[12].x);
        const torsoLength = Math.abs(lm[11].y - lm[23].y);
        const hipWidth = Math.abs(lm[23].x - lm[24].x);
        
        setMeasurements({
          shoulderWidth,
          torsoLength,
          hipWidth
        });
        
        // Transición suave a avatar
        setTimeout(() => {
          // ⚡ Bolt Optimization: Stop camera and pose detection to save CPU/GPU
          if (cameraInstanceRef.current) {
            cameraInstanceRef.current.stop();
            cameraInstanceRef.current = null;
          }
          if (poseInstanceRef.current) {
            poseInstanceRef.current.close();
            poseInstanceRef.current = null;
          }

          setStep('avatar');
          setGarments(garmentCatalog);
          setCurrentGarment(garmentCatalog[0]);
        }, 2000);
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => { await pose.send({ image: videoRef.current }); },
      width: 1280, height: 720
    });
    cameraInstanceRef.current = camera;
    camera.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F0] via-[#E8E4D9] to-[#C5A46D] flex items-center justify-center p-4">
      {/* Intro Screen */}
      {step === 'intro' && (
        <div className="max-w-2xl text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-serif text-[#2C2C2C] tracking-[0.3em] uppercase mb-6">
            TryOnYou
          </h1>
          <p className="text-xl text-[#2C2C2C]/70 mb-12 tracking-wider">
            Virtual Fitting AI - Experiencia de Probador 3D
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif text-[#2C2C2C] mb-4">Cómo funciona</h2>
            <div className="space-y-4 text-left text-[#2C2C2C]/80">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C5A46D] flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                <p>Escaneo biométrico de tu silueta en tiempo real</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C5A46D] flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                <p>Generación de tu avatar 3D personalizado</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C5A46D] flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                <p>Prueba virtual de prendas con ajuste perfecto</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={startScanning}
            className="px-12 py-4 bg-[#C5A46D] text-white font-bold uppercase text-lg tracking-widest hover:bg-[#d4b98a] transition-all hover:shadow-2xl rounded-lg"
          >
            Comenzar Escaneo
          </button>
        </div>
      )}

      {/* Scanning Screen */}
      {step === 'scanning' && (
        <div className="w-full max-w-6xl">
          <div className="relative border-4 border-[#C5A46D] rounded-lg overflow-hidden shadow-2xl">
            <video ref={videoRef} className="hidden" />
            <canvas ref={canvasRef} width="1280" height="720" className="w-full h-auto" />
            
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-[#C5A46D] font-serif italic text-xl tracking-wider">
                Analizando tu silueta...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Avatar 3D + Try-On Screen */}
      {step === 'avatar' && (
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
          {/* Vista 3D */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl" style={{ height: '600px' }}>
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                <div className="text-center">
                    <p className="text-[#C5A46D] text-2xl font-serif mb-4">Avatar 3D Generated</p>
                    <p className="text-white/60 mb-8">Rendering Engine: Optimizing...</p>
                    {/*
                    <Suspense fallback={null}>
                        <Canvas shadows>
                           <Avatar3D measurements={measurements} currentGarment={currentGarment} />
                        </Canvas>
                    </Suspense>
                    */}
                    <div className="w-32 h-32 border-4 border-[#C5A46D] border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
          </div>

          {/* Panel de prendas */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-4 tracking-wider">Curated Selection</h2>
              <p className="text-sm text-[#2C2C2C]/60 mb-6">Prendas perfectas para tu avatar</p>
              
              <div className="space-y-4">
                {garments.map((garment) => (
                  <div
                    key={garment.id}
                    onClick={() => setCurrentGarment(garment)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      currentGarment?.id === garment.id
                        ? 'border-[#C5A46D] bg-[#C5A46D]/10 shadow-lg'
                        : 'border-[#2C2C2C]/20 hover:border-[#C5A46D]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#2C2C2C]">{garment.name}</h3>
                      <span className="px-3 py-1 bg-[#C5A46D] text-white text-xs font-bold rounded-full">
                        {garment.fitScore}% Fit
                      </span>
                    </div>
                    <p className="text-sm text-[#2C2C2C]/70 mb-2">{garment.description}</p>
                    <p className="text-lg font-bold text-[#C5A46D]">{garment.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {currentGarment && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <button className="w-full py-4 bg-[#C5A46D] text-white font-bold uppercase tracking-widest hover:bg-[#d4b98a] transition-all rounded-lg">
                  Añadir al Carrito
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
