#!/bin/bash
# ============================================================
#  ABVETOS – DEPLOY EXPRESS AUTOMATION
#  Detecta .zip en TRYONYOU_DEPLOY_EXPRESS_INBOX, los integra,
#  los publica en Vercel y notifica a Telegram.
# ============================================================

set -e

# Configuración de directorios
INBOX="$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"
WORKDIR="$HOME/TRYONYOU_DEPLOY_WORKSPACE"
LOGFILE="$INBOX/deploy_express_$(date +'%Y%m%d_%H%M').log"

# Configuración de tokens y rutas
REPO="LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
BRANCH="main"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"
VERCEL_TOKEN="${VERCEL_TOKEN:-}"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función de logging
log() {
    echo -e "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOGFILE"
}

# Función para enviar notificación a Telegram
send_telegram() {
    local message="$1"
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        log "${YELLOW}⚠️  Telegram credentials not configured - skipping notification${NC}"
        return 0
    fi
    
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="$TELEGRAM_CHAT_ID" \
        -d parse_mode=HTML \
        -d text="${message}" > /dev/null
    
    if [ $? -eq 0 ]; then
        log "${GREEN}✅ Telegram notification sent${NC}"
    else
        log "${RED}❌ Failed to send Telegram notification${NC}"
    fi
}

# Función para procesar un archivo ZIP
process_zip() {
    local ZIPFILE="$1"
    local FILENAME=$(basename "$ZIPFILE")
    
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${GREEN}📦 ZIP detectado: $FILENAME${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Crear directorio temporal para extracción
    local EXTRACT_DIR="$WORKDIR/_incoming"
    mkdir -p "$EXTRACT_DIR"
    
    # Descomprimir
    log "${YELLOW}🧩 Extrayendo archivos...${NC}"
    if unzip -o "$ZIPFILE" -d "$EXTRACT_DIR" >> "$LOGFILE" 2>&1; then
        log "${GREEN}✅ Archivos extraídos correctamente${NC}"
    else
        log "${RED}❌ Error al extraer archivos${NC}"
        return 1
    fi
    
    # Integrar con el repositorio maestro
    log "${YELLOW}🔄 Integrando con repositorio maestro...${NC}"
    
    # Clonar o actualizar el repositorio en WORKDIR si no existe
    if [ ! -d "$WORKDIR/.git" ]; then
        log "${YELLOW}📥 Clonando repositorio...${NC}"
        git clone "https://github.com/$REPO.git" "$WORKDIR" >> "$LOGFILE" 2>&1
        cd "$WORKDIR"
        git checkout "$BRANCH" >> "$LOGFILE" 2>&1
    else
        cd "$WORKDIR"
        git fetch origin "$BRANCH" >> "$LOGFILE" 2>&1
        git checkout "$BRANCH" >> "$LOGFILE" 2>&1
        git pull origin "$BRANCH" >> "$LOGFILE" 2>&1
    fi
    
    # Copiar archivos extraídos al repositorio
    log "${YELLOW}📋 Copiando archivos al repositorio...${NC}"
    rsync -av --exclude='.git' "$EXTRACT_DIR/" "$WORKDIR/" >> "$LOGFILE" 2>&1
    
    # Limpiar directorio temporal
    rm -rf "$EXTRACT_DIR"
    
    # Git operations
    log "${YELLOW}💾 Realizando commit...${NC}"
    git add . >> "$LOGFILE" 2>&1
    
    if git diff --staged --quiet; then
        log "${YELLOW}⚠️  No hay cambios para commitear${NC}"
    else
        git commit -m "🤖 ABVETOS Auto-Integration: $FILENAME $(date +'%Y-%m-%d %H:%M')" >> "$LOGFILE" 2>&1
        log "${GREEN}✅ Commit realizado${NC}"
        
        # Push a GitHub
        log "${YELLOW}🚀 Enviando a GitHub...${NC}"
        if git push origin "$BRANCH" >> "$LOGFILE" 2>&1; then
            log "${GREEN}✅ Push a GitHub exitoso${NC}"
        else
            log "${RED}❌ Error al hacer push a GitHub${NC}"
            return 1
        fi
    fi
    
    # Despliegue automático a Vercel
    log "${YELLOW}🚀 Ejecutando deploy a Vercel...${NC}"
    
    if [ -z "$VERCEL_TOKEN" ]; then
        log "${YELLOW}⚠️  VERCEL_TOKEN no configurado - usando Vercel CLI sin token${NC}"
    fi
    
    if command -v vercel &> /dev/null || command -v npx &> /dev/null; then
        if [ -n "$VERCEL_TOKEN" ]; then
            npx vercel --token "$VERCEL_TOKEN" --prod --yes >> "$LOGFILE" 2>&1
        else
            npx vercel --prod --yes >> "$LOGFILE" 2>&1
        fi
        
        if [ $? -eq 0 ]; then
            log "${GREEN}✅ Deploy a Vercel exitoso${NC}"
        else
            log "${RED}❌ Error en deploy a Vercel${NC}"
        fi
    else
        log "${YELLOW}⚠️  Vercel CLI no disponible - saltando deployment${NC}"
    fi
    
    # Notificación a Telegram
    local DEPLOY_URL="https://tryonyou.app"
    local TIMESTAMP=$(date +'%H:%M')
    local TELEGRAM_MSG="✅ <b>Integración completada</b>%0A%0A📦 <b>Archivo:</b> $FILENAME%0A🌐 <b>URL:</b> $DEPLOY_URL%0A🕓 <b>Hora:</b> $TIMESTAMP"
    
    send_telegram "$TELEGRAM_MSG"
    
    # Backup del ZIP original
    log "${YELLOW}💾 Creando backup...${NC}"
    mkdir -p "$INBOX/_backup"
    mv "$ZIPFILE" "$INBOX/_backup/"
    log "${GREEN}✅ Backup guardado y ZIP original movido${NC}"
    
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${GREEN}✅ Procesamiento completado exitosamente${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Crear directorios necesarios
mkdir -p "$INBOX"
mkdir -p "$WORKDIR"

log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
log "${GREEN}🟢 ABVETOS Orchestrator iniciado – $(date)${NC}"
log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
log "${YELLOW}📂 Monitoreando: $INBOX${NC}"
log "${YELLOW}🎯 Workspace: $WORKDIR${NC}"
log "${YELLOW}📋 Log: $LOGFILE${NC}"
log "${GREEN}✅ Sistema listo - Esperando archivos...${NC}"
echo ""

# Bucle continuo de vigilancia
while true; do
    ZIPFILE=$(find "$INBOX" -maxdepth 1 -name "*.zip" -type f | head -n 1)
    
    if [ -n "$ZIPFILE" ]; then
        process_zip "$ZIPFILE"
    fi
    
    # Esperar 30 segundos antes de la próxima verificación
    sleep 30
done
