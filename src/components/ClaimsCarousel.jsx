import React from 'react';

export default function ClaimsCarousel() {
  const claims = [
    'Emotional AI',
    'Auto‑Production',
    'Biometric Payments',
    'Trend Engine',
    'Smart Wardrobe',
    'Solidarity'
  ];

  return (
    <div className="claims-carousel">
      {claims.map((claim, index) => (
        <div key={index} className="claim-item">
          {claim}
        </div>
      ))}
    </div>
  );
}