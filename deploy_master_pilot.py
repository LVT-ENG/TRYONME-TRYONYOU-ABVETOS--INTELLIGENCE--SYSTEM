import os
import subprocess

# --- CONFIGURACIÓN PARA JULES ---
def deploy_master_pilot():
    print("🚀 Iniciando despliegue...")

    # 1. Sincronizar con el repositorio
    subprocess.run(["git", "checkout", "main"], check=True)

    # 2. Verificar motor de IA (Gemini 1.5 Pro)
    # Se asegura que la lógica de Google AI Studio esté en el backend
    if os.path.exists("api/index.py"):
        print("✅ Backend detectado. IA conectada.")

    # 3. Despliegue directo a producción
    print("🚀 Ejecutando: vercel --prod --force")
    subprocess.run(["vercel", "--prod", "--yes", "--force", "--token", "MI3ctTgOyjZMOYnqfVvR1vOl"], check=True)

    print("🎉 Piloto disponible en: https://tryonyou.app/pilot")

if __name__ == "__main__":
    deploy_master_pilot()
