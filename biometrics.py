import time

def run_scan(callback):
    """
    Simula un proceso real sin usar loops infinitos de JS.
    
    Args:
        callback: Función que se llama con el progreso (25, 50, 75, 100)
    
    Returns:
        bool: True cuando el escaneo completa exitosamente
    """
    if not callable(callback):
        raise TypeError("callback debe ser una función callable")
    
    stages = [25, 50, 75, 100]
    for stage in stages:
        callback(stage)
        time.sleep(0.1) # Simulación controlada
    return True
