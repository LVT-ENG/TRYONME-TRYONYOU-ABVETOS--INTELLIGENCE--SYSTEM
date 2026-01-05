import json
from http.server import BaseHTTPRequestHandler

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
        content_length = int(self.headers['Content-Length'])
        data = json.loads(self.rfile.read(content_length))

        user_name = data.get("user", "Elena")
        scan = data.get("scan", {"poitrine": 90, "taille": 70})

        ratio_reel = scan['poitrine'] / scan['taille']
        match = min(LAFAYETTE_ITEMS, key=lambda x: abs(x['ratio_ideal'] - ratio_reel))

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        response = {
            "bienvenue": f"Bienvenue aux Galeries Lafayette, {user_name}.",
            "produit": match['nom'],
            "image_url": match['image'],
            "explications": {
                "fr": "Cette pièce a été choisie pour sa fluidité qui sublime votre silhouette.",
                "es": "Esta prenda fue elegida por su caída que realza tu silueta sin oprimir.",
                "en": "This piece was selected for its fluid drape which complements your silhouette."
            }
        }
        self.wfile.write(json.dumps(response).encode())
