import React,{useState,useRef} from 'react';import ReactDOM from 'react-dom/client';import {Camera,ShieldCheck,ShoppingBag,RefreshCw} from 'lucide-react';
function App(){
const [s,setS]=useState(1);const [m,setM]=useState({});const v=useRef();
const start=async()=>{setS(2);const stream=await navigator.mediaDevices.getUserMedia({video:true});v.current.srcObject=stream;};
const scan=()=>{setS(3);setTimeout(()=>{setM({h:"1.82m",s:"46cm",t:"LARGE SLIM"});setS(4);},3000);};
return(
<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
<nav className="fixed top-0 w-full p-4 border-b border-white/10 bg-black/50 flex justify-between"><h1 className="text-[#C5A46D] font-bold italic">TRYONYOU × LAFAYETTE</h1><ShieldCheck className="text-[#C5A46D]"/></nav>
{s===1&&<div className="space-y-6"><h2 className="text-6xl font-black italic uppercase">ESPEJO MÁGICO</h2><button onClick={start} className="bg-[#C5A46D] text-black px-10 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(197,164,109,0.5)]">INICIAR IA</button></div>}
{s===2&&<div className="space-y-6"><div className="relative w-64 h-80 rounded-3xl overflow-hidden border border-[#C5A46D]"><video ref={v} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-50"/><div className="absolute top-0 w-full h-1 bg-[#C5A46D] animate-bounce"/></div><button onClick={scan} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-xs">Capturar Biometría</button></div>}
{s===3&&<div className="text-[#C5A46D] font-bold animate-pulse text-xl">PROCESANDO IA SARTORIAL...</div>}
{s===4&&<div className="grid lg:grid-cols-2 gap-8 w-full max-w-4xl"><div className="bg-zinc-900 rounded-3xl aspect-square border border-white/10 relative"><model-viewer src="https://modelviewer.dev/shared-assets/models/shishkebab.glb" auto-rotate camera-controls style={{width:'100%',height:'100%'}}/></div><div className="flex flex-col justify-center space-y-4 text-left"><h3 className="text-3xl font-black text-[#C5A46D] italic uppercase">Ficha Técnica</h3><div className="grid grid-cols-2 gap-2"><div className="bg-white/5 p-4 rounded-xl">Altura: {m.h}</div><div className="bg-white/5 p-4 rounded-xl">Hombros: {m.s}</div></div><div className="bg-[#C5A46D] p-6 rounded-2xl text-black flex justify-between items-center font-black"><div><p className="text-[10px] opacity-60">SUGERENCIA</p><p className="text-4xl italic leading-none">{m.t}</p></div><ShoppingBag size={32}/></div><p className="text-[8px] text-zinc-600 uppercase text-center">Sincronizado con Google Studio ✅</p><button onClick={()=>window.location.reload()} className="text-zinc-500 text-xs font-bold uppercase flex justify-center items-center gap-2 italic"> <RefreshCw size={12}/> REPETIR </button></div></div>}
</div>
);};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
