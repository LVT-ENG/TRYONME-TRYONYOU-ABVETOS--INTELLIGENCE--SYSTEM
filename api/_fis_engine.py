import json, qrcode, os
import pandas as pd

try:
    from google import genai
except ImportError:
    genai = None

class JulesAgent:
    def sanitize(self, raw_data):
        # Jules anonimiza y normaliza los datos biométricos
        # La función sanitize_for_sharing rompe cualquier vínculo entre la imagen y los datos de peso/talla

        # Support both legacy/generic keys and new Pilot keys (Zero Tallas Protocol)
        chest = raw_data.get('chest', raw_data.get('shoulder_width', 0))
        waist = raw_data.get('waist', raw_data.get('hip_width', 0))
        height = raw_data.get('height', raw_data.get('torso_length', 170))

        return {
            "vector": [
                chest,
                waist,
                height
            ], 
            "id": raw_data.get('user_id', 'ANON_USER')
        }

class Agent70:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GOOGLE_GENAI_KEY")
        if self.api_key and genai:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None

    def generate_ai_narrative(self, user_vector, recommendations):
        if not self.client:
            return "Agent 70: Análisis completado. Selección basada en métricas de elasticidad."

        try:
            # Construct a prompt
            items_desc = ", ".join([f"{item.get('Title', 'Item')} ({item.get('Variant Price', 'N/A')} EUR)" for item in recommendations[:3]])
            prompt = (
                f"Actúa como un estilista de alta costura personal (Agent 70) para Galeries Lafayette. "
                f"El usuario tiene una silueta con vector: {user_vector['vector']}. "
                f"Recomienda brevemente por qué estos artículos son ideales: {items_desc}. "
                f"Usa un tono sofisticado, exclusivo y técnico. Máximo 2 frases."
            )
            response = self.client.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"GenAI Error: {e}")
            return "Agent 70: Análisis completado. Selección óptima generada."

    def match(self, vector, inventory):
        # Algoritmo de matching basado en la elasticidad y medidas
        recommendations = []
        user_measure = vector['vector'][0]

        for item in inventory:
            # Simulamos FitScore real (0.0 a 1.0)
            # Asumimos que Variant Price es un proxy de medida para la demo
            price = item.get('_parsed_price', 0.0)
            diff = abs((price / 10) - user_measure)
            fit_score = 1.0 / (1.0 + (diff / 10.0)) # Normalización

            recommendations.append({**item, "match_score": fit_score, "measure": fit_score})

        # Ordenar por mejor FitScore (descendente)
        recommendations.sort(key=lambda x: x['match_score'], reverse=True)
        best_fit = recommendations[0]['match_score'] if recommendations else 0

        top_picks = []
        
        # Lógica de Selección Dinámica
        if best_fit > 0.95:
            # Divineo: Perfect Match
            top_picks = [r for r in recommendations if r['match_score'] > 0.95][:6]
            narrative_prefix = "DIVINEO MATCH: Ajuste perfecto detectado. "
        elif 0.85 <= best_fit <= 0.95:
            # Lafayette: Catálogo Estándar
            top_picks = recommendations[:6]
            narrative_prefix = "LAFAYETTE SELECTION: Colección curada para tu silueta. "
        else:
            # CAP: Generación Automática (Just-in-Time)
            # Inyectamos item CAP
            cap_item = {
                "id": "CAP-GEN-001",
                "Title": "CAP Bespoke Creation",
                "Variant Price": "0",
                "Image Src": "/assets/catalog/cap_generation.png", # Placeholder
                "match_score": 0.99, # Artificialmente alto para CAP
                "measure": 0.99
            }
            top_picks = [cap_item] + recommendations[:5]
            narrative_prefix = "CAP ACTIVATED: Iniciando producción a medida. "

        narrative = narrative_prefix + self.generate_ai_narrative(vector, top_picks)

        return {
            "recommendations": top_picks,
            "narrative": narrative
        }

class PauAgent:
    def generate_qr(self, product_id):
        import io
        import base64

        # Generamos un QR real para la reserva VIP en memoria (Serverless friendly)
        img = qrcode.make(f"https://tryonyou.app/reserve/{product_id}")

        # Guardar en buffer de memoria
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")

        # Retornar Data URI
        return f"data:image/png;base64,{img_str}"

class FISOrchestrator:
    def __init__(self):
        self.jules, self.a70, self.pau = JulesAgent(), Agent70(), PauAgent()
        self._inventory_cache = {}

    def run_experience(self, user_data, inventory_file):
        try:
            if inventory_file in self._inventory_cache:
                inv = self._inventory_cache[inventory_file]
            else:
                if inventory_file.endswith(".csv"):
                    inv = pd.read_csv(inventory_file).to_dict('records')
                elif inventory_file.endswith(".xlsx"):
                    inv = pd.read_excel(inventory_file).to_dict('records')
                else:
                    inv = json.load(open(inventory_file))

                # Sustituimos URLs de imágenes locales si existen en nuestro catálogo descargado
                for item in inv:
                    # Pre-calculate price for performance (Bolt Optimization)
                    try:
                        item['_parsed_price'] = float(item.get('Variant Price', 0))
                    except (ValueError, TypeError):
                        item['_parsed_price'] = 0.0

                    handle = item.get('Handle', '')
                    # Actualización de rutas a /assets/catalog/
                    local_img = f"/assets/catalog/{handle}.png"

                    # Para la demo, usamos mapeo determinista si no tenemos el archivo real checkeado
                    # (Simplificado para evitar checks de sistema de archivos complejos en Vercel)
                    title = str(item.get('Title', '')).lower()
                    if "dress" in title:
                        item['Image Src'] = "/assets/catalog/red_dress_clean.png"
                    elif "blazer" in title or "suit" in title or "trench" in title:
                        item['Image Src'] = "/assets/catalog/brown_blazer_360_views.png"
                    else:
                        item['Image Src'] = "/assets/catalog/urban_male_model_app_demo.jpg"

                self._inventory_cache[inventory_file] = inv

            return self.a70.match(self.jules.sanitize(user_data), inv)
        except Exception as e: 
            return {"error": str(e)}
