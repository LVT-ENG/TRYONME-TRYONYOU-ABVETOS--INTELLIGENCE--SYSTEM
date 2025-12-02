import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PauMascot from './components/PauMascot';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import StationFPage from './pages/StationFPage';

export default function App() {
  return (
    <Router>
      <Navigation />
      <PauMascot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/station-f" element={<StationFPage />} />
      </Routes>
    </Router>
  );
}