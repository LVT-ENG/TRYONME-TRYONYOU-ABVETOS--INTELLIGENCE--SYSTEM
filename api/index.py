from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from mangum import Mangum
import os
import json
import random

try:
    from ._fis_engine import FISOrchestrator
except ImportError:
    from _fis_engine import FISOrchestrator

app = FastAPI()
handler = Mangum(app)

# --- LEGACY INVENTORY (Divineo V7) ---
INVENTARIO_LEGACY = [
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

# --- NEW FALLBACK INVENTORY (Lafayette V7.1 - Agent 70 compatible) ---
INVENTARIO_FALLBACK = [
    {
        "id": "GL-001",
        "Title": "Blazer Ivory Elena",
        "Variant Price": "42",
        "_parsed_price": 42.0,
        "Image Src": "/assets/catalog/blazer_ivory.png",
        "Handle": "blazer-ivory"
    },
    {
        "id": "GL-002",
        "Title": "Robe Soie Lafayette",
        "Variant Price": "38",
        "_parsed_price": 38.0,
        "Image Src": "/assets/catalog/red_dress_minimal.png",
        "Handle": "robe-soie"
    },
    {
        "id": "GL-003",
        "Title": "Pantalon Noir Premium",
        "Variant Price": "40",
        "_parsed_price": 40.0,
        "Image Src": "/assets/catalog/pantalon_noir.png",
        "Handle": "pantalon-noir"
    }
]

_orchestrator = None

def get_orchestrator():
    global _orchestrator
    if not _orchestrator:
        _orchestrator = FISOrchestrator()
    return _orchestrator

def get_inventory_path():
    if os.path.exists("TRYONYOU_CRM_MASTER_CLEAN-1.xlsx"):
        return "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx"
    elif os.path.exists("src/inventory_index.json"):
        return "src/inventory_index.json"
    return "src/inventory_index.json"

# --- MODELS ---
class SnapRequest(BaseModel):
    gender: str
    height: int = 0

class RecommendationRequest(BaseModel):
    user_id: str
    shoulder_width: float = 0
    torso_length: float = 0
    hip_width: float = 0
    chest: float = 0
    waist: float = 0
    height: float = 0
    zero_numbers: bool = False

# --- ENDPOINTS ---

@app.get("/api/health")
def health_check():
    return {
        "status": "VIVO",
        "sistema": "Divineo V7 / Lafayette V7.1",
        "google_platforms": "ACTIVE",
        "agent_70": "ONLINE"
    }

# Legacy Endpoint
@app.post("/api/snap")
def procesar_chasquido(datos: SnapRequest):
    seleccion = random.choice(INVENTARIO_LEGACY)
    return {
        "success": True,
        "prenda": seleccion,
        "meta": {
            "fit_score": 99.7,
            "agent_id": "Agente-007-Stylist"
        }
    }

# New Endpoint (Agent 70)
@app.post("/api/recommend")
def recommend(data: RecommendationRequest):
    orch = get_orchestrator()
    inventory_path = get_inventory_path()
    user_data = data.dict()

    # Try loading from file
    if os.path.exists(inventory_path):
        result = orch.run_experience(user_data, inventory_path)
        if "error" not in result:
            return result
        print(f"Orchestrator Error: {result['error']}")

    # Fallback
    print("Using fallback inventory (Lafayette V7.1)")
    return orch.a70.match(orch.jules.sanitize(user_data), INVENTARIO_FALLBACK)

@app.get("/api/reserve/{product_id}")
def reserve(product_id: str):
    orch = get_orchestrator()
    qr_url = orch.pau.generate_qr(product_id)
    return {"qr_url": qr_url}
