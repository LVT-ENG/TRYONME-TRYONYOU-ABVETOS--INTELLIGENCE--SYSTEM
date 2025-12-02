import React from 'react';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content animate-slide-up">
        <h1>
          <span>TRYONYOU</span>
        </h1>
        <p>Experience Hyper-Real Fashion with AI-Powered Virtual Try-On Technology</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/demo" className="btn btn-primary">Try Outfit</a>
          <a href="#explore" className="btn btn-outline">Explore Look</a>
        </div>
      </div>
    </section>
  );
}
