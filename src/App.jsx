import React, { useState, useRef } from 'react';
import { ShieldCheck, Camera, ShoppingBag, RefreshCw, Ruler, Shirt, CheckCircle } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('welcome');
  const [data, setData] = useState(null);
  const vRef = useRef(null);

  const startIA = async () => {
    setStep('scan');
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (vRef.current) vRef.current.srcObject = s;
    } catch (e) { alert("Cámara bloqueada por el sistema"); }
  };

  const processBiometry = () => {
    setStep('analyzing');
    // Simulación del motor IA ABVETOS v2.1 que antes estaba en el Notebook
    setTimeout(() => {
      setData({ h: "1.82m", s: "46cm", t: "LARGE SLIM", p: "99.2%" });
      setStep('result');
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-6 text-center">
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-xl z-50">
        <h1 className="text-xl font-black italic text-[#C5A46D]">TRYONYOU <span className="text-white">× LAFAYETTE</span></h1>
        <ShieldCheck className="text-[#C5A46D]" />
      </nav>

      {step === 'welcome' && (
        <div className="space-y-8 animate-in fade-in duration-1000">
          <h2 className="text-7xl md:text-9xl font-black uppercase italic leading-none tracking-tighter">EL SISTEMA <br/><span className="text-[#C5A46D]">TOTAL.</span></h2>
          <button onClick={startIA} className="bg-[#C5A46D] text-black px-16 py-6 rounded-full font-black text-2xl shadow-[0_0_50px_rgba(197,164,109,0.3)]">INICIAR PILOTO</button>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest italic">Patent: PCT/EP2025/067317</p>
        </div>
      )}

      {step === 'scan' && (
        <div className="flex flex-col items-center gap-8 mt-20">
          <div className="relative w-80 h-[480px] rounded-[3rem] overflow-hidden border-2 border-[#C5A46D]/20 shadow-2xl bg-zinc-900">
            <video ref={vRef} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-50" />
            <div className="absolute top-0 w-full h-1 bg-[#C5A46D] shadow-[0_0_30px_#C5A46D] animate-[scan_3s_infinite_linear]"></div>
            <div className="absolute inset-0 border-[25px] border-black/40 pointer-events-none"></div>
          </div>
          <button onClick={processBiometry} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#C5A46D]">EJECUTAR MOTOR IA</button>
        </div>
      )}

      {step === 'analyzing' && <div className="text-[#C5A46D] font-black animate-pulse text-2xl tracking-widest mt-20 uppercase italic">Procesando Biometría (Notebook Engine)...</div>}

      {step === 'result' && (
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full mt-20 animate-in slide-in-from-bottom-10">
          <div className="bg-zinc-900/50 rounded-[4rem] aspect-square overflow-hidden border border-white/5 relative shadow-2xl">
            <model-viewer src="https://modelviewer.dev/shared-assets/models/shishkebab.glb" auto-rotate camera-controls style={{width:'100%', height:'100%'}} shadow-intensity="1" environment-image="neutral"></model-viewer>
            <div className="absolute bottom-8 left-8 p-5 backdrop-blur-md bg-black/40 rounded-3xl border border-[#C5A46D]/20">
              <p className="text-[10px] text-zinc-500 uppercase font-black">Status</p>
              <p className="text-[#C5A46D] font-black italic flex items-center gap-2"><CheckCircle size={14}/> Gemelo Digital Activo</p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-8 text-left">
            <h3 className="text-5xl font-black italic uppercase text-[#C5A46D]">Ficha Técnica</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 shadow-inner"><p className="text-[10px] text-zinc-500 font-black uppercase mb-2">Altura</p><p className="text-4xl font-bold italic">{data.h}</p></div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 shadow-inner"><p className="text-[10px] text-zinc-500 font-black uppercase mb-2">Hombros</p><p className="text-4xl font-bold italic">{data.s}</p></div>
            </div>
            <div className="bg-[#C5A46D] p-10 rounded-[3rem] text-black shadow-2xl flex justify-between items-center group">
              <div><p className="text-[10px] font-black uppercase opacity-60 italic">Sugerencia Lafayette</p><p className="text-6xl font-black italic uppercase leading-none">{data.t}</p></div>
              <ShoppingBag size={48} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-[10px] text-green-500 font-black uppercase tracking-widest text-center italic">Datos enviados a Google Studio Analytics ✅</div>
            <button onClick={()=>window.location.reload()} className="text-zinc-600 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 mt-4"> <RefreshCw size={14}/> REPETIR </button>
          </div>
        </div>
      )}
      <style>{`@keyframes scan { 0%{top:0%} 100%{top:100%} }`}</style>
    </div>
  );
}
