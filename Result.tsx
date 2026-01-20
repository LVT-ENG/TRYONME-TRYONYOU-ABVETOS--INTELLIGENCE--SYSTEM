import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'wouter'
import { useTranslation } from './i18n/useTranslation'
import { Button } from './button'

// Types
interface Garment {
  id: string
  name: string
  brand: string
  category: string
  price: number
  image_url: string
  description: string
  size: string
}

interface MeasurementDetail {
  measurement: string
  user_value: number
  garment_value: number
  deviation: number
  tolerance: number
  fit_quality: string
  fit_score: number
}

interface ResultDetails {
  overall_fit_score: number
  tolerance: number
  fabric_elasticity: number
  fabric_drape: number
  measurement_details: MeasurementDetail[]
}

interface ResultData {
  success: boolean
  best_garment: Garment
  fit_score: number
  explanation: string
  details: ResultDetails
  error?: string
}

const Result = () => {
  const [, setLocation] = useLocation()
  const { t, language, setLanguage, availableLanguages } = useTranslation()

  const [result, setResult] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true)

        // Retrieve measurements from localStorage since we can't easily pass state with wouter in this setup
        const storedMeasurements = localStorage.getItem('userMeasurements')
        const measurements = storedMeasurements ? JSON.parse(storedMeasurements) : {}

        // Call the matching endpoint
        // Since we are in the browser, we use the /api proxy or direct call
        let data;
        try {
          const response = await fetch('/api/matching', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              height: measurements.height || 170,
              weight: measurements.weight || 70,
              chest: measurements.chest || 96,
              waist: measurements.waist || 86,
              hips: measurements.hips || 100,
              shoulder_width: measurements.shoulder_width || 42,
              arm_length: measurements.arm_length || 62,
              leg_length: measurements.leg_length || 84,
              torso_length: measurements.torso_length || 66,
              occasion: measurements.occasion || null,
              category: measurements.category || null,
              size_preference: measurements.size_preference || 'M',
            }),
          });
          if (!response.ok) {
             throw new Error('Network response was not ok');
          }
          data = await response.json();
        } catch (e) {
          // Fallback mock data for development if API is not available
          console.warn("API unavailable, using mock data", e);
          data = {
            success: true,
            best_garment: {
              id: "laf_blazer_001",
              name: "Heritage Navy Blazer",
              brand: "Lafayette Couture",
              category: "blazer",
              price: 1890,
              image_url: "/images/blazer_navy.jpg",
              description: "Classic navy blazer with modern tailoring, perfect for formal occasions",
              size: "M"
            },
            fit_score: 95,
            explanation: "This Heritage Navy Blazer is a perfect fit for you (95% match). The 100% virgin wool fabric has moderate stretch (5%), providing comfort with structure. Your Chest, Shoulder measurements align perfectly with this garment.",
            details: {
              overall_fit_score: 95,
              tolerance: 4.5,
              fabric_elasticity: 5,
              fabric_drape: 7,
              measurement_details: [
                { measurement: "Chest", user_value: 96, garment_value: 96, deviation: 0, tolerance: 4.5, fit_quality: "Perfect", fit_score: 100 },
                { measurement: "Shoulder", user_value: 42, garment_value: 42, deviation: 0, tolerance: 4.5, fit_quality: "Perfect", fit_score: 100 }
              ]
            }
          };
        }

        if (data.success) {
          setResult(data)
        } else {
          setError(data.error || 'Failed to find a matching garment')
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError((err as any).message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-gray-300 border-t-yellow-500 rounded-full mx-auto mb-6"
          />
          <p className="text-xl text-gray-700">Finding your perfect fit...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-serif text-gray-900 cursor-pointer" onClick={() => setLocation('/')}>TRYONYOU</h1>
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

        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
              <p className="text-gray-700 mb-8">{error}</p>
              <Button
                onClick={() => setLocation('/')}
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <p className="text-xl text-gray-700">No results found</p>
      </div>
    )
  }

  const garment = result.best_garment
  const fitScore = result.fit_score
  const explanation = result.explanation
  const details = result.details || {} as ResultDetails

  return (
    <div className="min-h-screen bg-white pt-20 text-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif text-gray-900 cursor-pointer" onClick={() => setLocation('/')}>TRYONYOU</h1>
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
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">

            {/* Left: Garment Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-md flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">👗</div>
                <p className="text-gray-700 font-semibold">{garment.name}</p>
                <p className="text-sm text-gray-600 mt-2">{garment.brand}</p>
              </div>
            </motion.div>

            {/* Right: Result Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Fit Score */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
                <h2 className="text-3xl font-bold font-serif mb-2 text-gray-900">
                  {t('result.subtitle')}
                </h2>
                <div className="text-6xl font-bold text-green-600 mb-4">{fitScore}%</div>
                <p className="text-gray-700">{t('result.fitScore')}</p>
              </div>

              {/* Garment Info */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-2xl font-bold font-serif mb-2 text-gray-900">
                  {garment.name}
                </h3>
                <p className="text-gray-600 mb-4">{garment.brand}</p>
                <p className="text-gray-700 mb-4">{garment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-600">
                    ${garment.price.toLocaleString('en-US')}
                  </span>
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                    {garment.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Why It Fits */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {t('result.whyItFits')}
                </h3>
                <p className="text-gray-700 leading-relaxed">{explanation}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setLocation('/')}
                  className="flex-1 py-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg transition-colors uppercase tracking-wide"
                >
                  {t('result.startOver')}
                </Button>
                <Button
                  className="flex-1 py-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors shadow-md uppercase tracking-wide"
                >
                  {t('result.addToCart')}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Detailed Measurements Analysis */}
          {details.measurement_details && details.measurement_details.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl font-bold font-serif mb-6 text-gray-900">
                {t('result.detailedAnalysis')}
              </h3>

              <div className="space-y-6">
                {details.measurement_details.map((measurement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{measurement.measurement}</span>
                      <span className={`text-sm font-bold ${
                        measurement.fit_quality === 'Perfect' ? 'text-green-600' :
                        measurement.fit_quality === 'Excellent' ? 'text-green-600' :
                        measurement.fit_quality === 'Good' ? 'text-blue-600' :
                        measurement.fit_quality === 'Fair' ? 'text-yellow-600' :
                        'text-orange-600'
                      }`}>
                        {measurement.fit_quality}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Your: {measurement.user_value}cm</span>
                      <span>Garment: {measurement.garment_value}cm</span>
                      <span>Deviation: {measurement.deviation.toFixed(1)}cm</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(measurement.fit_score, 100)}%` }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className={`h-full ${
                          measurement.fit_score >= 95 ? 'bg-green-500' :
                          measurement.fit_score >= 90 ? 'bg-green-500' :
                          measurement.fit_score >= 75 ? 'bg-blue-500' :
                          measurement.fit_score >= 60 ? 'bg-yellow-500' :
                          'bg-orange-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-300">
                <p className="text-sm text-gray-600">
                  Fabric elasticity: <span className="text-yellow-600 font-semibold">{details.fabric_elasticity}%</span> |
                  Drape score: <span className="text-yellow-600 font-semibold">{details.fabric_drape}/10</span> |
                  Tolerance: <span className="text-yellow-600 font-semibold">{details.tolerance.toFixed(1)}cm</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 bg-gray-50 mt-12 text-center text-gray-600">
        <p>TRYONYOU © 2026 | Fashion Intelligence | Zero Returns. Perfect Fit. Every Time.</p>
      </footer>
    </div>
  )
}

export default Result
