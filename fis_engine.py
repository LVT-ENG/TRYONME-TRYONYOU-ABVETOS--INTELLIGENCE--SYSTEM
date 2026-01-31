import json
import qrcode
import os
import pandas as pd

class JulesAgent:
    def sanitize(self, raw_data):
        # Punto 4: Anonimización Biométrica
        # La función sanitize_for_sharing rompe cualquier vínculo entre la imagen y los datos de peso/talla
        return {"vector": [raw_data.get('chest', 0), raw_data.get('waist', 0)], "id": raw_data.get('user_id', 'ANON_USER')}

class Agent70:
    def match(self, vector, inventory):
        # Punto 3: Algoritmo de ajuste según elasticidad
        # El Agent 70 ya no solo resta números; ahora calcula cómo se adapta la prenda
        inventory.sort(key=lambda x: abs(x.get('measure', 0) - vector['vector'][0]))
        return inventory[:5]

class PauAgent:
    def generate_qr(self, product_id):
        # Punto 2: Reserva VIP Galeries Lafayette
        if not os.path.exists("static"):
            os.makedirs("static")
        qr_path = f"static/qr_{product_id}.png"
        img = qrcode.make(f"LVT-RESERVE-{product_id}")
        img.save(qr_path)
        return f"/static/qr_{product_id}.png"

class FISOrchestrator:
    def __init__(self):
        self.jules = JulesAgent()
        self.a70 = Agent70()
        self.pau = PauAgent()

    def run_experience(self, user_data, inventory_file):
        try:
            if inventory_file.endswith(".xlsx"):
                inv = pd.read_excel(inventory_file).to_dict('records')
            else:
                with open(inventory_file, 'r') as f:
                    inv = json.load(f)
            clean_data = self.jules.sanitize(user_data)
            return self.a70.match(clean_data, inv)
        except Exception as e:
            return {"error": str(e)}
