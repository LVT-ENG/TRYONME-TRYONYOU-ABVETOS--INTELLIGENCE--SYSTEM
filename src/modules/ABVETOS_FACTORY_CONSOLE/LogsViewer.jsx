import React, { useState, useEffect } from 'react';
import { getLogs } from '../../api/qapi';

export default function LogsViewer() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLogs();
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadLogs = async () => {
    const data = await getLogs();
    setLogs(data);
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.level === filter;
  });

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        {['all', 'info', 'success', 'error'].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            style={{
              padding: '0.5rem 1rem',
              background: filter === level ? 'var(--color-neon-cyan)' : 'var(--color-anthracite)',
              color: filter === level ? 'var(--color-deep-black)' : 'var(--color-bone-white)',
              border: '1px solid var(--color-neon-cyan)',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="logs-panel" style={{ maxHeight: '400px' }}>
        {filteredLogs.length === 0 ? (
          <div style={{ color: 'var(--color-bone-white)', opacity: 0.5 }}>
            No logs to display
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div key={index} className={`log-entry ${log.level}`}>
              <span style={{ opacity: 0.6, marginRight: '1rem' }}>
                [{log.timestamp}]
              </span>
              <span style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}>
                {log.source}:
              </span>
              {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
