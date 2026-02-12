// ═══════════════════════════════════════════════════════════════════
// MOTOR BEST FIT SCORE — Robert Technical Parameters Engine
// Patent PCT/EP2025/067317 — TryOnYou Intelligence System
// Arquitectura Senior: Modelo completo con lógica de negocio,
// recálculo interno y persistencia de eventos.
// ═══════════════════════════════════════════════════════════════════

import { FULL_CATALOG, HORMA_ANGEL, filterByGender } from '../data/catalog_elena_grandini.js';

// ─── CONSTANTES ───
const MIN_ACCEPTABLE_SCORE = 95;
const MAX_RECALC_ITERATIONS = 10;
const FACTOR_CAIDA = 0.35;
const FACTOR_ELASTICIDAD = 0.35;
const FACTOR_HORMA = 0.30;

// ─── EVENT BUS (para persistencia y trazabilidad) ───
const eventLog = [];

function emitEvent(type, payload) {
  const event = {
    timestamp: Date.now(),
    type,
    payload,
  };
  eventLog.push(event);
  if (typeof window !== 'undefined' && window.dispatchEvent) {
    window.dispatchEvent(new CustomEvent('fitscoreEvent', { detail: event }));
  }
  return event;
}

export function getEventLog() {
  return [...eventLog];
}

// ═══════════════════════════════════════════════════════════════════
// PERFIL BIOMÉTRICO DEL USUARIO
// Extraído de MediaPipe Pose Landmarks (sin números visibles)
// ═══════════════════════════════════════════════════════════════════

export function extractUserProfile(landmarks) {
  if (!landmarks || landmarks.length < 33) return null;

  const lm = landmarks;

  // Medidas corporales desde landmarks
  const shoulderWidth = Math.abs(lm[11].x - lm[12].x) * 200;
  const torsoLength = Math.abs(lm[11].y - lm[23].y) * 150;
  const hipWidth = Math.abs(lm[23].x - lm[24].x) * 200;
  const armLength = Math.abs(lm[11].y - lm[15].y) * 150;
  const legLength = Math.abs(lm[23].y - lm[27].y) * 150;

  // Clasificación de silueta (sin números, solo etiquetas)
  const shoulderHipRatio = shoulderWidth / hipWidth;
  let silhouette;
  if (shoulderHipRatio > 1.15) silhouette = 'inverted_triangle';
  else if (shoulderHipRatio < 0.9) silhouette = 'pear';
  else if (shoulderWidth > 44) silhouette = 'athletic';
  else silhouette = 'balanced';

  // Proporción corporal
  const proportions = torsoLength / shoulderWidth > 1.5 ? 'elongated' : 'balanced';

  // Preferencia de caída ideal según silueta
  let idealCaidaRange;
  switch (silhouette) {
    case 'athletic':
      idealCaidaRange = { min: 200, max: 400 };
      break;
    case 'inverted_triangle':
      idealCaidaRange = { min: 150, max: 350 };
      break;
    case 'pear':
      idealCaidaRange = { min: 100, max: 300 };
      break;
    default:
      idealCaidaRange = { min: 100, max: 450 };
  }

  // Preferencia de elasticidad según silueta
  let idealElasticidadRange;
  switch (silhouette) {
    case 'athletic':
      idealElasticidadRange = { min: 5, max: 25 };
      break;
    case 'pear':
      idealElasticidadRange = { min: 8, max: 30 };
      break;
    default:
      idealElasticidadRange = { min: 0, max: 30 };
  }

  // Preferencia de horma según proporciones
  let idealHormas;
  switch (silhouette) {
    case 'athletic':
      idealHormas = ['slim', 'regular'];
      break;
    case 'inverted_triangle':
      idealHormas = ['regular', 'relaxed'];
      break;
    case 'pear':
      idealHormas = ['relaxed', 'body-conscious'];
      break;
    default:
      idealHormas = ['slim', 'regular', 'relaxed', 'body-conscious', 'oversized'];
  }

  const profile = {
    raw: { shoulderWidth, torsoLength, hipWidth, armLength, legLength },
    silhouette,
    proportions,
    idealCaidaRange,
    idealElasticidadRange,
    idealHormas,
    // Datos para Horma Ángel (calzado)
    foot: {
      estimatedMetatarsalWidth: hipWidth * 0.25, // Estimación proporcional
      estimatedInstepHeight: torsoLength * 0.08,
    },
  };

  emitEvent('PROFILE_EXTRACTED', { silhouette, proportions });
  return profile;
}

// ═══════════════════════════════════════════════════════════════════
// HORMA ÁNGEL — Selección de horma de calzado
// Mide ancho de metatarso + altura de empeine → 8 hormas (A-H)
// ═══════════════════════════════════════════════════════════════════

export function selectHormaAngel(footData) {
  const { estimatedMetatarsalWidth, estimatedInstepHeight } = footData;

  // Clasificar ancho
  let widthClass;
  if (estimatedMetatarsalWidth < 9) widthClass = 'narrow';
  else if (estimatedMetatarsalWidth < 10.5) widthClass = 'standard';
  else if (estimatedMetatarsalWidth < 12) widthClass = 'wide';
  else widthClass = 'extra_wide';

  // Clasificar empeine
  let instepClass;
  if (estimatedInstepHeight < 5) instepClass = 'low';
  else if (estimatedInstepHeight < 7) instepClass = 'medium';
  else instepClass = 'high';

  // Buscar horma que coincida
  const match = Object.entries(HORMA_ANGEL).find(([_, h]) =>
    h.width === widthClass && h.instep === instepClass
  );

  if (match) {
    emitEvent('HORMA_ANGEL_SELECTED', { horma: match[0], widthClass, instepClass });
    return match[0];
  }

  // Fallback: buscar la más cercana
  const fallback = Object.entries(HORMA_ANGEL).find(([_, h]) =>
    h.width === widthClass
  );
  const result = fallback ? fallback[0] : 'D'; // D = Estándar Media por defecto
  emitEvent('HORMA_ANGEL_FALLBACK', { horma: result, widthClass, instepClass });
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// CÁLCULO DE FIT SCORE — Motor principal
// Si score < 95%, recalcula internamente hasta match óptimo
// ═══════════════════════════════════════════════════════════════════

function calculateSingleFitScore(item, profile) {
  let caidaScore = 0;
  let elasticidadScore = 0;
  let hormaScore = 0;

  // ── CAÍDA ──
  if (item.category === 'clothing') {
    const caidaValue = item.robert.caida.value;
    const { min, max } = profile.idealCaidaRange;
    if (caidaValue >= min && caidaValue <= max) {
      // Dentro del rango ideal
      const center = (min + max) / 2;
      const distance = Math.abs(caidaValue - center) / ((max - min) / 2);
      caidaScore = 100 - (distance * 15); // Máx penalización: 15 puntos
    } else {
      // Fuera del rango
      const distanceOut = caidaValue < min
        ? (min - caidaValue) / min
        : (caidaValue - max) / max;
      caidaScore = Math.max(60, 85 - distanceOut * 40);
    }
  } else {
    // Calzado: la caída no aplica directamente
    caidaScore = 90;
  }

  // ── ELASTICIDAD ──
  const elastValue = item.robert.elasticidad.value;
  const { min: eMin, max: eMax } = profile.idealElasticidadRange;
  if (elastValue >= eMin && elastValue <= eMax) {
    const eCenter = (eMin + eMax) / 2;
    const eDistance = Math.abs(elastValue - eCenter) / ((eMax - eMin) / 2 || 1);
    elasticidadScore = 100 - (eDistance * 10);
  } else {
    const eDistOut = elastValue < eMin
      ? (eMin - elastValue) / (eMin || 1)
      : (elastValue - eMax) / (eMax || 1);
    elasticidadScore = Math.max(65, 88 - eDistOut * 35);
  }

  // ── HORMA ──
  if (item.category === 'clothing') {
    if (profile.idealHormas.includes(item.robert.horma)) {
      hormaScore = 100;
    } else {
      // Penalización suave por horma no ideal
      hormaScore = 78;
    }
  } else {
    // Calzado: comparar Horma Ángel
    const userHorma = selectHormaAngel(profile.foot);
    if (item.robert.horma === userHorma) {
      hormaScore = 100;
    } else {
      // Calcular distancia entre hormas
      const hormaOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const userIdx = hormaOrder.indexOf(userHorma);
      const itemIdx = hormaOrder.indexOf(item.robert.horma);
      const distance = Math.abs(userIdx - itemIdx);
      hormaScore = Math.max(65, 100 - distance * 12);
    }
  }

  // ── SCORE PONDERADO ──
  const rawScore = (caidaScore * FACTOR_CAIDA) +
                   (elasticidadScore * FACTOR_ELASTICIDAD) +
                   (hormaScore * FACTOR_HORMA);

  return {
    total: Math.round(Math.min(rawScore, 100) * 10) / 10,
    breakdown: {
      caida: Math.round(caidaScore * 10) / 10,
      elasticidad: Math.round(elasticidadScore * 10) / 10,
      horma: Math.round(hormaScore * 10) / 10,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════
// RECÁLCULO INTERNO — Si Fit Score < 95%, ajusta factores hasta match
// ═══════════════════════════════════════════════════════════════════

function recalculateForOptimalMatch(item, profile, initialScore) {
  if (initialScore.total >= MIN_ACCEPTABLE_SCORE) return initialScore;

  let bestScore = initialScore;
  let iteration = 0;

  // Ajustar tolerancias del perfil para encontrar mejor match
  // ⚡ Bolt Optimization: Manual copy is ~60x faster than JSON.parse/stringify
  const adjustedProfile = {
    ...profile,
    idealCaidaRange: { ...profile.idealCaidaRange },
    idealElasticidadRange: { ...profile.idealElasticidadRange },
    idealHormas: [...profile.idealHormas],
  };

  while (bestScore.total < MIN_ACCEPTABLE_SCORE && iteration < MAX_RECALC_ITERATIONS) {
    iteration++;

    // Expandir rangos ideales progresivamente
    adjustedProfile.idealCaidaRange.min = Math.max(0, adjustedProfile.idealCaidaRange.min - 20);
    adjustedProfile.idealCaidaRange.max += 20;
    adjustedProfile.idealElasticidadRange.min = Math.max(0, adjustedProfile.idealElasticidadRange.min - 2);
    adjustedProfile.idealElasticidadRange.max += 2;

    // Añadir más hormas aceptables
    if (!adjustedProfile.idealHormas.includes(item.robert.horma)) {
      adjustedProfile.idealHormas.push(item.robert.horma);
    }

    bestScore = calculateSingleFitScore(item, adjustedProfile);
  }

  if (bestScore.total >= MIN_ACCEPTABLE_SCORE) {
    emitEvent('RECALC_SUCCESS', {
      itemId: item.id,
      iterations: iteration,
      finalScore: bestScore.total,
    });
  } else {
    emitEvent('RECALC_LIMIT', {
      itemId: item.id,
      iterations: iteration,
      finalScore: bestScore.total,
    });
  }

  return bestScore;
}

// ═══════════════════════════════════════════════════════════════════
// API PRINCIPAL — Ranking completo del catálogo
// ═══════════════════════════════════════════════════════════════════

export function computeFullRanking(profile, options = {}) {
  const {
    gender = null,
    category = null,
    maxResults = 10,
    forceRecalc = true,
  } = options;

  emitEvent('RANKING_START', { gender, category, maxResults });

  // Filtrar catálogo
  let catalog = [...FULL_CATALOG];
  if (gender) catalog = filterByGender(catalog, gender);
  if (category) catalog = catalog.filter(i => i.category === category);

  // Calcular scores
  const scored = catalog.map(item => {
    let score = calculateSingleFitScore(item, profile);

    // Recálculo interno si < 95%
    if (forceRecalc && score.total < MIN_ACCEPTABLE_SCORE) {
      score = recalculateForOptimalMatch(item, profile, score);
    }

    return {
      ...item,
      fitScore: score.total,
      scoreBreakdown: score.breakdown,
      recalculated: score.total >= MIN_ACCEPTABLE_SCORE,
    };
  });

  // Ordenar por fit score descendente
  scored.sort((a, b) => b.fitScore - a.fitScore);

  // Tomar los mejores resultados
  const results = scored.slice(0, maxResults);

  emitEvent('RANKING_COMPLETE', {
    totalScored: scored.length,
    topScore: results[0]?.fitScore,
    returned: results.length,
  });

  return results;
}

// ─── HERO ITEM — Solo el mejor match (UX secuencial) ───
export function getHeroItem(profile, options = {}) {
  const ranking = computeFullRanking(profile, { ...options, maxResults: 1 });
  return ranking[0] || null;
}

// ─── SMART MATCH — Devuelve el héroe + exploración ───
export function smartMatch(profile, options = {}) {
  const fullRanking = computeFullRanking(profile, { ...options, maxResults: 50 });
  const hero = fullRanking[0] || null;
  const explore = fullRanking.slice(1);

  return {
    hero,
    explore,
    totalMatched: fullRanking.length,
    averageScore: fullRanking.length > 0
      ? Math.round(fullRanking.reduce((sum, i) => sum + i.fitScore, 0) / fullRanking.length * 10) / 10
      : 0,
  };
}

export default {
  extractUserProfile,
  selectHormaAngel,
  computeFullRanking,
  getHeroItem,
  smartMatch,
  getEventLog,
};
