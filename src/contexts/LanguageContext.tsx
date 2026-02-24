/**
 * LanguageContext.tsx — Minimal i18n context for TryOnYou.
 *
 * Provides:
 *  - `t(key)` — translation helper; currently returns the key unchanged
 *    (extend with a locale map to add real translations).
 *  - `language` — active locale code (default: 'en').
 *
 * Usage:
 *   import { useLanguage } from '../contexts/LanguageContext';
 *   const { t, language } = useLanguage();
 */
import React, { createContext, useContext } from 'react';

export const LanguageContext = createContext({ 
  t: (key: string) => key, 
  language: 'en' 
});

/** Hook that provides convenient access to the language context. */
export const useLanguage = () => useContext(LanguageContext);

/** Provider component — wrap the app root to enable i18n throughout the tree. */
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageContext.Provider value={{ t: (k) => k, language: 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
};
