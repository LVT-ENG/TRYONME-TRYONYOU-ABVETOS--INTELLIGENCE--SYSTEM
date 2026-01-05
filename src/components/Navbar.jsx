import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, User, Shirt, Sparkles, Wand2, Home, Play, Ruler, Activity, Package, CreditCard, ShieldCheck, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/demo', label: 'Demo', icon: Play },
    { path: '/brands', label: 'Brands', icon: ShoppingBag },
    { path: '/my-avatar', label: 'My Avatar', icon: User },
    { path: '/wardrobe', label: 'Wardrobe', icon: Shirt },
    { path: '/showroom', label: 'Showroom', icon: Sparkles },
    { path: '/glow-up', label: 'Glow-Up', icon: Wand2 },
    { path: '/ask-peacock', label: 'Ask Peacock', icon: MessageCircle },
    { path: '/pilot', label: 'Pilot', icon: Activity },
    { path: '/fit', label: 'FIT', icon: Ruler },
    { path: '/cap', label: 'CAP', icon: Package },
    { path: '/abvet', label: 'ABVET', icon: CreditCard },
    { path: '/claims', label: 'Claims', icon: ShieldCheck },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg shadow-black/20' : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-tryonyou-blue to-tryonyou-darkblue flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-tryonyou-blue/30"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="20" r="18" fill="url(#logo-gradient)" />
                <circle cx="20" cy="20" r="6" fill="#D4AF37" />
                <defs>
                  <radialGradient id="logo-gradient">
                    <stop offset="0%" stopColor="#00A8E8" />
                    <stop offset="100%" stopColor="#003459" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>
            <span className="font-display text-2xl font-bold gradient-text hidden sm:block">
              TRYONYOU
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.path
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-2 ${
                    isActive
                      ? 'text-tryonyou-blue'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-tryonyou-blue/10 rounded-lg border border-tryonyou-blue/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/demo" className="btn-primary text-sm px-4 py-2">
              Try Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path
                
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-tryonyou-blue/20 text-tryonyou-blue'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 border-t border-white/10"
              >
                <Link to="/demo" className="btn-primary w-full text-center">
                  Try Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
