import json
import os
from pathlib import Path
from typing import Dict, List, Tuple, Optional

class BiometricEngine:
    """
    Commercial Pilot Biometric Engine for Jules.
    Adapts simplified scan data to detailed garment matching logic.
    """

    def __init__(self):
        """Initialize engine and load garment database."""
        # Load database relative to this file
        current_dir = Path(__file__).parent
        db_path = current_dir / "garment_database.json"

        try:
            with open(db_path, 'r') as f:
                self.garment_db = json.load(f)
            self.garments = self.garment_db["garments"]
        except Exception as e:
            print(f"Error loading garment database: {e}")
            # Fallback for safety
            self.garments = []

    def calculate_fit(self, scan_data: Dict) -> Dict:
        """
        Main entry point for the commercial pilot.
        Converts scan data to measurements and finds best fit.
        """
        # 1. Extract inputs
        height = scan_data.get("height", 170)
        weight = scan_data.get("weight", 70)
        shoulder_width = scan_data.get("shoulderWidth", 40)
        event_type = scan_data.get("eventType", "casual")

        # 2. Estimate full body measurements (Commercial Heuristic)
        user_measurements = self._estimate_measurements(height, weight, shoulder_width)

        # 3. Find best fit
        recommendation = self.recommend_best_fit(
            user_measurements=user_measurements,
            occasion=event_type
        )

        return recommendation

    def _estimate_measurements(self, height: float, weight: float, shoulder_width: float) -> Dict[str, float]:
        """
        Heuristic estimation of body measurements based on key biometric markers.
        Used when full 3D scan is not available (Pilot Mode).
        """
        # Crude estimation logic for the pilot to ensure functionality
        # Chest is roughly estimated from shoulder width and BMI influence
        bmi = weight / ((height / 100) ** 2)

        # Base chest from shoulder (approximate circumference)
        base_chest = shoulder_width * 2.4

        # Adjust for BMI (heavier people have larger chest/waist ratios usually)
        if bmi > 25:
            chest = base_chest * 1.1
            waist_ratio = 0.95
        elif bmi < 18.5:
            chest = base_chest * 0.9
            waist_ratio = 0.75
        else:
            chest = base_chest
            waist_ratio = 0.85

        waist = chest * waist_ratio
        hip = chest * 0.95 # Generic male/female average blend for pilot

        return {
            "height": height,
            "weight": weight,
            "shoulder_width": shoulder_width,
            "chest": chest,
            "waist": waist,
            "hip": hip,
            "arm_length": height * 0.36,
            "torso_length": height * 0.28,
            "leg_length": height * 0.46
        }

    def recommend_best_fit(
        self,
        user_measurements: Dict[str, float],
        occasion: str = None,
        fit_preference: str = "regular"
    ) -> Dict:
        """
        Find the single best-fitting garment for the user.
        """
        best_score = -1
        best_recommendation = None

        # Filter garments by occasion if provided
        # Map frontend eventType to DB occasion keys if needed
        # Simple containment check
        candidate_garments = []
        for g in self.garments:
            # If occasion is provided, check if it matches any of the garment's occasions
            if occasion:
                # Flexible matching (case insensitive, partial)
                garment_occasions = [occ.lower() for occ in g.get("occasion", [])]
                if occasion.lower() in garment_occasions:
                    candidate_garments.append(g)
                # Fallback: if no specific match, include basic items?
                # For now, strict filtering or if list is empty, return all?
                # Let's keep it strict but ensure we have candidates.
            else:
                candidate_garments.append(g)

        # If strict filtering left us with nothing, revert to all garments to avoid empty state
        if not candidate_garments:
            candidate_garments = self.garments

        # Score all garments and sizes
        for garment in candidate_garments:
            for size in garment["sizes"].keys():
                score, explanation = self.calculate_fit_score(
                    user_measurements, garment, size
                )

                if score > best_score:
                    best_score = score
                    best_recommendation = {
                        "garment_id": garment["id"],
                        "garment_name": garment["name"],
                        "brand": garment["brand"],
                        "category": garment["category"],
                        "size": size,
                        "fit_score": score,
                        "explanation": explanation,
                        "material": garment["material"],
                        "color": garment["color"],
                        "image_url": garment["image_url"],
                        "fabric_elasticity": garment["fabric_elasticity"],
                        "fabric_drape_score": garment["fabric_drape_score"],
                        "occasion_tags": garment["occasion"],
                        "cut_type": garment["cut_type"]
                    }

        if not best_recommendation:
            # Fallback if absolutely nothing matches
            return {
                "error": "No suitable garment found",
                "fit_score": 0,
                "explanation": "Could not match measurements to any available garment"
            }

        return best_recommendation

    def calculate_fit_score(
        self,
        user_measurements: Dict[str, float],
        garment: Dict,
        size: str
    ) -> Tuple[float, str]:
        """
        Calculate fit score for a specific garment size.
        """
        garment_size_specs = garment["sizes"].get(size)
        if not garment_size_specs:
            return 0, "Size not available"

        # Base tolerance in cm
        base_tolerance = 5

        # Adjust tolerance based on elasticity
        elasticity = garment["fabric_elasticity"]
        adjusted_tolerance = base_tolerance + (elasticity - 5) * 0.4

        score = 100
        differences = {}

        # Measure key dimensions present in both
        measurement_keys = ["chest", "waist", "hip", "shoulder_width"]

        for key in measurement_keys:
            if key in user_measurements and key in garment_size_specs:
                user_val = user_measurements[key]
                garment_val = garment_size_specs[key]
                diff = abs(user_val - garment_val)
                differences[key] = diff

                if diff > adjusted_tolerance:
                    penalty = (diff - adjusted_tolerance) * 2
                    score -= penalty

        # Drape adjustment
        drape_score = garment["fabric_drape_score"]
        if drape_score < 4:
            score -= (100 - score) * 0.15

        score = max(0, score)
        score = min(100, score + 5) # Occasion bonus implicit

        explanation = self._build_explanation(
            garment, size, differences, score, elasticity, drape_score
        )

        return score, explanation

    def _build_explanation(
        self,
        garment: Dict,
        size: str,
        differences: Dict[str, float],
        score: float,
        elasticity: int,
        drape_score: int
    ) -> str:
        """Build human-readable explanation of fit."""
        lines = []
        lines.append(f"Size {size} - {garment['name']}")

        if elasticity >= 7:
            lines.append(f"✓ High stretch fabric ({elasticity}/10)")
        elif elasticity >= 4:
            lines.append(f"✓ Moderate stretch")
        else:
            lines.append(f"⚠ Structured fit")

        return " | ".join(lines)
