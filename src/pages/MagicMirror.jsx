import React, { useState, useEffect } from 'react';
import inventory from '../data/mock_inventory.json';

const translations = {
  es: { match: "TU AJUSTE PERFECTO", scanning: "Escaneando biometría...", result: "Prenda recomendada" },
  en: { match: "YOUR PERFECT FIT", scanning: "Scanning biometrics...", result: "Recommended garment" },
  fr: { match: "VOTRE COUPE PARFAITE", scanning: "Analyse biométrique...", result: "Vêtement recommandé" }
};

export default function MagicMirror() {
  const [lang, setLang] = useState('es');
  const [recommendation, setRecommendation] = useState(inventory[0]);
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-black italic gold-text mb-10 tracking-widest">{t.match}</h1>

      <div className="border-2 border-[#C5A46D] p-8 rounded-full mb-10 animate-pulse">
        <div className="w-64 h-64 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700">
           <span className="text-[10px] uppercase tracking-widest opacity-50">{t.scanning}</span>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 w-full max-w-md">
        <span className="text-[10px] text-[#C5A46D] uppercase">{t.result}</span>
        <h2 className="text-2xl font-bold mt-2">{recommendation.name}</h2>
        <p className="opacity-50 text-sm italic">{recommendation.brand} - Talla {recommendation.size}</p>
        <button className="mt-6 w-full bg-[#C5A46D] text-black font-bold py-3 rounded-lg hover:bg-white transition-all">
          COMPRAR AHORA
        </button>
      </div>
    </div>
  );
}
