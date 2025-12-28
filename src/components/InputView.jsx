/**
 * TRYONYOU - Step 2: Voice & Conversational Input
 */
import { useState } from 'react';
import { Button } from './ui/button';
import { Mic, ArrowRight } from 'lucide-react';

export default function InputView({ onComplete, initialMeasurements }) {
  const [step, setStep] = useState(0); // 0: Confirm Height, 1: Weight, 2: Occasion, 3: Fit
  const [data, setData] = useState({
    height: initialMeasurements?.height || 170,
    weight: 70,
    occasion: 'work',
    fitPreference: 'regular'
  });

  const [isListening, setIsListening] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(data);
  };

  // Mock Voice Input
  const toggleVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      // Simulate recognized input based on step
      if (step === 0) setData({...data, height: 175});
      if (step === 1) setData({...data, weight: 65});
      if (step === 2) setData({...data, occasion: 'event'});
      if (step === 3) setData({...data, fitPreference: 'slim'});
    }, 2000);
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-light">Let&apos;s confirm your scan.</h2>
            <p className="text-xl text-gray-400">Pau detected a height of:</p>
            <div className="flex items-center gap-4 justify-center">
              <input
                type="number"
                value={data.height}
                onChange={(e) => setData({...data, height: parseInt(e.target.value)})}
                className="bg-transparent border-b-2 border-abvetos-gold text-5xl font-black text-center w-32 focus:outline-none"
              />
              <span className="text-xl text-gray-500">cm</span>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-light">And your weight?</h2>
            <p className="text-gray-400">This helps with fabric drape calculation.</p>
            <div className="flex items-center gap-4 justify-center">
              <input
                type="number"
                value={data.weight}
                onChange={(e) => setData({...data, weight: parseInt(e.target.value)})}
                className="bg-transparent border-b-2 border-abvetos-gold text-5xl font-black text-center w-32 focus:outline-none"
              />
              <span className="text-xl text-gray-500">kg</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-light">What is the occasion?</h2>
            <div className="grid grid-cols-2 gap-4">
              {['work', 'event', 'casual', 'ceremony'].map((occ) => (
                <button
                  key={occ}
                  onClick={() => setData({...data, occasion: occ})}
                  className={`p-6 rounded-none border transition-all uppercase tracking-widest ${data.occasion === occ ? 'bg-abvetos-gold text-black border-abvetos-gold' : 'border-white/20 hover:border-white'}`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
             <h2 className="text-3xl font-light">Fit Preference?</h2>
             <div className="grid grid-cols-3 gap-4">
              {['slim', 'regular', 'relaxed'].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setData({...data, fitPreference: fit})}
                  className={`p-6 rounded-none border transition-all uppercase tracking-widest ${data.fitPreference === fit ? 'bg-abvetos-gold text-black border-abvetos-gold' : 'border-white/20 hover:border-white'}`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl w-full">
        {renderStep()}

        <div className="mt-12 space-y-4">
           <Button
             onClick={toggleVoice}
             className={`w-full py-8 rounded-full border border-white/20 bg-transparent hover:bg-white/5 transition-all flex items-center justify-center gap-3 ${isListening ? 'animate-pulse text-red-400 border-red-400' : ''}`}
           >
             <Mic />
             {isListening ? "Listening..." : "Use Voice Input"}
           </Button>

           <Button onClick={handleNext} className="w-full bg-abvetos-gold text-black font-bold text-lg py-4 rounded-none uppercase hover:bg-white">
             {step === 3 ? "Find My Perfect Fit" : "Next"} <ArrowRight className="ml-2" />
           </Button>
        </div>
      </div>
    </div>
  );
}
