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
import AskPeacock from './pages/AskPeacock'
import FittingRoom from './pages/FittingRoom'

function App() {
  return (
    <div className="min-h-screen bg-tryonyou-black">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/my-avatar" element={<MyAvatar />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/glow-up" element={<GlowUp />} />
          <Route path="/ask-peacock" element={<AskPeacock />} />
          <Route path="/fitting-room" element={<FittingRoom />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
