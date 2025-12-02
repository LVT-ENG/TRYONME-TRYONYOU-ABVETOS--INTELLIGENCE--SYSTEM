import React from 'react';

export default function SolidarityWardrobePage() {
  const donatedItems = [
    { id: 1, name: 'Winter Coat', donor: 'Anonymous', status: 'Available', impact: 'High' },
    { id: 2, name: 'Running Shoes', donor: 'Marie L.', status: 'Claimed', impact: 'Medium' },
    { id: 3, name: 'Business Suit', donor: 'Jean P.', status: 'Available', impact: 'High' },
    { id: 4, name: 'School Uniform', donor: 'Sophie M.', status: 'Available', impact: 'High' },
    { id: 5, name: 'Warm Sweater', donor: 'Anonymous', status: 'Claimed', impact: 'Medium' },
    { id: 6, name: 'Rain Jacket', donor: 'Pierre D.', status: 'Available', impact: 'Medium' }
  ];

  const stats = {
    totalDonations: 1247,
    itemsDistributed: 892,
    activeDonors: 156,
    impactScore: 94
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Solidarity Wardrobe</h1>
        <p>Fashion for All - Community Clothing Exchange</p>
      </div>
      
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            background: 'var(--color-anthracite)',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid var(--color-gold)'
          }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>
              {stats.totalDonations}
            </div>
            <div style={{ color: 'var(--color-bone-white)', opacity: 0.8 }}>Total Donations</div>
          </div>
          <div style={{
            background: 'var(--color-anthracite)',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid var(--color-neon-cyan)'
          }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-neon-cyan)', fontWeight: 'bold' }}>
              {stats.itemsDistributed}
            </div>
            <div style={{ color: 'var(--color-bone-white)', opacity: 0.8 }}>Items Distributed</div>
          </div>
          <div style={{
            background: 'var(--color-anthracite)',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid var(--color-gold)'
          }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>
              {stats.activeDonors}
            </div>
            <div style={{ color: 'var(--color-bone-white)', opacity: 0.8 }}>Active Donors</div>
          </div>
          <div style={{
            background: 'var(--color-anthracite)',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #2ecc71'
          }}>
            <div style={{ fontSize: '2rem', color: '#2ecc71', fontWeight: 'bold' }}>
              {stats.impactScore}%
            </div>
            <div style={{ color: 'var(--color-bone-white)', opacity: 0.8 }}>Impact Score</div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--color-gold)',
            color: 'var(--color-deep-black)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '1rem'
          }}>
            Donate Item
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
            Request Item
          </button>
        </div>

        <div className="wardrobe-grid">
          {donatedItems.map(item => (
            <div key={item.id} className="wardrobe-item">
              <div style={{ 
                height: '150px', 
                background: 'linear-gradient(135deg, var(--color-peacock-teal), var(--color-anthracite))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '3rem' }}>💚</span>
              </div>
              <div className="info">
                <h4>{item.name}</h4>
                <p style={{ color: 'var(--color-bone-white)', opacity: 0.7, fontSize: '0.9rem' }}>
                  Donated by: {item.donor}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span className={`status ${item.status === 'Available' ? 'active' : 'pending'}`}>
                    {item.status}
                  </span>
                  <span style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}>
                    {item.impact} Impact
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
