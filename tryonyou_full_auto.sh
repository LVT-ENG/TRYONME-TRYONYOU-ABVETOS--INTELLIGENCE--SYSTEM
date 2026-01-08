#!/usr/bin/env bash

# ==========================================================
# TRYONYOU — FULL AUTO (Setup + Theme + Build + Deploy + Bot + Backup)
# Soporta macOS (brew) y Ubuntu/Debian (apt). Requiere git y Vercel account.
# ==========================================================

set -e

log(){ echo -e "\033[1;32m$1\033[0m"; }
warn(){ echo -e "\033[1;33m$1\033[0m"; }
err(){ echo -e "\033[1;31m$1\033[0m"; }

OS=""
if [[ "$OSTYPE" == "darwin"* ]]; then OS="mac"; else OS="linux"; fi

PROJECT_DIR="$HOME/TRYONYOU_MASTER"
REPO_URL="https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git"

log "🧩 TRYONYOU — instalación de requisitos…"

# 1) Paquetes base
if [[ "$OS" == "mac" ]]; then
    if ! command -v brew >/dev/null 2>&1; then
        warn "🍺 Homebrew no encontrado. Instalando…"
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile || true
        eval "$(/opt/homebrew/bin/brew shellenv)" || true
    fi
    command -v git >/dev/null 2>&1 || brew install git
    command -v curl >/dev/null 2>&1 || brew install curl
    if ! command -v node >/dev/null 2>&1; then brew install node; fi
else
    sudo apt-get update -y
    sudo apt-get install -y git curl ca-certificates
    if ! command -v node >/dev/null 2>&1; then
        warn "⬇️ Instalando Node LTS…"
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

log "✅ Node: $(node -v) | npm: $(npm -v)"

# 2) Vercel CLI
if ! command -v vercel >/dev/null 2>&1; then
    log "⬇️ Instalando Vercel CLI…"
    npm install -g vercel
fi
log "✅ Vercel CLI: $(vercel --version)"

# 3) Login Vercel
if ! vercel whoami >/dev/null 2>&1; then
    warn "🔐 No detecto sesión Vercel. Abriendo login… (pulsa Enter y sigue con tu email)"
    vercel login || true
else
    log "🔐 Sesión Vercel OK ($(vercel whoami || echo 'usuario'))"
fi

# 4) Clonar/Actualizar repo
mkdir -p "$HOME"
if [[ ! -d "$PROJECT_DIR/.git" ]]; then
    log "⬇️ Clonando repo maestro…"
    git clone "$REPO_URL" "$PROJECT_DIR"
else
    log "🔄 Actualizando repo maestro…"
    cd "$PROJECT_DIR"
    git pull --rebase || true
fi

cd "$PROJECT_DIR"
log "📂 Proyecto: $(pwd)"

# 5) Variables de entorno opcionales
if [[ -f ".env" ]]; then
    set -o allexport; source .env; set +o allexport
fi

# 6) Estructura de carpetas
mkdir -p src/styles src/sections public/brand assets scripts .github/workflows

# 7) THEME "Blanco nube + beige plastificado + dorado"
cat > src/styles/theme.css <<'CSS'
:root{
--cloud:#F9FAFB;
--beige:#EDE3CF;
--beige-gloss:#F4E9D2;
--beige-depth:#E5D6B6;
--gold:#D4AF37;
--gold-2:#E5C96B;
--anthra:#222326;
--ink:#2A2D33;
--radius:16px;
--shadow:0 10px 30px rgba(0,0,0,.06);
--shadow-lg:0 22px 55px rgba(0,0,0,.14);
}
*{box-sizing:border-box}
html,body{margin:0;background:
linear-gradient(180deg,var(--cloud) 0%, var(--beige-gloss) 60%, var(--cloud) 100%);
color:var(--ink);font-family:system-ui,-apple-system,Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
a{color:inherit;text-decoration:none}
.section{padding:6rem 1.5rem;max-width:1200px;margin:0 auto}
.container{max-width:1200px;margin:0 auto;padding:0 1.5rem}
.nav{position:sticky;top:0;z-index:50;background:linear-gradient(180deg, rgba(255,255,255,.78), rgba(255,255,255,.62));backdrop-filter:saturate(160%) blur(12px);border-bottom:1px solid rgba(0,0,0,.06)}
.btn{appearance:none;border:0;cursor:pointer;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold-2));color:#111;padding:.9rem 1.25rem;border-radius:999px;box-shadow:0 10px 26px rgba(212,175,55,.28);transition:transform .15s ease,filter .2s ease}
.btn:hover{transform:translateY(-1px);filter:brightness(1.06)}
CSS

log "✅ Theme CSS creado"

# 8) Generar Build y Deploy
log "📦 Instalando dependencias del proyecto..."
npm install

log "🔨 Construyendo proyecto..."
npm run build || { warn "Build script falló o no existe, intentando continuar..."; }

log "🚀 Desplegando en Vercel (Producción)..."
vercel --prod --yes

log "✅ PROCESO COMPLETADO. Tu sistema TRYONYOU está activo."
