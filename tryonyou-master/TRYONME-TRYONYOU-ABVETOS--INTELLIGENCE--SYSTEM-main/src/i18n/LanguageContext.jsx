import React, { createContext, useState, useContext, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem('tryonyou-language')
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
      return
    }

    // Auto-detect browser language (ES, FR, EN)
    const browserLang = navigator.language || navigator.userLanguage
    let detectedLang = 'en' // default fallback

    // Check for Spanish
    if (browserLang.startsWith('es')) {
      detectedLang = 'es'
    }
    // Check for French
    else if (browserLang.startsWith('fr')) {
      detectedLang = 'fr'
    }
    // Check for English
    else if (browserLang.startsWith('en')) {
      detectedLang = 'en'
    }
    // Try to match the first part of the language code
    else {
      const langCode = browserLang.split('-')[0].toLowerCase()
      if (translations[langCode]) {
        detectedLang = langCode
      }
    }

    // Set detected language
    if (translations[detectedLang]) {
      setLanguage(detectedLang)
      localStorage.setItem('tryonyou-language', detectedLang)
    }
  }, [])

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
      localStorage.setItem('tryonyou-language', lang)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return value || key
  }

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
