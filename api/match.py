from http.server import BaseHTTPRequestHandler
import json

# Datos maestros del piloto (Galeries Lafayette Mock)
LAFAYETTE_INVENTORY = [
    {
        "id": "vestido_seda_001",
        "name": "Robe en Soie Légère",
        "category": "Evento",
        "elasticity": 0.2,
        "drape_factor": 0.9,
        "ideal_proportions": {"chest_waist_ratio": 1.4},
        "image_url": "/assets/garments/silk_dress.png"
    },
    {
        "id": "blazer_ajustado_002",
        "name": "Blazer Structuré",
        "category": "Business",
        "elasticity": 0.5,
        "drape_factor": 0.3,
        "ideal_proportions": {"chest_waist_ratio": 1.2},
        "image_url": "/assets/garments/blazer.png"
    }
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # Lógica de biometría sin tallas
            # Support both direct structure and "biometrics" key
            user_biometrics = data.get("biometrics", data)
            event = data.get("event", "Evento")

            # Encontrar el mejor match basado en física de tela
            best_match = self.calculate_best_fit(user_biometrics, event)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            # Respuesta refinada con "toque final" multilingüe
            response = {
                "match_found": True,
                "visual_asset": best_match['image_url'],
                "product_name": best_match['name'],
                "explanation": {
                    "fr": f"Cette pièce a été choisie pour sa fluidité ({best_match['drape_factor']}) qui sublime votre silhouette.",
                    "es": f"Esta prenda fue elegida por su caída ({best_match['drape_factor']}) que realza tu silueta sin oprimir.",
                    "en": f"This piece was selected for its fluid drape ({best_match['drape_factor']}) which complements your silhouette."
                }
            }
            self.wfile.write(json.dumps(response).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def calculate_best_fit(self, biometrics, event):
        # Implementación simplificada de la lógica de recomendación

        highest_score = -1
        best_match = LAFAYETTE_INVENTORY[0] # Default fallback

        for garment in LAFAYETTE_INVENTORY:
            # Calculamos la proporción real del cuerpo escaneado
            try:
                chest = float(biometrics.get('chest', 90))
                waist = float(biometrics.get('waist', 70))
                user_ratio = chest / waist
            except (ValueError, ZeroDivisionError, TypeError):
                user_ratio = 1.3 # Fallback seguro

            target_ratio = garment['ideal_proportions']['chest_waist_ratio']

            # La elasticidad permite que la prenda perdone desviaciones en las medidas
            tolerance = garment['elasticity'] * 0.15

            # Diferencia entre el cuerpo y la estructura de la prenda
            diff = abs(user_ratio - target_ratio)

            # Puntuación final: a menor diferencia, mejor ajuste
            score = max(0, 1 - (diff / (1 + tolerance)))

            # Boost score if category matches
            if garment.get('category') == event:
                score += 0.1

            if score > highest_score:
                highest_score = score
                best_match = garment

        return best_match
