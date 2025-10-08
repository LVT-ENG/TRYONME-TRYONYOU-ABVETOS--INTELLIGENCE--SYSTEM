import React, { useState, useEffect } from 'react'
import './styles/App.css'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Modules from './components/Modules'
import PersonalShopper from './components/PersonalShopper'
import Patents from './components/Patents'
import Partners from './components/Partners'
import CTA from './components/CTA'
import Header from './components/Header'
import Footer from './components/Footer'
import Sparkles from './components/Sparkles'
import PauOverlay from './components/PauOverlay'

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
      <PauOverlay 
        visible={pauVisible} 
        animationState="idle"
        onInteraction={handlePauInteraction}
      />
      <Header />
      <Hero />
      <PersonalShopper />
      <Problem />
      <Solution />
      <Modules />
      <Patents />
      <Partners />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
