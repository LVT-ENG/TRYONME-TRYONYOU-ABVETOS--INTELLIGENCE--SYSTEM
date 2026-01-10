import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from "./contexts/LanguageContext";
import PageLoader from "./components/PageLoader";

// Static imports for core pages to ensure visibility
import Home from './pages/Home';
import Pilot from './pages/Pilot';
import Scan from './pages/Scan';
import Voice from './pages/Voice';
import Result from './pages/Result';
import Demo from './pages/Demo';

// Lazy load for auxiliary pages
const AbvetCheckout = lazy(() => import("./components/AbvetCheckout"));
const RegisterPartner = lazy(() => import("./pages/RegisterPartner"));

// Wrapper to provide suspense to lazy components
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/result" element={<Result />} />
          <Route path="/demo" element={<Demo />} />

          <Route path="/checkout" element={
            <LazyWrapper>
              <AbvetCheckout />
            </LazyWrapper>
          } />
          <Route path="/register-partner" element={
            <LazyWrapper>
              <RegisterPartner />
            </LazyWrapper>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
