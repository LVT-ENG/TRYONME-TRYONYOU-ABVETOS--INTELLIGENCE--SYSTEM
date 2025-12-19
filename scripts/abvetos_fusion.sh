#!/bin/bash
# =====================================================
# 🤖 ABVETOS ORCHESTRATOR – AUTO MERGE SYSTEM
# Integración y despliegue automático de módulos
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# =====================================================

set -e

# Configuración de rutas
ROOT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
MASTER="$HOME/TRYONYOU_MASTER"
TMP="$ROOT/_fusion_tmp"
LOG="$ROOT/orchestration_fusion_$(date +%Y%m%d_%H%M).log"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔁 [$(date +%H:%M:%S)] Iniciando fusión automática de proyectos...${NC}" | tee -a "$LOG"
mkdir -p "$TMP"
mkdir -p "$MASTER"

# 1️⃣ Detectar subproyectos de valor
echo -e "${YELLOW}📂 Detectando subproyectos...${NC}" | tee -a "$LOG"
find "$ROOT" -maxdepth 2 -type d \( -iname "*manus*" -o -iname "*dashboard*" -o -iname "*legal*" -o -iname "*visual*" -o -iname "*hero*" \) > "$TMP/projects.txt"

# Mostrar proyectos detectados
echo -e "${BLUE}Proyectos detectados:${NC}" | tee -a "$LOG"
cat "$TMP/projects.txt" | tee -a "$LOG"

# 2️⃣ Fusionar archivos (mantiene los más recientes)
echo -e "${YELLOW}🔄 Fusionando archivos...${NC}" | tee -a "$LOG"
while read -r dir; do
  if [ -d "$dir" ]; then
    echo -e "${GREEN}📂 Integrando: $dir${NC}" | tee -a "$LOG"
    rsync -av --ignore-existing --exclude=node_modules --exclude=.git --exclude=dist --exclude=build "$dir/" "$MASTER/" >> "$LOG" 2>&1
  fi
done < "$TMP/projects.txt"

# 3️⃣ Limpieza
echo -e "${YELLOW}🧹 Limpiando archivos temporales...${NC}" | tee -a "$LOG"
find "$MASTER" -type f -name "*.DS_Store" -delete 2>/dev/null || true
find "$MASTER" -type f -name ".gitignore" -delete 2>/dev/null || true
echo -e "${GREEN}✅ Limpieza completada.${NC}" | tee -a "$LOG"

# 4️⃣ Verificar si existe package.json
if [ ! -f "$MASTER/package.json" ]; then
  echo -e "${RED}⚠️  No se encontró package.json en $MASTER${NC}" | tee -a "$LOG"
  echo -e "${YELLOW}Creando package.json básico...${NC}" | tee -a "$LOG"
  cat > "$MASTER/package.json" << 'EOF'
{
  "name": "tryonyou-master",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^7.1.2"
  }
}
EOF
fi

# 5️⃣ Compilación y Build
echo -e "${YELLOW}🔨 Instalando dependencias y compilando...${NC}" | tee -a "$LOG"
cd "$MASTER"

# Instalar dependencias
if [ -f "package.json" ]; then
  npm install --legacy-peer-deps >> "$LOG" 2>&1 || {
    echo -e "${RED}❌ Error al instalar dependencias${NC}" | tee -a "$LOG"
    exit 1
  }
fi

# Build
if npm run build >> "$LOG" 2>&1; then
  echo -e "${GREEN}✅ Build completado exitosamente${NC}" | tee -a "$LOG"
else
  echo -e "${RED}❌ Error en el build${NC}" | tee -a "$LOG"
  exit 1
fi

# 6️⃣ Deploy a Vercel
echo -e "${YELLOW}🚀 Desplegando a Vercel...${NC}" | tee -a "$LOG"

# Cargar variables de entorno
if [ -f "$ROOT/.env" ]; then
  source "$ROOT/.env"
fi

# Verificar token de Vercel
if [ -z "$VERCEL_TOKEN" ]; then
  echo -e "${RED}⚠️  VERCEL_TOKEN no encontrado${NC}" | tee -a "$LOG"
  echo -e "${YELLOW}Buscando en archivo .vercel_token...${NC}" | tee -a "$LOG"
  if [ -f "$ROOT/.vercel_token" ]; then
    VERCEL_TOKEN=$(cat "$ROOT/.vercel_token")
  fi
fi

# Deploy
if [ -n "$VERCEL_TOKEN" ]; then
  DEPLOY_URL=$(npx vercel deploy --prod --yes --token "$VERCEL_TOKEN" 2>&1 | tee -a "$LOG" | tail -n1)
  echo -e "${GREEN}✅ Deploy completado: $DEPLOY_URL${NC}" | tee -a "$LOG"
else
  echo -e "${YELLOW}⚠️  No se pudo hacer deploy automático a Vercel (falta token)${NC}" | tee -a "$LOG"
  DEPLOY_URL="https://tryonyou.app"
fi

# 7️⃣ Commit a Git
echo -e "${YELLOW}📝 Creando commit en Git...${NC}" | tee -a "$LOG"
cd "$MASTER"

if [ -d ".git" ]; then
  git add . >> "$LOG" 2>&1 || true
  git commit -m "🤖 Auto Fusion Commit by Manus [$(date '+%H:%M:%S')]" >> "$LOG" 2>&1 || true
  git push origin main >> "$LOG" 2>&1 || {
    echo -e "${YELLOW}⚠️  No se pudo hacer push a GitHub (verifica credenciales)${NC}" | tee -a "$LOG"
  }
else
  echo -e "${YELLOW}⚠️  No es un repositorio Git${NC}" | tee -a "$LOG"
fi

# 8️⃣ Notificación a Telegram
echo -e "${YELLOW}📱 Enviando notificación a Telegram...${NC}" | tee -a "$LOG"

if [[ -f "$ROOT/.telegram_bot_token" && -f "$ROOT/.telegram_chat_id" ]]; then
  TOKEN=$(cat "$ROOT/.telegram_bot_token")
  CHAT=$(cat "$ROOT/.telegram_chat_id")
  MSG="✅ ABVETOS AUTO FUSION completada%0A%0A🚀 Deploy: $DEPLOY_URL%0A⏰ Hora: $(date '+%H:%M:%S')%0A📦 Commit: Auto Fusion by Manus%0A%0ATRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM"
  
  curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" \
    -d chat_id="$CHAT" \
    -d parse_mode="HTML" \
    -d text="$MSG" >> "$LOG" 2>&1
  
  echo -e "${GREEN}✅ Notificación enviada${NC}" | tee -a "$LOG"
else
  echo -e "${YELLOW}⚠️  No se encontraron credenciales de Telegram${NC}" | tee -a "$LOG"
fi

# 9️⃣ Limpieza final
rm -rf "$TMP"

echo -e "${GREEN}✅ Fusión total completada.${NC}" | tee -a "$LOG"
echo -e "${BLUE}📄 Revisa logs en: $LOG${NC}"
echo ""
echo -e "${GREEN}🎉 TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM${NC}"
echo -e "${GREEN}   Sistema de fusión automática ejecutado exitosamente${NC}"
echo ""

