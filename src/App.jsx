import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Demo = lazy(() => import('./pages/Demo'));
const MyAvatar = lazy(() => import('./pages/MyAvatar'));
const Wardrobe = lazy(() => import('./pages/Wardrobe'));
const Showroom = lazy(() => import('./pages/Showroom'));
const GlowUp = lazy(() => import('./pages/GlowUp'));
const Brands = lazy(() => import('./pages/Brands'));
const AskPeacock = lazy(() => import('./pages/AskPeacock'));

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-tryonyou-black text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/my-avatar" element={<MyAvatar />} />
              <Route path="/wardrobe" element={<Wardrobe />} />
              <Route path="/showroom" element={<Showroom />} />
              <Route path="/glow-up" element={<GlowUp />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/ask" element={<AskPeacock />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
