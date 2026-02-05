import os
import sys
import logging
from fastapi import FastAPI, Body, HTTPException
from fastapi.concurrency import run_in_threadpool

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FIS_Orchestrator")

# Fix Import Path for Vercel Serverless Environment
# Vercel sometimes isolates the 'api' directory, breaking relative imports
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

try:
    from .fis_engine import FISOrchestrator
except ImportError:
    try:
        from fis_engine import FISOrchestrator
    except ImportError as e:
        logger.error(f"Failed to import FISOrchestrator: {e}")
        FISOrchestrator = None

app = FastAPI()

# Initialize Orchestrator Safely
orchestrator = None
init_error = None
try:
    if FISOrchestrator:
        orchestrator = FISOrchestrator()
        logger.info("FIS Orchestrator initialized successfully.")
    else:
        init_error = "Module Import Failed"
except Exception as e:
    logger.error(f"FIS Orchestrator Initialization Failed: {e}")
    init_error = str(e)

@app.get("/api/health")
async def health():
    status = "online" if orchestrator else "degraded"
    return {
        "status": status,
        "system": "FIS v7.0",
        "client": "Galeries Lafayette",
        "orchestrator_status": "ready" if orchestrator else "failed",
        "error": init_error
    }

@app.post("/api/recommend")
async def recommend(data: dict = Body(...)):
    if not orchestrator:
        raise HTTPException(status_code=503, detail=f"Orchestrator not initialized: {init_error}")

    # Priorizar el inventario real de Elena
    # Vercel Environment: Root is often one level up from 'api'
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    inventory_path = os.path.join(root_dir, "TRYONYOU_CRM_MASTER_CLEAN-1.xlsx")

    # Debugging Paths
    logger.info(f"Looking for inventory at: {inventory_path}")
    
    if not os.path.exists(inventory_path):
        logger.warning(f"Inventory not found at {inventory_path}. Checking fallback...")
        inventory_path = os.path.join(root_dir, "src/inventory_index.json")
        if not os.path.exists(inventory_path):
            logger.error(f"Fallback inventory NOT found at {inventory_path}")
            # List files in root to debug
            try:
                files = os.listdir(root_dir)
                logger.error(f"Files in root ({root_dir}): {files}")
            except Exception as e:
                logger.error(f"Could not list root dir: {e}")

    # ⚡ Bolt Optimization: Offload synchronous blocking call (GenAI + File I/O) to threadpool
    # This prevents blocking the main asyncio event loop
    return await run_in_threadpool(orchestrator.run_experience, data, inventory_path)

@app.get("/api/reserve/{product_id}")
async def reserve(product_id: str):
    if not orchestrator:
        raise HTTPException(status_code=503, detail="Orchestrator not initialized")

    # ⚡ Bolt Optimization: Offload synchronous QR generation (Image I/O) to threadpool
    qr_url = await run_in_threadpool(orchestrator.pau.generate_qr, product_id)
    return {"qr_url": qr_url}
