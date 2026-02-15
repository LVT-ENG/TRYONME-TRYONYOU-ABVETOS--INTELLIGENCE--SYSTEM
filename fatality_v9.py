import os
import json
import subprocess

def ejecutar_fatality():
    print("🦚 INICIANDO PROTOCOLO ULTIMATUM V9 (MANUS AI)...")

    # --- 1. CONFIGURACIÓN DEL ENTORNO BLINDADO ---
    env_content = """
VITE_GOOGLE_API_KEY="AIzaSyBuKZh-SJtXOi4lHE3bA_K437xcKL0a9RM"
VITE_PILOT_MODE="LAFAYETTE_ACTIVE"
VITE_ENVIRONMENT="production"
VITE_API_URL="https://tryonyou.app"
VERCEL_ORG_ID="team_SDhjSkxLVE7oJ3S5KPkwG9uC"
VERCEL_PROJECT_ID="prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4"
TELEGRAM_BOT_TOKEN="7052533162:AAH-DEPLOY-ABVETOS-T"
TELEGRAM_CHAT_ID="7868120279"
"""
    with open(".env", "w") as f: f.write(env_content.strip())
    print("✅ .env configurado.")

    # --- 2. RECONSTRUCCIÓN DEL FRONTEND (Vite + Espejo Pro) ---
    os.makedirs("src/components", exist_ok=True)
    with open("index.html", "w") as f:
        f.write("""

    <h1>TRYONYOU</h1>
    
    
    

""")

    # --- 3. RECONSTRUCCIÓN DEL BACKEND (Jules API) ---
    os.makedirs("api", exist_ok=True)
    with open("api/index.py", "w") as f:
        f.write("""
from http.server import BaseHTTPRequestHandler
import json
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"status": "V9_ACTIVE", "pilot": "Lafayette"}).encode())
""")

    # --- 4. DESPLIEGUE FORZADO A VERCEL ---
    print("🚀 LANZANDO A PRODUCCIÓN...")
    # Usamos npx para asegurar que use la versión más reciente del CLI
    subprocess.run("npx vercel --prod --yes --force --token PdIYWprsCNlI4Hyg8JGxH9kz", shell=True)

if __name__ == "__main__":
    ejecutar_fatality()
