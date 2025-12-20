import React from "react";

export default function ScanView() {
  return (
    <div className="p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20">
      <h3 className="font-semibold mb-2 text-white">Scan Guidance</h3>
      <p className="text-sm text-white/70">
        Place your phone vertically and stand 2m away.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-white/60">Camera ready</span>
      </div>
    </div>
  );
}
