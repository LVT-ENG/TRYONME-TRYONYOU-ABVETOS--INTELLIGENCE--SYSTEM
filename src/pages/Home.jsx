import React, { useState, useEffect, useCallback } from 'react';
import { translations, PAU_LINE_KEYS, detectLanguage } from '../i18n';

// ─── CATÁLOGO INTERNO (Best Fit Engine - ranking invisible) ───
const CURATED_COLLECTION = [
  {
    id: 'pink_chanel_suit',
    name: 'Pink Tweed Suit',
    designer: 'Maison Classique',
    fabric: 'Tweed bouclé',
    drape: 'Structured',
    stretch: 'Low',
    catalogImg: '/assets/catalog/pink_chanel_suit.png',
    mirrorImg: '/assets/demo/virtual_mirror_pink_chanel.png',
  },
  {
    id: 'black_gala_dress',
    name: 'Black Gala Dress',
    designer: 'Atelier Nuit',
    fabric: 'Silk charmeuse',
    drape: 'Flowing',
    stretch: 'Medium',
    catalogImg: '/assets/catalog/black_gala_dress.png',
    mirrorImg: '/assets/demo/virtual_mirror_black_gala.png',
  },
  {
    id: 'burberry_trench',
    name: 'Heritage Trench',
    designer: 'British Heritage',
    fabric: 'Gabardine cotton',
    drape: 'Tailored',
    stretch: 'None',
    catalogImg: '/assets/catalog/burberry_trench.png',
    mirrorImg: '/assets/demo/virtual_mirror_burberry.png',
  },
  {
    id: 'floral_jumpsuit',
    name: 'Floral Jumpsuit',
    designer: 'Jardin Parisien',
    fabric: 'Viscose blend',
    drape: 'Soft',
    stretch: 'High',
    catalogImg: '/assets/catalog/lime_green_leather_suit.png',
    mirrorImg: '/assets/demo/virtual_mirror_floral_jumpsuit.png',
  },
  {
    id: 'red_dress',
    name: 'Red Statement Dress',
    designer: 'Elena Grandini',
    fabric: 'Crêpe de chine',
    drape: 'Body-conscious',
    stretch: 'Medium',
    catalogImg: '/assets/catalog/red_dress_clean.png',
    mirrorImg: '/assets/demo/virtual_mirror_black_jumpsuit.png',
  },
];

// ─── SELECTOR DE IDIOMA ───
const LangSelector = ({ lang, setLang }) => {
  const langs = [
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'fr', flag: '🇫🇷', label: 'FR' },
    { code: 'es', flag: '🇪🇸', label: 'ES' },
  ];

  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-sm px-1 py-0.5">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 text-[10px] tracking-wider uppercase transition-all duration-300 rounded-sm ${
            lang === l.code
              ? 'bg-[#C5A46D] text-[#0a0a0a] font-bold'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
};

// ─── COMPONENTE PRINCIPAL ───
const Home = () => {
  const [lang, setLang] = useState(() => detectLanguage());
  const [phase, setPhase] = useState('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const t = translations[lang];
  const current = CURATED_COLLECTION[currentIdx];
  const pauLine = t[PAU_LINE_KEYS[current.id]];

  // ─── SIMULACIÓN DE ESCANEO (Best Fit Engine) ───
  const startExperience = useCallback(() => {
    setPhase('scanning');
    setScanProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => setPhase('fitting'), 2000);
        }, 600);
      }
      setScanProgress(Math.min(progress, 100));
    }, 300);
  }, []);

  // ─── SIGUIENTE BEST FIT ───
  const nextBestFit = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % CURATED_COLLECTION.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  // ─── REINICIAR ───
  const restart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPhase('welcome');
      setCurrentIdx(0);
      setIsTransitioning(false);
    }, 400);
  }, []);

  // ─── PANTALLA DE BIENVENIDA ───
  if (phase === 'welcome') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col">
        {/* Hero */}
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Language selector - top right */}
          <div className="absolute top-4 right-4 z-20">
            <LangSelector lang={lang} setLang={setLang} />
          </div>

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/assets/ui/lafayette_hero_banner.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in">
            <img
              src="/assets/branding/logo_tryonyou_arabic_peacock.png"
              alt="TryOnYou"
              className="w-28 h-28 mb-6 object-contain"
            />
            <h1 className="font-serif text-5xl md:text-7xl tracking-[0.15em] text-[#C5A46D] mb-4">
              TRYONYOU
            </h1>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/50 mb-2">
              {t.subtitle}
            </p>
            <p className="text-lg md:text-xl font-serif italic text-white/70 max-w-lg mt-4 leading-relaxed">
              {t.tagline1}
              <br />
              {t.tagline2}
            </p>

            <button
              onClick={startExperience}
              className="mt-10 px-10 py-4 border-2 border-[#C5A46D] text-[#C5A46D] uppercase tracking-[0.3em] text-sm font-semibold hover:bg-[#C5A46D] hover:text-[#0a0a0a] transition-all duration-500"
            >
              {t.startExperience}
            </button>

            <p className="mt-6 text-[10px] tracking-[0.3em] text-white/30 uppercase">
              {t.patent}
            </p>
          </div>
        </div>

        {/* 3 Pilares */}
        <div className="bg-[#0a0a0a] py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-[#C5A46D] text-center mb-4 tracking-wider">
              {t.proMaxTitle}
            </h2>
            <p className="text-center text-white/40 text-sm tracking-widest uppercase mb-16">
              {t.proMaxSubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Pilar 1: Best Fit */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#C5A46D]/40 flex items-center justify-center group-hover:border-[#C5A46D] transition-colors duration-500">
                  <svg className="w-8 h-8 text-[#C5A46D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#C5A46D] mb-3 tracking-wider">{t.bestFitTitle}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t.bestFitDesc}</p>
              </div>

              {/* Pilar 2: Live AR */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#C5A46D]/40 flex items-center justify-center group-hover:border-[#C5A46D] transition-colors duration-500">
                  <svg className="w-8 h-8 text-[#C5A46D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#C5A46D] mb-3 tracking-wider">{t.liveARTitle}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t.liveARDesc}</p>
              </div>

              {/* Pilar 3: Cinematic Fit */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#C5A46D]/40 flex items-center justify-center group-hover:border-[#C5A46D] transition-colors duration-500">
                  <svg className="w-8 h-8 text-[#C5A46D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m14.25 0h1.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#C5A46D] mb-3 tracking-wider">{t.cinematicTitle}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t.cinematicDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Galería de Demo Mirrors */}
        <div className="bg-[#0f0f0f] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-[#C5A46D] text-center mb-12 tracking-wider">
              {t.virtualMirror}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                '/assets/demo/virtual_mirror_pink_chanel.png',
                '/assets/demo/virtual_mirror_black_gala.png',
                '/assets/demo/virtual_mirror_burberry.png',
                '/assets/demo/virtual_mirror_floral_jumpsuit.png',
                '/assets/demo/virtual_mirror_black_jumpsuit.png',
                '/assets/ui/lafayette_hero_banner.png',
              ].map((src, i) => (
                <div key={i} className="overflow-hidden border border-white/5 hover:border-[#C5A46D]/40 transition-all duration-500">
                  <img src={src} alt="" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Reel */}
        <div className="bg-[#0a0a0a] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-[#C5A46D] mb-8 tracking-wider">
              {t.seeInAction}
            </h2>
            <video
              src="/assets/video/tryonyou_demo_reel.mp4"
              controls
              playsInline
              className="w-full rounded-sm border border-[#C5A46D]/20 shadow-[0_0_60px_rgba(197,164,109,0.1)]"
              poster="/assets/ui/hero_banner_complete.png"
            />
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-[#0a0a0a] py-20 px-6 text-center">
          <p className="font-serif text-2xl md:text-3xl text-white/70 italic mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.ctaQuote}
          </p>
          <button
            onClick={startExperience}
            className="px-12 py-4 bg-[#C5A46D] text-[#0a0a0a] uppercase tracking-[0.3em] text-sm font-bold hover:bg-[#d4b98a] transition-all duration-300"
          >
            {t.tryItNow}
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-[#0a0a0a] border-t border-white/5 py-8 text-center">
          <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-12 h-12 mx-auto mb-3 object-contain opacity-50" />
          <p className="text-[10px] text-white/20 tracking-[0.5em] uppercase">
            {t.copyright}
          </p>
        </footer>
      </div>
    );
  }

  // ─── PANTALLA DE ESCANEO (Aura brillante) ───
  if (phase === 'scanning') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        {/* Language selector */}
        <div className="absolute top-4 right-4 z-20">
          <LangSelector lang={lang} setLang={setLang} />
        </div>

        <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-20 h-20 mb-8 object-contain animate-pulse" />

        {/* Aura de escaneo */}
        <div className="relative w-64 h-80 mb-8">
          <div
            className="absolute inset-0 rounded-full opacity-30 animate-pulse"
            style={{
              background: `radial-gradient(ellipse at center, rgba(197,164,109,${scanProgress / 200}) 0%, transparent 70%)`,
              transform: `scale(${1 + scanProgress / 200})`,
              transition: 'all 0.3s ease-out',
            }}
          />
          <img
            src="/assets/branding/pau_tuxedo_agent.png"
            alt="Pau le Paon"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 object-contain"
          />
        </div>

        <p className="font-serif text-xl text-[#C5A46D] italic mb-4">
          {scanProgress < 40 ? t.analyzingSilhouette : scanProgress < 80 ? t.matchingFabrics : t.curatingSelection}
        </p>

        {/* Barra de progreso elegante */}
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A46D] transition-all duration-300 ease-out"
            style={{ width: `${scanProgress}%` }}
          />
        </div>

        <p className="mt-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">
          {t.bestFitActive}
        </p>
      </div>
    );
  }

  // ─── PANTALLA DE REVELACIÓN ───
  if (phase === 'reveal') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        <div className="w-16 h-[1px] bg-[#C5A46D] mb-8" />
        <p className="font-serif text-3xl md:text-4xl text-[#C5A46D] italic leading-relaxed">
          {pauLine}
        </p>
        <div className="w-16 h-[1px] bg-[#C5A46D] mt-8" />
      </div>
    );
  }

  // ─── PANTALLA DE FITTING (experiencia principal) ───
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-8 h-8 object-contain" />
          <span className="text-[#C5A46D] font-serif text-lg tracking-wider">TRYONYOU</span>
        </div>
        <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase hidden md:block">
          {t.pilotLabel}
        </p>
        <div className="flex items-center gap-4">
          <LangSelector lang={lang} setLang={setLang} />
          <button onClick={restart} className="text-white/30 text-xs tracking-widest uppercase hover:text-[#C5A46D] transition-colors">
            {t.restart}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Virtual Mirror - Left */}
        <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
          <div className="relative w-full max-w-2xl border border-[#C5A46D]/20 rounded-sm overflow-hidden shadow-[0_0_80px_rgba(197,164,109,0.08)]">
            <img
              src={current.mirrorImg}
              alt={current.name}
              className="w-full h-auto transition-all duration-700"
            />
            {/* Aura overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(197,164,109,0.05) 0%, transparent 60%)',
              }}
            />
            {/* Live AR badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse" />
              <span className="text-[10px] text-[#C5A46D] tracking-widest uppercase">{t.liveAR}</span>
            </div>
          </div>
        </div>

        {/* Curated Selection - Right */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/5 p-6 lg:p-8 flex flex-col">
          {/* Pau's message */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/branding/pau_tuxedo_agent.png" alt="Pau" className="w-10 h-10 object-contain" />
              <div>
                <p className="text-[10px] text-white/30 tracking-widest uppercase">{t.pauSays}</p>
              </div>
            </div>
            <p className="font-serif text-xl text-[#C5A46D] italic leading-relaxed">
              "{pauLine}"
            </p>
          </div>

          {/* Garment info - SIN TALLAS, SIN NÚMEROS */}
          <div className="border-l-2 border-[#C5A46D] pl-5 mb-8">
            <h2 className="font-serif text-2xl text-white tracking-wide mb-1">{current.name}</h2>
            <p className="text-xs text-white/40 tracking-widest uppercase">{current.designer}</p>
          </div>

          {/* Fabric details - solo sensación */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-sm">
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">{t.fabric}</p>
              <p className="text-sm text-white/70">{current.fabric}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-sm">
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">{t.drape}</p>
              <p className="text-sm text-white/70">{current.drape}</p>
            </div>
          </div>

          {/* Catalog image */}
          <div className="mb-8 border border-white/5 rounded-sm overflow-hidden">
            <img src={current.catalogImg} alt={current.name} className="w-full h-48 object-contain bg-white/5" />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* BOTÓN SIGUIENTE BEST FIT */}
          <button
            onClick={nextBestFit}
            className="w-full py-4 bg-[#C5A46D] text-[#0a0a0a] uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#d4b98a] transition-all duration-300 mb-3"
          >
            {t.nextBestFit}
          </button>
          <p className="text-center text-[10px] text-white/30 tracking-widest">
            {t.alsoLooksIncredible}
          </p>

          {/* Indicador de posición */}
          <div className="flex justify-center gap-2 mt-4">
            {CURATED_COLLECTION.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-[#C5A46D] scale-125' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-3 flex items-center justify-between">
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">
          Patent PCT/EP2025/067317
        </p>
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">
          TryOnYou &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default Home;
