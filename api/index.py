from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import json
import math
import os

app = FastAPI()

# Load Database
DB_PATH = os.path.join(os.path.dirname(__file__), "db.json")
try:
    with open(DB_PATH, "r") as f:
        GARMENT_DB = json.load(f)
except Exception as e:
    print(f"Error loading DB: {e}")
    GARMENT_DB = []

class BodyProfile(BaseModel):
    height: float
    shoulders: float
    chest: float
    waist: float
    hips: float
    torso_length: Optional[float] = 0
    leg_length: Optional[float] = 0
    weight: Optional[float] = 0
    event_type: Optional[str] = "casual" # formal, casual, work, night

class RecommendationResult(BaseModel):
    sku: str
    name: str
    brand: str
    image: str
    size: str
    score: float
    match_reason: str
    fit_description: str

@app.get("/api/health")
def health_check():
    return {"status": "ok", "mode": "pilot"}

@app.post("/api/recommend", response_model=Dict[str, Any])
def recommend_garment(profile: BodyProfile):
    """
    Core Recommendation Engine.
    Matches user biometrics against garment physics and measurements.
    """
    best_match = None
    best_score = -1.0
    alternatives = []

    # Filter by event type logic (simplified for Pilot)
    # Mapping event to categories
    target_categories = []
    if profile.event_type in ["formal", "work"]:
        target_categories = ["jacket", "dress"]
    elif profile.event_type in ["casual", "night"]:
        target_categories = ["casual", "dress"]
    else:
        target_categories = ["jacket", "dress", "casual"]

    candidates = [g for g in GARMENT_DB if g["category"] in target_categories]

    if not candidates:
        # Fallback to all if strict filtering returns nothing
        candidates = GARMENT_DB

    for garment in candidates:
        # Check every size for this garment
        for size_label, measures in garment["measurements"].items():
            score, reason = calculate_fit_score(profile, measures, garment["fabric"], garment["fit_type"])

            # Penalize slightly if event type doesn't perfectly match (if we had strict event mapping)

            result = {
                "sku": garment["sku"],
                "name": garment["name"],
                "brand": garment["brand"],
                "image": garment["image"],
                "size": size_label,
                "score": score,
                "match_reason": reason,
                "fit_description": garment["description"],
                "fabric_elasticity": garment["fabric"]["elasticity"]
            }

            if score > best_score:
                # Demote current best to alternatives
                if best_match:
                    alternatives.append(best_match)
                best_match = result
                best_score = score
            else:
                alternatives.append(result)

    # Sort alternatives by score
    alternatives.sort(key=lambda x: x["score"], reverse=True)

    if not best_match:
        raise HTTPException(status_code=404, detail="No suitable garment found")

    return {
        "winner": best_match,
        "alternatives": alternatives[:2]
    }

def calculate_fit_score(profile: BodyProfile, garment_measures: dict, fabric: dict, fit_type: str) -> (float, str):
    """
    Calculates a 0-100 score based on body vs garment delta, elasticity, and fit preference.
    """
    score = 100.0
    reasons = []

    # Key measurements to compare
    comparison_points = []
    if "chest" in garment_measures and profile.chest > 0:
        comparison_points.append(("chest", profile.chest, garment_measures["chest"]))
    if "waist" in garment_measures and profile.waist > 0:
        comparison_points.append(("waist", profile.waist, garment_measures["waist"]))
    if "hips" in garment_measures and profile.hips > 0:
        comparison_points.append(("hips", profile.hips, garment_measures["hips"]))
    if "shoulders" in garment_measures and profile.shoulders > 0:
        comparison_points.append(("shoulders", profile.shoulders, garment_measures["shoulders"]))

    if not comparison_points:
        return 0, "Insufficent data"

    total_delta = 0
    elasticity_factor = 1.0 + fabric["elasticity"] # e.g., 1.15 for 15% stretch

    for point, body_val, garment_val in comparison_points:
        # Delta: Positive means Body > Garment (Tight). Negative means Body < Garment (Loose).
        delta = body_val - garment_val

        # Physics logic
        if delta > 0:
            # Body is bigger than garment.
            # Allowable stretch?
            max_stretch = garment_val * fabric["elasticity"]
            if delta <= max_stretch:
                # Within stretch limit. Slight penalty for tightness but acceptable.
                score -= (delta / max_stretch) * 10 # Deduct up to 10 points for max stretch
                reasons.append(f"{point} fits tight but within elasticity limits.")
            else:
                # Exceeds stretch. Major penalty.
                score -= (delta - max_stretch) * 50 # Heavy penalty
                reasons.append(f"{point} is too tight.")
        else:
            # Garment is bigger than body.
            # Loose fit.
            excess = abs(delta)
            if fit_type == "slim":
                if excess > 4: # Too loose for slim
                    score -= (excess - 4) * 5
                    reasons.append(f"{point} is too loose for slim fit.")
            else: # Regular
                if excess > 8:
                    score -= (excess - 8) * 3

    # Length check (heuristic)
    if "length" in garment_measures:
        # Check against torso or total height heuristic
        # Simplified: If garment length is wildly off vs height logic
        pass

    final_score = max(0, min(100, score))

    primary_reason = reasons[0] if reasons else "Perfect fit."
    if final_score < 60:
        primary_reason = "Poor fit based on biometrics."

    return final_score, primary_reason
