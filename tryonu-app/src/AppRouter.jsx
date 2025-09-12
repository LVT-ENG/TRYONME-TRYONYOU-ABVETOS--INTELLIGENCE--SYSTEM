import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import VirtualWardrobe from './pages/VirtualWardrobe';
import BiometricPayment from './pages/BiometricPayment';
import TryOnExperience from './pages/TryOnExperience';
import Dashboard from './pages/Dashboard';
import { SentryErrorBoundary } from './sentry.js';

export default function AppRouter() {
  return (
    <SentryErrorBoundary fallback={({ error, resetError }) => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">We're working to fix this issue. Please try again.</p>
          <button 
            onClick={resetError}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )}>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/wardrobe" element={<VirtualWardrobe />} />
              <Route path="/payment" element={<BiometricPayment />} />
              <Route path="/tryon" element={<TryOnExperience />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SentryErrorBoundary>
  );
}