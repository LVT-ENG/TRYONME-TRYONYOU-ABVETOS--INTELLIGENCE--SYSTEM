import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <span style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '1.5rem', 
            color: '#c9a227' 
          }}>
            TRYONYOU
          </span>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} TRYONYOU by ABVETOS. All rights reserved.
        </p>
        <p className="footer-text" style={{ marginTop: '0.5rem' }}>
          Experience Hyper-Real Fashion Technology
        </p>
      </div>
    </footer>
  );
}
