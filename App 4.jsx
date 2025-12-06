import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Brands from "./pages/Brands";
import IntelligentSystem from "./pages/IntelligentSystem";
import Wardrobe from "./pages/Wardrobe";
import Avatar from "./pages/Avatar";
import Showroom from "./pages/Showroom";
import LafayetteDemo from "./pages/LafayetteDemo";
import StationF from "./pages/StationF";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="top-bar">
          <div className="brand-block">
            <div className="brand-logo-orb"></div>
            <div className="brand-text-block">
              <span className="brand-title">TRYONYOU</span>
              <span className="brand-subtitle">ABVETOS · ULTRA · PLUS · ULTIMATUM</span>
            </div>
          </div>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/demo" className="nav-link">Demo</Link>
            <Link to="/brands" className="nav-link">Brands</Link>
            <Link to="/intelligent-system" className="nav-link">AI System</Link>
            <Link to="/wardrobe" className="nav-link">Wardrobe</Link>
            <Link to="/avatar" className="nav-link">Avatar</Link>
            <Link to="/showroom" className="nav-link">Showroom</Link>
            <Link to="/lafayette-demo" className="nav-link">Lafayette</Link>
            <Link to="/station-f" className="nav-link">Station F</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/intelligent-system" element={<IntelligentSystem />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/lafayette-demo" element={<LafayetteDemo />} />
            <Route path="/station-f" element={<StationF />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-left">
            <span className="footer-label">TRYONYOU System</span>
            <span className="footer-dot"></span>
            <span className="footer-text">Patent-based intelligence stack</span>
          </div>
          <div className="footer-right">
            <span className="footer-tag">DRS-TRYONYOU v1.0</span>
            <span className="footer-tag">React + Vite 7.1.2</span>
            <span className="footer-tag">ABVETOS</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
