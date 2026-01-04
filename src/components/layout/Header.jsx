import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  User, 
  Search, 
  Bell, 
  Crown,
  Home,
  Play,
  Shirt,
  Sparkles,
  Wand2,
  MessageCircle,
  Ruler,
  Package,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/demo', label: 'Demo', icon: Play },
    { path: '/brands', label: 'Brands', icon: ShoppingBag },
    { path: '/my-avatar', label: 'My Avatar', icon: User },
    { path: '/wardrobe', label: 'Wardrobe', icon: Shirt },
    { path: '/showroom', label: 'Showroom', icon: Sparkles },
    { path: '/glow-up', label: 'Glow-Up', icon: Wand2 },
    { path: '/ask-peacock', label: 'Ask Peacock', icon: MessageCircle },
    { path: '/fit', label: 'FIT', icon: Ruler },
    { path: '/cap', label: 'CAP', icon: Package },
    { path: '/abvet', label: 'ABVET', icon: CreditCard },
    { path: '/claims', label: 'Claims', icon: ShieldCheck },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass shadow-2xl shadow-tryonyou-blue/20 border-b border-white/10' 
          : 'bg-gradient-to-b from-black/80 via-black/50 to-transparent'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Premium Logo */}
          <Link to="/" className="flex items-center space-x-4 group relative">
            <motion.div 
              className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-tryonyou-blue via-tryonyou-darkblue to-black flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-tryonyou-blue/40"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            >
              {/* Premium Crown Badge */}
              <motion.div 
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-tryonyou-gold to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-tryonyou-gold/50"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Crown size={12} className="text-white" />
              </motion.div>
              
              <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
                <defs>
                  <linearGradient id="premium-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D9FF" />
                    <stop offset="50%" stopColor="#00A8E8" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                  <filter id="premium-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="20" cy="20" r="18" fill="url(#premium-logo-gradient)" filter="url(#premium-glow)" />
                <circle cx="20" cy="20" r="7" fill="#D4AF37" />
                <circle cx="20" cy="20" r="4" fill="white" opacity="0.8" />
              </svg>
            </motion.div>
            
            <div className="hidden sm:block">
              <motion.span 
                className="font-display text-3xl font-bold gradient-text block"
                whileHover={{ scale: 1.05 }}
              >
                TRYONYOU
              </motion.span>
              <span className="text-xs text-tryonyou-gold font-semibold tracking-wider uppercase">
                Premium Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 8).map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl flex items-center gap-2 group ${
                    isActive
                      ? 'text-tryonyou-gold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="premium-nav-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-tryonyou-blue/10 via-tryonyou-gold/10 to-tryonyou-blue/10 rounded-xl border border-tryonyou-gold/30 shadow-lg shadow-tryonyou-gold/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Premium Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="relative p-3 rounded-xl glass hover:bg-white/20 transition-all duration-300 group"
            >
              <Search size={20} className="text-white/80 group-hover:text-white" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl glass hover:bg-white/20 transition-all duration-300 group"
            >
              <Bell size={20} className="text-white/80 group-hover:text-white" />
              <motion.span 
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl glass hover:bg-white/20 transition-all duration-300 group"
            >
              <ShoppingBag size={20} className="text-white/80 group-hover:text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-tryonyou-gold text-black text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* User Profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-tryonyou-gold/20 to-tryonyou-blue/20 border border-tryonyou-gold/30 hover:border-tryonyou-gold/50 transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tryonyou-gold to-tryonyou-blue flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white hidden xl:block">Premium</span>
              <Crown size={14} className="text-tryonyou-gold" />
            </motion.button>

            {/* CTA Button */}
            <Link 
              to="/demo" 
              className="relative px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-tryonyou-gold via-yellow-500 to-tryonyou-gold bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-lg shadow-tryonyou-gold/30 hover:shadow-tryonyou-gold/50 hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10">Try Premium Demo</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl glass"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Premium Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pb-4 overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  placeholder="Search for brands, styles, or products..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl glass text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tryonyou-gold/50 transition-all"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-tryonyou-gold/20 to-tryonyou-blue/20 text-tryonyou-gold border border-tryonyou-gold/30'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{link.label}</span>
                      {isActive && <Crown size={14} className="ml-auto text-tryonyou-gold" />}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 space-y-3 border-t border-white/10"
              >
                <Link 
                  to="/demo" 
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-tryonyou-gold to-yellow-600 hover:from-yellow-600 hover:to-tryonyou-gold transition-all shadow-lg shadow-tryonyou-gold/30"
                >
                  <Crown size={16} />
                  <span>Try Premium Demo</span>
                </Link>
                
                <div className="flex gap-2">
                  <button className="flex-1 p-3 rounded-xl glass hover:bg-white/10 transition-all">
                    <Search size={20} className="mx-auto text-white/80" />
                  </button>
                  <button className="flex-1 p-3 rounded-xl glass hover:bg-white/10 transition-all relative">
                    <Bell size={20} className="mx-auto text-white/80" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                  <button className="flex-1 p-3 rounded-xl glass hover:bg-white/10 transition-all relative">
                    <ShoppingBag size={20} className="mx-auto text-white/80" />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-tryonyou-gold text-black text-xs font-bold rounded-full flex items-center justify-center">3</span>
                  </button>
                  <button className="flex-1 p-3 rounded-xl glass hover:bg-white/10 transition-all">
                    <User size={20} className="mx-auto text-white/80" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
