"""
FASTAPI – UNIFIED BIOMETRIC ENGINE
=================================

Este archivo define un backend mínimo pero funcional que conecta:

- Frontend biométrico (React / Next)
- Google AI Studio (Gemini)
- Persistencia para Looker Studio (vía Google Sheets)

OBJETIVO
--------
Recibir datos de un escaneo corporal, inferir métricas biométricas
usando Gemini, devolverlas al frontend y guardarlas para analítica.

STACK
-----
- FastAPI
- Gemini (google-generativeai)
- Google Sheets API (fuente de Looker Studio)

REQUISITOS
----------
pip install fastapi uvicorn google-generativeai google-auth google-api-python-client python-dotenv

VARIABLES DE ENTORNO
-------------------
GEMINI_API_KEY=xxxxx
GOOGLE_APPLICATION_CREDENTIALS=service_account.json
SPREADSHEET_ID=your_google_sheet_id (opcional, se puede hardcodear)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ------------------ GEMINI ------------------
import google.generativeai as genai

# ------------------ GOOGLE SHEETS ------------------
from googleapiclient.discovery import build
from google.oauth2 import service_account

# ==================================================
# CONFIGURACIÓN
# ==================================================

SPREADSHEET_ID = os.getenv("SPREADSHEET_ID", "PEGA_AQUI_TU_SHEET_ID")
SHEET_RANGE = "Sheet1!A:G"

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

# ==================================================
# MODELOS DE DATOS
# ==================================================

class ScanInput(BaseModel):
    session_id: str
    gender: str | None = None
    height_hint: float | None = None


class Metrics(BaseModel):
    altura: str
    hombros: str
    pecho: str
    cintura: str
    talla: str


# ==================================================
# INICIALIZACIONES
# ==================================================

app = FastAPI(title="Unified Biometric Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini client - validate API key
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    logger.warning("GEMINI_API_KEY not set. Gemini functionality will not work.")
else:
    genai.configure(api_key=gemini_api_key)

# Google Sheets client - validate credentials
sheets_service = None
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if credentials_path and os.path.exists(credentials_path):
    try:
        credentials = service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=SCOPES,
        )
        sheets_service = build("sheets", "v4", credentials=credentials)
        logger.info("Google Sheets service initialized successfully")
    except Exception as e:
        logger.warning(f"Failed to initialize Google Sheets: {e}")
else:
    logger.warning("GOOGLE_APPLICATION_CREDENTIALS not set or file not found. Sheets persistence disabled.")

# ==================================================
# PROMPT GEMINI
# ==================================================

SYSTEM_PROMPT = """
Eres un sistema biométrico de moda avanzada.

Tu tarea es inferir medidas corporales y una talla de ropa estándar
a partir de datos incompletos de escaneo corporal.

Devuelve EXCLUSIVAMENTE un JSON con este formato:

{
  "altura": "XXX cm",
  "hombros": "XX cm",
  "pecho": "XX cm",
  "cintura": "XX cm",
  "talla": "XS|S|M|L|XL"
}
"""

# ==================================================
# FUNCIONES CORE
# ==================================================

def analyze_with_gemini(payload: dict) -> Metrics:
    try:
        model = genai.GenerativeModel("gemini-pro")
        
        # Construct the prompt with system instructions and user data
        prompt = f"{SYSTEM_PROMPT}\n\nDatos del escaneo: {json.dumps(payload)}"
        
        response = model.generate_content(prompt)
        
        # Extract JSON from response text
        response_text = response.text.strip()
        
        # Try to extract JSON if wrapped in markdown code blocks
        if "```json" in response_text:
            start = response_text.find("```json") + 7
            end = response_text.find("```", start)
            response_text = response_text[start:end].strip()
        elif "```" in response_text:
            start = response_text.find("```") + 3
            end = response_text.find("```", start)
            response_text = response_text[start:end].strip()
        
        data = json.loads(response_text)
        return Metrics(**data)
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini response as JSON: {e}")
        raise HTTPException(status_code=500, detail="Error parsing AI response")
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=500, detail="Error generating biometric analysis")


def save_to_sheets(session_id: str, metrics: Metrics):
    """Save metrics to Google Sheets. Fails silently if sheets service is unavailable."""
    if not sheets_service:
        logger.warning("Sheets service not available. Skipping persistence.")
        return
    
    try:
        values = [[
            datetime.utcnow().isoformat(),
            session_id,
            metrics.altura,
            metrics.hombros,
            metrics.pecho,
            metrics.cintura,
            metrics.talla,
        ]]

        sheets_service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range=SHEET_RANGE,
            valueInputOption="RAW",
            body={"values": values},
        ).execute()
        logger.info(f"Successfully saved metrics for session {session_id}")
    except Exception as e:
        logger.error(f"Failed to save to Google Sheets: {e}")
        # Don't raise - allow the API to return results even if persistence fails


# ==================================================
# ENDPOINT PRINCIPAL
# ==================================================

@app.post("/api/analyze", response_model=Metrics)
def analyze(scan: ScanInput):
    """
    Endpoint llamado tras el escaneo corporal del frontend.
    """
    metrics = analyze_with_gemini(scan.dict())
    save_to_sheets(scan.session_id, metrics)
    return metrics


# ==================================================
# ARRANQUE LOCAL
# ==================================================
"""
Ejecutar en local:
------------------
uvicorn fastapi_biometric_engine:app --reload

Swagger:
--------
http://localhost:8000/docs
"""
