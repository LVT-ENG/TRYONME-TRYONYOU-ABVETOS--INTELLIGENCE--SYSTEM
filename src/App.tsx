import React, { useState, useRef, useEffect } from 'react';
import { Camera, ShieldCheck, ShoppingBag, Ruler, BarChart3, ChevronRight, UserCheck, RefreshCw } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('welcome'); 
  const [metrics, setMetrics] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startAnalysis = async () => {
    setStep('scanning');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { alert("Activa la cámara para la biometría"); }

    // Simulación del Motor ABVETOS procesando la Nube de Puntos
    setTimeout(() => {
      setMetrics({
        altura: "1.82 m",
        hombros: "46 cm",
        pecho: "104 cm",
        cintura: "84 cm",
        talla: "L (Slim Fit)"
      });
      setStep('results');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE6] font-sans selection:bg-[#C5A46D]">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter italic">TRYONYOU <span className="text-[#C5A46D]">× LAFAYETTE</span></h1>
        <div className="flex items-center gap-4 text-[10px] font-bold text-[#C5A46D] border border-[#C5A46D]/20 px-4 py-2 rounded-full">
          <ShieldCheck size={14} /> PATENT: PCT/EP2025/067317
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-10">
        {step === 'welcome' && (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
            <h2 className="text-7xl font-black italic uppercase leading-none mb-6">Escáner<br/>Biométrico</h2>
            <p className="text-gray-500 text-xl mb-10 max-w-xl mx-auto italic">Triangulación milimétrica para el ajuste sastrero de Lafayette.</p>
            <button onClick={startAnalysis} className="bg-[#C5A46D] text-black px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(197,164,109,0.3)]">INICIAR ESCANEO 3D</button>
          </div>
        )}

        {step === 'scanning' && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[3rem] overflow-hidden border-4 border-[#C5A46D] shadow-2xl bg-gray-900">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-50" />
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A46D] shadow-[0_0_20px_#C5A46D] animate-[scan_3s_infinite_linear]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Camera size={48} className="text-[#C5A46D] animate-pulse mb-4" />
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-black text-[#C5A46D]">Extrayendo nube de puntos...</p>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && metrics && (
          <div className="grid lg:grid-cols-2 gap-12 animate-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white/5 rounded-[3rem] aspect-square flex items-center justify-center border border-white/10 relative overflow-hidden">
               <p className="text-[#C5A46D] font-black uppercase tracking-widest text-xs">Avatar 3D Generado</p>
               {/* Aquí se carga el modelo .glb de Lafayette */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#C5A46D]/10 to-transparent"></div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">Ficha Técnica</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(metrics).map(([key, val]) => key !== 'talla' && (
                  <div key={key} className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{key}</p>
                    <p className="text-2xl font-black">{val}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#C5A46D] p-8 rounded-[2.5rem] text-black flex justify-between items-center shadow-xl">
                <div>
                  <p className="font-bold text-[10px] uppercase opacity-60 italic">Sugerencia Lafayette</p>
                  <p className="text-5xl font-black italic uppercase leading-none">{metrics.talla}</p>
                </div>
                <ShoppingBag size={40} />
              </div>
              <button onClick={() => setStep('welcome')} className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors w-full">Reiniciar Bucle Ultimatum</button>
            </div>
          </div>
        )}
      </main>
      <style>{`@keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
    </div>
  );
}
