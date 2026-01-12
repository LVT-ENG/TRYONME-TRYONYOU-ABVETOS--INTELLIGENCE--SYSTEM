import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          TRYONYOU
        </h1>
        <p className="hero-subtitle">
          The Fashion Intelligence System
        </p>
        <p className="hero-description">
          Revolutionary AI-powered virtual try-on technology that transforms 
          the way customers experience fashion online. Powered by ABVETOS intelligence.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
