import React from 'react';
import { setLocale, getLocale, type Locale } from '../i18n';

const languages = [
  { code: 'en' as Locale, label: 'EN', flag: '🇬🇧' },
  { code: 'es' as Locale, label: 'ES', flag: '🇪🇸' },
  { code: 'fr' as Locale, label: 'FR', flag: '🇫🇷' },
];

export function LanguageSelector() {
  const [currentLocale, setCurrentLocale] = React.useState<Locale>(getLocale());

  const handleChange = (locale: Locale) => {
    setLocale(locale);
    setCurrentLocale(locale);
    window.location.reload(); // Reload to apply translations
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`
            px-3 py-2 rounded-lg font-medium transition-all
            ${
              currentLocale === lang.code
                ? 'bg-divineo-gold text-divineo-anthracite'
                : 'bg-divineo-anthracite/50 text-divineo-beige hover:bg-divineo-gold/20'
            }
          `}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
