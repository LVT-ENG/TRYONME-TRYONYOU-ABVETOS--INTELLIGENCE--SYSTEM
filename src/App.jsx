import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Pilot from './pages/Pilot';
import Scan from './pages/Scan';
import Voice from './pages/Voice';
import Result from './pages/Result';
import Demo from './pages/Demo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pilot" element={<Pilot />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/result" element={<Result />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
