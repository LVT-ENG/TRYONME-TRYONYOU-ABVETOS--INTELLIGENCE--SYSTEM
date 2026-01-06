import json
from http.server import BaseHTTPRequestHandler

# Inventario VIP - Galeries Lafayette (Física de telas, no tallas)
LAFAYETTE_DB = [
    {"id": "GL_01", "nom": "Robe Soie Haussmann", "stretch": 0.1, "drape": 0.9, "ratio": 1.45, "img": "/assets/vision/silk.png"},
    {"id": "GL_02", "nom": "Blazer Structuré", "stretch": 0.4, "drape": 0.3, "ratio": 1.25, "img": "/assets/vision/blazer.png"}
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. Leer datos de entrada
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            user = data.get("user", "Elena Grandini")
            scan = data.get("scan", {"poitrine": 90, "taille": 70})

            # 2. Lógica de Matching (Body Intelligence)
            user_ratio = scan['poitrine'] / scan['taille']
            match = min(LAFAYETTE_DB, key=lambda x: abs(x['ratio'] - user_ratio))

            # 3. Respuesta Exitosa (Headers obligatorios para Vercel)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*') # Permitir acceso desde el frontend
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
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            # 4. Manejo de errores para evitar el "Red Build"
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_response = {"error": str(e)}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
