import React, { useState, useEffect } from 'react';
import { coreDockAPI } from '../QAPI';

// Core Dock - 4 Execution Layers
const LAYERS = {
  VERIFICATION: 'verification',
  LOGGING: 'logging',
  AUTO_CORRECTION: 'autoCorrection',
  DSX_FALLBACK: 'dsxFallback',
};

export function useCoreDock() {
  const [state, setState] = useState({
    logs: [],
    verifications: [],
    corrections: [],
    fallbacks: [],
    isActive: true,
  });

  // Layer 1: Verification
  const verify = async (data) => {
    const result = await coreDockAPI.verify(data);
    setState(prev => ({
      ...prev,
      verifications: [...prev.verifications, { data, result, timestamp: new Date().toISOString() }],
    }));
    return result;
  };

  // Layer 2: Logging
  const log = async (entry) => {
    await coreDockAPI.log(entry);
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, { ...entry, timestamp: new Date().toISOString() }].slice(-100),
    }));
  };

  // Layer 3: Auto-Correction
  const autoCorrect = async (issue) => {
    const result = await coreDockAPI.autofix(issue);
    setState(prev => ({
      ...prev,
      corrections: [...prev.corrections, { issue, result, timestamp: new Date().toISOString() }],
    }));
    log({ type: 'correction', message: `Auto-corrected: ${issue.description}` });
    return result;
  };

  // Layer 4: DSX Fallback
  const activateFallback = async (error) => {
    const result = await coreDockAPI.dsxFallback(error);
    setState(prev => ({
      ...prev,
      fallbacks: [...prev.fallbacks, { error, result, timestamp: new Date().toISOString() }],
    }));
    log({ type: 'fallback', message: `DSX Fallback activated: ${error.message}` });
    return result;
  };

  // Process command through all layers
  const processCommand = async (command) => {
    try {
      // Layer 1: Verify
      const verification = await verify(command);
      if (!verification.success) {
        throw new Error('Verification failed');
      }

      // Layer 2: Log
      await log({ type: 'command', message: `Processing: ${command.action}` });

      // Execute command
      // ... command execution logic

      await log({ type: 'success', message: `Command completed: ${command.action}` });
      return { success: true };
    } catch (error) {
      // Layer 3: Try auto-correction
      try {
        await autoCorrect({ description: error.message, command });
        return { success: true, corrected: true };
      } catch (correctionError) {
        // Layer 4: Activate DSX fallback
        const fallback = await activateFallback(error);
        return { success: false, fallback };
      }
    }
  };

  return { state, verify, log, autoCorrect, activateFallback, processCommand };
}

export default function CoreDock() {
  const { state, log, processCommand } = useCoreDock();
  const [activeLayer, setActiveLayer] = useState('all');

  useEffect(() => {
    // Initialize with some logs
    log({ type: 'system', message: 'Core Dock initialized' });
    log({ type: 'info', message: 'All 4 execution layers active' });
  }, []);

  const layers = [
    { id: 'verification', name: 'Verification', icon: '✓', description: 'Command verification and validation', status: 'active' },
    { id: 'logging', name: 'Full Logging', icon: '📝', description: 'Complete activity logging', status: 'active' },
    { id: 'autoCorrection', name: 'Auto-Correction', icon: '🔧', description: 'Automatic error correction', status: 'standby' },
    { id: 'dsxFallback', name: 'DSX Fallback', icon: '🛡️', description: 'Fallback route generation', status: 'standby' },
  ];

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'error': return '#ef4444';
      case 'warning': return 'var(--color-gold)';
      case 'success': return 'var(--color-peacock-green)';
      case 'correction': return 'var(--color-neon-cyan)';
      case 'fallback': return '#f97316';
      default: return 'var(--color-bone-white)';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div>
            <h1>ABVET Core Dock</h1>
            <p style={{ color: 'var(--color-gray-500)' }}>Security, Logs & Control</p>
          </div>
          <div className="status status-active">PROTECTED</div>
        </div>

        {/* 4 Layers Overview */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 'var(--spacing-2xl)' }}>
          {layers.map((layer, index) => (
            <div 
              key={layer.id} 
              className="module-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveLayer(layer.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2rem' }}>{layer.icon}</div>
                <div className={`status status-${layer.status === 'active' ? 'active' : 'pending'}`}>
                  Layer {index + 1}
                </div>
              </div>
              <h3 className="module-title" style={{ marginTop: 'var(--spacing-sm)' }}>{layer.name}</h3>
              <p className="module-description">{layer.description}</p>
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div className="card" style={{ maxHeight: '400px', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h3>Activity Log</h3>
            <button 
              className="btn btn-secondary" 
              onClick={() => processCommand({ action: 'test-command' })}
              style={{ fontSize: '0.875rem', padding: 'var(--spacing-xs) var(--spacing-md)' }}
            >
              Test Command
            </button>
          </div>
          
          <div style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            {state.logs.length === 0 ? (
              <div style={{ color: 'var(--color-gray-500)' }}>Awaiting system activity...</div>
            ) : (
              state.logs.map((entry, index) => (
                <div 
                  key={index} 
                  style={{ 
                    padding: 'var(--spacing-xs) 0', 
                    color: getLogTypeColor(entry.type),
                    borderBottom: '1px solid var(--color-gray-800)',
                  }}
                >
                  <span style={{ color: 'var(--color-gray-500)' }}>[{entry.timestamp}]</span>{' '}
                  <span style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>[{entry.type}]</span>{' '}
                  {entry.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Execution Stats */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: 'var(--spacing-xl)' }}>
          <div className="module-card">
            <div style={{ fontSize: '2rem', color: 'var(--color-peacock-green)' }}>{state.verifications.length}</div>
            <div style={{ color: 'var(--color-gray-500)' }}>Verifications</div>
          </div>
          <div className="module-card">
            <div style={{ fontSize: '2rem', color: 'var(--color-neon-cyan)' }}>{state.logs.length}</div>
            <div style={{ color: 'var(--color-gray-500)' }}>Log Entries</div>
          </div>
          <div className="module-card">
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>{state.corrections.length}</div>
            <div style={{ color: 'var(--color-gray-500)' }}>Corrections</div>
          </div>
          <div className="module-card">
            <div style={{ fontSize: '2rem', color: '#f97316' }}>{state.fallbacks.length}</div>
            <div style={{ color: 'var(--color-gray-500)' }}>Fallbacks</div>
          </div>
        </div>
      </div>
    </div>
  );
}
