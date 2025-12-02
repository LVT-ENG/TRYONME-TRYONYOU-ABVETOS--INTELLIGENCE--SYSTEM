import React, { useState } from 'react';
import { triggerDSXFallback } from '../../api/qapi';

export default function DSXFallback() {
  const [isTriggered, setIsTriggered] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleTrigger = async () => {
    if (!window.confirm('Are you sure you want to trigger DSX Fallback? This will initiate emergency recovery.')) {
      return;
    }
    
    setStatus('triggering');
    const result = await triggerDSXFallback();
    setIsTriggered(result.success);
    setStatus(result.success ? 'active' : 'error');
  };

  return (
    <div>
      <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>DSX Fallback System</h3>
      
      <div style={{ 
        background: 'var(--color-anthracite)', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '2px solid purple',
        marginBottom: '1rem'
      }}>
        <p style={{ color: 'var(--color-bone-white)', marginBottom: '1rem' }}>
          The DSX Fallback system provides emergency recovery capabilities when primary systems fail.
          This should only be triggered as a last resort.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-neon-cyan)' }}>Status:</span>
          <span style={{ 
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            background: status === 'active' ? '#2ecc71' : status === 'error' ? '#e74c3c' : '#666',
            color: 'white',
            fontSize: '0.9rem'
          }}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      <button
        onClick={handleTrigger}
        disabled={isTriggered}
        style={{
          padding: '1rem 2rem',
          background: isTriggered ? '#666' : 'purple',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isTriggered ? 'default' : 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        {isTriggered ? 'Fallback Active' : 'Trigger DSX Fallback'}
      </button>

      {isTriggered && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'rgba(46, 204, 113, 0.2)',
          border: '1px solid #2ecc71',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#2ecc71' }}>
            ✓ DSX Fallback has been triggered. Emergency recovery procedures are now active.
          </p>
        </div>
      )}
    </div>
  );
}
