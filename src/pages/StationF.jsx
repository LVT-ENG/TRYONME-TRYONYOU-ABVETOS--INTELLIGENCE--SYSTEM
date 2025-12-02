import React from 'react';
import { Link } from 'react-router-dom';

export default function StationF() {
  return (
    <div className="page station-f-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-badge">🚀 Innovation Hub</div>
          <h1>Station-F</h1>
          <p className="page-subtitle">
            TRYONYOU's Innovation & Deployment Center
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="info-card">
              <h2>🏢 About Station-F</h2>
              <p>
                Station-F serves as TRYONYOU's primary innovation hub, connecting 
                the ABVETOS Intelligence System with cutting-edge fashion technology. 
                This is where ideas become reality through AI-powered automation.
              </p>
              <ul className="feature-list">
                <li>Startup acceleration programs</li>
                <li>Direct connection to ABVETOS Factory</li>
                <li>Deploy Express integration</li>
                <li>Real-time fashion trend analysis</li>
              </ul>
            </div>

            <div className="info-card">
              <h2>🔗 Connected Systems</h2>
              <div className="system-grid">
                <Link to="/abvetos-factory" className="system-link">
                  <span className="system-icon">🏭</span>
                  <span>ABVETOS Factory</span>
                </Link>
                <Link to="/smart-wardrobe" className="system-link">
                  <span className="system-icon">👔</span>
                  <span>Smart Wardrobe</span>
                </Link>
                <Link to="/cap" className="system-link">
                  <span className="system-icon">🎯</span>
                  <span>CAP System</span>
                </Link>
                <Link to="/pau" className="system-link">
                  <span className="system-icon">🦚</span>
                  <span>PAU Assistant</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="deployment-section">
            <h2>📦 Deployment Pipeline</h2>
            <div className="pipeline">
              <div className="pipeline-step">
                <div className="step-number">1</div>
                <h3>Development</h3>
                <p>Code & Design</p>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step">
                <div className="step-number">2</div>
                <h3>ABVETOS Review</h3>
                <p>Agent70 Approval</p>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step">
                <div className="step-number">3</div>
                <h3>Testing</h3>
                <p>Q-API Validation</p>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step active">
                <div className="step-number">4</div>
                <h3>Deploy Express</h3>
                <p>Production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .page-hero {
          padding: calc(80px + var(--spacing-xl)) 0 var(--spacing-lg);
          background: var(--gradient-metallic);
          text-align: center;
        }
        
        .page-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(0, 206, 209, 0.2);
          border: 1px solid var(--accent-peacock);
          border-radius: var(--radius-full);
          color: var(--accent-peacock);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
        }
        
        .page-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .info-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
        }
        
        .info-card h2 {
          margin-bottom: var(--spacing-sm);
          font-size: 1.5rem;
        }
        
        .feature-list {
          list-style: none;
          margin-top: var(--spacing-sm);
        }
        
        .feature-list li {
          padding: 0.5rem 0;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .feature-list li::before {
          content: '✓';
          color: var(--accent-peacock);
          margin-right: 0.5rem;
        }
        
        .system-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
          margin-top: var(--spacing-sm);
        }
        
        .system-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: var(--spacing-sm);
          background: rgba(0, 206, 209, 0.1);
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
        }
        
        .system-link:hover {
          background: rgba(0, 206, 209, 0.2);
          transform: translateX(4px);
        }
        
        .system-icon {
          font-size: 1.5rem;
        }
        
        .deployment-section {
          margin-top: var(--spacing-lg);
          text-align: center;
        }
        
        .deployment-section h2 {
          margin-bottom: var(--spacing-md);
        }
        
        .pipeline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }
        
        .pipeline-step {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
          min-width: 150px;
          transition: all 0.3s ease;
        }
        
        .pipeline-step.active {
          border-color: var(--accent-peacock);
          box-shadow: var(--shadow-glow);
        }
        
        .step-number {
          width: 40px;
          height: 40px;
          background: var(--gradient-peacock);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-xs);
          font-weight: 700;
          color: var(--primary-dark);
        }
        
        .pipeline-step h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .pipeline-step p {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .pipeline-arrow {
          font-size: 1.5rem;
          color: var(--accent-peacock);
        }
        
        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
          
          .pipeline-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
