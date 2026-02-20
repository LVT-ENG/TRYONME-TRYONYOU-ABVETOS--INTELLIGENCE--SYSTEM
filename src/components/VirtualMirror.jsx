import React, { useEffect, useRef, useState } from 'react';

/**
 * VirtualMirror – "Espejo Mágico" (Lafayette Pilot)
 *
 * Activates the device camera in a privacy-first mode:
 * – Live video feed only, no screenshots or image storage.
 * – Style: gold border (#C5A46D), Anthracite background (#141619).
 */
export default function VirtualMirror() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Request camera access – video only, no audio (privacy)
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        setCameraError(
          err.name === 'NotAllowedError'
            ? 'Camera access denied. Please grant camera permissions to use this feature.'
            : err.message || 'Unable to access camera. Please check your device settings.',
        );
      });

    // Cleanup: stop all tracks when unmounting (no frames are retained)
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-md mx-auto overflow-hidden rounded"
      style={{
        background: '#141619',
        border: '2px solid #C5A46D',
        boxShadow: '0 0 30px rgba(197,164,109,0.25)',
        aspectRatio: '3/4',
      }}
    >
      {/* Video Feed */}
      {!cameraError ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover opacity-90"
          style={{ transform: 'scaleX(-1)' }} // mirror effect
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center px-6">
          <p className="text-[#C5A46D] text-xs uppercase tracking-widest">{cameraError}</p>
        </div>
      )}

      {/* Overlay UI: Pau Agent */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none">
        {/* Pau Agent avatar */}
        <div
          className="mb-4 rounded-full flex items-center justify-center"
          style={{
            width: 56,
            height: 56,
            border: '2px solid #C5A46D',
            background: 'rgba(20,22,25,0.75)',
            boxShadow: '0 0 12px rgba(197,164,109,0.4)',
          }}
        >
          {/* Stylised "Pau" initial when no image asset is present */}
          <span
            className="font-serif font-bold"
            style={{ color: '#C5A46D', fontSize: 22 }}
          >
            P
          </span>
        </div>

        {/* Status labels */}
        <p
          className={`text-xs uppercase tracking-[0.25em]${reducedMotion ? '' : ' animate-pulse'}`}
          style={{ color: '#C5A46D' }}
        >
          Escaneando Biometría...
        </p>
        <p
          className="mt-2 text-[10px] uppercase tracking-[0.35em]"
          style={{ color: 'rgba(240,240,240,0.6)' }}
        >
          PILOTO LAFAYETTE ACTIVO
        </p>
      </div>

      {/* Scanning line animation (reuses existing CSS keyframe) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute w-full h-[1px] animate-scan-line"
          style={{
            background: '#C5A46D',
            boxShadow: '0 0 12px #C5A46D',
          }}
        />
      </div>
    </div>
  );
}
