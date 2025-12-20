import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Brands from './pages/Brands'
import MyAvatar from './pages/MyAvatar'
import Wardrobe from './pages/Wardrobe'
import Showroom from './pages/Showroom'
import GlowUp from './pages/GlowUp'
import Demo from './pages/Demo'
import Try from './pages/Try'
import Measure from './pages/Measure'
import Landing from './pages/Landing'

function App() {
  return (
    <div className="min-h-screen bg-tryonyou-black">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/my-avatar" element={<MyAvatar />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/glow-up" element={<GlowUp />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/try" element={<Try />} />
          <Route path="/measure" element={<Measure />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
