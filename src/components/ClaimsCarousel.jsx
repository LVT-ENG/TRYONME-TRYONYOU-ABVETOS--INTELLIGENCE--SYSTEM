import React from 'react';

const claims = [
  'Emotional AI',
  'Auto-Production',
  'Biometric Payments',
  'Trend Engine',
  'Smart Wardrobe',
  'Solidarity Fashion',
  'Virtual Try-On',
  'Style Matching'
];

export default function ClaimsCarousel() {
  // Duplicate claims for infinite scroll effect
  const duplicatedClaims = [...claims, ...claims];
  
  return (
    <section className="claims-section">
      <div className="claims-carousel">
        {duplicatedClaims.map((claim, index) => (
          <div key={index} className="claim-item">
            {claim}
          </div>
        ))}
      </div>
    </section>
  );
}
