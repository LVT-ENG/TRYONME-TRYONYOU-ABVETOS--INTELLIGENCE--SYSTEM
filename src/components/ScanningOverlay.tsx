import React from 'react';

// Optimized ScanningOverlay using CSS Keyframes instead of JS interval
// This prevents the parent component from re-rendering every 50ms during the scan.
const ScanningOverlay = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes scan-line {
            0% { top: 0%; }
            100% { top: 100%; }
          }
          .scan-animation {
            animation: scan-line 5s linear forwards;
          }
        `}
      </style>
      <div
        className="absolute w-full h-[1px] bg-[#C5A46D] shadow-[0_0_15px_#C5A46D] scan-animation"
      ></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
         <svg width="200" height="400" viewBox="0 0 100 200" fill="none" stroke="#C5A46D" strokeWidth="0.5">
          <path d="M50 20 C60 20 70 30 70 50 L75 100 L70 180 M30 50 L25 100 L30 180" />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(ScanningOverlay);
