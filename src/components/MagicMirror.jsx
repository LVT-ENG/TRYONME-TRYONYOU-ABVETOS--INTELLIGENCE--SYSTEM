import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const MagicMirror = ({ mode = 'scan', onScanComplete, snapTriggered = false, language = 'FR' }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const requestRef = useRef(null);
  const garmentImageRef = useRef(null);
  const lastPredictionTimeRef = useRef(0);

  // Carousel State
  const [activeLook, setActiveLook] = useState(0);
  const [flashActive, setFlashActive] = useState(false);

  const gold = '#D3B26A';

  // Configuración del Carrusel de Looks (Simulado)
  const LOOKS = [
    { id: 0, name: "Le Classique", src: '/assets/garments/blazer.png', trend: "Col Mao / Bordeaux" },
    { id: 1, name: "Avant-Garde", src: '/assets/garments/blazer.png', trend: "Coupe Structurée" },
    { id: 2, name: "Soirée", src: '/assets/garments/blazer.png', trend: "Soie Fluide" }
  ];

  const LABELS = {
    FR: { detected: "TENDANCE DÉTECTÉE", analyzing: "ANALYSE BIOMÉTRIQUE..." },
    ES: { detected: "TENDENCIA DETECTADA", analyzing: "ANÁLISIS BIOMÉTRICO..." }
  };

  useEffect(() => {
    // Trigger Luxury Gold Flash on Snap
    if (snapTriggered) {
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 800); // 800ms flash transition
    }
  }, [snapTriggered]);

  useEffect(() => {
    // Load Garment Asset
    const img = new Image();
    img.src = LOOKS[activeLook].src;
    img.onload = () => {
      garmentImageRef.current = img;
    };
  }, [activeLook]);

  useEffect(() => {
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
    const now = performance.now();
    if (now - lastPredictionTimeRef.current < 33) {
      requestRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (
      poseLandmarker &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      lastPredictionTimeRef.current = now;
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      if (!contextRef.current || contextRef.current.canvas !== canvas) {
        contextRef.current = canvas.getContext('2d');
      }
      const ctx = contextRef.current;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      let startTimeMs = performance.now();
      const results = poseLandmarker.detectForVideo(video, startTimeMs);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        // Draw Garment Overlay if Snap Triggered or Result Mode
        if (snapTriggered || mode === 'result') {
          const leftShoulder = landmarks[11];
          const rightShoulder = landmarks[12];

          if (leftShoulder && rightShoulder && garmentImageRef.current) {
            const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x) * canvas.width;
            const centerX = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width;
            const centerY = ((leftShoulder.y + rightShoulder.y) / 2) * canvas.height;

            // Heuristic Scale
            const garmentWidth = shoulderWidth * 2.8;
            const garmentHeight = garmentWidth * (garmentImageRef.current.height / garmentImageRef.current.width);

            const x = centerX - (garmentWidth / 2);
            const y = centerY - (garmentHeight * 0.2);

            ctx.save();
            ctx.globalAlpha = 0.9;
            ctx.drawImage(garmentImageRef.current, x, y, garmentWidth, garmentHeight);
            ctx.restore();
          }
        } else {
             // Scanning Dots (Before Snap)
             ctx.fillStyle = gold;
             [11, 12, 23, 24].forEach(idx => {
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
  }, [cameraReady, poseLandmarker, mode, snapTriggered]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
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
            transform: 'scaleX(-1)'
        }}
      />

      {/* FLASH EFFECT */}
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: gold,
          opacity: flashActive ? 0.8 : 0,
          transition: 'opacity 0.5s ease-out',
          pointerEvents: 'none',
          zIndex: 10
      }} />

      {/* VIGNETTE AURA */}
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: `inset 0 0 100px ${snapTriggered ? gold : '#000'}`,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.3
      }} />

      {/* FLOATING LABEL (Mirror Mode Minimalist UI) */}
      {snapTriggered && (
          <div style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 26, 51, 0.9)',
              border: `1px solid ${gold}`,
              padding: '15px 40px',
              borderRadius: '40px',
              color: gold,
              fontFamily: 'serif',
              textAlign: 'center',
              zIndex: 5,
              minWidth: '300px'
          }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '3px', display: 'block', opacity: 0.8, marginBottom: '5px' }}>
                  {LABELS[language].detected}
              </span>
              <span style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
                  {LOOKS[activeLook].trend}
              </span>
          </div>
      )}

      {/* CAROUSEL CONTROLS */}
      {snapTriggered && (
          <div style={{
              position: 'absolute',
              bottom: '40px',
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              zIndex: 5
          }}>
              {LOOKS.map((look, i) => (
                  <button
                      key={look.id}
                      onClick={() => { setActiveLook(i); setFlashActive(true); setTimeout(() => setFlashActive(false), 300); }}
                      style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: i === activeLook ? gold : 'transparent',
                          border: `1px solid ${gold}`,
                          cursor: 'pointer',
                          padding: 0
                      }}
                      aria-label={look.name}
                  />
              ))}
          </div>
      )}
    </div>
  );
};

export default MagicMirror;
