import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-copyright">
          © {currentYear} TRYONYOU - ABVETOS Intelligence System. All rights reserved.
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <span style={{ margin: '0 0.5rem' }}>|</span>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
