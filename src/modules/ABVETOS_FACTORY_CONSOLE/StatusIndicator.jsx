import React from 'react';
import { getAgent70Status } from '../../api/qapi';

export default function StatusIndicator() {
  const [status, setStatus] = React.useState({ connected: false, mode: 'standby' });

  React.useEffect(() => {
    const checkStatus = async () => {
      const data = await getAgent70Status();
      setStatus(data);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span 
          style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: status.connected ? '#2ecc71' : '#e74c3c',
            boxShadow: status.connected ? '0 0 10px #2ecc71' : '0 0 10px #e74c3c'
          }} 
        />
        <span style={{ color: 'var(--color-bone-white)' }}>
          {status.connected ? 'Online' : 'Offline'}
        </span>
      </div>
      <span style={{ 
        padding: '0.25rem 0.75rem', 
        background: 'var(--color-anthracite)', 
        borderRadius: '4px',
        fontSize: '0.8rem',
        color: 'var(--color-neon-cyan)'
      }}>
        Mode: {status.mode}
      </span>
    </div>
  );
}
