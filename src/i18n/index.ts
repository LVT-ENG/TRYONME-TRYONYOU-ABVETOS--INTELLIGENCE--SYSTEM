// === I18N SYSTEM ===

import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';

export type Locale = 'en' | 'es' | 'fr';

const translations = {
  en,
  es,
  fr,
};

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale) {
  currentLocale = locale;
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
}

export function getLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && translations[saved]) {
      return saved;
    }
  }
  return currentLocale;
}

export function t(key: string): string {
  const locale = getLocale();
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// Initialize locale from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('locale') as Locale;
  if (saved && translations[saved]) {
    currentLocale = saved;
  }
}
