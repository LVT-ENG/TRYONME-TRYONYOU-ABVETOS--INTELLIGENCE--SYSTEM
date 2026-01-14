import React, { useState } from 'react';
import ContextualInputs from '../components/ContextualInputs';

const ContextualInputsTest = () => {
  const [contextData, setContextData] = useState(null);

  const handleContextComplete = (data) => {
    console.log('Context completed:', data);
    setContextData(data);
  };

  const handleReset = () => {
    setContextData(null);
  };

  return (
    <div className="min-h-screen bg-tryonyou-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Contextual Inputs Component Test
          </h1>
          <p className="text-white/60">
            Testing the glass-morphism styled contextual input component
          </p>
        </div>

        {!contextData ? (
          <ContextualInputs onContextComplete={handleContextComplete} />
        ) : (
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-6 text-tryonyou-blue">
              Selection Complete! ✨
            </h2>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-white/5 rounded-lg">
                <span className="text-white/60 block mb-2">Occasion:</span>
                <span className="text-xl font-semibold text-gold">
                  {contextData.occasion}
                </span>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <span className="text-white/60 block mb-2">Sensation:</span>
                <span className="text-xl font-semibold text-gold">
                  {contextData.sensation}
                </span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualInputsTest;
