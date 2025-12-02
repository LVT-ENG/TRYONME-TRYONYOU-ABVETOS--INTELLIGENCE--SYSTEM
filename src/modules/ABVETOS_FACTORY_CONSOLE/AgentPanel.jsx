import React, { useState, useEffect } from 'react';
import { getAgents, restartAgent } from '../../api/qapi';

export default function AgentPanel() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    setLoading(true);
    const data = await getAgents();
    setAgents(data);
    setLoading(false);
  };

  const handleRestart = async (agentId) => {
    await restartAgent(agentId);
    loadAgents();
  };

  if (loading) {
    return <div style={{ color: 'var(--color-neon-cyan)' }}>Loading agents...</div>;
  }

  return (
    <div className="agent-panel">
      {agents.map(agent => (
        <div key={agent.id} className="agent-card">
          <h3>{agent.name}</h3>
          <p>{agent.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <span className={`status ${agent.status}`}>{agent.status}</span>
            <button 
              onClick={() => handleRestart(agent.id)}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--color-neon-cyan)',
                color: 'var(--color-deep-black)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Restart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
