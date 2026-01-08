import React, { createContext, useContext } from 'react';

// Mock Context to satisfy component dependencies if any
export const LanguageContext = createContext({ t: (key) => key, language: 'en' });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  return (
    <LanguageContext.Provider value={{ t: (k) => k, language: 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
};
