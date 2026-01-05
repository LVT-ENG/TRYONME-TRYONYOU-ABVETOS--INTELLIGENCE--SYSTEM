import React from 'react';
export default function MagicMirror() {
  return (
    <div style={{backgroundColor: '#121212', color: '#C5A46D', minHeight: '100vh', padding: '40px', textAlign: 'center'}}>
      <h1>✨ TRYONYOU: MAGIC MIRROR LIVE</h1>
      <div style={{border: '2px solid #C5A46D', margin: '20px auto', width: '80%', height: '500px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p>📸 Escaneando fotos de /assets/vision/... <br/> 👗 Conectando con Base de Datos Lafayette...</p>
      </div>
      <button style={{padding: '15px 30px', backgroundColor: '#C5A46D', border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer'}}>
        PROBAR LOOK DE LAFAYETTE
      </button>
    </div>
  );
}
