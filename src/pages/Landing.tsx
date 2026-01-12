/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Ruler, Zap, Clock, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Language, translations } from '../data/i18n';

interface LandingProps {
  onStart: () => void;
  lang: Language;
}

export default function Landing({ onStart, lang }: LandingProps) {
  const [isSnapped, setIsSnapped] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFlash(true);
      setTimeout(() => {
        setIsSnapped(prev => !prev);
        setShowFlash(false);
      }, 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CLAIMS = [
    { icon: <ShieldCheck className="text-brand-cyan" size={24} />, title: t.claims.zeroReturns, desc: t.claims.zeroReturnsDesc },
    { icon: <Ruler className="text-brand-indigo" size={24} />, title: t.claims.biometric, desc: t.claims.biometricDesc },
    { icon: <Zap className="text-brand-gold" size={24} />, title: t.claims.fabric, desc: t.claims.fabricDesc },
    { icon: <Clock className="text-zinc-500" size={24} />, title: t.claims.efficient, desc: t.claims.efficientDesc }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black text-white font-sans overflow-hidden animate-fade-in relative">
      {/* Global Snap Flash Overlay */}
      <div className={`fixed inset-0 z-[100] bg-white pointer-events-none transition-opacity duration-300 ${showFlash ? 'opacity-40' : 'opacity-0'}`} />

      <section className="pt-24 pb-20 px-12 grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto items-center relative z-10">
        <div className="space-y-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_10px_#C5A46D]" />
            System Pilot v2.0 | Patent ID: PCT/EP2025/067317
          </div>
          
          <h1 className="text-8xl md:text-[9rem] font-black tracking-tighter leading-[0.78] uppercase select-none italic">
            BODY<br/> <span className="text-brand-gold">INTELLIGENCE.</span>
          </h1>
          
          <p className="text-xl text-zinc-400 font-light uppercase tracking-[0.2em] leading-relaxed max-w-xl">
            Zero returns. Perfect fit. Powered by biometric AI for Galeries Lafayette.
          </p>
          
          <div className="flex gap-8 items-center pt-8">
            <Button onClick={onStart} size="lg" className="rounded-none px-20 h-24 bg-brand-gold text-black font-black uppercase text-base tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_50px_rgba(197,164,109,0.2)]">
              <span className="flex items-center gap-6">
                {t.enterPilot}
                <ChevronRight size={24} />
              </span>
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] group border border-white/5">
          {/* Diagnostic Visualization */}
          <div className={`absolute inset-0 transition-transform duration-[2000ms] ease-out ${isSnapped ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`}>
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-40" alt="Diagnostic View" />
            <div className="absolute inset-0 calibration-grid opacity-20" />
            <div className="absolute bottom-12 left-12">
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em] mb-3 font-bold">MODE: BIOMETRIC_CAPTURE</p>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-white">Galeries Lafayette</h3>
            </div>
          </div>
          
          {/* Synthesized Visualization */}
          <div className={`absolute inset-0 transition-transform duration-[2000ms] ease-out ${!isSnapped ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`}>
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Synthesis View" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
              <p className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.4em] mb-3 font-bold">MODE: NEURAL_RECONSTRUCTION</p>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-white">The TryOnYou Pilot</h3>
            </div>
          </div>
          
          {/* Center Snap Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className={`w-32 h-32 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center transition-all duration-700 ${isSnapped ? 'scale-110 shadow-[0_0_80px_rgba(197,164,109,0.3)]' : 'scale-90 shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
              <Zap className={`w-12 h-12 transition-colors duration-700 ${isSnapped ? 'text-brand-gold' : 'text-white'}`} fill="currentColor" strokeWidth={0} />
            </div>
          </div>

          <div className="absolute inset-x-0 h-[1px] bg-cyan-500/50 animate-scan-line shadow-[0_0_15px_rgba(34,211,238,0.5)] z-20 pointer-events-none" />
        </div>
      </section>

      <section className="bg-black py-40 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-12 grid md:grid-cols-4 gap-20">
          {CLAIMS.map((claim, idx) => (
            <div key={idx} className="space-y-8 group cursor-default">
              <div className="w-16 h-16 rounded border border-white/10 flex items-center justify-center bg-zinc-950 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_30px_rgba(197,164,109,0.1)] transition-all">
                {claim.icon}
              </div>
              <h4 className="text-lg font-black uppercase tracking-[0.1em] text-white leading-tight">{claim.title}</h4>
              <p className="text-base text-zinc-500 leading-relaxed font-medium pr-6">{claim.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 px-12 text-center relative z-10 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
           <p className="text-[11px] font-mono uppercase tracking-[0.6em]">Fitting Engine v3.44 • Deterministic Match • Patent {t.claims.patentId || 'PCT/EP2025/067317'}</p>
           <div className="flex gap-12">
              <span className="text-[11px] font-black uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Textile Physics</span>
              <span className="text-[11px] font-black uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Valuation: 120M-400M EUR</span>
           </div>
        </div>
      </footer>
    </div>
  );
}