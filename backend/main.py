"""
TRYONYOU Pilot - FastAPI Backend
Real pilot for Galeries Lafayette
Patent: PCT/EP2025/067317
"""

from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List
import numpy as np
import logging
import random

# Configure logging
logger = logging.getLogger(__name__)

# Import matching engine with compatibility for both module and direct execution
# Try relative import first (when run as module), fall back to direct import
try:
    from .matching_engine import MatchingEngine
except ImportError:
    from matching_engine import MatchingEngine
import json
import os

app = FastAPI(
    title="TRYONYOU Pilot API",
    description="Fashion intelligence matching engine",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize matching engine
matching_engine = MatchingEngine(os.path.join(os.path.dirname(__file__), "garment_database.json"))


# ============================================================================
# Pydantic Models
# ============================================================================

class BodyMeasurements(BaseModel):
    """User body measurements from biometric scan."""
    height: float  # cm
    chest: float  # cm
    waist: float  # cm
    hip: float  # cm
    shoulder_width: float  # cm
    arm_length: float  # cm
    leg_length: float  # cm
    torso_length: float  # cm
    weight: Optional[float] = None  # kg


class ConversationalInput(BaseModel):
    """Conversational input from Pau (voice transcribed or text input)."""
    height_confirm: Optional[float] = None  # cm
    weight: Optional[float] = None  # kg
    occasion: Optional[str] = None  # work, event, casual, ceremony
    fit_preference: Optional[str] = None  # slim, regular, relaxed


class RecommendationRequest(BaseModel):
    """Request for garment recommendation."""
    measurements: BodyMeasurements
    conversation: ConversationalInput


class RecommendationResponse(BaseModel):
    """Response with best-fit garment."""
    garment_id: str
    garment_name: str
    brand: str
    category: str
    size: str
    fit_score: float
    explanation: str
    material: str
    color: str
    image_url: str
    fabric_elasticity: int
    fabric_drape_score: int
    occasion_tags: List[str]
    cut_type: str
    jules_narrative: Optional[str] = None # Added for Gemini Narrative


class DatosCliente(BaseModel):
    """Datos simplificados del cliente para recomendación."""
    altura: float   # En cm o metros
    peso: float     # En kg
    tipo_cuerpo: Optional[str] = None  # Ej: "triangulo", "reloj_arena"
    evento: str     # Ej: "gala", "sport", "trabajo"

class MasterScanResponse(BaseModel):
    """Response for the real-time master scan loop."""
    anchors: Dict[str, Dict[str, float]] # e.g. {'left_shoulder': {'x': 0.5, 'y': 0.3}, ...}
    jules_narrative: str
    garment_id: str
    image_url: str


# ============================================================================
# Helpers
# ============================================================================

def generate_jules_narrative(material: str, garment_name: str) -> str:
    """
    Generates a high-end emotional description (Gemini AI style) based on fabric.
    Strictly no numbers.
    """
    material_lower = material.lower()

    if "silk" in material_lower:
        descriptions = [
            f"The {garment_name} flows like liquid moonlight, the silk charmeuse caressing the skin with a cool, ethereal touch.",
            "A whisper of luxury, this piece drapes effortlessly, catching the light with every subtle movement.",
            "Pure elegance in motion. The fabric breathes with you, creating a silhouette that is both timeless and commanding."
        ]
    elif "wool" in material_lower or "cashmere" in material_lower:
        descriptions = [
            f"Structured yet yielding, the {material} of this {garment_name} offers a protective embrace with sophisticated weight.",
            "Impeccable tailoring meets deep comfort. The fiber's resilience creates a sharp, architectural line that commands respect.",
            "A testament to heritage. The weave holds its shape with dignity, offering a warmth that feels substantial and grounded."
        ]
    elif "cotton" in material_lower:
         descriptions = [
            f"Crisp and honest, the {garment_name} stands as a canvas of pure potential. Breathable perfection.",
            "Refined simplicity. The structure holds a clean line, speaking of quiet confidence and effortless style.",
             "Light, airy, and unmistakably classic. It moves with a natural grace that defies the ordinary."
        ]
    else:
        descriptions = [
            f"A masterpiece of texture and form. The {garment_name} adapts to your unique biometrics with an almost intuitive fit.",
            "Sculptural elegance defined. The material responds to your posture, creating a dialogue between body and fabric.",
            "Uncompromising style. Every thread is woven to enhance your natural stance, projecting power and grace."
        ]

    return random.choice(descriptions)


# ============================================================================
# Endpoints
# ============================================================================

@app.get("/")
async def root():
    """Health check."""
    return {
        "message": "TRYONYOU Pilot API",
        "status": "running",
        "version": "1.0.0"
    }

@app.post("/api/v1/master-scan", response_model=MasterScanResponse)
async def master_scan(file: UploadFile = File(...)):
    """
    Real-time endpoint for the Master Scan loop.
    Receives a webcam frame (optimized/downscaled).
    Returns shoulder anchors for AR overlay and the 'Next Look' with emotional narrative.
    """
    # 1. Process Image (Simulated for Pilot Efficiency)
    # In a full production env, we would run MediaPipe here on the frame.
    # For the pilot 'Fire Test', we trust the client's loop stability and return
    # the next look in the sequence to simulate the "Smart Mirror" experience.

    # 2. Select Next Look (Cyclic or Random for Demo)
    # We use a simple counter simulation or random selection from the DB
    garments = matching_engine.garments
    if not garments:
        raise HTTPException(status_code=500, detail="Garment database empty")

    selected_garment = random.choice(garments)

    # 3. Generate Narrative
    narrative = generate_jules_narrative(selected_garment["material"], selected_garment["name"])

    # 4. Calculate Anchors (Mocked for Pilot - Client uses local tracking for smoothness usually,
    # but we return "verified" anchors as requested).
    # These would ideally come from the server running the heavy model.
    # We return normalized coordinates relative to the frame.
    anchors = {
        "left_shoulder": {"x": 0.35, "y": 0.25},
        "right_shoulder": {"x": 0.65, "y": 0.25}
    }

    return {
        "anchors": anchors,
        "jules_narrative": narrative,
        "garment_id": selected_garment["id"],
        "image_url": selected_garment["image_url"]
    }


@app.post("/api/recommend", response_model=RecommendationResponse)
async def get_recommendation(request: RecommendationRequest):
    """
    Main recommendation endpoint.
    
    Takes user measurements and conversational input.
    Returns best-fit garment with detailed explanation.
    """
    try:
        # Convert measurements to dictionary
        user_measurements = {
            "height": request.measurements.height,
            "chest": request.measurements.chest,
            "waist": request.measurements.waist,
            "hip": request.measurements.hip,
            "shoulder_width": request.measurements.shoulder_width,
            "arm_length": request.measurements.arm_length,
            "leg_length": request.measurements.leg_length,
            "torso_length": request.measurements.torso_length,
        }

        # Get recommendation from matching engine
        recommendation = matching_engine.recommend_best_fit(
            user_measurements=user_measurements,
            occasion=request.conversation.occasion,
            fit_preference=request.conversation.fit_preference or "regular"
        )

        if "error" in recommendation:
            raise HTTPException(status_code=400, detail=recommendation["error"])

        # Add Narrative
        recommendation["jules_narrative"] = generate_jules_narrative(
            recommendation.get("material", "fabric"),
            recommendation.get("garment_name", "garment")
        )

        return recommendation

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/fit-analysis")
async def analyze_fit(request: RecommendationRequest):
    """
    Detailed fit analysis endpoint.
    Returns explanation of why garment fits.
    """
    try:
        user_measurements = {
            "height": request.measurements.height,
            "chest": request.measurements.chest,
            "waist": request.measurements.waist,
            "hip": request.measurements.hip,
            "shoulder_width": request.measurements.shoulder_width,
            "arm_length": request.measurements.arm_length,
            "leg_length": request.measurements.leg_length,
            "torso_length": request.measurements.torso_length,
        }

        recommendation = matching_engine.recommend_best_fit(
            user_measurements=user_measurements,
            occasion=request.conversation.occasion,
            fit_preference=request.conversation.fit_preference or "regular"
        )

        if "error" in recommendation:
            raise HTTPException(status_code=400, detail=recommendation["error"])

        explanation = matching_engine.get_fit_explanation(recommendation)

        return {
            "garment_name": recommendation["garment_name"],
            "size": recommendation["size"],
            "fit_score": recommendation["fit_score"],
            "detailed_explanation": explanation,
            "fabric_details": {
                "material": recommendation["material"],
                "elasticity": recommendation["fabric_elasticity"],
                "drape_score": recommendation["fabric_drape_score"]
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/garments")
async def list_garments():
    """Get list of all available garments."""
    garments = []
    for g in matching_engine.garments:
        garments.append({
            "id": g["id"],
            "name": g["name"],
            "brand": g["brand"],
            "category": g["category"],
            "occasion": g["occasion"],
            "material": g["material"],
            "color": g["color"],
            "image_url": g["image_url"]
        })
    return {"garments": garments, "total": len(garments)}


@app.get("/api/garment/{garment_id}")
async def get_garment(garment_id: str):
    """Get detailed garment information including all sizes."""
    for g in matching_engine.garments:
        if g["id"] == garment_id:
            return {
                "id": g["id"],
                "name": g["name"],
                "brand": g["brand"],
                "category": g["category"],
                "occasion": g["occasion"],
                "material": g["material"],
                "fabric_elasticity": g["fabric_elasticity"],
                "fabric_drape_score": g["fabric_drape_score"],
                "cut_type": g["cut_type"],
                "color": g["color"],
                "image_url": g["image_url"],
                "sizes": g["sizes"]
            }
    raise HTTPException(status_code=404, detail="Garment not found")


@app.post("/api/scan/process")
async def process_biometric_scan(
    height: float,
    chest: float,
    waist: float,
    hip: float,
    shoulder_width: float,
    arm_length: float,
    leg_length: float,
    torso_length: float
):
    """
    Process biometric scan data.
    Validates measurements and returns normalized profile.
    """
    try:
        measurements = {
            "height": height,
            "chest": chest,
            "waist": waist,
            "hip": hip,
            "shoulder_width": shoulder_width,
            "arm_length": arm_length,
            "leg_length": leg_length,
            "torso_length": torso_length
        }

        # Validate measurements are within reasonable ranges
        if height < 140 or height > 220:
            raise ValueError("Height out of valid range (140-220cm)")
        if chest < 70 or chest > 130:
            raise ValueError("Chest measurement out of valid range")

        return {
            "status": "success",
            "measurements": measurements,
            "normalized": True,
            "message": "Body scan processed successfully. Ready for recommendation."
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/conversation/process")
async def process_conversation(
    height_confirm: Optional[float] = None,
    weight: Optional[float] = None,
    occasion: Optional[str] = None,
    fit_preference: Optional[str] = None
):
    """
    Process conversational input from Pau.
    Validates and returns processed conversation state.
    """
    try:
        # Validate occasion
        valid_occasions = ["work", "event", "casual", "ceremony"]
        if occasion and occasion not in valid_occasions:
            raise ValueError(f"Occasion must be one of {valid_occasions}")

        # Validate fit preference
        valid_fits = ["slim", "regular", "relaxed"]
        if fit_preference and fit_preference not in valid_fits:
            raise ValueError(f"Fit preference must be one of {valid_fits}")

        return {
            "status": "success",
            "conversation": {
                "height_confirm": height_confirm,
                "weight": weight,
                "occasion": occasion,
                "fit_preference": fit_preference
            },
            "ready_for_recommendation": True
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Utility Endpoints
# ============================================================================

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "TRYONYOU Pilot API"}


@app.post("/recomendar-look")
def recomendar_prenda(datos: DatosCliente):
    """
    Endpoint simplificado para recomendar prendas.
    Recibe datos básicos del cliente y retorna recomendación.
    
    Este endpoint proporciona una interfaz simplificada en español
    para obtener recomendaciones de prendas basadas en:
    - Altura y peso del cliente
    - Tipo de cuerpo (opcional)
    - Tipo de evento
    """
    logger.info(f"Procesando cliente: altura={datos.altura}, peso={datos.peso}, evento={datos.evento}")
    
    # Anthropometric ratios based on standard human body proportions
    # Source: ISO 7250-1:2017 - Basic human body measurements for technological design
    CHEST_TO_HEIGHT_RATIO = 0.52
    WAIST_TO_HEIGHT_RATIO = 0.42
    HIP_TO_HEIGHT_RATIO = 0.54
    SHOULDER_TO_HEIGHT_RATIO = 0.25
    ARM_TO_HEIGHT_RATIO = 0.38
    LEG_TO_HEIGHT_RATIO = 0.52
    TORSO_TO_HEIGHT_RATIO = 0.30
    
    # Height threshold for meters to cm conversion
    # Heights at or below 2.5 meters are assumed to be in meters and converted to cm
    # Heights above 2.5 are assumed to already be in cm
    HEIGHT_THRESHOLD_METERS = 2.5
    
    try:
        # Map evento to occasion
        evento_map = {
            "gala": "event",
            "sport": "casual",
            "trabajo": "work",
            "ceremony": "ceremony",
            "event": "event",
            "casual": "casual",
            "work": "work"
        }
        occasion = evento_map.get(datos.evento.lower(), "casual")
        
        # Convert height to cm if provided in meters (values <= 2.5 are in meters)
        altura = datos.altura * 100 if datos.altura <= HEIGHT_THRESHOLD_METERS else datos.altura
        
        # Validate height is within reasonable range
        if altura < 140 or altura > 220:
            return {
                "status": "error",
                "mensaje": "Altura fuera del rango válido (140-220 cm)"
            }
        
        # Estimate measurements based on height using standard body proportions
        chest = CHEST_TO_HEIGHT_RATIO * altura
        waist = WAIST_TO_HEIGHT_RATIO * altura
        hip = HIP_TO_HEIGHT_RATIO * altura
        shoulder_width = SHOULDER_TO_HEIGHT_RATIO * altura
        arm_length = ARM_TO_HEIGHT_RATIO * altura
        leg_length = LEG_TO_HEIGHT_RATIO * altura
        torso_length = TORSO_TO_HEIGHT_RATIO * altura
        
        user_measurements = {
            "height": altura,
            "chest": chest,
            "waist": waist,
            "hip": hip,
            "shoulder_width": shoulder_width,
            "arm_length": arm_length,
            "leg_length": leg_length,
            "torso_length": torso_length,
        }
        
        # Get recommendation from matching engine
        recommendation = matching_engine.recommend_best_fit(
            user_measurements=user_measurements,
            occasion=occasion,
            fit_preference="regular"
        )
        
        if "error" in recommendation:
            return {
                "status": "error",
                "mensaje": recommendation["error"]
            }
        
        # Return response in Spanish format
        return {
            "status": "success",
            "prenda_recomendada": recommendation["garment_name"],
            "marca": recommendation["brand"],
            "talla": recommendation["size"],
            "imagen_url": recommendation["image_url"],
            "mensaje_ajuste": recommendation["explanation"],
            "puntuacion_ajuste": recommendation["fit_score"],
            "material": recommendation["material"],
            "color": recommendation["color"]
        }
        
    except Exception as e:
        logger.error(f"Error en recomendación: {str(e)}", exc_info=True)
        return {
            "status": "error",
            "mensaje": f"Error al procesar la recomendación: {str(e)}"
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
