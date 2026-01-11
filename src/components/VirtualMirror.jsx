import React, { useRef, useEffect, useState } from 'react';

/**
 * VirtualMirror Component
 * Activates webcam and overlays garment images for virtual try-on experience
 * Part of TRYONYOU ULTIMATUM V7 - PCT/EP2025/067317
 */
export default function VirtualMirror() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const garmentImage = useRef(null);

  useEffect(() => {
    // Load the garment overlay image
    const img = new Image();
    img.src = '/assets/catalog/red_dress_minimal.png';
    img.onload = () => {
      garmentImage.current = img;
    };

    // Start webcam
    startWebcam();

    return () => {
      stopWebcam();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsStreaming(true);
          renderFrame();
        };
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError('No se pudo acceder a la cámara. Por favor, permite el acceso a la cámara en tu navegador.');
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const renderFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw garment overlay if loaded
    if (garmentImage.current) {
      ctx.globalAlpha = overlayOpacity;
      
      // Calculate overlay position (centered, scaled to fit)
      const scale = 0.6; // Scale factor for garment
      const overlayWidth = canvas.width * scale;
      const overlayHeight = (garmentImage.current.height / garmentImage.current.width) * overlayWidth;
      const x = (canvas.width - overlayWidth) / 2;
      const y = canvas.height * 0.15; // Position slightly below top

      ctx.drawImage(garmentImage.current, x, y, overlayWidth, overlayHeight);
      ctx.globalAlpha = 1.0;
    }

    // Continue rendering
    requestAnimationFrame(renderFrame);
  };

  return (
    <div style={{
      backgroundColor: '#141619',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        color: '#D3B26A',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        ✨ Espejo Virtual - TRYONYOU
      </h1>

      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        width: '100%',
        border: '4px solid #D3B26A',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(211, 178, 106, 0.3)',
        backgroundColor: '#000'
      }}>
        {error ? (
          <div style={{
            padding: '60px 40px',
            textAlign: 'center',
            color: '#D3B26A',
            fontSize: '1.2rem'
          }}>
            <p>⚠️ {error}</p>
            <button
              onClick={startWebcam}
              style={{
                marginTop: '20px',
                padding: '12px 30px',
                backgroundColor: '#D3B26A',
                color: '#141619',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              style={{
                display: 'none',
                width: '100%',
                height: 'auto'
              }}
              playsInline
            />
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            {!isStreaming && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#D3B26A',
                fontSize: '1.5rem',
                textAlign: 'center'
              }}>
                <p>📸 Iniciando cámara...</p>
              </div>
            )}
          </>
        )}
      </div>

      {isStreaming && (
        <div style={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <label style={{ color: '#D3B26A', fontSize: '1rem' }}>
              Transparencia de la prenda:
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={overlayOpacity * 100}
              onChange={(e) => setOverlayOpacity(e.target.value / 100)}
              style={{
                width: '200px',
                accentColor: '#D3B26A'
              }}
            />
            <span style={{ color: '#D3B26A', fontSize: '1rem' }}>
              {Math.round(overlayOpacity * 100)}%
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => {
                if (garmentImage.current) {
                  garmentImage.current.src = '/assets/catalog/red_dress_minimal.png';
                }
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#D3B26A',
                color: '#141619',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              👗 Vestido Rojo
            </button>
            <button
              onClick={() => {
                if (garmentImage.current) {
                  garmentImage.current.src = '/assets/catalog/burberry_trench.png';
                }
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#D3B26A',
                color: '#141619',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              🧥 Trench Burberry
            </button>
          </div>
        </div>
      )}

      <p style={{
        marginTop: '40px',
        color: '#D3B26A',
        fontSize: '0.9rem',
        textAlign: 'center',
        opacity: 0.7
      }}>
        TRYONYOU ULTIMATUM V7 - Piloto Lafayette Activo<br />
        Protegido por PCT/EP2025/067317
      </p>
    </div>
  );
}
