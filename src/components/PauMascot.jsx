import React from 'react';

export default function PauMascot() {
  return (
    <div className="pau-mascot" title="Hi! I'm PAU, your fashion assistant">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Peacock body */}
        <ellipse cx="50" cy="60" rx="20" ry="25" fill="#0e4d4d"/>
        
        {/* Peacock head */}
        <circle cx="50" cy="30" r="12" fill="#0e4d4d"/>
        
        {/* Beak */}
        <polygon points="50,35 45,40 55,40" fill="#c9a227"/>
        
        {/* Eye */}
        <circle cx="47" cy="28" r="3" fill="white"/>
        <circle cx="47" cy="28" r="1.5" fill="#1a1a1a"/>
        
        {/* Crown feathers */}
        <line x1="50" y1="18" x2="45" y2="10" stroke="#c9a227" strokeWidth="2"/>
        <line x1="50" y1="18" x2="50" y2="8" stroke="#c9a227" strokeWidth="2"/>
        <line x1="50" y1="18" x2="55" y2="10" stroke="#c9a227" strokeWidth="2"/>
        
        {/* Tail feathers decorative pattern */}
        <circle cx="30" cy="75" r="8" fill="#c9a227" opacity="0.8"/>
        <circle cx="70" cy="75" r="8" fill="#c9a227" opacity="0.8"/>
        <circle cx="50" cy="85" r="8" fill="#0e7d7d"/>
        
        {/* Small decorative dots */}
        <circle cx="30" cy="75" r="3" fill="#1a1a1a"/>
        <circle cx="70" cy="75" r="3" fill="#1a1a1a"/>
        <circle cx="50" cy="85" r="3" fill="#c9a227"/>
      </svg>
    </div>
  );
}
