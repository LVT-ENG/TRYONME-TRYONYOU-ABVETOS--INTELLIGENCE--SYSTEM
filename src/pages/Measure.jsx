import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScanView from "../components/measure/ScanView";
import MeasureFlow from "../components/measure/MeasureFlow";
import ProcessingView from "../components/measure/ProcessingView";

export default function Measure() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => nav("/demo"), 500);
            return 100;
          }
          return p + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step, nav]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-2 text-white">TRYONYOU</h1>
      <p className="text-white/60 mb-8">
        Real Measure - Real Fit - Fashion Tech
      </p>

      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-all ${
              step >= s ? "bg-blue-500" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-md space-y-6">
        {step === 0 && <ScanView />}
        {step === 1 && <MeasureFlow />}
        {step === 2 && <ProcessingView progress={progress} />}
      </div>

      {step < 2 && (
        <button
          onClick={() => setStep((s) => s + 1)}
          className="mt-8 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-white/90 transition-all"
        >
          {step === 0 ? "Start Measuring" : "Process Results"}
        </button>
      )}

      <p className="mt-8 text-xs text-white/40">
        No camera access required for demo
      </p>
    </div>
  );
}
