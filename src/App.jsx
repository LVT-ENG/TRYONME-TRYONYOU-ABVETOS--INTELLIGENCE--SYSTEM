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

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
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
