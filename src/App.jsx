import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Brands = lazy(() => import('./pages/Brands'));
const MyAvatar = lazy(() => import('./pages/MyAvatar'));
const Wardrobe = lazy(() => import('./pages/Wardrobe'));
const Showroom = lazy(() => import('./pages/Showroom'));
const GlowUp = lazy(() => import('./pages/GlowUp'));
const AskPeacock = lazy(() => import('./pages/AskPeacock'));
const Demo = lazy(() => import('./pages/Demo'));
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
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/my-avatar" element={<MyAvatar />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/glow-up" element={<GlowUp />} />
          <Route path="/ask-peacock" element={<AskPeacock />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/magic-mirror" element={<MagicMirror />} />
          {/* Backward compatibility redirects */}
          <Route path="/MagicMirror" element={<Navigate to="/magic-mirror" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
