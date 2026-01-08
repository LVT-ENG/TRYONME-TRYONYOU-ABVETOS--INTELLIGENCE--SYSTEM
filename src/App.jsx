import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Demo = lazy(() => import('./pages/Demo'));
const Brands = lazy(() => import('./pages/Brands'));
const MyAvatar = lazy(() => import('./pages/MyAvatar'));
const Wardrobe = lazy(() => import('./pages/Wardrobe'));
const Showroom = lazy(() => import('./pages/Showroom'));
const GlowUp = lazy(() => import('./pages/GlowUp'));
const AskPeacock = lazy(() => import('./pages/AskPeacock'));
const Fit = lazy(() => import('./pages/Fit'));
const CAP = lazy(() => import('./pages/CAP'));
const ABVET = lazy(() => import('./pages/ABVET'));
const Claims = lazy(() => import('./pages/Claims'));
const Investors = lazy(() => import('./pages/Investors'));
const MagicMirror = lazy(() => import('./pages/MagicMirror'));
const SmartWardrobe = lazy(() => import('./pages/MagicMirror')); // Reusing MagicMirror component for the SmartWardrobe route

// Simple loading fallback
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black text-[#D4AF37]">
    <div className="text-xl font-bold uppercase tracking-widest animate-pulse">
      Loading...
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A2E]">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/my-avatar" element={<MyAvatar />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/glow-up" element={<GlowUp />} />
            <Route path="/ask-peacock" element={<AskPeacock />} />
            <Route path="/fit" element={<Fit />} />
            <Route path="/cap" element={<CAP />} />
            <Route path="/abvet" element={<ABVET />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/MagicMirror" element={<MagicMirror />} />
            <Route path="/wardrobe-match" element={<SmartWardrobe />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
