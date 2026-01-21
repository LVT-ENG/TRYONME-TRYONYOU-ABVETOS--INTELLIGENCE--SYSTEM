import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Loader2, Scan, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

// Bolt Optimization: Move static helper function outside component to avoid recreation
// Simple Euclidean distance function
const dist = (p1: any, p2: any) =>
  Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

export default function BiometricCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [landmarker, setLandmarker] = useState<PoseLandmarker | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<{
    shoulder: string;
    waist: string;
    height: string;
  } | null>(null);
  const [, setLocation] = useLocation();

  // Bolt Optimization: Refs for loop control and state throttling
  // These ensure the animation loop always accesses current values, preventing "zombie loops" due to stale closures
  const isScanningRef = useRef(false);
  const scanCompleteRef = useRef(false);
  const progressRef = useRef(0);
  const lastUiUpdateRef = useRef(0);

  // Initialize MediaPipe Pose Landmarker
  useEffect(() => {
    const createPoseLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm",
        );
        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose/pose_landmarker/float16/1/pose_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numPoses: 1,
        });
        setLandmarker(poseLandmarker);
      } catch (error) {
        console.error("Error initializing pose landmarker:", error);
        // Fallback to CPU if GPU fails
        try {
          const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm",
          );
          const poseLandmarker = await PoseLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose/pose_landmarker/float16/1/pose_landmarker.task`,
                delegate: "CPU",
              },
              runningMode: "VIDEO",
              numPoses: 1,
            },
          );
          setLandmarker(poseLandmarker);
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
          setCameraError("Failed to initialize biometric engine.");
        }
      }
    };

    createPoseLandmarker();
  }, []);

  // Start Camera and Scanning Loop
  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadeddata", predictWebcam);

      // Update refs and state
      setIsScanning(true);
      isScanningRef.current = true;
      scanCompleteRef.current = false;
      progressRef.current = 0;
      setCameraError(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Camera access denied. Please enable camera permissions.");
    }
  };

  // Divineo Domains Integration
  const analyzePose = async (landmarks: any[]) => {
    if (scanComplete) return;

    // Stop camera stream immediately to freeze frame or just stop processing
    if (videoRef.current && videoRef.current.srcObject) {
       const stream = videoRef.current.srcObject as MediaStream;
       stream.getTracks().forEach((track) => track.stop());
    }

    setIsScanning(false);
    // UI update to show connection status
    setCameraError("CONNECTING TO DIVINEO DOMAINS...");

    try {
      const response = await fetch('/api/dominions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landmarks })
      });

      const data = await response.json();

      if (data.status === 'success') {
          console.log("Prenda sugerida:", data.garment);

          // Save measurements for result page
          localStorage.setItem('userMeasurements', JSON.stringify({
              ...data.measurements,
              occasion: 'work', // Default context
              size_preference: data.size
          }));

          setCameraError(null); // Clear status message
          setScanComplete(true);
      } else {
          console.error("Divineo Error:", data.error);
          setCameraError("ERROR DE CONEXIÓN CON EL PILOTO");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setCameraError("ERROR DE CONEXIÓN CON EL PILOTO");
    }
  };

  // Prediction Loop
  const predictWebcam = () => {
    if (!landmarker || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const drawingUtils = new DrawingUtils(ctx!);

    let lastVideoTime = -1;

    const renderLoop = () => {
      // Bolt Optimization: Check refs for loop control to avoid stale closures
      if (!isScanningRef.current && scanCompleteRef.current) return;

      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const startTimeMs = performance.now();
        landmarker.detectForVideo(video, startTimeMs, (result) => {
          ctx!.clearRect(0, 0, canvas.width, canvas.height);

          if (result.landmarks) {
            for (const landmark of result.landmarks) {
              // Custom drawing style for "High-Fashion Futurism"
              drawingUtils.drawLandmarks(landmark, {
                radius: (data) =>
                  DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
                color: "#E2001A", // Lafayette Red
                lineWidth: 2,
              });
              drawingUtils.drawConnectors(
                landmark,
                PoseLandmarker.POSE_CONNECTIONS,
                {
                  color: "rgba(255, 255, 255, 0.6)", // Silver/White
                  lineWidth: 1,
                },
              );
            }

            // Simulate scanning progress if landmarks are detected
            if (result.landmarks.length > 0 && !scanCompleteRef.current) {
              // Update progress in ref synchronously
              progressRef.current = Math.min(progressRef.current + 0.5, 100);

              const now = Date.now();
              // Bolt Optimization: Throttle UI updates to ~10fps (100ms) to reduce React re-renders
              if (
                now - lastUiUpdateRef.current > 100 ||
                progressRef.current >= 100
              ) {
                lastUiUpdateRef.current = now;

                // Calculate real-time measurements
                const landmarks = result.landmarks[0];
                const shoulderLeft = landmarks[11];
                const shoulderRight = landmarks[12];
                const hipLeft = landmarks[23];
                const hipRight = landmarks[24];
                const nose = landmarks[0];
                const ankleLeft = landmarks[27];

                // Approximate measurements based on relative proportions
                // In a real app, this would need depth calibration or a reference object
                const shoulderWidthPx = dist(shoulderLeft, shoulderRight);
                // const torsoHeightPx = dist(shoulderLeft, hipLeft); // unused

                // Mock calibration: assuming average human proportions in frame
                const shoulderWidthCm = Math.round(shoulderWidthPx * 100 * 1.2);
                const waistWidthCm = Math.round(
                  dist(hipLeft, hipRight) * 100 * 1.1,
                );
                const estimatedHeightCm = Math.round(
                  dist(nose, ankleLeft) * 100 * 1.7,
                );

                setMeasurements({
                  shoulder: `${shoulderWidthCm} cm`,
                  waist: `${waistWidthCm} cm`,
                  height: `${estimatedHeightCm} cm`,
                });

                setScanProgress(progressRef.current);
              }

              if (progressRef.current >= 100) {
                // Trigger Divineo Domains analysis
                if (!scanCompleteRef.current) {
                   analyzePose(result.landmarks[0]);
                }

                // Completion state (handled in analyzePose, but setting ref here to stop loop)
                scanCompleteRef.current = true;
                isScanningRef.current = false;
              }
            }
          }
        });
      }

      if (!scanCompleteRef.current) {
        requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 blur-sm" />

      {/* Scanner Container */}
      <div className="relative z-10 w-full max-w-4xl aspect-video bg-black/40 backdrop-blur-md border border-white/10 rounded-none overflow-hidden shadow-2xl">
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
        />

        {/* Overlay UI */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 pointer-events-none">
          {/* Header */}
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col">
              <h2 className="text-white font-serif text-2xl tracking-widest uppercase">
                Biometric Scan
              </h2>
              <p className="text-white/60 font-sans text-xs tracking-widest">
                GALERIES LAFAYETTE • PARIS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isScanning ? "bg-red-500 animate-pulse" : "bg-white/20"}`}
              />
              <span className="text-white/60 font-mono text-xs">
                SYSTEM {isScanning ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
          </div>

          {/* Central Reticle */}
          {!isScanning && !scanComplete && !cameraError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 pointer-events-auto"
            >
              <div className="w-64 h-64 border-[1px] border-white/20 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 border-t-[1px] border-red-500/50 rounded-full animate-spin-slow" />
                <Scan className="w-12 h-12 text-white/80" />
              </div>
              <Button
                onClick={startCamera}
                disabled={!landmarker}
                className="bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-500 rounded-none px-8 py-6 text-lg tracking-widest uppercase font-medium"
              >
                {landmarker ? "Initiate Scan" : "Loading Engine..."}
              </Button>
            </motion.div>
          )}

          {/* Error State */}
          {cameraError && (
            <div className="flex flex-col items-center gap-4 text-red-500">
              <AlertCircle className="w-12 h-12" />
              <p className="font-mono text-sm uppercase tracking-widest">
                {cameraError}
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-none pointer-events-auto"
              >
                Retry System
              </Button>
            </div>
          )}

          {/* Scanning Progress & Measurements */}
          {isScanning && (
            <div className="w-full max-w-md flex flex-col gap-4">
              {/* Live Measurements Overlay */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-black/50 border border-white/10 p-2 text-center backdrop-blur-sm">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Shoulder
                  </div>
                  <div className="text-red-500 font-mono text-lg">
                    {measurements?.shoulder || "--"}
                  </div>
                </div>
                <div className="bg-black/50 border border-white/10 p-2 text-center backdrop-blur-sm">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Waist
                  </div>
                  <div className="text-red-500 font-mono text-lg">
                    {measurements?.waist || "--"}
                  </div>
                </div>
                <div className="bg-black/50 border border-white/10 p-2 text-center backdrop-blur-sm">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Height
                  </div>
                  <div className="text-red-500 font-mono text-lg">
                    {measurements?.height || "--"}
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs font-mono text-white/80">
                <span>ANALYZING SKELETAL STRUCTURE</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full h-1 bg-white/10">
                <motion.div
                  className="h-full bg-red-600 shadow-[0_0_10px_rgba(226,0,26,0.8)]"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Completion State */}
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6 pointer-events-auto"
            >
              <CheckCircle2 className="w-20 h-20 text-green-400" />
              <h3 className="text-3xl font-serif text-white tracking-widest">
                Scan Complete
              </h3>
              <p className="text-white/60 font-sans max-w-md text-center">
                Your biometric profile has been securely generated. Proceed to
                your curated selection.
              </p>
              <Button
                onClick={() => setLocation("/result")}
                className="bg-white text-black hover:bg-white/90 rounded-none px-10 py-6 text-lg tracking-widest uppercase mt-4"
              >
                View Collection
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-white/20 font-mono text-[10px] tracking-[0.3em]">
        SECURE BIOMETRIC ENCLAVE • V.2.0.4
      </div>
    </div>
  );
}
