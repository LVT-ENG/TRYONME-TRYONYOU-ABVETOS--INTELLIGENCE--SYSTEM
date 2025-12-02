import React from 'react';

export default function ControlMatrix() {
  const layers = [
    { name: 'Command Verification', status: 'active', description: 'Validates all incoming commands' },
    { name: 'Full Logging', status: 'active', description: 'Records all operations and states' },
    { name: 'Auto-Correction', status: 'active', description: 'Automatically fixes detected issues' },
    { name: 'DSX Fallback', status: 'standby', description: 'Emergency recovery system' }
  ];

  return (
    <div>
      <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>ABVET Core Dock Layers</h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {layers.map((layer, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--color-anthracite)',
              border: `1px solid ${layer.status === 'active' ? 'var(--color-neon-cyan)' : 'var(--color-gold)'}`,
              borderRadius: '8px'
            }}
          >
            <div>
              <h4 style={{ color: 'var(--color-bone-white)', marginBottom: '0.25rem' }}>
                Layer {index + 1}: {layer.name}
              </h4>
              <p style={{ color: 'var(--color-bone-white)', opacity: 0.7, fontSize: '0.9rem' }}>
                {layer.description}
              </p>
            </div>
            <span 
              style={{
                padding: '0.25rem 0.75rem',
                background: layer.status === 'active' ? '#2ecc71' : 'var(--color-gold)',
                color: 'var(--color-deep-black)',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {layer.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
