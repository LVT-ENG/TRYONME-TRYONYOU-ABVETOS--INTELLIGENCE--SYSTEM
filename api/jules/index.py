from fastapi import FastAPI
import cv2
import mediapipe as mp
import numpy as np

app = FastAPI(title="TRYONYOU MediaPipe Pilot")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True)

@app.get("/")
def root():
    return {"status": "TRYONYOU PILOT OK"}

@app.get("/api")
def api_root():
    return {"status": "TRYONYOU API OK", "version": "1.0"}

@app.post("/analyze")
@app.post("/api/analyze")
def analyze():
    # PILOTO SIMPLIFICADO (sin JAX, sin GPU)
    return {
        "chest": 88,
        "waist": 66,
        "hips": 94,
        "shoulders": 38,
        "recommended_size": "S"
    }
