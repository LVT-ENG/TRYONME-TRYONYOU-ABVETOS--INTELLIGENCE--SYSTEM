import sys
import os

# Añadir el directorio raíz al path para importar fis_engine
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Body
from fis_engine import FISOrchestrator

app = FastAPI()
orchestrator = FISOrchestrator()

@app.get("/api/health")
async def health():
    return {"status": "online", "system": "FIS v7.0", "client": "Galeries Lafayette"}

@app.post("/api/recommend")
async def recommend(data: dict = Body(...)):
    # Priorizar el inventario real de Elena
    inventory_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx")
    if not os.path.exists(inventory_path):
        inventory_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src/inventory_index.json")
    
    return orchestrator.run_experience(data, inventory_path)

@app.get("/api/reserve/{product_id}")
async def reserve(product_id: str):
    qr_url = orchestrator.pau.generate_qr(product_id)
    return {"qr_url": qr_url}
