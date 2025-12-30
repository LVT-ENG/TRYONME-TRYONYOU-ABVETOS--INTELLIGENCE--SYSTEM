import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceQuestionnaire = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    eventType: ''
  });

  const questions = [
    { key: 'height', label: "What is your height in cm?", type: "number" },
    { key: 'weight', label: "What is your weight in kg?", type: "number" },
    { key: 'eventType', label: "What is the occasion? (Work, Casual, Formal, Night)", type: "text" }
  ];

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processInput(text);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        setError('Could not hear you. Please try again or type.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [step]);

  const startListening = () => {
    if (!recognition) {
      setError("Voice recognition not supported in this browser.");
      return;
    }
    setError(null);
    setTranscript('');
    setIsListening(true);
    recognition.start();
  };

  const processInput = (text) => {
    const currentQ = questions[step];
    let value = text;

    // Simple parsing logic (robustness would need NLP)
    if (currentQ.type === 'number') {
      const num = text.match(/\d+/);
      if (num) {
        value = parseInt(num[0]);
      } else {
        setError("Please say a number.");
        return;
      }
    }

    // Validate Event Type
    if (currentQ.key === 'eventType') {
       const validEvents = ['work', 'casual', 'formal', 'night'];
       const found = validEvents.find(e => text.toLowerCase().includes(e));
       if (found) value = found;
       else value = 'casual'; // Default fallback
    }

    setFormData(prev => ({ ...prev, [currentQ.key]: value }));
    nextStep();
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 500);
    } else {
      onComplete(formData);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    processInput(transcript);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass rounded-2xl border border-white/10">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Pau needs details</h3>
        <p className="text-white/60">Step {step + 1} of {questions.length}</p>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mb-8"
      >
        <label className="block text-xl text-tryonyou-gold mb-4 font-medium">
          {questions[step].label}
        </label>

        <form onSubmit={handleManualSubmit} className="relative">
            <input
                type={questions[step].type === 'number' ? 'number' : 'text'}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tryonyou-blue transition-colors pr-12"
                placeholder="Type or say answer..."
                autoFocus
            />
            <button
                type="button"
                onClick={startListening}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-tryonyou-blue hover:bg-tryonyou-darkblue'}`}
            >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
        </form>

        {error && (
            <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={14} />
                {error}
            </div>
        )}
      </motion.div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
            {questions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? 'bg-tryonyou-gold' : 'bg-white/10'}`} />
            ))}
        </div>
        <button
            onClick={() => processInput(transcript)}
            className="text-sm text-white/40 hover:text-white transition-colors"
        >
            Skip / Next
        </button>
      </div>
    </div>
  );
};

export default VoiceQuestionnaire;
