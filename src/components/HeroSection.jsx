import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content animate-fadeInUp">
        <h1>TRYONYOU</h1>
        <p>Experience Hyper-Real Fashion Technology</p>
        <p className="hero-tagline">DRS-TRYONYOU v1.0 — Where AI Meets Style</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/demo" className="btn btn-primary">Try the Demo</Link>
          <Link to="/station-f" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
