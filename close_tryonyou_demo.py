#!/usr/bin/env python3
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

# ===============================
# CONFIGURACIÓN
# ===============================

# Expected files/directories for repository validation
# Customize these for your specific project structure
EXPECTED_FILES = ["package.json", "vite.config.js", "src", "index.html"]

NODE_MIN_VERSION = 18

# ===============================
# UTILIDADES
# ===============================

def run(cmd, fatal=True):
    print(f"\n🧠 Ejecutando: {' '.join(cmd)}")
    result = subprocess.run(cmd, text=True, shell=False)
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
    # Parse version more robustly
    version_str = node_version.replace("v", "").strip()
    try:
        major = int(version_str.split(".")[0])
    except (ValueError, IndexError):
        print(f"❌ No se pudo parsear la versión de Node: {node_version}")
        sys.exit(1)
    
    print(f"Node detectado: {node_version}")
    if major < NODE_MIN_VERSION:
        print(f"❌ Node demasiado antiguo. Se requiere Node >={NODE_MIN_VERSION}, tienes {major}.")
        sys.exit(1)
except FileNotFoundError:
    print("❌ Node no está instalado.")
    sys.exit(1)
except subprocess.CalledProcessError as e:
    print(f"❌ Error al verificar Node: {e}")
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
    path = cwd / p
    if path.exists():
        print(f"🧹 Eliminando {p}")
        try:
            if path.is_dir():
                shutil.rmtree(path)
            else:
                path.unlink()
        except Exception as e:
            print(f"⚠️ No se pudo eliminar {p}: {e}")

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

try:
    with open(cwd / "package.json", 'r') as f:
        package_json = json.load(f)
    
    build_script = package_json.get("scripts", {}).get("build", "")
    
    # Check if the build script is exactly "vite build" or starts with "vite build "
    # This allows for "vite build --flag" but not "my-vite build"
    if not (build_script.strip() == "vite build" or build_script.startswith("vite build ")):
        print("⚠️ Script de build incorrecto detectado.")
        print(f"   Script actual: '{build_script}'")
        print("👉 Debe usar Vite. Corrige package.json manualmente así:")
        print("""
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
""")
        sys.exit(1)
except (json.JSONDecodeError, KeyError, IOError) as e:
    print(f"❌ Error al leer package.json: {e}")
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
