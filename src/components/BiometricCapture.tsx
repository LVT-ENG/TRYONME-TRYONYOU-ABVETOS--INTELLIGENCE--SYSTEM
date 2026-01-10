import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';

const BiometricCapture = ({ onScanComplete }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [message, setMessage] = useState("Aligning with Divineo Intelligence...");
  const poseRef = useRef(null);

  useEffect(() => {
    // Initialize MediaPipe Pose
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);
    poseRef.current = pose;

    // Start auto-analysis after a short delay to allow camera init
    const startTimer = setTimeout(() => {
        setAnalyzing(true);
        setMessage("Capturing Essence...");
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, []);

  // Frame processing loop
  useEffect(() => {
      const interval = setInterval(() => {
          if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
             const video = webcamRef.current.video;
             if (poseRef.current) {
                 poseRef.current.send({image: video});
             }
          }
      }, 100); // Process every 100ms
      return () => clearInterval(interval);
  }, [analyzing]);


  const onResults = (results) => {
    if (!canvasRef.current || !results.poseLandmarks) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = webcamRef.current?.video?.videoWidth || 640;
    canvas.height = webcamRef.current?.video?.videoHeight || 480;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Divineo V7 / Aura Brillante Style
    if (results.poseLandmarks) {
      // "Aura Brillante" Effect (Cyan/Blue Glow)
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#06b6d4'; // Cyan-500
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)'; // Cyan with opacity
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      // Draw connections with the glowing aura
      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#06b6d4',
        lineWidth: 3
      });

      // Draw landmarks with a brighter core
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffffff';
      drawLandmarks(ctx, results.poseLandmarks, {
        color: '#ffffff',
        fillColor: '#0ea5e9', // Sky-500
        lineWidth: 2,
        radius: 4
      });
    }
    ctx.restore();

    // Auto-complete logic after "analysis" duration
    if (analyzing && results.poseLandmarks) {
         // Check if shoulders and hips are visible (indices 11, 12, 23, 24)
         const lm = results.poseLandmarks;
         if (lm[11] && lm[11].visibility > 0.5 &&
             lm[12] && lm[12].visibility > 0.5 &&
             lm[23] && lm[23].visibility > 0.5 &&
             lm[24] && lm[24].visibility > 0.5) {

             // If visible for a few frames (simulated by timeout here for simplicity in this turn)
             if (message !== "Perfect Match") {
                 setMessage("Curated Selection");
                 setTimeout(() => {
                     setMessage("Perfect Match");
                     if (onScanComplete) {
                        onScanComplete({ status: "success", aesthetic: "divineo_v7" });
                     }
                 }, 2000);
             }
         }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#141619] overflow-hidden">
      {/* Container for Video & Overlay */}
      <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-[#C5A46D]/30">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user"
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-[#141619]/80"></div>

        {/* UI Overlay - Divineo Style */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
            <h2 className="text-3xl font-serif text-[#F0F0F0] tracking-widest uppercase drop-shadow-md">
                {message}
            </h2>
            {analyzing && message !== "Perfect Match" && (
                <div className="mt-4 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce delay-200"></div>
                    <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce delay-300"></div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BiometricCapture;
