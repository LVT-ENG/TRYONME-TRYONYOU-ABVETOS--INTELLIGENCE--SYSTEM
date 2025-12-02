import React from 'react';

export default function SmartWardrobePage() {
  const wardrobeItems = [
    { id: 1, name: 'Classic Blazer', category: 'Outerwear', status: 'Available', compatibility: 95 },
    { id: 2, name: 'Silk Blouse', category: 'Tops', status: 'Available', compatibility: 88 },
    { id: 3, name: 'Tailored Trousers', category: 'Bottoms', status: 'Reserved', compatibility: 92 },
    { id: 4, name: 'Evening Dress', category: 'Dresses', status: 'Available', compatibility: 85 },
    { id: 5, name: 'Leather Jacket', category: 'Outerwear', status: 'Available', compatibility: 90 },
    { id: 6, name: 'Cashmere Sweater', category: 'Tops', status: 'Available', compatibility: 87 }
  ];

  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Smart Wardrobe</h1>
        <p>AI-Powered Personal Style Management</p>
      </div>
      
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--color-gold)',
            color: 'var(--color-deep-black)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Scan New Item
          </button>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--color-neon-cyan)',
            color: 'var(--color-deep-black)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Generate Outfit
          </button>
        </div>

        <div className="wardrobe-grid">
          {wardrobeItems.map(item => (
            <div key={item.id} className="wardrobe-item">
              <div style={{ 
                height: '200px', 
                background: 'linear-gradient(135deg, var(--color-anthracite), #3a3a3a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '3rem', opacity: 0.3 }}>👔</span>
              </div>
              <div className="info">
                <h4>{item.name}</h4>
                <p style={{ color: 'var(--color-bone-white)', opacity: 0.7, fontSize: '0.9rem' }}>
                  {item.category}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span className={`status ${item.status === 'Available' ? 'active' : 'pending'}`}>
                    {item.status}
                  </span>
                  <span style={{ color: 'var(--color-neon-cyan)', fontSize: '0.9rem' }}>
                    {item.compatibility}% Match
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
