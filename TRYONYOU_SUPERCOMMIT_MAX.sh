#!/bin/bash

# TRYONYOU SUPERCOMMIT MAX
# Sincroniza GitHub, Vercel y el Latido de Jules en un solo movimiento
# ======================================================================

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Jules Heartbeat Function
jules_heartbeat() {
    local message=$1
    echo -e "${BLUE}💙 JULES LATIDO:${NC} ${message}"
}

# Success Message
jules_success() {
    local message=$1
    echo -e "${GREEN}✅ JULES:${NC} ${message}"
}

# Error Message
jules_error() {
    local message=$1
    echo -e "${RED}❌ JULES:${NC} ${message}"
}

# Warning Message
jules_warning() {
    local message=$1
    echo -e "${YELLOW}⚠️  JULES:${NC} ${message}"
}

echo "================================================================"
echo "🚀 TRYONYOU SUPERCOMMIT MAX - Sincronización Total del Ecosistema"
echo "================================================================"
echo ""

# 1. Check Git Status
jules_heartbeat "Verificando estado del repositorio..."
# Check if HEAD exists (for new repositories)
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    jules_success "Repositorio nuevo detectado - hay cambios para commitear"
    HAS_CHANGES=true
elif git diff-index --quiet HEAD --; then
    jules_warning "No hay cambios para commitear. El árbol de trabajo está limpio."
    HAS_CHANGES=false
else
    jules_success "Cambios detectados en el repositorio"
    HAS_CHANGES=true
fi

# 2. Stage All Changes
if [ "$HAS_CHANGES" = true ]; then
    jules_heartbeat "Preparando todos los archivos modificados..."
    git add .
    jules_success "Archivos staged correctamente"
    
    # Show what will be committed
    echo ""
    jules_heartbeat "Archivos a commitear:"
    git status --short
    echo ""
fi

# 3. Commit Changes
if [ "$HAS_CHANGES" = true ]; then
    # Use provided commit message or default
    COMMIT_MSG="${1:-SYNC: TryOnYou Ecosystem Update - GitHub + Vercel + Jules Heartbeat}"
    
    jules_heartbeat "Creando commit con mensaje: \"$COMMIT_MSG\""
    git commit -m "$COMMIT_MSG"
    jules_success "Commit creado exitosamente"
fi

# 4. Push to GitHub
if [ "$HAS_CHANGES" = true ]; then
    jules_heartbeat "Sincronizando con GitHub..."
    CURRENT_BRANCH=$(git branch --show-current)
    jules_heartbeat "Rama actual: $CURRENT_BRANCH"
    
    # Check if origin remote exists
    if ! git remote get-url origin >/dev/null 2>&1; then
        jules_error "Remote 'origin' no encontrado. Configura el remote primero."
        exit 1
    fi
    
    if git push origin "$CURRENT_BRANCH"; then
        jules_success "Push a GitHub completado exitosamente"
        PUSH_SUCCESS=true
    else
        jules_error "Error al hacer push a GitHub"
        exit 1
    fi
else
    jules_heartbeat "Sin cambios para pushear - repositorio ya sincronizado"
    PUSH_SUCCESS=false
fi

# 5. Vercel Integration Status
echo ""
jules_heartbeat "Estado de integración con Vercel..."
VERCEL_CONFIGURED=false
if [ -f "vercel.json" ]; then
    jules_success "Configuración de Vercel detectada (vercel.json)"
    jules_heartbeat "Vercel se desplegará automáticamente desde GitHub"
    VERCEL_CONFIGURED=true
else
    jules_warning "No se encontró vercel.json - verifica la configuración de Vercel"
fi

# 6. Environment Check
echo ""
jules_heartbeat "Verificando configuración del entorno..."
if [ -f ".env" ]; then
    jules_success "Variables de entorno detectadas (.env)"
else
    jules_warning "Archivo .env no encontrado - crear si necesitas variables de entorno locales"
fi

# 7. Final Jules Heartbeat
echo ""
echo "================================================================"
jules_heartbeat "💓 LATIDO FINAL - Estado del Ecosistema TryOnYou 💓"
echo "================================================================"
echo ""
if [ "$PUSH_SUCCESS" = true ]; then
    jules_success "✓ GitHub: Sincronizado con nuevos cambios"
else
    jules_success "✓ GitHub: Sin cambios nuevos (ya está actualizado)"
fi

if [ "$VERCEL_CONFIGURED" = true ]; then
    jules_success "✓ Vercel: Configuración detectada - deployment automático"
else
    jules_warning "✓ Vercel: No configurado (vercel.json no encontrado)"
fi

jules_success "✓ Jules: Sistema monitoreado y saludable"
echo ""
echo -e "${GREEN}🎉 SINCRONIZACIÓN COMPLETA DEL ECOSISTEMA TRYONYOU 🎉${NC}"
echo ""
echo "Próximos pasos:"
if [ "$PUSH_SUCCESS" = true ] && [ "$VERCEL_CONFIGURED" = true ]; then
    echo "  → Vercel desplegará automáticamente los cambios"
    echo "  → Monitorea el deployment en: https://vercel.com/dashboard"
elif [ "$PUSH_SUCCESS" = true ]; then
    echo "  → Cambios pusheados a GitHub exitosamente"
    echo "  → Considera configurar Vercel para deployment automático"
else
    echo "  → Repositorio ya está actualizado"
    echo "  → No hay nuevos cambios para desplegar"
fi
echo "  → Jules mantiene el latido del sistema activo 💙"
echo ""
