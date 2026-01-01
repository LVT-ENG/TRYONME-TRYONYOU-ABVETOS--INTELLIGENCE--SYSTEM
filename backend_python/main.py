import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(
    title="TRYONYOU Core Engine",
    description="Motor de coincidencia biométrica y lógica de ajuste determinista (Ultimatum Pilot)",
    version="2.1.0"
)

# --- MODELOS DE DATOS (Fuente 847, 849) ---
class BodyMeasurements(BaseModel):
    # Medidas normalizadas, no video raw (Fuente 848)
    chest: float
    waist: float
    hips: float
    shoulder_width: float
    height: Optional[float] = None
    arm_length: Optional[float] = None
    torso_length: Optional[float] = None

class FabricTech(BaseModel):
    elasticity: float = Field(..., description="Porcentaje de elasticidad (0.0 a 1.0) - Fuente 849")
    drape_score: float = Field(..., description="Puntuación de caída (0 rígido - 1 fluido)")

class Garment(BaseModel):
    id: str
    name: str
    measurements: dict  # Medidas de la prenda en plano
    fabric_tech: FabricTech
    cut_type: str       # Slim, Regular, Oversized

class MatchResult(BaseModel):
    garment_id: str
    match_score: float  # 0 a 100
    fit_status: str     # Perfect, Tight, Loose
    explanation: str    # "Why it fits" (Fuente 850)

# --- BASE DE DATOS MOCK (Fuente 849 - Lafayette-like) ---
GARMENT_DB = [
    Garment(
        id="G-101", name="Milano Tech Blazer",
        measurements={"chest": 102, "waist": 90},
        fabric_tech=FabricTech(elasticity=0.05, drape_score=0.8),
        cut_type="Slim"
    ),
    Garment(
        id="G-102", name="Nebula Elastic Shirt",
        measurements={"chest": 98, "waist": 88},
        fabric_tech=FabricTech(elasticity=0.20, drape_score=0.9), # Alta elasticidad
        cut_type="Regular"
    )
]

# --- MATCHING ENGINE (Fuente 850 - Core Logic) ---
def calculate_fit(user: BodyMeasurements, garment: Garment) -> MatchResult:
    score = 100.0
    reasons = []

    # 1. Análisis de Pecho con Elasticidad
    garment_chest = garment.measurements.get("chest", 0)
    diff_chest = garment_chest - user.chest

    # Tolerancia basada en elasticidad (Fuente 849)
    elasticity_bonus = garment.fabric_tech.elasticity * 15

    if diff_chest < 0: # La prenda es más pequeña que el cuerpo
        if abs(diff_chest) <= elasticity_bonus:
            score -= 5 # Penalización menor gracias a la tela
            reasons.append(f"El tejido elástico ({int(garment.fabric_tech.elasticity*100)}%) se adapta a tu pecho.")
        else:
            score -= 50 # Penalización grave
            reasons.append("Demasiado ajustado en el pecho.")
    else:
        reasons.append("Ajuste cómodo en pecho.")

    # 2. Análisis de Caída (Drape)
    if garment.fabric_tech.drape_score > 0.8:
        reasons.append("La caída fluida del tejido mejora la silueta.")
        score += 5

    return MatchResult(
        garment_id=garment.id,
        match_score=max(0, min(100, score)),
        fit_status="Perfect Fit" if score > 85 else "Check Size",
        explanation=" ".join(reasons)
    )

@app.post("/api/match/best", response_model=MatchResult)
async def get_best_match(user_metrics: BodyMeasurements):
    """
    Selecciona la MEJOR prenda, no una lista (Fuente 850).
    """
    best_result = None
    highest_score = -1

    for garment in GARMENT_DB:
        result = calculate_fit(user_metrics, garment)
        if result.match_score > highest_score:
            highest_score = result.match_score
            best_result = result

    return best_result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
