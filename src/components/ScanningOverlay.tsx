import React, { useState, useEffect } from 'react';

/**
 * ScanningOverlay Component
 *
 * Handles the visual scanning animation (moving line and SVG overlay).
 * Isolating this logic prevents the parent component (PilotExperience)
 * from re-rendering every 50ms during the scan phase.
 */
const ScanningOverlay = () => {
  const [scanningProgress, setScanningProgress] = useState(0);

  useEffect(() => {
    // Animation loop: Updates progress every 50ms
    const interval = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div
        className="absolute w-full h-[1px] bg-[#C5A46D] shadow-[0_0_15px_#C5A46D]"
        style={{ top: `${scanningProgress}%`, transition: 'top 0.1s linear' }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
         <svg width="200" height="400" viewBox="0 0 100 200" fill="none" stroke="#C5A46D" strokeWidth="0.5">
          <path d="M50 20 C60 20 70 30 70 50 L75 100 L70 180 M30 50 L25 100 L30 180" />
        </svg>
      </div>
    </div>
  );
};

export default ScanningOverlay;
