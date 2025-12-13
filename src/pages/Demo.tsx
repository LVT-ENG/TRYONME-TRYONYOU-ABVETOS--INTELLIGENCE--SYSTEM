import React, { useEffect, useRef, useState } from 'react';
import TryOnEngine from '../lib/TryOnEngine';
import { Camera } from '@mediapipe/camera_utils';

const Demo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<TryOnEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initEngine = async () => {
      try {
        const newEngine = new TryOnEngine();
        
        // Setup callbacks
        newEngine.onPoseResults((results) => {
          if (!canvasRef.current || !videoRef.current) return;
          const ctx = canvasRef.current.getContext('2d');
          if (!ctx) return;

          // Clear and draw video frame
          ctx.save();
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw landmarks (simple debug visualization)
          if (results.poseLandmarks) {
            // Here we would draw the garment overlay based on landmarks
            // For now, just drawing simple points to prove it works
            for (const landmark of results.poseLandmarks) {
              ctx.beginPath();
              ctx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
              ctx.fillStyle = '#D4AF37'; // Gold color
              ctx.fill();
            }
          }
          ctx.restore();
        });

        setEngine(newEngine);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to init engine:", err);
        setError("No se pudo iniciar el motor de IA.");
        setIsLoading(false);
      }
    };

    initEngine();
  }, []);

  useEffect(() => {
    if (!engine || !videoRef.current || !canvasRef.current) return;

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await engine.send(videoRef.current);
        }
      },
      width: 1280,
      height: 720
    });

    camera.start()
      .then(() => console.log("Camera started"))
      .catch(err => {
        console.error("Camera error:", err);
        setError("No se pudo acceder a la cámara. Por favor, permite el acceso.");
      });

    return () => {
      // Cleanup if needed (Camera utils doesn't have a simple stop method exposed easily in types sometimes)
    };
  }, [engine]);

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-syne text-[#D4AF37] mb-6">Virtual Mirror Demo</h1>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden border border-[#333333] shadow-2xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80">
            <div className="text-[#D4AF37] animate-pulse">Cargando IA...</div>
          </div>
        )}
        
        {/* Hidden video element for source */}
        <video 
          ref={videoRef} 
          className="absolute inset-0 w-full h-full object-cover opacity-0" 
          playsInline 
        />
        
        {/* Canvas for rendering output */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
          width={1280}
          height={720}
        />
        
        {/* UI Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
          <p className="text-center text-sm text-[#E5E4E2]">
            Párate frente a la cámara para ver la magia.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-[#D4AF37] text-[#111111] font-bold rounded hover:bg-[#F4E4BC] transition-colors">
          Cambiar Prenda
        </button>
        <a href="/" className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] rounded hover:bg-[#D4AF37]/10 transition-colors">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default Demo;
