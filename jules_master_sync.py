import os
import subprocess
import time
import datetime
import sys

# CONFIG
REPO_ROOT = os.getcwd()
INTERVAL_HOURS = 3
COMMIT_MESSAGE_TEMPLATE = "🔥 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — SuperCommit MAX [{timestamp}]"

def run_command(command, shell=True):
    """Ejecuta un comando de shell y maneja errores."""
    try:
        result = subprocess.run(command, shell=shell, check=True, text=True, capture_output=True)
        print(f"✅ Success: {command}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Error executing: {command}\nSTDERR: {e.stderr}")
        return None

def verify_structure():
    """Verifica la existencia de directorios críticos."""
    required_dirs = [
        "docs/arquitectura_empresa",
        "docs/patent_EPCT",
        "docs/investor_edition",
        "public/assets/hero",
        "public/assets/modules",
        "public/assets/investor",
        "public/assets/vision",
        "src/modules",
        "src/components",
        "src/pages"
    ]
    print("📁 Verificando estructura de directorios...")
    for d in required_dirs:
        path = os.path.join(REPO_ROOT, d)
        if not os.path.exists(path):
            print(f"   -> Creando: {d}")
            os.makedirs(path, exist_ok=True)
        else:
            print(f"   -> OK: {d}")

def clean_legacy():
    """Limpia archivos y carpetas obsoletos."""
    legacy_paths = [
        "node_modules", "dist", "legacy_old", "temp_old",
        "apps/web-old", "tests-old", "legacy", "integrations/duplicados"
    ]
    print("🧹 Ejecutando limpieza destructiva (Legacy)...")
    for p in legacy_paths:
        full_path = os.path.join(REPO_ROOT, p)
        if os.path.exists(full_path):
            run_command(f"rm -rf {full_path}")

def super_commit():
    """Ejecuta el flujo de SuperCommit."""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 1. Limpieza
    clean_legacy()

    # 2. Verificar Estructura
    verify_structure()

    # 3. Instalación Fresca (Opcional, puede ser lento en bucle)
    # print("📦 Reinstalando dependencias...")
    # run_command("npm install")

    # 4. Git Add All
    print("➕ Añadiendo archivos al staging...")
    run_command("git add .")

    # 5. Commit
    message = COMMIT_MESSAGE_TEMPLATE.format(timestamp=timestamp)
    print(f"💎 Generando Commit: {message}")
    # Usamos || true para no fallar si no hay cambios
    run_command(f'git commit -m "{message}" || true')

    # 6. Push
    print("🚀 Enviando a origin main...")
    run_command("git push origin main")

    # 7. Deploy Trigger (si existe script)
    if os.path.exists("scripts/super_deploy.sh"):
        print("🌐 Triggering Deploy Script...")
        run_command("bash scripts/super_deploy.sh")

def main_loop():
    print(f"🎬 JULES MASTER SYNC INITIATED. Interval: {INTERVAL_HOURS} hours.")

    # Ejecución inmediata inicial
    super_commit()

    # Bucle (comentado para evitar bloqueo en este entorno interactivo,
    # pero listo para producción)
    # while True:
    #     time.sleep(INTERVAL_HOURS * 3600)
    #     super_commit()

if __name__ == "__main__":
    main_loop()
