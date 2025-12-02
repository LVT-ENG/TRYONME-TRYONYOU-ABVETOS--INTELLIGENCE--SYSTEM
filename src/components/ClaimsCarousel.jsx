import React from 'react';
import { Link } from 'react-router-dom';

const claims = [
  { icon: '🧠', title: 'Emotional AI', description: 'AI-powered emotional recognition for personalized fashion' },
  { icon: '🔄', title: 'Auto-Production', description: 'Automated garment production with ABVETOS' },
  { icon: '💳', title: 'Biometric Payments', description: 'ADBET Payment layer integration' },
  { icon: '📈', title: 'FTT Trend Engine', description: 'Fashion Trend Tracker for real-time insights' },
  { icon: '👔', title: 'Smart Wardrobe', description: 'Intelligent wardrobe management system' },
  { icon: '🤝', title: 'Solidarity Wardrobe', description: 'Community-driven fashion sharing' }
];

export default function ClaimsCarousel() {
  return (
    <section className="claims-section">
      <div className="container">
        <h2 className="section-title">Powered by Innovation</h2>
        <div className="claims-grid">
          {claims.map((claim, index) => (
            <div key={index} className="claim-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="claim-icon">{claim.icon}</div>
              <h3>{claim.title}</h3>
              <p>{claim.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .claims-section {
          padding: var(--spacing-xl) 0;
          background: var(--bg-secondary);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: var(--spacing-lg);
          background: linear-gradient(135deg, var(--accent-peacock), var(--accent-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .claims-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-md);
        }
        
        .claim-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease both;
        }
        
        .claim-card:hover {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }
        
        .claim-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .claim-card h3 {
          color: var(--text-primary);
          margin-bottom: var(--spacing-xs);
        }
        
        .claim-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
