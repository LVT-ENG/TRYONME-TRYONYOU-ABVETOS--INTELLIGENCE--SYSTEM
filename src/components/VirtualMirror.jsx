import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';

const VirtualMirror = () => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Divineo V7 Palette
  const colors = {
    anthracite: '#1A1A1A', // Strict V7 Anthracite
    gold: '#D4AF37',       // Strict V7 Gold
    peacock: '#006D77',    // Matches global.css var(--peacock)
    bone: '#F5EFE6'        // Matches global.css var(--bone)
  };

  const handleUserMedia = useCallback(() => {
    setPermissionGranted(true);
    // Start scanning simulation once camera is ready
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2; // ~50 steps * 60ms = 3000ms = 3s
      if (progress >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setIsScanning(false);
        setScanComplete(true);
      } else {
        setScanProgress(progress);
      }
    }, 60);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden flex flex-col items-center justify-center">
      {/* Background/Loader State */}
      {!permissionGranted && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-[#D4AF37]">
          <p className="animate-pulse text-xl font-light tracking-widest">INITIALIZING SENSORS...</p>
        </div>
      )}

      {/* Camera Feed */}
      <Webcam
        ref={webcamRef}
        audio={false}
        onUserMedia={handleUserMedia}
        className="absolute inset-0 w-full h-full object-cover z-0"
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }}
      />

      {/* Overlay - Biometric Scan UI */}
      {/* Crucial: You must overlay the asset public/assets/ui/biometric_scan_ui.png on top of the video feed. */}
      {permissionGranted && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img
            src="/assets/ui/biometric_scan_ui.png"
            alt="Biometric Scan Interface"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}

      {/* Scanning UI Layer */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">

        {/* Scanning State */}
        <AnimatePresence>
          {isScanning && permissionGranted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center w-full max-w-md"
            >
              <h2
                className="text-2xl font-light tracking-[0.2em] mb-4"
                style={{ color: colors.gold, textShadow: '0 0 10px rgba(197, 164, 109, 0.5)' }}
              >
                SCANNING...
              </h2>

              {/* Progress Bar Container */}
              <div className="w-64 h-1 bg-black/50 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full overflow-hidden">
                {/* Progress Fill */}
                <motion.div
                  className="h-full bg-[#D4AF37]"
                  style={{ width: `${scanProgress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <p className="mt-2 text-xs text-[#F5EFE6]/70 font-mono tracking-widest">
                ANALYSING BIOMETRIC DATA
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success State */}
        <AnimatePresence>
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center bg-black/60 backdrop-blur-md p-8 rounded-lg border border-[#D4AF37]/50"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 text-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-light tracking-[0.15em] text-[#F5EFE6] mb-2">
                SCAN COMPLETE
              </h2>
              <p className="text-[#D4AF37] font-mono text-sm tracking-wider uppercase">
                Measurements Acquired
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Corners (Divineo Style) */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] opacity-50 z-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37] opacity-50 z-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37] opacity-50 z-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] opacity-50 z-20" />

    </div>
  );
};

export default VirtualMirror;
