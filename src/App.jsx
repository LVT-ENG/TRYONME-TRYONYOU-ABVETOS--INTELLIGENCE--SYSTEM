import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

// Lazy load pages to split bundles
const Investors = lazy(() => import('./pages/Investors'));
const MagicMirror = lazy(() => import('./pages/MagicMirror'));

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
