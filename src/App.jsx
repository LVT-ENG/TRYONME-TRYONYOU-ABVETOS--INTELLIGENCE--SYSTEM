import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLoader from './components/PageLoader';

// Lazy load pages for performance optimization
const LandingPilot = lazy(() => import('./pages/LandingPilot'));
const GoogleNews = lazy(() => import('./pages/GoogleNews'));
const Demo = lazy(() => import('./pages/Demo'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPilot />} />
        <Route path="/google-news" element={<GoogleNews />} />
        <Route path="/demo" element={<Demo />} />
        {/* Fallback route to LandingPilot */}
        <Route path="*" element={<LandingPilot />} />
      </Routes>
    </Suspense>
  );
}

export default App;
