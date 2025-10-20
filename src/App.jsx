import React, { useState, useEffect, lazy, Suspense } from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import Footer from './components/Footer'
import Sparkles from './components/Sparkles'

// Lazy load components below the fold for better initial load performance
const UserJourney = lazy(() => import('./components/UserJourney'))
const Modules = lazy(() => import('./components/Modules'))
const SmartCloset = lazy(() => import('./components/SmartCloset'))
const ABVETSection = lazy(() => import('./components/ABVETSection'))
const InvestorPitch = lazy(() => import('./components/InvestorPitch'))
const Problem = lazy(() => import('./components/Problem'))
const Solution = lazy(() => import('./components/Solution'))
const PersonalShopper = lazy(() => import('./components/PersonalShopper'))
const Patents = lazy(() => import('./components/Patents'))
const ClaimsCarousel = lazy(() => import('./components/ClaimsCarousel'))
const ProjectsGallery = lazy(() => import('./components/ProjectsGallery'))
const Partners = lazy(() => import('./components/Partners'))
const CTA = lazy(() => import('./components/CTA'))
const PauOverlay = lazy(() => import('./components/PauOverlay'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    minHeight: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    opacity: 0.5
  }}>
    <div className="loading-spinner"></div>
  </div>
)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [pauVisible, setPauVisible] = useState(true)

  useEffect(() => {
    // No validator, direct load
    setIsLoaded(true)
    
    // Check if Pau overlay should be enabled
    const enablePau = import.meta.env.VITE_ENABLE_PAU_OVERLAY !== 'false'
    setPauVisible(enablePau)
  }, [])

  const handlePauInteraction = (state) => {
    console.log('Pau interaction:', state)
    // Future: Add analytics or custom behavior
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Sparkles intensity={30} />
      <Suspense fallback={null}>
        <PauOverlay 
          visible={pauVisible} 
          animationState="idle"
          onInteraction={handlePauInteraction}
        />
      </Suspense>
      <Header />
      <Hero />
      {/* 1. Hero principal con avatar holográfico ✓ */}
      
      {/* 2. Ciclo de usuario visual */}
      <Suspense fallback={<LoadingFallback />}>
        <UserJourney />
      </Suspense>
      
      {/* 3. Core modules - cuadrícula de 9 módulos */}
      <Suspense fallback={<LoadingFallback />}>
        <Modules />
      </Suspense>
      
      {/* 4. Smart Closet - armario holográfico */}
      <Suspense fallback={<LoadingFallback />}>
        <SmartCloset />
      </Suspense>
      
      {/* 5. ABVET + PAU - biométrico y emocional */}
      <Suspense fallback={<LoadingFallback />}>
        <ABVETSection />
      </Suspense>
      
      {/* 6. Investor Pitch & Claims Grid */}
      <Suspense fallback={<LoadingFallback />}>
        <InvestorPitch />
      </Suspense>
      
      {/* Additional sections */}
      <Suspense fallback={<LoadingFallback />}>
        <Problem />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Solution />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <PersonalShopper />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ClaimsCarousel />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Patents />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ProjectsGallery />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <CTA />
      </Suspense>
      <Footer />
    </div>
  )
}

export default App

