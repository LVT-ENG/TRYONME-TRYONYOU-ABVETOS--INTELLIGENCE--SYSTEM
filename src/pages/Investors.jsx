import React, { useState } from 'react';

const content = {
  fr: { title: "PARTENARIAT STRATÉGIQUE", stats: "Réduction des retours: 30%", button: "Proposition Technique" },
  en: { title: "STRATEGIC PARTNERSHIP", stats: "Return reduction: 30%", button: "Technical Proposal" },
  es: { title: "ALIANZA ESTRATÉGICA", stats: "Reducción de devoluciones: 30%", button: "Propuesta Técnica" }
};

export default function Investors() {
  const [lang, setLang] = useState('fr');
  const t = content[lang] || content['en'];

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        {['es', 'en', 'fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ color: lang === l ? '#C5A46D' : '#666', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '2px' }}>{l}</button>
        ))}
      </div>
      <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic', textAlign: 'center', margin: '0', letterSpacing: '-2px' }}>{t.title}</h1>
      <p style={{ color: '#C5A46D', fontSize: '1.5rem', marginTop: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>{t.stats}</p>
      <div style={{ marginTop: '50px', padding: '30px', border: '1px solid #333', borderRadius: '20px', textAlign: 'center', maxWidth: '500px' }}>
        <p style={{ opacity: 0.5, fontSize: '14px' }}>EXCLUSIVEMENT POUR</p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>GALERIES LAFAYETTE</h2>
      </div>
    </div>
  );
}
