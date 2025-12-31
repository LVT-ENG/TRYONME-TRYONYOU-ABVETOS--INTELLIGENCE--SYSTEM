import React, { useState } from 'react';

const content = {
  es: { title: "ALIANZA ESTRATÉGICA", subtitle: "TRYONYOU + GALERIES LAFAYETTE", stats: "Precisión biométrica milimétrica", button: "Propuesta Técnica" },
  en: { title: "STRATEGIC PARTNERSHIP", subtitle: "TRYONYOU + GALERIES LAFAYETTE", stats: "Millimetric biometric precision", button: "Technical Proposal" },
  fr: { title: "PARTENARIAT STRATÉGIQUE", subtitle: "TRYONYOU + GALERIES LAFAYETTE", stats: "Précision biométrique millimétrique", button: "Proposition Technique" }
};

export default function Investors() {
  const [lang, setLang] = useState('fr'); // Default a francés por cortesía al partner
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 flex flex-col items-center justify-center font-light">
      {/* Selector de Idioma */}
      <div className="absolute top-10 right-10 flex gap-6">
        {['es', 'en', 'fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`uppercase text-[10px] tracking-[0.3em] ${lang === l ? 'text-[#C5A46D] font-bold' : 'opacity-30'}`}>{l}</button>
        ))}
      </div>

      {/* Brand Header */}
      <div className="mb-20 flex flex-col items-center">
        <div className="text-[10px] tracking-[0.6em] uppercase opacity-40 mb-8 italic">Exclusively for</div>
        <div className="flex items-center gap-12 opacity-80">
          <h2 className="text-4xl font-black italic tracking-tighter">TRYONYOU</h2>
          <div className="w-[1px] h-12 bg-zinc-800"></div>
          <div className="text-2xl font-serif italic tracking-widest uppercase">Galeries Lafayette</div>
        </div>
      </div>

      {/* Main UI */}
      <h1 className="text-7xl font-black italic mb-4 tracking-tighter text-center max-w-4xl">{t.title}</h1>
      <p className="gold-text text-xl tracking-[0.4em] uppercase mb-20 italic">{t.stats}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 shadow-2xl bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden w-full max-w-6xl">
        <div className="p-12 text-center border-r border-zinc-800">
          <span className="block opacity-40 text-[10px] uppercase tracking-[0.3em] mb-4">Location</span>
          <span className="text-2xl font-bold">Paris, FR</span>
        </div>
        <div className="p-12 text-center border-r border-zinc-800 bg-[#0a0a0a]">
          <span className="block gold-text text-[10px] uppercase tracking-[0.3em] mb-4">Integration</span>
          <span className="text-2xl font-bold">ABVET Engine v3.0</span>
        </div>
        <div className="p-12 text-center">
          <span className="block opacity-40 text-[10px] uppercase tracking-[0.3em] mb-4">Target</span>
          <span className="text-2xl font-bold">Zero-Return Policy</span>
        </div>
      </div>

      <button className="mt-20 border-b border-[#C5A46D] pb-2 gold-text uppercase text-xs tracking-[0.5em] hover:opacity-50 transition-all italic">
        {t.button}
      </button>
    </div>
  );
}
