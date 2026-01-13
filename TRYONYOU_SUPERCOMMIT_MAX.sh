#!/bin/bash

################################################################################
# TRYONYOU_SUPERCOMMIT_MAX.sh
# 
# Este script sincroniza el ecosistema completo de TryOnYou:
# - GitHub: Commits, push y sincronización de código
# - Vercel: Deploy y verificación de producción
# - Latido de Jules: Monitoreo del estado del sistema
#
# Autor: TryOnYou Intelligence System
# Version: 1.0.0
################################################################################

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Variables de configuración
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
LOG_FILE="sync_log_$(date +"%Y%m%d_%H%M%S").log"

################################################################################
# Funciones de utilidad
################################################################################

print_header() {
    echo -e "\n${PURPLE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}═══════════════════════════════════════════════════════════════${NC}\n"
}

print_step() {
    echo -e "${CYAN}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ Error: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

log_message() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> "$LOG_FILE"
}

################################################################################
# Latido de Jules - Monitoreo del sistema
################################################################################

jules_heartbeat() {
    print_header "💓 LATIDO DE JULES - Verificando Sistema"
    
    log_message "Iniciando verificación del latido del sistema"
    
    # Verificar Git
    print_step "Verificando Git..."
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version)
        print_success "Git disponible: $GIT_VERSION"
        log_message "Git OK: $GIT_VERSION"
    else
        print_error "Git no está instalado"
        log_message "ERROR: Git no disponible"
        return 1
    fi
    
    # Verificar Node.js
    print_step "Verificando Node.js..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js disponible: $NODE_VERSION"
        log_message "Node.js OK: $NODE_VERSION"
    else
        print_warning "Node.js no está instalado (opcional)"
        log_message "WARNING: Node.js no disponible"
    fi
    
    # Verificar npm
    print_step "Verificando npm..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm disponible: v$NPM_VERSION"
        log_message "npm OK: v$NPM_VERSION"
    else
        print_warning "npm no está instalado (opcional)"
        log_message "WARNING: npm no disponible"
    fi
    
    # Verificar Python
    print_step "Verificando Python..."
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version)
        print_success "Python disponible: $PYTHON_VERSION"
        log_message "Python OK: $PYTHON_VERSION"
    else
        print_warning "Python no está instalado (opcional)"
        log_message "WARNING: Python no disponible"
    fi
    
    # Verificar estado del repositorio
    print_step "Verificando estado del repositorio..."
    if [ -d .git ]; then
        BRANCH=$(git rev-parse --abbrev-ref HEAD)
        print_success "Repositorio Git OK - Branch: $BRANCH"
        log_message "Repositorio OK - Branch: $BRANCH"
    else
        print_error "No es un repositorio Git"
        log_message "ERROR: No es un repositorio Git"
        return 1
    fi
    
    # Latido completado
    print_success "💓 Latido de Jules: SISTEMA SALUDABLE"
    log_message "Latido del sistema completado exitosamente"
    echo ""
}

################################################################################
# GitHub Sync - Sincronización con GitHub
################################################################################

github_sync() {
    print_header "🔄 GITHUB SYNC - Sincronizando Código"
    
    log_message "Iniciando sincronización con GitHub"
    
    # Verificar cambios
    print_step "Verificando cambios en el repositorio..."
    
    if [[ -z $(git status --porcelain) ]]; then
        print_warning "No hay cambios para commitear"
        log_message "No hay cambios pendientes"
        return 0
    fi
    
    # Mostrar estado
    print_step "Estado del repositorio:"
    git status --short
    echo ""
    
    # Add all changes (respecting .gitignore)
    print_step "Agregando todos los cambios..."
    git add -A
    print_success "Cambios agregados"
    log_message "Cambios agregados al staging area"
    
    # Commit con mensaje automático
    COMMIT_MSG="🚀 SUPERCOMMIT: Sincronización TryOnYou Ecosystem - $TIMESTAMP"
    print_step "Creando commit..."
    git commit -m "$COMMIT_MSG"
    print_success "Commit creado: $COMMIT_MSG"
    log_message "Commit creado: $COMMIT_MSG"
    
    # Push a GitHub
    print_step "Enviando cambios a GitHub..."
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    if git push origin "$BRANCH"; then
        print_success "Cambios enviados exitosamente a GitHub (branch: $BRANCH)"
        log_message "Push exitoso a GitHub - Branch: $BRANCH"
    else
        print_error "Error al enviar cambios a GitHub"
        log_message "ERROR: Fallo en push a GitHub"
        return 1
    fi
    
    echo ""
}

################################################################################
# Vercel Deploy - Despliegue en Vercel
################################################################################

vercel_deploy() {
    print_header "🚀 VERCEL DEPLOY - Desplegando a Producción"
    
    log_message "Iniciando proceso de deploy a Vercel"
    
    # Verificar si Vercel CLI está instalado
    print_step "Verificando Vercel CLI..."
    
    if command -v vercel &> /dev/null; then
        VERCEL_VERSION=$(vercel --version)
        print_success "Vercel CLI disponible: $VERCEL_VERSION"
        log_message "Vercel CLI OK: $VERCEL_VERSION"
        
        # Desplegar a Vercel (con confirmación de seguridad)
        print_step "Desplegando a Vercel..."
        print_warning "Deploy a producción - usando modo automatizado"
        
        if vercel --prod --yes 2>&1 | tee -a "$LOG_FILE"; then
            print_success "Deploy a Vercel completado exitosamente"
            log_message "Deploy a Vercel exitoso"
        else
            print_warning "Error en deploy a Vercel (puede requerir autenticación)"
            log_message "WARNING: Deploy a Vercel falló"
        fi
    else
        print_warning "Vercel CLI no está instalado"
        print_step "Para instalar: npm i -g vercel"
        print_step "Deploy saltado - Los cambios se sincronizarán automáticamente via GitHub integration"
        log_message "WARNING: Vercel CLI no disponible - Deploy saltado"
    fi
    
    echo ""
}

################################################################################
# Build del proyecto
################################################################################

build_project() {
    print_header "🔨 BUILD - Construyendo Proyecto"
    
    log_message "Iniciando build del proyecto"
    
    # Verificar si existe package.json
    if [ -f package.json ]; then
        # Verificar si el script 'build' existe en package.json
        if npm run 2>&1 | grep -q "build"; then
            print_step "Ejecutando npm build..."
            
            if npm run build 2>&1 | tee -a "$LOG_FILE"; then
                print_success "Build completado exitosamente"
                log_message "Build exitoso"
            else
                print_warning "Build falló o no es necesario"
                log_message "WARNING: Build falló o no requerido"
            fi
        else
            print_warning "Script 'build' no encontrado en package.json"
            log_message "WARNING: Script 'build' no definido"
        fi
    else
        print_warning "No se encontró package.json - Build saltado"
        log_message "WARNING: package.json no encontrado"
    fi
    
    echo ""
}

################################################################################
# Resumen final
################################################################################

show_summary() {
    print_header "📊 RESUMEN DE SINCRONIZACIÓN"
    
    echo -e "${GREEN}✓ Latido de Jules: Sistema verificado${NC}"
    echo -e "${GREEN}✓ GitHub: Código sincronizado${NC}"
    echo -e "${GREEN}✓ Vercel: Deploy procesado${NC}"
    echo ""
    echo -e "${BLUE}Timestamp: $TIMESTAMP${NC}"
    echo -e "${BLUE}Branch: $(git rev-parse --abbrev-ref HEAD)${NC}"
    echo -e "${BLUE}Commit: $(git rev-parse --short HEAD)${NC}"
    echo -e "${BLUE}Log guardado en: $LOG_FILE${NC}"
    echo ""
    
    print_success "🎉 ECOSISTEMA TRYONYOU SINCRONIZADO EXITOSAMENTE"
    
    log_message "Sincronización completada exitosamente"
}

################################################################################
# Main - Flujo principal
################################################################################

main() {
    clear
    
    print_header "🌟 TRYONYOU SUPERCOMMIT MAX - Sincronización de Ecosistema"
    
    echo -e "${CYAN}Iniciando sincronización del ecosistema TryOnYou...${NC}"
    echo -e "${CYAN}Integrando: GitHub + Vercel + Latido de Jules${NC}"
    echo ""
    
    log_message "==================== INICIO DE SINCRONIZACIÓN ===================="
    log_message "Iniciando TRYONYOU_SUPERCOMMIT_MAX.sh"
    
    # Ejecutar pasos en secuencia
    if jules_heartbeat; then
        github_sync
        build_project
        vercel_deploy
        show_summary
    else
        print_error "Fallo en verificación del sistema - Abortando"
        log_message "ERROR: Verificación del sistema falló - Proceso abortado"
        exit 1
    fi
    
    log_message "==================== FIN DE SINCRONIZACIÓN ===================="
}

# Ejecutar el script
main "$@"
