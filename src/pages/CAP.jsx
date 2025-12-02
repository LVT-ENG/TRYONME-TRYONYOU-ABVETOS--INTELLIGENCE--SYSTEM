import React, { useState } from 'react';

const capModules = [
  { id: 'generator', name: 'Content Generator', status: 'active', description: 'AI-powered content creation' },
  { id: 'optimizer', name: 'Performance Optimizer', status: 'active', description: 'Real-time optimization engine' },
  { id: 'analyzer', name: 'Trend Analyzer', status: 'active', description: 'Fashion trend detection' },
  { id: 'personalizer', name: 'Personalizer', status: 'active', description: 'User preference learning' }
];

const generativeTemplates = [
  { id: 1, name: 'Fashion Article', type: 'Content', description: 'Auto-generate fashion articles' },
  { id: 2, name: 'Style Guide', type: 'Guide', description: 'Personalized style recommendations' },
  { id: 3, name: 'Trend Report', type: 'Analysis', description: 'Weekly trend analysis reports' },
  { id: 4, name: 'Product Description', type: 'Commerce', description: 'E-commerce product copy' },
  { id: 5, name: 'Social Post', type: 'Social', description: 'Social media content' },
  { id: 6, name: 'Newsletter', type: 'Email', description: 'Fashion newsletter templates' }
];

export default function CAP() {
  const [activeModule, setActiveModule] = useState('generator');
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = (templateName) => {
    setGeneratedContent(`[CAP SYSTEM] Generating ${templateName}...\n\nContent generated successfully!\n\nThis is a sample output from the CAP Auto-Generative System.\nPowered by ABVETOS Intelligence.`);
  };

  return (
    <div className="page cap-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-badge">🎯 Auto-Generative</div>
          <h1>CAP System</h1>
          <p className="page-subtitle">
            Content Auto-Production Platform powered by ABVETOS
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* System Status */}
          <div className="status-section">
            <h2>⚡ System Status</h2>
            <div className="modules-grid">
              {capModules.map(module => (
                <div 
                  key={module.id}
                  className={`module-card ${activeModule === module.id ? 'active' : ''}`}
                  onClick={() => setActiveModule(module.id)}
                >
                  <div className="module-header">
                    <span className={`status status-${module.status}`}>
                      <span className="status-dot"></span>
                      {module.status}
                    </span>
                  </div>
                  <h3>{module.name}</h3>
                  <p>{module.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generative Templates */}
          <div className="templates-section">
            <h2>📝 Generative Templates</h2>
            <div className="templates-grid">
              {generativeTemplates.map(template => (
                <div key={template.id} className="template-card">
                  <div className="template-type">{template.type}</div>
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => generateContent(template.name)}
                  >
                    Generate
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Output Console */}
          <div className="output-section">
            <h2>💻 Generation Output</h2>
            <div className="console">
              <div className="console-header">
                <span className="console-dot red"></span>
                <span className="console-dot yellow"></span>
                <span className="console-dot green"></span>
                <span className="console-title">CAP Console</span>
              </div>
              <div className="console-body">
                {generatedContent ? (
                  <pre>{generatedContent}</pre>
                ) : (
                  <p className="console-placeholder">Select a template to generate content...</p>
                )}
              </div>
            </div>
          </div>

          {/* API Integration */}
          <div className="api-section">
            <h2>🔗 Q-API Integration</h2>
            <div className="api-grid">
              <div className="api-card">
                <code>POST /cap/generate</code>
                <p>Generate content from template</p>
              </div>
              <div className="api-card">
                <code>GET /cap/templates</code>
                <p>List available templates</p>
              </div>
              <div className="api-card">
                <code>GET /cap/status</code>
                <p>Get system status</p>
              </div>
              <div className="api-card">
                <code>POST /cap/optimize</code>
                <p>Optimize generated content</p>
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
        }
        
        .status-section,
        .templates-section,
        .output-section,
        .api-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .status-section h2,
        .templates-section h2,
        .output-section h2,
        .api-section h2 {
          margin-bottom: var(--spacing-md);
        }
        
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .module-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .module-card:hover,
        .module-card.active {
          border-color: var(--accent-peacock);
          box-shadow: var(--shadow-glow);
        }
        
        .module-header {
          margin-bottom: var(--spacing-sm);
        }
        
        .module-card h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .module-card p {
          font-size: 0.75rem;
        }
        
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }
        
        .template-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          transition: all 0.3s ease;
        }
        
        .template-card:hover {
          border-color: var(--accent-peacock);
        }
        
        .template-type {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          color: var(--accent-gold);
          padding: 0.125rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.625rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .template-card h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .template-card p {
          font-size: 0.75rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
        }
        
        .console-title {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .console-body pre {
          white-space: pre-wrap;
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
        }
        
        .console-placeholder {
          color: var(--text-secondary);
          font-style: italic;
        }
        
        .api-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        
        .api-card {
          background: var(--bg-card);
          border: 1px solid rgba(0, 206, 209, 0.2);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
        }
        
        .api-card code {
          display: block;
          color: var(--accent-peacock);
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
          margin-bottom: var(--spacing-xs);
        }
        
        .api-card p {
          font-size: 0.75rem;
        }
        
        @media (max-width: 1024px) {
          .modules-grid,
          .api-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .templates-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .modules-grid,
          .templates-grid,
          .api-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
