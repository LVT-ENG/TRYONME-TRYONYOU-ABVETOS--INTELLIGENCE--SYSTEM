import React, { useState } from 'react';

export default function CAPSystem() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const capFeatures = [
    { icon: '🎨', title: 'CAP Designer', description: 'Create custom CAP configurations' },
    { icon: '📊', title: 'Analytics', description: 'Track CAP performance and usage' },
    { icon: '🔄', title: 'Auto-Generation', description: 'AI-powered CAP generation' },
    { icon: '📦', title: 'Asset Manager', description: 'Manage CAP assets and resources' },
  ];

  const recentCaps = [
    { id: 1, name: 'Summer Collection CAP', status: 'active', created: '2024-01-15' },
    { id: 2, name: 'Winter Essentials CAP', status: 'draft', created: '2024-01-14' },
    { id: 3, name: 'Sustainable Fashion CAP', status: 'active', created: '2024-01-13' },
  ];

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div>
            <h1>CAP System</h1>
            <p style={{ color: 'var(--color-gray-500)' }}>Content Asset Pipeline</p>
          </div>
          <button className="btn btn-primary">Create New CAP</button>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-gray-800)' }}>
          {['dashboard', 'designer', 'assets', 'history'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--spacing-md)',
                color: activeSection === section ? 'var(--color-neon-cyan)' : 'var(--color-gray-500)',
                borderBottom: activeSection === section ? '2px solid var(--color-neon-cyan)' : '2px solid transparent',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 'var(--spacing-2xl)' }}>
              {capFeatures.map((feature, index) => (
                <div key={index} className="module-card">
                  <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{feature.icon}</div>
                  <h3 className="module-title">{feature.title}</h3>
                  <p className="module-description">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="card">
              <h3>Recent CAPs</h3>
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                {recentCaps.map((cap) => (
                  <div 
                    key={cap.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--spacing-md)',
                      borderBottom: '1px solid var(--color-gray-800)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{cap.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Created: {cap.created}</div>
                    </div>
                    <span className={`status status-${cap.status === 'active' ? 'active' : 'pending'}`}>
                      {cap.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Designer */}
        {activeSection === 'designer' && (
          <div className="card">
            <h3>CAP Designer</h3>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--spacing-xl)' }}>
              Create and customize your Content Asset Pipeline configurations.
            </p>
            
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-gray-500)' }}>CAP Name</label>
                <input 
                  type="text" 
                  placeholder="Enter CAP name..."
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-gray-800)',
                    border: '1px solid var(--color-gray-800)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-bone-white)',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-gray-500)' }}>Description</label>
                <textarea 
                  placeholder="Describe your CAP..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-gray-800)',
                    border: '1px solid var(--color-gray-800)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-bone-white)',
                    resize: 'vertical',
                  }}
                />
              </div>
              <button className="btn btn-primary">Generate CAP</button>
            </div>
          </div>
        )}

        {/* Assets */}
        {activeSection === 'assets' && (
          <div className="card">
            <h3>Asset Manager</h3>
            <p style={{ color: 'var(--color-gray-500)' }}>
              Manage all assets associated with your CAPs.
            </p>
            <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center', padding: 'var(--spacing-2xl)', border: '2px dashed var(--color-gray-800)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📁</div>
              <p>Drag and drop assets here or click to upload</p>
              <button className="btn btn-secondary" style={{ marginTop: 'var(--spacing-md)' }}>Browse Files</button>
            </div>
          </div>
        )}

        {/* History */}
        {activeSection === 'history' && (
          <div className="card">
            <h3>CAP History</h3>
            <p style={{ color: 'var(--color-gray-500)' }}>
              View and manage your CAP generation history.
            </p>
            <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
              No history entries yet. Start creating CAPs to see your history.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
