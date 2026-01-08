import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';

const VirtualTryOn = ({ garmentImage, garmentName }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const garmentImgRef = useRef(null);

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
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [garmentImage]);

  useEffect(() => {
    if (!isLoading && webcamRef.current) {
      const detectPose = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          await poseRef.current.send({ image: video });
        }
        requestAnimationFrame(detectPose);
      };
      detectPose();
    }
  }, [isLoading]);

  const onResults = (results) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!canvas || !ctx || !garmentImgRef.current) return;

    canvas.width = webcamRef.current.video.videoWidth;
    canvas.height = webcamRef.current.video.videoHeight;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw webcam video
    ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks) {
      // Get key body landmarks
      const leftShoulder = results.poseLandmarks[11];
      const rightShoulder = results.poseLandmarks[12];
      const leftHip = results.poseLandmarks[23];
      const rightHip = results.poseLandmarks[24];

      // Calculate garment position and size
      const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvas.width;
      const shoulderCenterX = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width;
      const shoulderCenterY = ((leftShoulder.y + rightShoulder.y) / 2) * canvas.height;
      
      const hipCenterY = ((leftHip.y + rightHip.y) / 2) * canvas.height;
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
    }

    ctx.restore();
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading virtual try-on...</p>
          </div>
        </div>
      )}

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

      {/* Garment info overlay */}
      <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
        <p className="text-white text-sm font-medium">{garmentName}</p>
        <p className="text-cyan-400 text-xs">Virtual Try-On Active</p>
      </div>
    </div>
  );
};

export default VirtualTryOn;
