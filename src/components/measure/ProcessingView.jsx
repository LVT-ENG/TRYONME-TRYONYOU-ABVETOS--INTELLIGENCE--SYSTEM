import React from "react";

export default function ProcessingView({ progress = 0 }) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-center">
      <h3 className="font-semibold mb-2 text-white">Processing</h3>
      <p className="text-sm text-white/70 mb-4">
        Analysing body proportions...
      </p>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-white/50 mt-2">{progress}% complete</p>
    </div>
  );
}
