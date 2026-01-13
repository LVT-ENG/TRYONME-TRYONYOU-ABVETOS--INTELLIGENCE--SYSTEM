import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';
import GoogleNews from './pages/GoogleNews';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/google-news" element={<GoogleNews />} />
    </Routes>
  );
}

export default App;
