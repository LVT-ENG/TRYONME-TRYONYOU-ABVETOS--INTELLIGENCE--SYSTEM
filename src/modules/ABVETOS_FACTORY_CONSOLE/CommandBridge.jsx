import React, { useState } from 'react';
import { executeCommand, authorizeAgent70 } from '../../api/qapi';

export default function CommandBridge() {
  const [command, setCommand] = useState('');
  const [results, setResults] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorize = async () => {
    const result = await authorizeAgent70();
    setIsAuthorized(result.authorized);
    addResult({ type: result.authorized ? 'success' : 'error', message: result.message });
  };

  const handleExecute = async () => {
    if (!command.trim()) return;
    if (!isAuthorized) {
      addResult({ type: 'error', message: 'Agent70 authorization required before executing commands' });
      return;
    }

    const result = await executeCommand(command);
    addResult({ 
      type: result.success ? 'success' : 'error', 
      message: `[${command}] ${result.message}` 
    });
    setCommand('');
  };

  const addResult = (entry) => {
    setResults(prev => [...prev, { ...entry, timestamp: new Date().toISOString() }]);
  };

  return (
    <div className="agent70-bridge">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Agent70 Command Bridge</h3>
        <p style={{ color: 'var(--color-bone-white)', opacity: 0.8, fontSize: '0.9rem' }}>
          Agent70 has final authority over all agents and operations
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={handleAuthorize}
          disabled={isAuthorized}
          style={{
            padding: '0.75rem 1.5rem',
            background: isAuthorized ? '#2ecc71' : 'var(--color-gold)',
            color: 'var(--color-deep-black)',
            border: 'none',
            borderRadius: '8px',
            cursor: isAuthorized ? 'default' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isAuthorized ? '✓ Agent70 Authorized' : 'Authorize Agent70'}
        </button>
      </div>

      <div className="command-input">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
          placeholder="Enter command (restart, merge, dsx, abvet...)"
        />
        <button onClick={handleExecute} disabled={!isAuthorized}>Execute</button>
      </div>

      <div className="logs-panel">
        {results.length === 0 ? (
          <div style={{ color: 'var(--color-bone-white)', opacity: 0.5 }}>
            No commands executed yet
          </div>
        ) : (
          results.map((entry, index) => (
            <div key={index} className={`log-entry ${entry.type}`}>
              <span style={{ opacity: 0.6, marginRight: '1rem' }}>
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
              {entry.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
