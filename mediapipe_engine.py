import cv2
import mediapipe as mp
import numpy as np

class TryOnBiometrics:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=2,
            enable_segmentation=True,
            min_detection_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils

    def extract_metrics(self, frame):
        """
        Analiza el frame y extrae puntos clave para el avatar 3D.
        """
        results = self.pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        
        if not results.pose_landmarks:
            return None, frame

        # Extraer coordenadas para lógica ABVETOS
        landmarks = results.pose_landmarks.landmark
        
        # Ejemplo: Altura de hombros para escalado de prendas
        left_shoulder = landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER]
        left_ankle = landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE]
        
        metrics = {
            "shoulder_width": np.abs(left_shoulder.x - right_shoulder.x),
            "is_full_body": left_ankle.visibility > 0.5
        }

        # Dibujar para la demo visual
        self.mp_drawing.draw_landmarks(
            frame, results.pose_landmarks, self.mp_pose.POSE_CONNECTIONS)

        return metrics, frame
