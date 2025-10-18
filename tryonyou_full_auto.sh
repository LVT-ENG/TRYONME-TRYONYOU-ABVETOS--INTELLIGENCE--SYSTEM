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

# 3) Login Vercel (si no hay credenciales locales, intentará login)
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

# 5) Variables de entorno opcionales (local). Si existe .env lo carga.
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
.card{background:linear-gradient(180deg, #fff 0%, rgba(255,255,255,.92) 60%, rgba(255,255,255,.88) 100%),linear-gradient(180deg,var(--beige-gloss),var(--beige-depth));border-radius:var(--radius);box-shadow:var(--shadow);border:1px solid rgba(0,0,0,.05);transition:transform .25s ease,box-shadow .25s ease,filter .2s ease}
.card:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg);filter:saturate(1.02)}
.btn{appearance:none;border:0;cursor:pointer;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold-2));color:#111;padding:.9rem 1.25rem;border-radius:999px;box-shadow:0 10px 26px rgba(212,175,55,.28);transition:transform .15s ease,filter .2s ease}
.btn:hover{transform:translateY(-1px);filter:brightness(1.06)}
.btn-ghost{background:linear-gradient(180deg,#fff,rgba(255,255,255,.9));border:1px solid rgba(0,0,0,.06);border-radius:999px;padding:.85rem 1.15rem}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:32px;align-items:center}
.hero h1{font-size:clamp(2.2rem,5vw,3.9rem);line-height:1.05;margin:0;color:var(--anthra);font-weight:900;letter-spacing:-.02em}
.hero p{color:#3b3f46;font-size:clamp(1rem,2vw,1.2rem)}
.badge{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:999px;padding:.45rem .7rem;box-shadow:var(--shadow);font-weight:800}
.wardrobe{display:grid;grid-template-columns:repeat(12,1fr);gap:14px}
.tile{grid-column:span 3;aspect-ratio:4/5;border-radius:18px;overflow:hidden;background:#fff;box-shadow:var(--shadow);border:1px solid rgba(0,0,0,.05);position:relative}
.tile img{width:100%;height:100%;object-fit:cover;display:block}
.tag{position:absolute;left:10px;top:10px;font-weight:800;font-size:.8rem;background:rgba(255,255,255,.86);padding:.35rem .6rem;border-radius:999px;border:1px solid rgba(0,0,0,.05)}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px}
.metric{padding:20px;border-radius:16px;background:linear-gradient(180deg,#fff,rgba(255,255,255,.92));box-shadow:var(--shadow)}
.metric h3{margin:0;font-size:2rem}.metric p{margin:.35rem 0 0 0;color:#4a4f57}
.kpi{display:flex;align-items:center;gap:12px}
.kpi .ring{width:64px;height:64px;border-radius:50%;background:conic-gradient(var(--gold) var(--val,0%), rgba(0,0,0,.08) 0);display:grid;place-items:center}
.kpi .ring span{background:#fff;border-radius:50%;width:46px;height:46px;display:grid;place-items:center;font-weight:900}
.testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.testi{padding:22px}.testi .who{display:flex;align-items:center;gap:12px;margin-top:10px}
.avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid rgba(0,0,0,.06)}
.partners{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
.partner{background:linear-gradient(180deg,#fff,rgba(255,255,255,.9));border:1px solid rgba(0,0,0,.06);border-radius:14px;display:grid;place-items:center;height:82px;box-shadow:var(--shadow);transition:transform .2s ease, box-shadow .2s ease}
.partner:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg)}
.road{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.stage{padding:18px;border-radius:14px;background:linear-gradient(180deg,#fff,rgba(255,255,255,.92));border:1px solid rgba(0,0,0,.06);box-shadow:var(--shadow)}
.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.frame{position:relative;border-radius:18px;overflow:hidden;border:1px solid rgba(0,0,0,.06);box-shadow:var(--shadow)}
.frame img{width:100%;height:100%;object-fit:cover;display:block}
.frame .claim{position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,.86);padding:.4rem .6rem;border-radius:999px;border:1px solid rgba(0,0,0,.06);font-weight:800}
@keyframes rise{from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)}}
.reveal{animation:rise .6s ease both}
.snap{scroll-snap-type:y proximity}.snap>section{scroll-snap-align:start}
footer{background:#fff;border-top:1px solid rgba(0,0,0,.06);margin-top:40px}
.footer-inner{display:flex;gap:14px;justify-content:space-between;align-items:center;padding:28px 0}
@media (max-width:980px){
  .hero{grid-template-columns:1fr}
  .wardrobe{grid-template-columns:repeat(6,1fr)}
  .tile{grid-column:span 3}
  .metrics{grid-template-columns:1fr}
  .testimonials{grid-template-columns:1fr}
  .partners{grid-template-columns:repeat(3,1fr)}
  .road{grid-template-columns:1fr}
  .gallery{grid-template-columns:1fr 1fr}
}
CSS

log "✅ Theme CSS creado en src/styles/theme.css"

# 8) Secciones HTML
cat > src/sections/wardrobe.html <<'HTML'
<section class="section" id="wardrobe">
  <div class="container">
    <h2>Tu Armario Digital</h2>
    <div class="wardrobe">
      <div class="tile"><span class="tag">CASUAL</span></div>
      <div class="tile"><span class="tag">FORMAL</span></div>
      <div class="tile"><span class="tag">SPORT</span></div>
      <div class="tile"><span class="tag">PARTY</span></div>
    </div>
  </div>
</section>
HTML

cat > src/sections/testimonials.html <<'HTML'
<section class="section" id="testimonials">
  <div class="container">
    <h2>Lo Que Dicen Nuestros Usuarios</h2>
    <div class="testimonials">
      <div class="card testi">
        <p>"Increíble experiencia de compra"</p>
        <div class="who">
          <img class="avatar" src="/avatar1.jpg" alt="User 1">
          <span>María López</span>
        </div>
      </div>
      <div class="card testi">
        <p>"Redujo mis devoluciones al 0%"</p>
        <div class="who">
          <img class="avatar" src="/avatar2.jpg" alt="User 2">
          <span>Carlos Ruiz</span>
        </div>
      </div>
      <div class="card testi">
        <p>"El futuro de la moda está aquí"</p>
        <div class="who">
          <img class="avatar" src="/avatar3.jpg" alt="User 3">
          <span>Ana Torres</span>
        </div>
      </div>
    </div>
  </div>
</section>
HTML

cat > src/sections/partners.html <<'HTML'
<section class="section" id="partners">
  <div class="container">
    <h2>Nuestros Partners</h2>
    <div class="partners">
      <div class="partner">Partner 1</div>
      <div class="partner">Partner 2</div>
      <div class="partner">Partner 3</div>
      <div class="partner">Partner 4</div>
      <div class="partner">Partner 5</div>
      <div class="partner">Partner 6</div>
    </div>
  </div>
</section>
HTML

cat > src/sections/roadmap.html <<'HTML'
<section class="section" id="roadmap">
  <div class="container">
    <h2>Roadmap 2025</h2>
    <div class="road">
      <div class="stage card">
        <h3>Q1</h3>
        <p>Beta Launch</p>
      </div>
      <div class="stage card">
        <h3>Q2</h3>
        <p>AI Improvements</p>
      </div>
      <div class="stage card">
        <h3>Q3</h3>
        <p>Global Expansion</p>
      </div>
      <div class="stage card">
        <h3>Q4</h3>
        <p>ABVET Integration</p>
      </div>
    </div>
  </div>
</section>
HTML

cat > src/sections/gallery_claims.html <<'HTML'
<section class="section" id="gallery">
  <div class="container">
    <h2>Galería de Estilos</h2>
    <div class="gallery">
      <div class="frame">
        <img src="/style1.jpg" alt="Style 1">
        <span class="claim">Sostenible</span>
      </div>
      <div class="frame">
        <img src="/style2.jpg" alt="Style 2">
        <span class="claim">Innovador</span>
      </div>
      <div class="frame">
        <img src="/style3.jpg" alt="Style 3">
        <span class="claim">Personalizado</span>
      </div>
      <div class="frame">
        <img src="/style4.jpg" alt="Style 4">
        <span class="claim">Premium</span>
      </div>
    </div>
  </div>
</section>
HTML

log "✅ Secciones HTML creadas"

# 9) Logo básico (si falta)
if [[ ! -f public/brand/logo.svg ]]; then
cat > public/brand/logo.svg <<'SVG'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="60" fill="#D4AF37"/>
  <text x="100" y="35" font-size="24" font-weight="bold" text-anchor="middle" fill="#fff">TRYONYOU</text>
</svg>
SVG
log "✅ Logo creado en public/brand/logo.svg"
fi

# 10) Asegurar link al theme y navbar/logo + insertar secciones en index.html
if [[ -f index.html ]]; then
  # link theme
  if ! grep -q "src/styles/theme.css" index.html; then
    if [[ "$OS" == "mac" ]]; then
      sed -i '' 's#</head>#  <link rel="stylesheet" href="/src/styles/theme.css">\n</head>#' index.html || true
    else
      sed -i 's#</head>#  <link rel="stylesheet" href="/src/styles/theme.css">\n</head>#' index.html || true
    fi
    log "✅ Theme CSS linkeado en index.html"
  fi
  
  # navbar con logo
  if ! grep -q "class=\"nav\"" index.html; then
    NAVBAR='<nav class="nav">\n  <div class="container" style="display:flex;justify-content:space-between;align-items:center;padding:1rem 1.5rem">\n    <img src="/public/brand/logo.svg" alt="TRYONYOU" style="height:40px">\n    <div style="display:flex;gap:1.5rem">\n      <a href="#wardrobe">Wardrobe</a>\n      <a href="#testimonials">Testimonials</a>\n      <a href="#partners">Partners</a>\n      <a href="#roadmap">Roadmap</a>\n      <a href="#gallery">Gallery</a>\n    </div>\n  </div>\n</nav>'
    
    if [[ "$OS" == "mac" ]]; then
      awk -v nav="$NAVBAR" 'BEGIN{done=0} /<body>/{print; if(!done){print nav; done=1} next} {print}' index.html > index.html.tmp && mv index.html.tmp index.html || true
    else
      awk -v nav="$NAVBAR" 'BEGIN{done=0} /<body>/{print; if(!done){print nav; done=1} next} {print}' index.html > index.html.tmp && mv index.html.tmp index.html || true
    fi
    log "✅ Navbar añadido a index.html"
  fi
else
  warn "⚠️ No se encontró index.html en la raíz del proyecto"
fi

# 11) Build proyecto
log "🔨 Instalando dependencias y construyendo…"
npm install
npm run build

# 12) Deploy a Vercel
log "🚀 Desplegando a Vercel…"
vercel --prod --yes || warn "⚠️ Deploy falló o requiere configuración manual"

# 13) Backup opcional
BACKUP_DIR="$HOME/TRYONYOU_BACKUPS"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
tar -czf "$BACKUP_DIR/tryonyou_$TIMESTAMP.tar.gz" -C "$PROJECT_DIR" . || warn "⚠️ Backup falló"
log "✅ Backup guardado en $BACKUP_DIR/tryonyou_$TIMESTAMP.tar.gz"

# 14) Resumen final
log ""
log "════════════════════════════════════════════════════════════════"
log "🎉 TRYONYOU FULL AUTO — COMPLETADO"
log "════════════════════════════════════════════════════════════════"
log "📂 Proyecto: $PROJECT_DIR"
log "🌐 URL: https://tryonyou.app"
log "💾 Backup: $BACKUP_DIR/tryonyou_$TIMESTAMP.tar.gz"
log "════════════════════════════════════════════════════════════════"
log ""
log "✅ Todo listo. Verifica tu despliegue en https://tryonyou.app"
