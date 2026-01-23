from pydantic import BaseModel
from typing import List, Optional

class UserData(BaseModel):
    height: float  # cm
    weight: float  # kg
    landmarks: List[dict] # MediaPipe points (x, y, z)
    event_type: str # "Gala", "Business", "Casual"

class Garment(BaseModel):
    id: str
    name: str
    category: str
    elasticity: float # 0.0 to 1.0
    base_measurements: dict # chest, waist, hip in cm

class RecommendationResponse(BaseModel):
    status: str
    message: str
    recommendation: dict
