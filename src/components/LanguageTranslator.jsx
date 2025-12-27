import { useEffect } from 'react';
import { Globe } from 'lucide-react';

/**
 * Language Translator Component
 * Integrates Google Translate for automatic multi-language support
 * Supports: Spanish, German, Russian, Arabic, Chinese, French
 * Auto-detects French for Paris/France users
 */
export function LanguageTranslator() {
  useEffect(() => {
    // Detect user language and auto-translate
    const userLang = detectUserLanguage();
    
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de,ru,ar,zh-CN',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      
      // Auto-translate to French if user is in France/Paris
      if (userLang === 'fr') {
        setTimeout(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = 'fr';
            select.dispatchEvent(new Event('change'));
          }
        }, 1000);
      }
    };

    return () => {
      // Cleanup on unmount
      const googleScript = document.querySelector('script[src*="translate.google.com"]');
      if (googleScript) {
        googleScript.remove();
      }
    };
  }, []);

  return (
    <div className="language-translator flex items-center gap-2">
      <Globe className="text-abvetos-gold" size={16} />
      <div id="google_translate_element" className="inline-block"></div>
      <style>{`
        #google_translate_element {
          display: inline-block;
        }
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 12px !important;
          color: #D4AF37 !important;
        }
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: 1px solid rgba(212, 175, 55, 0.2) !important;
          border-radius: 4px;
          padding: 4px 8px !important;
        }
        .goog-te-gadget-simple:hover {
          border-color: rgba(212, 175, 55, 0.5) !important;
        }
        .goog-te-gadget-icon {
          display: none !important;
        }
        .goog-te-menu-value span {
          color: #D4AF37 !important;
        }
        .goog-te-menu-value span:hover {
          color: #E8C765 !important;
        }
      `}</style>
    </div>
  );
}

// Enhanced language detector with Paris/France support
export function detectUserLanguage() {
  // Try to detect language from browser
  const browserLang = navigator.language || navigator.userLanguage;
  
  // Check timezone for Paris detection
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isParis = timezone === 'Europe/Paris' || timezone === 'Europe/Brussels';
  
  // Map to supported languages
  const langMap = {
    'fr': 'fr', // French (prioritized for Paris)
    'es': 'es', // Spanish
    'de': 'de', // German
    'ru': 'ru', // Russian
    'ar': 'ar', // Arabic
    'zh': 'zh-CN', // Chinese
  };

  const detectedLang = browserLang.substring(0, 2).toLowerCase();
  
  // Force French for Paris timezone or French browser
  if (isParis || detectedLang === 'fr') {
    console.log('🇫🇷 Paris detected - Auto-translating to French');
    return 'fr';
  }
  
  return langMap[detectedLang] || 'en';
}
