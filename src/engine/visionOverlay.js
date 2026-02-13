// ═══════════════════════════════════════════════════════════════════
// VISION OVERLAY ENGINE — Anclaje a Hombros/Cintura + Horma Ángel
// Patent PCT/EP2025/067317 — TryOnYou Intelligence System
// ═══════════════════════════════════════════════════════════════════
// Cuerpo: El overlay se ancla a hombros (lm 11,12) y cintura (lm 23,24)
// Pies (Horma Ángel): Escaneo mide ancho metatarso + altura empeine
// ═══════════════════════════════════════════════════════════════════

// ─── CONSTANTES DE LANDMARKS MEDIAPIPE ───
const LANDMARKS = {
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
};

// ─── COLORES TRYONYOU ───
const COLORS = {
  GOLD: '#C5A46D',
  GOLD_LIGHT: 'rgba(197, 164, 109, 0.15)',
  GOLD_MEDIUM: 'rgba(197, 164, 109, 0.3)',
  GOLD_GLOW: 'rgba(197, 164, 109, 0.08)',
  WHITE_SOFT: 'rgba(255, 255, 255, 0.6)',
  AURA_HIGH: 'rgba(197, 164, 109, 0.25)',
  AURA_LOW: 'rgba(197, 164, 109, 0.05)',
};

// ═══════════════════════════════════════════════════════════════════
// OVERLAY CORPORAL — Anclado a hombros y cintura del vídeo real
// ═══════════════════════════════════════════════════════════════════

export function drawBodyOverlay(ctx, landmarks, width, height, options = {}) {
  const {
    fitScore = 98,
    phase = 'scanning', // 'scanning' | 'matched' | 'transition'
    animationFrame = 0,
  } = options;

  const lm = landmarks;
  if (!lm || lm.length < 33) return;

  // Puntos de anclaje principales
  const leftShoulder = { x: lm[LANDMARKS.LEFT_SHOULDER].x * width, y: lm[LANDMARKS.LEFT_SHOULDER].y * height };
  const rightShoulder = { x: lm[LANDMARKS.RIGHT_SHOULDER].x * width, y: lm[LANDMARKS.RIGHT_SHOULDER].y * height };
  const leftHip = { x: lm[LANDMARKS.LEFT_HIP].x * width, y: lm[LANDMARKS.LEFT_HIP].y * height };
  const rightHip = { x: lm[LANDMARKS.RIGHT_HIP].x * width, y: lm[LANDMARKS.RIGHT_HIP].y * height };

  // Centro del torso
  const torsoCenter = {
    x: (leftShoulder.x + rightShoulder.x + leftHip.x + rightHip.x) / 4,
    y: (leftShoulder.y + rightShoulder.y + leftHip.y + rightHip.y) / 4,
  };

  // Dimensiones del torso
  const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
  const torsoHeight = Math.abs(torsoCenter.y - leftShoulder.y) * 2;

  // ── FASE: ESCÁNER DORADO (sin números) ──
  if (phase === 'scanning') {
    const pulse = Math.sin(animationFrame * 0.05) * 0.5 + 0.5;

    // Aura dorada pulsante alrededor del cuerpo
    const auraRadius = shoulderWidth * 1.5;
    const auraGradient = ctx.createRadialGradient(
      torsoCenter.x, torsoCenter.y, shoulderWidth * 0.3,
      torsoCenter.x, torsoCenter.y, auraRadius
    );
    auraGradient.addColorStop(0, `rgba(197, 164, 109, ${0.15 + pulse * 0.1})`);
    auraGradient.addColorStop(0.5, `rgba(197, 164, 109, ${0.05 + pulse * 0.05})`);
    auraGradient.addColorStop(1, 'rgba(197, 164, 109, 0)');

    ctx.fillStyle = auraGradient;
    // ⚡ Bolt Optimization: Constrain fillRect to gradient bounds
    ctx.fillRect(
      torsoCenter.x - auraRadius,
      torsoCenter.y - auraRadius,
      auraRadius * 2,
      auraRadius * 2
    );

    // Contorno dorado del torso (anclado a hombros + cintura)
    ctx.beginPath();
    ctx.moveTo(leftShoulder.x - 10, leftShoulder.y - 5);
    ctx.quadraticCurveTo(
      torsoCenter.x, leftShoulder.y - 20,
      rightShoulder.x + 10, rightShoulder.y - 5
    );
    ctx.lineTo(rightHip.x + 5, rightHip.y + 5);
    ctx.quadraticCurveTo(
      torsoCenter.x, rightHip.y + 15,
      leftHip.x - 5, leftHip.y + 5
    );
    ctx.closePath();

    // ⚡ Bolt Optimization: Manual glow (multi-pass stroke) instead of expensive shadowBlur
    // Glow pass
    ctx.strokeStyle = `rgba(197, 164, 109, ${0.3 + pulse * 0.2})`;
    ctx.lineWidth = (2 + pulse) + 12; // Thicker for glow
    ctx.stroke();

    // Core pass
    ctx.strokeStyle = COLORS.GOLD;
    ctx.lineWidth = 2 + pulse;
    ctx.stroke();

    // Relleno sutil
    ctx.fillStyle = `rgba(197, 164, 109, ${0.05 + pulse * 0.05})`;
    ctx.fill();

    // Puntos de anclaje dorados (hombros + cintura)
    [leftShoulder, rightShoulder, leftHip, rightHip].forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.GOLD;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(197, 164, 109, ${0.3 + pulse * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Línea de escaneo horizontal descendente
    const scanY = leftShoulder.y + (animationFrame % 120) / 120 * torsoHeight * 1.5;
    if (scanY < leftHip.y + 30) {
      ctx.beginPath();
      ctx.moveTo(leftShoulder.x - 30, scanY);
      ctx.lineTo(rightShoulder.x + 30, scanY);
      ctx.strokeStyle = `rgba(197, 164, 109, ${0.6 - (animationFrame % 120) / 120 * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // ── FASE: MATCH ENCONTRADO (Aura Divineo Glow) ──
  if (phase === 'matched') {
    const glowIntensity = fitScore >= 95 ? 0.25 : 0.1;
    const pulse = Math.sin(animationFrame * 0.03) * 0.5 + 0.5;

    // Aura de éxito dorada
    const matchRadius = shoulderWidth * 2;
    const matchGradient = ctx.createRadialGradient(
      torsoCenter.x, torsoCenter.y, 0,
      torsoCenter.x, torsoCenter.y, matchRadius
    );
    matchGradient.addColorStop(0, `rgba(197, 164, 109, ${glowIntensity})`);
    matchGradient.addColorStop(0.4, `rgba(197, 164, 109, ${glowIntensity * 0.4})`);
    matchGradient.addColorStop(1, 'rgba(197, 164, 109, 0)');

    ctx.fillStyle = matchGradient;
    // ⚡ Bolt Optimization: Constrain fillRect
    ctx.fillRect(
      torsoCenter.x - matchRadius,
      torsoCenter.y - matchRadius,
      matchRadius * 2,
      matchRadius * 2
    );

    // Contorno del cuerpo con glow premium
    ctx.beginPath();
    ctx.moveTo(leftShoulder.x, leftShoulder.y);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(rightHip.x, rightHip.y);
    ctx.lineTo(leftHip.x, leftHip.y);
    ctx.closePath();

    // ⚡ Bolt Optimization: Manual glow (multi-pass stroke)
    // Glow pass
    ctx.strokeStyle = `rgba(197, 164, 109, ${glowIntensity + pulse * 0.2})`;
    ctx.lineWidth = 1.5 + 20; // Wide glow
    ctx.stroke();

    // Core pass
    ctx.strokeStyle = COLORS.GOLD;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // ── FASE: TRANSICIÓN (difusión suave — enmascaramiento de latencia) ──
  if (phase === 'transition') {
    const fadeProgress = Math.min(animationFrame / 60, 1);

    // Difusión suave que enmascara el procesamiento
    ctx.fillStyle = `rgba(10, 10, 10, ${0.3 * (1 - fadeProgress)})`;
    ctx.fillRect(0, 0, width, height);

    // Silueta borrosa dorada
    const blurGradient = ctx.createRadialGradient(
      torsoCenter.x, torsoCenter.y, 0,
      torsoCenter.x, torsoCenter.y, shoulderWidth * 1.2
    );
    blurGradient.addColorStop(0, `rgba(197, 164, 109, ${0.2 * (1 - fadeProgress)})`);
    blurGradient.addColorStop(1, 'rgba(197, 164, 109, 0)');
    ctx.fillStyle = blurGradient;
    ctx.fillRect(0, 0, width, height);
  }
}

// ═══════════════════════════════════════════════════════════════════
// ESCÁNER DE PIES — Horma Ángel
// Mide ancho de metatarso y altura de empeine
// ═══════════════════════════════════════════════════════════════════

export function drawFootScanner(ctx, landmarks, width, height, options = {}) {
  const { animationFrame = 0, active = false } = options;
  if (!active) return;

  const lm = landmarks;
  if (!lm || lm.length < 33) return;

  const leftAnkle = { x: lm[LANDMARKS.LEFT_ANKLE].x * width, y: lm[LANDMARKS.LEFT_ANKLE].y * height };
  const rightAnkle = { x: lm[LANDMARKS.RIGHT_ANKLE].x * width, y: lm[LANDMARKS.RIGHT_ANKLE].y * height };
  const leftHeel = { x: lm[LANDMARKS.LEFT_HEEL].x * width, y: lm[LANDMARKS.LEFT_HEEL].y * height };
  const rightHeel = { x: lm[LANDMARKS.RIGHT_HEEL].x * width, y: lm[LANDMARKS.RIGHT_HEEL].y * height };
  const leftToe = { x: lm[LANDMARKS.LEFT_FOOT_INDEX].x * width, y: lm[LANDMARKS.LEFT_FOOT_INDEX].y * height };
  const rightToe = { x: lm[LANDMARKS.RIGHT_FOOT_INDEX].x * width, y: lm[LANDMARKS.RIGHT_FOOT_INDEX].y * height };

  const pulse = Math.sin(animationFrame * 0.06) * 0.5 + 0.5;

  // Dibujar zona de escaneo alrededor de cada pie
  [
    { ankle: leftAnkle, heel: leftHeel, toe: leftToe },
    { ankle: rightAnkle, heel: rightHeel, toe: rightToe },
  ].forEach(foot => {
    const footCenter = {
      x: (foot.ankle.x + foot.heel.x + foot.toe.x) / 3,
      y: (foot.ankle.y + foot.heel.y + foot.toe.y) / 3,
    };
    const footLength = Math.hypot(foot.toe.x - foot.heel.x, foot.toe.y - foot.heel.y);

    // Aura de escaneo del pie
    const footGradient = ctx.createRadialGradient(
      footCenter.x, footCenter.y, 0,
      footCenter.x, footCenter.y, footLength * 0.8
    );
    footGradient.addColorStop(0, `rgba(197, 164, 109, ${0.15 + pulse * 0.1})`);
    footGradient.addColorStop(1, 'rgba(197, 164, 109, 0)');
    ctx.fillStyle = footGradient;
    ctx.beginPath();
    ctx.arc(footCenter.x, footCenter.y, footLength * 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Contorno del pie
    ctx.beginPath();
    ctx.moveTo(foot.heel.x, foot.heel.y);
    ctx.lineTo(foot.ankle.x, foot.ankle.y);
    ctx.lineTo(foot.toe.x, foot.toe.y);
    ctx.closePath();

    // ⚡ Bolt Optimization: Manual glow
    ctx.strokeStyle = `rgba(197, 164, 109, 0.3)`;
    ctx.lineWidth = 1.5 + 8;
    ctx.stroke();

    ctx.strokeStyle = COLORS.GOLD;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Indicador de ancho metatarso (línea horizontal)
    const metatarsalY = foot.ankle.y + (foot.toe.y - foot.ankle.y) * 0.6;
    ctx.beginPath();
    ctx.moveTo(footCenter.x - footLength * 0.25, metatarsalY);
    ctx.lineTo(footCenter.x + footLength * 0.25, metatarsalY);
    ctx.strokeStyle = `rgba(197, 164, 109, ${0.5 + pulse * 0.3})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Indicador de altura empeine (línea vertical)
    ctx.beginPath();
    ctx.moveTo(foot.ankle.x, foot.ankle.y);
    ctx.lineTo(foot.ankle.x, foot.ankle.y - footLength * 0.3);
    ctx.strokeStyle = `rgba(197, 164, 109, ${0.5 + pulse * 0.3})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

// ═══════════════════════════════════════════════════════════════════
// EXTRAER MEDIDAS DE PIES PARA HORMA ÁNGEL
// ═══════════════════════════════════════════════════════════════════

export function extractFootMeasurements(landmarks) {
  if (!landmarks || landmarks.length < 33) return null;

  const lm = landmarks;

  // Pie izquierdo
  const leftAnkle = lm[LANDMARKS.LEFT_ANKLE];
  const leftHeel = lm[LANDMARKS.LEFT_HEEL];
  const leftToe = lm[LANDMARKS.LEFT_FOOT_INDEX];

  // Pie derecho
  const rightAnkle = lm[LANDMARKS.RIGHT_ANKLE];
  const rightHeel = lm[LANDMARKS.RIGHT_HEEL];
  const rightToe = lm[LANDMARKS.RIGHT_FOOT_INDEX];

  // Estimación de ancho metatarso (proporcional a la distancia tobillo-dedo)
  const leftFootLength = Math.hypot(leftToe.x - leftHeel.x, leftToe.y - leftHeel.y) * 200;
  const rightFootLength = Math.hypot(rightToe.x - rightHeel.x, rightToe.y - rightHeel.y) * 200;
  const avgFootLength = (leftFootLength + rightFootLength) / 2;

  // Ancho metatarso estimado (proporción anatómica ~38% de la longitud)
  const estimatedMetatarsalWidth = avgFootLength * 0.38;

  // Altura empeine estimada (distancia vertical tobillo)
  const leftInstep = Math.abs(leftAnkle.y - leftHeel.y) * 150;
  const rightInstep = Math.abs(rightAnkle.y - rightHeel.y) * 150;
  const estimatedInstepHeight = (leftInstep + rightInstep) / 2;

  return {
    estimatedMetatarsalWidth,
    estimatedInstepHeight,
    footLength: avgFootLength,
    // Índice EU estimado (fórmula estándar)
    estimatedEUIndex: Math.round((avgFootLength * 1.5 + 2) * 2) / 2,
  };
}

// ═══════════════════════════════════════════════════════════════════
// RENDERIZADO COMPLETO DEL ESPEJO
// ═══════════════════════════════════════════════════════════════════

export function renderMirrorFrame(ctx, videoFrame, landmarks, width, height, state = {}) {
  const {
    phase = 'scanning',
    fitScore = 0,
    animationFrame = 0,
    footScanActive = false,
  } = state;

  // 1. Limpiar canvas
  ctx.clearRect(0, 0, width, height);

  // 2. Dibujar vídeo en espejo
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-width, 0);
  ctx.drawImage(videoFrame, 0, 0, width, height);
  ctx.restore();

  // 3. Overlay corporal anclado a hombros/cintura
  if (landmarks) {
    drawBodyOverlay(ctx, landmarks, width, height, {
      fitScore,
      phase,
      animationFrame,
    });

    // 4. Escáner de pies (Horma Ángel)
    drawFootScanner(ctx, landmarks, width, height, {
      animationFrame,
      active: footScanActive,
    });
  }
}

export default {
  drawBodyOverlay,
  drawFootScanner,
  extractFootMeasurements,
  renderMirrorFrame,
  LANDMARKS,
};
