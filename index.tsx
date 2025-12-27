import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Camera, ShieldCheck, ShoppingBag, Sparkles, Ruler, BarChart3, ChevronRight, UserCheck, Lock } from 'lucide-react';

/* 
  TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
  Patented Fashion Intelligence System | PCT/EP2025/067317
  Theme: Vogue Tech (Luxury Gold & Anthracite)
*/

const App = () => {
  const [activeModule, setActiveModule] = useState('hero');
  const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, processing, complete
  const videoRef = useRef(null);

  // Brand Palette [Source 281]
  const theme = {
    bg: '#141619',       // Anthracite Dark
    text: '#F5EFE6',     // Bone Light
    gold: '#D3B26A',     // Luxury Gold
    peacock: '#0E6B6B',  // Peacock Deep
    success: '#10b981'
  };

  // PAU Scanner Logic [Source 14, 64]
  const startScan = async () => {
    setScanStatus('scanning');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      // Simulate Biometric Analysis (3s)
      setTimeout(() => {
        setScanStatus('processing');
        if (videoRef.current) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
        
        // Simulate Data Processing (2s)
        setTimeout(() => setScanStatus('complete'), 2000);
      }, 3000);
    } catch (err) {
      alert("Camera access required for PAU biometric profiling.");
      setScanStatus('idle');
    }
  };

  return (
    <div style={{ 
      backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', 
      fontFamily: '"Poppins", sans-serif', overflowX: 'hidden' 
    }}>
      
      {/* --- HEADER --- */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles color={theme.gold} size={24} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>TRYONYOU</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#888' }}>
          <span>ABVETOS CORE</span>
          <span style={{ color: theme.gold }}>ONLINE</span>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      {activeModule === 'hero' && (
        <header style={{ 
          textAlign: 'center', padding: '6rem 1rem', 
          background: `radial-gradient(circle at 50% 50%, rgba(211, 178, 106, 0.05) 0%, ${theme.bg} 70%)` 
        }}>
          <div style={{ 
            display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px', 
            border: `1px solid ${theme.peacock}`, marginBottom: '2rem', fontSize: '0.8rem',
            color: theme.peacock, background: 'rgba(14, 107, 107, 0.1)'
          }}>
            PATENT PCT/EP2025/067317
          </div>
          
          <h1 style={{ 
            fontSize: '3.5rem', lineHeight: '1.1', maxWidth: '800px', margin: '0 auto 1.5rem',
            background: `linear-gradient(135deg, #fff 0%, ${theme.gold} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Dress according to<br/>how you feel.
          </h1>
          
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: '#999', fontSize: '1.1rem' }}>
            The first Emotional Fashion Intelligence ecosystem. Generate your digital twin, 
            get AI-curated looks, and pay with your eyes.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setActiveModule('scanner')}
              style={{ 
                background: `linear-gradient(135deg, ${theme.gold}, ${theme.peacock})`,
                border: 'none', padding: '1rem 2.5rem', borderRadius: '50px',
                color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: `0 10px 30px -10px ${theme.gold}`
              }}
            >
              <Camera size={20} /> Initialize PAU
            </button>
            
            <button style={{ 
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', 
              padding: '1rem 2.5rem', borderRadius: '50px', color: theme.text, 
              cursor: 'pointer' 
            }}>
              View Collection
            </button>
          </div>
        </header>
      )}

      {/* --- PAU SCANNER MODULE --- */}
      {activeModule === 'scanner' && (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
          
          {/* STAGE 1: IDLE */}
          {scanStatus === 'idle' && (
            <div style={{ border: '1px dashed #333', padding: '4rem', borderRadius: '20px' }}>
              <Ruler size={64} color={theme.peacock} style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '2rem' }}>Biometric Calibration</h2>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                We need to scan your measurements to generate your <b>LiveIt</b> manufacturing file.
              </p>
              <button 
                onClick={startScan}
                style={{ 
                  background: theme.text, color: theme.bg, border: 'none', 
                  padding: '1rem 3rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' 
                }}
              >
                Start Camera
              </button>
            </div>
          )}

          {/* STAGE 2: SCANNING */}
          {scanStatus === 'scanning' && (
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: `2px solid ${theme.gold}` }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <div style={{ width: '80%', height: '70%', border: '2px dashed rgba(255,255,255,0.8)', borderRadius: '150px' }}></div>
                <div style={{ position: 'absolute', bottom: '20px', color: theme.gold, fontWeight: 'bold' }}>
                  SCANNING BIOMETRICS...
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: COMPLETE */}
          {scanStatus === 'complete' && (
            <div style={{ animation: 'fadeIn 1s' }}>
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', 
                borderRadius: '20px', border: `1px solid ${theme.success}` 
              }}>
                <UserCheck size={48} color={theme.success} style={{ marginBottom: '1rem' }} />
                <h2 style={{ color: theme.success }}>Digital Twin Created</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0', textAlign: 'left' }}>
                  <div style={{ background: '#1e2124', padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Height</div>
                    <div style={{ fontSize: '1.2rem' }}>1.78m</div>
                  </div>
                  <div style={{ background: '#1e2124', padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Fit Algorithm</div>
                    <div style={{ fontSize: '1.2rem', color: theme.gold }}>Slim / 98%</div>
                  </div>
                  <div style={{ background: '#1e2124', padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>ID Token</div>
                    <div style={{ fontSize: '1.2rem' }}>ABV-8821</div>
                  </div>
                  <div style={{ background: '#1e2124', padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Security</div>
                    <div style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Lock size={14} /> Encrypted
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveModule('hero')}
                  style={{ 
                    background: theme.gold, color: theme.bg, border: 'none', 
                    padding: '1rem 3rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  Enter Smart Wardrobe <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- FOOTER (Rule 26 Compliance) --- */}
      <footer style={{ 
        textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.7rem', color: '#555', marginTop: 'auto'
      }}>
        <p>TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM © 2025</p>
        <p>Protected by Patent PCT/EP2025/067317 (Claims 1-8). Rule 26 Replacement Sheets Applied.</p>
      </footer>
    </div>
  );
};

// Mount Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
