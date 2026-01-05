import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MagicMirror() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); // Default to English as per new instruction

  const handleScan = async () => {
    setLoading(true);
    try {
      const payload = {
        biometrics: { chest: 90, waist: 70 },
        event: "Evento"
      };

      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error connecting to Magic Mirror API", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{backgroundColor: '#121212', color: '#C5A46D', minHeight: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif'}}>
      <h1 style={{textTransform: 'uppercase', letterSpacing: '2px'}}>Galeries Lafayette Haussmann × TryOnYou</h1>

      {/* Shiny Aura Animation */}
      <motion.div
        animate={{ boxShadow: ["0px 0px 20px #C5A46D", "0px 0px 50px #C5A46D", "0px 0px 20px #C5A46D"] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{border: '2px solid #C5A46D', margin: '20px auto', width: '80%', minHeight: '500px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative'}}
      >

        {!result && !loading && (
           <p style={{fontSize: '1.2rem'}}>📸 Scanning /assets/vision/... <br/> 👗 Connecting to Lafayette Database...</p>
        )}

        {loading && (
          <p className="animate-pulse">⏳ Analyzing Biometrics...</p>
        )}

        {result && (
          <div style={{maxWidth: '600px', textAlign: 'center'}}>
            <img src={result.visual_asset} alt={result.product_name} style={{maxWidth: '100%', maxHeight: '400px', borderRadius: '10px', marginBottom: '20px'}} />
            <h2 style={{color: 'white', marginBottom: '10px'}}>{result.product_name}</h2>

            <div style={{backgroundColor: '#1A1A1A', padding: '20px', borderRadius: '10px', border: '1px solid #333'}}>
               <p style={{fontSize: '1.1rem', fontStyle: 'italic', color: '#F5EFE6'}}>
                 "{result.explanation[lang]}"
               </p>
            </div>

            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px'}}>
               <button onClick={() => setLang('en')} style={{opacity: lang === 'en' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: '1px solid #C5A46D', color: '#C5A46D', padding: '5px 10px'}}>EN</button>
               <button onClick={() => setLang('fr')} style={{opacity: lang === 'fr' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: '1px solid #C5A46D', color: '#C5A46D', padding: '5px 10px'}}>FR</button>
               <button onClick={() => setLang('es')} style={{opacity: lang === 'es' ? 1 : 0.5, cursor: 'pointer', background: 'none', border: '1px solid #C5A46D', color: '#C5A46D', padding: '5px 10px'}}>ES</button>
            </div>
          </div>
        )}

      </motion.div>

      {!result && (
        <button
          onClick={handleScan}
          disabled={loading}
          style={{padding: '15px 30px', backgroundColor: '#C5A46D', border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1, marginTop: '20px'}}
        >
          {loading ? 'ANALYSING...' : 'TRY LAFAYETTE LOOK'}
        </button>
      )}
    </div>
  );
}
