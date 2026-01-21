import math

class BiometricEngine:
    def __init__(self):
        # Base de datos ficticia de tienda (Simulando Galeries Lafayette)
        # Elasticidad: 0.0 (rígido/lana) a 1.0 (muy elástico/lycra)
        self.garment_db = [
            {
                "id": "vestido_seda_01",
                "name": "Vestido de Seda Wrap",
                "base_shoulder_cm": 38,
                "elasticity": 0.3,
                "event_category": "fiesta",
                "image_url": "/assets/garments/silk_dress.png"
            },
            {
                "id": "blazer_premium_02",
                "name": "Blazer Estructurado Lana",
                "base_shoulder_cm": 44,
                "elasticity": 0.05,
                "event_category": "trabajo",
                "image_url": "/assets/garments/blazer.png"
            }
        ]

    def _estimate_volume(self, height, weight):
        """Calcula un factor de volumen basado en el IMC para ajustar el fit."""
        bmi = weight / ((height / 100) ** 2)
        # Factor de ajuste: 1.0 es estándar. >1.0 aumenta la 'anchura efectiva'
        return max(0.9, min(1.5, bmi / 22.0))

    def calculate_fit(self, data: dict):
        h, w = data.get("height"), data.get("weight")
        u_shoulder = data.get("shoulderWidth")
        event = data.get("eventType", "general").lower()

        # Ajuste biométrico: El hombro real se modifica por el volumen corporal
        volume_factor = self._estimate_volume(h, w)
        effective_width = u_shoulder * volume_factor

        best_match = None
        min_score = float('inf')

        for garment in self.garment_db:
            # Penalización por evento (Prioridad)
            event_penalty = 0 if garment["event_category"] == event else 20

            # Cálculo de Fit: Diferencia de hombros ajustada por elasticidad
            # Una prenda elástica 'perdona' más la diferencia de tamaño
            fit_delta = abs(effective_width - garment["base_shoulder_cm"])
            score = (fit_delta * (1 - garment["elasticity"])) + event_penalty

            if score < min_score:
                min_score = score
                best_match = garment

        # Respuesta final: PRIVACIDAD TOTAL (Sin tallas, sin números)
        return {
            "recommended_id": best_match["id"],
            "image_url": best_match["image_url"],
            "label": best_match["name"],
            "message": "Esta prenda ha sido seleccionada por su caída y ajuste perfecto para tu silueta."
        }
