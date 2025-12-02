import React, { useState } from 'react';
import AgentPanel from './AgentPanel';
import CommandBridge from './CommandBridge';
import LogsViewer from './LogsViewer';
import StatusIndicator from './StatusIndicator';
import ControlMatrix from './ControlMatrix';
import DSXFallback from './DSXFallback';

export default function ABVETOSFactoryConsole() {
  const [activeTab, setActiveTab] = useState('agents');

  const tabs = [
    { id: 'agents', label: 'Agent Panel' },
    { id: 'commands', label: 'Command Bridge' },
    { id: 'logs', label: 'Logs' },
    { id: 'matrix', label: 'Control Matrix' },
    { id: 'dsx', label: 'DSX Fallback' }
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <h1>ABVETOS Factory Console</h1>
        <p>Centralized Agent Management & Operations Control</p>
      </div>
      
      <div className="abvetos-console">
        <div className="abvetos-header">
          <h2>Factory Control Center</h2>
          <StatusIndicator />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-gold)',
          paddingBottom: '1rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === tab.id ? 'var(--color-gold)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-deep-black)' : 'var(--color-bone-white)',
                border: '1px solid var(--color-gold)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'agents' && <AgentPanel />}
        {activeTab === 'commands' && <CommandBridge />}
        {activeTab === 'logs' && <LogsViewer />}
        {activeTab === 'matrix' && <ControlMatrix />}
        {activeTab === 'dsx' && <DSXFallback />}
      </div>
    </div>
  );
}
