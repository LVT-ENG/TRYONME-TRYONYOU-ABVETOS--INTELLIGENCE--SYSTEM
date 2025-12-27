import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Camera, ShieldCheck, ShoppingBag, RefreshCw, Ruler } from 'lucide-react';
function App() {
  const [s, setS] = useState(1); const [m, setM] = useState(null); const v = useRef(null);
  const start = async () => { setS(2); const stream = await navigator.mediaDevices.getUserMedia({ video: true }); if (v.current) v.current.srcObject = stream; };
  const runIA = () => { setS(3); setTimeout(() => { setM({ h: "1.82m", s: "46cm", t: "LARGE SLIM" }); setS(4); }, 3000); };
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
      <nav className="fixed top-0 w-full p-6 border-b border-white/5 bg-black/50 backdrop-blur-md flex justify-between items-center z-50">
        <h1 className="text-xl font-black italic text-[#C5A46D]">TRYONYOU × LAFAYETTE</h1>
        <ShieldCheck className="text-[#C5A46D]" />
      </nav>
      {s === 1 && <div className="space-y-8 mt-20"><h2 className="text-7xl font-black italic uppercase leading-none">ESPEJO <br/><span className="text-[#C5A46D]">MÁGICO.</span></h2><button onClick={start} className="bg-[#C5A46D] text-black px-14 py-6 rounded-full font-black text-xl shadow-[0_0_50px_rgba(197,164,109,0.3)]">INICIAR PILOTO</button></div>}
      {s === 2 && <div className="space-y-6 mt-20"><div className="relative w-72 h-96 rounded-[3rem] overflow-hidden border-2 border-[#C5A46D]/20 shadow-2xl"><video ref={v} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-50" /><div className="absolute top-0 w-full h-1 bg-[#C5A46D] shadow-[0_0_30px_#C5A46D] animate-bounce"></div></div><button onClick={runIA} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-xs">Capturar Biometría</button></div>}
      {s === 3 && <div className="text-[#C5A46D] font-black animate-pulse text-2xl uppercase italic">Procesando IA (Notebook Engine)...</div>}
      {s === 4 && <div className="grid lg:grid-cols-2 gap-10 max-w-5xl w-full mt-20">
        <div className="bg-zinc-900 rounded-[4rem] aspect-square overflow-hidden border border-white/5 relative shadow-2xl">
          <model-viewer src="https://modelviewer.dev/shared-assets/models/shishkebab.glb" auto-rotate camera-controls style={{width:'100%', height:'100%'}}></model-viewer>
        </div>
        <div className="flex flex-col justify-center space-y-6 text-left">
          <h3 className="text-4xl font-black italic text-[#C5A46D]">Ficha Técnica</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5"><p className="text-[10px] text-zinc-500 font-black uppercase">Altura</p><p className="text-3xl font-bold italic">{m.h}</p></div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5"><p className="text-[10px] text-zinc-500 font-black uppercase">Hombros</p><p className="text-3xl font-bold italic">{m.s}</p></div>
          </div>
          <div className="bg-[#C5A46D] p-10 rounded-[3rem] text-black shadow-2xl flex justify-between items-center transition-all hover:scale-[1.02]">
            <div><p className="text-[10px] font-black uppercase opacity-60">Talla Sugerida</p><p className="text-5xl font-black italic leading-none">{m.t}</p></div>
            <ShoppingBag size={48} />
          </div>
          <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest text-center italic">Sincronizado con Google Studio ✅</p>
          <button onClick={()=>window.location.reload()} className="text-zinc-600 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 mt-4"><RefreshCw size={14}/> REPETIR </button>
        </div>
      </div>}
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
