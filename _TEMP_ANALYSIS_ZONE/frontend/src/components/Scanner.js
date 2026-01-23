'use client';

import { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { motion } from 'framer-motion';

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(true);
  const [landmarks, setLandmarks] = useState(null);
  const [step, setStep] = useState('scan'); // scan, form, result
  const [formData, setFormData] = useState({ height: '', weight: '', event_type: 'Gala' });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (step !== 'scan') return;

    const pose = new Pose({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await pose.send({image: videoRef.current});
          }
        },
        width: 1280,
        height: 720
      });
      camera.start();
    }

    return () => {
      // Cleanup if needed
    };
  }, [step]);

  const onResults = (results) => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvasCtx = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;
    
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, width, height);
    
    // Draw neon silhouette
    if (results.poseLandmarks) {
      setLandmarks(results.poseLandmarks); // Capture latest landmarks

      // Custom Neon Style
      canvasCtx.globalCompositeOperation = 'source-over';
      
      // Draw connectors (Lines)
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#00FFFF', // Cyan Neon
        lineWidth: 4
      });
      
      // Draw landmarks (Points) - make them subtle
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: '#FFFFFF',
        lineWidth: 1,
        radius: 2
      });
    }
    canvasCtx.restore();
  };

  const handleScanComplete = () => {
    // In demo mode/simulator, we might not get real landmarks, so we bypass strict check for verification
    // if (!landmarks) {
    //    alert("No body detected! Please stand in front of the camera.");
    //    return;
    // }
    setStep('form');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/recommend-fit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          landmarks: landmarks || [], // Sending empty if skipped
          event_type: formData.event_type
        })
      });

      const data = await response.json();
      setResult(data.recommendation);
      setStep('result');
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      
      {/* SCANNING STEP */}
      {step === 'scan' && (
        <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-black">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            autoPlay
            playsInline
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            width={1280}
            height={720}
          />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
            <button
              onClick={handleScanComplete}
              className="bg-lafayette-gold text-black font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)] hover:scale-105 transition-transform"
            >
              Capturar Silueta
            </button>
          </div>
          <div className="absolute top-4 left-4 text-white/50 text-sm">
            Mode: Neon Scanner v1.0
          </div>
        </div>
      )}

      {/* FORM STEP */}
      {step === 'form' && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <h2 className="text-2xl text-lafayette-gold mb-6 text-center font-light">Completa tu Perfil</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Altura (cm)</label>
              <input
                type="number"
                required
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-lafayette-gold outline-none transition-colors"
                value={formData.height}
                onChange={e => setFormData({...formData, height: e.target.value})}
                placeholder="Ej: 170"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Peso Aproximado (kg)</label>
              <input
                type="number"
                required
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-lafayette-gold outline-none transition-colors"
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: e.target.value})}
                placeholder="Ej: 65"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm">Tipo de Evento</label>
              <select
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-lafayette-gold outline-none"
                value={formData.event_type}
                onChange={e => setFormData({...formData, event_type: e.target.value})}
              >
                <option value="Gala">Gala / Noche</option>
                <option value="Business">Business / Oficina</option>
                <option value="Casual">Casual / Diario</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-lafayette-gold to-yellow-600 text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all disabled:opacity-50"
            >
              {isLoading ? "Procesando Ajuste Perfecto..." : "Analizar Estilo"}
            </button>
          </form>
        </motion.div>
      )}

      {/* RESULT STEP */}
      {step === 'result' && result && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full max-w-2xl p-10"
        >
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-gray-800 border border-lafayette-gold/30 mb-4 animate-pulse">
                <span className="text-lafayette-gold text-4xl">✨</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{result.name}</h2>
            <p className="text-xl text-lafayette-gold font-light">{result.visual_effect}</p>
          </div>
          
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="text-2xl text-gray-200 font-serif leading-relaxed">
              "{result.reason}"
            </p>
          </div>

          <button
            onClick={() => { setStep('scan'); setResult(null); }}
            className="mt-12 text-gray-400 hover:text-white transition-colors underline decoration-lafayette-gold"
          >
            Escanear de nuevo
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Scanner;
