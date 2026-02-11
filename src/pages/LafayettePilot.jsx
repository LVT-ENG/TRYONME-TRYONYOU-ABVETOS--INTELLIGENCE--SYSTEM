import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { Link } from 'react-router-dom';
import { FULL_CATALOG, CATEGORIES, filterByGender } from '../data/catalog_elena_grandini.js';
import { smartMatch, extractUserProfile, selectHormaAngel } from '../engine/fitScoreEngine.js';
import { drawBodyOverlay, drawFootScanner, extractFootMeasurements } from '../engine/visionOverlay.js';

// ═══════════════════════════════════════════════════════════════════
// GALERIES LAFAYETTE — DIVINEO SMART MIRROR
// Patent PCT/EP2025/067317 · Ruben Espinar Rodríguez
// Prioridad comercial: Elena Grandini · Galeries Lafayette
//
// Flujo: Landing Pau (Chasquido) → Escáner Dorado (Sin números)
//        → Overlay Real anclado hombros/cintura → 5 Botones de Valor
//
// Motor Robert AI: Caída (peso) · Elasticidad (stretch) · Horma (fit)
// Base de datos: 50 referencias Elena Grandini (35 ropa + 15 calzado)
// Horma Ángel: 8 hormas (A-H) · Metatarso + Empeine
// ═══════════════════════════════════════════════════════════════════

const KEY_POINTS = [11, 12, 23, 24]; // Hombros y caderas — anclaje principal

export default function LafayettePilot() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseInstanceRef = useRef(null);
  const cameraInstanceRef = useRef(null);
  const contextRef = useRef(null);
  const animFrameRef = useRef(0);
  const landmarksRef = useRef(null);

  // ─── ESTADOS ───
  const [phase, setPhase] = useState('landing'); // landing | scanning | matched | fitting
  const [scanProgress, setScanProgress] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [genderProfile, setGenderProfile] = useState('feminine');
  const [footScanActive, setFootScanActive] = useState(false);
  const [hormaResult, setHormaResult] = useState(null);
  const [lang, setLang] = useState('fr'); // Francés por defecto para Lafayette

  // Refs for stable access in animation loop
  const phaseRef = useRef(phase);
  const currentRef = useRef(null); // Will be synced with current
  const footScanActiveRef = useRef(footScanActive);

  const hasFetched = useRef(false);

  // ─── TRADUCCIONES INLINE (5 botones en francés) ───
  const t = useMemo(() => ({
    fr: {
      title: 'Galeries Lafayette',
      subtitle: 'Miroir Intelligent Divineo',
      startScan: 'Commencer le Scan',
      scanning: 'Analyse de votre silhouette...',
      matchingFabrics: 'Correspondance des tissus...',
      curatingSelection: 'Sélection curatée en cours...',
      perfectFound: 'Sélection parfaite trouvée',
      pauSays: 'Pau le Paon dit',
      drape: 'Tombé',
      stretch: 'Stretch',
      fit: 'Forme',
      fabric: 'Tissu',
      liveAR: 'AR en Direct',
      perfectFit: 'Ajustement Parfait',
      madeToMeasure: 'Fabrication Sur Mesure · 0% Déchets',
      // 5 Botones de Valor
      btn1: 'Prochain Meilleur Ajustement',
      btn2: 'Réserver en Cabine',
      btn3: 'Partager le Look',
      btn4: 'Explorer la Collection',
      btn5: 'Fabrication Sur Mesure · 0% Déchets',
      // Categorías
      all: 'Tout',
      clothing: 'Vêtements',
      footwear: 'Chaussures',
      // Género
      women: 'Femme',
      men: 'Homme',
      // Horma
      hormaDetected: 'Horma Ángel détectée',
      footScan: 'Scan des pieds',
      back: 'Retour',
      restart: 'Recommencer',
      piecesAnalyzed: 'pièces analysées',
      patent: 'Brevet PCT/EP2025/067317 · Ruben Espinar Rodríguez',
    },
    en: {
      title: 'Galeries Lafayette',
      subtitle: 'Divineo Smart Mirror',
      startScan: 'Start Scan',
      scanning: 'Analyzing your silhouette...',
      matchingFabrics: 'Matching fabrics...',
      curatingSelection: 'Curating your selection...',
      perfectFound: 'Perfect selection found',
      pauSays: 'Pau le Paon says',
      drape: 'Drape',
      stretch: 'Stretch',
      fit: 'Fit',
      fabric: 'Fabric',
      liveAR: 'Live AR',
      perfectFit: 'Perfect Fit',
      madeToMeasure: 'Made-to-Measure · 0% Waste',
      btn1: 'Next Best Fit',
      btn2: 'Reserve Fitting Room',
      btn3: 'Share This Look',
      btn4: 'Explore Collection',
      btn5: 'Made-to-Measure · 0% Waste',
      all: 'All',
      clothing: 'Clothing',
      footwear: 'Footwear',
      women: 'Women',
      men: 'Men',
      hormaDetected: 'Horma Ángel detected',
      footScan: 'Foot Scan',
      back: 'Back',
      restart: 'Restart',
      piecesAnalyzed: 'pieces analyzed',
      patent: 'Patent PCT/EP2025/067317 · Ruben Espinar Rodríguez',
    },
    es: {
      title: 'Galeries Lafayette',
      subtitle: 'Espejo Inteligente Divineo',
      startScan: 'Iniciar Escaneo',
      scanning: 'Analizando tu silueta...',
      matchingFabrics: 'Cotejando tejidos...',
      curatingSelection: 'Seleccionando tu colección...',
      perfectFound: 'Selección perfecta encontrada',
      pauSays: 'Pau le Paon dice',
      drape: 'Caída',
      stretch: 'Elasticidad',
      fit: 'Horma',
      fabric: 'Tejido',
      liveAR: 'AR en Vivo',
      perfectFit: 'Ajuste Perfecto',
      madeToMeasure: 'Fabricación a Medida · 0% Residuos',
      btn1: 'Siguiente Mejor Ajuste',
      btn2: 'Reservar Probador',
      btn3: 'Compartir el Look',
      btn4: 'Explorar Colección',
      btn5: 'Fabricación a Medida · 0% Residuos',
      all: 'Todo',
      clothing: 'Ropa',
      footwear: 'Calzado',
      women: 'Mujer',
      men: 'Hombre',
      hormaDetected: 'Horma Ángel detectada',
      footScan: 'Escaneo de pies',
      back: 'Volver',
      restart: 'Reiniciar',
      piecesAnalyzed: 'piezas analizadas',
      patent: 'Patente PCT/EP2025/067317 · Ruben Espinar Rodríguez',
    },
  }), []);

  const tx = t[lang] || t.fr;

  // ─── SMART MATCH: Motor Robert AI sobre catálogo Elena Grandini ───
  const runSmartMatch = useCallback((profile) => {
    const result = smartMatch(profile, {
      gender: genderProfile === 'feminine' ? 'F' : 'M',
      maxResults: 50,
      forceRecalc: true,
    });
    setMatchResult(result);
    setCurrentIdx(0);
    return result;
  }, [genderProfile]);

  // Items filtrados por categoría
  const displayItems = useMemo(() => {
    if (!matchResult) return [];
    const all = [matchResult.hero, ...matchResult.explore].filter(Boolean);
    if (activeCategory === 'all') return all;
    if (activeCategory === 'clothing') return all.filter(i => i.category === CATEGORIES.CLOTHING);
    if (activeCategory === 'footwear') return all.filter(i => i.category === CATEGORIES.FOOTWEAR);
    return all;
  }, [matchResult, activeCategory]);

  const current = displayItems[currentIdx] || displayItems[0];

  // Sync refs with state
  useEffect(() => {
    phaseRef.current = phase;
    currentRef.current = current;
    footScanActiveRef.current = footScanActive;
  }, [phase, current, footScanActive]);

  // ═══════════════════════════════════════════════════════════════
  // MEDIAPIPE POSE — Inicialización y loop de detección
  // ═══════════════════════════════════════════════════════════════
  const initPoseAndCamera = useCallback(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    poseInstanceRef.current = pose;

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!canvasRef.current || !results.poseLandmarks) return;

      if (!contextRef.current) {
        contextRef.current = canvasRef.current.getContext('2d', { desynchronized: true });
      }
      const ctx = contextRef.current;
      const { width, height } = canvasRef.current;

      // ⚡ Bolt: Removed redundant clearRect (drawImage overwrites full canvas)
      // ctx.clearRect(0, 0, width, height);

      // Espejo
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(results.image, 0, 0, width, height);
      ctx.restore();

      const lm = results.poseLandmarks;
      landmarksRef.current = lm;
      animFrameRef.current++;

      // ⚡ Bolt: Use refs to avoid stale closures in animation loop
      const currentVal = currentRef.current;
      const phaseVal = phaseRef.current;
      const footScanActiveVal = footScanActiveRef.current;

      // ── OVERLAY DORADO anclado a hombros/cintura (Vision Engine) ──
      drawBodyOverlay(ctx, lm, width, height, {
        fitScore: currentVal?.fitScore || 0,
        phase: phaseVal === 'scanning' ? 'scanning' : phaseVal === 'fitting' ? 'matched' : 'transition',
        animationFrame: animFrameRef.current,
      });

      // ── ESCÁNER DE PIES (Horma Ángel) ──
      if (footScanActiveVal) {
        drawFootScanner(ctx, lm, width, height, {
          animationFrame: animFrameRef.current,
          active: true,
        });
      }

      // ── EXTRACCIÓN DE PERFIL BIOMÉTRICO (una sola vez) ──
      if (!hasFetched.current && lm[11].visibility > 0.7) {
        // Progreso de escaneo basado en detección real
        setScanProgress((prev) => {
          const increment = Math.random() * 8 + 3;
          const newVal = Math.min(prev + increment, 100);

          if (newVal >= 100 && !hasFetched.current) {
            hasFetched.current = true;

            // Extraer perfil biométrico real desde landmarks
            const profile = extractUserProfile(lm);
            if (profile) {
              setUserProfile(profile);

              // Extraer medidas de pies para Horma Ángel
              const footData = extractFootMeasurements(lm);
              if (footData) {
                const horma = selectHormaAngel(footData);
                setHormaResult({ horma, ...footData });
              }

              // Ejecutar Smart Match con perfil real
              runSmartMatch(profile);

              // Transición suave: scanning → matched → fitting
              setPhase('matched');
              setTimeout(() => setPhase('fitting'), 2500);
            }
          }
          return newVal;
        });
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => { await pose.send({ image: videoRef.current }); },
      width: 1280,
      height: 720,
    });
    cameraInstanceRef.current = camera;
    camera.start();
  }, [phase, current, footScanActive, runSmartMatch]);

  // ─── CLEANUP ───
  useEffect(() => {
    return () => {
      if (cameraInstanceRef.current) {
        cameraInstanceRef.current.stop();
        cameraInstanceRef.current = null;
      }
      if (poseInstanceRef.current) {
        poseInstanceRef.current.close();
        poseInstanceRef.current = null;
      }
    };
  }, []);

  // ─── ACCIONES ───
  const startScan = useCallback(() => {
    setPhase('scanning');
    setScanProgress(0);
    hasFetched.current = false;
    initPoseAndCamera();
  }, [initPoseAndCamera]);

  const nextBestFit = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % displayItems.length);
      setIsTransitioning(false);
    }, 500);
  }, [displayItems.length]);

  const restart = useCallback(() => {
    setIsTransitioning(true);
    if (cameraInstanceRef.current) {
      cameraInstanceRef.current.stop();
      cameraInstanceRef.current = null;
    }
    if (poseInstanceRef.current) {
      poseInstanceRef.current.close();
      poseInstanceRef.current = null;
    }
    setTimeout(() => {
      setPhase('landing');
      setCurrentIdx(0);
      setScanProgress(0);
      setUserProfile(null);
      setMatchResult(null);
      setShowExplore(false);
      setFootScanActive(false);
      setHormaResult(null);
      hasFetched.current = false;
      contextRef.current = null;
      setIsTransitioning(false);
    }, 400);
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // LANDING PAU — Chasquido de inicio
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'landing') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/assets/ui/lafayette_hero_banner.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

        {/* Selector idioma */}
        <div className="absolute top-4 right-4 z-20 flex gap-1 bg-white/5 rounded-sm px-1 py-0.5">
          {['fr', 'en', 'es'].map(code => (
            <button key={code} onClick={() => setLang(code)}
              className={`px-2 py-1 text-[10px] tracking-wider uppercase rounded-sm transition-all ${
                lang === code ? 'bg-[#C5A46D] text-[#0a0a0a] font-bold' : 'text-white/40 hover:text-white/70'
              }`}>
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Botón volver */}
        <Link to="/" className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[#C5A46D] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {tx.back}
        </Link>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="TryOnYou" className="w-24 h-24 mb-6 object-contain" />
          <h1 className="font-serif text-4xl md:text-6xl tracking-[0.15em] text-[#C5A46D] mb-2">{tx.title}</h1>
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-8">{tx.subtitle}</p>

          {/* Selector género */}
          <div className="flex gap-4 mb-8">
            {['feminine', 'masculine'].map(g => (
              <button key={g} onClick={() => setGenderProfile(g)}
                className={`px-6 py-2 border text-sm uppercase tracking-widest transition-all ${
                  genderProfile === g
                    ? 'border-[#C5A46D] bg-[#C5A46D]/20 text-[#C5A46D]'
                    : 'border-white/20 text-white/40 hover:border-white/40'
                }`}>
                {g === 'feminine' ? tx.women : tx.men}
              </button>
            ))}
          </div>

          {/* Botón de inicio — Chasquido de Pau */}
          <button onClick={startScan}
            className="px-12 py-4 border-2 border-[#C5A46D] text-[#C5A46D] uppercase tracking-[0.3em] text-sm font-semibold hover:bg-[#C5A46D] hover:text-[#0a0a0a] transition-all duration-500 shadow-[0_0_40px_rgba(197,164,109,0.15)]">
            {tx.startScan}
          </button>

          <p className="mt-8 text-[9px] tracking-[0.3em] text-white/20 uppercase">{tx.patent}</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ESCÁNER DORADO — Sin números, solo aura y etiquetas
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'scanning') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="" className="w-8 h-8 object-contain" />
            <span className="text-[#C5A46D] font-serif tracking-wider">{tx.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse" />
            <span className="text-[10px] text-[#C5A46D] tracking-widest uppercase">{tx.liveAR}</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl border-2 border-[#C5A46D]/30 rounded-sm overflow-hidden shadow-[0_0_80px_rgba(197,164,109,0.15)]">
            <video ref={videoRef} className="hidden" autoPlay playsInline />
            <canvas ref={canvasRef} width="1280" height="720" className="w-full h-auto max-h-[70vh] object-cover" />

            {/* Overlay de escaneo */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pointer-events-none">
              <div className="w-full max-w-md">
                <p className="font-serif text-lg text-[#C5A46D] italic text-center mb-4">
                  {scanProgress < 30 ? tx.scanning :
                   scanProgress < 60 ? tx.matchingFabrics :
                   scanProgress < 90 ? tx.curatingSelection : tx.perfectFound}
                </p>

                {/* Barra de progreso dorada */}
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[#C5A46D] transition-all duration-300 shadow-[0_0_10px_rgba(197,164,109,0.6)]"
                    style={{ width: `${scanProgress}%` }} />
                </div>

                {/* Indicadores sin números — solo etiquetas con checks */}
                <div className="flex justify-center gap-6 text-[10px] text-white/30 tracking-widest uppercase">
                  <span className={scanProgress > 20 ? 'text-[#C5A46D]' : ''}>
                    {tx.drape} {scanProgress > 20 ? '\u2713' : '\u2026'}
                  </span>
                  <span className={scanProgress > 50 ? 'text-[#C5A46D]' : ''}>
                    {tx.stretch} {scanProgress > 50 ? '\u2713' : '\u2026'}
                  </span>
                  <span className={scanProgress > 75 ? 'text-[#C5A46D]' : ''}>
                    {tx.fit} {scanProgress > 75 ? '\u2713' : '\u2026'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // MATCHED — Revelación de Pau (transición suave)
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'matched') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6"
        style={{ animation: 'fadeIn 0.8s ease-out' }}>
        <div className="w-16 h-[1px] bg-[#C5A46D] mb-8" />
        <img src="/assets/branding/pau_tuxedo_agent.png" alt="Pau" className="w-16 h-16 object-contain mb-4" />
        <p className="font-serif text-3xl md:text-4xl text-[#C5A46D] italic leading-relaxed max-w-lg">
          {current?.pauLine?.[lang] || current?.pauLine?.fr || 'Votre sélection curatée est prête.'}
        </p>
        <div className="w-16 h-[1px] bg-[#C5A46D] mt-8" />
        {matchResult && (
          <p className="mt-6 text-[10px] text-white/30 tracking-widest uppercase">
            {matchResult.totalMatched} {tx.piecesAnalyzed}
          </p>
        )}
        {hormaResult && (
          <p className="mt-2 text-[10px] text-[#C5A46D]/50 tracking-widest uppercase">
            {tx.hormaDetected}: {hormaResult.horma}
          </p>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // FITTING — Overlay Real + 5 Botones de Valor
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#F5EFE6] flex flex-col transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/assets/branding/logo_tryonyou_arabic_peacock.png" alt="" className="w-8 h-8 object-contain" />
          <span className="text-[#C5A46D] font-serif tracking-wider">{tx.title}</span>
        </div>
        <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase hidden md:block">{tx.subtitle}</p>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-white/5 rounded-sm px-1 py-0.5">
            {['fr', 'en', 'es'].map(code => (
              <button key={code} onClick={() => setLang(code)}
                className={`px-2 py-1 text-[10px] tracking-wider uppercase rounded-sm transition-all ${
                  lang === code ? 'bg-[#C5A46D] text-[#0a0a0a] font-bold' : 'text-white/40'
                }`}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={restart} className="text-white/30 text-xs tracking-widest uppercase hover:text-[#C5A46D] transition-colors">
            {tx.restart}
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Virtual Mirror — Left */}
        <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
          <div className="relative w-full max-w-2xl border border-[#C5A46D]/20 rounded-sm overflow-hidden shadow-[0_0_80px_rgba(197,164,109,0.08)]">
            {/* Cámara en vivo con overlay */}
            <video ref={videoRef} className="hidden" autoPlay playsInline />
            <canvas ref={canvasRef} width="1280" height="720" className="w-full h-auto" />

            {/* Divineo Glow — Aura dorada si fitScore >= 95 */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: current?.fitScore >= 95
                  ? 'radial-gradient(ellipse at center, rgba(197,164,109,0.12) 0%, transparent 60%)'
                  : 'radial-gradient(ellipse at center, rgba(197,164,109,0.04) 0%, transparent 60%)',
              }} />

            {/* Live AR badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse" />
              <span className="text-[10px] text-[#C5A46D] tracking-widest uppercase">{tx.liveAR}</span>
            </div>

            {/* Fit badge */}
            {current?.fitScore >= 95 && (
              <div className="absolute top-4 right-4 bg-[#C5A46D] text-[#0a0a0a] px-3 py-1.5 rounded-sm">
                <span className="text-[10px] font-bold tracking-widest uppercase">{tx.perfectFit}</span>
              </div>
            )}

            {/* CAP module si fitScore < 95 */}
            {current?.fitScore < 95 && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-[#C5A46D]/30 p-3 rounded-sm text-center">
                <p className="text-[10px] text-[#C5A46D] tracking-widest uppercase">{tx.madeToMeasure}</p>
              </div>
            )}

            {/* Horma Ángel badge */}
            {hormaResult && footScanActive && (
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-[#C5A46D]/30 px-3 py-2 rounded-sm">
                <p className="text-[9px] text-white/40 tracking-widest uppercase">{tx.hormaDetected}</p>
                <p className="text-sm text-[#C5A46D] font-bold">{hormaResult.horma}</p>
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
              <p className="text-[10px] text-white/30 tracking-widest uppercase">{tx.pauSays}</p>
            </div>
            <p className="font-serif text-lg text-[#C5A46D] italic leading-relaxed">
              "{current?.pauLine?.[lang] || current?.pauLine?.fr || 'Cette pièce a été sélectionnée pour vous.'}"
            </p>
          </div>

          {/* Garment info */}
          <div className="border-l-2 border-[#C5A46D] pl-5 mb-6">
            <h2 className="font-serif text-2xl text-white tracking-wide mb-1">{current?.name}</h2>
            <p className="text-xs text-white/40 tracking-widest uppercase">{current?.designer}</p>
          </div>

          {/* Parámetros Robert — etiquetas sin números */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 p-3 rounded-sm text-center">
              <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">{tx.drape}</p>
              <p className="text-sm text-[#C5A46D]">{current?.robert?.caida?.label || '-'}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-sm text-center">
              <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">{tx.stretch}</p>
              <p className="text-sm text-[#C5A46D]">{current?.robert?.elasticidad?.label || '-'}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-sm text-center">
              <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">{tx.fit}</p>
              <p className="text-sm text-[#C5A46D] capitalize">{current?.robert?.horma || '-'}</p>
            </div>
          </div>

          {/* Fabric */}
          <div className="bg-white/5 p-3 rounded-sm mb-6">
            <p className="text-[9px] text-white/30 tracking-widest uppercase mb-1">{tx.fabric}</p>
            <p className="text-sm text-white/70">{current?.fabric || current?.material}</p>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'all', label: tx.all },
              { key: 'clothing', label: tx.clothing },
              { key: 'footwear', label: tx.footwear },
            ].map(cat => (
              <button key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setCurrentIdx(0); if (cat.key === 'footwear') setFootScanActive(true); else setFootScanActive(false); }}
                className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all rounded-sm ${
                  activeCategory === cat.key ? 'bg-[#C5A46D] text-[#0a0a0a] font-bold' : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* ═══════════════════════════════════════════════════ */}
          {/* 5 BOTONES DE VALOR                                */}
          {/* ═══════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-2 mt-4">
            <button onClick={nextBestFit}
              className="w-full py-3.5 bg-[#C5A46D] text-[#0a0a0a] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#d4b98a] transition-all duration-300">
              {tx.btn1}
            </button>
            <button className="w-full py-3 border border-[#C5A46D] text-[#C5A46D] uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#C5A46D]/10 transition-all duration-300">
              {tx.btn2}
            </button>
            <button className="w-full py-3 border border-white/20 text-white/60 uppercase tracking-[0.2em] text-xs hover:border-[#C5A46D]/40 hover:text-[#C5A46D] transition-all duration-300">
              {tx.btn3}
            </button>
            <button onClick={() => setShowExplore(!showExplore)}
              className="w-full py-3 border border-white/20 text-white/60 uppercase tracking-[0.2em] text-xs hover:border-[#C5A46D]/40 hover:text-[#C5A46D] transition-all duration-300">
              {tx.btn4}
            </button>
            <button className="w-full py-3 border border-white/10 text-white/40 uppercase tracking-[0.2em] text-[10px] hover:border-[#C5A46D]/30 hover:text-[#C5A46D]/70 transition-all duration-300">
              {tx.btn5}
            </button>
          </div>

          {/* Indicadores de posición */}
          <div className="flex justify-center gap-1.5 mt-4">
            {displayItems.slice(0, 10).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-[#C5A46D] scale-125' : 'bg-white/20'}`} />
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
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white/80">{item.name}</p>
                      <p className="text-[10px] text-white/40">{item.designer} \u2022 {item.fabric || item.material}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                      item.fitScore >= 95 ? 'bg-[#C5A46D]/20 text-[#C5A46D]' : 'bg-white/5 text-white/40'
                    }`}>
                      {item.fitScore >= 95 ? (lang === 'fr' ? 'Parfait' : 'Perfect') : (lang === 'fr' ? 'Sur Mesure' : 'Custom')}
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
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">{tx.patent}</p>
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">TryOnYou \u00A9 2026 \u2022 Elena Grandini \u2022 Galeries Lafayette</p>
      </footer>
    </div>
  );
}
