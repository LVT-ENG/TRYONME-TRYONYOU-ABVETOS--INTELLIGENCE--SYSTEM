import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import StationF from './pages/StationF';
import AbvetosFactory from './pages/AbvetosFactory';
import SmartWardrobe from './pages/SmartWardrobe';
import SolidarityWardrobe from './pages/SolidarityWardrobe';
import CAP from './pages/CAP';
import PAU from './pages/PAU';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/station-f" element={<StationF />} />
            <Route path="/abvetos-factory" element={<AbvetosFactory />} />
            <Route path="/smart-wardrobe" element={<SmartWardrobe />} />
            <Route path="/solidarity-wardrobe" element={<SolidarityWardrobe />} />
            <Route path="/cap" element={<CAP />} />
            <Route path="/pau" element={<PAU />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}