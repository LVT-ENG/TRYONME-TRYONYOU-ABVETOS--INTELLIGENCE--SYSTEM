from http.server import BaseHTTPRequestHandler
import json
import os
import sys
import time
import requests

# Ensure core modules are accessible
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.agent_executor import AgentExecutor

# --- LAFAYETTE INTELLIGENCE (MATCH LOGIC) ---
class LafayetteIntelligence:
    def __init__(self):
        # Configuración de entorno y seguridad
        self.token = os.environ.get("VITE_TELEGRAM_TOKEN")
        self.chat_id = os.environ.get("LAFAYETTE_CHAT_ID")

        # Base de datos de la Colección Divineo '26
        self.catalog = [
            {
                "id": "burberry_trench",
                "name": "Burberry Trench Haussmann",
                "match": "98.5%",
                "asset": "trench_haussmann.glb",
                "msg_fr": "Cette pièce souligne l'élégance de votre silhouette."
            }
        ]

    def run_biometric_scan(self, user_data):
        """
        Ejecuta el escaneo invisible sin mostrar números ni tallas.
        """
        print("LAFAYETTE JIT PROTOCOL // LIVE: ANALYSING BIOMETRICS...")

        # Simulación de 'Slow Tech' (1.5s) para visualización progresiva
        # Note: In Vercel serverless functions, sleep consumes execution time but is allowed.
        # Ideally, we should avoid it for cost, but for demo fidelity we keep it.
        time.sleep(1.5)

        recommendation = self.catalog[0]
        self._notify_store(recommendation)

        return {
            "type": "SCAN_COMPLETE",
            "payload": {
                "fit_score": recommendation["match"],
                "pau_message": recommendation["msg_fr"],
                "asset_url": recommendation["asset"],
                "status": "SYSTEM_ONLINE"
            }
        }

    def _notify_store(self, item):
        """Envía notificación al equipo de tienda vía Telegram."""
        url = f"https://api.telegram.org/bot{self.token}/sendMessage"
        text = f"🌟 **Nouveau Match Haussmann**\nProduit: {item['name']}\nAjustement: {item['match']}"
        try:
            if self.chat_id and self.token:
                requests.post(url, json={"chat_id": self.chat_id, "text": text, "parse_mode": "Markdown"})
            else:
                print("LAFAYETTE LOG: No chat_id/token provided, skipping Telegram notification.")
        except Exception as e:
            print(f"Error Sync: {e}")

# --- MAIN DISPATCHER HANDLER ---
# Initialize Executor globally to reuse across invocations if container is warm
# Note: Variables de entorno might need to be re-read if they change, but in Lambda they are static per env.
executor = AgentExecutor()

class handler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Patent-ID")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        # Simple health check
        self._set_headers()
        self.wfile.write(json.dumps({
            "status": "TRYONYOU BRAIN ONLINE",
            "provider": "Google Platform (Antigravity)",
            "ai_ready": executor.model_active
        }).encode('utf-8'))

    def do_POST(self):
        # Get content
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                body = self.rfile.read(content_length)
                data = json.loads(body)
            else:
                data = {}
        except Exception as e:
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "Invalid JSON"}).encode('utf-8'))
            return

        # Routing based on self.path
        # Vercel rewrites /api/foo to /api/index.py?path=/api/foo or similar depending on setup.
        # But usually self.path preserves the original URL if using rewrites correctly.
        # However, in Vercel Python runtime, self.path usually reflects the request path.

        path = self.path

        # Normalize path (remove query params for matching)
        if '?' in path:
            path = path.split('?')[0]

        try:
            if path.endswith('/match'):
                # Handle Biometric Match
                core = LafayetteIntelligence()
                result = core.run_biometric_scan(data)
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode('utf-8'))

            elif path.endswith('/ask-pau'):
                # Handle PAU Agent
                result = executor.run_expert("agent_01_pau_assistant", data)
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode('utf-8'))

            else:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": f"Route {path} not found"}).encode('utf-8'))

        except Exception as e:
            print(f"SERVER ERROR: {e}")
            self._set_headers(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
