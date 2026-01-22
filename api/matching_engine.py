"""
Matching Engine for TRYONYOU Pilot
Deterministic logic for garment recommendation based on body measurements and fabric properties.
No random AI output - pure measurement-based scoring.
"""

import json
from typing import Dict, List, Tuple
from pathlib import Path
import os


class MatchingEngine:
    """
    Deterministic matching engine that compares user measurements with garment specifications.
    Adjusts fit calculation using fabric elasticity and drape scores.
    """

    def __init__(self, garment_db_path: str = "garment_database.json"):
        """Initialize matching engine with garment database."""
        # Use absolute path relative to this file for Vercel compatibility
        base_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(base_dir, garment_db_path)

        with open(db_path, 'r') as f:
            self.garment_db = json.load(f)
        self.garments = self.garment_db["garments"]

    def calculate_fit_score(
        self,
        user_measurements: Dict[str, float],
        garment: Dict,
        size: str
    ) -> Tuple[float, str]:
        """
        Calculate fit score for a specific garment size.
        
        Algorithm:
        1. Calculate difference between user and garment measurements
        2. Adjust tolerance based on fabric elasticity
        3. Apply drape penalty for rigid fabrics
        4. Return score and explanation
        
        Returns:
            Tuple of (score, explanation_text)
        """
        garment_size_specs = garment["sizes"].get(size)
        if not garment_size_specs:
            return 0, "Size not available"

        # Base tolerance in cm (±5cm is acceptable without fabric)
        base_tolerance = 5

        # Adjust tolerance based on elasticity
        # High elasticity (8-10) → ±7cm; Low elasticity (0-3) → ±2cm
        elasticity = garment["fabric_elasticity"]
        adjusted_tolerance = base_tolerance + (elasticity - 5) * 0.4

        score = 100  # Start with perfect score
        differences = {}

        # Measure key dimensions
        measurement_keys = ["chest", "waist", "hip", "shoulder_width"]

        for key in measurement_keys:
            if key in user_measurements and key in garment_size_specs:
                user_val = user_measurements[key]
                garment_val = garment_size_specs[key]
                diff = abs(user_val - garment_val)
                differences[key] = diff

                # Penalty calculation
                if diff > adjusted_tolerance:
                    # Each cm over tolerance = 2 points penalty
                    penalty = (diff - adjusted_tolerance) * 2
                    score -= penalty

        # Drape adjustment
        # Rigid fabrics (low drape) score = 0-3 are less forgiving
        drape_score = garment["fabric_drape_score"]
        if drape_score < 4:
            # More strict for rigid fabrics
            score -= (100 - score) * 0.15

        # Ensure score doesn't go below 0
        score = max(0, score)

        # Occasion match bonus (if provided)
        occasion_bonus = 5
        score = min(100, score + occasion_bonus)

        # Build explanation
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
        lines.append(f"Fit Score: {score:.0f}/100")
        lines.append(f"Material: {garment['material']}")

        # Explain elasticity advantage
        if elasticity >= 7:
            lines.append(f"✓ Fabric has excellent stretch ({elasticity}/10) - accommodates variations")
        elif elasticity >= 4:
            lines.append(f"✓ Fabric has moderate stretch ({elasticity}/10)")
        else:
            lines.append(f"⚠ Fabric is rigid ({elasticity}/10) - precise fit required")

        # Measurement fit detail
        if differences:
            diffs_str = ", ".join([f"{k}: {v:.1f}cm diff" for k, v in differences.items()])
            lines.append(f"Measurements: {diffs_str}")

        return " | ".join(lines)

    def recommend_best_fit(
        self,
        user_measurements: Dict[str, float],
        occasion: str = None,
        fit_preference: str = "regular"
    ) -> Dict:
        """
        Find the single best-fitting garment for the user.
        
        Args:
            user_measurements: Dictionary with keys like 'chest', 'waist', 'height', etc.
            occasion: Optional occasion filter ('work', 'event', 'casual', 'ceremony')
            fit_preference: 'slim', 'regular', or 'relaxed'
            
        Returns:
            Dictionary with recommended garment, size, and explanation
        """
        best_score = -1
        best_recommendation = None

        # Filter garments by occasion if provided
        candidate_garments = self.garments
        if occasion:
            candidate_garments = [
                g for g in self.garments
                if occasion in g.get("occasion", [])
            ]

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
            return {
                "error": "No suitable garment found",
                "fit_score": 0,
                "explanation": "Could not match measurements to any available garment"
            }

        return best_recommendation

    def get_fit_explanation(self, recommendation: Dict) -> str:
        """Generate detailed explanation of why this garment fits."""
        lines = []
        lines.append(f"Best fit for you: {recommendation['garment_name']}")
        lines.append(f"Size: {recommendation['size']}")
        lines.append(f"Brand: {recommendation['brand']}")
        lines.append(f"Material: {recommendation['material']}")
        lines.append(f"")
        lines.append("Why this fits:")
        lines.append(f"✓ Fabric elasticity: {recommendation['fabric_elasticity']}/10 (accommodates variations)")
        lines.append(f"✓ Drape quality: {recommendation['fabric_drape_score']}/10")
        lines.append(f"✓ Overall fit score: {recommendation['fit_score']:.0f}/100")

        return "\n".join(lines)
