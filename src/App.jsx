import React from 'react';
import HeroSection from './components/HeroSection';
import ClaimsCarousel from './components/ClaimsCarousel';
import StationTPage from './pages/StationTPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><HeroSection /><ClaimsCarousel /></>} />
        <Route path="/station-t" element={<StationTPage />} />
      </Routes>
    </Router>
  );
}