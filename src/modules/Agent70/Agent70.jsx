import React, { useState } from 'react';

// Agent70 State Management
const initialState = {
  approvals: [],
  pendingReviews: [],
  deploymentStatus: 'idle',
  lastCheck: null,
};

export function useAgent70() {
  const [state, setState] = useState(initialState);

  const authorize = (itemId, approved = true) => {
    setState(prev => ({
      ...prev,
      approvals: [...prev.approvals, { id: itemId, approved, timestamp: new Date().toISOString() }],
      pendingReviews: prev.pendingReviews.filter(item => item.id !== itemId),
    }));
  };

  const reviewZipStructure = (zipFile) => {
    console.log('Reviewing ZIP structure:', zipFile);
    return { valid: true, issues: [] };
  };

  const confirmDeployment = () => {
    setState(prev => ({ ...prev, deploymentStatus: 'confirmed' }));
  };

  const detectInconsistencies = (data) => {
    console.log('Checking for inconsistencies...');
    return [];
  };

  const veto = (agentId, reason) => {
    console.log(`Vetoing agent ${agentId}: ${reason}`);
  };

  return { state, authorize, reviewZipStructure, confirmDeployment, detectInconsistencies, veto };
}

export default function Agent70() {
  const { state, authorize, confirmDeployment } = useAgent70();
  const [activeTab, setActiveTab] = useState('status');

  const mockPendingItems = [
    { id: 1, type: 'Build', name: 'TRYONYOU_MASTER_FINAL.zip', status: 'pending', timestamp: new Date().toISOString() },
    { id: 2, type: 'Deploy', name: 'Vercel Production', status: 'pending', timestamp: new Date().toISOString() },
    { id: 3, type: 'Module', name: 'ABVETOS Factory v1.0', status: 'approved', timestamp: new Date().toISOString() },
  ];

  const systemStatus = [
    { component: 'ABVETOS Core', status: 'active', health: 98 },
    { component: 'Q-API Layer', status: 'active', health: 100 },
    { component: 'Core Dock', status: 'active', health: 95 },
    { component: 'Builder Team', status: 'standby', health: 100 },
    { component: 'Deploy Express', status: 'ready', health: 100 },
  ];

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div>
            <h1>Agent70 Command Bridge</h1>
            <p style={{ color: 'var(--color-gray-500)' }}>Supreme Supervisor & Final Authority</p>
          </div>
          <div className="status status-active">ONLINE</div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-gray-800)' }}>
          {['status', 'approvals', 'logs', 'deploy'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--spacing-md)',
                color: activeTab === tab ? 'var(--color-neon-cyan)' : 'var(--color-gray-500)',
                borderBottom: activeTab === tab ? '2px solid var(--color-neon-cyan)' : '2px solid transparent',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Status Panel */}
        {activeTab === 'status' && (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {systemStatus.map((item, index) => (
              <div key={index} className="module-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="module-title">{item.component}</h3>
                  <span className={`status status-${item.status === 'active' ? 'active' : 'pending'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ marginTop: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Health</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-neon-cyan)' }}>{item.health}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-full)' }}>
                    <div style={{ height: '100%', width: `${item.health}%`, background: 'var(--gradient-peacock)', borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approvals Panel */}
        {activeTab === 'approvals' && (
          <div className="card">
            <h3>Pending Approvals</h3>
            <div style={{ marginTop: 'var(--spacing-xl)' }}>
              {mockPendingItems.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: 'var(--spacing-md)', 
                    borderBottom: '1px solid var(--color-gray-800)' 
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>{item.type}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                    <span className={`status status-${item.status === 'approved' ? 'active' : 'pending'}`}>
                      {item.status.toUpperCase()}
                    </span>
                    {item.status === 'pending' && (
                      <>
                        <button className="btn btn-primary" onClick={() => authorize(item.id, true)}>Approve</button>
                        <button className="btn btn-secondary" onClick={() => authorize(item.id, false)}>Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logs Panel */}
        {activeTab === 'logs' && (
          <div className="card" style={{ maxHeight: '500px', overflow: 'auto' }}>
            <h3>Core Dock Logs</h3>
            <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', marginTop: 'var(--spacing-md)' }}>
              <div style={{ padding: 'var(--spacing-xs) 0', color: 'var(--color-peacock-green)' }}>[INFO] System initialized successfully</div>
              <div style={{ padding: 'var(--spacing-xs) 0', color: 'var(--color-bone-white)' }}>[INFO] Agent70 connected to Core Dock</div>
              <div style={{ padding: 'var(--spacing-xs) 0', color: 'var(--color-bone-white)' }}>[INFO] Q-API endpoints verified</div>
              <div style={{ padding: 'var(--spacing-xs) 0', color: 'var(--color-gold)' }}>[WARN] Awaiting build approval</div>
              <div style={{ padding: 'var(--spacing-xs) 0', color: 'var(--color-bone-white)' }}>[INFO] All systems nominal</div>
            </div>
          </div>
        )}

        {/* Deploy Panel */}
        {activeTab === 'deploy' && (
          <div className="card">
            <h3>Deploy Express Control</h3>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--spacing-xl)' }}>
              Authorize and trigger final deployment pipeline
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ color: 'var(--color-peacock-green)' }}>✓</span>
                <span>Build validated</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ color: 'var(--color-peacock-green)' }}>✓</span>
                <span>ZIP structure verified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ color: 'var(--color-gold)' }}>○</span>
                <span>Awaiting final authorization</span>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={confirmDeployment}
              style={{ marginTop: 'var(--spacing-xl)', width: '100%' }}
            >
              Authorize Deployment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
