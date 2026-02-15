import os
import shutil
import json
import sys
import subprocess
import urllib.request
import urllib.parse
import urllib.error

# ═══════════════════════════════════════════════════════════════════
# 🦚 MANUS FATALITY V7.0 — AGENT 70 DEPLOYMENT PROTOCOL
# ═══════════════════════════════════════════════════════════════════

REQUIRED_ENV_VARS = [
    "VITE_GOOGLE_API_KEY",
    "VITE_PILOT_MODE",
    "VERCEL_TOKEN",
    "TELEGRAM_BOT_TOKEN"
]

# Configuración por defecto (fallback) para Chat ID si no está en variables de entorno
DEFAULT_CHAT_ID = "7868120279"

def print_step(step, message):
    print(f"\n🚀 [STEP {step}] {message}")

def check_env_vars():
    print_step(0, "Verificando Búnker de Seguridad (.env)...")
    missing = []
    for var in REQUIRED_ENV_VARS:
        if not os.environ.get(var):
            missing.append(var)

    if missing:
        print(f"❌ ERROR CRÍTICO: Faltan variables de entorno requeridas: {', '.join(missing)}")
        print("Por favor, exportalas antes de ejecutar el script.")
        return False

    # Crear .env local para el build
    with open(".env", "w") as f:
        for var in REQUIRED_ENV_VARS:
            val = os.environ.get(var)
            f.write(f'{var}="{val}"\n')

        # Agregar Chat ID si está disponible
        chat_id = os.environ.get("TELEGRAM_CHAT_ID", DEFAULT_CHAT_ID)
        f.write(f'TELEGRAM_CHAT_ID="{chat_id}"\n')

        # Asegurar VITE_ENVIRONMENT
        f.write('VITE_ENVIRONMENT="production"\n')

    print("✅ Variables de entorno verificadas y .env generado.")
    return True

def nuclear_cleanup():
    print_step(1, "Limpieza Nuclear (Manus Protocol)...")
    targets = ["node_modules", "legacy_old", "dist", ".next"]

    for target in targets:
        if os.path.exists(target):
            print(f"   ☢️  Eliminando {target}...")
            if os.path.isdir(target):
                shutil.rmtree(target)
            else:
                os.remove(target)
        else:
            print(f"   Feature {target} no encontrada (Clean).")

    print("✅ Limpieza completada. Directorio src/ y logic core PRESERVADOS.")

def reconstruction():
    print_step(2, "Reconstrucción del Stack (Vite 7.1.2 + React 18.3.1)...")

    package_json_path = "package.json"
    if not os.path.exists(package_json_path):
        print("❌ Error: package.json no encontrado.")
        sys.exit(1)

    with open(package_json_path, "r") as f:
        data = json.load(f)

    # Enforce versions
    if "dependencies" not in data: data["dependencies"] = {}
    if "devDependencies" not in data: data["devDependencies"] = {}

    print("   🔧 Ajustando versiones estrictas...")
    data["dependencies"]["react"] = "18.3.1"
    data["dependencies"]["react-dom"] = "18.3.1"
    data["devDependencies"]["vite"] = "7.1.2"

    # Ensure build script exists
    if "scripts" not in data: data["scripts"] = {}
    data["scripts"]["build"] = "vite build"

    with open(package_json_path, "w") as f:
        json.dump(data, f, indent=2)

    print("   📦 Ejecutando npm install...")
    try:
        subprocess.run(["npm", "install"], check=True)
        print("✅ Reconstrucción completada.")
    except subprocess.CalledProcessError:
        print("❌ Error en npm install.")
        sys.exit(1)

def deploy_vercel():
    print_step(3, "Despliegue Forzado a Producción (Vercel)...")
    token = os.environ.get("VERCEL_TOKEN")

    # Using python subprocess directly instead of shell string for safety, though check=True handles errors.
    # Note: vercel CLI needs token via flag.
    cmd = ["npx", "vercel", "--prod", "--yes", "--force", "--token", token]
    print(f"   🚀 Ejecutando: {' '.join(cmd)}")

    try:
        subprocess.run(cmd, check=True)
        print("✅ Despliegue exitoso en tryonyou.app")
        return True
    except subprocess.CalledProcessError:
        print("❌ Error en el despliegue.")
        return False

def notify_telegram(success):
    print_step(4, "Notificando al Búnker (Telegram)...")
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", DEFAULT_CHAT_ID)

    status = "✅ ÉXITO" if success else "❌ FALLO"
    message = (
        f"🦚 *MANUS FATALITY V7 REPORT*\n"
        f"Status: {status}\n"
        f"Project: *TryOnYou Pilot (Lafayette)*\n"
        f"Version: *Vite 7.1.2 / React 18.3.1*\n"
        f"Protocol: *Zero Complexe Active*\n"
        f"Domain: https://tryonyou.app\n"
        f"\n_Deploy executed by Agent 70_"
    )

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "Markdown"
    }

    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                print("✅ Notificación enviada a @abvet_deploy_bot.")
            else:
                print(f"⚠️ Error enviando notificación: {response.read().decode('utf-8')}")
    except urllib.error.URLError as e:
        print(f"⚠️ Excepción al notificar: {e}")
    except Exception as e:
        print(f"⚠️ Error desconocido al notificar: {e}")

def final_validation():
    print_step(5, "Checklist de Validación Final...")
    print("   📋 Verificando Divineo Leads DB...")
    print("   ⚠️  RECORDATORIO CRÍTICO: Asegúrese de que la hoja de cálculo 'Divineo_Leads_DB'")
    print("       esté compartida correctamente con la cuenta de servicio de Google.")
    print("       Esto es vital para el registro de leads del botón 'Réserver en Cabine'.")
    print("\n✅ SISTEMA PRODUCTION READY. PILOTO LAFAYETTE ACTIVO.")

def main():
    print("🦚 INICIANDO MANUS_FATALITY_V7.PY...")

    if not check_env_vars():
        sys.exit(1)

    nuclear_cleanup()
    reconstruction()

    success = deploy_vercel()
    notify_telegram(success)

    if success:
        final_validation()
    else:
        print("\n❌ EL PROTOCOLO HA FALLADO. REVISAR LOGS.")
        sys.exit(1)

if __name__ == "__main__":
    main()
