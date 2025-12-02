import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/station-f', label: 'Station F' },
    { path: '/abvetos-factory', label: 'ABVETOS Factory' },
    { path: '/smart-wardrobe', label: 'Smart Wardrobe' },
    { path: '/solidarity-wardrobe', label: 'Solidarity Wardrobe' },
    { path: '/cap', label: 'CAP System' },
    { path: '/pau', label: 'PAU' }
  ];

  return (
    <nav className="nav-main">
      <Link to="/" className="nav-logo">TRYONYOU</Link>
      <ul className="nav-links">
        {routes.map(({ path, label }) => (
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
    </nav>
  );
}
