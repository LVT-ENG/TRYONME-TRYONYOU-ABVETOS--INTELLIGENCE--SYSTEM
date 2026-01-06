import json
from http.server import BaseHTTPRequestHandler

# Inventario VIP - Galeries Lafayette
LAFAYETTE_DB = [
    {"id": "GL_01", "nom": "Robe Soie Haussmann", "stretch": 0.1, "drape": 0.9, "ratio": 1.45, "img": "/assets/vision/silk.png"},
    {"id": "GL_02", "nom": "Blazer Structuré", "stretch": 0.4, "drape": 0.3, "ratio": 1.25, "img": "/assets/vision/blazer.png"}
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            user = data.get("user", "Elena Grandini")
            scan = data.get("scan", {"poitrine": 90, "taille": 70})

            # Algoritmo de Física: Comparación de proporciones y caída de tela
            user_ratio = scan['poitrine'] / scan['taille']
            match = min(LAFAYETTE_DB, key=lambda x: abs(x['ratio'] - user_ratio))

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            response = {
                "bienvenue": f"Bienvenue aux Galeries Lafayette, {user}.",
                "match": {
                    "produit": match['nom'],
                    "image": match['img'],
                    "explications": {
                        "fr": f"Cette pièce a été choisie pour sa fluidité ({match['drape']}) qui sublime votre silhouette.",
                        "es": f"Esta prenda fue elegida por su caída ({match['drape']}) que realza tu silueta sin oprimir.",
                        "en": f"This piece was selected for its fluid drape ({match['drape']}) which complements your silhouette."
                    }
                }
            }
            self.wfile.write(json.dumps(response).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
