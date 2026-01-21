#!/bin/bash
echo "📥 Descargando modelo de visión MediaPipe..."
mkdir -p models
curl -o models/pose_landmarker_lite.task https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task
echo "✅ Modelo descargado en models/pose_landmarker_lite.task"
