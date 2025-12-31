import React, { useState } from 'react';

const content = {
  fr: { 
    title: "PARTENARIAT STRATÉGIQUE", 
    problem: "Le Défi des 1 000 Pantalons",
    solution: "Précision Biométrique 99%",
    impact: "Réduction des Retours",
    button: "Voir Analyse Technique" 
  },
  en: { 
    title: "STRATEGIC PARTNERSHIP", 
    problem: "The 1,000 Pants Challenge",
    solution: "99% Biometric Precision",
    impact: "Return Reduction",
    button: "View Technical Analysis" 
  }
};

export default function Investors() {
  const [lang, setLang] = useState('fr');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-light">
      {/* Brand Header */}
      <div className="flex justify-between items-center mb-20 max-w-7xl mx-auto">
        <img src="/assets/brand/logo_peacock.png" className="w-16 grayscale hover:grayscale-0 transition-all" alt="Logo" />
        <div className="flex gap-4">
          {['en', 'fr'].map(l => (
            <button key={l} onClick={() => setLang(l)} className="uppercase text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100">{l}</button>
          ))}
        </div>
      </div>

      {/* The Pain Point Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto items-center mb-32">
        <div className="relative group">
          <img src="/assets/pitch/pants_mountain.jpg" className="rounded-3xl border border-zinc-800 opacity-60 group-hover:opacity-100 transition-all" />
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="bg-black/80 px-6 py-3 border border-red-500 text-red-500 text-xs uppercase tracking-[0.4em]">The Friction</span>
          </div>
        </div>
        <div>
          <h2 className="text-5xl font-black italic mb-6 tracking-tighter uppercase">{t.problem}</h2>
          <p className="text-xl opacity-60 leading-relaxed mb-8">
            Millions are lost in reverse logistics because customers cannot find their perfect fit among thousands of references. 
            TryOnYou eliminates the "Mountain of Choice" with a single biometric truth.
          </p>
          <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl flex justify-between">
             <span className="text-red-500 uppercase text-[10px] tracking-widest">Revenue Loss</span>
             <span className="text-2xl font-black italic">-30% EBITDA</span>
          </div>
        </div>
      </div>

      {/* The Solution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto items-center mb-32">
        <div className="order-2 lg:order-1">
          <h2 className="text-5xl font-black italic mb-6 tracking-tighter uppercase gold-text">{t.solution}</h2>
          <p className="text-xl opacity-60 leading-relaxed mb-8">
            Our Drape-Aware engine simulates fabric elasticity and recovery. We don't just measure the body; we measure the fit.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
               <p className="text-[10px] opacity-40 uppercase mb-2">Stretch Accuracy</p>
               <p className="text-3xl font-bold">99.2%</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
               <p className="text-[10px] opacity-40 uppercase mb-2">User Conversion</p>
               <p className="text-3xl font-bold">+24%</p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
           <img src="/assets/pitch/robotic_test.jpg" className="rounded-3xl border border-gold/30 shadow-[0_0_50px_rgba(197,164,109,0.1)]" />
        </div>
      </div>
    </div>
  );
}
