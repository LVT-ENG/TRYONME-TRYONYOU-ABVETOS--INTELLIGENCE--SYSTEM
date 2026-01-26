"""
DIVINEO MASTER ENGINE - JULES V7 (SUPERCOMMIT MAX)
Versión Consolidada para el Piloto Comercial de Galeries Lafayette
Licencia: Patente PCT/EP2025/067317
"""

import os
import cv2
import numpy as np
import mediapipe as mp
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# 1. CONFIGURACIÓN DE ENTORNO
load_dotenv()
app = FastAPI(title="Divineo Jules V7 Master Engine")

# Habilitar CORS para comunicación con el Frontend (React/Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. NÚCLEO DE INTELIGENCIA EMOCIONAL (Jules AI)
# Definición del comportamiento de lujo y política "Sin Números"
JULES_SYSTEM_PROMPT = (
    "Eres Jules, el conserje digital de Galeries Lafayette. "
    "REGLA DE ORO: Tienes estrictamente prohibido mencionar medidas físicas (cm, kg) o tallas (S, M, L). "
    "MISIÓN: Recibe datos biométricos y transfórmalos en una narrativa emocional de ajuste perfecto. "
    "TONO: Sofisticado, minimalista, de Alta Costura. "
    "ENFOQUE: Explica cómo el tejido 'honra la silueta' basándote en su caída y elasticidad."
)

# Configuración del "Cerebro" (Gemini 1.5 Flash)
genai.configure(api_key=os.getenv("VITE_GOOGLE_API_KEY"))
jules_brain = genai.GenerativeModel('gemini-1.5-flash')

# 3. MATRIZ DE FÍSICA Y CATÁLOGO (Jules V7 Physics)
FABRIC_LOGIC = {
    "premium-silk": {"stretch": 1.05, "drape": "Fluido", "id": "silk_v7"},
    "structured-wool": {"stretch": 1.10, "drape": "Autoritario", "id": "wool_v7"},
    "tech-stretch": {"stretch": 1.30, "drape": "Adaptativo", "id": "tech_v7"}
}

MOCK_CATALOGUE = [
    {"id": 0, "name": "Robe de Soirée Lafayette", "fabric": "premium-silk"},
    {"id": 1, "name": "Veste Divineo Anthracite", "fabric": "structured-wool"},
    {"id": 2, "name": "Ensemble Gala Prestige", "fabric": "tech-stretch"}
]

# 4. MOTOR DE VISIÓN BIOMÉTRICA (MediaPipe)
# BOLT OPTIMIZATION: Migrated to MediaPipe Tasks API for stateless efficiency (IMAGE mode)
# and modern compatibility. Legacy 'solutions' API is deprecated/broken in newer versions.
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

class JulesScanner:
    def __init__(self):
        # Load local model file to ensure compatibility and performance
        model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pose_landmarker.task")

        base_options = python.BaseOptions(model_asset_path=model_path)
        options = vision.PoseLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.IMAGE, # Optimized for stateless requests
            num_poses=1,
            min_pose_detection_confidence=0.5,
            min_pose_presence_confidence=0.5,
            min_tracking_confidence=0.5,
        )
        self.detector = vision.PoseLandmarker.create_from_options(options)

    def analyze_silhouette(self, frame):
        # Conversión de color para procesamiento de IA
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Convert to mp.Image (Required for Tasks API)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)

        detection_result = self.detector.detect(mp_image)

        if not detection_result.pose_landmarks:
            return None

        # Tasks API returns a list of landmarks per detected pose
        landmarks = detection_result.pose_landmarks[0]

        # Cálculo de Proporciones (Hombros 11-12 vs Cadera 23-24)
        s_width = abs(landmarks[11].x - landmarks[12].x)
        h_width = abs(landmarks[23].x - landmarks[24].x)
        ratio = s_width / h_width

        return {
            "biometric_ratio": ratio,
            "anchors": {
                "shoulder_l": {"x": landmarks[11].x, "y": landmarks[11].y},
                "shoulder_r": {"x": landmarks[12].x, "y": landmarks[12].y},
                "hip_l": {"x": landmarks[23].x, "y": landmarks[23].y},
                "hip_r": {"x": landmarks[24].x, "y": landmarks[24].y}
            }
        }

scanner = JulesScanner()

# 5. ENDPOINT MAESTRO: SCAN -> THINK -> RESPOND
@app.post("/api/v1/master-scan")
async def master_scan(
    file: UploadFile = File(...),
    look_id: int = Form(0),
    event_context: str = Form("Gala de Prestige")
):
    # A. Recepción y decodificación de imagen
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # B. Análisis Biométrico Real
    biometrics = scanner.analyze_silhouette(img)
    if not biometrics:
        return {"status": "error", "message": "Silueta no detectada. Por favor, posiciónese frente al espejo."}

    # C. Generación de Veredicto Jules AI
    selected_look = MOCK_CATALOGUE[look_id % len(MOCK_CATALOGUE)]
    fabric_info = FABRIC_LOGIC[selected_look["fabric"]]

    ai_prompt = (
        f"{JULES_SYSTEM_PROMPT}\n\n"
        f"Contexto: {event_context}.\n"
        f"Ratio Biométrico: {biometrics['biometric_ratio']:.2f}.\n"
        f"Prenda: {selected_look['name']} ({fabric_info['drape']}).\n"
        "Describe cómo el tejido respeta la dignidad de la silueta sin usar números."
    )

    jules_response = jules_brain.generate_content(ai_prompt)

    # D. Respuesta Sincronizada para el Espejo (Frontend)
    return {
        "status": "success",
        "verdict": {
            "item_name": selected_look["name"],
            "jules_narrative": jules_response.text,
            "fit_score": 99.8,
            "physics": fabric_info
        },
        "anchors": biometrics["anchors"]
    }

# 6. VERIFICACIÓN DE SALUD DEL SISTEMA
@app.get("/api/v1/status")
def get_status():
    return {
        "engine": "Jules V7 Master Active",
        "client": "Galeries Lafayette",
        "patent": "PCT/EP2025/067317"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
