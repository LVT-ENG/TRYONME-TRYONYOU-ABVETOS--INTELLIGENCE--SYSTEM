import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AvatarDisplay } from '../components/fitting-room';
import { Sparkles } from 'lucide-react';

const FittingRoomDemo = () => {
  const [customizations, setCustomizations] = useState({
    skin: '#f5d0c5',
    outfit: {
      top: '#1a1a1a',
      bottom: '#2d2d2d',
      shoes: '#0a0a0a'
    }
  });

  // Validate hex color format to prevent CSS injection
  const isValidHexColor = (color) => {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  };

  // Handler for updating colors with validation
  const handleColorChange = (field, value) => {
    if (!isValidHexColor(value)) return;
    
    if (field === 'skin') {
      setCustomizations({ ...customizations, skin: value });
    } else {
      setCustomizations({
        ...customizations,
        outfit: { ...customizations.outfit, [field]: value }
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A2E]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles size={18} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-semibold">Fitting Room</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.2em] text-[#D4AF37] mb-4">
            AVATAR DISPLAY DEMO
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Interactive 3D avatar visualization for virtual try-on experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Display Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AvatarDisplay
              customizations={customizations}
              title="Your Virtual Avatar"
              description="Drag to rotate • Scroll to zoom"
              showControls={true}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-light tracking-wider text-white mb-4">
                Customize Your Avatar
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Skin Tone</label>
                  <input
                    type="color"
                    value={customizations.skin}
                    onChange={(e) => handleColorChange('skin', e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Top Color</label>
                  <input
                    type="color"
                    value={customizations.outfit.top}
                    onChange={(e) => handleColorChange('top', e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Bottom Color</label>
                  <input
                    type="color"
                    value={customizations.outfit.bottom}
                    onChange={(e) => handleColorChange('bottom', e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Shoes Color</label>
                  <input
                    type="color"
                    value={customizations.outfit.shoes}
                    onChange={(e) => handleColorChange('shoes', e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h4 className="text-lg font-light text-white mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-[#00A8E8]">✓</span>
                  Real-time 3D rendering
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00A8E8]">✓</span>
                  Interactive controls
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00A8E8]">✓</span>
                  Customizable appearance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00A8E8]">✓</span>
                  Responsive design
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FittingRoomDemo;
