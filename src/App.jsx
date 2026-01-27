import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hasFetched = useRef(false);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

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

      // DIBUJAR MALLA DE ROPA (Sigue al cuerpo)
      const lm = results.poseLandmarks;
      ctx.beginPath();
      ctx.moveTo(lm[11].x * width, lm[11].y * height); // Hombro Izq
      ctx.lineTo(lm[12].x * width, lm[12].y * height); // Hombro Der
      ctx.lineTo(lm[24].x * width, lm[24].y * height); // Cadera Der
      ctx.lineTo(lm[23].x * width, lm[23].y * height); // Cadera Izq
      ctx.closePath();
      
      ctx.fillStyle = 'rgba(197, 164, 109, 0.3)'; // Oro Lafayette
      ctx.fill();
      ctx.strokeStyle = '#C5A46D';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (!hasFetched.current && !recommendation && lm[11].visibility > 0.8) {
          hasFetched.current = true;
          fetch('/api/recommend', {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'X-Divineo-Token': 'Divineo_Lafayette_Secure_70_2026_Alpha' 
              },
              body: JSON.stringify({ landmarks: lm })
          })
          .then(res => res.json())
          .then(setRecommendation)
          .catch(err => {
              console.error("Fetch error:", err);
              hasFetched.current = false;
          });
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => { await pose.send({ image: videoRef.current }); },
      width: 1280, height: 720
    });
    camera.start();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141619] p-10 font-serif">
      <header className="mb-8 text-center">
        <h1 className="text-[#C5A46D] text-4xl tracking-widest uppercase">Galeries Lafayette</h1>
        <p className="text-white/40 tracking-widest text-sm mt-2">Divineo Experience by Jules</p>
      </header>
      <div className="relative border-4 border-[#C5A46D] rounded-[100px] overflow-hidden shadow-2xl">
        <video ref={videoRef} className="hidden" />
        <canvas ref={canvasRef} width="1280" height="720" className="w-[800px] h-auto" />
        {recommendation && (
          <div className="absolute bottom-10 left-10 right-10 bg-black/70 backdrop-blur-md p-6 border-l-4 border-[#C5A46D]">
            <p className="text-[#C5A46D] italic text-lg">{recommendation.jules_narrative}</p>
          </div>
        )}
      </div>
    </div>
  );
}
