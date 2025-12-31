import React, { useState } from 'react';

const content = {
  fr: { 
    title: "PARTENARIAT STRATÉGIQUE", 
    problem: "Le Défi des 1 000 Pantalons",
    solution: "Précision Biométrique 99%",
    impact: "Impact Financier (Par 10k unités)",
    labels: ["Mesure", "Traditionnel", "TryOnYou", "Économies"],
    rows: [
      ["Taux de retour", "35%", "3.2%", "-90%"],
      ["Coût Logistique", "€150k", "€12k", "€138k"],
      ["Capital Immobilisé", "€450k", "€40k", "€410k"]
    ],
    button: "Télécharger l'Audit Complet" 
  },
  en: { 
    title: "STRATEGIC PARTNERSHIP", 
    problem: "The 1,000 Pants Challenge",
    solution: "99% Biometric Precision",
    impact: "Financial ROI (Per 10k units)",
    labels: ["Metric", "Traditional", "TryOnYou", "Savings"],
    rows: [
      ["Return Rate", "35%", "3.2%", "-90%"],
      ["Logistics Cost", "$150k", "$12k", "$138k"],
      ["Dead Inventory", "$450k", "$40k", "$410k"]
    ],
    button: "Download Full Audit" 
  },
  es: { 
    title: "ALIANZA ESTRATÉGICA", 
    problem: "El Reto de los 1,000 Pantalones",
    solution: "Precisión Biométrica 99%",
    impact: "ROI Financiero (Por 10k unidades)",
    labels: ["Métrica", "Tradicional", "TryOnYou", "Ahorro"],
    rows: [
      ["Tasa de retorno", "35%", "3.2%", "-90%"],
      ["Coste Logístico", "€150k", "€12k", "€138k"],
      ["Capital Muerto", "€450k", "€40k", "€410k"]
    ],
    button: "Descargar Auditoría" 
  }
};

export default function Investors() {
  const [lang, setLang] = useState('fr');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-light overflow-x-hidden">
      {/* Selector Idioma */}
      <div className="w-full max-w-7xl mx-auto flex justify-end gap-6 mb-12">
        {['es', 'en', 'fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`uppercase text-[10px] tracking-[0.3em] ${lang === l ? 'text-[#C5A46D] font-bold underline decoration-gold' : 'opacity-30'}`}>{l}</button>
        ))}
      </div>

      {/* Hero Narrative */}
      <div className="max-w-7xl mx-auto text-center mb-24">
        <h1 className="text-7xl font-black italic mb-4 tracking-tighter uppercase">{t.title}</h1>
        <p className="gold-text text-xl tracking-[0.5em] uppercase italic opacity-80">Galeries Lafayette • Technical Proposal 2026</p>
      </div>

      {/* ROI TABLE SECTION */}
      <div className="max-w-6xl mx-auto mb-32 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-12 shadow-2xl">
        <h2 className="text-3xl font-black italic mb-10 tracking-tight uppercase text-center">{t.impact}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                {t.labels.map(label => (
                  <th key={label} className="py-6 text-[10px] uppercase tracking-[0.3em] opacity-40">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800/50 hover:bg-white/5 transition-colors">
                  <td className="py-8 font-bold italic text-lg">{row[0]}</td>
                  <td className="py-8 opacity-60 line-through text-red-500/70">{row[1]}</td>
                  <td className="py-8 gold-text font-black text-xl">{row[2]}</td>
                  <td className="py-8">
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-xs font-bold">{row[3]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Branding Footer */}
      <div className="max-w-7xl mx-auto border-t border-zinc-800 pt-10 flex justify-between items-center opacity-30">
        <div className="flex items-center gap-6">
          <span className="text-xl font-black italic uppercase">TryOnYou</span>
          <div className="w-[1px] h-6 bg-zinc-700"></div>
          <span className="text-[10px] tracking-widest uppercase italic">Secure Enterprise Deployment</span>
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase">Powered by Pau AI System</p>
      </div>
    </div>
  );
}
