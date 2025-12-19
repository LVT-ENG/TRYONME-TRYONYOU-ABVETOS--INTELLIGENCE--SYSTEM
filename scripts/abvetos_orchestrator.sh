#!/bin/bash
# =====================================================
# 🤖 ABVETOS ORCHESTRATOR – MAIN CONTROLLER
# Orquestador principal del sistema ABVETOS
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# =====================================================

set -e

ROOT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
SCRIPTS_DIR="$ROOT/scripts"
LOG_DIR="$ROOT/logs"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🤖 ABVETOS ORCHESTRATOR – SISTEMA DE CONTROL       ║${NC}"
echo -e "${BLUE}║   TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Crear directorios necesarios
mkdir -p "$LOG_DIR"
mkdir -p "$SCRIPTS_DIR"

# Verificar que existan los scripts
if [ ! -f "$SCRIPTS_DIR/abvetos_fusion.sh" ]; then
  echo -e "${YELLOW}⚠️  Script de fusión no encontrado. Copiando...${NC}"
  cp "$(dirname "$0")/abvetos_fusion.sh" "$SCRIPTS_DIR/"
  chmod +x "$SCRIPTS_DIR/abvetos_fusion.sh"
fi

# Menú de opciones
echo -e "${GREEN}Selecciona una opción:${NC}"
echo ""
echo "1) 🔄 Ejecutar fusión automática (una vez)"
echo "2) 👁️  Activar watcher automático (monitoreo continuo)"
echo "3) 📊 Ver logs de fusión"
echo "4) 🧹 Limpiar logs antiguos"
echo "5) ❌ Salir"
echo ""
read -p "Opción: " option

case $option in
  1)
    echo -e "${BLUE}🔄 Ejecutando fusión automática...${NC}"
    bash "$SCRIPTS_DIR/abvetos_fusion.sh"
    ;;
  2)
    echo -e "${BLUE}👁️  Activando watcher automático...${NC}"
    echo -e "${YELLOW}El sistema monitoreará cambios cada 5 minutos${NC}"
    nohup bash "$SCRIPTS_DIR/abvetos_fusion.sh" >> "$LOG_DIR/fusion_autorun.log" 2>&1 &
    echo -e "${GREEN}✅ Watcher activado en segundo plano${NC}"
    echo -e "${BLUE}PID: $!${NC}"
    ;;
  3)
    echo -e "${BLUE}📊 Últimos logs de fusión:${NC}"
    echo ""
    tail -n 50 "$LOG_DIR"/orchestration_fusion_*.log 2>/dev/null || echo "No hay logs disponibles"
    ;;
  4)
    echo -e "${BLUE}🧹 Limpiando logs antiguos...${NC}"
    find "$LOG_DIR" -name "orchestration_fusion_*.log" -mtime +7 -delete
    echo -e "${GREEN}✅ Logs antiguos eliminados${NC}"
    ;;
  5)
    echo -e "${GREEN}👋 Saliendo...${NC}"
    exit 0
    ;;
  *)
    echo -e "${YELLOW}⚠️  Opción no válida${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}✅ Operación completada${NC}"

