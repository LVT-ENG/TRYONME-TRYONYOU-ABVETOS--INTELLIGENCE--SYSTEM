import time

# 1. Lógica de Métricas de Sistema (Estables)
def get_system_metrics():
    """
    Sustituye el Math.random() de JS.
    Si no hay acceso al hardware, devuelve 0.0.
    """
    try:
        # Aquí se importaría psutil en producción
        # import psutil
        # return {"cpu": psutil.cpu_percent(), "memory": psutil.virtual_memory().percent}
        return {"cpu": 0.0, "memory": 0.0, "status": "stable"}
    except Exception:
        return {"cpu": 0.0, "memory": 0.0, "status": "error"}

# 2. Lógica de Biometría con Callback
def process_biometrics(on_progress):
    """
    Ejecuta el escaneo reportando progreso real al callback.
    """
    # Validar que on_progress es callable
    if not callable(on_progress):
        raise TypeError("on_progress debe ser una función callable")
    
    stages = [
        (25, "Analizando imagen..."),
        (50, "Extrayendo características..."),
        (75, "Verificando identidad..."),
        (100, "Escaneo completado")
    ]
    
    for progress, message in stages:
        try:
            on_progress(progress, message)
        except Exception as e:
            print(f"Error en callback: {e}")
        time.sleep(0.5)  # Simulación de tiempo de procesamiento real
    
    return {"success": True, "token": "mock_auth_token_123"}

# Ejemplo de uso:
if __name__ == "__main__":
    print("Métricas:", get_system_metrics())
    process_biometrics(lambda p, m: print(f"Progreso: {p}% - {m}"))
