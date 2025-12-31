import React, { useState } from 'react';

const content = {
  es: { title: "CENTRO DE INVERSIÓN", stats: "Reducción de devoluciones: 30%", button: "Ver Pitch Deck" },
  en: { title: "INVESTOR HUB", stats: "Return reduction: 30%", button: "View Pitch Deck" },
  fr: { title: "CENTRE D'INVESTISSEMENT", stats: "Réduction des retours: 30%", button: "Voir le Pitch Deck" }
};

export default function Investors() {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-20 flex flex-col items-center justify-center">
      <div className="flex gap-4 mb-10">
        {['es', 'en', 'fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`uppercase text-xs tracking-widest ${lang === l ? 'text-[#C5A46D]' : 'opacity-40'}`}>{l}</button>
        ))}
      </div>
      <h1 className="text-8xl font-black italic mb-4 tracking-tighter text-center">{t.title}</h1>
      <p className="gold-text text-2xl font-light mb-12 italic">{t.stats}</p>
      <div className="grid grid-cols-3 gap-8 w-full max-w-5xl mb-20">
        <div className="border border-zinc-800 p-8 rounded-3xl text-center">
          <span className="block opacity-40 text-[10px] uppercase mb-2">Market</span>
          <span className="text-2xl font-bold">Fashion Tech</span>
        </div>
        <div className="border border-zinc-800 p-8 rounded-3xl text-center bg-zinc-900">
          <span className="block opacity-40 text-[10px] uppercase mb-2">Pilot</span>
          <span className="text-2xl font-bold italic">Lafayette, Paris</span>
        </div>
        <div className="border border-zinc-800 p-8 rounded-3xl text-center">
          <span className="block opacity-40 text-[10px] uppercase mb-2">Core</span>
          <span className="text-2xl font-bold">53 AI Agents</span>
        </div>
      </div>
      <button className="border border-[#C5A46D] px-16 py-6 gold-text uppercase tracking-[0.4em] hover:bg-[#C5A46D] hover:text-black transition-all">{t.button}</button>
    </div>
  );
}
