import os
from fastapi import FastAPI, Body
from fastapi.concurrency import run_in_threadpool
from .fis_engine import FISOrchestrator

# Optimize: Resolve inventory path once at module load
# This prevents redundant filesystem checks on every request
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CRM_PATH = os.path.join(ROOT_DIR, "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx")
FALLBACK_PATH = os.path.join(ROOT_DIR, "src/inventory_index.json")

INVENTORY_PATH = CRM_PATH if os.path.exists(CRM_PATH) else FALLBACK_PATH

app = FastAPI()
orchestrator = FISOrchestrator()

@app.get("/api/health")
async def health():
    return {"status": "online", "system": "FIS v7.0", "client": "Galeries Lafayette"}

@app.post("/api/recommend")
async def recommend(data: dict = Body(...)):
    # ⚡ Bolt Optimization: Offload synchronous blocking call (GenAI + File I/O) to threadpool
    # This prevents blocking the main asyncio event loop
    return await run_in_threadpool(orchestrator.run_experience, data, INVENTORY_PATH)

@app.get("/api/reserve/{product_id}")
async def reserve(product_id: str):
    # ⚡ Bolt Optimization: Offload synchronous QR generation (Image I/O) to threadpool
    qr_url = await run_in_threadpool(orchestrator.pau.generate_qr, product_id)
    return {"qr_url": qr_url}
