import os
from fastapi import FastAPI, Body
from functools import lru_cache
from fastapi.concurrency import run_in_threadpool
from .fis_engine import FISOrchestrator

# Optimize: Cache inventory path resolution using lru_cache
# This prevents redundant filesystem checks on every request while ensuring safe lazy loading
@lru_cache(maxsize=1)
def get_inventory_path():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    crm_path = os.path.join(root_dir, "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx")
    fallback_path = os.path.join(root_dir, "src/inventory_index.json")

    return crm_path if os.path.exists(crm_path) else fallback_path

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
