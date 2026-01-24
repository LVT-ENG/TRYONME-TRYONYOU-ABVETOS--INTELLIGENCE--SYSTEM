import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

const MagicMirror = ({ mode = 'scan', onScanComplete }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const requestRef = useRef(null);
  const garmentImageRef = useRef(null);

  // Refs for Master Scan Logic
  const apiAnchorsRef = useRef(null);
  const hiddenCanvasRef = useRef(document.createElement('canvas'));

  const gold = '#D3B26A';

  useEffect(() => {
    // Load initial garment
    const img = new Image();
    img.src = '/assets/garments/look_0.png'; // Default start
    img.onload = () => {
      garmentImageRef.current = img;
    };
    // Fallback if look_0 doesn't exist yet (though we created it)
    img.onerror = () => { img.src = '/assets/garments/blazer.png'; };

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

  // --- SUPERCOMMIT MAX: Master Scan Loop ---
  useEffect(() => {
    if (!cameraReady || mode !== 'result') return;

    const performMasterScan = async () => {
      if (!webcamRef.current || !webcamRef.current.video) return;

      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;

      // 1. OPTIMIZATION: Downscale Frame
      const hiddenCanvas = hiddenCanvasRef.current;
      const ctx = hiddenCanvas.getContext('2d');
      const targetWidth = 640; // Reduced width for performance
      const scale = targetWidth / video.videoWidth;
      const targetHeight = video.videoHeight * scale;

      hiddenCanvas.width = targetWidth;
      hiddenCanvas.height = targetHeight;
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

      // 2. Convert to Blob
      hiddenCanvas.toBlob(async (blob) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append('file', blob, 'scan.jpg');

        try {
          // 3. POST to API
          const response = await fetch('/api/v1/master-scan', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();

            // 4. Update Assets & Narrative
            if (data.image_url) {
                // Ensure URL is absolute/correct relative to public
                const url = data.image_url.startsWith('http') ? data.image_url : data.image_url;
                if(garmentImageRef.current && garmentImageRef.current.src !== window.location.origin + url) {
                     const newImg = new Image();
                     newImg.src = url;
                     newImg.onload = () => { garmentImageRef.current = newImg; };
                }
            }

            // "Fire Test": Log Narrative
            console.log(`%c[JULES NARRATIVE]: ${data.jules_narrative}`, `color: ${gold}; font-weight: bold; font-size: 12px;`);

            // Update Anchors
            if (data.anchors) {
                apiAnchorsRef.current = data.anchors;
            }

          } else {
            console.warn("Master Scan failed:", response.statusText);
          }
        } catch (error) {
          console.error("Master Scan error:", error);
        }
      }, 'image/jpeg', 0.8); // 80% quality JPEG
    };

    const intervalId = setInterval(performMasterScan, 3000); // Every 3 seconds

    // Run once immediately
    performMasterScan();

    return () => clearInterval(intervalId);
  }, [cameraReady, mode]);


  const predictWebcam = () => {
    if (
      poseLandmarker &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions to match video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      let startTimeMs = performance.now();
      const results = poseLandmarker.detectForVideo(video, startTimeMs);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- RENDERING STRATEGY ---
      // We prioritize Local MediaPipe for smooth tracking (60fps).
      // API Anchors are used for "Master Scan" validation or fallback.
      // If we wanted to STRICTLY use API anchors (which are 3s delayed), it would stutter.
      // So we use local landmarks but render the garment provided by the API.

      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

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

          // Debug: Visualize API Anchors if they differ significantly (Validation)
          if (apiAnchorsRef.current) {
             // API returns normalized 0-1 coords
             const ax1 = apiAnchorsRef.current.left_shoulder.x * canvas.width;
             const ay1 = apiAnchorsRef.current.left_shoulder.y * canvas.height;
             const ax2 = apiAnchorsRef.current.right_shoulder.x * canvas.width;
             const ay2 = apiAnchorsRef.current.right_shoulder.y * canvas.height;

             // Draw faint debug markers for API "truth"
             /*
             ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
             ctx.beginPath(); ctx.arc(ax1, ay1, 5, 0, 2*Math.PI); ctx.fill();
             ctx.beginPath(); ctx.arc(ax2, ay2, 5, 0, 2*Math.PI); ctx.fill();
             */
          }
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
