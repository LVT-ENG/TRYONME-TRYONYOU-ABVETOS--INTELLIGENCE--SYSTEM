import React from 'react';

export default function ClaimsCarrousel() {
  const claims = [
    'Emotional AI',
    'Auto‑Production',
    'Biometric Payments',
    'Trend Engine',
    'Smart Wardrobe',
    'Solidarity'
  ];
  
  return (
    <div className='claims-carousel'>
      {claims.map((claim) => (
        <div key={claim} className='claim-item'>{claim}</div>
      ))}
    </div>
  );
}
