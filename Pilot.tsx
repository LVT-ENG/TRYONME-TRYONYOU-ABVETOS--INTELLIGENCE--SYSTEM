import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'wouter'
import { useTranslation } from './i18n/useTranslation'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

interface UserMeasurements {
  height: number | null
  weight: number | null
  chest: number | null
  waist: number | null
  hips: number | null
  shoulder_width: number | null
  arm_length: number | null
  leg_length: number | null
  torso_length: number | null
  occasion: string | null
  category: string | null
  size_preference: string
  [key: string]: number | string | null // Index signature
}

const Pilot = () => {
  const [, setLocation] = useLocation()
  const { t, language, setLanguage, availableLanguages } = useTranslation()

  const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>({
    height: 170,
    weight: 70,
    chest: 96,
    waist: 86,
    hips: 100,
    shoulder_width: 42,
    arm_length: 62,
    leg_length: 84,
    torso_length: 66,
    occasion: 'work',
    category: null,
    size_preference: 'M',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFindFit = () => {
    setIsProcessing(true)
    setTimeout(() => {
      // Pass measurements as state (Note: wouter doesn't support state in navigate directly like RR6,
      // but we can use localStorage or a context. For now let's assume we use localStorage to pass data)
      localStorage.setItem('userMeasurements', JSON.stringify(userMeasurements));
      setLocation('/result')
    }, 1500)
  }

  const measurementFields = [
    { key: 'height', label: t('pilot.labels.height'), placeholder: '170' },
    { key: 'weight', label: t('pilot.labels.weight'), placeholder: '70' },
    { key: 'chest', label: t('pilot.labels.chest'), placeholder: '96' },
    { key: 'waist', label: t('pilot.labels.waist'), placeholder: '86' },
    { key: 'hips', label: t('pilot.labels.hips'), placeholder: '100' },
    { key: 'shoulder_width', label: t('pilot.labels.shoulder_width'), placeholder: '42' },
    { key: 'arm_length', label: t('pilot.labels.arm_length'), placeholder: '62' },
    { key: 'leg_length', label: t('pilot.labels.leg_length'), placeholder: '84' },
    { key: 'torso_length', label: t('pilot.labels.torso_length'), placeholder: '66' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif text-gray-900 cursor-pointer" onClick={() => setLocation('/')}>TRYONYOU</h1>

          {/* Language Selector */}
          <div className="flex gap-2">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                  language === lang
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold font-serif mb-6 text-gray-900">
                {t('pilot.title')}
              </h2>

              <p className="text-gray-700 mb-8">
                {t('pilot.description')}
              </p>

              <div className="space-y-6 mb-8">
                {/* Measurement Input Fields */}
                <div className="grid grid-cols-2 gap-4">
                  {measurementFields.map((field) => (
                    <div key={field.key}>
                      <Label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label}
                      </Label>
                      <Input
                        type="number"
                        placeholder={field.placeholder}
                        value={userMeasurements[field.key] || ''}
                        onChange={(e) => setUserMeasurements({
                          ...userMeasurements,
                          [field.key]: e.target.value ? parseFloat(e.target.value) : null
                        })}
                        className="w-full bg-white border-gray-300 text-gray-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="font-bold text-lg text-gray-900">
                  {t('pilot.labels.occasion')} & {t('pilot.labels.sizePreference')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('pilot.labels.occasion')}
                    </Label>
                    <Select
                      value={userMeasurements.occasion || ''}
                      onValueChange={(val) => setUserMeasurements({
                        ...userMeasurements,
                        occasion: val || null
                      })}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                        <SelectValue placeholder={t('pilot.occasions.work')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">{t('pilot.occasions.work')}</SelectItem>
                        <SelectItem value="casual">{t('pilot.occasions.casual')}</SelectItem>
                        <SelectItem value="formal">{t('pilot.occasions.formal')}</SelectItem>
                        <SelectItem value="event">{t('pilot.occasions.event')}</SelectItem>
                        <SelectItem value="ceremony">{t('pilot.occasions.ceremony')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('pilot.labels.sizePreference')}
                    </Label>
                    <Select
                      value={userMeasurements.size_preference}
                      onValueChange={(val) => setUserMeasurements({
                        ...userMeasurements,
                        size_preference: val
                      })}
                    >
                       <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                        <SelectValue placeholder="M" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleFindFit}
              disabled={isProcessing}
              className={`w-full py-6 rounded-lg font-bold text-white transition-colors shadow-md uppercase tracking-wide text-lg ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}
            >
              {isProcessing ? t('pilot.processing') : t('pilot.button')}
            </Button>

            {isProcessing && (
              <div className="text-center text-sm text-gray-600 mt-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-2 border-gray-300 border-t-yellow-500 rounded-full mx-auto mb-2"
                />
                <p>{t('pilot.processing')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pilot
