import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionOverlay = ({ isVisible }) => {
  const [showQR, setShowQR] = useState(false);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '100px',
      left: 0,
      right: 0,
      zIndex: 50,
      textAlign: 'center',
      pointerEvents: 'auto'
    }}>
      <AnimatePresence>
        {!showQR ? (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQR(true)}
            style={{
              background: '#D4AF37',
              color: '#001A33',
              border: 'none',
              padding: '15px 40px',
              fontSize: '18px',
              fontFamily: 'serif',
              fontWeight: 'bold',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.5)',
              cursor: 'pointer',
              letterSpacing: '1px'
            }}
          >
            COMPRAR LOOK TOTAL
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(0, 26, 51, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #D4AF37',
              display: 'inline-block',
              color: '#D4AF37'
            }}
          >
            <h3 style={{ margin: '0 0 20px 0', letterSpacing: '2px' }}>LOCALIZACIÓN TIENDA</h3>
            {/* Simulated QR Code */}
            <div style={{
              width: '150px',
              height: '150px',
              background: '#fff',
              margin: '0 auto 20px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gridTemplateRows: 'repeat(5, 1fr)',
                    gap: '2px'
                }}>
                    {/* Abstract QR Pattern */}
                    {[...Array(25)].map((_, i) => (
                        <div key={i} style={{ backgroundColor: Math.random() > 0.5 ? '#fff' : '#000' }} />
                    ))}
                </div>
            </div>
            <p style={{ fontSize: '14px' }}>Escanea para ver disponibilidad<br/>en planta 2 (Corner Divineo)</p>
            <button
                onClick={() => setShowQR(false)}
                style={{
                    marginTop: '15px',
                    background: 'transparent',
                    border: '1px solid #D4AF37',
                    color: '#D4AF37',
                    padding: '8px 20px',
                    borderRadius: '15px',
                    cursor: 'pointer'
                }}
            >
                Cerrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionOverlay;
