import json, qrcode, os
import pandas as pd
import math

try:
    from google import genai
except ImportError:
    genai = None

class JulesAgent:
    def sanitize(self, raw_data):
        # Jules anonimiza y normaliza los datos biométricos
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
            return "Agent 70: Análisis completado. Selección basada en física de tejidos y elasticidad."

        try:
            # Construct a prompt
            items_desc = ", ".join([f"{item.get('Title', 'Item')} (Elasticidad: {item.get('elasticidad', 'N/A')})" for item in recommendations[:3]])
            prompt = (
                f"Actúa como un estilista de alta costura personal (Agent 70) para Galeries Lafayette. "
                f"El usuario tiene una silueta con vector: {user_vector['vector']}. "
                f"Recomienda brevemente por qué estos artículos son ideales basándote en su elasticidad y caída: {items_desc}. "
                f"Usa un tono sofisticado, exclusivo y técnico. Máximo 2 frases."
            )
            response = self.client.models.generate_content(
                model='gemini-2.0-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"GenAI Error: {e}")
            return "Agent 70: Análisis completado. Selección basada en física de tejidos."

    def algoritmo_ajuste_invisible(self, vector, inventory):
        """
        Calcula la mejor prenda basándose en la física del tejido (elasticidad),
        no en etiquetas de tallas.
        """
        # User "volume" proxy (average of chest/waist vs height normalized)
        chest = vector['vector'][0]
        # Si el pecho es muy grande (> 100), preferimos elasticidad alta (0.8-1.0)
        # Si es medio (80-100), elasticidad media (0.4-0.6)
        # Si es pequeño, estructura rígida (0.0-0.3)

        target_elasticity = 0.5
        if chest > 100:
            target_elasticity = 0.9
        elif chest < 85:
            target_elasticity = 0.2

        # Calculate score based on elasticity proximity
        for item in inventory:
            elasticity = item.get('elasticidad', 0.5)
            # Diferencia menor es mejor
            diff = abs(elasticity - target_elasticity)
            # Score 0.0 a 1.0 (1.0 es match exacto)
            item['match_score'] = max(0.0, 1.0 - diff)
            item['fit_reason'] = f"Elasticidad {elasticity} vs Objetivo {target_elasticity}"

        # Sort desc
        inventory.sort(key=lambda x: x['match_score'], reverse=True)
        return inventory

    def match(self, vector, inventory):
        # Delegate to invisible fit algorithm
        sorted_inventory = self.algoritmo_ajuste_invisible(vector, inventory)

        top_picks = sorted_inventory[:6]
        
        # If there are no items to recommend, return a safe default response
        if not top_picks:
            return {
                "recommendations": [],
                "narrative": "No items available"
            }
        # Determine narrative prefix
        best_fit = top_picks[0]['match_score']
        if best_fit > 0.9:
             narrative_prefix = "DIVINEO MATCH: Tejido de adaptación molecular. "
        else:
             narrative_prefix = "LAFAYETTE SELECTION: Ajuste optimizado por caída. "

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
                    inv = pd.read_csv(inventory_file).to_dict('records')
                elif inventory_file.endswith(".xlsx"):
                    inv = pd.read_excel(inventory_file).to_dict('records')
                else:
                    inv = json.load(open(inventory_file))

                # ENRICHMENT: Inject Elasticity Data for "Pro" Logic
                for item in inv:
                    title = str(item.get('Title', '')).lower()

                    # Default values
                    item['elasticidad'] = 0.5
                    item['caida'] = 'Regular'

                    # Map specific items to Pro Logic attributes
                    if "dress" in title or "seda" in title:
                        item['elasticidad'] = 0.9
                        item['caida'] = 'Fluida'
                        item['Title'] = "Vestido Seda (Match Fluido)"
                        item['Image Src'] = "/assets/catalog/red_dress_clean.png"
                    elif "blazer" in title or "galeries" in title:
                        item['elasticidad'] = 0.1
                        item['caida'] = 'Estructurada'
                        item['Title'] = "Blazer Galeries (Estructura)"
                        item['Image Src'] = "/assets/catalog/brown_blazer_360_views.png"
                    elif "pant" in title or "leather" in title:
                        item['elasticidad'] = 0.4
                        item['caida'] = 'Ajustada'
                        item['Title'] = "Pantalón Slim Fit (Adaptable)"
                        item['Image Src'] = "/assets/catalog/lime_green_leather_suit.png"
                    else:
                        item['Image Src'] = "/assets/catalog/urban_male_model_app_demo.jpg"

                self._inventory_cache[inventory_file] = inv

            return self.a70.match(self.jules.sanitize(user_data), inv)
        except Exception as e: 
            return {"error": str(e)}
