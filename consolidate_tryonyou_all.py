#!/usr/bin/env python3
import zipfile, shutil, os, json
from pathlib import Path

# ===============================
# CONFIG
# ===============================
WORKDIR = Path("build_tryonyou")
OUT = Path("tryonyou-core")

ZIPS = [
    "/mnt/data/SUPERCOMMIT_MAX_COMPLETE_V1.zip",
    "/mnt/data/DIVINEO_PILOTO_LAFAYETTE_ASSETS.zip",
    "/mnt/data/TRYONYOU_PILOTO_LAFAYETTE.zip",
    "/mnt/data/Archivo 2.zip",
    "/mnt/data/jules_session_16240564798049457374.zip",
]

DIVINEO_CSS = "/mnt/data/180dbda6-0ebd-4c7a-a9bb-8dba7c1a4f3b.css"

# ===============================
# HELPERS
# ===============================
def log(msg): print(f"[TRYONYOU] {msg}")

def unzip(zip_path, target):
    log(f"Unzipping {zip_path}")
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(target)

def copy(src, dst):
    if not src.exists(): return
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True)
    else:
        shutil.copy2(src, dst)

# ===============================
# CLEAN
# ===============================
if WORKDIR.exists(): shutil.rmtree(WORKDIR)
if OUT.exists(): shutil.rmtree(OUT)
WORKDIR.mkdir()
OUT.mkdir()

# ===============================
# UNZIP ALL
# ===============================
for z in ZIPS:
    unzip(z, WORKDIR)

# ===============================
# CORE STRUCTURE
# ===============================
STRUCTURE = [
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

for d in STRUCTURE:
    (OUT / d).mkdir(parents=True, exist_ok=True)

# ===============================
# WALK & EXTRACT VALUE CODE
# ===============================
for root, dirs, files in os.walk(WORKDIR):
    p = Path(root)

    # FRONTEND VALUE
    if "VirtualMirror.jsx" in files:
        copy(p / "VirtualMirror.jsx", OUT / "src/experience/VirtualMirror.jsx")

    if "LandingPage.jsx" in files:
        copy(p / "LandingPage.jsx", OUT / "src/experience/LandingPage.jsx")

    # BACKEND (JULES)
    if p.name.lower() in ["automation", "jules", "api"]:
        copy(p, OUT / "api")

    # ASSETS
    if p.name in ["assets", "video", "branding"]:
        copy(p, OUT / "assets")

    # SCRIPTS
    if "supercommit" in p.name.lower():
        copy(p, OUT / "scripts")

    # DOCS
    if p.suffix == ".md":
        copy(p, OUT / "docs" / p.name)

# ===============================
# STYLES
# ===============================
if os.path.exists(DIVINEO_CSS):
    shutil.copy2(DIVINEO_CSS, OUT / "src/styles/global.css")

# ===============================
# FEATURE FLAGS
# ===============================
flags = {
    "RETAIL_LAFAYETTE": True,
    "INVESTOR_DEMO": True,
    "JULES_AGENT": True,
    "ADVANCED_SCAN": False
}

(OUT / "src/system/feature_flags.json").write_text(
    json.dumps(flags, indent=2)
)

# ===============================
# APP ENTRY
# ===============================
(OUT / "src/app.tsx").write_text("""
import React from 'react';
import './styles/global.css';

export default function App() {
  return (
    <div>
      <h1>TRYONYOU</h1>
      <p>No hagas cola. No generes basura.</p>
    </div>
  );
}
""")

# ===============================
# README
# ===============================
(OUT / "README.md").write_text("""
# TRYONYOU CORE

Proyecto canónico consolidado desde todos los pilotos y entregas finales.

## Local
npm install
npm run dev

## Deploy
vercel --prod

## Dominio
Configurar tryonyou.app en Vercel Dashboard.
""")

log("✅ CONSOLIDATION COMPLETE")
log("Next steps:")
log("cd tryonyou-core")
log("npm install && npm run dev")
