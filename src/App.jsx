import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Brands from './pages/Brands';
import MyAvatar from './pages/MyAvatar';
import Wardrobe from './pages/Wardrobe';
import Showroom from './pages/Showroom';
import GlowUp from './pages/GlowUp';
import AskPeacock from './pages/AskPeacock';
import ContextualInputsTest from './pages/ContextualInputsTest';

function App() {
  return (
    <div className="min-h-screen bg-tryonyou-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/my-avatar" element={<MyAvatar />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/glow-up" element={<GlowUp />} />
        <Route path="/ask-peacock" element={<AskPeacock />} />
        <Route path="/contextual-test" element={<ContextualInputsTest />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
