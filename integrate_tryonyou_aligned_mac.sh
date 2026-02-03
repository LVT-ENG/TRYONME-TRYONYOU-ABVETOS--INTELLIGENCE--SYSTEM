#!/bin/bash

# ============================================================================
# TRYONYOU ALIGNED MAC - Integration Script
# Mac-specific integration and alignment workflow
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display help
show_help() {
    echo "============================================================================"
    echo "TRYONYOU ALIGNED MAC - Integration Script"
    echo "============================================================================"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  ejecuta    Execute the full integration workflow"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 ejecuta"
    echo ""
    exit 0
}

# Function to check Mac environment
check_mac_environment() {
    echo -e "${BLUE}🍎 PASO 1: Verificación de Entorno Mac${NC}"
    
    # Check if running on macOS
    if [[ "$OSTYPE" != "darwin"* ]]; then
        echo -e "${YELLOW}⚠️  Advertencia: Este script está optimizado para macOS${NC}"
    else
        echo -e "${GREEN}✅ Sistema operativo: macOS detectado${NC}"
    fi
    
    # Check for Homebrew
    if command -v brew &> /dev/null; then
        echo -e "${GREEN}✅ Homebrew instalado: $(brew --version | head -n1)${NC}"
    else
        echo -e "${YELLOW}⚠️  Homebrew no encontrado (opcional)${NC}"
    fi
    
    # Check for Node.js
    if command -v node &> /dev/null; then
        echo -e "${GREEN}✅ Node.js instalado: $(node --version)${NC}"
    else
        echo -e "${RED}❌ Node.js no encontrado - requerido${NC}"
        exit 1
    fi
    
    # Check for npm
    if command -v npm &> /dev/null; then
        echo -e "${GREEN}✅ npm instalado: $(npm --version)${NC}"
    else
        echo -e "${RED}❌ npm no encontrado - requerido${NC}"
        exit 1
    fi
    
    # Check for Git
    if command -v git &> /dev/null; then
        echo -e "${GREEN}✅ Git instalado: $(git --version)${NC}"
    else
        echo -e "${RED}❌ Git no encontrado - requerido${NC}"
        exit 1
    fi
    
    # Check for Python
    if command -v python3 &> /dev/null; then
        echo -e "${GREEN}✅ Python instalado: $(python3 --version)${NC}"
    else
        echo -e "${YELLOW}⚠️  Python3 no encontrado (opcional)${NC}"
    fi
}

# Function to verify repository structure
verify_repository() {
    echo ""
    echo -e "${BLUE}📁 PASO 2: Verificación de Estructura del Repositorio${NC}"
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}❌ No se detectó un repositorio Git${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Repositorio Git detectado${NC}"
    
    # Check for essential files
    local essential_files=("package.json" "vite.config.js" "index.html")
    for file in "${essential_files[@]}"; do
        if [ -f "$file" ]; then
            echo -e "${GREEN}✅ Archivo encontrado: $file${NC}"
        else
            echo -e "${YELLOW}⚠️  Archivo no encontrado: $file${NC}"
        fi
    done
    
    # Check for essential directories
    local essential_dirs=("src" "public")
    for dir in "${essential_dirs[@]}"; do
        if [ -d "$dir" ]; then
            echo -e "${GREEN}✅ Directorio encontrado: $dir${NC}"
        else
            echo -e "${YELLOW}⚠️  Directorio no encontrado: $dir${NC}"
        fi
    done
}

# Function to run safety lint
run_safety_lint() {
    echo ""
    echo -e "${BLUE}🛡️  PASO 3: Safety Lint (Zero Tallas Protocol)${NC}"
    
    if [ -d "src/" ]; then
        # Search for prohibited terms but exclude comments and API parameters
        # This filters out lines that are comments or contain API URL parameters
        local violations=$(grep -rE "peso|talla|weight|size" src/ 2>/dev/null | \
            grep -v "//.*size" | \
            grep -v "api.*size=" | \
            grep -v "TODO.*size" || true)
        
        if [ -n "$violations" ]; then
            echo -e "${RED}❌ ERROR CRÍTICO: Se detectaron términos prohibidos (peso, talla, weight, size) en src/${NC}"
            echo "$violations"
            exit 1
        else
            echo -e "${GREEN}✅ Safety Lint Aprobado: Sin términos prohibidos${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Directorio src/ no encontrado, omitiendo safety lint${NC}"
    fi
}

# Function to install dependencies
install_dependencies() {
    echo ""
    echo -e "${BLUE}📦 PASO 4: Instalación de Dependencias${NC}"
    
    if [ -f "package.json" ]; then
        echo "Instalando dependencias con npm..."
        npm install
        echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"
    else
        echo -e "${YELLOW}⚠️  package.json no encontrado, omitiendo instalación de dependencias${NC}"
    fi
}

# Function to verify environment variables
verify_env_variables() {
    echo ""
    echo -e "${BLUE}🔑 PASO 5: Verificación de Variables de Entorno${NC}"
    
    # Check if .env or .env.production exists
    if [ -f ".env" ] || [ -f ".env.production" ]; then
        echo -e "${GREEN}✅ Archivo de variables de entorno encontrado${NC}"
    else
        echo -e "${YELLOW}⚠️  No se encontró archivo .env (puede ser opcional)${NC}"
    fi
}

# Function to run build
run_build() {
    echo ""
    echo -e "${BLUE}🔨 PASO 6: Construcción del Proyecto${NC}"
    
    if [ -f "package.json" ]; then
        echo "Ejecutando build..."
        npm run build
        echo -e "${GREEN}✅ Build completado exitosamente${NC}"
    else
        echo -e "${YELLOW}⚠️  package.json no encontrado, omitiendo build${NC}"
    fi
}

# Function to generate inventory
generate_inventory() {
    echo ""
    echo -e "${BLUE}📋 PASO 7: Generación de Inventario${NC}"
    
    if command -v python3 &> /dev/null; then
        python3 -c "
import os, json
catalog_dir = 'public/assets/catalog'
items = []
if os.path.exists(catalog_dir):
    for f in sorted(os.listdir(catalog_dir)):
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            name = os.path.splitext(f)[0].replace('_', ' ').title()
            items.append({
                'id': os.path.splitext(f)[0],
                'Handle': os.path.splitext(f)[0],
                'Title': name,
                'Variant Price': '0',
                'Image Src': f'/assets/catalog/{f}'
            })
with open('src/inventory_index.json', 'w') as f:
    json.dump(items, f, indent=2)
print(f'✅ Generated inventory with {len(items)} items.')
" 2>/dev/null && echo -e "${GREEN}✅ Inventario generado${NC}" || echo -e "${YELLOW}⚠️  No se pudo generar inventario${NC}"
    else
        echo -e "${YELLOW}⚠️  Python3 no encontrado, omitiendo generación de inventario${NC}"
    fi
}

# Main execution function
ejecutar_integracion() {
    echo "============================================================================"
    echo -e "${GREEN}🚀 INICIANDO INTEGRACIÓN TRYONYOU ALIGNED (MAC)${NC}"
    echo "============================================================================"
    echo ""
    
    # Run all steps
    check_mac_environment
    verify_repository
    run_safety_lint
    install_dependencies
    verify_env_variables
    run_build
    generate_inventory
    
    echo ""
    echo "============================================================================"
    echo -e "${GREEN}✅ INTEGRACIÓN COMPLETADA EXITOSAMENTE${NC}"
    echo "============================================================================"
    echo -e "${GREEN}🎉 Sistema TRYONYOU alineado y listo para Mac${NC}"
    echo ""
}

# Main script logic
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ ERROR: Se requiere un comando${NC}"
    echo ""
    show_help
fi

case "$1" in
    ejecuta)
        ejecutar_integracion
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ ERROR: Comando no reconocido: $1${NC}"
        echo ""
        show_help
        ;;
esac
