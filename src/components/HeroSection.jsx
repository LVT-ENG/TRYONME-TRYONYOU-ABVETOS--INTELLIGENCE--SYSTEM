import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles"></div>
      </div>
      <div className="container hero-content">
        <div className="hero-badge">DRS-TRYONYOU v1.0</div>
        <h1 className="hero-title">TRYONYOU</h1>
        <p className="hero-tagline">
          Experience Hyper-Real Fashion with AI-Powered Virtual Try-On Technology
        </p>
        <p className="hero-description">
          The future of fashion is here. Powered by ABVETOS Intelligence System, 
          Agent70 Supervision, and Q-API Architecture.
        </p>
        <div className="hero-cta">
          <Link to="/abvetos-factory" className="btn btn-primary">
            Enter ABVETOS Factory
          </Link>
          <Link to="/smart-wardrobe" className="btn btn-secondary">
            Explore Smart Wardrobe
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">8</span>
            <span className="stat-label">Agent Types</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4</span>
            <span className="stat-label">Core Layers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">∞</span>
            <span className="stat-label">Possibilities</span>
          </div>
        </div>
      </div>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }
        
        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(0, 206, 209, 0.15) 0%, transparent 70%),
                      radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                      linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }
        
        .hero-particles {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(0, 206, 209, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 1px, transparent 1px);
          background-size: 60px 60px, 80px 80px, 100px 100px;
          animation: float 20s linear infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(0, 206, 209, 0.2);
          border: 1px solid var(--accent-peacock);
          border-radius: var(--radius-full);
          color: var(--accent-peacock);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
          animation: fadeIn 0.6s ease;
        }
        
        .hero-title {
          font-size: clamp(3rem, 12vw, 8rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: var(--spacing-sm);
          animation: fadeIn 0.8s ease 0.2s both;
        }
        
        .hero-tagline {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
          animation: fadeIn 0.8s ease 0.4s both;
        }
        
        .hero-description {
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto var(--spacing-lg);
          animation: fadeIn 0.8s ease 0.6s both;
        }
        
        .hero-cta {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--spacing-xl);
          animation: fadeIn 0.8s ease 0.8s both;
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
          animation: fadeIn 0.8s ease 1s both;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-peacock);
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .hero-stats {
            gap: var(--spacing-md);
          }
          
          .stat-value {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
