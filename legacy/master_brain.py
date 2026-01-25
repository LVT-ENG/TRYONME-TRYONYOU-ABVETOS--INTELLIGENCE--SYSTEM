import json
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

# --- CONFIGURACIÓN ESTRATÉGICA ---
CONTACTO_INVERSION = "invest@abvetos-intelligence.com"
PATENTE = "PCT/EP2025/067317"
SIREN = "943610196"
INVENTOR = "Ruben Espinar Rodriguez"
VALORACION = "120M - 400M EUR"

def get_investor_data():
    return {
        "status": "Raising Seed/Series A",
        "valuation_cap": VALORACION,
        "patent_id": PATENTE,
        "legal_entity": f"SIREN {SIREN}",
        "inquiries": CONTACTO_INVERSION,
        "next_milestone": "Lafayette Pilot Expansion",
        "founder": INVENTOR
    }

class TryOnYouOrchestrator(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def do_GET(self):
        # RUTA PARA INVERSORES
        if self.path == '/invest':
            self._set_headers()
            self.wfile.write(json.dumps(get_investor_data()).encode())
        
        # RUTA PARA LOOKER STUDIO
        elif self.path == '/api/stats':
            self._set_headers()
            db_mock = [{
                "fecha": time.strftime("%Y-%m-%d"),
                "usuario_id": "LAF-DEMO-01",
                "altura_m": 1.82,
                "hombros_cm": 46.0,
                "talla": "L (SLIM FIT)",
                "patente": PATENTE
            }]
            self.wfile.write(json.dumps(db_mock).encode())
        
        else:
            self._set_headers(content_type="text/html")
            self.wfile.write(b"TRYONYOU MASTER BRAIN ACTIVE - SYSTEM READY")

    def do_POST(self):
        # PROCESAMIENTO IA (LOGICA DEL NOTEBOOK)
        self._set_headers()
        response = {
            "status": "processed",
            "engine": "ABVETOS v2.1",
            "result": {"h": 1.82, "s": 46},
            "invest": CONTACTO_INVERSION
        }
        self.wfile.write(json.dumps(response).encode())

def run(port=8080):
    server_address = ('', port)
    httpd = HTTPServer(server_address, TryOnYouOrchestrator)
    print(f"💎 MASTER BRAIN ONLINE | Port: {port}")
    print(f"📧 Investor contact: {CONTACTO_INVERSION}")
    print(f"📊 Studio API: http://localhost:{port}/api/stats")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
