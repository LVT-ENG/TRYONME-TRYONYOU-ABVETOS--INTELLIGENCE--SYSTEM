import React, { createContext, useContext } from 'react';

export const LanguageContext = createContext({ 
  t: (key: string) => key, 
  language: 'en' 
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageContext.Provider value={{ t: (k) => k, language: 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
};
