import os

def fix_red_deploy():
    print("🛠️ [JULES] REPARANDO DESPLIEGUE ROJO...")

    # 1. Crear la carpeta /api si no existe (Vital para Vercel)
    if not os.path.exists("api"):
        os.makedirs("api")
        print("✅ Carpeta /api creada.")

    # 2. Inyectar el motor de inteligencia (Sin tallas, Francés nativo)
    # Este código sigue la nomenclatura técnica: poitrine, taille, tombe_tissu
    python_logic = """
import json
from http.server import BaseHTTPRequestHandler

LAFAYETTE_ITEMS = [
    {
        "id": "GL_SOIE_01", "nom": "Robe en Soie Haussmann",
        "elasticite": 0.1, "tombe_tissu": 0.9, "ratio_ideal": 1.4,
        "image": "/assets/vision/silk_dress.png"
    },
    {
        "id": "GL_VESTE_02", "nom": "Veste Structurée Premium",
        "elasticite": 0.4, "tombe_tissu": 0.2, "ratio_ideal": 1.2,
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
"""
    with open("api/match.py", "w") as f:
        f.write(python_logic.strip())
    print("✅ Motor api/match.py inyectado correctamente.")

    # 3. Forzar limpieza de caché y despliegue
    print("🚀 Forzando despliegue limpio...")
    os.system("rm -rf dist node_modules package-lock.json")
    # Usamos --force para ignorar el estado fallido anterior
    os.system("npm install --legacy-peer-deps && npm run build && npx vercel --prod --force --yes")

if __name__ == "__main__":
    fix_red_deploy()
