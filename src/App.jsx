import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PilotExperience from './components/PilotExperience';
import AbvetCheckout from './components/AbvetCheckout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<PilotExperience />} />
        <Route path="/checkout" element={<AbvetCheckout />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
