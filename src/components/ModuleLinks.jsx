import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
  { 
    path: '/abvetos-factory', 
    icon: '🏭', 
    title: 'ABVETOS Factory', 
    description: 'Q-API & Agent Forge Console',
    status: 'active'
  },
  { 
    path: '/station-f', 
    icon: '🚀', 
    title: 'Station-F', 
    description: 'Innovation Hub & Deployment',
    status: 'active'
  },
  { 
    path: '/smart-wardrobe', 
    icon: '👔', 
    title: 'Smart Wardrobe', 
    description: 'Intelligent Fashion Management',
    status: 'active'
  },
  { 
    path: '/solidarity-wardrobe', 
    icon: '🤝', 
    title: 'Solidarity Wardrobe', 
    description: 'Community Fashion Sharing',
    status: 'active'
  },
  { 
    path: '/cap', 
    icon: '🎯', 
    title: 'CAP System', 
    description: 'Auto-Generative Platform',
    status: 'active'
  },
  { 
    path: '/pau', 
    icon: '🦚', 
    title: 'PAU Assistant', 
    description: 'Personal AI Fashion Guide',
    status: 'active'
  }
];

export default function ModuleLinks() {
  return (
    <section className="modules-section">
      <div className="container">
        <h2 className="section-title">Core Modules</h2>
        <p className="section-subtitle">Access the full TRYONYOU ecosystem</p>
        <div className="modules-grid">
          {modules.map((module, index) => (
            <Link 
              key={module.path} 
              to={module.path} 
              className="module-link-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="module-link-header">
                <span className="module-icon">{module.icon}</span>
                <span className={`status status-${module.status}`}>
                  <span className="status-dot"></span>
                  {module.status}
                </span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="module-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .modules-section {
          padding: var(--spacing-xl) 0;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: var(--spacing-xs);
        }
        
        .section-subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-lg);
        }
        
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }
        
        .module-link-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-decoration: none;
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease both;
          position: relative;
          overflow: hidden;
        }
        
        .module-link-card:hover {
          border-color: var(--accent-peacock);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }
        
        .module-link-card:hover .module-arrow {
          transform: translateX(4px);
          opacity: 1;
        }
        
        .module-link-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .module-icon {
          font-size: 2rem;
        }
        
        .module-link-card h3 {
          color: var(--text-primary);
          margin-bottom: var(--spacing-xs);
        }
        
        .module-link-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        .module-arrow {
          position: absolute;
          right: var(--spacing-md);
          bottom: var(--spacing-md);
          font-size: 1.5rem;
          color: var(--accent-peacock);
          opacity: 0.5;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
