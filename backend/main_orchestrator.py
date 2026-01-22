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

    def calculate_fit(self, scan_data: dict):
        """
        Calculate fit based on simplified scan data.

        Args:
            scan_data (dict): Contains height, weight, shoulderWidth, eventType
        """
        # Map external API keys to internal matching engine keys
        user_measurements = {
            "height": scan_data.get("height"),
            "weight": scan_data.get("weight"),
            "shoulder_width": scan_data.get("shoulderWidth"),
        }

        # Estimate missing measurements to ensure the matching engine works reasonably well
        # for the pilot demo.
        # These are rough heuristics based on standard proportions if specific data is missing.
        h = user_measurements.get("height", 175)
        w = user_measurements.get("weight", 70)

        # Basic estimations (can be replaced by real scan data in V2)
        if "chest" not in user_measurements:
            user_measurements["chest"] = 0.5 * h + (w / 10)  # Rough approximation
        if "waist" not in user_measurements:
            user_measurements["waist"] = 0.45 * h
        if "hip" not in user_measurements:
            user_measurements["hip"] = 0.5 * h

        # Map event type
        event_type = scan_data.get("eventType", "").lower()
        # Default to 'casual' if not found
        valid_occasions = ["work", "event", "casual", "ceremony"]
        occasion = event_type if event_type in valid_occasions else "casual"

        # Call the core matching logic
        return self.engine.recommend_best_fit(
            user_measurements=user_measurements,
            occasion=occasion
        )
