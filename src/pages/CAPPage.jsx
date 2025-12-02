import React from 'react';

export default function CAPPage() {
  const assets = [
    { id: 1, name: 'Brand Logo SVG', type: 'Vector', status: 'Active', size: '24KB' },
    { id: 2, name: 'Hero Banner', type: 'Image', status: 'Active', size: '2.4MB' },
    { id: 3, name: 'Product Templates', type: 'Template', status: 'Active', size: '156KB' },
    { id: 4, name: 'Color Palette', type: 'Config', status: 'Active', size: '4KB' },
    { id: 5, name: 'Typography Set', type: 'Font', status: 'Active', size: '890KB' }
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <h1>CAP System</h1>
        <p>Content Asset Pipeline - Digital Asset Management</p>
      </div>
      
      <div className="cap-dashboard">
        <div className="cap-main">
          <h2 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem' }}>Asset Library</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              placeholder="Search assets..."
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--color-deep-black)',
                border: '1px solid var(--color-gold)',
                borderRadius: '8px',
                color: 'var(--color-bone-white)',
                fontSize: '1rem'
              }}
            />
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-gold)' }}>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--color-gold)' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--color-gold)' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--color-gold)' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--color-gold)' }}>Size</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--color-gold)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset.id} style={{ borderBottom: '1px solid var(--color-anthracite)' }}>
                  <td style={{ padding: '1rem', color: 'var(--color-bone-white)' }}>{asset.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--color-neon-cyan)' }}>{asset.type}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="status active">{asset.status}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--color-bone-white)', opacity: 0.7 }}>{asset.size}</td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      background: 'var(--color-gold)',
                      color: 'var(--color-deep-black)',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '0.5rem'
                    }}>
                      View
                    </button>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      background: 'var(--color-neon-cyan)',
                      color: 'var(--color-deep-black)',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cap-sidebar">
          <div className="cap-widget">
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>Quick Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-bone-white)', opacity: 0.7 }}>Total Assets</span>
                <span style={{ color: 'var(--color-neon-cyan)', fontWeight: 'bold' }}>256</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-bone-white)', opacity: 0.7 }}>Storage Used</span>
                <span style={{ color: 'var(--color-neon-cyan)', fontWeight: 'bold' }}>4.2GB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-bone-white)', opacity: 0.7 }}>Last Updated</span>
                <span style={{ color: 'var(--color-neon-cyan)', fontWeight: 'bold' }}>Today</span>
              </div>
            </div>
          </div>

          <div className="cap-widget">
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>Upload</h3>
            <div style={{
              border: '2px dashed var(--color-gold)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              <p style={{ color: 'var(--color-bone-white)', opacity: 0.7 }}>
                Drag & drop files here or click to upload
              </p>
            </div>
          </div>

          <div className="cap-widget">
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>Recent Activity</h3>
            <div style={{ fontSize: '0.9rem' }}>
              <div style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-anthracite)' }}>
                <span style={{ color: 'var(--color-neon-cyan)' }}>Hero Banner</span>
                <span style={{ color: 'var(--color-bone-white)', opacity: 0.5, marginLeft: '0.5rem' }}>updated</span>
              </div>
              <div style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-anthracite)' }}>
                <span style={{ color: 'var(--color-neon-cyan)' }}>Logo SVG</span>
                <span style={{ color: 'var(--color-bone-white)', opacity: 0.5, marginLeft: '0.5rem' }}>viewed</span>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <span style={{ color: 'var(--color-neon-cyan)' }}>Templates</span>
                <span style={{ color: 'var(--color-bone-white)', opacity: 0.5, marginLeft: '0.5rem' }}>downloaded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
