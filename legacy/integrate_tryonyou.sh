#!/usr/bin/env bash
set -euo pipefail

############################
# CONFIG
############################
WORKDIR="${WORKDIR:-$PWD/TRYONYOU_INTEGRATION}"
ASSETS_DIR="${ASSETS_DIR:-/mnt/data}"   # Cambia a tu carpeta local si no estás en sandbox
MAIN_ZIP="${MAIN_ZIP:-TRYONYOU_PILOT_COMPLETE.zip}"
CLEAN_ZIP="${CLEAN_ZIP:-TRYONYOU_APP_CLEAN_DRS.zip}"
ENGINE_ZIP="${ENGINE_ZIP:-jules_session_10129523505925353476_motor-recomendacion-core-10129523505925353476.zip}"
GITHUB_REPO="${GITHUB_REPO:-https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM}"
MAIN_DIR_NAME="${MAIN_DIR_NAME:-TRYONYOU_PILOT_COMPLETE}"

############################
# HELPERS
############################
log() { echo -e "✅ $*"; }
warn() { echo -e "⚠️  $*" >&2; }
die() { echo -e "❌ $*" >&2; exit 1; }

ensure_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Falta el comando '$1'. Instálalo y reintenta."
}

safe_copy_dir() {
  local src="$1"
  local dest="$2"
  local mode="${3:-merge}"  # merge | overwrite | skip
  
  [[ -d "$src" ]] || die "Directorio fuente no existe: $src"
  
  # Safety check for overwrite mode before any operations
  if [[ "$mode" == "overwrite" ]]; then
    if [[ -n "${WORKDIR:-}" ]]; then
      if [[ ! "$dest" =~ ^${WORKDIR} ]] && [[ ! "$dest" =~ ^/tmp/ ]]; then
        die "Por seguridad, overwrite solo funciona dentro de WORKDIR o /tmp"
      fi
    fi
  fi
  
  if [[ ! -d "$dest" ]]; then
    log "Creando directorio destino: $dest"
    mkdir -p "$dest"
  fi
  
  case "$mode" in
    merge)
      log "Copiando (merge) $src -> $dest"
      if ! cp -r "$src"/* "$dest/" 2>/dev/null; then
        warn "Algunos archivos no pudieron copiarse desde $src (puede que el directorio esté vacío)"
      fi
      ;;
    overwrite)
      log "Copiando (overwrite) $src -> $dest"
      rm -rf "$dest"
      cp -r "$src" "$dest"
      ;;
    skip)
      if [[ -z "$(ls -A "$dest")" ]]; then
        log "Copiando (skip, destino vacío) $src -> $dest"
        cp -r "$src"/* "$dest/"
      else
        warn "Saltando copia (destino no vacío): $dest"
      fi
      ;;
    *)
      die "Modo desconocido: $mode. Usa: merge, overwrite, skip"
      ;;
  esac
}

safe_extract() {
  local zip_path="$1"
  local extract_dir="$2"
  
  [[ -f "$zip_path" ]] || die "ZIP no encontrado: $zip_path"
  
  log "Extrayendo: $zip_path -> $extract_dir"
  mkdir -p "$extract_dir"
  unzip -q -o "$zip_path" -d "$extract_dir" || die "Error al extraer $zip_path"
}

############################
# MAIN WORKFLOW
############################
main() {
  log "🚀 INICIANDO INTEGRACIÓN TRYONYOU"
  
  # Verificar comandos necesarios
  ensure_cmd unzip
  ensure_cmd git
  ensure_cmd rsync
  
  # Crear directorio de trabajo
  log "📁 Preparando directorio de trabajo: $WORKDIR"
  mkdir -p "$WORKDIR"
  cd "$WORKDIR"
  
  # Verificar ZIPs
  log "🔍 Verificando archivos ZIP..."
  for zip_file in "$MAIN_ZIP" "$CLEAN_ZIP" "$ENGINE_ZIP"; do
    zip_full_path="${ASSETS_DIR}/${zip_file}"
    if [[ ! -f "$zip_full_path" ]]; then
      warn "No se encuentra: $zip_full_path (se saltará durante la integración)"
    else
      log "Encontrado: $zip_full_path"
    fi
  done
  
  # Extraer ZIPs
  log "📦 Extrayendo archivos..."
  
  # 1. MAIN ZIP (Piloto completo)
  if [[ -f "${ASSETS_DIR}/${MAIN_ZIP}" ]]; then
    safe_extract "${ASSETS_DIR}/${MAIN_ZIP}" "$WORKDIR/main_pilot"
    log "✓ Piloto principal extraído"
  else
    warn "Saltando MAIN_ZIP (no encontrado)"
  fi
  
  # 2. CLEAN ZIP (App limpia DRS)
  if [[ -f "${ASSETS_DIR}/${CLEAN_ZIP}" ]]; then
    safe_extract "${ASSETS_DIR}/${CLEAN_ZIP}" "$WORKDIR/clean_app"
    log "✓ App limpia extraída"
  else
    warn "Saltando CLEAN_ZIP (no encontrado)"
  fi
  
  # 3. ENGINE ZIP (Motor de recomendación)
  if [[ -f "${ASSETS_DIR}/${ENGINE_ZIP}" ]]; then
    safe_extract "${ASSETS_DIR}/${ENGINE_ZIP}" "$WORKDIR/engine"
    log "✓ Motor de recomendación extraído"
  else
    warn "Saltando ENGINE_ZIP (no encontrado)"
  fi
  
  # Clonar o actualizar repositorio
  log "📥 Clonando/actualizando repositorio GitHub..."
  REPO_DIR="$WORKDIR/repo"
  if [[ -d "$REPO_DIR/.git" ]]; then
    log "Repositorio ya existe, actualizando..."
    cd "$REPO_DIR"
    git pull --rebase || warn "No se pudo actualizar repositorio (continuando...)"
  else
    log "Clonando repositorio..."
    git clone "$GITHUB_REPO" "$REPO_DIR" || die "Error al clonar repositorio"
    cd "$REPO_DIR"
  fi
  
  # Integrar contenido
  log "🔗 Integrando contenido en repositorio..."
  
  # Integrar pilot principal si existe
  if [[ -d "$WORKDIR/main_pilot/$MAIN_DIR_NAME" ]]; then
    log "Integrando piloto principal..."
    safe_copy_dir "$WORKDIR/main_pilot/$MAIN_DIR_NAME" "$REPO_DIR" "merge"
  elif [[ -d "$WORKDIR/main_pilot" ]]; then
    log "Integrando piloto (estructura alternativa)..."
    safe_copy_dir "$WORKDIR/main_pilot" "$REPO_DIR" "merge"
  fi
  
  # Integrar app limpia si existe
  if [[ -d "$WORKDIR/clean_app" ]]; then
    log "Integrando app limpia..."
    # Asumiendo que tiene estructura src/, public/, etc
    [[ -d "$WORKDIR/clean_app/src" ]] && safe_copy_dir "$WORKDIR/clean_app/src" "$REPO_DIR/src" "merge"
    [[ -d "$WORKDIR/clean_app/public" ]] && safe_copy_dir "$WORKDIR/clean_app/public" "$REPO_DIR/public" "merge"
  fi
  
  # Integrar engine si existe
  if [[ -d "$WORKDIR/engine" ]]; then
    log "Integrando motor de recomendación..."
    ENGINE_TARGET="$REPO_DIR/engine"
    mkdir -p "$ENGINE_TARGET"
    safe_copy_dir "$WORKDIR/engine" "$ENGINE_TARGET" "merge"
    
    # Copiar engine.py principal si existe
    if [[ -f "$WORKDIR/engine/engine.py" ]]; then
      cp "$WORKDIR/engine/engine.py" "$REPO_DIR/engine.py"
      log "✓ engine.py copiado a raíz del repositorio"
    fi
  fi
  
  # Crear estructura de directorios estándar si no existe
  log "📂 Verificando estructura de directorios..."
  cd "$REPO_DIR"
  mkdir -p src/components src/pages src/styles src/assets
  mkdir -p public/assets/images public/assets/videos
  mkdir -p backend api scripts docs
  
  # Generar reporte de integración
  REPORT_FILE="$REPO_DIR/INTEGRATION_REPORT.md"
  log "📝 Generando reporte de integración..."
  cat > "$REPORT_FILE" << EOF
# TRYONYOU Integration Report

**Fecha:** $(date)
**Directorio de trabajo:** $WORKDIR

## Archivos Procesados

- **Main Pilot:** ${MAIN_ZIP}
- **Clean App:** ${CLEAN_ZIP}
- **Engine:** ${ENGINE_ZIP}

## Estructura Integrada

\`\`\`
$(tree -L 2 -I 'node_modules|.git' "$REPO_DIR" 2>/dev/null || find "$REPO_DIR" -maxdepth 2 -type d | head -20)
\`\`\`

## Estado del Repositorio

\`\`\`
$(git status --short | head -30)
\`\`\`

## Archivos Modificados

Total de archivos modificados/añadidos: $(git status --short | wc -l)

## Próximos Pasos

1. Revisar cambios: \`git status\`
2. Probar build: \`npm install && npm run build\`
3. Commit cambios: \`git add . && git commit -m "Integración TRYONYOU"\`
4. Push: \`git push origin main\`

EOF
  
  log "✅ Reporte generado: $REPORT_FILE"
  
  # Resumen final
  log ""
  log "════════════════════════════════════════"
  log "🎉 INTEGRACIÓN COMPLETADA"
  log "════════════════════════════════════════"
  log "📍 Repositorio: $REPO_DIR"
  log "📄 Reporte: $REPORT_FILE"
  log ""
  log "Próximos comandos sugeridos:"
  log "  cd $REPO_DIR"
  log "  git status"
  log "  npm install"
  log "  npm run build"
  log ""
  
  # Mostrar estadísticas
  cd "$REPO_DIR"
  log "📊 Estadísticas:"
  log "   - Archivos modificados/nuevos: $(git status --short 2>/dev/null | wc -l)"
  log "   - Directorios en src/: $(find src -maxdepth 1 -type d 2>/dev/null | wc -l)"
  log "   - Archivos JS/JSX: $(find . -name "*.js" -o -name "*.jsx" 2>/dev/null | wc -l)"
  
  log ""
  log "✨ Listo para commit y deploy!"
}

############################
# ENTRY POINT
############################
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
