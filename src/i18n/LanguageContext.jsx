import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

/* eslint-disable react-refresh/only-export-components */

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // 1. Check LocalStorage
    const storedLang = localStorage.getItem('appLanguage');
    if (storedLang && ['en', 'es', 'fr'].includes(storedLang)) {
      setLanguage(storedLang);
      return;
    }

    // 2. Check Browser Language
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // e.g. 'en-US' -> 'en'

    if (['es', 'fr'].includes(langCode)) {
      setLanguage(langCode);
    } else {
      // 3. Fallback to English
      setLanguage('en');
    }
  }, []);

  const changeLanguage = (lang) => {
    if (['en', 'es', 'fr'].includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('appLanguage', lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
