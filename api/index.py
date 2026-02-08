from fastapi import FastAPI
from pydantic import BaseModel
from mangum import Mangum
import random
import os
import sys

# Ensure api directory is in path for imports
try:
    from api._fis_engine import FISOrchestrator
except ImportError:
    # When running as lambda or from api directory
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    from _fis_engine import FISOrchestrator

app = FastAPI()
handler = Mangum(app)

# Initialize Orchestrator
orchestrator = FISOrchestrator()

# --- Models ---
class RecommendRequest(BaseModel):
    chest: float
    waist: float
    height: float
    user_id: str = "PILOT_USER"

class SnapRequest(BaseModel):
    gender: str
    height: int = 0

# --- Routes ---

@app.get("/api/health")
def health_check():
    return {"status": "VIVO", "sistema": "Divineo V7"}

@app.post("/api/recommend")
def recommend(data: RecommendRequest):
    # Locate inventory file
    # Try different paths depending on environment (local vs lambda)
    possible_paths = [
        os.path.join(os.getcwd(), 'src', 'inventory_index.json'),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'inventory_index.json'),
        'src/inventory_index.json'
    ]

    inventory_path = None
    for path in possible_paths:
        if os.path.exists(path):
            inventory_path = path
            break

    if not inventory_path:
        return {"error": "Inventory file not found", "paths_checked": possible_paths}

    user_data = {
        "chest": data.chest,
        "waist": data.waist,
        "height": data.height,
        "user_id": data.user_id
    }

    # Run Orchestrator
    try:
        result = orchestrator.run_experience(user_data, inventory_path)
        return result
    except Exception as e:
raise HTTPException(status_code=500, detail="An internal server error occurred.")

@app.get("/api/reserve/{product_id}")
def reserve(product_id: str):
    try:
        qr_url = orchestrator.pau.generate_qr(product_id)
        return {"qr_url": qr_url}
    except Exception as e:
        return {"error": str(e)}

# --- Legacy / Home Snap Route (Keep functional for Landing Page) ---
# BASE DE DATOS DE ELENA (Inyectada como constante para velocidad de piloto)
INVENTARIO_ELENA = [
    {
        "id": "GL-001",
        "nombre": "Blazer Ivory Elena",
        "tipo": "Fitted",
        "elasticidad": "Media",
        "mensaje": "La caída de este tejido estructura tus hombros sin rigidez.",
        "imagen": "/assets/catalog/blazer_ivory.png" 
    },
    {
        "id": "GL-002",
        "nombre": "Robe Soie Lafayette",
        "tipo": "Fluid",
        "elasticidad": "Alta",
        "mensaje": "Seda líquida que se adapta a tu movimiento natural.",
        "imagen": "/assets/catalog/red_dress_minimal.png"
    },
    {
        "id": "GL-003",
        "nombre": "Pantalon Noir Premium",
        "tipo": "Relaxed",
        "elasticidad": "Baja",
        "mensaje": "Corte sartorial que respeta tu silueta.",
        "imagen": "/assets/catalog/pantalon_noir.png"
    }
]

@app.post("/api/snap")
def procesar_chasquido(datos: SnapRequest):
    # Lógica de selección "Inteligente" para la demo landing page
    seleccion = random.choice(INVENTARIO_ELENA)
    
    return {
        "success": True,
        "prenda": seleccion,
        "meta": {
            "fit_score": 99.7,
            "agent_id": "Agente-007-Stylist"
        }
    }
