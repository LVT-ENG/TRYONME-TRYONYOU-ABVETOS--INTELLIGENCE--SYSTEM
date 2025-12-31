import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Investors from './pages/Investors';
import MagicMirror from './pages/MagicMirror';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Investors />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/MagicMirror" element={<MagicMirror />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
