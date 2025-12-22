import requests
import cv2
from mediapipe_engine import TryOnBiometrics

# Configuración del servidor ABVETOS
API_URL = "https://tu-api-abvetos.com/v1/intelligence/analyze"
API_KEY = "tu_secure_client_key"

def run_live_pilot():
    engine = TryOnBiometrics()
    cap = cv2.VideoCapture(0)

    print("--- ABVETOS Live Pilot: Iniciando Captura Biométrica ---")

    while cap.isOpened():
        success, frame = cap.read()
        if not success: break

        # 1. Extraer métricas con MediaPipe
        metrics, debug_frame = engine.extract_metrics(frame)

        if metrics:
            # 2. Enviar a la IA solo si detecta cambios significativos
            payload = {
                "user_id": "demo_user_001",
                "feature_type": "biometric_sync",
                "raw_data": metrics
            }
            
            # Llamada asíncrona simulada a tu API
            # response = requests.post(API_URL, json=payload, headers={"X-ABVETOS-AUTH": API_KEY})
            
            cv2.putText(debug_frame, f"Hombros: {metrics['shoulder_width']:.2f}", (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # 3. Mostrar visual para la demo
        cv2.imshow('ABVETOS Biometric Pilot', debug_frame)

        if cv2.waitKey(5) & 0xFF == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_live_pilot()
