import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIRecommendation, lafayetteDB, calculateFit, type LafayetteItem } from '../lib/RecommendationEngine';

const VerdadSuprema: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mood = params.get('mood') || 'confident';
  const bodyType = params.get('body') || 'balanced';

  const [item, setItem] = useState<LafayetteItem | null>(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const result = await getAIRecommendation(mood, bodyType);
        if (!cancelled) {
          setItem(result);
          setReason(result.human_message);
        }
      } catch {
        if (!cancelled) {
          setItem(lafayetteDB[0]);
          setReason(lafayetteDB[0].human_message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [mood, bodyType]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <Link to="/" className="text-[#C5A46D] text-xs tracking-[0.4em] uppercase hover:text-white transition-colors">
          ← TryOnYou
        </Link>
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Verdad Suprema</span>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#C5A46D]/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 space-y-6 max-w-3xl"
        >
          <p className="text-[#C5A46D] text-[10px] tracking-[0.5em] uppercase">
            The Supreme Truth
          </p>
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-widest uppercase">
            Verdad<br />
            <span className="text-[#C5A46D] italic">Suprema</span>
          </h1>
          <p className="text-white/40 text-sm tracking-wider max-w-md mx-auto leading-relaxed">
            Every style has a truth. This is yours — confirmed by AI, calibrated to your presence.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C5A46D] to-transparent" />
          <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* Revelation */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-12 h-12 border border-[#C5A46D]/40 border-t-[#C5A46D] rounded-full animate-spin mx-auto" />
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Calibrating your truth…</p>
          </motion.div>
        ) : item ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl w-full items-center"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden border border-white/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#C5A46D] text-[9px] tracking-[0.4em] uppercase">
                  {item.id}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="text-[#C5A46D] text-[10px] tracking-[0.4em] uppercase">Your Supreme Match</p>
                <h2 className="text-4xl md:text-5xl font-serif font-light uppercase leading-tight">
                  {item.name}
                </h2>
              </div>

              <blockquote className="border-l-2 border-[#C5A46D] pl-6">
                <p className="text-xl font-light italic text-white/80 leading-relaxed">
                  "{reason}"
                </p>
              </blockquote>

              <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-white/5">
                <div className="space-y-1">
                  <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Cut</p>
                  <p className="text-white text-sm font-light">{item.cut}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Drape</p>
                  <p className="text-white text-sm font-light">{item.drape}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Fit</p>
                  <p className="text-[#C5A46D] text-sm font-light">{calculateFit()}</p>
                </div>
              </div>

              {item.msg && (
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase">{item.msg}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/checkout">
                  <button className="px-10 py-4 bg-[#C5A46D] text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-300 w-full sm:w-auto">
                    Reserve Now
                  </button>
                </Link>
                <Link to="/demo">
                  <button className="px-10 py-4 border border-white/20 text-white text-[10px] uppercase tracking-[0.3em] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-all duration-300 w-full sm:w-auto">
                    Refine Scan
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.4em]">
          &copy; 2026 TryOnYou · Verdad Suprema · Powered by Gemini 2.0
        </p>
      </footer>
    </div>
  );
};

export default VerdadSuprema;
