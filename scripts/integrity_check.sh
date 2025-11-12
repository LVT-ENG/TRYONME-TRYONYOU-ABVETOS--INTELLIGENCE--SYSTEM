#!/bin/bash
# =====================================================
# 🛠️ INTEGRITY CHECK — TEST AUTOMÁTICO
# Verificación de integridad del proyecto
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# =====================================================

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuración
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_FILE="$PROJECT_ROOT/logs/integrity_check_$(date +%Y%m%d_%H%M).log"
ERRORS=0
WARNINGS=0

mkdir -p "$PROJECT_ROOT/logs"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🛠️  INTEGRITY CHECK — TEST AUTOMÁTICO              ║${NC}"
echo -e "${BLUE}║   TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Función para registrar errores
log_error() {
  echo -e "${RED}❌ ERROR: $1${NC}" | tee -a "$LOG_FILE"
  ((ERRORS++))
}

# Función para registrar advertencias
log_warning() {
  echo -e "${YELLOW}⚠️  WARNING: $1${NC}" | tee -a "$LOG_FILE"
  ((WARNINGS++))
}

# Función para registrar éxitos
log_success() {
  echo -e "${GREEN}✅ $1${NC}" | tee -a "$LOG_FILE"
}

# Función para registrar información
log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}" | tee -a "$LOG_FILE"
}

# ===== TEST 1: Verificar estructura de directorios =====
log_info "Test 1: Verificando estructura de directorios..."

REQUIRED_DIRS=(
  "src"
  "src/components"
  "src/styles"
  "src/i18n"
  "public"
  "scripts"
)

for dir in "${REQUIRED_DIRS[@]}"; do
  if [ -d "$PROJECT_ROOT/$dir" ]; then
    log_success "Directorio encontrado: $dir"
  else
    log_error "Directorio faltante: $dir"
  fi
done

echo ""

# ===== TEST 2: Verificar archivos críticos =====
log_info "Test 2: Verificando archivos críticos..."

REQUIRED_FILES=(
  "package.json"
  "vite.config.js"
  "index.html"
  "src/App.jsx"
  "src/main.jsx"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$PROJECT_ROOT/$file" ]; then
    log_success "Archivo encontrado: $file"
  else
    log_error "Archivo faltante: $file"
  fi
done

echo ""

# ===== TEST 3: Verificar sintaxis de package.json =====
log_info "Test 3: Verificando sintaxis de package.json..."

if [ -f "$PROJECT_ROOT/package.json" ]; then
  if node -e "require('./package.json')" 2>/dev/null; then
    log_success "package.json es válido"
  else
    log_error "package.json tiene errores de sintaxis"
  fi
else
  log_error "package.json no encontrado"
fi

echo ""

# ===== TEST 4: Verificar dependencias instaladas =====
log_info "Test 4: Verificando dependencias instaladas..."

if [ -d "$PROJECT_ROOT/node_modules" ]; then
  log_success "node_modules encontrado"
  
  # Verificar dependencias críticas
  CRITICAL_DEPS=(
    "react"
    "react-dom"
    "react-router-dom"
    "vite"
  )
  
  for dep in "${CRITICAL_DEPS[@]}"; do
    if [ -d "$PROJECT_ROOT/node_modules/$dep" ]; then
      log_success "Dependencia instalada: $dep"
    else
      log_warning "Dependencia faltante: $dep"
    fi
  done
else
  log_warning "node_modules no encontrado. Ejecuta 'npm install'"
fi

echo ""

# ===== TEST 5: Verificar referencias rotas en componentes =====
log_info "Test 5: Verificando referencias en componentes JSX..."

if command -v grep &> /dev/null; then
  # Buscar imports rotos
  BROKEN_IMPORTS=$(find "$PROJECT_ROOT/src" -name "*.jsx" -o -name "*.js" | xargs grep -n "from ['\"]\.\./" 2>/dev/null | grep -v "node_modules" || true)
  
  if [ -z "$BROKEN_IMPORTS" ]; then
    log_success "No se encontraron referencias relativas sospechosas"
  else
    log_warning "Se encontraron referencias relativas que podrían ser problemáticas"
  fi
else
  log_warning "grep no disponible, saltando verificación de imports"
fi

echo ""

# ===== TEST 6: Verificar archivos sin referencia =====
log_info "Test 6: Verificando archivos huérfanos..."

if [ -d "$PROJECT_ROOT/public" ]; then
  ORPHAN_FILES=$(find "$PROJECT_ROOT/public" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.svg" \) | while read file; do
    filename=$(basename "$file")
    if ! grep -r "$filename" "$PROJECT_ROOT/src" &>/dev/null; then
      echo "$file"
    fi
  done)
  
  if [ -z "$ORPHAN_FILES" ]; then
    log_success "No se encontraron archivos huérfanos en /public"
  else
    log_warning "Archivos sin referencia encontrados:"
    echo "$ORPHAN_FILES" | while read file; do
      echo "  - $file" | tee -a "$LOG_FILE"
    done
  fi
fi

echo ""

# ===== TEST 7: Verificar tamaño de archivos =====
log_info "Test 7: Verificando tamaño de archivos..."

if [ -d "$PROJECT_ROOT/public" ]; then
  LARGE_FILES=$(find "$PROJECT_ROOT/public" -type f -size +5M)
  
  if [ -z "$LARGE_FILES" ]; then
    log_success "No se encontraron archivos excesivamente grandes (>5MB)"
  else
    log_warning "Archivos grandes encontrados (>5MB):"
    echo "$LARGE_FILES" | while read file; do
      size=$(du -h "$file" | cut -f1)
      echo "  - $file ($size)" | tee -a "$LOG_FILE"
    done
  fi
fi

echo ""

# ===== TEST 8: Verificar archivos duplicados =====
log_info "Test 8: Verificando archivos duplicados..."

if command -v md5sum &> /dev/null || command -v md5 &> /dev/null; then
  if command -v md5sum &> /dev/null; then
    MD5_CMD="md5sum"
  else
    MD5_CMD="md5 -r"
  fi
  
  DUPLICATES=$(find "$PROJECT_ROOT/public" -type f -exec $MD5_CMD {} \; 2>/dev/null | sort | uniq -w32 -d || true)
  
  if [ -z "$DUPLICATES" ]; then
    log_success "No se encontraron archivos duplicados"
  else
    log_warning "Archivos duplicados encontrados (mismo hash MD5)"
  fi
else
  log_warning "md5sum/md5 no disponible, saltando verificación de duplicados"
fi

echo ""

# ===== TEST 9: Verificar archivos temporales =====
log_info "Test 9: Verificando archivos temporales..."

TEMP_FILES=$(find "$PROJECT_ROOT" -type f \( -name "*.tmp" -o -name "*.bak" -o -name "*~" -o -name ".DS_Store" \) 2>/dev/null || true)

if [ -z "$TEMP_FILES" ]; then
  log_success "No se encontraron archivos temporales"
else
  log_warning "Archivos temporales encontrados:"
  echo "$TEMP_FILES" | while read file; do
    echo "  - $file" | tee -a "$LOG_FILE"
  done
fi

echo ""

# ===== TEST 10: Verificar build de producción =====
log_info "Test 10: Verificando capacidad de build..."

if npm run build --dry-run &>/dev/null; then
  log_success "Configuración de build es válida"
else
  log_warning "No se pudo verificar el build (ejecuta 'npm run build' manualmente)"
fi

echo ""

# ===== RESUMEN =====
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   📊 RESUMEN DE INTEGRIDAD                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✅ PERFECTO: No se encontraron errores ni advertencias${NC}"
  echo -e "${GREEN}   El proyecto está en perfecto estado${NC}"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}⚠️  ADVERTENCIAS: $WARNINGS${NC}"
  echo -e "${YELLOW}   El proyecto tiene advertencias menores${NC}"
  exit 0
else
  echo -e "${RED}❌ ERRORES: $ERRORS${NC}"
  echo -e "${RED}⚠️  ADVERTENCIAS: $WARNINGS${NC}"
  echo -e "${RED}   El proyecto tiene errores que deben ser corregidos${NC}"
  exit 1
fi

echo ""
echo -e "${BLUE}📄 Log completo guardado en: $LOG_FILE${NC}"
echo ""

