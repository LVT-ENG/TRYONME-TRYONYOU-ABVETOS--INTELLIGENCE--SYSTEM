import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <span>TRYONYOU</span>
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/demo" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Demo
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/station-f" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Station-F
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
