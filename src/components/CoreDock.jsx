import React, { useState, useEffect } from 'react';

export default function CoreDock() {
  const [layers, setLayers] = useState([
    { id: 1, name: 'Verification', status: 'active', icon: '✓' },
    { id: 2, name: 'Logging', status: 'active', icon: '📝' },
    { id: 3, name: 'Auto-Fix', status: 'active', icon: '🔧' },
    { id: 4, name: 'DSX Fallback', status: 'standby', icon: '🛡️' }
  ]);

  const [minimized, setMinimized] = useState(false);

  return (
    <div 
      className="core-dock"
      style={{
        width: minimized ? '60px' : '200px',
        transition: 'width 0.3s ease'
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: minimized ? 0 : '0.5rem',
          cursor: 'pointer'
        }}
        onClick={() => setMinimized(!minimized)}
      >
        {!minimized && (
          <span style={{ color: 'var(--color-neon-cyan)', fontWeight: 'bold', fontSize: '0.9rem' }}>
            Core Dock
          </span>
        )}
        <span style={{ color: 'var(--color-gold)' }}>
          {minimized ? '◀' : '▶'}
        </span>
      </div>

      {!minimized && layers.map(layer => (
        <div 
          key={layer.id} 
          className={`layer ${layer.status === 'active' ? 'verified' : 'fallback'}`}
        >
          <span>{layer.icon}</span>
          <span style={{ fontSize: '0.8rem' }}>{layer.name}</span>
          <span style={{ 
            marginLeft: 'auto', 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%',
            background: layer.status === 'active' ? '#2ecc71' : 'var(--color-gold)'
          }} />
        </div>
      ))}

      {minimized && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          {layers.map(layer => (
            <div 
              key={layer.id}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: layer.status === 'active' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              title={layer.name}
            >
              {layer.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
