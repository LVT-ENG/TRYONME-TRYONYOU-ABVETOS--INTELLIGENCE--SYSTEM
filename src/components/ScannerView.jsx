import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Scan, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScannerView = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, scanning, success, error
  const [message, setMessage] = useState('Align your body within the frame');

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setMessage("Camera access needed for biometrics. Switching to Simulation Mode.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleScan = async () => {
    setScanning(true);
    setStatus('scanning');
    setMessage("Processing biometric data...");

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    try {
        // Call the backend API
        // In a real env, we would send the image frame. Here we trigger the process.
        // Use relative path for Vercel Serverless Function
        const response = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timestamp: Date.now() })
        });

        const data = await response.json();

        if (data.status === 'success' || data.height) { // Flexible check for mock data
             setTimeout(() => {
                setStatus('success');
                setMessage(data.message || "Scan Complete. Match Found.");
                setTimeout(() => navigate('/wardrobe-match'), 1500);
            }, 3000); // Wait for progress bar animation
        } else {
            throw new Error(data.error || "Scan failed");
        }

    } catch (error) {
        console.error("Scan error:", error);
        // Fallback for demo if backend not running locally in browser
        setTimeout(() => {
            setStatus('success');
            setMessage("Scan Complete (Offline Mode). Redirecting...");
            setTimeout(() => navigate('/wardrobe-match'), 1500);
        }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#D4AF37] flex flex-col items-center justify-center p-4">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 text-center z-10"
      >
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase">Biometric Scanner</h1>
        <p className="text-sm text-gray-400 mt-2">{message}</p>
      </motion.div>

      {/* Main Scanner UI */}
      <div className="relative w-full max-w-lg aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">

        {/* Video Feed */}
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover opacity-80"
        />

        {/* Overlay Grid */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full border-2 border-[#D4AF37]/20 rounded-3xl box-border relative">
                <div className="absolute top-1/4 left-0 w-full h-px bg-[#D4AF37]/20"></div>
                <div className="absolute top-2/4 left-0 w-full h-px bg-[#D4AF37]/20"></div>
                <div className="absolute top-3/4 left-0 w-full h-px bg-[#D4AF37]/20"></div>
                <div className="absolute left-1/2 top-0 h-full w-px bg-[#D4AF37]/20"></div>
            </div>
        </div>

        {/* Scanning Beam */}
        {scanning && status === 'scanning' && (
            <motion.div
                className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
        )}

        {/* Status Overlay */}
        {status === 'success' && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl text-white font-light tracking-widest">COMPLETE</h2>
            </div>
        )}

      </div>

      {/* Controls */}
      <div className="mt-8 w-full max-w-lg">
        {status === 'idle' && (
            <button
                onClick={handleScan}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full hover:bg-[#B59020] transition-colors flex items-center justify-center gap-2"
            >
                <Scan size={20} />
                Start Scan
            </button>
        )}

        {status === 'scanning' && (
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <motion.div
                    className="h-full bg-[#D4AF37]"
                    style={{ width: `${progress}%` }}
                />
            </div>
        )}
      </div>

    </div>
  );
};

export default ScannerView;
