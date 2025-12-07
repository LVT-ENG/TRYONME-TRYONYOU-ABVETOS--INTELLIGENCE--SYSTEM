import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getLogoPath } from '../utils/assets'

const Footer = () => {
  const { isDark } = useTheme()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: 'Brands', path: '/brands' },
      { label: 'My Avatar', path: '/my-avatar' },
      { label: 'Wardrobe', path: '/wardrobe' },
      { label: 'Showroom', path: '/showroom' },
      { label: 'Glow-Up', path: '/glow-up' },
      { label: 'Ask Peacock', path: '/ask-peacock' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'For Brands', path: '/for-brands' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact', path: '/contact' },
    ],
    legal: [
      { label: 'Privacy', path: '/privacy' },
      { label: 'Terms', path: '/terms' },
      { label: 'Cookies', path: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/tryonyou', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/tryonyou', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/tryonyou', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@tryonyou.app', label: 'Email' },
  ]

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-tryonyou-black/90 backdrop-blur-lg border-white/10' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      {/* CTA Banner */}
      <div className={`border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-tryonyou-blue/20 via-amparo-light/10 to-tryonyou-blue/20 border-white/10' 
          : 'bg-gradient-to-r from-tryonyou-gold/10 via-gold-light/5 to-tryonyou-gold/10 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-anthracite'}`}>
                Want to integrate TryOnYou with your brand?
              </h3>
              <p className={isDark ? 'text-white/60' : 'text-anthracite/60'}>
                Reduce returns by up to 75% with our technology
              </p>
            </div>
            <a 
              href="mailto:hello@tryonyou.app" 
              className="btn-gold whitespace-nowrap group"
            >
              Request a Demo
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform inline" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={getLogoPath('logo.png')} alt="TRYONYOU" className="h-12 w-auto" />
              <span className="font-display text-xl font-bold gradient-text">
                TRYONYOU
              </span>
            </div>
            <p className={`text-sm mb-4 max-w-xs ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
              Your trusted virtual fitting room. Find the perfect outfit without infinite returns.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors group ${
                    isDark 
                      ? 'glass hover:bg-tryonyou-blue/20' 
                      : 'bg-gray-100 hover:bg-tryonyou-gold/20'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={18} className={`transition-colors ${
                    isDark ? 'group-hover:text-tryonyou-blue' : 'group-hover:text-tryonyou-gold'
                  }`} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-anthracite'}`}>
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors ${
                      isDark 
                        ? 'text-white/60 hover:text-tryonyou-blue' 
                        : 'text-anthracite/60 hover:text-tryonyou-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-anthracite'}`}>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors ${
                      isDark 
                        ? 'text-white/60 hover:text-tryonyou-blue' 
                        : 'text-anthracite/60 hover:text-tryonyou-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-anthracite'}`}>
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors ${
                      isDark 
                        ? 'text-white/60 hover:text-tryonyou-blue' 
                        : 'text-anthracite/60 hover:text-tryonyou-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
              © {currentYear} TRYONYOU. All rights reserved.
            </p>
            <p className={`text-sm flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-anthracite/60'}`}>
              Powered by <span className={`font-semibold ${isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'}`}>Agent70</span> 
              <span className={isDark ? 'text-white/30' : 'text-anthracite/30'}>•</span>
              <span className={`font-semibold ${isDark ? 'text-tryonyou-blue' : 'text-tryonyou-gold'}`}>DSX Engine</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
