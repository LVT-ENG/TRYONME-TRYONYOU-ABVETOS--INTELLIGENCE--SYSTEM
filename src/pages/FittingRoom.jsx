import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Camera, Hand, Scan, User, Check, AlertCircle, 
  ChevronRight, ChevronLeft, Loader, Upload, RefreshCw,
  FileText, Sparkles, CheckCircle, XCircle
} from 'lucide-react'
import RetailMirror from '../components/RetailMirror'
import { 
  analyzeHandCalibration, 
  analyzePalmVerification, 
  analyzeBodyMeasurements 
} from '../services/geminiService'

const FittingRoom = () => {
  const navigate = useNavigate()
  // Workflow state
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  // Calibration data
  const [handCalibrationData, setHandCalibrationData] = useState(null)
  const [palmVerificationData, setPalmVerificationData] = useState(null)
  const [bodyPhotos, setBodyPhotos] = useState({
    frontPhoto: null,
    leftPhoto: null,
    rightPhoto: null
  })
  const [measurements, setMeasurements] = useState(null)

  // File input refs
  const handCalibrationRef = useRef(null)
  const palmVerificationRef = useRef(null)
  const frontPhotoRef = useRef(null)
  const leftPhotoRef = useRef(null)
  const rightPhotoRef = useRef(null)

  const steps = [
    { 
      id: 0, 
      title: 'Hand Calibration', 
      icon: Hand,
      description: 'Place your hand on A4 paper for scale reference'
    },
    { 
      id: 1, 
      title: 'Palm Analysis', 
      icon: Scan,
      description: 'Show your open palm to verify calibration'
    },
    { 
      id: 2, 
      title: 'Body Scanning', 
      icon: Camera,
      description: 'Capture three full-body photos'
    },
    { 
      id: 3, 
      title: 'AI Processing', 
      icon: Sparkles,
      description: 'Processing your measurements with AI'
    },
    { 
      id: 4, 
      title: 'Avatar Integration', 
      icon: User,
      description: 'Your personalized virtual avatar'
    },
  ]

  // Step 1: Hand Calibration
  const handleHandCalibration = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const result = await analyzeHandCalibration(file)
      
      if (result.success && result.calibrated) {
        setHandCalibrationData(result)
        // Auto-advance to next step on success
        setTimeout(() => {
          setCurrentStep(1)
          setIsProcessing(false)
        }, 1000)
      } else {
        setError(result.message || 'Calibration failed. Please ensure your hand is clearly placed on an A4 paper.')
        setIsProcessing(false)
      }
    } catch (err) {
      setError('Failed to process calibration image. Please try again.')
      setIsProcessing(false)
    }
  }

  // Step 2: Palm Verification
  const handlePalmVerification = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const result = await analyzePalmVerification(file)
      
      if (result.success && result.palmDetected) {
        setPalmVerificationData(result)
        // Auto-advance to next step on success
        setTimeout(() => {
          setCurrentStep(2)
          setIsProcessing(false)
        }, 1000)
      } else {
        setError(result.message || 'Palm verification failed. Please show your open palm clearly.')
        setIsProcessing(false)
      }
    } catch (err) {
      setError('Failed to verify palm. Please try again.')
      setIsProcessing(false)
    }
  }

  // Step 3: Body Photos Upload
  const handleBodyPhotoUpload = (position, event) => {
    const file = event.target.files[0]
    if (!file) return

    setBodyPhotos(prev => ({
      ...prev,
      [`${position}Photo`]: file
    }))
    setError(null)
  }

  const canProceedToProcessing = () => {
    return bodyPhotos.frontPhoto && bodyPhotos.leftPhoto && bodyPhotos.rightPhoto
  }

  // Step 4: AI Processing
  const handleAIProcessing = async () => {
    if (!canProceedToProcessing()) {
      setError('Please upload all three body photos before processing.')
      return
    }

    setIsProcessing(true)
    setError(null)
    setCurrentStep(3)

    try {
      const scaleFactor = handCalibrationData?.scaleFactor || 1.0
      const result = await analyzeBodyMeasurements(bodyPhotos, scaleFactor)
      
      if (result.success && result.measurements) {
        setMeasurements(result.measurements)
        // Auto-advance to final step
        setTimeout(() => {
          setCurrentStep(4)
          setIsProcessing(false)
        }, 2000)
      } else {
        setError(result.message || 'Failed to process body measurements. Please try again.')
        setCurrentStep(2) // Go back to photo upload
        setIsProcessing(false)
      }
    } catch (err) {
      setError('Failed to analyze body measurements. Please try again.')
      setCurrentStep(2)
      setIsProcessing(false)
    }
  }

  const resetWorkflow = () => {
    setCurrentStep(0)
    setHandCalibrationData(null)
    setPalmVerificationData(null)
    setBodyPhotos({ frontPhoto: null, leftPhoto: null, rightPhoto: null })
    setMeasurements(null)
    setError(null)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Hand Calibration</h3>
              <p className="text-white/60 max-w-2xl mx-auto">
                Place your hand flat on a standard A4 paper (21cm × 29.7cm) and take a photo. 
                This helps us create an accurate size reference for your measurements.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="card bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-dashed border-blue-500/30">
                <div className="text-center">
                  {!handCalibrationData ? (
                    <>
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Hand size={40} />
                      </div>
                      
                      <h4 className="text-lg font-bold mb-2">Instructions</h4>
                      <ul className="text-left space-y-2 mb-6 text-white/70">
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Use a white A4 paper on a flat surface</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Place your hand flat with fingers together</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Ensure good lighting and all paper edges are visible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Take the photo from directly above</span>
                        </li>
                      </ul>

                      <input
                        ref={handCalibrationRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleHandCalibration}
                        className="hidden"
                      />
                      
                      <button
                        onClick={() => handCalibrationRef.current?.click()}
                        disabled={isProcessing}
                        className="btn-primary w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Loader size={20} className="mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Camera size={20} className="mr-2" />
                            Take Photo
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <CheckCircle size={64} className="mx-auto text-green-400" />
                      <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">Calibration Successful!</h4>
                        <p className="text-white/60">Scale factor: {handCalibrationData.scaleFactor.toFixed(2)}</p>
                        <p className="text-white/60">Confidence: {(handCalibrationData.confidence * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Palm Analysis</h3>
              <p className="text-white/60 max-w-2xl mx-auto">
                Show your open palm to the camera to verify and refine the calibration.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="card bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-dashed border-violet-500/30">
                <div className="text-center">
                  {!palmVerificationData ? (
                    <>
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                        <Scan size={40} />
                      </div>
                      
                      <h4 className="text-lg font-bold mb-2">Palm Instructions</h4>
                      <ul className="text-left space-y-2 mb-6 text-white/70">
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Hold your palm open with fingers slightly spread</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Keep your hand steady and well-lit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Capture from about 30cm distance</span>
                        </li>
                      </ul>

                      <input
                        ref={palmVerificationRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePalmVerification}
                        className="hidden"
                      />
                      
                      <button
                        onClick={() => palmVerificationRef.current?.click()}
                        disabled={isProcessing}
                        className="btn-primary w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Loader size={20} className="mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Camera size={20} className="mr-2" />
                            Capture Palm
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <CheckCircle size={64} className="mx-auto text-green-400" />
                      <div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">Palm Verified!</h4>
                        <p className="text-white/60">Hand size: {palmVerificationData.handSize} cm</p>
                        <p className="text-white/60">Confidence: {(palmVerificationData.confidence * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Body Scanning</h3>
              <p className="text-white/60 max-w-2xl mx-auto">
                Take three full-body photos: frontal, left side, and right side views. 
                Stand at least 2 meters from the camera with the A4 paper visible for scale reference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {/* Front Photo */}
              <PhotoUploadCard
                title="Front View"
                description="Face the camera directly"
                icon={User}
                file={bodyPhotos.frontPhoto}
                inputRef={frontPhotoRef}
                onUpload={(e) => handleBodyPhotoUpload('front', e)}
                color="from-blue-500 to-cyan-500"
              />

              {/* Left Photo */}
              <PhotoUploadCard
                title="Left Side"
                description="Turn 90° to your left"
                icon={User}
                file={bodyPhotos.leftPhoto}
                inputRef={leftPhotoRef}
                onUpload={(e) => handleBodyPhotoUpload('left', e)}
                color="from-violet-500 to-purple-500"
              />

              {/* Right Photo */}
              <PhotoUploadCard
                title="Right Side"
                description="Turn 90° to your right"
                icon={User}
                file={bodyPhotos.rightPhoto}
                inputRef={rightPhotoRef}
                onUpload={(e) => handleBodyPhotoUpload('right', e)}
                color="from-fuchsia-500 to-pink-500"
              />
            </div>

            <div className="max-w-2xl mx-auto mt-8">
              <div className="card bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                <div className="flex items-start gap-4">
                  <FileText size={24} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Important Tips</h4>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>• Wear form-fitting clothes for accurate measurements</li>
                      <li>• Stand naturally with arms slightly away from body</li>
                      <li>• Ensure good lighting and clear background</li>
                      <li>• Keep the A4 paper visible in at least one photo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAIProcessing}
                disabled={!canProceedToProcessing() || isProcessing}
                className={`mt-6 w-full ${canProceedToProcessing() ? 'btn-primary' : 'btn-metallic opacity-50 cursor-not-allowed'}`}
              >
                <Sparkles size={20} className="mr-2" />
                Process Measurements
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Sparkles size={48} className="animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">AI Processing</h3>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Our AI is analyzing your photos and calculating precise body measurements...
              </p>

              <div className="max-w-md mx-auto">
                <div className="space-y-4">
                  <ProcessingStep label="Analyzing frontal photo" completed={true} />
                  <ProcessingStep label="Analyzing left side photo" completed={true} />
                  <ProcessingStep label="Analyzing right side photo" completed={true} />
                  <ProcessingStep label="Calculating measurements" completed={false} />
                  <ProcessingStep label="Verifying accuracy" completed={false} />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle size={48} />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Avatar Ready!</h3>
              <p className="text-white/60 max-w-2xl mx-auto">
                Your virtual avatar has been created with precise biometric measurements. 
                You can now try on clothes with perfect fit predictions!
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <RetailMirror measurements={measurements} />

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => navigate('/wardrobe')}
                  className="btn-primary flex-1"
                >
                  Try On Clothes
                </button>
                <button
                  onClick={resetWorkflow}
                  className="btn-metallic flex items-center gap-2"
                >
                  <RefreshCw size={20} />
                  Retake Measurements
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-950 via-blue-900/50 to-tryonyou-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Scan size={18} className="text-cyan-400" />
              <span className="text-cyan-300 font-semibold">Biometric Measurement</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Fitting Room
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Get precise body measurements using AI and your camera. 
              Create your perfect virtual avatar in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-tryonyou-smoke/30 sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`flex flex-col items-center gap-2 transition-all ${
                    currentStep >= step.id ? 'opacity-100' : 'opacity-40'
                  }`}
                  whileHover={{ scale: currentStep >= step.id ? 1.05 : 1 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep === step.id
                      ? 'bg-tryonyou-blue glow-blue'
                      : currentStep > step.id
                      ? 'bg-green-500'
                      : 'glass'
                  }`}>
                    {currentStep > step.id ? (
                      <Check size={24} />
                    ) : (
                      <step.icon size={24} />
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium hidden md:block">{step.title}</span>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    currentStep > index ? 'bg-tryonyou-blue' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 border-2 border-red-500/50 bg-red-500/10"
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-400 mb-1">Error</h4>
                <p className="text-sm text-white/70">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-white/60 hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <section className="section-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 3 && currentStep > 0 && (
          <div className="flex justify-between mt-12 max-w-4xl mx-auto">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="glass px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            {currentStep === 2 && canProceedToProcessing() && (
              <button
                onClick={handleAIProcessing}
                className="btn-primary flex items-center gap-2"
              >
                Continue
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

// Helper component for photo upload cards
const PhotoUploadCard = ({ title, description, icon: Icon, file, inputRef, onUpload, color }) => (
  <div className="card">
    <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${color} opacity-20 mb-4 relative overflow-hidden`}>
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt={title}
          className="w-full h-full object-cover opacity-100"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={48} className="text-white/30" />
        </div>
      )}
    </div>
    
    <h4 className="font-bold mb-1">{title}</h4>
    <p className="text-sm text-white/60 mb-4">{description}</p>
    
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      capture="environment"
      onChange={onUpload}
      className="hidden"
    />
    
    <button
      onClick={() => inputRef.current?.click()}
      className={`w-full py-2 rounded-lg font-medium transition-all ${
        file 
          ? 'glass hover:bg-white/10' 
          : `bg-gradient-to-r ${color} hover:opacity-90`
      }`}
    >
      {file ? (
        <>
          <RefreshCw size={16} className="inline mr-2" />
          Retake
        </>
      ) : (
        <>
          <Upload size={16} className="inline mr-2" />
          Upload
        </>
      )}
    </button>
  </div>
)

// Helper component for processing steps
const ProcessingStep = ({ label, completed }) => (
  <div className="flex items-center gap-3 glass rounded-lg p-3">
    {completed ? (
      <CheckCircle size={20} className="text-green-400" />
    ) : (
      <Loader size={20} className="text-tryonyou-blue animate-spin" />
    )}
    <span className={completed ? 'text-white/70' : 'text-white'}>{label}</span>
  </div>
)

export default FittingRoom
