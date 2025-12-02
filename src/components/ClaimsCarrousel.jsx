import React from 'react';

const claims = [
  { title: 'Emotional AI', description: 'Personalized fashion experiences powered by AI' },
  { title: 'Auto-Production', description: 'Seamless automated fashion production' },
  { title: 'Biometric Payments', description: 'Secure and instant payment solutions' },
  { title: 'Trend Engine', description: 'Real-time fashion trend analysis' },
  { title: 'Smart Wardrobe', description: 'Intelligent wardrobe management' },
  { title: 'Solidarity', description: 'Fashion with a purpose' }
];

export default function ClaimsCarrousel() {
  return (
    <section className="claims-section">
      <h2>Our Fashion Technology</h2>
      <div className="claims-grid">
        {claims.map((claim, index) => (
          <div key={index} className="claim-card">
            <h3>{claim.title}</h3>
            <p>{claim.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
