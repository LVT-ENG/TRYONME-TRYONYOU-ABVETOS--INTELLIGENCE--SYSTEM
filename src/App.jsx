import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ClaimsCarrousel from './components/ClaimsCarrousel';
import CoreDock from './components/CoreDock';
import StationFPage from './pages/StationFPage';
import SmartWardrobePage from './pages/SmartWardrobePage';
import SolidarityWardrobePage from './pages/SolidarityWardrobePage';
import CAPPage from './pages/CAPPage';
import PAUPage from './pages/PAUPage';
import ABVETOSFactoryConsole from './modules/ABVETOS_FACTORY_CONSOLE/ABVETOSFactoryConsole';

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
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/station-f" element={<StationFPage />} />
        <Route path="/abvetos-factory" element={<ABVETOSFactoryConsole />} />
        <Route path="/smart-wardrobe" element={<SmartWardrobePage />} />
        <Route path="/solidarity-wardrobe" element={<SolidarityWardrobePage />} />
        <Route path="/cap" element={<CAPPage />} />
        <Route path="/pau" element={<PAUPage />} />
      </Routes>
      <CoreDock />
    </Router>
  );
}