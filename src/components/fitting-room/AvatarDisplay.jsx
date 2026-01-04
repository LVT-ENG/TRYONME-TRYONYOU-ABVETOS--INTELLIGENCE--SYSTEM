import React from 'react';
import { motion } from 'framer-motion';
import Avatar3D from '../Avatar3D';

const AvatarDisplay = ({ 
  customizations = {},
  modelPath = '/models/avatar.glb',
  showControls = true,
  className = '',
  title = 'Virtual Try-On',
  description = 'Your personalized avatar'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-4 text-center">
          {title && (
            <h3 className="text-xl font-light tracking-wider text-white mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* 3D Avatar Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm border border-white/10">
        <div className="aspect-[3/4] w-full">
          <Avatar3D
            customizations={customizations}
            modelPath={modelPath}
            showControls={showControls}
            height="100%"
            className="w-full h-full"
          />
        </div>

        {/* Optional overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>Drag to rotate • Scroll to zoom</span>
            {customizations?.outfit && (
              <span className="text-[#D4AF37]">Outfit Applied</span>
            )}
          </div>
        </div>
      </div>

      {/* Customization Info Display */}
      {Object.keys(customizations).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 rounded-xl bg-black/30 border border-white/10"
        >
          <h4 className="text-sm font-semibold text-white/80 mb-2">Active Customizations</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {customizations.skin && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: customizations.skin }}
                />
                <span className="text-white/60">Skin Tone</span>
              </div>
            )}
            {customizations.outfit?.top && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-sm border border-white/20"
                  style={{ backgroundColor: customizations.outfit.top }}
                />
                <span className="text-white/60">Top</span>
              </div>
            )}
            {customizations.outfit?.bottom && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-sm border border-white/20"
                  style={{ backgroundColor: customizations.outfit.bottom }}
                />
                <span className="text-white/60">Bottom</span>
              </div>
            )}
            {customizations.outfit?.shoes && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-sm border border-white/20"
                  style={{ backgroundColor: customizations.outfit.shoes }}
                />
                <span className="text-white/60">Shoes</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AvatarDisplay;
