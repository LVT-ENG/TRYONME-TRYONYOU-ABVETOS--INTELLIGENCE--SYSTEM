import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Investors from './pages/Investors';
import MagicMirror from './pages/MagicMirror';

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div className="bg-black h-screen text-white flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Investors />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/MagicMirror" element={<MagicMirror />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
