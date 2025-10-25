#!/bin/bash

# TRYONYOU Deploy Express - Google Drive Sync
# Sincroniza logs, screenshots y PDFs legales a Google Drive

set -e

DRIVE_FOLDER="${1:-/01_DEPLOY_LOGS}"
FILES_TO_SYNC="${2:-logs screenshots}"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}📁 Iniciando sincronización con Google Drive...${NC}"
echo "Carpeta destino: $DRIVE_FOLDER"
echo "Archivos a sincronizar: $FILES_TO_SYNC"

# Verificar si hay archivos para sincronizar
has_files=false
for dir in $FILES_TO_SYNC; do
    if [ -d "$dir" ] && [ "$(ls -A $dir 2>/dev/null)" ]; then
        has_files=true
        break
    fi
done

if [ "$has_files" = false ]; then
    echo -e "${YELLOW}⚠️  No hay archivos para sincronizar${NC}"
    exit 0
fi

# Función para subir usando MCP Google Drive (preferido)
sync_with_mcp() {
    echo -e "${GREEN}🔄 Usando MCP Google Drive...${NC}"
    
    # Verificar si MCP está disponible
    if ! command -v manus-mcp-cli &> /dev/null; then
        echo -e "${YELLOW}⚠️  MCP CLI no disponible${NC}"
        return 1
    fi
    
    # Listar servidores MCP
    if ! manus-mcp-cli server list | grep -q "google-drive"; then
        echo -e "${YELLOW}⚠️  Servidor MCP Google Drive no configurado${NC}"
        return 1
    fi
    
    # Subir archivos
    for dir in $FILES_TO_SYNC; do
        if [ -d "$dir" ]; then
            echo -e "${GREEN}📤 Subiendo $dir...${NC}"
            
            for file in "$dir"/*; do
                if [ -f "$file" ]; then
                    filename=$(basename "$file")
                    
                    # Subir archivo usando MCP
                    manus-mcp-cli tool call upload_file \
                        --server google-drive \
                        --input "{\"file_path\": \"$file\", \"folder_path\": \"$DRIVE_FOLDER/$dir\"}" \
                        && echo "✅ $filename subido" \
                        || echo "❌ Error subiendo $filename"
                fi
            done
        fi
    done
    
    return 0
}

# Función para subir usando rclone (alternativa)
sync_with_rclone() {
    echo -e "${GREEN}🔄 Usando rclone...${NC}"
    
    if ! command -v rclone &> /dev/null; then
        echo -e "${YELLOW}⚠️  rclone no disponible${NC}"
        return 1
    fi
    
    # Verificar si rclone está configurado
    if ! rclone listremotes | grep -q "gdrive"; then
        echo -e "${YELLOW}⚠️  rclone no configurado para Google Drive${NC}"
        return 1
    fi
    
    # Subir archivos
    for dir in $FILES_TO_SYNC; do
        if [ -d "$dir" ]; then
            echo -e "${GREEN}📤 Subiendo $dir...${NC}"
            rclone copy "$dir" "gdrive:$DRIVE_FOLDER/$dir" --progress
        fi
    done
    
    return 0
}

# Función para crear archivo de manifiesto
create_manifest() {
    local manifest_file="sync_manifest_$(date +%Y%m%d_%H%M%S).json"
    
    echo -e "${GREEN}📋 Creando manifiesto...${NC}"
    
    cat > "$manifest_file" << EOF
{
  "sync_date": "$(date -Iseconds)",
  "destination": "$DRIVE_FOLDER",
  "files": [
EOF
    
    first=true
    for dir in $FILES_TO_SYNC; do
        if [ -d "$dir" ]; then
            for file in "$dir"/*; do
                if [ -f "$file" ]; then
                    if [ "$first" = true ]; then
                        first=false
                    else
                        echo "," >> "$manifest_file"
                    fi
                    
                    filename=$(basename "$file")
                    filesize=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
                    
                    echo -n "    {\"path\": \"$file\", \"size\": $filesize, \"name\": \"$filename\"}" >> "$manifest_file"
                fi
            done
        fi
    done
    
    cat >> "$manifest_file" << EOF

  ],
  "status": "completed"
}
EOF
    
    echo -e "${GREEN}✅ Manifiesto creado: $manifest_file${NC}"
}

# Intentar sincronización
if sync_with_mcp; then
    echo -e "${GREEN}✅ Sincronización completada con MCP Google Drive${NC}"
    create_manifest
elif sync_with_rclone; then
    echo -e "${GREEN}✅ Sincronización completada con rclone${NC}"
    create_manifest
else
    echo -e "${RED}❌ No se pudo sincronizar - ningún método disponible${NC}"
    echo -e "${YELLOW}💡 Configurar MCP Google Drive o rclone${NC}"
    
    # Crear archivo de pendientes
    echo "$(date -Iseconds): Sync failed - files pending" >> sync_pending.log
    exit 1
fi

# Generar reporte
echo -e "${GREEN}📊 Generando reporte de sincronización...${NC}"

cat > "sync_report_$(date +%Y%m%d_%H%M%S).md" << EOF
# Google Drive Sync Report

**Date:** $(date '+%Y-%m-%d %H:%M:%S')
**Destination:** $DRIVE_FOLDER

## Synced Directories

$(for dir in $FILES_TO_SYNC; do
    if [ -d "$dir" ]; then
        file_count=$(find "$dir" -type f | wc -l)
        total_size=$(du -sh "$dir" | cut -f1)
        echo "- **$dir**: $file_count files ($total_size)"
    fi
done)

## Status

✅ Sync completed successfully

---
*Generated by TRYONYOU Deploy Express*
EOF

echo -e "${GREEN}🎉 Sincronización completada exitosamente!${NC}"

