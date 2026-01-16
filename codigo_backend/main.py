#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TryOnYou.app — Pilot Backend
FastAPI application for virtual try-on service
"""

import os
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import aiofiles

# Configuration
APP_MODE = os.getenv("APP_MODE", "dev")
PILOT_NAME = os.getenv("PILOT_NAME", "default")
PILOT_CLIENT = os.getenv("PILOT_CLIENT", "demo")
CATALOG_PATH = os.getenv("PILOT_CATALOG_PATH", "pilot_assets/catalog.sample.json")
EVENTS_FILE = os.getenv("EVENTS_FILE", "pilot_data/events.ndjson")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Logging setup
logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("tryonyou")

# FastAPI app
app = FastAPI(
    title="TryOnYou API",
    description="Virtual Try-On Service for Fashion Retail",
    version="1.0.0-pilot",
    docs_url="/docs" if APP_MODE != "production" else None
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Models ----------
class TryOnRequest(BaseModel):
    user_image: str  # base64 or URL
    product_id: str
    options: Optional[dict] = None

class TryOnResponse(BaseModel):
    success: bool
    output_image: Optional[str] = None
    processing_time_ms: Optional[int] = None
    error: Optional[str] = None

# ---------- Event logging ----------
async def log_event(event_type: str, data: dict):
    """Log event to NDJSON file for metrics"""
    event = {
        "event": event_type,
        "ts": datetime.utcnow().isoformat() + "Z",
        "pilot": PILOT_NAME,
        "client": PILOT_CLIENT,
        **data
    }
    
    Path(EVENTS_FILE).parent.mkdir(parents=True, exist_ok=True)
    
    async with aiofiles.open(EVENTS_FILE, "a") as f:
        await f.write(json.dumps(event) + "\n")

# ---------- Endpoints ----------
@app.get("/status")
async def status():
    """Healthcheck endpoint"""
    return {
        "ok": True,
        "service": "tryonyou",
        "mode": APP_MODE,
        "pilot": PILOT_NAME,
        "client": PILOT_CLIENT,
        "version": "1.0.0-pilot",
        "ts": datetime.utcnow().isoformat() + "Z"
    }

@app.get("/api/catalog")
async def get_catalog():
    """Get product catalog"""
    try:
        catalog_path = Path(CATALOG_PATH)
        if not catalog_path.exists():
            raise HTTPException(status_code=404, detail="Catalog not found")
        
        with open(catalog_path) as f:
            catalog = json.load(f)
        
        await log_event("catalog_view", {"items_count": len(catalog.get("items", []))})
        return catalog
    
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid catalog format")

@app.get("/api/catalog/{product_id}")
async def get_product(product_id: str):
    """Get single product by ID"""
    try:
        with open(CATALOG_PATH) as f:
            catalog = json.load(f)
        
        for item in catalog.get("items", []):
            if item.get("sku") == product_id:
                await log_event("product_view", {"product_id": product_id})
                return item
        
        raise HTTPException(status_code=404, detail="Product not found")
    
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Catalog not found")

@app.post("/api/try-on", response_model=TryOnResponse)
async def try_on(request: TryOnRequest):
    """
    Virtual try-on endpoint
    
    In pilot mode, this returns a placeholder response.
    Full implementation requires ML model integration.
    """
    import time
    start_time = time.time()
    
    try:
        # Log the try-on attempt
        await log_event("try_on_request", {
            "product_id": request.product_id,
            "has_user_image": bool(request.user_image),
            "options": request.options
        })
        
        # Validate product exists
        with open(CATALOG_PATH) as f:
            catalog = json.load(f)
        
        product = None
        for item in catalog.get("items", []):
            if item.get("sku") == request.product_id:
                product = item
                break
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        if not product.get("try_on_enabled", False):
            raise HTTPException(status_code=400, detail="Try-on not enabled for this product")
        
        # TODO: Integrate with actual ML model
        # For pilot, return placeholder
        processing_time = int((time.time() - start_time) * 1000)
        
        await log_event("try_on_success", {
            "product_id": request.product_id,
            "processing_time_ms": processing_time
        })
        
        return TryOnResponse(
            success=True,
            output_image=f"https://placeholder.tryonyou.app/result/{request.product_id}.jpg",
            processing_time_ms=processing_time
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Try-on error: {e}")
        await log_event("try_on_error", {
            "product_id": request.product_id,
            "error": str(e)
        })
        return TryOnResponse(
            success=False,
            error=str(e)
        )

@app.get("/api/metrics")
async def get_metrics():
    """Get basic usage metrics (admin only in production)"""
    try:
        events_path = Path(EVENTS_FILE)
        if not events_path.exists():
            return {"events": 0, "message": "No events yet"}
        
        events = []
        with open(events_path) as f:
            for line in f:
                if line.strip():
                    events.append(json.loads(line))
        
        # Basic aggregation
        event_counts = {}
        for e in events:
            event_type = e.get("event", "unknown")
            event_counts[event_type] = event_counts.get(event_type, 0) + 1
        
        return {
            "total_events": len(events),
            "event_counts": event_counts,
            "period": {
                "start": events[0].get("ts") if events else None,
                "end": events[-1].get("ts") if events else None
            }
        }
    
    except Exception as e:
        logger.error(f"Metrics error: {e}")
        raise HTTPException(status_code=500, detail="Error reading metrics")

# ---------- Startup ----------
@app.on_event("startup")
async def startup():
    logger.info(f"Starting TryOnYou API in {APP_MODE} mode")
    logger.info(f"Pilot: {PILOT_NAME} | Client: {PILOT_CLIENT}")
    
    # Ensure directories exist
    Path("pilot_data").mkdir(exist_ok=True)
    Path("pilot_assets").mkdir(exist_ok=True)
    
    # Log startup event
    await log_event("service_start", {"mode": APP_MODE})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
