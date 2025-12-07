import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
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
import LafayetteDemo from './pages/LafayetteDemo'
import IntelligentSystem from './pages/IntelligentSystem'
import Demo from './pages/Demo'
import LookSheetPage from './pages/LookSheetPage'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen page-bg transition-colors duration-300">
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
            <Route path="/lafayette-demo" element={<LafayetteDemo />} />
            <Route path="/intelligent-system" element={<IntelligentSystem />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/avatar" element={<MyAvatar />} />
            <Route path="/look" element={<LookSheetPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
