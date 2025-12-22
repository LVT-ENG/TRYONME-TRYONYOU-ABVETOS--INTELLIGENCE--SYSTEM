#!/usr/bin/env python3
import os
import subprocess
import sys
from pathlib import Path

# ===============================
# CONFIGURACIÓN
# ===============================

REPO_NAME = "TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
EXPECTED_FILES = ["package.json", "vite.config.js", "src", "index.html"]

NODE_MIN_VERSION = 18

# ===============================
# UTILIDADES
# ===============================

def run(cmd, fatal=True):
    print(f"\n🧠 Ejecutando: {' '.join(cmd)}")
    result = subprocess.run(cmd, text=True)
    if result.returncode != 0:
        print(f"❌ Error ejecutando: {' '.join(cmd)}")
        if fatal:
            sys.exit(1)
    return result.returncode

def header(title):
    print("\n" + "="*60)
    print(title)
    print("="*60)

# ===============================
# PASO 0 — VALIDAR REPO
# ===============================

header("PASO 0 — Validar que estás en el repo correcto")

cwd = Path.cwd()
print(f"📁 Carpeta actual: {cwd}")

for f in EXPECTED_FILES:
    if not (cwd / f).exists():
        print(f"❌ Falta {f}. NO estás en el repo correcto.")
        sys.exit(1)

print("✅ Repo correcto detectado.")

# ===============================
# PASO 1 — VALIDAR NODE
# ===============================

header("PASO 1 — Validar versión de Node")

try:
    node_version = subprocess.check_output(["node", "-v"], text=True).strip()
    major = int(node_version.replace("v", "").split(".")[0])
    print(f"Node detectado: {node_version}")
    if major < NODE_MIN_VERSION:
        print("❌ Node demasiado antiguo.")
        sys.exit(1)
except Exception:
    print("❌ Node no está instalado.")
    sys.exit(1)

print("✅ Node OK.")

# ===============================
# PASO 2 — LIMPIEZA TOTAL
# ===============================

header("PASO 2 — Limpieza total del proyecto")

paths_to_remove = [
    "node_modules",
    "dist",
    ".vite",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock"
]

for p in paths_to_remove:
    if (cwd / p).exists():
        print(f"🧹 Eliminando {p}")
        run(["rm", "-rf", p], fatal=False)

run(["npm", "cache", "verify"], fatal=False)

print("✅ Limpieza completa.")

# ===============================
# PASO 3 — INSTALAR DEPENDENCIAS
# ===============================

header("PASO 3 — Instalación de dependencias")

ret = run(["npm", "install"], fatal=False)

if ret != 0:
    print("⚠️ Reintentando con --legacy-peer-deps")
    run(["npm", "install", "--legacy-peer-deps"])

print("✅ Dependencias instaladas.")

# ===============================
# PASO 4 — VALIDAR BUILD SCRIPT
# ===============================

header("PASO 4 — Validar script de build")

package_json = (cwd / "package.json").read_text()

if "vite build" not in package_json:
    print("⚠️ Script de build incorrecto detectado.")
    print("👉 Debe usar Vite. Corrige package.json manualmente así:")
    print("""
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
""")
    sys.exit(1)

print("✅ Script de build correcto.")

# ===============================
# PASO 5 — BUILD REAL
# ===============================

header("PASO 5 — Build de producción")

run(["npm", "run", "build"])

if not (cwd / "dist").exists():
    print("❌ No se generó /dist. Build inválido.")
    sys.exit(1)

print("✅ Build generado correctamente.")

# ===============================
# PASO 6 — PREVIEW LOCAL (OPCIONAL)
# ===============================

header("PASO 6 — Preview local (opcional)")

print("👉 Si quieres comprobar en local:")
print("   npm run preview")
print("   (abre http://localhost:4173)")

# ===============================
# PASO 7 — LISTO PARA DEPLOY
# ===============================

header("PASO 7 — LISTO PARA DEPLOY")

print("""
✅ El proyecto está:
- Limpio
- Con dependencias correctas
- Con build real
- Sin pantallas blancas por deps

👉 Ahora SOLO queda:
   vercel --prod
o
   git commit + git push (si Vercel está conectado)
""")

print("\n🎯 DEMO LISTA PARA PUBLICAR.")
