import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

const VirtualTryOn = ({ selectedGarment, onMeasurementsDetected }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [landmarks, setLandmarks] = useState(null);
  const [isPoseReady, setIsPoseReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [simulatedMeasurements, setSimulatedMeasurements] = useState(null);

  // Simulate measurements when camera is not available
  useEffect(() => {
    if (cameraError && !simulatedMeasurements) {
      // Simulate biometric data for demo purposes
      const mockMeasurements = {
        shoulderWidth: 150,
        torsoLength: 280,
        shoulderY: 100,
        hipY: 380,
        centerX: 320,  // Half of standard 640px video width
      };
      setSimulatedMeasurements(mockMeasurements);
      if (onMeasurementsDetected) {
        onMeasurementsDetected(mockMeasurements);
      }
      setIsPoseReady(true);
    }
  }, [cameraError, simulatedMeasurements, onMeasurementsDetected]);

  const handleUserMediaError = (error) => {
    console.error('Camera error:', error);
    setCameraError(error.message || 'Camera not available');
  };

  useEffect(() => {
    // Only initialize MediaPipe if webcam is available
    if (!cameraError && webcamRef.current && webcamRef.current.video) {
      try {
        // Initialize MediaPipe Pose
        const pose = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          },
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        pose.onResults(onResults);

        // Setup camera
        const camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (webcamRef.current && webcamRef.current.video) {
              await pose.send({ image: webcamRef.current.video });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
        setIsPoseReady(true);

        return () => {
          if (pose) {
            pose.close();
          }
        };
      } catch (error) {
        console.error('Error initializing pose detection:', error);
        setCameraError('Pose detection unavailable');
      }
    }
  }, [cameraError]);

  const onResults = (results) => {
    if (!results.poseLandmarks) return;

    setLandmarks(results.poseLandmarks);

    // Draw on canvas
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasCtx = canvasElement.getContext('2d');
    const videoWidth = canvasElement.width;
    const videoHeight = canvasElement.height;

    // Clear canvas
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);

    // Extract key landmarks for garment positioning
    const leftShoulder = results.poseLandmarks[11];  // Left shoulder
    const rightShoulder = results.poseLandmarks[12]; // Right shoulder
    const leftHip = results.poseLandmarks[23];       // Left hip
    const rightHip = results.poseLandmarks[24];      // Right hip

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      // Calculate shoulder width and torso length in pixels
      const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * videoWidth;
      const shoulderY = ((leftShoulder.y + rightShoulder.y) / 2) * videoHeight;
      const hipY = ((leftHip.y + rightHip.y) / 2) * videoHeight;
      const torsoLength = hipY - shoulderY;

      // Calculate center position
      const centerX = ((leftShoulder.x + rightShoulder.x) / 2) * videoWidth;

      // Send measurements for biometric analysis
      if (onMeasurementsDetected) {
        onMeasurementsDetected({
          shoulderWidth: shoulderWidth,
          torsoLength: torsoLength,
          shoulderY: shoulderY,
          hipY: hipY,
          centerX: centerX,
        });
      }

      // Draw garment overlay if selected
      if (selectedGarment && selectedGarment.image) {
        const garmentWidth = shoulderWidth * 1.2; // Slightly wider than shoulders
        const garmentHeight = torsoLength * 1.3;  // Slightly longer than torso
        const garmentX = centerX - garmentWidth / 2;
        const garmentY = shoulderY - garmentHeight * 0.1; // Slight offset from shoulders

        // Draw semi-transparent garment
        canvasCtx.globalAlpha = 0.7;
        
        // Create gradient for garment effect
        const gradient = canvasCtx.createLinearGradient(
          garmentX, 
          garmentY, 
          garmentX, 
          garmentY + garmentHeight
        );
        // Use RGBA format for proper transparency handling
        const baseColor = selectedGarment.color || '#4A90E2';
        const isHexColor = baseColor.startsWith('#');
        const color1 = baseColor;
        const color2 = isHexColor ? baseColor + 'AA' : 'rgba(46, 92, 138, 0.67)';
        
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(garmentX, garmentY, garmentWidth, garmentHeight);
        
        canvasCtx.globalAlpha = 1.0;

        // Draw garment outline
        canvasCtx.strokeStyle = '#ffffff';
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeRect(garmentX, garmentY, garmentWidth, garmentHeight);

        // Draw garment name
        canvasCtx.fillStyle = '#ffffff';
        canvasCtx.font = 'bold 16px Arial';
        canvasCtx.fillText(
          selectedGarment.name || 'Selected Garment',
          garmentX,
          garmentY - 10
        );
      }

      // Draw landmark points for shoulders and hips
      canvasCtx.fillStyle = '#00FF00';
      [leftShoulder, rightShoulder, leftHip, rightHip].forEach((landmark) => {
        canvasCtx.beginPath();
        canvasCtx.arc(
          landmark.x * videoWidth,
          landmark.y * videoHeight,
          5,
          0,
          2 * Math.PI
        );
        canvasCtx.fill();
      });

      // Draw shoulder line
      canvasCtx.strokeStyle = '#00FF00';
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      canvasCtx.moveTo(leftShoulder.x * videoWidth, leftShoulder.y * videoHeight);
      canvasCtx.lineTo(rightShoulder.x * videoWidth, rightShoulder.y * videoHeight);
      canvasCtx.stroke();

      // Draw hip line
      canvasCtx.beginPath();
      canvasCtx.moveTo(leftHip.x * videoWidth, leftHip.y * videoHeight);
      canvasCtx.lineTo(rightHip.x * videoWidth, rightHip.y * videoHeight);
      canvasCtx.stroke();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        {cameraError ? (
          // Simulated view when camera is not available
          <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
            <div className="aspect-[4/3] flex flex-col items-center justify-center p-8">
              <div className="text-center space-y-6">
                <div className="text-6xl">📹</div>
                <h3 className="text-2xl font-bold text-white">Demo Mode</h3>
                <p className="text-white/60 max-w-md">
                  Camera not available. Using simulated biometric data for demonstration.
                </p>
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mt-4">
                  <p className="text-green-400 text-sm font-semibold">
                    ✓ Biometric data captured (simulated)
                  </p>
                  <div className="text-white/40 text-xs mt-2">
                    Shoulder width: {simulatedMeasurements?.shoulderWidth}px • 
                    Torso length: {simulatedMeasurements?.torsoLength}px
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Webcam */}
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: 'user',
              }}
              className="w-full h-auto"
              mirrored={true}
              onUserMediaError={handleUserMediaError}
            />
            
            {/* Overlay Canvas for garment and landmarks */}
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="absolute top-0 left-0 w-full h-full"
            />
          </>
        )}
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full">
          <div className={`w-2 h-2 rounded-full ${isPoseReady ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-white text-sm font-medium">
            {isPoseReady ? (cameraError ? 'Demo Mode' : 'Tracking Active') : 'Initializing...'}
          </span>
        </div>

        {/* Instructions */}
        {!cameraError && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-6 py-3 rounded-full">
            <p className="text-white text-sm text-center">
              Stand in frame for real-time fitting
            </p>
          </div>
        )}
      </div>

      {/* Measurement Info */}
      {(landmarks || simulatedMeasurements) && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
          <p className="text-white/60 text-sm">
            ✓ Body landmarks detected • Real-time tracking active
          </p>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
