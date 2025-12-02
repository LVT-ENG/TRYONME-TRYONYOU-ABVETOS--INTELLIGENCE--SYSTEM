import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ClaimsCarrousel from './components/ClaimsCarrousel';
import StationTPage from './pages/StationTPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
              <ClaimsCarrousel />
            </>
          } 
        />
        <Route path="/station-t" element={<StationTPage />} />
      </Routes>
    </Router>
  );
}