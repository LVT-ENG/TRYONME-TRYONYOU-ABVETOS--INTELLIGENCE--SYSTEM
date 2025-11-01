#!/usr/bin/env bash
# ============================================================
#  ABVETOS – DEPLOY EXPRESS AUTOMATION
#  Detecta .zip en TRYONYOU_DEPLOY_EXPRESS_INBOX, los integra,
#  los publica en Vercel y notifica a Telegram.
# ============================================================

set -e

# Configuración de rutas
INBOX="${INBOX:-$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX}"
WORKDIR="${WORKDIR:-$HOME/TRYONYOU_DEPLOY_WORKSPACE}"
LOGFILE="$INBOX/deploy_express_$(date +'%Y%m%d_%H%M').log"

# Configuración de tokens y rutas
REPO="${REPO:-LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM}"
BRANCH="${BRANCH:-main}"
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

# Función para enviar notificaciones a Telegram
send_telegram_notification() {
    local message="$1"
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        log "${YELLOW}⚠️  Telegram credentials not configured - skipping notification${NC}"
        return 0
    fi
    
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d chat_id="$TELEGRAM_CHAT_ID" \
      -d parse_mode=HTML \
      -d text="${message}" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        log "${GREEN}✅ Telegram notification sent${NC}"
    else
        log "${YELLOW}⚠️  Failed to send Telegram notification${NC}"
    fi
}

# Función para procesar un archivo ZIP
process_zip() {
    local ZIPFILE="$1"
    local ZIPNAME=$(basename "$ZIPFILE")
    
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${GREEN}📦 ZIP detectado: $ZIPNAME${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Crear carpeta temporal de extracción
    local EXTRACT_DIR="$WORKDIR/_incoming"
    mkdir -p "$EXTRACT_DIR"
    
    # Descomprimir
    log "${YELLOW}🔄 Extrayendo archivos...${NC}"
    if unzip -o "$ZIPFILE" -d "$EXTRACT_DIR" >> "$LOGFILE" 2>&1; then
        log "${GREEN}✅ Archivos extraídos correctamente${NC}"
    else
        log "${RED}❌ Error al extraer archivos${NC}"
        return 1
    fi
    
    # Verificar si estamos en un repositorio git
    if [ ! -d "$WORKDIR/.git" ]; then
        log "${YELLOW}🔄 Inicializando repositorio git...${NC}"
        cd "$WORKDIR" || exit 1
        git init
        
        # Check if remote already exists before adding
        if ! git remote get-url origin > /dev/null 2>&1; then
            git remote add origin "https://github.com/$REPO.git"
            log "${GREEN}✅ Remote origin añadido${NC}"
        fi
        
        # Fetch from remote
        if git fetch origin "$BRANCH"; then
            log "${GREEN}✅ Fetch exitoso${NC}"
            git checkout "$BRANCH" || {
                log "${YELLOW}⚠️  Branch $BRANCH no existe localmente, creando...${NC}"
                git checkout -b "$BRANCH" origin/"$BRANCH"
            }
        else
            log "${YELLOW}⚠️  No se pudo hacer fetch, creando branch local${NC}"
            git checkout -b "$BRANCH"
        fi
    fi
    
    # Copiar archivos al workspace
    log "${YELLOW}🔄 Integrando archivos al repositorio...${NC}"
    if [ -d "$EXTRACT_DIR" ] && [ "$(ls -A $EXTRACT_DIR)" ]; then
        if cp -r "$EXTRACT_DIR/"* "$WORKDIR/" 2>/dev/null; then
            log "${GREEN}✅ Archivos integrados${NC}"
        else
            log "${YELLOW}⚠️  Algunos archivos no pudieron copiarse${NC}"
        fi
    else
        log "${YELLOW}⚠️  No hay archivos para integrar${NC}"
    fi
    
    # Limpiar carpeta temporal
    rm -rf "$EXTRACT_DIR"
    
    # Git operations
    cd "$WORKDIR" || exit 1
    
    log "${YELLOW}🔄 Realizando commit...${NC}"
    git add .
    
    if git commit -m "🤖 ABVETOS Auto-Integration: $ZIPNAME $(date +'%Y-%m-%d %H:%M')" >> "$LOGFILE" 2>&1; then
        log "${GREEN}✅ Commit realizado exitosamente${NC}"
    else
        log "${YELLOW}⚠️  No hay cambios para commitear${NC}"
    fi
    
    log "${YELLOW}🔄 Enviando a GitHub...${NC}"
    if git push origin "$BRANCH" >> "$LOGFILE" 2>&1; then
        log "${GREEN}✅ Push exitoso a GitHub${NC}"
    else
        log "${RED}❌ Error al hacer push${NC}"
        log "${YELLOW}⚠️  Verifica las credenciales de git${NC}"
    fi
    
    # Despliegue automático a Vercel
    if command -v vercel &> /dev/null || command -v npx &> /dev/null; then
        log "${YELLOW}🚀 Ejecutando deploy a Vercel...${NC}"
        
        if [ -n "$VERCEL_TOKEN" ]; then
            if npx vercel --token "$VERCEL_TOKEN" --prod --yes >> "$LOGFILE" 2>&1; then
                log "${GREEN}✅ Deploy a Vercel exitoso${NC}"
            else
                log "${YELLOW}⚠️  Deploy a Vercel falló o ya estaba actualizado${NC}"
            fi
        else
            log "${YELLOW}⚠️  VERCEL_TOKEN no configurado - skipping deploy${NC}"
        fi
    else
        log "${YELLOW}⚠️  Vercel CLI no disponible - skipping deploy${NC}"
    fi
    
    # Notificación a Telegram
    local deploy_url="https://tryonyou.app"
    local notification_message="✅ <b>ABVETOS Auto-Integration</b>%0A%0A📦 <b>File:</b> ${ZIPNAME}%0A🌐 <b>URL:</b> ${deploy_url}%0A🕓 <b>Time:</b> $(date +'%H:%M')"
    send_telegram_notification "$notification_message"
    
    # Backup del ZIP original
    log "${YELLOW}🔄 Creando backup...${NC}"
    mkdir -p "$INBOX/_backup"
    if mv "$ZIPFILE" "$INBOX/_backup/"; then
        log "${GREEN}💾 Backup guardado y ZIP original movido${NC}"
    else
        log "${RED}❌ Error al mover archivo a backup${NC}"
    fi
    
    log "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${GREEN}✅ Procesamiento completado para: $ZIPNAME${NC}"
    log "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Verificar prerequisitos
check_prerequisites() {
    log "${BLUE}🔍 Verificando prerequisitos...${NC}"
    
    # Verificar unzip
    if ! command -v unzip &> /dev/null; then
        log "${RED}❌ unzip no está instalado${NC}"
        log "${YELLOW}Instálalo con: sudo apt-get install unzip${NC}"
        exit 1
    fi
    
    # Verificar git
    if ! command -v git &> /dev/null; then
        log "${RED}❌ git no está instalado${NC}"
        exit 1
    fi
    
    # Crear directorios necesarios
    mkdir -p "$INBOX"
    mkdir -p "$WORKDIR"
    
    log "${GREEN}✅ Prerequisitos verificados${NC}"
    echo ""
}

# Main
main() {
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${GREEN}🦚 ABVETOS Orchestrator iniciado – $(date)${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${YELLOW}📂 INBOX: ${INBOX}${NC}"
    log "${YELLOW}🎯 WORKDIR: ${WORKDIR}${NC}"
    log "${YELLOW}📝 LOGFILE: ${LOGFILE}${NC}"
    echo ""
    
    check_prerequisites
    
    log "${GREEN}✅ Sistema listo - Esperando archivos...${NC}"
    echo ""
    
    # Bucle continuo de vigilancia
    while true; do
        # Find ZIP files and sort by modification time (oldest first)
        # This ensures deterministic processing order
        ZIPFILE=$(find "$INBOX" -maxdepth 1 -name "*.zip" -type f -printf '%T@ %p\n' | sort -n | head -n 1 | cut -d' ' -f2-)
        
        if [ -n "$ZIPFILE" ]; then
            # Create a lock file to prevent race conditions
            LOCKFILE="$INBOX/.processing.lock"
            if mkdir "$LOCKFILE" 2>/dev/null; then
                process_zip "$ZIPFILE"
                rmdir "$LOCKFILE" 2>/dev/null || true
            else
                log "${YELLOW}⚠️  Otro proceso está procesando archivos, esperando...${NC}"
            fi
        fi
        
        # Esperar 30 segundos antes de la próxima verificación
        sleep 30
    done
}

# Manejo de señales para terminar limpiamente
trap 'log "${YELLOW}🛑 Señal de terminación recibida. Saliendo...${NC}"; exit 0' SIGINT SIGTERM

# Ejecutar main
main
