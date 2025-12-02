import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">TRYONYOU</Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/demo" className={isActive('/demo') ? 'active' : ''}>Demo</Link>
        </li>
        <li>
          <Link to="/station-f" className={isActive('/station-f') ? 'active' : ''}>Station-F</Link>
        </li>
      </ul>
    </nav>
  );
}
