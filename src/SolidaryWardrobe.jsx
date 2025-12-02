import React from 'react';

export default function SolidaryWardrobe() {
  const features = [
    { icon: '🤝', title: 'Share & Care', description: 'Share clothes you no longer wear with those who need them' },
    { icon: '♻️', title: 'Sustainable Fashion', description: 'Reduce waste by extending the life of quality garments' },
    { icon: '🌍', title: 'Community Impact', description: 'Connect with local charities and donation centers' },
    { icon: '💚', title: 'Eco Credits', description: 'Earn sustainability credits for your contributions' },
  ];

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>Solidarity Wardrobe</h1>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--spacing-2xl)' }}>
          Fashion with purpose. Share your clothes, reduce waste, and make a positive impact in your community.
        </p>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {features.map((feature, index) => (
            <div key={index} className="module-card">
              <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{feature.icon}</div>
              <h3 className="module-title">{feature.title}</h3>
              <p className="module-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <h3>Join the Movement</h3>
          <p>Be part of the sustainable fashion revolution.</p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--spacing-md)' }}>
            Start Sharing
          </button>
        </div>
      </div>
    </div>
  );
}