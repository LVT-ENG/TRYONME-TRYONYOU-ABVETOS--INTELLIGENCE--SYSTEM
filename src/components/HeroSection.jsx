import React from 'react';

export default function HeroSection() {
  const handleTryOutfit = () => {
    window.location.href = '/demo';
  };

  const handleExploreLook = () => {
    window.location.href = '/demo';
  };

  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>TRYONYOU</h1>
        <p>Experience Hyper-Real Fashion</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleTryOutfit} aria-label="Try an outfit">Try Outfit</button>
          <button className="btn-secondary" onClick={handleExploreLook} aria-label="Explore fashion looks">Explore Look</button>
        </div>
      </div>
    </section>
  );
}
