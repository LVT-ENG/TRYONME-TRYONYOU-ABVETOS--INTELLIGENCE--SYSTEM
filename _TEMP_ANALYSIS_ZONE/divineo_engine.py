import cv2
import mediapipe as mp
import numpy as np
from pydantic import BaseModel
from typing import Dict, Any

# --- STANDARDIZED DATA ---
FABRIC_LOGIC = {
    "tech-stretch": {"stretch_factor": 1.30, "drape_stiffness": 0.2},
    "premium-silk": {"stretch_factor": 1.05, "drape_stiffness": 0.1},
    "structured-wool": {"stretch_factor": 1.10, "drape_stiffness": 0.8}
}

MOCK_CATALOGUE = {
    "blazer_001": {"shoulder_width": 45, "fabric": "structured-wool"},
    "dress_002": {"shoulder_width": 38, "fabric": "premium-silk"}
}

# --- THE BODY SCANNER (Computer Vision) ---
class BodyScanner:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)

    def process_frame(self, frame):
        # Convert BGR to RGB for MediaPipe
        # Assumes input frame is BGR (standard OpenCV format)
        results = self.pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        return results

    def get_proportions(self, landmarks):
        # Calculation logic: Real-world estimate from image ratios
        # Distancia entre hombros (indices 11 y 12)
        l_shoulder = landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER]
        r_shoulder = landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER]
        
        # Simplified ratio (to be calibrated in Notebook)
        # Calculates Euclidean distance between shoulder landmarks
        width = np.sqrt((l_shoulder.x - r_shoulder.x)**2 + (l_shoulder.y - r_shoulder.y)**2)
        return {"width_ratio": round(width, 4)}

# --- THE RECOMMENDATION LOGIC ---
def calculate_fit(user_width: float, garment_id: str) -> str:
    garment = MOCK_CATALOGUE.get(garment_id)
    if not garment:
        return "Prenda no encontrada."

    fabric = FABRIC_LOGIC.get(garment["fabric"])
    if not fabric:
        return "Información de tela no disponible."
    
    # Hidden math: No numbers shown to user
    # If width * stretch is enough for garment
    limit = garment["shoulder_width"] * fabric["stretch_factor"]
    
    # Note: user_width is a normalized ratio (0-1) while limit is in cm (e.g., ~50).
    # This comparison will currently always be true unless calibrated.
    if user_width < limit:
        return "Un ajuste impecable que realza su silueta."
    return "Una caída arquitectónica con presencia única."
