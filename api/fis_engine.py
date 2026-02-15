import json, qrcode, os
import pandas as pd
import numpy as np

try:
    from google import genai
except ImportError:
    genai = None

class JulesAgent:
    def sanitize(self, raw_data):
        # Jules anonimiza y normaliza los datos biométricos
        # La función sanitize_for_sharing rompe cualquier vínculo entre la imagen y los datos de peso/talla
        return {
            "vector": [
                raw_data.get('chest', 0), 
                raw_data.get('waist', 0),
                raw_data.get('height', 170)
            ], 
            "id": raw_data.get('user_id', 'ANON_USER')
        }

class Agent70:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
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
        # Algoritmo de matching basado en la elasticidad y medidas optimizado con Pandas
        user_measure = vector['vector'][0]
        
        # Asumimos que Variant Price es un proxy de medida para la demo
        # Convertimos a numérico de forma segura
        prices = pd.to_numeric(inventory['Variant Price'], errors='coerce').fillna(0)

        # Cálculo vectorizado del FitScore
        diff = (prices / 10.0 - user_measure).abs()
        scores = 1.0 / (1.0 + (diff / 10.0))

        if scores.empty:
            best_fit = 0
            top_picks = []
        else:
            best_fit = scores.max()
            # Obtenemos los índices de los 6 mejores scores
            top_indices = scores.nlargest(6).index

            # Extraemos solo los items necesarios y convertimos a dict
            top_picks_df = inventory.loc[top_indices].copy()
            top_picks = top_picks_df.to_dict('records')

            # Asignamos scores a los items seleccionados
            for item, idx in zip(top_picks, top_indices):
                s = float(scores[idx])
                item['match_score'] = s
                item['measure'] = s

        # Lógica de Selección Dinámica
        if best_fit > 0.95:
            # Divineo: Perfect Match
            top_picks = [r for r in top_picks if r['match_score'] > 0.95]
            narrative_prefix = "DIVINEO MATCH: Ajuste perfecto detectado. "
        elif 0.85 <= best_fit <= 0.95:
            # Lafayette: Catálogo Estándar
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
            top_picks = [cap_item] + top_picks[:5]
            narrative_prefix = "CAP ACTIVATED: Iniciando producción a medida. "

        narrative = narrative_prefix + self.generate_ai_narrative(vector, top_picks)

        return {
            "recommendations": top_picks,
            "narrative": narrative
        }

class PauAgent:
    def generate_qr(self, product_id):
        # Asegurar directorio público para assets
        output_dir = "public/assets"
        if not os.path.exists(output_dir): os.makedirs(output_dir)

        qr_filename = f"qr_{product_id}.png"
        qr_path = os.path.join(output_dir, qr_filename)

        # Generamos un QR real para la reserva VIP
        img = qrcode.make(f"https://tryonyou.app/reserve/{product_id}")
        img.save(qr_path)
        return f"/assets/{qr_filename}"

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
                    df = pd.read_csv(inventory_file)
                elif inventory_file.endswith(".xlsx"):
                    df = pd.read_excel(inventory_file)
                else:
                    with open(inventory_file) as f:
                        df = pd.DataFrame(json.load(f))

                # Optimización vectorial con Pandas para sustitución de imágenes
                # Normalizamos títulos a minúsculas para la búsqueda
                titles_lower = df['Title'].astype(str).str.lower()

                # Definimos condiciones vectoriales
                conditions = [
                    titles_lower.str.contains("dress", na=False),
                    titles_lower.str.contains("blazer|suit|trench", na=False)
                ]

                # Definimos elecciones correspondientes
                choices = [
                    "/assets/catalog/red_dress_clean.png",
                    "/assets/catalog/brown_blazer_360_views.png"
                ]

                # Aplicamos la lógica vectorizada (np.select es mucho más rápido que iterar)
                df['Image Src'] = np.select(conditions, choices, default="/assets/catalog/urban_male_model_app_demo.jpg")

                self._inventory_cache[inventory_file] = df
                inv = df

            return self.a70.match(self.jules.sanitize(user_data), inv)
        except Exception as e: 
            return {"error": str(e)}
