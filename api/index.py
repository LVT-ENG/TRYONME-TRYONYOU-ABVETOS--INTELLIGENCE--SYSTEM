from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from mangum import Mangum
import os

try:
    from api._fis_engine import FISOrchestrator, PauAgent
except ImportError:
    # Fallback for local testing if run directly
    from _fis_engine import FISOrchestrator, PauAgent

app = FastAPI()
handler = Mangum(app)

# Fallback inventory (Mock Data)
INVENTARIO_ELENA = [
    {
        "id": "GL-001",
        "name": "Blazer Ivory Elena",
        "Title": "Blazer Ivory Elena",
        "Variant Price": "890",
        "Image Src": "/assets/catalog/blazer_ivory.png",
        "match_score": 0.98,
        "measure": 0.98
    },
    {
        "id": "GL-002",
        "name": "Robe Soie Lafayette",
        "Title": "Robe Soie Lafayette",
        "Variant Price": "1200",
        "Image Src": "/assets/catalog/red_dress_minimal.png",
        "match_score": 0.95,
        "measure": 0.95
    },
    {
        "id": "GL-003",
        "name": "Pantalon Noir Premium",
        "Title": "Pantalon Noir Premium",
        "Variant Price": "550",
        "Image Src": "/assets/catalog/pantalon_noir.png",
        "match_score": 0.92,
        "measure": 0.92
    }
]

# Global instances (lazy initialization pattern for Serverless)
_orchestrator = None
_pau_agent = None
_INVENTORY_PATH_CACHE = None

def get_orchestrator():
    global _orchestrator
    if _orchestrator is None:
        _orchestrator = FISOrchestrator()
    return _orchestrator

def get_pau_agent():
    global _pau_agent
    if _pau_agent is None:
        _pau_agent = PauAgent()
    return _pau_agent

def get_inventory_path():
    global _INVENTORY_PATH_CACHE
    if _INVENTORY_PATH_CACHE:
        return _INVENTORY_PATH_CACHE
    
    # Priority 1: src/inventory_index.json (Auto-generated from public/assets/catalog)
    candidates = [
        "src/inventory_index.json",
        "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx",
        "external_inventory.json"
    ]
    
    for path in candidates:
        if os.path.exists(path):
            _INVENTORY_PATH_CACHE = path
            print(f"Inventory loaded from: {path}")
            return path

    # Fallback if nothing found
    print("WARNING: No inventory file found. Using memory fallback.")
    return None

@app.get("/api/health")
def health_check():
    return {
        "status": "VIVO",
        "sistema": "Divineo V7",
        "inventory": get_inventory_path() or "MEMORY_FALLBACK"
    }

@app.post("/api/recommend")
async def recommend(user_data: dict = Body(...)):
    """
    Recibe medidas del usuario y retorna recomendaciones usando Agent 70.
    """
    orch = get_orchestrator()
    inv_path = get_inventory_path()

    if not inv_path:
        # Fallback to mock data if no inventory file exists
        print("Using INVENTARIO_ELENA fallback.")
        narrative = "Agent 70 (Fallback): Sistema en modo demostración. Inventario simulado activo."
        return {
            "recommendations": INVENTARIO_ELENA,
            "narrative": narrative
        }

    result = orch.run_experience(user_data, inv_path)
    return result

@app.get("/api/reserve/{product_id}")
async def reserve_product(product_id: str):
    """
    Genera un QR para reservar el producto en probador VIP.
    """
    pau = get_pau_agent()
    qr_data_uri = pau.generate_qr(product_id)
    return {"product_id": product_id, "qr_url": qr_data_uri}

@app.post("/api/snap", deprecated=True)
async def procesar_chasquido(datos: dict):
    """
    Endpoint deprecated. Use /api/recommend instead.
    """
    headers = {
        "Deprecation": "true",
        "Sunset": "Wed, 31 Dec 2025 23:59:59 GMT",
        'Link': '</api/recommend>; rel="successor-version"',
    }
    return JSONResponse(
        status_code=410,
        content={
            "detail": "This endpoint is deprecated and no longer available. Use /api/recommend instead."
        },
        headers=headers,
    )
