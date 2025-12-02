import React from 'react';

const claims = [
  'Emotional AI',
  'Auto-Production',
  'Biometric Payments',
  'Trend Engine',
  'Smart Wardrobe',
  'Solidarity'
];

export default function ClaimsCarousel() {
  return (
    <section className="claims-section">
      <div className="claims-container">
        <h2 className="claims-title">Our Core Technologies</h2>
        <div className="claims-grid">
          {claims.map((claim, index) => (
            <div 
              key={index} 
              className="claim-card animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3>{claim}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
