import React, { useState } from 'react';

const agents = [
  { id: 'agent70', name: 'Agent70', type: 'Supervisor', status: 'active', capabilities: ['approve', 'monitor', 'control'] },
  { id: 'analyzer', name: 'Analyzer Agent', type: 'Analysis', status: 'active', capabilities: ['trends', 'patterns', 'data'] },
  { id: 'generator', name: 'Generator Agent', type: 'Production', status: 'active', capabilities: ['create', 'design', 'generate'] },
  { id: 'optimizer', name: 'Optimizer Agent', type: 'Optimization', status: 'active', capabilities: ['efficiency', 'performance', 'tune'] },
  { id: 'validator', name: 'Validator Agent', type: 'Validation', status: 'active', capabilities: ['verify', 'test', 'check'] },
  { id: 'deployer', name: 'Deployer Agent', type: 'Deployment', status: 'pending', capabilities: ['deploy', 'release', 'publish'] },
  { id: 'monitor', name: 'Monitor Agent', type: 'Monitoring', status: 'active', capabilities: ['observe', 'alert', 'report'] },
  { id: 'learner', name: 'Learner Agent', type: 'ML', status: 'active', capabilities: ['learn', 'adapt', 'improve'] }
];

const endpoints = [
  { method: 'GET', path: '/agents', description: 'List all agents' },
  { method: 'GET', path: '/agents/{id}', description: 'Get agent details' },
  { method: 'POST', path: '/agents/{id}/restart', description: 'Restart agent' },
  { method: 'GET', path: '/agents/{id}/capabilities', description: 'Get agent capabilities' },
  { method: 'GET', path: '/agents/{id}/dsx', description: 'Get DSX configuration' },
  { method: 'POST', path: '/agents/merge', description: 'Merge agent behaviors' },
  { method: 'POST', path: '/abvet/commands', description: 'Execute ABVET command' },
  { method: 'POST', path: '/agent70/authorize', description: 'Request Agent70 authorization' },
  { method: 'GET', path: '/agent70/status', description: 'Get Agent70 status' },
  { method: 'GET', path: '/templates', description: 'List available templates' }
];

const coreLayers = [
  { name: 'Command Verification', description: 'Validates all incoming commands', status: 'active' },
  { name: 'Logging System', description: 'Comprehensive activity logging', status: 'active' },
  { name: 'Auto-Correction', description: 'Self-healing error recovery', status: 'active' },
  { name: 'DSX Fallback', description: 'Failsafe operation mode', status: 'active' }
];

export default function AbvetosFactory() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState(['> ABVETOS Factory Console v1.0', '> System initialized...', '> Agent70 supervision active']);

  const executeCommand = (cmd) => {
    setConsoleOutput(prev => [...prev, `> ${cmd}`, `  [OK] Command executed successfully`]);
  };

  return (
    <div className="page abvetos-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-badge">🏭 Intelligence System</div>
          <h1>ABVETOS Factory</h1>
          <p className="page-subtitle">
            Q-API & Agent Forge Console - The core of TRYONYOU intelligence
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 4-Component Architecture */}
          <div className="architecture-section">
            <h2>🏗️ 4-Component Architecture</h2>
            <div className="arch-grid">
              <div className="arch-card">
                <div className="arch-icon">🧠</div>
                <h3>ABVETOS Core</h3>
                <p>Central intelligence orchestration</p>
              </div>
              <div className="arch-card">
                <div className="arch-icon">🔌</div>
                <h3>Q-API Layer</h3>
                <p>Unified API gateway</p>
              </div>
              <div className="arch-card">
                <div className="arch-icon">👁️</div>
                <h3>Agent70 Bridge</h3>
                <p>Supervisor command bridge</p>
              </div>
              <div className="arch-card">
                <div className="arch-icon">⚙️</div>
                <h3>Agent Forge</h3>
                <p>8 specialized agent types</p>
              </div>
            </div>
          </div>

          {/* Agent Forge */}
          <div className="agents-section">
            <h2>🔥 Agent Forge - 8 Agent Types</h2>
            <div className="agents-grid">
              {agents.map(agent => (
                <div 
                  key={agent.id} 
                  className={`agent-card ${selectedAgent?.id === agent.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="agent-header">
                    <span className="agent-type">{agent.type}</span>
                    <span className={`status status-${agent.status}`}>
                      <span className="status-dot"></span>
                      {agent.status}
                    </span>
                  </div>
                  <h3>{agent.name}</h3>
                  <div className="agent-capabilities">
                    {agent.capabilities.map(cap => (
                      <span key={cap} className="capability-tag">{cap}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Q-API Endpoints */}
          <div className="api-section">
            <h2>🔗 Q-API Endpoints</h2>
            <div className="endpoints-list">
              {endpoints.map((ep, i) => (
                <div key={i} className="endpoint-item">
                  <span className={`method method-${ep.method.toLowerCase()}`}>{ep.method}</span>
                  <code className="endpoint-path">{ep.path}</code>
                  <span className="endpoint-desc">{ep.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ABVET Core Dock */}
          <div className="core-dock-section">
            <h2>🎛️ ABVET Core Dock - 4 Layers</h2>
            <div className="layers-grid">
              {coreLayers.map((layer, i) => (
                <div key={i} className="layer-card">
                  <div className="layer-number">{i + 1}</div>
                  <div className="layer-content">
                    <h3>{layer.name}</h3>
                    <p>{layer.description}</p>
                    <span className={`status status-${layer.status}`}>
                      <span className="status-dot"></span>
                      {layer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Console */}
          <div className="console-section">
            <h2>💻 Factory Console</h2>
            <div className="console">
              <div className="console-header">
                <span className="console-dot red"></span>
                <span className="console-dot yellow"></span>
                <span className="console-dot green"></span>
              </div>
              <div className="console-body">
                {consoleOutput.map((line, i) => (
                  <div key={i} className="console-line">{line}</div>
                ))}
              </div>
              <div className="console-input">
                <span className="prompt">$</span>
                <input 
                  type="text" 
                  placeholder="Enter command..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      executeCommand(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .page-hero {
          padding: calc(80px + var(--spacing-xl)) 0 var(--spacing-lg);
          background: var(--gradient-metallic);
          text-align: center;
        }
        
        .page-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(0, 206, 209, 0.2);
          border: 1px solid var(--accent-peacock);
          border-radius: var(--radius-full);
          color: var(--accent-peacock);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
        }
        
        .page-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
        }
        
        .architecture-section,
        .agents-section,
        .api-section,
        .core-dock-section,
        .console-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .architecture-section h2,
        .agents-section h2,
        .api-section h2,
        .core-dock-section h2,
        .console-section h2 {
          margin-bottom: var(--spacing-md);
        }
        
        .arch-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .arch-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .arch-card:hover {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
        }
        
        .arch-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .agents-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .agent-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .agent-card:hover,
        .agent-card.selected {
          border-color: var(--accent-peacock);
          box-shadow: var(--shadow-glow);
        }
        
        .agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .agent-type {
          font-size: 0.75rem;
          color: var(--accent-gold);
          text-transform: uppercase;
        }
        
        .agent-capabilities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-top: var(--spacing-sm);
        }
        
        .capability-tag {
          background: rgba(0, 206, 209, 0.1);
          color: var(--accent-peacock);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.625rem;
        }
        
        .endpoints-list {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        
        .endpoint-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .endpoint-item:last-child {
          border-bottom: none;
        }
        
        .method {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }
        
        .method-get { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
        .method-post { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .method-put { background: rgba(234, 179, 8, 0.2); color: #eab308; }
        .method-delete { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        
        .endpoint-path {
          font-family: 'Fira Code', monospace;
          color: var(--accent-peacock);
          flex: 1;
        }
        
        .endpoint-desc {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        .layers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .layer-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .layer-number {
          width: 40px;
          height: 40px;
          background: var(--gradient-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--primary-dark);
          flex-shrink: 0;
        }
        
        .layer-content h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .layer-content p {
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }
        
        .console-body {
          max-height: 200px;
          overflow-y: auto;
        }
        
        .console-line {
          padding: 0.25rem 0;
          font-family: 'Fira Code', monospace;
        }
        
        .console-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .prompt {
          color: var(--accent-peacock);
        }
        
        .console-input input {
          flex: 1;
          background: transparent;
          border: none;
          color: #00ff00;
          font-family: 'Fira Code', monospace;
          outline: none;
        }
        
        @media (max-width: 1024px) {
          .arch-grid,
          .agents-grid,
          .layers-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .arch-grid,
          .agents-grid,
          .layers-grid {
            grid-template-columns: 1fr;
          }
          
          .endpoint-item {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
