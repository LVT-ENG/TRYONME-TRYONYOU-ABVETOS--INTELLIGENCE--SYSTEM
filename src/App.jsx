import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Investors from './pages/Investors';
import MagicMirror from './pages/MagicMirror';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Forzamos que la raíz sea Investors */}
        <Route path="/" element={<Investors />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/MagicMirror" element={<MagicMirror />} />
        {/* Cualquier ruta desconocida redirige a la home para evitar pantalla negra */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
