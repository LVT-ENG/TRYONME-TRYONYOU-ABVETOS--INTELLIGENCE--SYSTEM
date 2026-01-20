"""
TRYONYOU Matching Engine
Deterministic logic for garment fit calculation
Compares user measurements vs garment measurements
Adjusts for fabric elasticity and drape
"""

from typing import Dict, List, Tuple
from api.garments.database import GARMENTS, get_garments_by_occasion

class UserMeasurements:
    """User body measurements captured from scan"""
    def __init__(
        self,
        height: float,
        weight: float,
        chest: float,
        waist: float,
        hips: float,
        shoulder_width: float,
        arm_length: float,
        leg_length: float,
        torso_length: float,
    ):
        self.height = height  # cm
        self.weight = weight  # kg
        self.chest = chest  # cm
        self.waist = waist  # cm
        self.hips = hips  # cm
        self.shoulder_width = shoulder_width  # cm
        self.arm_length = arm_length  # cm
        self.leg_length = leg_length  # cm
        self.torso_length = torso_length  # cm

    def to_dict(self):
        return {
            "height": self.height,
            "weight": self.weight,
            "chest": self.chest,
            "waist": self.waist,
            "hips": self.hips,
            "shoulder_width": self.shoulder_width,
            "arm_length": self.arm_length,
            "leg_length": self.leg_length,
            "torso_length": self.torso_length,
        }


class GarmentFitCalculator:
    """
    Calculates fit score for a garment based on user measurements

    Fit Score Formula:
    1. Calculate deviation for each measurement (user vs garment)
    2. Adjust tolerance based on fabric elasticity
    3. Apply drape adjustment for fitted garments
    4. Return normalized fit score (0-100)
    """

    TOLERANCE_BASELINE = 4  # cm tolerance baseline
    ELASTICITY_MULTIPLIER = 1.5  # increase tolerance per % elasticity
    DRAPE_ADJUSTMENT = 0.95  # reduce strictness for high-drape fabrics
    RIGIDITY_ADJUSTMENT = 1.05  # increase strictness for rigid fabrics

    @staticmethod
    def calculate_fit(
        user_measurements: UserMeasurements,
        garment: Dict,
        size: str = "M"
    ) -> Tuple[float, Dict]:
        """
        Calculate fit score for a user in a specific garment size

        Returns:
            Tuple of (fit_score: 0-100, details: Dict with breakdown)
        """

        if size not in garment["sizes"]:
            return 0, {"error": f"Size {size} not available"}

        garment_size = garment["sizes"][size]
        fabric = garment["fabric"]

        # Determine which measurements to compare based on garment category
        category = garment["category"]
        measurements_to_compare = GarmentFitCalculator._get_measurements_for_category(
            category, user_measurements, garment_size
        )

        # Calculate tolerance with fabric adjustments
        elasticity = fabric.get("elasticity", 0)
        rigidity = fabric.get("rigidity", 5)
        drape_score = fabric.get("drape_score", 5)

        # Base tolerance adjusted by elasticity
        tolerance = GarmentFitCalculator.TOLERANCE_BASELINE + (elasticity * GarmentFitCalculator.ELASTICITY_MULTIPLIER)

        # Apply drape and rigidity adjustments
        if drape_score >= 7:  # High drape
            tolerance *= GarmentFitCalculator.DRAPE_ADJUSTMENT
        if rigidity >= 7:  # Rigid fabric
            tolerance *= GarmentFitCalculator.RIGIDITY_ADJUSTMENT

        # Calculate deviations
        deviations = []
        measurement_details = []

        for measure_name, user_value, garment_value in measurements_to_compare:
            if user_value is None or garment_value is None:
                continue

            deviation = abs(user_value - garment_value)
            deviations.append(deviation)

            # Determine fit quality for this measurement
            if deviation <= tolerance * 0.5:
                fit_quality = "Perfect"
                fit_score_component = 100
            elif deviation <= tolerance:
                fit_quality = "Excellent"
                fit_score_component = 90
            elif deviation <= tolerance * 1.5:
                fit_quality = "Good"
                fit_score_component = 75
            elif deviation <= tolerance * 2:
                fit_quality = "Fair"
                fit_score_component = 60
            else:
                fit_quality = "Poor"
                fit_score_component = 40

            measurement_details.append({
                "measurement": measure_name,
                "user_value": user_value,
                "garment_value": garment_value,
                "deviation": deviation,
                "tolerance": tolerance,
                "fit_quality": fit_quality,
                "fit_score": fit_score_component,
            })

        # Calculate overall fit score
        if not deviations:
            overall_fit_score = 50
        else:
            avg_deviation = sum(deviations) / len(deviations)

            # Normalize deviation to fit score (0-100)
            if avg_deviation <= tolerance * 0.5:
                overall_fit_score = 98
            elif avg_deviation <= tolerance:
                overall_fit_score = 90
            elif avg_deviation <= tolerance * 1.5:
                overall_fit_score = 75
            elif avg_deviation <= tolerance * 2:
                overall_fit_score = 60
            else:
                overall_fit_score = max(40, 100 - (avg_deviation - tolerance * 2) * 2)

        return overall_fit_score, {
            "overall_fit_score": overall_fit_score,
            "tolerance": tolerance,
            "fabric_elasticity": elasticity,
            "fabric_drape": drape_score,
            "measurement_details": measurement_details,
        }

    @staticmethod
    def _get_measurements_for_category(
        category: str,
        user_measurements: UserMeasurements,
        garment_size: Dict
    ) -> List[Tuple[str, float, float]]:
        """
        Return list of (measurement_name, user_value, garment_value) tuples
        based on garment category
        """

        measurements = []

        if category in ["blazer", "shirt", "sweater", "jacket"]:
            # Top garments: chest, shoulder, sleeve
            measurements.append(("Chest", user_measurements.chest, garment_size.get("chest")))
            measurements.append(("Shoulder", user_measurements.shoulder_width, garment_size.get("shoulder")))
            measurements.append(("Sleeve", user_measurements.arm_length, garment_size.get("sleeve")))
            measurements.append(("Length", user_measurements.torso_length, garment_size.get("length")))

        elif category in ["trousers", "jeans"]:
            # Bottom garments: waist, hips, length
            measurements.append(("Waist", user_measurements.waist, garment_size.get("waist")))
            measurements.append(("Hips", user_measurements.hips, garment_size.get("hips")))
            measurements.append(("Length", user_measurements.leg_length, garment_size.get("length")))

        elif category == "dress":
            # Dresses: chest, waist, hips, length
            measurements.append(("Chest", user_measurements.chest, garment_size.get("chest")))
            measurements.append(("Waist", user_measurements.waist, garment_size.get("waist")))
            measurements.append(("Hips", user_measurements.hips, garment_size.get("hips")))
            measurements.append(("Length", user_measurements.height, garment_size.get("length")))

        return measurements


class MatchingEngine:
    """
    Main matching engine that finds the best garment for a user
    """

    @staticmethod
    def find_best_fit(
        user_measurements: UserMeasurements,
        occasion: str = None,
        category: str = None,
        size_preference: str = "M"
    ) -> Dict:
        """
        Find the single best-fitting garment for the user

        Args:
            user_measurements: UserMeasurements object
            occasion: Optional occasion filter (work, casual, formal, event, ceremony)
            category: Optional category filter (blazer, shirt, dress, etc.)
            size_preference: Preferred size (default M)

        Returns:
            Dict with best_garment, fit_score, explanation, and details
        """

        # Filter garments by occasion if provided
        if occasion:
            candidate_garments = [g for g in GARMENTS if occasion in g["occasions"]]
        else:
            candidate_garments = GARMENTS

        # Filter by category if provided
        if category:
            candidate_garments = [g for g in candidate_garments if g["category"] == category]

        if not candidate_garments:
            return {
                "success": False,
                "error": "No garments match the specified criteria"
            }

        # Calculate fit for each garment in preferred size
        best_garment = None
        best_fit_score = 0
        best_fit_details = None

        for garment in candidate_garments:
            fit_score, details = GarmentFitCalculator.calculate_fit(
                user_measurements, garment, size_preference
            )

            if fit_score > best_fit_score:
                best_fit_score = fit_score
                best_garment = garment
                best_fit_details = details

        if best_garment is None:
            return {
                "success": False,
                "error": "Could not find a suitable garment"
            }

        # Generate explanation
        explanation = MatchingEngine._generate_explanation(
            best_garment, best_fit_score, best_fit_details, user_measurements
        )

        return {
            "success": True,
            "best_garment": {
                "id": best_garment["id"],
                "name": best_garment["name"],
                "brand": best_garment["brand"],
                "category": best_garment["category"],
                "price": best_garment["price"],
                "image_url": best_garment["image_url"],
                "description": best_garment["description"],
                "size": size_preference,
            },
            "fit_score": round(best_fit_score),
            "explanation": explanation,
            "details": best_fit_details,
        }

    @staticmethod
    def _generate_explanation(garment: Dict, fit_score: float, details: Dict, user_measurements: UserMeasurements) -> str:
        """Generate a human-readable explanation of why this garment fits"""

        fabric = garment["fabric"]
        elasticity = fabric.get("elasticity", 0)
        drape_score = fabric.get("drape_score", 5)
        material = fabric.get("material", "Unknown")

        fit_quality = "Perfect" if fit_score >= 95 else "Excellent" if fit_score >= 90 else "Great" if fit_score >= 80 else "Good"

        explanation = f"This {garment['name']} is a {fit_quality.lower()} fit for you ({fit_score}% match). "

        # Add fabric-specific insights
        if elasticity >= 6:
            explanation += f"The {material} fabric has excellent stretch ({elasticity}%), allowing for comfortable movement and flexibility. "
        elif elasticity >= 3:
            explanation += f"The {material} fabric has moderate stretch ({elasticity}%), providing comfort with structure. "
        else:
            explanation += f"The {material} fabric is non-stretch, offering a crisp, tailored look. "

        if drape_score >= 8:
            explanation += "The fabric drapes beautifully, creating an elegant silhouette. "
        elif drape_score >= 5:
            explanation += "The fabric has a balanced drape, flattering your proportions. "
        else:
            explanation += "The fabric maintains its shape, offering a structured fit. "

        # Add measurement-specific insights
        measurement_details = details.get("measurement_details", [])
        perfect_fits = [m for m in measurement_details if m["fit_quality"] == "Perfect"]
        if perfect_fits:
            perfect_names = ", ".join([m["measurement"] for m in perfect_fits[:2]])
            explanation += f"Your {perfect_names} measurements align perfectly with this garment. "

        explanation += "This is the best choice from our collection for your body measurements and preferences."

        return explanation
