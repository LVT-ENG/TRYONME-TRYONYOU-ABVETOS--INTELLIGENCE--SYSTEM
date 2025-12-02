import React from 'react';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">TRYONYOU</h1>
        <p className="hero-subtitle">Experience Hyper-Real Fashion with AI-Powered Intelligence</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/abvetos-factory" className="btn btn-primary">Explore ABVETOS</a>
          <a href="/smart-wardrobe" className="btn btn-secondary">Smart Wardrobe</a>
        </div>
      </div>
    </section>
  );
}