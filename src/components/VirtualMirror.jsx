import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

/**
 * VirtualMirror Component
 * Interactive virtual try-on mirror using webcam and biometric scanning
 */
export default function VirtualMirror() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const webcamRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate biometric scan with cleanup
    timeoutRef.current = setTimeout(() => {
      setScanResult({
        fit_score: "98.5%",
        status: "MATCH_FOUND",
        recommendation: "Burberry Trench Haussmann"
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#C5A46D',
      minHeight: '100vh',
      padding: '40px',
      textAlign: 'center'
    }}>
      <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>
        ✨ TryOnYou: Virtual Mirror
      </h1>
      
      <div style={{
        border: '3px solid #C5A46D',
        margin: '20px auto',
        width: '80%',
        maxWidth: '800px',
        height: '600px',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a'
      }}>
        {!scanResult ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {isScanning && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(197, 164, 109, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  🔍 Scanning Biometrics...
                </div>
                <div style={{
                  fontSize: '1rem'
                }}>
                  Analyzing your profile
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            padding: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#C5A46D', marginBottom: '20px' }}>
              ✅ Perfect Match Found!
            </h2>
            <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
              {scanResult.recommendation}
            </p>
            <p style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '20px' }}>
              Fit Score: {scanResult.fit_score}
            </p>
            <button
              onClick={() => setScanResult(null)}
              style={{
                padding: '12px 30px',
                backgroundColor: '#C5A46D',
                border: 'none',
                color: 'black',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              Try Another Look
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        {!scanResult && !isScanning && (
          <button
            onClick={startScan}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              padding: '15px 40px',
              backgroundColor: '#C5A46D',
              border: 'none',
              color: 'black',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '1.2rem',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s'
            }}
          >
            🎯 START BIOMETRIC SCAN
          </button>
        )}
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '40px auto 0'
      }}>
        <h3 style={{ marginBottom: '15px' }}>How It Works:</h3>
        <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>📸 Your camera captures your body profile</li>
          <li>🤖 AI analyzes your biometrics invisibly</li>
          <li>👗 System matches you with perfect-fit items</li>
          <li>✨ No measurements needed - just try it on virtually!</li>
        </ul>
      </div>
    </div>
  );
}
