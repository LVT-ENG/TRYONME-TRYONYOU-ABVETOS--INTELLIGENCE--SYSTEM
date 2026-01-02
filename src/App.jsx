import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
          {/* Main product pages */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/brands" element={<><Navbar /><Brands /><Footer /></>} />
          <Route path="/my-avatar" element={<><Navbar /><MyAvatar /><Footer /></>} />
          <Route path="/wardrobe" element={<><Navbar /><Wardrobe /><Footer /></>} />
          <Route path="/showroom" element={<><Navbar /><Showroom /><Footer /></>} />
          <Route path="/glow-up" element={<><Navbar /><GlowUp /><Footer /></>} />
          <Route path="/ask-peacock" element={<><Navbar /><AskPeacock /><Footer /></>} />
          <Route path="/demo" element={<><Navbar /><Demo /><Footer /></>} />
          
          {/* Presentation pages (no nav/footer for clean presentation) */}
          <Route path="/investors" element={<Investors />} />
          <Route path="/magic-mirror" element={<MagicMirror />} />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
