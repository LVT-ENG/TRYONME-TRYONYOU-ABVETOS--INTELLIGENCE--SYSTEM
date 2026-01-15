import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPilot from './pages/LandingPilot';
import GoogleNews from './pages/GoogleNews';
import Demo from './pages/Demo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPilot />} />
      <Route path="/google-news" element={<GoogleNews />} />
      <Route path="/demo" element={<Demo />} />
      {/* Fallback route to LandingPilot */}
      <Route path="*" element={<LandingPilot />} />
    </Routes>
  );
}

export default App;
