import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <div className="nav-brand">
        <Link to="/">TRYONYOU</Link>
      </div>
      <div className="nav-links" role="menubar">
        <Link to="/" role="menuitem">Home</Link>
        <Link to="/demo" role="menuitem">Demo</Link>
        <Link to="/station-f" role="menuitem">Station-F</Link>
      </div>
    </nav>
  );
}
