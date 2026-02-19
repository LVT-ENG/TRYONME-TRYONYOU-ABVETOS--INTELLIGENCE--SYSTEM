import React from 'react';

/**
 * ScanningOverlay Component
 *
 * Handles the visual scanning animation (moving line and SVG overlay).
 * Uses CSS keyframes for animation to eliminate JS main-thread blocking.
 */
const ScanningOverlay = React.memo(() => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="absolute w-full h-[1px] bg-[#C5A46D] shadow-[0_0_15px_#C5A46D] animate-scan-line"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
         <svg width="200" height="400" viewBox="0 0 100 200" fill="none" stroke="#C5A46D" strokeWidth="0.5">
          <path d="M50 20 C60 20 70 30 70 50 L75 100 L70 180 M30 50 L25 100 L30 180" />
        </svg>
      </div>
    </div>
  );
});

export default ScanningOverlay;
