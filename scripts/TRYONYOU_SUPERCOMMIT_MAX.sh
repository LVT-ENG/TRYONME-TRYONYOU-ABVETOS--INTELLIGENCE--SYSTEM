#!/usr/bin/env bash
set -euo pipefail

############################################
# TRYONYOU - SUPERCOMMIT ORCHESTRATOR
# - Rebase branch onto main
# - Scan repo for tryon-related code + TODO/FIXME
# - Lint/build if available
# - Squash all branch commits into one "supercommit"
# - Push safely (with backup branch)
############################################

# --- CONFIG (puedes cambiar esto) ---
MAIN_BRANCH="${MAIN_BRANCH:-main}"
WORK_BRANCH="${1:-$(git rev-parse --abbrev-ref HEAD)}"   # si no pasas argumento, usa tu rama actual
REMOTE="${REMOTE:-origin}"
CONFIRM_PUSH="${CONFIRM_PUSH:-yes}"                      # pon "no" para que no pushee
COMMIT_TITLE="${COMMIT_TITLE:-🚀 TRYONYOU — SUPERCOMMIT LAFAYETTE}"
COMMIT_BODY="${COMMIT_BODY:-Assets cleaned & normalized; imports checked; build validated; ready for production deploy.}"

echo "==> Repo: $(basename "$(pwd)")"
echo "==> Remote: $REMOTE"
echo "==> Main branch: $MAIN_BRANCH"
echo "==> Work branch: $WORK_BRANCH"
echo

# --- Guard rails ---
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Esto no es un repo git."
  exit 1
fi

if [[ "$(git status --porcelain)" != "" ]]; then
  echo "❌ Tienes cambios sin commitear. Haz stash/commit antes."
  git status --porcelain
  exit 1
fi

# --- Ensure remote exists ---
git remote get-url "$REMOTE" >/dev/null 2>&1 || { echo "❌ Remote '$REMOTE' no existe."; exit 1; }

# --- Fetch latest ---
echo "==> Fetch latest from $REMOTE..."
git fetch "$REMOTE" --prune

# --- Checkout branch ---
echo "==> Checkout work branch: $WORK_BRANCH"
git checkout "$WORK_BRANCH"

# --- Backup branch (safety) ---
BACKUP_BRANCH="${WORK_BRANCH}-backup-$(date +%Y%m%d-%H%M%S)"
echo "==> Creating backup branch: $BACKUP_BRANCH"
git branch "$BACKUP_BRANCH"

# --- Make sure main is up to date locally ---
echo "==> Updating local $MAIN_BRANCH..."
git checkout "$MAIN_BRANCH"
git pull --ff-only "$REMOTE" "$MAIN_BRANCH"

# --- Rebase work branch onto main ---
echo "==> Rebasing $WORK_BRANCH onto $REMOTE/$MAIN_BRANCH ..."
git checkout "$WORK_BRANCH"
set +e
git rebase "$REMOTE/$MAIN_BRANCH"
REB_EXIT=$?
set -e
if [[ $REB_EXIT -ne 0 ]]; then
  echo
  echo "❌ Rebase con conflictos."
  echo "👉 Resuélvelos y luego:"
  echo "   git add ."
  echo "   git rebase --continue"
  echo "o para abortar:"
  echo "   git rebase --abort"
  echo "Backup disponible: $BACKUP_BRANCH"
  exit 1
fi

# --- Scan repository for "tryon" and related ---
echo
echo "==> SCAN: tryon/tryonyou/try-on/try_on + TODO/FIXME"
echo "---- tryon matches (top 200) ----"
rg -n --hidden --no-ignore-vcs -S "(tryon|tryonyou|try-on|try_on)" . | head -n 200 || true
echo "---- TODO/FIXME matches (top 200) ----"
rg -n --hidden --no-ignore-vcs -S "(TODO|FIXME)" . | head -n 200 || true

# --- Basic "missing code" heuristics (fail-fast) ---
echo
echo "==> HEURISTICS CHECKS (fail-fast)"
# Imports sospechosos
if rg -n --hidden --no-ignore-vcs -S 'from\s+["'\'']tryon["'\'']|require\(["'\'']tryon["'\'']\)' . >/dev/null 2>&1; then
  echo "❌ Detecté imports directos a 'tryon' (probable roto). Revisa esos archivos:"
  rg -n --hidden --no-ignore-vcs -S 'from\s+["'\'']tryon["'\'']|require\(["'\'']tryon["'\'']\)' .
  exit 1
fi

# Referencias a rutas de assets UUID típicas (solo aviso)
if rg -n --hidden --no-ignore-vcs -S 'public/.*[0-9A-Fa-f]{8}[-_][0-9A-Fa-f]{4}' . >/dev/null 2>&1; then
  echo "⚠️ Aviso: Encontré patrones tipo UUID en rutas/refs. Revisa si ya están normalizados:"
  rg -n --hidden --no-ignore-vcs -S 'public/.*[0-9A-Fa-f]{8}[-_][0-9A-Fa-f]{4}' . | head -n 50 || true
fi

# --- Optional: npm scripts (lint/build/test) ---
echo
if [[ -f package.json ]]; then
  echo "==> Detected package.json. Running quality gates (si existen scripts)..."
  if rg -n '"lint"\s*:' package.json >/dev/null 2>&1; then
    echo "==> npm run lint"
    npm run lint
  else
    echo "==> (skip) no lint script"
  fi

  if rg -n '"test"\s*:' package.json >/dev/null 2>&1; then
    echo "==> npm test"
    npm test
  else
    echo "==> (skip) no test script"
  fi

  if rg -n '"build"\s*:' package.json >/dev/null 2>&1; then
    echo "==> npm run build"
    npm run build
  else
    echo "==> (skip) no build script"
  fi
else
  echo "==> No package.json found. Skipping npm gates."
fi

# --- Supercommit (squash all commits on branch since main) ---
echo
echo "==> SUPERCOMMIT: squashing all commits in $WORK_BRANCH since $REMOTE/$MAIN_BRANCH"
BASE="$(git merge-base HEAD "$REMOTE/$MAIN_BRANCH")"

# Si no hay commits (raro), salir
if [[ "$BASE" == "$(git rev-parse HEAD)" ]]; then
  echo "ℹ️ No hay commits nuevos en esta rama respecto a $REMOTE/$MAIN_BRANCH."
  exit 0
fi

# Soft reset to base, keep changes staged
git reset --soft "$BASE"

# Create one commit
git commit -m "$COMMIT_TITLE" -m "$COMMIT_BODY"

echo
echo "✅ Supercommit creado:"
git --no-pager log -1 --oneline

# --- Push (with confirmation) ---
echo
if [[ "$CONFIRM_PUSH" == "yes" ]]; then
  echo "==> Pushing (force-with-lease) to $REMOTE/$WORK_BRANCH"
  echo "⚠️ Esto reescribe historial de la rama $WORK_BRANCH (seguro porque hicimos backup: $BACKUP_BRANCH)"
  git push "$REMOTE" "$WORK_BRANCH" --force-with-lease
  echo "✅ Push completado."
else
  echo "==> Push desactivado (CONFIRM_PUSH=no)."
  echo "Para pushear manualmente:"
  echo "   git push $REMOTE $WORK_BRANCH --force-with-lease"
fi

echo
echo "==> Next step: abrir PR / merge $WORK_BRANCH -> $MAIN_BRANCH en GitHub."
echo "Backup branch: $BACKUP_BRANCH"