import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/station-f', label: 'Station-F' },
    { path: '/abvetos-factory', label: 'ABVETOS Factory' },
    { path: '/smart-wardrobe', label: 'Smart Wardrobe' },
    { path: '/solidarity-wardrobe', label: 'Solidarity' },
    { path: '/cap', label: 'CAP' },
    { path: '/pau', label: 'PAU' }
  ];
  
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>🦚</span>
          <span>TRYONYOU</span>
        </Link>
        <ul className="nav-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link 
                to={path} 
                className={location.pathname === path ? 'active' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
