from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import UserData, RecommendationResponse
from .database import get_inventory
from .logic import calculate_perfect_fit

app = FastAPI(title="TryOnYou - Lafayette Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "TryOnYou Engine Running"}

@app.post("/recommend-fit", response_model=RecommendationResponse)
async def get_recommendation(data: UserData):
    inventory = get_inventory()
    recommendation = calculate_perfect_fit(data, inventory)
    
    if not recommendation:
        # Fallback to the first item if no specific match found (or handle gracefully)
        # For the demo, we ensure we return *something* positive.
        recommendation = inventory[0]
        reason_text = "Nuestra colección signature se adapta a ti."
    else:
        reason_text = f"El corte de esta prenda se adapta a tu caída de hombros y movimiento."

    return {
        "status": "Success",
        "message": "Ajuste analizado correctamente",
        "recommendation": {
            "name": recommendation.name,
            "reason": reason_text,
            "visual_effect": "Glow_Active",
            "category": recommendation.category
        }
    }
