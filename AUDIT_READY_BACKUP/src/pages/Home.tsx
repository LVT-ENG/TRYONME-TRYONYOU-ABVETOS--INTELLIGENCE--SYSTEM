import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { t } from '../i18n';
import { LanguageSelector } from '../components/LanguageSelector';
import { generateSessionId } from '../utils/systemSignals';

type View = 'landing' | 'gender' | 'scanning' | 'questions' | 'result';
type Gender = 'male' | 'female' | '';

interface Garment {
  id: string;
  name: string;
  type: string;
  cut: string;
  gender: 'male' | 'female';
  intention: string[];
  human_message: string;
  image: string;
  fit_score: number;
}

const LAFAYETTE_INVENTORY: Garment[] = [
  {
    id: "GL-M-9928",
    name: "Structured Blazer",
    type: "Blazer",
    cut: "Fitted",
    gender: "male",
    intention: ["work", "event"],
    human_message: "This blazer respects your natural structure, ideal for an elegant presence.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    fit_score: 96
  },
  {
    id: "GL-M-4412",
    name: "Relaxed Fit Shirt",
    type: "Shirt",
    cut: "Fluid",
    gender: "male",
    intention: ["casual", "daily"],
    human_message: "The drape of this fabric accompanies your walk without restrictions.",
    image: "https://images.unsplash.com/photo-1596362051868-f9c5c0b8e8e0?q=80&w=1983&auto=format&fit=crop",
    fit_score: 94
  },
  {
    id: "GL-M-7733",
    name: "Relaxed City Coat",
    type: "Coat",
    cut: "Relaxed",
    gender: "male",
    intention: ["daily", "work"],
    human_message: "Effortless elegance that moves with your daily rhythm.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
    fit_score: 92
  },
  {
    id: "GL-W-9928",
    name: "Structured Blazer",
    type: "Blazer",
    cut: "Fitted",
    gender: "female",
    intention: ["work", "event"],
    human_message: "This blazer respects your natural structure, ideal for an elegant presence.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    fit_score: 97
  },
  {
    id: "GL-W-4412",
    name: "Fluid Midi Dress",
    type: "Dress",
    cut: "Fluid",
    gender: "female",
    intention: ["casual", "daily", "event"],
    human_message: "The drape of this fabric accompanies your walk without restrictions.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
    fit_score: 95
  },
  {
    id: "GL-W-7733",
    name: "Relaxed Linen Shirt",
    type: "Shirt",
    cut: "Relaxed",
    gender: "female",
    intention: ["daily", "work"],
    human_message: "Effortless elegance that moves with your daily rhythm.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
    fit_score: 93
  }
];

const Home = () => {
  const [view, setView] = useState<View>('landing');
  const [scanProgress, setScanProgress] = useState(0);
  const [gender, setGender] = useState<Gender>('');
  const [occasion, setOccasion] = useState('');
  const [feeling, setFeeling] = useState('');
  const [recommendation, setRecommendation] = useState<Garment | null>(null);
  const [sessionId] = useState(generateSessionId());
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (view === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => (prev >= 100 ? 100 : prev + 2));
      }, 50);
      
      const timeout = setTimeout(() => {
        setView('questions');
      }, 5000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [view]);

  const handleRecommendation = () => {
    const genderFiltered = LAFAYETTE_INVENTORY.filter(g => g.gender === gender);
    const occasionMatch = genderFiltered.filter(g => g.intention.includes(occasion.toLowerCase()));
    const feelingMatch = occasionMatch.filter(g => g.cut.toLowerCase() === feeling.toLowerCase());
    
    const selected = feelingMatch.length > 0 
      ? feelingMatch[0] 
      : (occasionMatch.length > 0 ? occasionMatch[0] : genderFiltered[0]);
    
    setRecommendation(selected);
    setView('result');
  };

  return (
    <div className="min-h-screen bg-divineo-anthracite text-divineo-beige font-sans overflow-hidden">
      <LanguageSelector />
      
      <AnimatePresence mode='wait'>
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-6 text-center"
          >
            <h1 className="text-5xl font-luxury text-divineo-gold mb-4">
              {t('landing.title')}
            </h1>
            <p className="text-xl mb-8 font-light italic">
              {t('landing.subtitle')}
            </p>
            <button
              onClick={() => setView('gender')}
              className="bg-divineo-gold text-divineo-anthracite font-bold py-4 px-10 rounded-full tracking-widest hover:scale-105 transition-transform demo-clickable"
            >
              {t('landing.cta')}
            </button>
            <p className="text-xs text-divineo-beige/60 mt-8">
              {t('privacy.message')}
            </p>
          </motion.div>
        )}

        {view === 'gender' && (
          <motion.div
            key="gender"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-6"
          >
            <h2 className="text-4xl font-luxury text-divineo-gold mb-12">
              {t('gender.title')}
            </h2>
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setGender('male');
                  setView('scanning');
                }}
                className="bg-divineo-anthracite border-2 border-divineo-gold text-divineo-beige font-bold py-6 px-12 rounded-lg hover:bg-divineo-gold hover:text-divineo-anthracite transition-all demo-clickable"
              >
                {t('gender.male')}
              </button>
              <button
                onClick={() => {
                  setGender('female');
                  setView('scanning');
                }}
                className="bg-divineo-anthracite border-2 border-divineo-gold text-divineo-beige font-bold py-6 px-12 rounded-lg hover:bg-divineo-gold hover:text-divineo-anthracite transition-all demo-clickable"
              >
                {t('gender.female')}
              </button>
            </div>
          </motion.div>
        )}

        {view === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-6"
          >
            <h2 className="text-4xl font-luxury text-divineo-gold mb-8">
              {t('scanning.title')}
            </h2>
            <p className="text-lg text-divineo-beige/80 mb-8">
              {t('scanning.subtitle')}
            </p>
            <div className="relative w-96 h-96 border-2 border-divineo-gold rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-0 left-0 w-full h-1 bg-divineo-gold animate-scan-line"
                style={{ top: `${scanProgress}%` }}
              />
            </div>
            <p className="text-sm text-divineo-beige/60 mt-4">
              {scanProgress < 100 ? t('scanning.analyzing') : t('scanning.complete')}
            </p>
          </motion.div>
        )}

        {view === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-6"
          >
            <h2 className="text-4xl font-luxury text-divineo-gold mb-12">
              {t('questions.title')}
            </h2>
            
            <div className="mb-8">
              <p className="text-xl mb-4">{t('questions.occasion.label')}</p>
              <div className="flex gap-4">
                {['work', 'event', 'daily'].map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`py-3 px-8 rounded-lg font-medium transition-all demo-clickable ${
                      occasion === occ
                        ? 'bg-divineo-gold text-divineo-anthracite'
                        : 'bg-divineo-anthracite border border-divineo-gold text-divineo-beige'
                    }`}
                  >
                    {t(`questions.occasion.${occ}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <p className="text-xl mb-4">{t('questions.feeling.label')}</p>
              <div className="flex gap-4">
                {['fitted', 'fluid', 'relaxed'].map((feel) => (
                  <button
                    key={feel}
                    onClick={() => setFeeling(feel)}
                    className={`py-3 px-8 rounded-lg font-medium transition-all demo-clickable ${
                      feeling === feel
                        ? 'bg-divineo-gold text-divineo-anthracite'
                        : 'bg-divineo-anthracite border border-divineo-gold text-divineo-beige'
                    }`}
                  >
                    {t(`questions.feeling.${feel}`)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRecommendation}
              className="bg-divineo-gold text-divineo-anthracite font-bold py-4 px-10 rounded-full tracking-widest hover:scale-105 transition-transform demo-clickable"
            >
              {t('questions.cta')}
            </button>
          </motion.div>
        )}

        {view === 'result' && recommendation && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-6"
          >
            <h2 className="text-4xl font-luxury text-divineo-gold mb-4">
              {t('result.title')}
            </h2>
            <p className="text-lg text-divineo-beige/80 mb-8">
              {t('result.subtitle')}
            </p>
            
            <div className="bg-divineo-anthracite border-2 border-divineo-gold rounded-lg p-8 max-w-2xl">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-divineo-gold mb-2">
                {recommendation.name}
              </h3>
              <p className="text-divineo-beige mb-6">
                {recommendation.human_message}
              </p>
              <div className="flex gap-4 justify-center">
                <button className="bg-divineo-gold text-divineo-anthracite font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform demo-clickable">
                  {t('result.shopNow')}
                </button>
                <button
                  onClick={() => {
                    setView('landing');
                    setGender('');
                    setOccasion('');
                    setFeeling('');
                    setScanProgress(0);
                  }}
                  className="bg-divineo-anthracite border border-divineo-gold text-divineo-beige font-bold py-3 px-8 rounded-lg hover:bg-divineo-gold hover:text-divineo-anthracite transition-all demo-clickable"
                >
                  {t('result.restart')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
