import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, User, Shirt, Sparkles, Wand2, MessageCircle, Home, Play, Sun, Moon, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { getLogoPath } from '../utils/assets'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme, isDark } = useTheme()

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

  // Main navigation routes
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/demo', label: 'Demo', icon: Play },
    { path: '/my-avatar', label: 'Avatar', icon: User },
    { path: '/wardrobe', label: 'Wardrobe', icon: Shirt },
    { path: '/look', label: 'Look Sheet', icon: FileText },
    { path: '/showroom', label: 'Showroom', icon: Sparkles },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-tryonyou-black/95 backdrop-blur-lg shadow-lg border-b border-gray-800' 
            : 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-gray-200/50'
          : isDark
            ? 'bg-tryonyou-black/80 backdrop-blur-sm'
            : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left side */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img 
              src={getLogoPath('logo.png')} 
              alt="TRYONYOU" 
              className="object-cover w-auto h-16 transition-transform duration-300 group-hover:scale-110"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
            <span className={`font-display text-2xl font-bold hidden sm:block ${isDark ? 'text-white' : 'text-anthracite'}`}>
              TRYONYOU
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="items-center hidden space-x-1 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.path
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-2 ${
                    isActive
                      ? 'text-tryonyou-gold'
                      : isDark 
                        ? 'text-white/70 hover:text-white hover:bg-white/10'
                        : 'text-anthracite/70 hover:text-anthracite hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 border rounded-lg bg-tryonyou-gold/10 border-tryonyou-gold/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA Button + Theme Toggle + Logo - Right side */}
          <div className="items-center hidden gap-4 lg:flex">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>
            
            <Link to="/ask-peacock" className="btn-peacock" title="Ask Peacock">
              <img src={getLogoPath('peak.jpeg')} alt="Ask Peacock" className="object-cover w-auto h-14" />
            </Link>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-100 text-anthracite hover:bg-gray-200'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden shadow-lg ${
              isDark 
                ? 'bg-tryonyou-black border-t border-gray-800' 
                : 'bg-white border-t border-gray-200'
            }`}
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
                          ? 'bg-tryonyou-gold/10 text-tryonyou-gold'
                          : isDark
                            ? 'text-white/70 hover:text-white hover:bg-white/10'
                            : 'text-anthracite/70 hover:text-anthracite hover:bg-gray-100'
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
                className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
              >
                <Link to="/ask-peacock" className="flex items-center justify-center w-full gap-2 btn-peacock">
                  <img src={getLogoPath('peak.png')} alt="Ask Peacock" className="object-contain w-auto h-8" />
                  <span className="font-medium text-anthracite">Ask Peacock</span>
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
