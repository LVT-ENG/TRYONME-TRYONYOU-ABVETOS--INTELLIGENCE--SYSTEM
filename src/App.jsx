import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Layout from './components/Layout';

// Page Components
import HeroSection from './HeroSection';
import ClaimsCarrousel from './ClaimsCarrousel';
import StationTPage from './StationTPage';
import SmartWardrobe from './SmartWardrobe';
import SolidaryWardrobe from './SolidaryWardrobe';

// Module Components
import ABVETOSFactory from './modules/ABVETOS/ABVETOSFactory';
import Agent70 from './modules/Agent70/Agent70';
import CoreDock from './modules/CoreDock/CoreDock';
import CAPSystem from './modules/CAP/CAPSystem';
import PAUAvatar from './modules/PAU/PAUAvatar';
import DeployExpress from './modules/DeployExpress/DeployExpress';

// Home Page Component
function HomePage() {
  return (
    <>
      <HeroSection />
      <ClaimsCarrousel />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/station-t" element={<StationTPage />} />
          
          {/* Wardrobe Routes */}
          <Route path="/smart-wardrobe" element={<SmartWardrobe />} />
          <Route path="/solidarity-wardrobe" element={<SolidaryWardrobe />} />
          
          {/* ABVETOS System Routes */}
          <Route path="/abvetos-factory" element={<ABVETOSFactory />} />
          <Route path="/agent70" element={<Agent70 />} />
          <Route path="/core-dock" element={<CoreDock />} />
          
          {/* Module Routes */}
          <Route path="/cap" element={<CAPSystem />} />
          <Route path="/pau" element={<PAUAvatar />} />
          <Route path="/deploy" element={<DeployExpress />} />
          
          {/* Fallback for unknown routes */}
          <Route path="*" element={
            <div className="section">
              <div className="container" style={{ textAlign: 'center' }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary" style={{ marginTop: 'var(--spacing-xl)' }}>
                  Return Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}