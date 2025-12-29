import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

// Pages
import Home from './pages/Home' // Keep Home eager for fast LCP

// Lazy load other pages
const Brands = lazy(() => import('./pages/Brands'))
const MyAvatar = lazy(() => import('./pages/MyAvatar'))
const Wardrobe = lazy(() => import('./pages/Wardrobe'))
const Showroom = lazy(() => import('./pages/Showroom'))
const GlowUp = lazy(() => import('./pages/GlowUp'))
const Demo = lazy(() => import('./pages/Demo'))

function App() {
  return (
    <div className="min-h-screen bg-tryonyou-black">
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/my-avatar" element={<MyAvatar />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/glow-up" element={<GlowUp />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
