import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={
          <div className="min-h-screen bg-divineo-anthracite flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-luxury text-divineo-gold mb-4">404</h1>
              <p className="text-divineo-beige">Page Not Found</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
