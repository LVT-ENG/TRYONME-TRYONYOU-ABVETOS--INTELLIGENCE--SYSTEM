import { useState } from 'react'
import { translations } from './translations'

type Language = 'en' | 'es' | 'fr'

/**
 * Custom hook for handling translations
 * Usage: const { t } = useTranslation()
 * Then: t('hero.title')
 */
export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('tryonyou_language') as Language
      if (stored && ['en', 'es', 'fr'].includes(stored)) {
        return stored
      }
    }
    return 'en'
  })

  const t = (key: string): string => {
    const keys = key.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return (value as string) || key
  }

  const setLanguageAndSave = (lang: Language) => {
    setLanguage(lang)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tryonyou_language', lang)
    }
  }

  return {
    t,
    language,
    setLanguage: setLanguageAndSave,
    availableLanguages: ['en', 'es', 'fr'] as Language[],
  }
}

export default useTranslation
