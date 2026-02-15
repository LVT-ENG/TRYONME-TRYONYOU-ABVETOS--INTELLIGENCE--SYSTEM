#!/usr/bin/env bash
set -euo pipefail

# =========================
# TRYONYOU V9 — ONE SHOT
# - auto-detect repo root
# - fetch + rebase on origin/main
# - install deps (mediapipe + camera_utils)
# - create V9 files (types + patent-engine + hook)
# - migrate VirtualMirror.jsx -> VirtualMirror.tsx (best-effort)
# - npm run build
# - SUPERCOMMIT (1 commit)
# - push (force-with-lease)
# =========================

REMOTE="${REMOTE:-origin}"
MAIN_BRANCH="${MAIN_BRANCH:-main}"
WORK_BRANCH="${WORK_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)}"
COMMIT_TITLE="${COMMIT_TITLE:-🚀 DEPLOY V9: MediaPipe + Luxury Overlay + Patent Engine}"
COMMIT_BODY="${COMMIT_BODY:-Upgrade TryOnYou to V9: MediaPipe pose pipeline, typed patent engine, centralized fit hook, TSX mirror, production build verified.}"

die(){ echo "❌ $*"; exit 1; }
info(){ echo "==> $*"; }

# --- Find repo root ---
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  die "No estás dentro de un repo git."
fi
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# --- Clean working tree ---
if [[ -n "$(git status --porcelain)" ]]; then
  die "Hay cambios sin commitear. Haz commit o stash antes.\n$(git status --porcelain)"
fi

git remote get-url "$REMOTE" >/dev/null 2>&1 || die "Remote '$REMOTE' no existe."

# --- Backup branch ---
BACKUP_BRANCH="${WORK_BRANCH}-backup-$(date +%Y%m%d-%H%M%S)"
info "Backup branch: $BACKUP_BRANCH"
git branch "$BACKUP_BRANCH"

# --- Sync main ---
info "Fetch latest"
git fetch "$REMOTE" --prune

info "Update local $MAIN_BRANCH (ff-only)"
git checkout "$MAIN_BRANCH"
git pull --ff-only "$REMOTE" "$MAIN_BRANCH"

# --- Rebase work branch on main ---
info "Checkout $WORK_BRANCH"
git checkout "$WORK_BRANCH"

info "Rebase on $REMOTE/$MAIN_BRANCH"
set +e
git rebase "$REMOTE/$MAIN_BRANCH"
REB=$?
set -e
if [[ $REB -ne 0 ]]; then
  die "Rebase con conflictos. Resuelve y luego: git rebase --continue (o --abort). Backup: $BACKUP_BRANCH"
fi

# --- Node + deps ---
command -v node >/dev/null 2>&1 || die "Node no está instalado."
command -v npm  >/dev/null 2>&1 || die "npm no está instalado."
NODEV="$(node -v || true)"
info "Node: $NODEV"

if [[ ! -f package.json ]]; then
  die "No hay package.json en la raíz del repo ($REPO_ROOT)."
fi

info "Install critical deps (mediapipe)"
npm install @mediapipe/pose @mediapipe/camera_utils

# --- Ensure TS config for react-jsx (best effort) ---
if [[ -f tsconfig.json ]]; then
  if ! grep -q '"jsx"[[:space:]]*:[[:space:]]*"react-jsx"' tsconfig.json; then
    info "tsconfig.json: setting jsx=react-jsx (best effort)"
    # naive patch: insert into compilerOptions if missing
    if grep -q '"compilerOptions"[[:space:]]*:[[:space:]]*{' tsconfig.json; then
      perl -0777 -i -pe 's/"compilerOptions"\s*:\s*\{/"compilerOptions": {\n    "jsx": "react-jsx",/s if $_ !~ /"jsx"\s*:/s' tsconfig.json
    fi
  fi
fi

# --- Create V9 files ---
mkdir -p src/types src/modules src/hooks src/components

info "Write src/types/divineo.d.ts"
cat > src/types/divineo.d.ts <<'EOF'
export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

export interface PoseResult {
  poseLandmarks: Landmark[][];
  worldLandmarks: Landmark[][];
}

export interface BiometricVectors {
  shoulderPx: number;
  chestPx: number;
  waistPx: number;
  hipPx: number;
  heightPx: number;
}

export interface FitResult {
  garmentId: string;
  score: number;
  status: 'PERFECT_FIT' | 'TIGHT_FIT' | 'LOOSE_FIT' | 'INCOMPATIBLE';
  strainMap: { chest: number; waist: number };
  productionReady: boolean;
}
EOF

info "Write src/modules/patent-engine.ts"
cat > src/modules/patent-engine.ts <<'EOF'
import type { BiometricVectors, FitResult } from '../types/divineo';

const FABRICS = {
  'EG-001': { elasticity: 0.15, drape: 0.9 }, // Robe Rouge (silk-ish)
  'EG-002': { elasticity: 0.05, drape: 0.3 }, // Trench (gabardine-ish)
} as const;

export function calculateFit(garmentId: string, vectors: BiometricVectors): FitResult {
  const fabric = (FABRICS as any)[garmentId] ?? FABRICS['EG-001'];

  const pixelToCm = 170 / Math.max(1, vectors.heightPx || 1);
  const chestCm = vectors.chestPx * pixelToCm;

  const garmentChest = 96; // base pattern chest (digital "M")
  const strain = (chestCm - garmentChest) / garmentChest;

  let score = 100;
  let status: FitResult['status'] = 'PERFECT_FIT';

  if (strain > fabric.elasticity) {
    score -= (strain - fabric.elasticity) * 400;
    status = 'TIGHT_FIT';
  } else if (strain < -0.15) {
    score -= Math.abs(strain) * 50;
    status = 'LOOSE_FIT';
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  if (score < 60) status = 'INCOMPATIBLE';

  return {
    garmentId,
    score,
    status,
    strainMap: { chest: strain, waist: 0 },
    productionReady: score > 85,
  };
}
EOF

info "Write src/hooks/useFitEngine.ts"
cat > src/hooks/useFitEngine.ts <<'EOF'
import { useState, useCallback, useRef } from 'react';
import type { BiometricVectors, FitResult } from '../types/divineo';
import { calculateFit } from '../modules/patent-engine';

export function useFitEngine() {
  const [result, setResult] = useState<FitResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const lastRun = useRef<number>(0);

  const processScan = useCallback((vectors: BiometricVectors, garmentId: string) => {
    const now = Date.now();
    if (now - lastRun.current < 500) return; // throttling 2 FPS
    lastRun.current = now;

    setIsCalculating(true);
    try {
      const fitData = calculateFit(garmentId, vectors);
      setResult(fitData);
    } catch (e) {
      console.error('Fit Engine Error:', e);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const fitColor = result?.score && result.score > 90 ? '#D3B26A' : '#EF4444';
  const fitText = result?.status === 'PERFECT_FIT' ? 'Ajuste Divino (99.7%)' : 'Ajustando...';

  return { processScan, result, isCalculating, fitColor, fitText };
}
EOF

# --- Migrate VirtualMirror ---
VM_JSX="src/components/VirtualMirror.jsx"
VM_TSX="src/components/VirtualMirror.tsx"

if [[ -f "$VM_JSX" && ! -f "$VM_TSX" ]]; then
  info "Migrate VirtualMirror.jsx -> VirtualMirror.tsx (replace with V9 implementation)"
  rm -f "$VM_JSX"
fi

info "Write src/components/VirtualMirror.tsx"
cat > src/components/VirtualMirror.tsx <<'EOF'
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { useFitEngine } from '../hooks/useFitEngine';
import type { BiometricVectors } from '../types/divineo';

export default function VirtualMirror() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { processScan, result, fitText, fitColor } = useFitEngine();
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results: any) => {
      if (!results?.poseLandmarks?.length) return;

      const landmarks = results.poseLandmarks;

      // MediaPipe Pose indices: 11 leftShoulder, 12 rightShoulder, 23 leftHip, 24 rightHip
      const ls = landmarks[11];
      const rs = landmarks[12];
      const lh = landmarks[23];
      const rh = landmarks[24];
      if (!ls || !rs || !lh || !rh) return;

      const W = 1280;
      const H = 720;

      const shoulderWidth = Math.abs(ls.x - rs.x) * W;
      const hipWidth = Math.abs(lh.x - rh.x) * W;
      const torsoHeight = Math.abs(ls.y - lh.y) * H;

      const vectors: BiometricVectors = {
        shoulderPx: shoulderWidth,
        chestPx: shoulderWidth * 0.95,
        waistPx: shoulderWidth * 0.75,
        hipPx: hipWidth,
        heightPx: Math.max(1, torsoHeight * 2.2),
      };

      processScan(vectors, 'EG-001');

      // (Optional) draw landmarks on canvas (kept minimal for stability)
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && webcamRef.current?.video) {
        ctx.clearRect(0, 0, W, H);
      }
    });

    const video = webcamRef.current?.video;
    if (!video) return;

    const cam = new Camera(video, {
      onFrame: async () => {
        if (webcamRef.current?.video) {
          await pose.send({ image: webcamRef.current.video });
        }
      },
      width: 1280,
      height: 720,
    });

    cam.start();
    setCameraActive(true);

    return () => {
      try { cam.stop(); } catch {}
    };
  }, [processScan]);

  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundColor: '#0b0b0b' }}>
      <Webcam
        ref={webcamRef}
        className="absolute inset-0 w-full h-full object-cover"
        mirrored
        audio={false}
        videoConstraints={{ facingMode: 'user' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        width={1280}
        height={720}
      />

      {/* Luxury Overlay V9 */}
      <div
        className="absolute bottom-10 left-10 p-6 rounded-2xl backdrop-blur-md"
        style={{
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(211,178,106,0.55)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          minWidth: 320,
        }}
      >
        <div style={{ color: '#D3B26A', fontWeight: 700, letterSpacing: 0.6 }}>DIVINEO • V9</div>
        <div style={{ color: 'rgba(255,255,255,0.85)', marginTop: 6, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: 12 }}>
          ESTADO: {cameraActive ? 'SCAN LIVE' : 'INIT...'}
        </div>

        {result && (
          <div style={{ marginTop: 10 }}>
            <div style={{ color: fitColor, fontSize: 18, fontWeight: 800 }}>{fitText}</div>
            <div style={{ color: 'rgba(255,255,255,0.9)', marginTop: 6, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: 12 }}>
              FIT SCORE: {result.score}/100
            </div>
            <div style={{ color: 'rgba(255,255,255,0.55)', marginTop: 4, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: 11 }}>
              STRAIN: {(result.strainMap.chest * 100).toFixed(2)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
EOF

# --- Build gate ---
info "Build check"
npm run build

# --- SUPERCOMMIT (one commit since origin/main) ---
info "Create SUPERCOMMIT"
BASE="$(git merge-base HEAD "$REMOTE/$MAIN_BRANCH")"
git reset --soft "$BASE"
git add -A
git commit -m "$COMMIT_TITLE" -m "$COMMIT_BODY"

info "Last commit:"
git --no-pager log -1 --oneline

# --- Push ---
info "Push work branch with --force-with-lease"
git push "$REMOTE" "$WORK_BRANCH" --force-with-lease

echo
echo "✅ V9 listo en rama: $WORK_BRANCH"
echo "✅ Backup por si acaso: $BACKUP_BRANCH"
echo "➡️ Siguiente: abrir PR $WORK_BRANCH -> $MAIN_BRANCH y desplegar en Vercel."
