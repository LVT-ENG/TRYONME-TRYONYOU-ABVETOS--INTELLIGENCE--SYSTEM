"""
Sistema de Monitoreo - TRYONYOU Intelligence System
Proporciona métricas reales del sistema sin simulaciones aleatorias.
"""
import psutil
import json
import sys


def get_system_metrics():
    """
    Obtiene métricas reales del sistema. 
    Retorna 0.0 en caso de que el sensor no esté disponible.
    
    Returns:
        dict: Diccionario con métricas de CPU y memoria.
              {"cpu": float, "memory": float}
    """
    try:
        # Usar interval=None para lectura instantánea sin bloqueo
        cpu = psutil.cpu_percent(interval=None)
        memory = psutil.virtual_memory().percent
        return {"cpu": cpu, "memory": memory}
    except Exception:
        # Si el hardware no es accesible, devolver 0.0
        return {"cpu": 0.0, "memory": 0.0}


def get_status():
    """
    Obtiene el estado general del sistema con métricas.
    Función legacy mantenida para compatibilidad.
    
    Returns:
        dict: Estado del sistema con métricas de CPU y memoria.
    """
    try:
        metrics = get_system_metrics()
        return {
            "status": "online", 
            "cpu_usage": metrics["cpu"], 
            "memory_usage": metrics["memory"]
        }
    except Exception:
        return {
            "status": "error", 
            "cpu_usage": 0.0, 
            "memory_usage": 0.0
        }


if __name__ == "__main__":
    print(json.dumps(get_status()))
    sys.exit(0)
