import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { drawConnectors } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';

const VirtualTryOn = ({ garmentImage, garmentName }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const garmentImgRef = useRef(null);
  const latestResultsRef = useRef(null);
  const requestRef = useRef();
  const activeRef = useRef(true);

  // Scan Simulation Effect
  useEffect(() => {
    if (!isLoading && !showRecommendation) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setShowRecommendation(true), 500); // Short delay before transition
            return 100;
          }
          return prev + 1; // 100 steps * 30ms = 3000ms (3 seconds)
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isLoading, showRecommendation]);

  useEffect(() => {
    // Initialize MediaPipe Pose
    poseRef.current = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    poseRef.current.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    poseRef.current.onResults(onResults);

    // Preload garment image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = garmentImage;
    img.onload = () => {
      garmentImgRef.current = img;
      setIsLoading(false);
    };

    return () => {
      activeRef.current = false;
      if (poseRef.current) {
        poseRef.current.close();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [garmentImage]);

  const onResults = (results) => {
    latestResultsRef.current = results;
  };

  const drawOverlay = (ctx, results, width, height) => {
    if (!results.poseLandmarks || !garmentImgRef.current) return;

    // Get key body landmarks
    const leftShoulder = results.poseLandmarks[11];
    const rightShoulder = results.poseLandmarks[12];
    const leftHip = results.poseLandmarks[23];
    const rightHip = results.poseLandmarks[24];

    // Calculate garment position and size
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * width;
    const shoulderCenterX = ((leftShoulder.x + rightShoulder.x) / 2) * width;
    const shoulderCenterY = ((leftShoulder.y + rightShoulder.y) / 2) * height;
    
    const hipCenterY = ((leftHip.y + rightHip.y) / 2) * height;
    const torsoLength = hipCenterY - shoulderCenterY;

    // Draw garment overlay
    const garmentWidth = shoulderWidth * 2.2; // Adjust multiplier for fit
    const garmentHeight = torsoLength * 1.8; // Adjust for garment length
    const garmentX = shoulderCenterX - garmentWidth / 2;
    const garmentY = shoulderCenterY - garmentHeight * 0.15; // Adjust vertical position

    // Apply blend mode for realistic overlay
    ctx.globalAlpha = 0.85;
    ctx.globalCompositeOperation = 'multiply';

    ctx.drawImage(
      garmentImgRef.current,
      garmentX,
      garmentY,
      garmentWidth,
      garmentHeight
    );

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';

    // Draw subtle body outline (aura effect)
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#C5A46D'; // Gold accent
    ctx.strokeStyle = '#C5A46D';
    ctx.lineWidth = 1;

    drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#C5A46D',
      lineWidth: 1
    });
  };

  // Memoize render function to avoid useEffect dependency issues
  // But actually, it relies on refs which are stable, so it's fine.
  // The linter complained because it was defined outside.
  // I will move the render logic inside useEffect to be safe and clean.

  useEffect(() => {
    // Only run loops if not loading AND recommendation is NOT shown
    if (!isLoading && !showRecommendation && webcamRef.current) {
      activeRef.current = true;

      const render = () => {
        const canvas = canvasRef.current;
        const video = webcamRef.current?.video;

        if (canvas && video && video.readyState === 4) {
          const ctx = canvas.getContext('2d');

          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }

          const width = canvas.width;
          const height = canvas.height;

          ctx.save();
          ctx.clearRect(0, 0, width, height);

          // 1. Draw webcam video (Always smooth 60fps)
          ctx.drawImage(video, 0, 0, width, height);

          // 2. Draw latest AI results (Updates at AI speed)
          if (latestResultsRef.current) {
            drawOverlay(ctx, latestResultsRef.current, width, height);
          }

          ctx.restore();
        }

        if (activeRef.current) {
          requestRef.current = requestAnimationFrame(render);
        }
      };

      // Start the Render Loop
      requestRef.current = requestAnimationFrame(render);

      // Start the AI Processing Loop
      const detectPose = async () => {
        if (!activeRef.current) return;

        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          // This await ensures we don't flood the AI pipeline
          await poseRef.current.send({ image: video });
        }

        if (activeRef.current) {
           requestAnimationFrame(detectPose);
        }
      };

      detectPose();

      return () => {
        activeRef.current = false;
        cancelAnimationFrame(requestRef.current);
      };
    }
  }, [isLoading, showRecommendation]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* 1. LOADING STATE */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading virtual try-on...</p>
          </div>
        </div>
      )}

      {/* 2. CAMERA & SCANNING STATE */}
      {!showRecommendation && (
        <>
          {/* Hidden webcam */}
          <Webcam
            ref={webcamRef}
            audio={false}
            className="hidden"
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user',
              width: 1280,
              height: 720
            }}
          />

          {/* Canvas with overlay */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            style={{ maxHeight: '80vh' }}
          />

          {/* Biometric Scan UI Overlay */}
          {!isLoading && (
            <div className="absolute inset-0 z-20 pointer-events-none">
                <img
                    src="/assets/ui/biometric_scan_ui.png"
                    alt="Biometric Scan Interface"
                    className="w-full h-full object-contain"
                />
                {/* Progress Text/Bar Simulation */}
                <div className="absolute top-10 left-0 right-0 text-center">
                    <p className="text-[#C5A46D] font-mono text-xl tracking-widest animate-pulse">
                        SCANNING... {scanProgress}%
                    </p>
                </div>
            </div>
          )}

          {/* Garment info overlay (Legacy) */}
          <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-white text-sm font-medium">{garmentName}</p>
            <p className="text-cyan-400 text-xs">Virtual Try-On Active</p>
          </div>
        </>
      )}

      {/* 3. RECOMMENDATION CARD STATE (Divineo Sales Flow) */}
      {showRecommendation && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-30 animate-in fade-in duration-1000">
          <div className="max-w-md w-full bg-[#141619] border border-[#C5A46D] rounded-xl overflow-hidden shadow-2xl relative">

            {/* Header */}
            <div className="bg-[#0f1113] p-4 text-center border-b border-[#C5A46D]/30">
                <h2 className="text-2xl font-serif text-[#D4AF37] tracking-wider">MATCH FOUND: 98%</h2>
            </div>

            {/* Product Image */}
            <div className="p-6 flex justify-center bg-gradient-to-b from-[#141619] to-[#0a0b0c]">
                <div className="relative w-48 h-64">
                    <div className="absolute inset-0 bg-[#C5A46D]/20 blur-xl rounded-full"></div>
                    <img
                        src="/assets/catalog/red_dress_minimal.png"
                        alt="Minimal Red Silk Dress"
                        className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(197,164,109,0.3)]"
                    />
                </div>
            </div>

            {/* Text & Action */}
            <div className="p-6 text-center space-y-4">
                <p className="text-[#F5EFE6] font-light text-sm leading-relaxed">
                    Based on your morphology, we recommend the <span className="text-[#C5A46D] font-semibold">Minimal Red Silk Dress</span>.
                </p>
                <button
                    className="w-full py-3 bg-[#C5A46D] hover:bg-[#b08d55] text-[#141619] font-bold uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={() => console.log('Try On clicked')}
                >
                    Try On (Send to Fitting Room)
                </button>
            </div>

            {/* Pau's Voice Bubble */}
            <div className="absolute -bottom-24 left-0 right-0 flex justify-center animate-in slide-in-from-bottom-4 duration-700 delay-500">
                <div className="bg-[#006D77] text-white px-6 py-3 rounded-full shadow-lg border border-[#C5A46D]/50 flex items-center space-x-3 max-w-sm mx-4">
                    <span className="text-2xl">🦚</span>
                    <p className="text-xs italic">"I've selected this piece to enhance your silhouette. Would you like to reserve it?"</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
