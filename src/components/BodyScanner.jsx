import React, { useEffect, useRef } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

const BodyScanner = ({ onComplete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isScanning = useRef(true);

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

      // Mirror effect
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(results.image, 0, 0, width, height);
      ctx.restore();

      // Draw clothes mesh
      const lm = results.poseLandmarks;
      ctx.beginPath();
      ctx.moveTo(lm[11].x * width, lm[11].y * height); // Left Shoulder
      ctx.lineTo(lm[12].x * width, lm[12].y * height); // Right Shoulder
      ctx.lineTo(lm[24].x * width, lm[24].y * height); // Right Hip
      ctx.lineTo(lm[23].x * width, lm[23].y * height); // Left Hip
      ctx.closePath();

      ctx.fillStyle = 'rgba(197, 164, 109, 0.3)'; // Oro Lafayette
      ctx.fill();
      ctx.strokeStyle = '#C5A46D';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Trigger completion on good visibility
      if (isScanning.current && lm[11].visibility > 0.8) {
         // Debounce or immediate?
         // Let's rely on the visibility check.
         isScanning.current = false;
         onComplete(lm);
      }
    });

    if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
        onFrame: async () => { await pose.send({ image: videoRef.current }); },
        width: 1280, height: 720
        });
        camera.start();
    }

    return () => {
        // cleanup if needed
        isScanning.current = false;
    };
  }, [onComplete]);

  return (
      <div className="relative border-4 border-[#C5A46D] rounded-[100px] overflow-hidden shadow-2xl">
        <video ref={videoRef} className="hidden" />
        <canvas ref={canvasRef} width="1280" height="720" className="w-[800px] h-auto" />
      </div>
  );
};

export default BodyScanner;
