import React, { useEffect, useState } from 'react';

export default function App() {
  const [session, setSession] = useState("LAFAYETTE_READY");

  return (
    <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'monospace' }}>
      {/* HERO SECTION CON TU VÍDEO */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
          <source src="/assets/hero/hero_main.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', color: '#D3B26A', letterSpacing: '15px' }}>TRYONYOU</h1>
          <p>PATENT: PCT/EP2025/067317 | SESSION: {session}</p>
        </div>
      </section>

      {/* EL ESPEJO MÁGICO (FORCED VISIBILITY) */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: '#0a0a0a' }}>
        <h2 style={{ color: '#D3B26A' }}>PAU LE PAON: BIOMETRIC MIRROR</h2>
        <div style={{ border: '1px solid #333', padding: '50px', display: 'inline-block', borderRadius: '5px' }}>
          <img src="/assets/vision/mi_foto_v7.png" alt="Avatar Biométrico" style={{ maxWidth: '300px' }} />
          <p style={{ marginTop: '20px', opacity: 0.7 }}>Ajuste detectado: 99.7% Precisión</p>
        </div>
      </section>
    </div>
  );
}
