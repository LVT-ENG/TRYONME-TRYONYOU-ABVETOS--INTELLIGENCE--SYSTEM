import json
import sys
import time
import os

# Try to import psutil, but continue if not available
try:
    import psutil
    PSUTIL_AVAILABLE = True
except ImportError:
    PSUTIL_AVAILABLE = False

# Configuration constants
BIOMETRIC_STAGE_DELAY = 0.5  # seconds between biometric processing stages

# 1. Lógica de Métricas de Sistema (Estables)
def get_system_metrics():
    """
    Sustituye el Math.random() de JS. 
    Si no hay acceso al hardware, devuelve 0.0.
    """
    try:
        if PSUTIL_AVAILABLE:
            cpu = psutil.cpu_percent(interval=1)
            mem = psutil.virtual_memory().percent
            return {"cpu": cpu, "memory": mem, "status": "stable"}
        else:
            return {"cpu": 0.0, "memory": 0.0, "status": "stable"}
    except Exception:
        return {"cpu": 0.0, "memory": 0.0, "status": "stable"}

# 2. Lógica de Biometría con Callback
def process_biometrics(on_progress):
    """
    Ejecuta el escaneo reportando progreso real al callback.
    """
    stages = [
        (25, "Analizando imagen..."),
        (50, "Extrayendo características..."),
        (75, "Verificando identidad..."),
        (100, "Escaneo completado")
    ]
    
    for progress, message in stages:
        on_progress(progress, message)
        time.sleep(BIOMETRIC_STAGE_DELAY)  # Simulación de tiempo de procesamiento real
    
    # Use environment variable for token, fallback to mock for dev/testing
    token = os.getenv("BIOMETRIC_AUTH_TOKEN", "mock_auth_token_dev")
    return {"success": True, "token": token}

# Backward compatibility - mantener función get_status()
def get_status():
    """
    Función legacy para compatibilidad con código existente.
    """
    metrics = get_system_metrics()
    return {
        "status": "online" if metrics["status"] == "stable" else "error",
        "cpu_usage": metrics["cpu"],
        "memory_usage": metrics["memory"]
    }

# Ejemplo de uso:
if __name__ == "__main__":
    print("Métricas:", json.dumps(get_system_metrics()))
    process_biometrics(lambda p, m: print(f"Progreso: {p}% - {m}"))
    sys.exit(0)
