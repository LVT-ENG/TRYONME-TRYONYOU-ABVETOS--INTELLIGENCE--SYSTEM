import os
from fastapi import FastAPI, Body
from fastapi.concurrency import run_in_threadpool
from .fis_engine import FISOrchestrator

# Optimize: Cache inventory path using a simple lazy global variable
# This ensures path resolution happens only once, safely inside the request context
_INVENTORY_PATH_CACHE = None

def get_inventory_path():
    global _INVENTORY_PATH_CACHE
    if _INVENTORY_PATH_CACHE is None:
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        crm_path = os.path.join(root_dir, "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx")
        fallback_path = os.path.join(root_dir, "src/inventory_index.json")
        _INVENTORY_PATH_CACHE = crm_path if os.path.exists(crm_path) else fallback_path

    return _INVENTORY_PATH_CACHE

app = FastAPI()
orchestrator = FISOrchestrator()

@app.get("/api/health")
async def health():
    return {"status": "online", "system": "FIS v7.0", "client": "Galeries Lafayette"}

@app.post("/api/recommend")
async def recommend(data: dict = Body(...)):
    # ⚡ Bolt Optimization: Offload synchronous blocking call (GenAI + File I/O) to threadpool
    # This prevents blocking the main asyncio event loop
    return await run_in_threadpool(orchestrator.run_experience, data, get_inventory_path())

@app.get("/api/reserve/{product_id}")
async def reserve(product_id: str):
    # ⚡ Bolt Optimization: Offload synchronous QR generation (Image I/O) to threadpool
    qr_url = await run_in_threadpool(orchestrator.pau.generate_qr, product_id)
    return {"qr_url": qr_url}
