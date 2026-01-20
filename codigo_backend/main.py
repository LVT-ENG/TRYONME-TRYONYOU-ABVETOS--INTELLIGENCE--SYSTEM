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
from typing import Optional, List

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

# Matching Algorithm Constants
DEFAULT_TOLERANCE = 4.5  # cm
DEVIATION_PENALTY_MULTIPLIER = 5
# Reference garment measurements for M size (pilot placeholder)
# NOTE: In production, these should be loaded from catalog.json based on:
#   1. User's size_preference (not just M)
#   2. Actual garment being matched
#   3. Category-specific sizing (dresses vs blazers)
# For pilot phase, we use fixed M size measurements for demonstration
REFERENCE_CHEST_M = 96.0  # cm
REFERENCE_SHOULDER_M = 42.0  # cm
REFERENCE_WAIST_M = 86.0  # cm

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

class UserMeasurements(BaseModel):
    height: float
    weight: float
    chest: float
    waist: float
    hips: float
    shoulder_width: float
    arm_length: float
    leg_length: float
    torso_length: float
    occasion: Optional[str] = None
    category: Optional[str] = None
    size_preference: str = "M"

class MeasurementDetail(BaseModel):
    measurement: str
    user_value: float
    garment_value: float
    deviation: float
    tolerance: float
    fit_quality: str
    fit_score: float

class ResultDetails(BaseModel):
    overall_fit_score: float
    tolerance: float
    fabric_elasticity: float
    fabric_drape: float
    measurement_details: List[MeasurementDetail]

class Garment(BaseModel):
    id: str
    name: str
    brand: str
    category: str
    price: float
    image_url: str
    description: str
    size: str

class MatchingResponse(BaseModel):
    success: bool
    best_garment: Optional[Garment] = None
    fit_score: Optional[float] = None
    explanation: Optional[str] = None
    details: Optional[ResultDetails] = None
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

@app.post("/api/matching", response_model=MatchingResponse)
async def find_matching_garment(measurements: UserMeasurements):
    """
    Find the best matching garment based on user measurements
    
    This endpoint analyzes user body measurements and finds the best fitting
    garment from the catalog, providing detailed fit analysis.
    """
    try:
        # Log the matching request
        await log_event("matching_request", {
            "size_preference": measurements.size_preference,
            "occasion": measurements.occasion,
            "category": measurements.category
        })
        
        # PILOT IMPLEMENTATION NOTE:
        # This is a simplified matching algorithm for demonstration purposes.
        # Production implementation should:
        # 1. Query catalog database with filters (category, occasion)
        # 2. Load actual garment measurements for user's size_preference
        # 3. Use ML model for advanced fit prediction
        # 4. Consider fabric elasticity, drape, and stretch
        # 5. Compare against multiple garments and rank results
        # 6. Return top N matches with detailed analysis
        # Current implementation uses fixed M-size measurements for demo
        
        # Mock garment data
        best_garment = Garment(
            id="laf_blazer_001",
            name="Heritage Navy Blazer",
            brand="Lafayette Couture",
            category="blazer",
            price=1890.00,
            image_url="/images/blazer_navy.jpg",
            description="Classic navy blazer with modern tailoring, perfect for formal occasions. Made from 100% virgin wool with a structured silhouette.",
            size=measurements.size_preference
        )
        
        # Calculate fit metrics based on measurements
        # This is simplified for the pilot - production would use actual garment specs
        chest_deviation = abs(measurements.chest - REFERENCE_CHEST_M)
        shoulder_deviation = abs(measurements.shoulder_width - REFERENCE_SHOULDER_M)
        waist_deviation = abs(measurements.waist - REFERENCE_WAIST_M)
        
        # Calculate fit scores (100 - deviation penalty)
        chest_score = max(0, 100 - (chest_deviation * DEVIATION_PENALTY_MULTIPLIER))
        shoulder_score = max(0, 100 - (shoulder_deviation * DEVIATION_PENALTY_MULTIPLIER))
        waist_score = max(0, 100 - (waist_deviation * DEVIATION_PENALTY_MULTIPLIER))
        
        # Overall fit score
        overall_score = (chest_score + shoulder_score + waist_score) / 3
        
        # Create measurement details
        measurement_details = [
            MeasurementDetail(
                measurement="Chest",
                user_value=measurements.chest,
                garment_value=REFERENCE_CHEST_M,
                deviation=chest_deviation,
                tolerance=DEFAULT_TOLERANCE,
                fit_quality="Perfect" if chest_score >= 95 else "Excellent" if chest_score >= 85 else "Good",
                fit_score=chest_score
            ),
            MeasurementDetail(
                measurement="Shoulder",
                user_value=measurements.shoulder_width,
                garment_value=REFERENCE_SHOULDER_M,
                deviation=shoulder_deviation,
                tolerance=DEFAULT_TOLERANCE,
                fit_quality="Perfect" if shoulder_score >= 95 else "Excellent" if shoulder_score >= 85 else "Good",
                fit_score=shoulder_score
            ),
            MeasurementDetail(
                measurement="Waist",
                user_value=measurements.waist,
                garment_value=REFERENCE_WAIST_M,
                deviation=waist_deviation,
                tolerance=DEFAULT_TOLERANCE,
                fit_quality="Perfect" if waist_score >= 95 else "Excellent" if waist_score >= 85 else "Good",
                fit_score=waist_score
            )
        ]
        
        details = ResultDetails(
            overall_fit_score=round(overall_score, 1),
            tolerance=DEFAULT_TOLERANCE,
            fabric_elasticity=5.0,
            fabric_drape=7.0,
            measurement_details=measurement_details
        )
        
        # Generate explanation
        explanation = (
            f"This {best_garment.name} is a great fit for you ({round(overall_score, 0)}% match). "
            f"The 100% virgin wool fabric has moderate stretch (5%), providing comfort with structure. "
            f"Your measurements align well with this {measurements.size_preference} size garment."
        )
        
        await log_event("matching_success", {
            "fit_score": overall_score,
            "garment_id": best_garment.id,
            "size": measurements.size_preference
        })
        
        return MatchingResponse(
            success=True,
            best_garment=best_garment,
            fit_score=round(overall_score, 1),
            explanation=explanation,
            details=details
        )
    
    except Exception as e:
        logger.error(f"Matching error: {e}")
        await log_event("matching_error", {"error": str(e)})
        return MatchingResponse(
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
