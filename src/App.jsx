/**
 * App.jsx — Root application component for TryOnYou Ultra V9.0
 *
 * Responsibilities:
 *  - Wraps the entire app in the LanguageProvider so every component
 *    can access i18n helpers via useLanguage().
 *  - Declares the top-level client-side routes using react-router-dom v7.
 *
 * Routes:
 *  /          → LandingPage   — Marketing hero & feature grid
 *  /demo      → PilotExperience — AI-powered virtual try-on studio
 *  /checkout  → AbvetCheckout  — Biometric checkout flow (3-step)
 *  *          → LandingPage   — Fallback for unknown paths
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './pages/LandingPage';
import PilotExperience from './components/PilotExperience';
import AbvetCheckout from './components/AbvetCheckout';

function App() {
  return (
    // LanguageProvider makes the translation helper (t) and current locale
    // available to all descendant components via the LanguageContext.
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<PilotExperience />} />
          <Route path="/checkout" element={<AbvetCheckout />} />
          {/* Catch-all: redirect unknown routes back to the landing page */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
