"""
Vercel Serverless Function: /api/matching
Receives user measurements and returns best-fit garment
"""

from typing import Optional
from pydantic import BaseModel
from api.matching.engine import UserMeasurements, MatchingEngine

class UserMeasurementsRequest(BaseModel):
    """Request body for matching endpoint"""
    height: float  # cm
    weight: float  # kg
    chest: float  # cm
    waist: float  # cm
    hips: float  # cm
    shoulder_width: float  # cm
    arm_length: float  # cm
    leg_length: float  # cm
    torso_length: float  # cm
    occasion: Optional[str] = None  # work, casual, formal, event, ceremony
    category: Optional[str] = None  # blazer, shirt, dress, trousers, etc.
    size_preference: str = "M"  # XS, S, M, L, XL


def handler(request):
    """
    Main handler for the matching endpoint
    """

    # Parse request
    try:
        data = request.json() if hasattr(request, 'json') else request
        measurements_req = UserMeasurementsRequest(**data)
    except Exception as e:
        return {
            "statusCode": 400,
            "body": {"error": f"Invalid request: {str(e)}"}
        }

    # Create user measurements object
    user_measurements = UserMeasurements(
        height=measurements_req.height,
        weight=measurements_req.weight,
        chest=measurements_req.chest,
        waist=measurements_req.waist,
        hips=measurements_req.hips,
        shoulder_width=measurements_req.shoulder_width,
        arm_length=measurements_req.arm_length,
        leg_length=measurements_req.leg_length,
        torso_length=measurements_req.torso_length,
    )

    # Find best fit
    result = MatchingEngine.find_best_fit(
        user_measurements=user_measurements,
        occasion=measurements_req.occasion,
        category=measurements_req.category,
        size_preference=measurements_req.size_preference,
    )

    return {
        "statusCode": 200 if result.get("success") else 400,
        "body": result
    }
