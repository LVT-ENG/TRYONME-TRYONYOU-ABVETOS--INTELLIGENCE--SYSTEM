import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function LanguageSelector() {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languageNames = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  }

  const languageFlags = {
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷'
  }

  const handleLanguageChange = (lang) => {
    changeLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="language-flag">{languageFlags[language]}</span>
        <span className="language-code">{language.toUpperCase()}</span>
        <span className="language-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              className={`language-option ${lang === language ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang)}
            >
              <span className="language-flag">{languageFlags[lang]}</span>
              <span className="language-name">{languageNames[lang]}</span>
              {lang === language && <span className="check-mark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
