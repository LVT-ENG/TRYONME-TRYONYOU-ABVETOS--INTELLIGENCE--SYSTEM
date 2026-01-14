import React from 'react';
import VirtualTryOn from '../components/VirtualTryOn';

const VirtualTryOnDemo = () => {
  // Example user context
  const userContext = {
    userId: 'user123',
    bodyMeasurements: {
      height: 175,
      chest: 95,
      waist: 80,
      hips: 98
    },
    preferences: {
      style: 'elegant',
      colors: ['red', 'black', 'navy']
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-tryonyou-black via-tryonyou-smoke to-tryonyou-black">
      <div className="section-container">
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">
            <span className="gradient-text">Virtual Try-On Component</span>
          </h1>
          <p className="text-white/70 text-lg">
            AI-Powered garment matching and fit analysis
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <VirtualTryOn userContext={userContext} />
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Perfect Match</h3>
              <p className="text-white/60 text-sm">
                98.5% match score based on AI analysis
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">🧵</div>
              <h3 className="font-bold text-lg mb-2">Premium Fabric</h3>
              <p className="text-white/60 text-sm">
                SILK-ELAST-04 for optimal comfort
              </p>
            </div>
            <div className="card">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="font-bold text-lg mb-2">Personalized</h3>
              <p className="text-white/60 text-sm">
                Based on your body measurements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnDemo;
