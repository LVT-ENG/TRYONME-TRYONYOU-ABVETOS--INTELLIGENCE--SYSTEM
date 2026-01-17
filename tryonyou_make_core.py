#!/usr/bin/env python3
import zipfile, shutil, os, json
from pathlib import Path

# ==================================================
# CONFIGURACIÓN FINAL
# ==================================================
WORKDIR = Path("build_tryonyou_final")
OUT = Path("tryonyou-core")

ZIPS = [
    "/mnt/data/tryonyou_supercommit_pro (1).zip",
    "/mnt/data/TRYONYOU_PILOTO_LAFAYETTE.zip",
    "/mnt/data/tryonyou_system_v8_hybrid.zip",
    "/mnt/data/jules_session_16240564798049457374.zip",
]

DIVINEO_CSS = "/mnt/data/180dbda6-0ebd-4c7a-a9bb-8dba7c1a4f3b.css"

# ==================================================
# HELPERS
# ==================================================
def log(msg):
    print(f"[TRYONYOU] {msg}")

def unzip(z, target):
    log(f"Unzipping {z}")
    with zipfile.ZipFile(z, "r") as f:
        f.extractall(target)

def copy(src, dst):
    if not src.exists():
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True)
    else:
        shutil.copy2(src, dst)

# ==================================================
# LIMPIEZA
# ==================================================
if WORKDIR.exists(): shutil.rmtree(WORKDIR)
if OUT.exists(): shutil.rmtree(OUT)
WORKDIR.mkdir()
OUT.mkdir()

# ==================================================
# DESCOMPRESIÓN TOTAL
# ==================================================
for z in ZIPS:
    unzip(z, WORKDIR)

# ==================================================
# ESTRUCTURA CANÓNICA
# ==================================================
CORE_DIRS = [
    "src/experience",
    "src/domain",
    "src/telemetry",
    "src/narrative",
    "src/system",
    "src/ui",
    "src/styles",
    "api",
    "assets",
    "docs",
    "scripts"
]

for d in CORE_DIRS:
    (OUT / d).mkdir(parents=True, exist_ok=True)

# ==================================================
# EXTRACCIÓN DE VALUE CODE
# ==================================================
for root, dirs, files in os.walk(WORKDIR):
    p = Path(root)

    # EXPERIENCIA (UX)
    if "VirtualMirror.jsx" in files:
        copy(p / "VirtualMirror.jsx", OUT / "src/experience/VirtualMirror.jsx")

    if "LandingPage.jsx" in files:
        copy(p / "LandingPage.jsx", OUT / "src/experience/LandingPage.jsx")

    # BACKEND (JULES + HYBRID)
    if p.name.lower() in ["jules", "automation", "api"]:
        copy(p, OUT / "api")

    # ASSETS
    if p.name.lower() in ["assets", "video", "branding", "lafayette"]:
        copy(p, OUT / "assets")

    # SCRIPTS
    if "supercommit" in p.name.lower():
        copy(p, OUT / "scripts")

    # DOCUMENTACIÓN
    if p.suffix == ".md":
        copy(p, OUT / "docs" / p.name)

# ==================================================
# STYLES (DIVINEO V7)
# ==================================================
if os.path.exists(DIVINEO_CSS):
    shutil.copy2(DIVINEO_CSS, OUT / "src/styles/global.css")

# ==================================================
# FEATURE FLAGS (PILOTOS → CONFIG)
# ==================================================
flags = {
    "RETAIL_LAFAYETTE": True,
    "SYSTEM_V8_HYBRID": True,
    "JULES_AGENT": True,
    "INVESTOR_MODE": False,
    "ADVANCED_SCAN": False
}

(OUT / "src/system/feature_flags.json").write_text(
    json.dumps(flags, indent=2)
)

# ==================================================
# APP ENTRYPOINT
# ==================================================
(OUT / "src/app.tsx").write_text("""
import React from 'react';
import './styles/global.css';

export default function App() {
  return (
    <div>
      <h1>TRYONYOU</h1>
      <p>Nadie quiere probarse 500 pantalones. Todos quieren saber cuál es el suyo.</p>
    </div>
  );
}
""")

# ==================================================
# README FINAL
# ==================================================
(OUT / "README.md").write_text("""
# TRYONYOU CORE — PRODUCCIÓN

Proyecto canónico consolidado desde TODOS los sistemas y pilotos.

## Ejecutar local
npm install
npm run dev

## Desplegar
vercel --prod

## Dominio
Configurar tryonyou.app en Vercel Dashboard.

## Flags
src/system/feature_flags.json
""")

log("🔥 CONSOLIDACIÓN FINAL COMPLETADA")
log("Siguiente:")
log("cd tryonyou-core")
log("npm install && npm run dev")
