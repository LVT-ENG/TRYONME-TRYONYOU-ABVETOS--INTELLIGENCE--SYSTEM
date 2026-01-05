import React, { useState, useEffect } from 'react';
import SyncControl from '../components/SyncControl';
import { MagicMirror as MagicMirrorModule } from '../modules/Wardrobe/MagicMirror';
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
      <h1 className="text-4xl font-black italic gold-text mb-4 tracking-widest">TU AJUSTE PERFECTO</h1>
      <SyncControl />
      
      <div className="w-full h-[60vh] mb-8 border border-tryonyou-gold/30 rounded-xl overflow-hidden relative">
        <MagicMirrorModule active={true} />
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
