import os
from .matching_engine import MatchingEngine

class BiometricEngine:
    """
    Orchestrator for the Commercial Pilot biometric logic.
    Adapts the raw scan data to the internal MatchingEngine.
    """

    def __init__(self):
        # Ensure we find the database relative to this file
        current_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(current_dir, "garment_database.json")
        self.engine = MatchingEngine(db_path)

    def generate_jules_narrative(self, recommendation: dict, language: str = "en") -> str:
        """
        Generates a "Cero Tallas" (Zero Sizes) narrative.
        Focuses on silhouette, drape, and fabric elasticity rather than measurements.
        """
        # Fallback if recommendation is error
        if "error" in recommendation:
            return recommendation.get("explanation", "No fit found.")

        # Extract key fabric properties
        elasticity = recommendation.get("fabric_elasticity", 5) # 0-10
        drape = recommendation.get("fabric_drape_score", 5)     # 0-10
        fit_score = recommendation.get("fit_score", 0)

        # Base template selection based on elasticity context
        narratives = {
            "en": {
                "high_stretch": "The silhouette of this piece aligns perfectly with your proportions. The fabric’s natural tension ensures a tailored look through the shoulders while maintaining a fluid drape at the waist.",
                "low_stretch": "Constructed from a structured weave, this garment offers a precise, architectural silhouette. It holds its shape firmly to accentuate your natural lines without relying on stretch.",
                "balanced": "This piece offers the ideal balance of structure and mobility. The weave adapts gently to your movement while preserving the garment's intended tailored profile."
            },
            "fr": {
                "high_stretch": "La silhouette de cette pièce s'accorde parfaitement avec vos proportions. La tension naturelle du tissu assure une coupe ajustée aux épaules tout en conservant un drapé fluide à la taille.",
                "low_stretch": "Confectionné dans un tissage structuré, ce vêtement offre une silhouette architecturale précise. Il maintient sa forme fermement pour accentuer vos lignes naturelles sans dépendre de l'élasticité.",
                "balanced": "Cette pièce offre l'équilibre idéal entre structure et mobilité. Le tissage s'adapte doucement à vos mouvements tout en préservant le profil ajusté du vêtement."
            },
            "es": {
                "high_stretch": "La silueta de esta prenda se alinea perfectamente con tus proporciones. La tensión natural del tejido garantiza un ajuste a medida en los hombros, manteniendo una caída fluida en la cintura.",
                "low_stretch": "Confeccionada en un tejido estructurado, esta prenda ofrece una silueta arquitectónica y precisa. Mantiene su forma con firmeza para acentuar tus líneas naturales sin depender de la elasticidad.",
                "balanced": "Esta pieza ofrece el equilibrio ideal entre estructura y movilidad. El tejido se adapta suavemente a tu movimiento mientras conserva el perfil entallado original."
            }
        }

        # Select language map (default to en)
        lang_map = narratives.get(language, narratives["en"])

        # Determine elasticity context
        if elasticity >= 7:
            key = "high_stretch"
        elif elasticity <= 3:
            key = "low_stretch"
        else:
            key = "balanced"

        return lang_map[key]

    def calculate_fit(self, scan_data: dict):
        """
        Calculate fit based on simplified scan data.

        Args:
            scan_data (dict): Contains height, weight, shoulderWidth, eventType, language
        """
        # Map external API keys to internal matching engine keys
        user_measurements = {
            "height": scan_data.get("height"),
            "weight": scan_data.get("weight"),
            "shoulder_width": scan_data.get("shoulderWidth"),
        }

        language = scan_data.get("language", "en")

        # Estimate missing measurements to ensure the matching engine works reasonably well
        # for the pilot demo.
        h = user_measurements.get("height", 175)
        w = user_measurements.get("weight", 70)

        if "chest" not in user_measurements:
            user_measurements["chest"] = 0.5 * h + (w / 10)
        if "waist" not in user_measurements:
            user_measurements["waist"] = 0.45 * h
        if "hip" not in user_measurements:
            user_measurements["hip"] = 0.5 * h

        # Map event type
        event_type = scan_data.get("eventType", "").lower()
        valid_occasions = ["work", "event", "casual", "ceremony"]
        occasion = event_type if event_type in valid_occasions else "casual"

        # Call the core matching logic
        raw_recommendation = self.engine.recommend_best_fit(
            user_measurements=user_measurements,
            occasion=occasion
        )

        # Apply "Cero Tallas" Narrative Override
        if "error" not in raw_recommendation:
            # Overwrite the technical explanation with the "Jules Narrative"
            raw_recommendation["explanation"] = self.generate_jules_narrative(raw_recommendation, language)

            # Remove sensitive measurement data from the explanation if it leaked in via other fields,
            # but currently 'explanation' is the main text field.
            # We strictly replace it.

            # Optional: Clear size label if strictly "Zero Sizes",
            # but usually the frontend needs 'size' to display or order.
            # The prompt says "redact any mention ... in the final jules_narrative".
            # It does not explicitly say to remove the 'size' field from the JSON object itself,
            # just the narrative description.

        return raw_recommendation
