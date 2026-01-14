/**
 * SmartWardrobe Component
 * Enhanced wardrobe management with AI-powered features
 * 
 * This component extends the basic Wardrobe functionality with:
 * - AI-powered garment scanning
 * - Smart outfit recommendations
 * - Virtual try-on integration
 * - Style matching algorithms
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Sparkles, 
  Heart, 
  Share2, 
  TrendingUp,
  Wand2,
  AlertCircle
} from 'lucide-react';
import { scanGarmentPhoto, getOutfitRecommendations, isAIConfigured } from '../pilot';

/**
 * SmartWardrobe Component
 * Main component for intelligent wardrobe management
 */
const SmartWardrobe = ({ items = [], onItemSelect, userId }) => {
  const [aiEnabled, setAiEnabled] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedForOutfit, setSelectedForOutfit] = useState([]);

  useEffect(() => {
    // Check if AI features are available
    setAiEnabled(isAIConfigured());
  }, []);

  /**
   * Handle garment photo scanning
   */
  const handleScanGarment = async (imageFile) => {
    if (!aiEnabled) {
      console.warn('AI features not available');
      return;
    }

    setScanning(true);
    
    try {
      const result = await scanGarmentPhoto(imageFile);
      
      if (result.success) {
        console.log('Garment scanned successfully:', result);
        // Handle successful scan - add to wardrobe, etc.
      } else {
        console.error('Scan failed:', result.error);
      }
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setScanning(false);
    }
  };

  /**
   * Get AI-powered outfit recommendations
   */
  const getSmartRecommendations = async () => {
    if (!aiEnabled || !userId) {
      return;
    }

    try {
      const result = await getOutfitRecommendations(userId, {
        selectedItems: selectedForOutfit,
        occasion: 'casual',
      });

      if (result.success) {
        setRecommendations(result.recommendations || []);
      }
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    }
  };

  /**
   * Toggle item selection for outfit building
   */
  const toggleItemSelection = (itemId) => {
    setSelectedForOutfit(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="smart-wardrobe-container">
      {/* AI Status Banner */}
      {!aiEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>AI Features Limited:</strong> Configure VITE_GOOGLE_API_KEY 
                for enhanced wardrobe features including garment scanning and smart recommendations.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Smart Actions Bar */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => document.getElementById('garment-upload')?.click()}
          disabled={!aiEnabled || scanning}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                     text-white rounded-lg shadow-md hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-4 h-4" />
          <span>{scanning ? 'Scanning...' : 'Scan Garment'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getSmartRecommendations}
          disabled={!aiEnabled || selectedForOutfit.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 
                     text-white rounded-lg shadow-md hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          <span>Smart Match</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 
                     text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Wand2 className="w-4 h-4" />
          <span>Style Guide</span>
        </motion.button>

        <input
          id="garment-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleScanGarment(file);
          }}
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <SmartWardrobeItem
            key={item.id}
            item={item}
            isSelected={selectedForOutfit.includes(item.id)}
            onSelect={() => toggleItemSelection(item.id)}
            onClick={() => onItemSelect?.(item)}
          />
        ))}
      </div>

      {/* Recommendations Panel */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Smart Recommendations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm font-medium">{rec.name}</p>
                <p className="text-xs text-gray-500 mt-1">Match: {rec.matchScore}%</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Individual wardrobe item card with smart features
 */
const SmartWardrobeItem = ({ item, isSelected, onSelect, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer
                  transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      {/* Selection checkbox */}
      <div
        className="absolute top-2 left-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                         transition-colors ${isSelected 
                           ? 'bg-blue-500 border-blue-500' 
                           : 'bg-white border-gray-300'}`}
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>

      {/* Favorite button */}
      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
        />
      </div>

      {/* Item image/color swatch */}
      <div 
        className="aspect-square w-full"
        style={{ backgroundColor: item.color || '#E5E7EB' }}
      />

      {/* Item details */}
      <div className="p-3">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
        {item.match && (
          <div className="flex items-center gap-1 mt-2">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            <span className="text-xs font-medium text-yellow-600">
              {item.match}% match
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SmartWardrobe;
export { SmartWardrobeItem };
