import json
import os
import time
import requests
from http.server import BaseHTTPRequestHandler

# --- USER PROVIDED CLASS ---
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
            if self.chat_id:
                requests.post(url, json={"chat_id": self.chat_id, "text": text, "parse_mode": "Markdown"})
            else:
                print("LAFAYETTE LOG: No chat_id provided, skipping Telegram notification.")
        except Exception as e:
            print(f"Error Sync: {e}")

# --- VERCEL HANDLER ---
class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            user_data = json.loads(body) if body else {}

            core = LafayetteIntelligence()
            result = core.run_biometric_scan(user_data)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

# --- LOCAL TEST BLOCK ---
if __name__ == "__main__":
    core = LafayetteIntelligence()
    # Simulación de entrada desde el espejo tm.manus.space
    result = core.run_biometric_scan({"height": 175, "weight": 70})
    print(json.dumps(result, indent=2, ensure_ascii=False))
