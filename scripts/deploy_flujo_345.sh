#!/bin/bash
# ===========================================================
# FLUJO 345 - DEPLOY EXPRESS
# Script para mover TRYONYOU_FLOW_345.zip al inbox y notificar
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# ===========================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   📦 FLUJO 345 - DEPLOY EXPRESS                       ║${NC}"
echo -e "${CYAN}║   TRYONYOU – Sistema de Orquestación                  ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Determinar rutas
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INBOX_DIR="$PROJECT_ROOT/TRYONYOU_DEPLOY_EXPRESS_INBOX"
ZIP_FILE="TRYONYOU_FLOW_345.zip"
TIMESTAMP=$(date +%Y%m%d_%H%M)
LOG_FILE="$PROJECT_ROOT/logs/flujo_345_deploy_$TIMESTAMP.log"

# Crear directorio de logs si no existe
mkdir -p "$PROJECT_ROOT/logs"

# Función de logging
log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log "${YELLOW}📋 Iniciando despliegue de Flujo 345...${NC}"
log "${BLUE}   Directorio del proyecto: $PROJECT_ROOT${NC}"
log "${BLUE}   Inbox: $INBOX_DIR${NC}"
log ""

# 1️⃣ Buscar el archivo ZIP
log "${YELLOW}🔍 Buscando archivo $ZIP_FILE...${NC}"

ZIP_PATH=""

# Si se pasó una ruta como argumento, usarla primero
if [ -n "$1" ] && [ -f "$1" ]; then
    ZIP_PATH="$1"
    log "${BLUE}📂 Usando archivo especificado: $ZIP_PATH${NC}"
elif [ -f "$PROJECT_ROOT/$ZIP_FILE" ]; then
    ZIP_PATH="$PROJECT_ROOT/$ZIP_FILE"
    log "${GREEN}✅ Archivo encontrado en: $ZIP_PATH${NC}"
elif [ -f "$HOME/Desktop/$ZIP_FILE" ]; then
    ZIP_PATH="$HOME/Desktop/$ZIP_FILE"
    log "${GREEN}✅ Archivo encontrado en: $ZIP_PATH${NC}"
elif [ -f "$HOME/Downloads/$ZIP_FILE" ]; then
    ZIP_PATH="$HOME/Downloads/$ZIP_FILE"
    log "${GREEN}✅ Archivo encontrado en: $ZIP_PATH${NC}"
else
    log "${RED}❌ Error: No se encontró $ZIP_FILE${NC}"
    log "${YELLOW}   Buscado en:${NC}"
    log "${YELLOW}   - $PROJECT_ROOT/${NC}"
    log "${YELLOW}   - $HOME/Desktop/${NC}"
    log "${YELLOW}   - $HOME/Downloads/${NC}"
    log ""
    log "${BLUE}💡 Puedes especificar la ruta como argumento:${NC}"
    log "${BLUE}   $0 /ruta/al/$ZIP_FILE${NC}"
    exit 1
fi
log ""

# Verificar que el inbox existe
if [ ! -d "$INBOX_DIR" ]; then
    log "${YELLOW}⚠️  Inbox no existe, creándolo...${NC}"
    mkdir -p "$INBOX_DIR"
    log "${GREEN}✅ Inbox creado${NC}"
fi
log ""

# 2️⃣ Mover el ZIP al inbox
log "${YELLOW}📦 Moviendo archivo al inbox...${NC}"
if [ -f "$INBOX_DIR/$ZIP_FILE" ]; then
    log "${YELLOW}⚠️  El archivo ya existe en el inbox, creando backup...${NC}"
    mv "$INBOX_DIR/$ZIP_FILE" "$INBOX_DIR/${ZIP_FILE%.zip}_backup_$TIMESTAMP.zip"
    log "${GREEN}✅ Backup creado${NC}"
fi

mv "$ZIP_PATH" "$INBOX_DIR/"
log "${GREEN}✅ Archivo movido exitosamente${NC}"
log ""

# 3️⃣ Verificar que esté en la carpeta
log "${YELLOW}🔍 Verificando presencia del archivo en el inbox...${NC}"
FILE_SIZE=""
if [ -f "$INBOX_DIR/$ZIP_FILE" ]; then
    log "${GREEN}✅ Verificación exitosa: $ZIP_FILE está en el inbox${NC}"
    
    # Mostrar información del archivo
    FILE_SIZE=$(du -h "$INBOX_DIR/$ZIP_FILE" | cut -f1)
    log "${BLUE}   Tamaño: $FILE_SIZE${NC}"
    log ""
    
    # Listar contenido del inbox
    log "${BLUE}📂 Contenido del inbox:${NC}"
    ls -lh "$INBOX_DIR" | grep -v "^total" | grep -v "^d" | tee -a "$LOG_FILE"
else
    log "${RED}❌ Error: El archivo no se encuentra en el inbox${NC}"
    exit 1
fi
log ""

# 4️⃣ Notificar al orquestador
log "${YELLOW}📡 Notificando al orquestador...${NC}"

# Preparar mensaje para Telegram
MESSAGE="📦 Flujo 345 copiado al Deploy Express Inbox — listo para ejecución

🎯 Archivo: $ZIP_FILE
📦 Tamaño: $FILE_SIZE
📁 Ubicación: TRYONYOU_DEPLOY_EXPRESS_INBOX
⏰ Timestamp: $(date '+%Y-%m-%d %H:%M:%S')

✅ Listo para procesamiento automático"

# Intentar enviar notificación con el script de Telegram
if [ -f "$PROJECT_ROOT/scripts/notify_telegram.sh" ]; then
    bash "$PROJECT_ROOT/scripts/notify_telegram.sh" "$MESSAGE"
elif [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    # Intentar enviar directamente
    RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d chat_id="${TELEGRAM_CHAT_ID}" \
      -d parse_mode=HTML \
      -d text="$MESSAGE")
    
    if echo "$RESPONSE" | grep -q '"ok":true'; then
        log "${GREEN}✅ Notificación de Telegram enviada exitosamente${NC}"
    else
        log "${YELLOW}⚠️  No se pudo enviar la notificación de Telegram${NC}"
        log "${BLUE}   Response: $RESPONSE${NC}"
    fi
else
    log "${YELLOW}⚠️  Telegram no configurado, omitiendo notificación${NC}"
    log "${BLUE}   Para habilitar: configura TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID${NC}"
fi
log ""

# 5️⃣ Resumen final
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🎉 FLUJO 345 DESPLEGADO EXITOSAMENTE               ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
log "${GREEN}✅ Archivo: $ZIP_FILE${NC}"
log "${GREEN}✅ Ubicación: $INBOX_DIR${NC}"
log "${GREEN}✅ Tamaño: $FILE_SIZE${NC}"
log "${GREEN}✅ Estado: Listo para ejecución${NC}"
log ""
log "${BLUE}📄 Log completo: $LOG_FILE${NC}"
log ""
log "${YELLOW}🚀 El orquestador procesará el archivo automáticamente${NC}"
log "${BLUE}   Monitorea el progreso con: tail -f logs/inbox-watcher.log${NC}"
log ""

exit 0
