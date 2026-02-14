#!/usr/bin/env python3
"""
TRYONYOU V9 - Script de Automatización de Deploy
Automatiza la configuración de Git y despliegue en Vercel

Este script:
- Configura el remoto de Git con autenticación (GITHUB_TOKEN)
- Asegura que la rama principal sea 'main'
- Crea/actualiza vercel.json
- Hace commit y push de cambios
- Verifica login de Vercel
- Despliega a producción en Vercel

Uso:
    export GITHUB_TOKEN="tu_token_aqui"
    python3 deploy_v9.py
"""

import os
import subprocess
from datetime import datetime
from pathlib import Path

REPO_URL = "https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git"

def run(cmd: str, check: bool = True):
    """Ejecuta un comando shell y muestra el progreso"""
    print(f"\n🚀 {cmd}")
    subprocess.run(cmd, shell=True, check=check)

def ensure_vercel_json():
    """Crea o actualiza vercel.json con la configuración correcta"""
    print("\n🌍 Checking vercel.json")
    
    # Si ya existe un vercel.json, lo dejamos como está
    if Path("vercel.json").exists():
        print("ℹ️ vercel.json ya existe, manteniendo configuración actual.")
        return
    
    # Si no existe, creamos uno con configuración básica
    print("📝 Creando vercel.json")
    vercel_json = """{
  "framework": "vite",
  "buildCommand": "CI=false npm run build",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
"""
    Path("vercel.json").write_text(vercel_json, encoding="utf-8")

def ensure_git_remote_https_with_token():
    """
    Usa GITHUB_TOKEN si existe para setear origin con auth.
    Si no existe, deja el origin normal y tú autenticas por git credential manager.
    
    NOTA: El token en la URL es temporal y solo existe durante la ejecución.
    Git puede mostrar logs con el token visible. Para mayor seguridad,
    considera usar SSH keys o Git credential helpers.
    """
    token = os.getenv("GITHUB_TOKEN", "").strip()

    # Quita origin si existe (no rompe si no existe)
    run("git remote remove origin", check=False)

    if token:
        # Importante: token en env, no hardcode
        # ADVERTENCIA: El token puede aparecer en logs de git (git remote -v)
        authed = REPO_URL.replace("https://", f"https://{token}@")
        run(f"git remote add origin {authed}")
        print("✅ origin configurado con GITHUB_TOKEN (temporal en env).")
        print("⚠️  NOTA: El token puede aparecer en 'git remote -v'. Para mayor seguridad usa SSH.")
    else:
        run(f"git remote add origin {REPO_URL}")
        print("ℹ️ No hay GITHUB_TOKEN. Usaré origin normal (te pedirá login/credential manager).")

def ensure_main_branch():
    """Asegura que la rama actual sea 'main'"""
    run("git branch -M main", check=False)

def commit_and_push():
    """Hace commit de cambios pendientes y push a origin/main"""
    print("\n📦 Commit + Push")
    run("git add -A")

    # Evita error si no hay cambios
    res = subprocess.run("git diff --cached --quiet", shell=True)
    if res.returncode == 0:
        print("ℹ️ No hay cambios para commitear.")
    else:
        ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
        run(f'git commit -m "V9 auto sync {ts}"')

    # push
    run("git push -u origin main")

def vercel_login_if_needed():
    """Verifica si el usuario está logueado en Vercel"""
    # Si no estás logueado, esto abrirá login
    run("vercel whoami", check=False)

def vercel_deploy_prod():
    """Despliega a producción en Vercel"""
    print("\n🚀 Deploying to Vercel (prod)")
    # --yes evita prompts; si falta auth te lo pedirá
    run("vercel --prod --yes")

def main():
    """Función principal que ejecuta todo el flujo de deployment"""
    print("\n🔥 TRYONYOU V9 AUTO FIX + DEPLOY\n")

    ensure_git_remote_https_with_token()
    ensure_main_branch()
    ensure_vercel_json()

    # Opcional: asegura dependencias y build local (si quieres)
    # run("npm install")
    # run("npm run build")

    commit_and_push()

    vercel_login_if_needed()
    vercel_deploy_prod()

    print("\n✅ TODO SINCRONIZADO Y DESPLEGADO\n")

if __name__ == "__main__":
    main()
