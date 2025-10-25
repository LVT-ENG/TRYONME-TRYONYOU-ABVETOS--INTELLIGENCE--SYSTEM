#!/bin/bash

# TRYONYOU Deploy Express - INBOX Watcher
# Detecta archivos nuevos en INBOX y dispara el deploy automático

set -e

INBOX_DIR="TRYONYOU_DEPLOY_EXPRESS_INBOX"
PROCESSED_DIR="$INBOX_DIR/.processed"
LOG_FILE="logs/inbox-watcher.log"

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Crear directorios si no existen
mkdir -p "$PROCESSED_DIR"
mkdir -p logs

# Función de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Función para procesar archivo
process_file() {
    local file="$1"
    local filename=$(basename "$file")
    
    log "${GREEN}📂 Nuevo archivo detectado: $filename${NC}"
    
    # Extraer información del archivo
    local commit_msg="Deploy from INBOX: $filename"
    
    # Mover archivo a procesados
    mv "$file" "$PROCESSED_DIR/"
    log "✅ Archivo movido a procesados"
    
    # Crear commit con el cambio
    git add "$PROCESSED_DIR/$filename"
    git commit -m "$commit_msg" -m "Auto-deployed from INBOX watcher"
    
    log "${GREEN}🚀 Commit creado, iniciando push...${NC}"
    
    # Push para disparar el workflow
    git push origin main
    
    log "${GREEN}✅ Deploy disparado exitosamente${NC}"
    
    # Registrar en log de deploys
    echo "$(date '+%Y-%m-%d %H:%M:%S') | $filename | DEPLOYED" >> logs/deploy-history.log
}

# Función principal de watch
watch_inbox() {
    log "${YELLOW}👀 Iniciando monitoreo de INBOX...${NC}"
    
    while true; do
        # Buscar archivos nuevos (excluir .gitkeep y .processed)
        for file in "$INBOX_DIR"/*; do
            # Saltar si no es un archivo regular
            [ -f "$file" ] || continue
            
            # Saltar .gitkeep y archivos ocultos
            filename=$(basename "$file")
            [[ "$filename" == .* ]] && continue
            [[ "$filename" == "README.md" ]] && continue
            
            # Procesar el archivo
            process_file "$file"
            
            # Esperar un poco antes de continuar
            sleep 5
        done
        
        # Esperar antes de la próxima verificación
        sleep 10
    done
}

# Función para modo single-check (sin loop infinito)
check_once() {
    log "${YELLOW}🔍 Verificando INBOX una vez...${NC}"
    
    local files_found=0
    
    for file in "$INBOX_DIR"/*; do
        [ -f "$file" ] || continue
        
        filename=$(basename "$file")
        [[ "$filename" == .* ]] && continue
        [[ "$filename" == "README.md" ]] && continue
        
        process_file "$file"
        files_found=$((files_found + 1))
    done
    
    if [ $files_found -eq 0 ]; then
        log "ℹ️  No hay archivos nuevos en INBOX"
    else
        log "${GREEN}✅ Procesados $files_found archivo(s)${NC}"
    fi
}

# Main
case "${1:-watch}" in
    watch)
        watch_inbox
        ;;
    check)
        check_once
        ;;
    *)
        echo "Uso: $0 {watch|check}"
        echo "  watch - Monitoreo continuo (default)"
        echo "  check - Verificación única"
        exit 1
        ;;
esac

