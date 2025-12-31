import React, { useState } from 'react';

const content = {
  es: { 
    title: "SOLUCIÓN DE LOGÍSTICA INTELIGENTE", 
    problem: "El reto de los 1,000 pantalones",
    problemDesc: "Encontrar el ajuste perfecto entre miles de referencias genera abandono y devoluciones masivas.",
    loss: "Coste Devoluciones", 
    save: "Ahorro Estimado", 
    time: "Eficiencia",
    button: "Ver Propuesta Técnica" 
  },
  en: { 
    title: "SMART LOGISTICS SOLUTION", 
    problem: "The 1,000 Pants Challenge",
    problemDesc: "Finding the perfect fit among thousands of SKUs leads to cart abandonment and massive returns.",
    loss: "Return Costs", 
    save: "Estimated Savings", 
    time: "Efficiency",
    button: "View Technical Proposal" 
  },
  fr: { 
    title: "SOLUTION LOGISTIQUE INTELLIGENTE", 
    problem: "Le Défi des 1 000 Pantalons",
    problemDesc: "Trouver la coupe parfaite parmi des milliers de références entraîne des abandons et des retours massifs.",
    loss: "Coût des Retours", 
    save: "Économies Estimées", 
    time: "Efficacité",
    button: "Voir la Proposition Technique" 
  }
};

export default function Investors() {
  const [lang, setLang] = useState('fr');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 flex flex-col items-center font-light overflow-x-hidden">
      {/* Selector Idioma */}
      <div className="w-full max-w-6xl flex justify-end gap-6 mb-10">
        {['es', 'en', 'fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`uppercase text-[10px] tracking-[0.3em] ${lang === l ? 'text-[#C5A46D] font-bold' : 'opacity-30'}`}>{l}</button>
        ))}
      </div>

      <div className="max-w-4xl text-center mb-16">
        <h1 className="text-6xl font-black italic mb-6 tracking-tighter uppercase">{t.title}</h1>
        <div className="inline-block border border-[#C5A46D] px-4 py-1 rounded-full mb-8">
            <span className="text-[#C5A46D] text-[10px] uppercase tracking-[0.4em]">Zero-Return Policy 2026</span>
        </div>
      </div>

      {/* Sección del Problema: Pantalones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mb-20 items-center">
        <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-zinc-800">
            <h2 className="text-[#C5A46D] text-xs uppercase tracking-[0.3em] mb-4">{t.problem}</h2>
            <p className="text-2xl font-bold mb-4 italic">"Millones perdidos en logística inversa."</p>
            <p className="opacity-60 leading-relaxed">{t.problemDesc}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl flex justify-between items-center">
                <span className="text-red-500 uppercase text-[10px] tracking-widest">{t.loss}</span>
                <span className="text-2xl font-black italic">-30% EBITDA</span>
            </div>
            <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-2xl flex justify-between items-center">
                <span className="text-green-500 uppercase text-[10px] tracking-widest">{t.save}</span>
                <span className="text-2xl font-black italic">+12% Profit</span>
            </div>
            <div className="bg-zinc-800/50 p-6 rounded-2xl flex justify-between items-center">
                <span className="opacity-40 uppercase text-[10px] tracking-widest">{t.time}</span>
                <span className="text-2xl font-black italic">x5 Speed</span>
            </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto pt-20 flex flex-col items-center opacity-40">
        <div className="flex items-center gap-8 mb-4">
            <span className="text-sm font-black italic tracking-tighter uppercase">TryOnYou</span>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <span className="text-sm font-serif italic tracking-widest uppercase text-[10px]">Galeries Lafayette Pilot</span>
        </div>
        <p className="text-[8px] tracking-[0.6em] uppercase">Powered by Pau AI & 53 Intelligent Agents</p>
      </div>
    </div>
  );
}
