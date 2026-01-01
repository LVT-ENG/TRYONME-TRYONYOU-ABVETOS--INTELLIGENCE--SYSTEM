from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .garment_data import GARMENT_DB

app = FastAPI(title="TRYONYOU Core Engine", version="Ultimatum-2.1")

# Configure CORS to allow requests from the frontend (adjust origins as needed)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Fuente [4]: Modelo de datos de entrada (Medidas normalizadas, no video raw)
class UserMeasurements(BaseModel):
    chest: float = Field(..., ge=30, le=200, description="Contorno de pecho en cm")
    waist: float = Field(..., ge=30, le=200, description="Contorno de cintura en cm")
    hips: float = Field(..., ge=30, le=200, description="Contorno de cadera en cm")
    height: float = Field(..., ge=100, le=250, description="Altura en cm")

class MatchResponse(BaseModel):
    garment_id: str
    garment_name: str
    match_score: float
    fit_status: str
    explanation: str

@app.post("/api/match/best", response_model=MatchResponse)
async def calculate_best_fit(user: UserMeasurements):
    best_garment = None
    highest_score = -1.0
    best_explanation = ""

    # Fuente [2]: Lógica determinista
    for garment in GARMENT_DB:
        score = 100.0
        reasons = []

        # 1. Comparación base (Pecho)
        garment_chest = garment["measurements"]["chest"]
        diff = garment_chest - user.chest

        # 2. Ajuste por Elasticidad (Physics-aware logic)
        # Si la prenda es más pequeña que el cuerpo, ¿puede estirar?
        elasticity_limit = garment_chest * garment["fabric_tech"]["elasticity"]

        if diff < 0: # La prenda es más pequeña
            if abs(diff) <= elasticity_limit:
                # Cabe gracias a la elasticidad
                score -= 5  # Pequeña penalización por estiramiento
                reasons.append(f"El tejido elástico se adapta a tu contorno ({int(garment['fabric_tech']['elasticity']*100)}% stretch).")
            else:
                # No cabe ni estirando
                score = 0
                reasons.append("Demasiado ajustado, excede límite de elasticidad.")
        elif diff > 10 and garment["cut_type"] == "slim_fit":
            score -= 20
            reasons.append("Demasiado holgado para un corte Slim.")
        else:
            reasons.append("Ajuste anatómico correcto.")

        # 3. Análisis de Caída (Drape) [3]
        if garment["fabric_tech"]["drape_score"] > 0.8:
            score += 5
            reasons.append("La caída fluida del tejido mejora la silueta.")

        # Seleccionar el mejor
        if score > highest_score:
            highest_score = score
            best_garment = garment
            best_explanation = " ".join(reasons)

    if not best_garment or highest_score < 50:
        return MatchResponse(
            garment_id="NONE",
            garment_name="None",
            match_score=0,
            fit_status="No Match",
            explanation="No encontramos una prenda que cumpla con los estándares de ajuste."
        )

    return MatchResponse(
        garment_id=best_garment["id"],
        garment_name=best_garment["name"],
        match_score=highest_score,
        fit_status="Perfect Fit" if highest_score > 85 else "Good Fit",
        explanation=best_explanation # Fuente [2]: "Why it fits"
    )
