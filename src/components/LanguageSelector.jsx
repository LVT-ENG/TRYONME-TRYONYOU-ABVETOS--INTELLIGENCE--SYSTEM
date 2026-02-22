import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'es', label: 'ES', full: 'Español' },
    { code: 'fr', label: 'FR', full: 'Français' },
  ];

  const handleSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-white/20 shadow-sm px-4 py-2 bg-[#141619]/80 text-sm font-medium text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
          id="language-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {language.toUpperCase()}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-[#1a1d21] ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`
                  ${language === lang.code ? 'bg-[#C5A46D]/20 text-[#C5A46D]' : 'text-gray-300'}
                  group flex items-center px-4 py-2 text-sm w-full text-left hover:bg-[#C5A46D]/10 hover:text-white transition-colors duration-150
                `}
                role="menuitem"
                tabIndex="-1"
              >
                <span className="mr-2 text-xs opacity-70">{lang.code.toUpperCase()}</span>
                {lang.full}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
