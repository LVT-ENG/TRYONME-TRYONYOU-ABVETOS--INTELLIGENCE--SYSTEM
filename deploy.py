import React, { useEffect, useState } from 'react';
import { ScanLine, Ruler } from 'lucide-react';

export const ProcessingView = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  const steps = [
    "Analyse anatomique du corps (face, profil, dos)…",
    "Calcul des proportions corporelles réelles…",
    "Génération de l’avatar morphologique…",
    "Simulation d’ajustement des vêtements…"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 1100);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[420px] px-4">
      
      {/* Scanner / Measurement visual */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-rose-500">
          <ScanLine size={42} className="animate-pulse" />
        </div>
      </div>

      {/* Headline */}
      <h3 className="text-2xl font-semibold text-slate-800 mb-1 text-center">
        Mesure corporelle en cours
      </h3>

      <p className="text-sm text-slate-500 mb-6 text-center max-w-md">
        Nous analysons votre morphologie réelle pour garantir un ajustement précis.
      </p>

      {/* Step text */}
      <div className="h-8 mb-6 overflow-hidden relative w-full max-w-md text-center">
        {steps.map((step, idx) => (
          <p
            key={idx}
            className={`absolute w-full transition-all duration-500 text-slate-600 font-medium ${
              idx === currentStep
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {step}
          </p>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 font-medium">
        <Ruler size={14} />
        <span>{progress}% — analyse morphologique</span>
      </div>
    </div>
  );
};

