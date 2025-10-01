import React, { useState, useEffect } from 'react'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src="/logo.png" alt="TRYONYOU" />
        </div>
        
        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('modules')} className="nav-link">Modules</button>
          <button onClick={() => scrollToSection('patents')} className="nav-link">Patents & IP</button>
          <button onClick={() => scrollToSection('partners')} className="nav-link">Partners</button>
          <button onClick={() => scrollToSection('cta')} className="nav-link cta-button">Request Demo</button>
        </nav>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
