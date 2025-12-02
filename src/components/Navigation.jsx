import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/abvetos-factory', label: 'ABVETOS Factory' },
    { path: '/smart-wardrobe', label: 'Smart Wardrobe' },
    { path: '/solidarity-wardrobe', label: 'Solidarity' },
    { path: '/cap', label: 'CAP System' },
    { path: '/pau', label: 'PAU' },
    { path: '/station-t', label: 'Station T' },
  ];

  return (
    <nav className="nav">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          TRYONYOU
        </Link>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
