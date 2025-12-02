import React from 'react';

export default function ClaimsCarrousel() {
  const claims = [
    { title: 'Emotional AI', description: 'AI that understands your style preferences' },
    { title: 'Auto-Production', description: 'Automated fashion production pipeline' },
    { title: 'Biometric Payments', description: 'Secure, personalized transactions' },
    { title: 'Trend Engine', description: 'Real-time fashion trend analysis' },
    { title: 'Smart Wardrobe', description: 'AI-powered outfit recommendations' },
    { title: 'Solidarity', description: 'Sustainable fashion sharing community' },
  ];

  return (
    <section className="section" style={{ background: 'var(--color-anthracite)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          Our Core Features
        </h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {claims.map((claim, index) => (
            <div key={index} className="module-card">
              <h3 className="module-title">{claim.title}</h3>
              <p className="module-description">{claim.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}