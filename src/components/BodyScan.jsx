import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';

const BodyScan = ({ onScanComplete }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [measurements, setMeasurements] = useState(null);
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

    return () => {
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, []);

  const onResults = (results) => {
    if (!canvasRef.current || !results.poseLandmarks) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = webcamRef.current?.video?.videoWidth || 640;
    canvas.height = webcamRef.current?.video?.videoHeight || 480;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elegant aura effect (high-end fashion style)
    if (results.poseLandmarks) {
      // Draw glowing aura
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#60A5FA';
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 2;

      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#60A5FA',
        lineWidth: 2
      });

      ctx.shadowBlur = 10;
      drawLandmarks(ctx, results.poseLandmarks, {
        color: '#3B82F6',
        lineWidth: 1,
        radius: 3
      });

      // Calculate body measurements
      if (scanning) {
        const bodyMeasurements = calculateMeasurements(results.poseLandmarks);
        setMeasurements(bodyMeasurements);
        
        // Simulate scanning progress
        setProgress(prev => {
          const newProgress = Math.min(prev + 2, 100);
          if (newProgress === 100) {
            setTimeout(() => {
              onScanComplete(bodyMeasurements);
            }, 500);
          }
          return newProgress;
        });
      }
    }

    ctx.restore();
  };

  const calculateMeasurements = (landmarks) => {
    // Calculate proportions from pose landmarks
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftKnee = landmarks[25];
    const rightKnee = landmarks[26];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    // Calculate relative proportions
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
    const hipWidth = Math.abs(rightHip.x - leftHip.x);
    const torsoLength = Math.abs(leftShoulder.y - leftHip.y);
    const legLength = Math.abs(leftHip.y - leftAnkle.y);

    return {
      shoulderWidth: shoulderWidth.toFixed(3),
      hipWidth: hipWidth.toFixed(3),
      torsoLength: torsoLength.toFixed(3),
      legLength: legLength.toFixed(3),
      bodyRatio: (shoulderWidth / hipWidth).toFixed(2),
      timestamp: Date.now()
    };
  };

  const startScanning = async () => {
    setScanning(true);
    setProgress(0);

    // Simulate scanning progress (demo mode)
    const simulateProgress = () => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          // Complete scan with simulated measurements
          setTimeout(() => {
            const mockMeasurements = {
              shoulderWidth: '0.445',
              hipWidth: '0.382',
              torsoLength: '0.523',
              legLength: '0.891',
              bodyRatio: '1.16',
              timestamp: Date.now()
            };
            onScanComplete(mockMeasurements);
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    };

    // Update progress every 200ms
    const interval = setInterval(simulateProgress, 200);
    
    // Clean up
    setTimeout(() => clearInterval(interval), 5000);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Webcam + Canvas overlay */}
      <div className="relative w-full max-w-2xl aspect-video">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-60"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user"
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Scanning overlay */}
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-4">
              <div className="text-cyan-400 text-xl font-light tracking-wider animate-pulse">
                Analyzing your body proportions...
              </div>
              <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-slate-400 text-sm">{progress}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      {!scanning && (
        <div className="mt-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-light text-white tracking-wide">
              Position yourself in front of the camera
            </h2>
            <p className="text-slate-400 text-lg">
              We adapt to you. Stand naturally and let us do the rest.
            </p>
          </div>

          <button
            onClick={startScanning}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            Start Body Scan
          </button>

          <div className="flex items-center justify-center gap-8 text-sm text-slate-500 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Camera Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              <span>AI Ready</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyScan;
