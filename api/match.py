import json
from http.server import BaseHTTPRequestHandler

# CATALOGO TÉCNICO GALERIES LAFAYETTE (Basado en Patente PCT/EP2025/067317)
# Parámetros: stretch (elasticidad), drape (caída), ratio (proporción ideal)
LAFAYETTE_DB = [
    {"id": "GL_01", "nom": "Robe en Soie Haussmann", "stretch": 0.1, "drape": 0.9, "ratio": 1.45, "img": "/assets/vision/silk.png"},
    {"id": "GL_02", "nom": "Blazer Structuré Luxe", "stretch": 0.4, "drape": 0.3, "ratio": 1.25, "img": "/assets/vision/blazer.png"}
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))
            
            # Reconocimiento CRM e Inversores
            user = data.get("user", "Elena Grandini")
            scan = data.get("scan", {"poitrine": 90, "taille": 70})
            
            # Algoritmo de Física: No tallas, solo proporciones y caída de tela
            if scan['taille'] == 0:
                raise ValueError("Taille cannot be zero")
            user_ratio = scan['poitrine'] / scan['taille']
            match = min(LAFAYETTE_DB, key=lambda x: abs(x['ratio'] - user_ratio))

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "success",
                "patent": "PCT/EP2025/067317",
                "bienvenue": f"Bienvenue aux Galeries Lafayette, {user}.",
                "recommendation": {
                    "produit": match['nom'],
                    "image": match['img'],
                    "explications": {
                        "fr": f"Choisie pour sa fluidité ({match['drape']}) qui sublime votre silhouette.",
                        "es": f"Elegida por su caída ({match['drape']}) que realza tu silueta sin oprimir.",
                        "en": f"Selected for its drape ({match['drape']}) to complement your silhouette."
                    }
                }
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())