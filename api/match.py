import json
from http.server import BaseHTTPRequestHandler

# BASE DE DATOS TÉCNICA - GALERIES LAFAYETTE
# Sin tallas. Basado en el comportamiento físico del tejido.
INVENTAIRE_GL = [
    {
        "id": "GL_SOIE_01", "nom": "Robe en Soie Légère",
        "proprietes": {"elasticite": 0.1, "tombe": 0.9},
        "ratio_ideal": 1.45, "img": "/assets/vision/silk_dress.png"
    },
    {
        "id": "GL_VESTE_02", "nom": "Veste Structurée Premium",
        "proprietes": {"elasticite": 0.4, "tombe": 0.3},
        "ratio_ideal": 1.25, "img": "/assets/vision/blazer.png"
    }
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        data = json.loads(self.rfile.read(content_length))
        
        # Elena Grandini es reconocida por el CRM
        user = data.get("user", "Elena Grandini")
        scan = data.get("scan", {"poitrine": 90, "taille": 70})
        
        # Algoritmo de Inteligencia Corporal (Body Intelligence)
        user_ratio = scan['poitrine'] / scan['taille']
        match = min(INVENTAIRE_GL, key=lambda x: abs(x['ratio_ideal'] - user_ratio))

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Respuesta optimizada para evitar latencia
        response = {
            "bienvenue": f"Bienvenue aux Galeries Lafayette, {user}.",
            "match": {
                "nom": match['nom'],
                "image": match['img'],
                "physique": match['proprietes'],
                "explications": {
                    "fr": f"Choisie pour sa fluidité ({match['proprietes']['tombe']}) qui sublime votre silhouette.",
                    "es": f"Elegida por su caída ({match['proprietes']['tombe']}) que realza tu silueta sin oprimir.",
                    "en": f"Selected for its drape ({match['proprietes']['tombe']}) to complement your silhouette."
                }
            }
        }
        self.wfile.write(json.dumps(response).encode())
