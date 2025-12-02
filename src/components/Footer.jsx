import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            🦚 TRYONYOU
          </div>
          <div className="footer-links">
            <Link to="/abvetos-factory">ABVETOS Factory</Link>
            <Link to="/station-f">Station-F</Link>
            <Link to="/smart-wardrobe">Smart Wardrobe</Link>
            <Link to="/cap">CAP</Link>
            <Link to="/pau">PAU Assistant</Link>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} TRYONYOU - DRS-TRYONYOU v1.0 | Powered by ABVETOS Intelligence System
        </div>
      </div>
    </footer>
  );
}
