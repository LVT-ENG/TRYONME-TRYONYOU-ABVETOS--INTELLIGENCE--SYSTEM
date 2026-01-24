import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

const MagicMirror = ({ mode = 'scan', onScanComplete }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const requestRef = useRef(null);
  const garmentImageRef = useRef(null);

  const gold = '#D3B26A';

  useEffect(() => {
    // Load the garment image
    const img = new Image();
    img.src = '/assets/garments/blazer.png';
    img.onload = () => {
      garmentImageRef.current = img;
    };

    // Initialize MediaPipe Pose Landmarker
    const createPoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose/pose_landmarker/float16/1/pose_landmarker.task`,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numPoses: 1
      });
      setPoseLandmarker(landmarker);
    };

    createPoseLandmarker();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const predictWebcam = () => {
    if (
      poseLandmarker &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      // BOLT OPTIMIZATION: Cache 2D context to avoid overhead in animation loop
      if (!contextRef.current || contextRef.current.canvas !== canvas) {
        contextRef.current = canvas.getContext('2d');
      }
      const ctx = contextRef.current;

      // Set canvas dimensions to match video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      let startTimeMs = performance.now();
      const results = poseLandmarker.detectForVideo(video, startTimeMs);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        // Draw Golden Aura (Optional visual flair)
        // const drawingUtils = new DrawingUtils(ctx);
        // drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, { color: gold, lineWidth: 1 });

        // Logic for AR Garment Overlay
        // Landmarks: 11 (left shoulder), 12 (right shoulder)
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];

        if (leftShoulder && rightShoulder && garmentImageRef.current && mode === 'result') {
          const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x) * canvas.width;
          const centerX = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width;
          const centerY = ((leftShoulder.y + rightShoulder.y) / 2) * canvas.height;

          // Scale garment
          // Heuristic: Garment width is approx 2.5x shoulder width (for a blazer/drape effect)
          const garmentWidth = shoulderWidth * 2.8;
          const garmentHeight = garmentWidth * (garmentImageRef.current.height / garmentImageRef.current.width);

          const x = centerX - (garmentWidth / 2);
          const y = centerY - (garmentHeight * 0.2); // Adjust vertical offset to sit on shoulders

          ctx.save();
          ctx.globalAlpha = 0.9;
          ctx.drawImage(garmentImageRef.current, x, y, garmentWidth, garmentHeight);
          ctx.restore();
        }

        // In Scan mode, just show tracking dots or a scanning effect
        if (mode === 'scan') {
             // Simulate "Scanning" with gold dots on key points
             ctx.fillStyle = gold;
             [11, 12, 23, 24].forEach(idx => { // Shoulders and Hips
                 if(landmarks[idx]) {
                     const p = landmarks[idx];
                     ctx.beginPath();
                     ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
                     ctx.fill();
                 }
             });
        }
      }
    }
    requestRef.current = requestAnimationFrame(predictWebcam);
  };

  useEffect(() => {
    if (cameraReady && poseLandmarker) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [cameraReady, poseLandmarker, mode]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        onUserMedia={() => setCameraReady(true)}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 1,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 2,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)' // Mirror canvas to match mirrored webcam
        }}
      />
      {/* Golden Aura / Vignette Effect */}
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: `inset 0 0 100px ${mode === 'result' ? gold : '#000'}`,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.3
      }} />
    </div>
  );
};

export default MagicMirror;
