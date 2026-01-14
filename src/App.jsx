import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';
import LandingPilot from './pages/LandingPilot';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/landing-pilot" element={<LandingPilot />} />
    </Routes>
  );
}

export default App;
