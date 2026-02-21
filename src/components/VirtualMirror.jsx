import React from 'react';
import Webcam from 'react-webcam';

const VirtualMirror = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999, fontFamily: 'sans-serif', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Webcam audio={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} videoConstraints={{ facingMode: "user" }} />
      </div>
      <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 1000 }}>
        <div style={{ color: '#C5A46D', fontWeight: '900', fontSize: '28px', letterSpacing: '5px', textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}>
          TRYONYOU
          <span style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', color: '#fff', marginTop: '5px' }}>INTELLIGENCE SYSTEM V9</span>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 500, pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '3px', background: 'linear-gradient(90deg, transparent, #C5A46D, transparent)', position: 'absolute', boxShadow: '0 0 35px #C5A46D', animation: 'ultraScan 3s infinite ease-in-out' }} />
      </div>
      <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button style={{ backgroundColor: '#C5A46D', color: '#000', fontWeight: '900', width: '320px', padding: '22px', borderRadius: '2px', border: 'none', fontSize: '14px', letterSpacing: '2px', cursor: 'pointer', boxShadow: '0 15px 40px rgba(0,0,0,0.7)' }}>MA SÉLECTION PARFAITE</button>
        <button style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', width: '320px', padding: '20px', borderRadius: '2px', border: '1px solid #C5A46D', backdropFilter: 'blur(15px)', fontSize: '12px', cursor: 'pointer' }}>RÉSERVER EN CABINE (O2O)</button>
      </div>
      <style>{`@keyframes ultraScan { 0% { top: 20%; opacity: 0.3; } 50% { top: 80%; opacity: 1; } 100% { top: 20%; opacity: 0.3; } }`}</style>
    </div>
  );
};
export default VirtualMirror;
