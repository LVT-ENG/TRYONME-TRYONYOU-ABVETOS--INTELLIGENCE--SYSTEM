#!/bin/bash
# =====================================================
# 🚀 ABVETOS AUTO DEPLOY EXPRESS
# Deploy rápido y directo a producción
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# =====================================================

set -e

ROOT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
MASTER="$HOME/TRYONYOU_MASTER"
LOG="$ROOT/logs/autodeploy_$(date +%Y%m%d_%H%M).log"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 ABVETOS AUTO DEPLOY EXPRESS${NC}" | tee -a "$LOG"
echo -e "${BLUE}================================${NC}" | tee -a "$LOG"
echo ""

# Verificar que existe el directorio master
if [ ! -d "$MASTER" ]; then
  echo -e "${RED}❌ Directorio MASTER no encontrado: $MASTER${NC}" | tee -a "$LOG"
  exit 1
fi

cd "$MASTER"

# 1️⃣ Verificar cambios
echo -e "${YELLOW}📝 Verificando cambios...${NC}" | tee -a "$LOG"
if [ -d ".git" ]; then
  git status --short | tee -a "$LOG"
else
  echo -e "${YELLOW}⚠️  No es un repositorio Git${NC}" | tee -a "$LOG"
fi

# 2️⃣ Build
echo -e "${YELLOW}🔨 Compilando proyecto...${NC}" | tee -a "$LOG"
if npm run build >> "$LOG" 2>&1; then
  echo -e "${GREEN}✅ Build completado${NC}" | tee -a "$LOG"
else
  echo -e "${RED}❌ Error en el build${NC}" | tee -a "$LOG"
  exit 1
fi

# 3️⃣ Deploy a Vercel
echo -e "${YELLOW}🚀 Desplegando a Vercel...${NC}" | tee -a "$LOG"

# Cargar token
if [ -f "$ROOT/.env" ]; then
  source "$ROOT/.env"
fi

if [ -z "$VERCEL_TOKEN" ] && [ -f "$ROOT/.vercel_token" ]; then
  VERCEL_TOKEN=$(cat "$ROOT/.vercel_token")
fi

if [ -n "$VERCEL_TOKEN" ]; then
  DEPLOY_URL=$(npx vercel deploy --prod --yes --token "$VERCEL_TOKEN" 2>&1 | tee -a "$LOG" | tail -n1)
  echo -e "${GREEN}✅ Deploy completado${NC}" | tee -a "$LOG"
  echo -e "${BLUE}🌍 URL: $DEPLOY_URL${NC}" | tee -a "$LOG"
else
  echo -e "${RED}❌ VERCEL_TOKEN no encontrado${NC}" | tee -a "$LOG"
  exit 1
fi

# 4️⃣ Commit y Push
echo -e "${YELLOW}📝 Guardando cambios en Git...${NC}" | tee -a "$LOG"
if [ -d ".git" ]; then
  git add . >> "$LOG" 2>&1 || true
  git commit -m "🚀 Auto Deploy Express [$(date '+%Y-%m-%d %H:%M:%S')]" >> "$LOG" 2>&1 || true
  git push origin main >> "$LOG" 2>&1 || {
    echo -e "${YELLOW}⚠️  No se pudo hacer push${NC}" | tee -a "$LOG"
  }
fi

# 5️⃣ Notificación
if [[ -f "$ROOT/.telegram_bot_token" && -f "$ROOT/.telegram_chat_id" ]]; then
  TOKEN=$(cat "$ROOT/.telegram_bot_token")
  CHAT=$(cat "$ROOT/.telegram_chat_id")
  MSG="🚀 <b>AUTO DEPLOY EXPRESS</b>%0A%0A✅ Deploy completado%0A🌍 URL: $DEPLOY_URL%0A⏰ $(date '+%Y-%m-%d %H:%M:%S')%0A%0A<i>TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</i>"
  
  curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" \
    -d chat_id="$CHAT" \
    -d parse_mode="HTML" \
    -d text="$MSG" >> "$LOG" 2>&1
fi

echo ""
echo -e "${GREEN}✅ AUTO DEPLOY EXPRESS COMPLETADO${NC}"
echo -e "${BLUE}📄 Log: $LOG${NC}"
echo ""

