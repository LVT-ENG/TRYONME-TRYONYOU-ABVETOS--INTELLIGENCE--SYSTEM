import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Ruler, Activity, CheckCircle } from 'lucide-react'
import Avatar3D from './Avatar3D'

// Default confidence value when not provided by measurements
const DEFAULT_MEASUREMENT_CONFIDENCE = 0.88;

/**
 * RetailMirror - Virtual avatar display with biometric measurements
 * Updates avatar proportions based on precise body measurements
 */
const RetailMirror = ({ measurements, className = '' }) => {
  const [avatarScale, setAvatarScale] = useState(1.0)
  const [customizations, setCustomizations] = useState({})

  useEffect(() => {
    if (measurements) {
      // Calculate avatar scale based on height (normalize to 170cm baseline)
      const baseHeight = 170
      const scale = measurements.height ? measurements.height / baseHeight : 1.0
      setAvatarScale(scale)

      // Update avatar customizations based on measurements
      const newCustomizations = {
        scale: {
          height: scale,
          chest: measurements.chest ? measurements.chest / 90 : 1.0,
          waist: measurements.waist ? measurements.waist / 75 : 1.0,
          hips: measurements.hips ? measurements.hips / 95 : 1.0
        },
        skin: '#f5d0c5', // Default skin tone
        outfit: {
          top: '#2d3436',
          bottom: '#636e72',
          shoes: '#2d3436'
        }
      }

      setCustomizations(newCustomizations)
    }
  }, [measurements])

  const hasMeasurements = measurements && Object.keys(measurements).length > 0

  return (
    <div className={`retail-mirror ${className}`}>
      {/* Mirror Frame */}
      <div className="relative">
        {/* Header */}
        <div className="glass rounded-t-2xl p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm font-medium">Virtual Mirror</span>
            </div>
            {hasMeasurements && (
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <CheckCircle size={16} />
                <span>Calibrated</span>
              </div>
            )}
          </div>
        </div>

        {/* Avatar Display */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-2xl overflow-hidden">
          {hasMeasurements ? (
            <>
              {/* 3D Avatar with measurements */}
              <Avatar3D
                customizations={customizations}
                modelPath="/models/avatar.glb"
                showControls={true}
                height="100%"
              />
              
              {/* Measurement Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {measurements.height && (
                    <div className="text-center">
                      <div className="text-white/60">Height</div>
                      <div className="font-bold text-tryonyou-blue">
                        {measurements.height.toFixed(1)} cm
                      </div>
                    </div>
                  )}
                  {measurements.chest && (
                    <div className="text-center">
                      <div className="text-white/60">Chest</div>
                      <div className="font-bold text-tryonyou-blue">
                        {measurements.chest.toFixed(1)} cm
                      </div>
                    </div>
                  )}
                  {measurements.waist && (
                    <div className="text-center">
                      <div className="text-white/60">Waist</div>
                      <div className="font-bold text-tryonyou-blue">
                        {measurements.waist.toFixed(1)} cm
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Placeholder when no measurements
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
              <User size={64} className="mb-4" />
              <p className="text-center px-4">
                Complete the measurement workflow<br />to see your personalized avatar
              </p>
            </div>
          )}
        </div>

        {/* Detailed Measurements Panel */}
        {hasMeasurements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 glass rounded-xl p-4"
          >
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Ruler size={18} className="text-tryonyou-blue" />
              Your Measurements
            </h4>
            
            <div className="space-y-2">
              {measurements.height && (
                <MeasurementRow label="Height" value={measurements.height} unit="cm" />
              )}
              {measurements.chest && (
                <MeasurementRow label="Chest" value={measurements.chest} unit="cm" />
              )}
              {measurements.waist && (
                <MeasurementRow label="Waist" value={measurements.waist} unit="cm" />
              )}
              {measurements.hips && (
                <MeasurementRow label="Hips" value={measurements.hips} unit="cm" />
              )}
              {measurements.shoulders && (
                <MeasurementRow label="Shoulders" value={measurements.shoulders} unit="cm" />
              )}
              {measurements.inseam && (
                <MeasurementRow label="Inseam" value={measurements.inseam} unit="cm" />
              )}
            </div>

            {/* Accuracy Indicator */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Measurement Accuracy</span>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-green-400" />
                  <span className="text-green-400 font-semibold">
                    {measurements.confidence 
                      ? `${(measurements.confidence * 100).toFixed(0)}%` 
                      : `${(DEFAULT_MEASUREMENT_CONFIDENCE * 100).toFixed(0)}%`}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Helper component for measurement rows
const MeasurementRow = ({ label, value, unit }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-white/70">{label}</span>
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-tryonyou-blue to-cyan-400"
        />
      </div>
      <span className="font-semibold min-w-[80px] text-right">
        {value.toFixed(1)} {unit}
      </span>
    </div>
  </div>
)

export default RetailMirror
