import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: t('nav.brands'), path: '/brands' },
      { label: t('nav.myAvatar'), path: '/my-avatar' },
      { label: t('nav.wardrobe'), path: '/wardrobe' },
      { label: t('nav.showroom'), path: '/showroom' },
      { label: t('nav.glowUp'), path: '/glow-up' },
      { label: t('nav.askPeacock'), path: '/ask-peacock' },
    ],
    company: [
      { label: t('footer.company.aboutUs'), path: '/about' },
      { label: t('footer.company.forBrands'), path: '/for-brands' },
      { label: t('footer.company.blog'), path: '/blog' },
      { label: t('footer.company.contact'), path: '/contact' },
    ],
    legal: [
      { label: t('footer.legal.privacy'), path: '/privacy' },
      { label: t('footer.legal.terms'), path: '/terms' },
      { label: t('footer.legal.cookies'), path: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/tryonyou', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/tryonyou', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/tryonyou', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@tryonyou.app', label: 'Email' },
  ]

  return (
    <footer className="bg-tryonyou-smoke/80 backdrop-blur-lg border-t border-white/10">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-tryonyou-blue/20 via-amparo-light/10 to-tryonyou-blue/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{t('footer.cta.title')}</h3>
              <p className="text-white/60">{t('footer.cta.subtitle')}</p>
            </div>
            <a 
              href="mailto:hello@tryonyou.app" 
              className="btn-primary whitespace-nowrap group"
            >
              {t('footer.cta.button')}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tryonyou-blue to-tryonyou-darkblue flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
                  <circle cx="20" cy="20" r="18" fill="url(#footer-logo-gradient)" />
                  <circle cx="20" cy="20" r="6" fill="#D4AF37" />
                  <defs>
                    <radialGradient id="footer-logo-gradient">
                      <stop offset="0%" stopColor="#00A8E8" />
                      <stop offset="100%" stopColor="#003459" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-display text-xl font-bold gradient-text">
                TRYONYOU
              </span>
            </div>
            <p className="text-sm text-white/60 mb-4 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-tryonyou-blue/20 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:text-tryonyou-blue transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.sections.product')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-tryonyou-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.sections.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-tryonyou-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.sections.legal')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-tryonyou-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <p className="text-sm text-white/60 flex items-center gap-2">
              {t('footer.poweredBy')} <span className="text-tryonyou-blue font-semibold">Agent70</span> 
              <span className="text-white/30">•</span>
              <span className="text-tryonyou-blue font-semibold">DSX Engine</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

