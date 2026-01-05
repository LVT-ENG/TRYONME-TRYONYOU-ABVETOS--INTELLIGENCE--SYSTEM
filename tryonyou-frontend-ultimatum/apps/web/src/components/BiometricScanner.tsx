import React, { useEffect, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BiometricScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("INITIALIZING BIOMETRICS...");
  const navigate = useNavigate();

  // Use environment variable for backend URL, default to localhost
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        activeStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatus("ULTIMATUM V2.5: SCANNING ACTIVE");
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setStatus("CAMERA SENSOR BLOCKED - USE UPLOAD");
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setStatus(`PROCESSING FILE: ${file.name.toUpperCase()}`);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${BACKEND_URL}/api/scan/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Metrics:", data.metrics);
            // Simulate navigation delay for UX
             setTimeout(() => {
                navigate('/fit', { state: {
                  metrics: data.metrics,
                  mockup: data.mockup_url,
                  product: data.product_url
                } });
              }, 1000);
        } else {
             setStatus("ERROR PROCESSING FILE");
        }

      } catch (error) {
          console.error("Upload error:", error);
          setStatus("CONNECTION ERROR");
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 150px rgba(197, 164, 109, 0.1)' }} />

      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover opacity-60 filter grayscale contrast-125"
      />

      {/* Scanning Animation */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[var(--gold)] shadow-[0_0_15px_var(--gold)] z-20 animate-scan" />

      {/* Status & Controls */}
      <div className="absolute bottom-10 w-full text-center z-30 flex flex-col items-center gap-4">
        <p className="text-[var(--gold)] font-mono tracking-[4px] text-xs m-0">
          {status}
        </p>

        <div className="w-48 h-[1px] bg-[var(--gold)] opacity-50" />

        {/* Upload Button Fallback/Primary */}
        <div className="flex gap-4">
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all duration-300 font-mono text-xs tracking-widest uppercase"
            >
                <Upload size={14} />
                Upload Photo
            </button>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
            />
        </div>

        <p className="text-[var(--bone)] font-light text-[9px] tracking-[2px] mt-2 opacity-80">
          TRY ON ME // SEAT 102 ENGINE
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BiometricScanner;
