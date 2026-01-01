import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load pages for performance optimization
const Investors = lazy(() => import('./pages/Investors'));
const MagicMirror = lazy(() => import('./pages/MagicMirror'));

// Simple loading fallback
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black text-[#C5A46D]">
    <div className="text-xl font-bold uppercase tracking-widest animate-pulse">
      Loading...
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Investors />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/MagicMirror" element={<MagicMirror />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
