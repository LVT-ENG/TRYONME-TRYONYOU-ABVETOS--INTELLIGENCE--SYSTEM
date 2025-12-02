import React, { useState, useEffect } from 'react';

// ABVETOS Orchestration State
const initialState = {
  status: 'idle',
  agents: [],
  currentTask: null,
  logs: [],
  metrics: {
    tasksCompleted: 0,
    tasksQueued: 0,
    agentsActive: 0,
  },
};

// Agent Types
const AGENT_TYPES = {
  ANALYSIS: 'analysis',
  DEPLOYMENT: 'deployment',
  LEGAL: 'legal',
  CREATIVE: 'creative',
  DIAGNOSTIC: 'diagnostic',
  SYNC: 'synchronization',
  SECURITY: 'security',
  INTEGRATION: 'integration',
};

export function useABVETOS() {
  const [state, setState] = useState(initialState);

  const addLog = (message, type = 'info') => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, { message, type, timestamp: new Date().toISOString() }].slice(-50),
    }));
  };

  const detectMissingComponents = () => {
    addLog('Scanning project for missing components...', 'info');
    return [];
  };

  const assignAgent = (agentType, task) => {
    addLog(`Assigning ${agentType} agent to task: ${task}`, 'info');
    return { id: Date.now(), type: agentType, task, status: 'assigned' };
  };

  const translateToQAPI = (command) => {
    addLog(`Translating command to Q-API: ${command}`, 'info');
    return { endpoint: '/abvet/commands', payload: { command } };
  };

  const superviseExecution = () => {
    addLog('Supervising task execution...', 'info');
  };

  const activateDSX = (error) => {
    addLog(`Activating DSX for error correction: ${error}`, 'warning');
  };

  const notifyAgent70 = (task) => {
    addLog(`Notifying Agent70 for verification: ${task}`, 'info');
  };

  const orchestrate = async (task) => {
    setState(prev => ({ ...prev, status: 'running', currentTask: task }));
    
    try {
      detectMissingComponents();
      const agent = assignAgent(AGENT_TYPES.DEPLOYMENT, task);
      translateToQAPI(task);
      superviseExecution();
      notifyAgent70(task);
      
      setState(prev => ({
        ...prev,
        status: 'completed',
        metrics: {
          ...prev.metrics,
          tasksCompleted: prev.metrics.tasksCompleted + 1,
        },
      }));
    } catch (error) {
      activateDSX(error.message);
      setState(prev => ({ ...prev, status: 'error' }));
    }
  };

  return { state, orchestrate, addLog };
}

export default function ABVETOSFactory() {
  const { state, orchestrate, addLog } = useABVETOS();
  const [activePanel, setActivePanel] = useState('overview');

  const agentTypes = [
    { type: 'Analysis', icon: '🔍', description: 'Data analysis and pattern recognition' },
    { type: 'Deployment', icon: '🚀', description: 'Build and deployment automation' },
    { type: 'Legal', icon: '⚖️', description: 'Compliance and legal verification' },
    { type: 'Creative', icon: '🎨', description: 'Design and content generation' },
    { type: 'Diagnostic', icon: '🔧', description: 'Error detection and debugging' },
    { type: 'Synchronization', icon: '🔄', description: 'Data sync across systems' },
    { type: 'Security', icon: '🛡️', description: 'Security monitoring and protection' },
    { type: 'Integration', icon: '🔗', description: 'Third-party system integration' },
  ];

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div>
            <h1>ABVETOS Factory Console</h1>
            <p style={{ color: 'var(--color-gray-500)' }}>Orchestration Engine & Agent Forge</p>
          </div>
          <div className={`status status-${state.status === 'running' ? 'pending' : state.status === 'error' ? 'error' : 'active'}`}>
            {state.status.toUpperCase()}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-gray-800)' }}>
          {['overview', 'agents', 'forge', 'logs'].map(panel => (
            <button
              key={panel}
              onClick={() => setActivePanel(panel)}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--spacing-md)',
                color: activePanel === panel ? 'var(--color-neon-cyan)' : 'var(--color-gray-500)',
                borderBottom: activePanel === panel ? '2px solid var(--color-neon-cyan)' : '2px solid transparent',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            >
              {panel}
            </button>
          ))}
        </div>

        {/* Overview Panel */}
        {activePanel === 'overview' && (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="module-card">
              <div style={{ fontSize: '2rem', color: 'var(--color-neon-cyan)' }}>{state.metrics.tasksCompleted}</div>
              <div style={{ color: 'var(--color-gray-500)' }}>Tasks Completed</div>
            </div>
            <div className="module-card">
              <div style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>{state.metrics.tasksQueued}</div>
              <div style={{ color: 'var(--color-gray-500)' }}>Tasks Queued</div>
            </div>
            <div className="module-card">
              <div style={{ fontSize: '2rem', color: 'var(--color-peacock-green)' }}>{state.metrics.agentsActive}</div>
              <div style={{ color: 'var(--color-gray-500)' }}>Agents Active</div>
            </div>
            <div className="module-card">
              <button 
                className="btn btn-primary" 
                onClick={() => orchestrate('full-build')}
                style={{ width: '100%' }}
              >
                Start Orchestration
              </button>
            </div>
          </div>
        )}

        {/* Agents Panel */}
        {activePanel === 'agents' && (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {agentTypes.map((agent, index) => (
              <div key={index} className="module-card">
                <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{agent.icon}</div>
                <h3 className="module-title">{agent.type} Agent</h3>
                <p className="module-description">{agent.description}</p>
                <div className="status status-active" style={{ marginTop: 'var(--spacing-sm)' }}>READY</div>
              </div>
            ))}
          </div>
        )}

        {/* Forge Panel */}
        {activePanel === 'forge' && (
          <div className="card">
            <h3>Agent Forge</h3>
            <p>Create and train specialized agents for specific tasks.</p>
            <div style={{ marginTop: 'var(--spacing-xl)' }}>
              <h4>Forge Capabilities:</h4>
              <ul style={{ listStyle: 'none', marginTop: 'var(--spacing-md)' }}>
                <li style={{ padding: 'var(--spacing-sm) 0' }}>✓ Train agents with DSX intelligence</li>
                <li style={{ padding: 'var(--spacing-sm) 0' }}>✓ Assign Q-API capabilities</li>
                <li style={{ padding: 'var(--spacing-sm) 0' }}>✓ Configure agent roles</li>
                <li style={{ padding: 'var(--spacing-sm) 0' }}>✓ Connect to ABVET Core Dock</li>
                <li style={{ padding: 'var(--spacing-sm) 0' }}>✓ Deploy to production</li>
              </ul>
            </div>
          </div>
        )}

        {/* Logs Panel */}
        {activePanel === 'logs' && (
          <div className="card" style={{ maxHeight: '500px', overflow: 'auto' }}>
            <h3>System Logs</h3>
            <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', marginTop: 'var(--spacing-md)' }}>
              {state.logs.length === 0 ? (
                <div style={{ color: 'var(--color-gray-500)' }}>No logs yet. Start an orchestration to see activity.</div>
              ) : (
                state.logs.map((log, index) => (
                  <div key={index} style={{ padding: 'var(--spacing-xs) 0', color: log.type === 'warning' ? 'var(--color-gold)' : log.type === 'error' ? '#ef4444' : 'var(--color-bone-white)' }}>
                    [{log.timestamp}] {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
