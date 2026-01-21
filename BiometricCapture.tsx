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
  const landmarkCanvasRef = useRef<HTMLCanvasElement>(null);
  const garmentCanvasRef = useRef<HTMLCanvasElement>(null);
  const [landmarker, setLandmarker] = useState<PoseLandmarker | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<HTMLImageElement | null>(null);
  const [measurements, setMeasurements] = useState<{
    shoulder: string;
    waist: string;
    height: string;
  } | null>(null);
  const [, setLocation] = useLocation();

  // Bolt Optimization: Refs for loop control and state throttling
  const isScanningRef = useRef(false);
  const scanCompleteRef = useRef(false);
  const progressRef = useRef(0);
  const lastUiUpdateRef = useRef(0);
  const currentLandmarksRef = useRef<any>(null); // To store latest landmarks for render loop

  // Fix: Refs to hold state accessed in loop to avoid stale closures
  const garmentImageRef = useRef<HTMLImageElement | null>(null);
  const requestRef = useRef<number>();

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

    // Cleanup function to stop animation loop
    return () => {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
    };
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
      // Reset image ref
      garmentImageRef.current = null;
      setGarmentImage(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Camera access denied. Please enable camera permissions.");
    }
  };

  // Divineo Domains Integration with Fallback
  const analyzePose = async (landmarks: any[]) => {
    if (scanCompleteRef.current) return; // Prevent double trigger

    setIsScanning(false);
    // Note: We keep the camera running now for the Virtual Mirror experience!

    setCameraError("CONNECTING TO DIVINEO DOMAINS...");

    try {
      // 1. Scanning Phase: Landmarks visible (handled by render loop state)
      // 2. The Snap: Trigger API
      const response = await fetch("/api/dominions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landmarks }),
      });

      const data = await response.json();

      if (data.status === "success") {
        console.log("Prenda sugerida:", data.garment);

        // Load garment image for Layer 2
        const img = new Image();
        img.src = data.image_url;
        img.onload = () => {
            setGarmentImage(img);
            garmentImageRef.current = img; // Update ref for loop

            // 3. Reveal: handled by setting scanComplete to true
            setScanComplete(true);
            scanCompleteRef.current = true;
            setCameraError(null);
        };

        localStorage.setItem("userMeasurements", JSON.stringify(data.measurements));

      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.warn("API Unreachable, activating Fallback Protocol:", error);

      // Fallback Logic
      const img = new Image();
      img.src = "/assets/garments/blazer.png"; // Local fallback asset
      img.onload = () => {
          setGarmentImage(img);
          garmentImageRef.current = img; // Update ref for loop

          setScanComplete(true);
          scanCompleteRef.current = true;
          setCameraError(null); // Clear error, we are in offline mode essentially
      };

      // Calculate rudimentary measurements for UI display if needed
      // (Already calculated in the loop and set in measurements state)
    }
  };

  // Prediction Loop
  const predictWebcam = () => {
    if (!landmarker || !videoRef.current || !landmarkCanvasRef.current || !garmentCanvasRef.current) return;

    // Ensure we don't have multiple loops
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    const video = videoRef.current;
    const landmarkCanvas = landmarkCanvasRef.current;
    const garmentCanvas = garmentCanvasRef.current;

    const landmarkCtx = landmarkCanvas.getContext("2d");
    const garmentCtx = garmentCanvas.getContext("2d");

    const drawingUtils = new DrawingUtils(landmarkCtx!);

    let lastVideoTime = -1;

    const renderLoop = () => {
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;

        // Set canvas dimensions to match video
        landmarkCanvas.width = video.videoWidth;
        landmarkCanvas.height = video.videoHeight;
        garmentCanvas.width = video.videoWidth;
        garmentCanvas.height = video.videoHeight;

        const startTimeMs = performance.now();
        landmarker.detectForVideo(video, startTimeMs, (result) => {
          // 1. Clear canvases
          landmarkCtx!.clearRect(0, 0, landmarkCanvas.width, landmarkCanvas.height);
          garmentCtx!.clearRect(0, 0, garmentCanvas.width, garmentCanvas.height);

          if (result.landmarks && result.landmarks.length > 0) {
            const landmarks = result.landmarks[0];
            currentLandmarksRef.current = landmarks;

            // --- Layer 1: Landmarks (Scanning Phase) ---
            if (!scanCompleteRef.current) {
                // Draw landmarks only during scanning or if desired
                for (const landmark of result.landmarks) {
                  drawingUtils.drawLandmarks(landmark, {
                    radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
                    color: "#E2001A",
                    lineWidth: 2,
                  });
                  drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {
                    color: "rgba(255, 255, 255, 0.6)",
                    lineWidth: 1,
                  });
                }
            }

            // --- Logic Updates (Scanning Progress) ---
            if (isScanningRef.current && !scanCompleteRef.current) {
                progressRef.current = Math.min(progressRef.current + 0.5, 100);
                const now = Date.now();
                if (now - lastUiUpdateRef.current > 100 || progressRef.current >= 100) {
                    lastUiUpdateRef.current = now;

                    const shoulderLeft = landmarks[11];
                    const shoulderRight = landmarks[12];
                    const hipLeft = landmarks[23];
                    const hipRight = landmarks[24];
                    const nose = landmarks[0];
                    const ankleLeft = landmarks[27];

                    const shoulderWidthPx = dist(shoulderLeft, shoulderRight);
                    const shoulderWidthCm = Math.round(shoulderWidthPx * 100 * 1.2);
                    const waistWidthCm = Math.round(dist(hipLeft, hipRight) * 100 * 1.1);
                    const estimatedHeightCm = Math.round(dist(nose, ankleLeft) * 100 * 1.7);

                    setMeasurements({
                      shoulder: `${shoulderWidthCm} cm`,
                      waist: `${waistWidthCm} cm`,
                      height: `${estimatedHeightCm} cm`,
                    });
                    setScanProgress(progressRef.current);
                }

                if (progressRef.current >= 100) {
                   isScanningRef.current = false; // Stop scanning logic
                   analyzePose(landmarks); // Trigger API
                }
            }

            // --- Layer 2: Garment Overlay (Reveal Phase) ---
            // Use ref here to avoid stale closure
            if (scanCompleteRef.current && garmentImageRef.current) {
                const img = garmentImageRef.current;
                const shoulderLeft = landmarks[11];
                const shoulderRight = landmarks[12];

                // Calculate dimensions based on shoulders
                const shoulderWidthPx = dist(shoulderLeft, shoulderRight);

                const scaleFactor = 3.5; // Adjustment for garment png size relative to shoulder points
                const garmentWidth = shoulderWidthPx * scaleFactor;
                const garmentHeight = garmentWidth * (img.height / img.width);

                // Position: Centered between shoulders, shifted up/down
                const centerX = (shoulderLeft.x + shoulderRight.x) / 2 * garmentCanvas.width;
                const centerY = (shoulderLeft.y + shoulderRight.y) / 2 * garmentCanvas.height;

                const yShift = -10;

                // Draw Image
                garmentCtx.save();
                garmentCtx.globalAlpha = 0.8; // "opacity: 0.8" from fallback logic

                // Draw centered
                garmentCtx.drawImage(
                    img,
                    centerX - garmentWidth / 2,
                    centerY - garmentHeight / 3 + yShift, // Adjust anchor point (usually neck area)
                    garmentWidth,
                    garmentHeight
                );

                garmentCtx.restore();
            }
          }
        });
      }

      requestRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 blur-sm" />

      {/* Scanner Container */}
      <div className="relative z-10 w-full max-w-4xl aspect-video bg-black/40 backdrop-blur-md border border-white/10 rounded-none overflow-hidden shadow-2xl">
        {/* Layer 0: Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
        />

        {/* Layer 1: Landmarks (Scanning) */}
        <canvas
          ref={landmarkCanvasRef}
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
        />

        {/* Layer 2: Garment (Reveal) - Applied mirror-layer class for effects */}
        <canvas
          ref={garmentCanvasRef}
          className="absolute inset-0 w-full h-full object-cover mirror-layer"
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

          {/* Error State (Overlay only, background still runs) */}
          {cameraError && !scanComplete && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 text-white bg-black/60 p-6 backdrop-blur-md border border-red-500/30"
             >
                <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-red-500"/>
                    <p className="font-mono text-sm uppercase tracking-widest">
                        {cameraError}
                    </p>
                </div>
            </motion.div>
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

          {/* Completion State - Moved to bottom or less intrusive to allow view of garment */}
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-4 pointer-events-auto"
            >
              <div className="bg-black/70 backdrop-blur-md p-6 border-t border-white/10 flex flex-col items-center gap-4 w-full">
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-serif text-white tracking-widest">
                        Match Found
                      </h3>
                  </div>
                  <p className="text-white/60 font-sans text-sm text-center max-w-lg">
                     We have selected a garment that perfectly aligns with your biometric profile.
                  </p>
                  <Button
                    onClick={() => setLocation("/result")}
                    className="bg-white text-black hover:bg-white/90 rounded-none px-8 py-4 text-sm tracking-widest uppercase"
                  >
                    View Details
                  </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-white/20 font-mono text-[10px] tracking-[0.3em]">
        SECURE BIOMETRIC ENCLAVE • V.2.0.4
      </div>
    </div>
  );
}
