import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { translations, PAU_LINE_KEYS, detectLanguage } from '../i18n';
import { FULL_CATALOG, CATEGORIES, filterByGender } from '../data/catalog_elena_grandini.js';
import { smartMatch, extractUserProfile } from '../engine/fitScoreEngine.js';

// ═══════════════════════════════════════════════════════════════════
// TRYONYOU — Galeries Lafayette Pilot Pro Max
// Patent PCT/EP2025/067317 · Ruben Espinar Rodríguez
// Flujo: Landing Pau (Chasquido) → Escáner Dorado (Sin números)
//        → Overlay Real → 5 Botones de Valor en francés
// ═══════════════════════════════════════════════════════════════════

// ─── SIMULACIÓN DE PERFIL BIOMÉTRICO (sin cámara = demo mode) ───
const DEMO_PROFILES = {
  feminine: {
    raw: { shoulderWidth: 38, torsoLength: 42, hipWidth: 40, armLength: 55, legLength: 80 },
    silhouette: 'balanced',
    proportions: 'balanced',
    idealCaidaRange: { min: 80, max: 400 },
    idealElasticidadRange: { min: 0, max: 30 },
    idealHormas: ['slim', 'regular', 'relaxed', 'body-conscious'],
    foot: { estimatedMetatarsalWidth: 9.2, estimatedInstepHeight: 5.8 },
  },
  masculine: {
    raw: { shoulderWidth: 48, torsoLength: 46, hipWidth: 38, armLength: 60, legLength: 85 },
    silhouette: 'athletic',
    proportions: 'balanced',
    idealCaidaRange: { min: 150, max: 450 },
    idealElasticidadRange: { min: 2, max: 25 },
    idealHormas: ['slim', 'regular'],
    foot: { estimatedMetatarsalWidth: 10.5, estimatedInstepHeight: 6.5 },
  },
};

// ─── SELECTOR DE IDIOMA ───
const LangSelector = React.memo(({ lang, setLang }) => {
  const langs = [
    { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', label: 'EN' },
    { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'FR' },
    { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'ES' },
  ];
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-sm px-1 py-0.5">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 text-[10px] tracking-wider uppercase transition-all duration-300 rounded-sm ${
            lang === l.code ? 'bg-[#C5A46D] text-[#0a0a0a] font-bold' : 'text-white/40 hover:text-white/70'
          }`}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════
const Home = () => {
  const [lang, setLang] = useState(() => detectLanguage());
  const [phase, setPhase] = useState('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [genderProfile, setGenderProfile] = useState('feminine');
  const [matchResult, setMatchResult] = useState(null);
  const [showExplore, setShowExplore] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const t = translations[lang];

  // ─── SMART MATCH: Motor Robert AI sobre catálogo Elena Grandini ───
  const rankedItems = useMemo(() => {
    const profile = DEMO_PROFILES[genderProfile];
    const result = smartMatch(profile, {
      gender: genderProfile === 'feminine' ? 'F' : 'M',
      maxResults: 50,
      forceRecalc: true, // Si < 95%, recalcula hasta match óptimo
    });
    setMatchResult(result);
    return result;
  }, [genderProfile]);

  // Items filtrados por categoría activa
  const displayItems = useMemo(() => {
    if (!rankedItems) return [];
    const all = [rankedItems.hero, ...rankedItems.explore].filter(Boolean);
    if (activeCategory === 'all') return all;
    if (activeCategory === 'clothing') return all.filter(i => i.category === CATEGORIES.CLOTHING);
    if (activeCategory === 'footwear') return all.filter(i => i.category === CATEGORIES.FOOTWEAR);
    return all;
  }, [rankedItems, activeCategory]);

  const current = displayItems[currentIdx] || displayItems[0];

  // Pau line dinámica
  const pauLine = current?.pauLine?.[lang] || current?.pauLine?.en || t.pauLine_pink;

  // ─── SIMULACIÓN DE ESCANEO (Aura dorada, sin números) ───
  const startExperience = useCallback(() => {
    setPhase('scanning');
    setScanProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => setPhase('fitting'), 2200);
        }, 800);
      }
      setScanProgress(Math.min(progress, 100));
    }, 250);
  }, []);

  // ─── SIGUIENTE BEST FIT (transición suave con blur) ───
  const nextBestFit = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % displayItems.length);
      setIsTransitioning(false);
    }, 500);
  }, [displayItems.length]);

  // ─── REINICIAR ───
  const restart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPhase('welcome');
      setCurrentIdx(0);
      setShowExplore(false);
      setActiveCategory('all');
      setIsTransitioning(false);
    }, 400);
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // PANTALLA DE BIENVENIDA — Landing Pau (Chasquido)
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'welcome') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col">
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-4 right-4 z-20">
            <LangSelector lang={lang} setLang={setLang} />
          </div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/assets/ui/lafayette_hero_banner.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in">
            <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-28 h-28 mb-6 object-contain" />
            <h1 className="font-serif text-5xl md:text-7xl tracking-[0.15em] text-[#C5A46D] mb-4">TRYONYOU</h1>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/50 mb-2">{t.subtitle}</p>
            <p className="text-lg md:text-xl font-serif italic text-white/70 max-w-lg mt-4 leading-relaxed">
              {t.tagline1}<br />{t.tagline2}
            </p>

            {/* Selector de perfil */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setGenderProfile('feminine')}
                className={`px-6 py-2 border text-sm uppercase tracking-widest transition-all duration-300 ${
                  genderProfile === 'feminine'
                    ? 'border-[#C5A46D] bg-[#C5A46D]/20 text-[#C5A46D]'
                    : 'border-white/20 text-white/40 hover:border-white/40'
                }`}
              >
                {lang === 'fr' ? 'Femme' : lang === 'es' ? 'Mujer' : 'Women'}
              </button>
              <button
                onClick={() => setGenderProfile('masculine')}
                className={`px-6 py-2 border text-sm uppercase tracking-widest transition-all duration-300 ${
                  genderProfile === 'masculine'
                    ? 'border-[#C5A46D] bg-[#C5A46D]/20 text-[#C5A46D]'
                    : 'border-white/20 text-white/40 hover:border-white/40'
                }`}
              >
                {lang === 'fr' ? 'Homme' : lang === 'es' ? 'Hombre' : 'Men'}
              </button>
            </div>

            <button
              onClick={startExperience}
              className="mt-8 px-10 py-4 border-2 border-[#C5A46D] text-[#C5A46D] uppercase tracking-[0.3em] text-sm font-semibold hover:bg-[#C5A46D] hover:text-[#0a0a0a] transition-all duration-500"
            >
              {t.startExperience}
            </button>

            <p className="mt-6 text-[10px] tracking-[0.3em] text-white/30 uppercase">{t.patent}</p>
          </div>
        </div>

        {/* 3 Pilares */}
        <div className="bg-[#0a0a0a] py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-[#C5A46D] text-center mb-4 tracking-wider">{t.proMaxTitle}</h2>
            <p className="text-center text-white/40 text-sm tracking-widest uppercase mb-16">{t.proMaxSubtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#C5A46D]/40 flex items-center justify-center group-hover:border-[#C5A46D] transition-colors duration-500">
                  <svg className="w-8 h-8 text-[#C5A46D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#C5A46D] mb-3 tracking-wider">{t.bestFitTitle}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t.bestFitDesc}</p>
              </div>
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
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-[#C5A46D]/40 flex items-center justify-center group-hover:border-[#C5A46D] transition-colors duration-500">
                  <svg className="w-8 h-8 text-[#C5A46D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25c0 .621.504 1.125 1.125 1.125M18 12h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125M18 12c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125M19.125 15.75h-1.5A1.125 1.125 0 0118 14.625M19.125 15.75c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#C5A46D] mb-3 tracking-wider">{t.cinematicTitle}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t.cinematicDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Galería */}
        <div className="bg-[#0f0f0f] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-[#C5A46D] text-center mb-12 tracking-wider">{t.virtualMirror}</h2>
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
                  <img src={src} alt="" loading="lazy" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="bg-[#0a0a0a] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-[#C5A46D] mb-8 tracking-wider">{t.seeInAction}</h2>
            <video src="/assets/video/tryonyou_demo_reel.mp4" controls playsInline preload="none"
              className="w-full rounded-sm border border-[#C5A46D]/20 shadow-[0_0_60px_rgba(197,164,109,0.1)]"
              poster="/assets/ui/hero_banner_complete.png" />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a0a0a] py-20 px-6 text-center">
          <p className="font-serif text-2xl md:text-3xl text-white/70 italic mb-8 max-w-2xl mx-auto leading-relaxed">{t.ctaQuote}</p>
          <button onClick={startExperience}
            className="px-12 py-4 bg-[#C5A46D] text-[#0a0a0a] uppercase tracking-[0.3em] text-sm font-bold hover:bg-[#d4b98a] transition-all duration-300">
            {t.tryItNow}
          </button>
        </div>

        <footer className="bg-[#0a0a0a] border-t border-white/5 py-8 text-center">
          <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-12 h-12 mx-auto mb-3 object-contain opacity-50" />
          <p className="text-[10px] text-white/20 tracking-[0.5em] uppercase">{t.copyright}</p>
        </footer>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PANTALLA DE ESCANEO — Escáner Dorado (Sin números)
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'scanning') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute top-4 right-4 z-20">
          <LangSelector lang={lang} setLang={setLang} />
        </div>
        <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-20 h-20 mb-8 object-contain animate-pulse" />

        {/* Aura de escaneo dorada */}
        <div className="relative w-64 h-80 mb-8">
          <div className="absolute inset-0 rounded-full opacity-30 animate-pulse"
            style={{
              background: `radial-gradient(ellipse at center, rgba(197,164,109,${scanProgress / 200}) 0%, transparent 70%)`,
              transform: `scale(${1 + scanProgress / 200})`,
              transition: 'all 0.3s ease-out',
            }}
          />
          <img src="/assets/branding/pau_tuxedo_agent.png" alt="Pau le Paon"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 object-contain" />
        </div>

        <p className="font-serif text-xl text-[#C5A46D] italic mb-4">
          {scanProgress < 30 ? t.analyzingSilhouette : scanProgress < 60 ? t.matchingFabrics : scanProgress < 90 ? t.curatingSelection : (lang === 'fr' ? 'Sélection parfaite trouvée' : lang === 'es' ? 'Selección perfecta encontrada' : 'Perfect selection found')}
        </p>

        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#C5A46D] transition-all duration-300 ease-out" style={{ width: `${scanProgress}%` }} />
        </div>

        {/* Indicadores sin números — solo etiquetas */}
        <div className="mt-6 flex gap-6 text-[10px] text-white/30 tracking-widest uppercase">
          <span className={scanProgress > 20 ? 'text-[#C5A46D]' : ''}>
            {lang === 'fr' ? 'Caída' : lang === 'es' ? 'Caída' : 'Drape'} {scanProgress > 20 ? '\u2713' : '\u2026'}
          </span>
          <span className={scanProgress > 50 ? 'text-[#C5A46D]' : ''}>
            {lang === 'fr' ? 'Stretch' : lang === 'es' ? 'Elasticidad' : 'Stretch'} {scanProgress > 50 ? '\u2713' : '\u2026'}
          </span>
          <span className={scanProgress > 75 ? 'text-[#C5A46D]' : ''}>
            {lang === 'fr' ? 'Horma' : lang === 'es' ? 'Horma' : 'Fit'} {scanProgress > 75 ? '\u2713' : '\u2026'}
          </span>
        </div>

        <p className="mt-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">{t.bestFitActive}</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PANTALLA DE REVELACIÓN — Pau anuncia el match
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'reveal') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        <div className="w-16 h-[1px] bg-[#C5A46D] mb-8" />
        <p className="font-serif text-3xl md:text-4xl text-[#C5A46D] italic leading-relaxed">{pauLine}</p>
        <div className="w-16 h-[1px] bg-[#C5A46D] mt-8" />
        {matchResult && (
          <p className="mt-6 text-[10px] text-white/30 tracking-widest uppercase">
            {matchResult.totalMatched} {lang === 'fr' ? 'pièces analysées' : lang === 'es' ? 'piezas analizadas' : 'pieces analyzed'}
          </p>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PANTALLA DE FITTING — Overlay Real + 5 Botones de Valor
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-8 h-8 object-contain" />
          <span className="text-[#C5A46D] font-serif text-lg tracking-wider">TRYONYOU</span>
        </div>
        <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase hidden md:block">{t.pilotLabel}</p>
        <div className="flex items-center gap-4">
          <LangSelector lang={lang} setLang={setLang} />
          <button onClick={restart} className="text-white/30 text-xs tracking-widest uppercase hover:text-[#C5A46D] transition-colors">
            {t.restart}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Virtual Mirror — Left */}
        <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
          <div className="relative w-full max-w-2xl border border-[#C5A46D]/20 rounded-sm overflow-hidden shadow-[0_0_80px_rgba(197,164,109,0.08)]">
            <img src={current?.mirrorImg || '/assets/demo/virtual_mirror_pink_chanel.png'} alt={current?.name}
              className="w-full h-auto transition-all duration-700" />
            {/* Aura overlay — Divineo Glow si fitScore >= 95 */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: current?.fitScore >= 95
                  ? 'radial-gradient(ellipse at center, rgba(197,164,109,0.12) 0%, transparent 60%)'
                  : 'radial-gradient(ellipse at center, rgba(197,164,109,0.04) 0%, transparent 60%)',
              }}
            />
            {/* Live AR badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse" />
              <span className="text-[10px] text-[#C5A46D] tracking-widest uppercase">{t.liveAR}</span>
            </div>
            {/* Fit Score badge (solo si >= 95) */}
            {current?.fitScore >= 95 && (
              <div className="absolute top-4 right-4 bg-[#C5A46D] text-[#0a0a0a] px-3 py-1.5 rounded-sm">
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  {lang === 'fr' ? 'Ajustement Parfait' : lang === 'es' ? 'Ajuste Perfecto' : 'Perfect Fit'}
                </span>
              </div>
            )}
            {/* CAP module si fitScore < 95 */}
            {current?.fitScore < 95 && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-[#C5A46D]/30 p-3 rounded-sm text-center">
                <p className="text-[10px] text-[#C5A46D] tracking-widest uppercase">
                  {lang === 'fr' ? 'Fabrication sur mesure \u2022 0% Déchets' : lang === 'es' ? 'Fabricación a medida \u2022 0% Residuos' : 'Made-to-measure \u2022 0% Waste'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Curated Selection — Right Panel */}
        <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-white/5 p-6 lg:p-8 flex flex-col">
          {/* Pau's message */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <img src="/assets/branding/pau_tuxedo_agent.png" alt="Pau" className="w-10 h-10 object-contain" />
              <p className="text-[10px] text-white/30 tracking-widest uppercase">{t.pauSays}</p>
            </div>
            <p className="font-serif text-lg text-[#C5A46D] italic leading-relaxed">"{pauLine}"</p>
          </div>

          {/* Garment info — SIN TALLAS, SIN NÚMEROS */}
          <div className="border-l-2 border-[#C5A46D] pl-5 mb-6">
            <h2 className="font-serif text-2xl text-white tracking-wide mb-1">{current?.name}</h2>
            <p className="text-xs text-white/40 tracking-widest uppercase">{current?.designer}</p>
          </div>

          {/* Parámetros Robert — solo etiquetas, sin números */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 p-3 rounded-sm text-center">
              <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">
                {lang === 'fr' ? 'Tombé' : lang === 'es' ? 'Caída' : 'Drape'}
              </p>
              <p className="text-sm text-[#C5A46D]">{current?.robert?.caida?.label || current?.fabric}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-sm text-center">
              <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">Stretch</p>
              <p className="text-sm text-[#C5A46D]">{current?.robert?.elasticidad?.label || 'Medium'}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-sm text-center">
              <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">
                {lang === 'fr' ? 'Forme' : lang === 'es' ? 'Horma' : 'Fit'}
              </p>
              <p className="text-sm text-[#C5A46D] capitalize">{current?.robert?.horma || 'regular'}</p>
            </div>
          </div>

          {/* Fabric & Material */}
          <div className="bg-white/5 p-3 rounded-sm mb-6">
            <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">{t.fabric}</p>
            <p className="text-sm text-white/70">{current?.fabric || current?.material}</p>
          </div>

          {/* Catalog image */}
          {current?.catalogImg && (
            <div className="mb-6 border border-white/5 rounded-sm overflow-hidden">
              <img src={current.catalogImg} alt={current.name} className="w-full h-40 object-contain bg-white/5" />
            </div>
          )}

          {/* Category filter */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'all', label: { en: 'All', fr: 'Tout', es: 'Todo' } },
              { key: 'clothing', label: { en: 'Clothing', fr: 'Vêtements', es: 'Ropa' } },
              { key: 'footwear', label: { en: 'Footwear', fr: 'Chaussures', es: 'Calzado' } },
            ].map(cat => (
              <button key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setCurrentIdx(0); }}
                className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all rounded-sm ${
                  activeCategory === cat.key
                    ? 'bg-[#C5A46D] text-[#0a0a0a] font-bold'
                    : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}
              >
                {cat.label[lang] || cat.label.en}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 5 BOTONES DE VALOR — en francés como idioma primario  */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-2 mt-4">
            {/* Botón 1: Siguiente Best Fit */}
            <button onClick={nextBestFit}
              className="w-full py-3.5 bg-[#C5A46D] text-[#0a0a0a] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#d4b98a] transition-all duration-300">
              {lang === 'fr' ? 'Prochain Meilleur Ajustement' : lang === 'es' ? 'Siguiente Mejor Ajuste' : 'Next Best Fit'}
            </button>

            {/* Botón 2: Réserver en Cabine */}
            <button className="w-full py-3 border border-[#C5A46D] text-[#C5A46D] uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#C5A46D]/10 transition-all duration-300">
              {lang === 'fr' ? 'Réserver en Cabine' : lang === 'es' ? 'Reservar en Probador' : 'Reserve Fitting Room'}
            </button>

            {/* Botón 3: Partager le Look */}
            <button className="w-full py-3 border border-white/20 text-white/60 uppercase tracking-[0.2em] text-xs hover:border-[#C5A46D]/40 hover:text-[#C5A46D] transition-all duration-300">
              {lang === 'fr' ? 'Partager le Look' : lang === 'es' ? 'Compartir el Look' : 'Share This Look'}
            </button>

            {/* Botón 4: Voir les Détails Tissu */}
            <button onClick={() => setShowExplore(!showExplore)}
              className="w-full py-3 border border-white/20 text-white/60 uppercase tracking-[0.2em] text-xs hover:border-[#C5A46D]/40 hover:text-[#C5A46D] transition-all duration-300">
              {lang === 'fr' ? 'Explorer la Collection' : lang === 'es' ? 'Explorar Colección' : 'Explore Collection'}
            </button>

            {/* Botón 5: Fabrication Sur Mesure (CAP) */}
            <button className="w-full py-3 border border-white/10 text-white/40 uppercase tracking-[0.2em] text-[10px] hover:border-[#C5A46D]/30 hover:text-[#C5A46D]/70 transition-all duration-300">
              {lang === 'fr' ? 'Fabrication Sur Mesure \u2022 0% Déchets' : lang === 'es' ? 'Fabricación a Medida \u2022 0% Residuos' : 'Made-to-Measure \u2022 0% Waste'}
            </button>
          </div>

          {/* Indicador de posición */}
          <div className="flex justify-center gap-1.5 mt-4">
            {displayItems.slice(0, 10).map((_, i) => (
              <div key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-[#C5A46D] scale-125' : 'bg-white/20'}`}
              />
            ))}
            {displayItems.length > 10 && (
              <span className="text-[8px] text-white/20 ml-1">+{displayItems.length - 10}</span>
            )}
          </div>

          {/* Explore panel */}
          {showExplore && (
            <div className="mt-4 max-h-60 overflow-y-auto border border-white/10 rounded-sm">
              {displayItems.map((item, idx) => (
                <button key={item.id}
                  onClick={() => { setCurrentIdx(idx); setShowExplore(false); }}
                  className={`w-full text-left px-4 py-3 border-b border-white/5 transition-all ${
                    idx === currentIdx ? 'bg-[#C5A46D]/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white/80">{item.name}</p>
                      <p className="text-[10px] text-white/40">{item.designer} \u2022 {item.fabric || item.material}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                      item.fitScore >= 95 ? 'bg-[#C5A46D]/20 text-[#C5A46D]' : 'bg-white/5 text-white/40'
                    }`}>
                      {item.fitScore >= 95
                        ? (lang === 'fr' ? 'Parfait' : lang === 'es' ? 'Perfecto' : 'Perfect')
                        : (lang === 'fr' ? 'Sur Mesure' : lang === 'es' ? 'A Medida' : 'Custom')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-3 flex items-center justify-between">
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">Patent PCT/EP2025/067317 \u2022 Ruben Espinar Rodr\u00edguez</p>
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">TryOnYou \u00A9 2026</p>
      </footer>
    </div>
  );
};

export default Home;
