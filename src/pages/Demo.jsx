import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Palette, Ruler, Sparkles, ArrowRight, Check } from 'lucide-react'
import UserProfile from '../components/demo/UserProfile'
import ColorProfile from '../components/demo/ColorProfile'
import Measurements from '../components/demo/Measurements'

const Demo = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [demoData, setDemoData] = useState({
    profile: {},
    colorProfile: {},
    measurements: {},
  })

  const steps = [
    { id: 0, title: 'User Profile', icon: User, component: UserProfile },
    { id: 1, title: 'Color Profile', icon: Palette, component: ColorProfile },
    { id: 2, title: 'Measurements', icon: Ruler, component: Measurements },
    { id: 3, title: 'Complete', icon: Sparkles, component: null },
  ]

  const handleNext = (stepData) => {
    // Save data based on current step
    if (currentStep === 0) {
      setDemoData({ ...demoData, profile: stepData })
    } else if (currentStep === 1) {
      setDemoData({ ...demoData, colorProfile: stepData })
    } else if (currentStep === 2) {
      setDemoData({ ...demoData, measurements: stepData })
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // All steps complete, navigate to avatar
      navigate('/my-avatar', { state: { demoData: { ...demoData, measurements: stepData } } })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentComponent = steps[currentStep].component

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <section className="bg-tryonyou-smoke/50 sticky top-20 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index <= currentStep
                        ? 'bg-tryonyou-blue text-white'
                        : 'glass text-white/40'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check size={20} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:block ${
                    index <= currentStep ? 'text-white' : 'text-white/40'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-tryonyou-blue' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Step Content */}
      <section className="section-container">
        <AnimatePresence mode="wait">
          {currentStep === 3 ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="card bg-gradient-to-br from-tryonyou-blue/20 to-purple-500/20 border-tryonyou-blue/30">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tryonyou-blue to-purple-500 flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="heading-lg mb-4 gradient-text">
                  Demo Profile Complete!
                </h2>
                <p className="text-white/70 mb-8">
                  Your profile has been created. Let's generate your 3D avatar.
                </p>
                <button
                  onClick={() => navigate('/my-avatar', { state: { demoData } })}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Generate Avatar
                  <ArrowRight className="inline ml-2" size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            CurrentComponent && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <CurrentComponent
                  data={demoData}
                  onNext={handleNext}
                  onBack={handleBack}
                  canGoBack={currentStep > 0}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default Demo

