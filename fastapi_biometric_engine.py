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

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
import json

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

# Gemini client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Google Sheets client
credentials = service_account.Credentials.from_service_account_file(
    os.getenv("GOOGLE_APPLICATION_CREDENTIALS"),
    scopes=SCOPES,
)
sheets_service = build("sheets", "v4", credentials=credentials)

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


def save_to_sheets(session_id: str, metrics: Metrics):
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
