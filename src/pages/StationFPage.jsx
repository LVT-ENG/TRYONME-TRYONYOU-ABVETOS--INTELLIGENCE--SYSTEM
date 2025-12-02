import React from 'react';

export default function StationFPage() {
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Station F</h1>
        <p>TRYONYOU Innovation Hub - Paris</p>
      </div>
      <div className="station-content" style={{ padding: '2rem' }}>
        <p style={{ marginBottom: '1rem' }}>
          Station F is the world's largest startup campus, located in Paris. 
          TRYONYOU's presence at Station F represents our commitment to innovation 
          and the future of hyper-real fashion technology.
        </p>
        <div className="agent-panel">
          <div className="agent-card">
            <h3>AI Fashion Lab</h3>
            <p>Advanced machine learning models for virtual try-on experiences</p>
            <span className="status active">Active</span>
          </div>
          <div className="agent-card">
            <h3>Biometric Research</h3>
            <p>Next-generation body measurement and fit prediction</p>
            <span className="status active">Active</span>
          </div>
          <div className="agent-card">
            <h3>Sustainability Unit</h3>
            <p>Reducing fashion waste through digital-first experiences</p>
            <span className="status active">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
