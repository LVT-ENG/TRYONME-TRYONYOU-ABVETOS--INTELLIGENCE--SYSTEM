import json
from http.server import BaseHTTPRequestHandler

# Inventario con física de tela
LAFAYETTE_ITEMS = [
    {
        "id": "GL_SOIE_01",
        "nom": "Robe en Soie Haussmann",
        "elasticite": 0.1,
        "tombe_tissu": 0.9,
        "ratio_ideal": 1.4,
        "image": "/assets/vision/silk_dress.png"
    },
    {
        "id": "GL_VESTE_02",
        "nom": "Veste Structurée Premium",
        "elasticite": 0.4,
        "tombe_tissu": 0.2,
        "ratio_ideal": 1.2,
        "image": "/assets/vision/blazer.png"
    }
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))

            # Elena Grandini es nuestra prioridad n.º 1
            user_name = data.get("user", "Elena")
            scan = data.get("scan", {"poitrine": 90, "taille": 70})

            # Algoritmo de Match Físico
            # Fallback seguro para división por cero
            try:
                ratio_reel = float(scan['poitrine']) / float(scan['taille'])
            except (ValueError, ZeroDivisionError, TypeError):
                ratio_reel = 1.3

            match = min(LAFAYETTE_ITEMS, key=lambda x: abs(x['ratio_ideal'] - ratio_reel))

            # Validate drape factor for safe display
            drape_factor = match.get('tombe_tissu', 0.5)
            if not isinstance(drape_factor, (int, float)):
                drape_factor = 0.5

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            # Respuesta refinada con "toque final" multilingüe
            response = {
                "bienvenue": f"Bienvenue aux Galeries Lafayette, {user_name}.",
                "produit": match['nom'],
                "image_url": match['image'],
                "explanation": {
                    "fr": f"Cette pièce a été choisie pour sa fluidité ({drape_factor}) qui sublime votre silhouette.",
                    "es": f"Esta prenda fue elegida por su caída ({drape_factor}) que realza tu silueta sin oprimir.",
                    "en": f"This piece was selected for its fluid drape ({drape_factor}) which complements your silhouette."
                }
            }
            self.wfile.write(json.dumps(response).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
