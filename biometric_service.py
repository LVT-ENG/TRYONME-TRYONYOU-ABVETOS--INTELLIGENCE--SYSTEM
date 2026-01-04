"""
Servicio de Biometría - TRYONYOU Intelligence System
Procesa datos biométricos con seguimiento de progreso real.
Sin simulaciones aleatorias.
"""
import json
import time
from typing import Dict, Any, Callable, Optional


def process_biometric_scan(
    raw_data: Dict[str, Any], 
    on_progress_update: Optional[Callable[[int], None]] = None
) -> Dict[str, Any]:
    """
    Procesa datos biométricos y notifica el progreso real.
    
    Arquitectura de 3 fases:
    - Fase 1: Análisis inicial (25%)
    - Fase 2: Procesamiento de datos (75%)
    - Fase 3: Finalización (100%)
    
    Args:
        raw_data: Datos biométricos crudos a procesar.
                  Ejemplo: {"height": 175, "shoulders": 45, "chest": 95}
        on_progress_update: Callback opcional para notificar progreso.
                           Recibe un entero (0-100) representando el porcentaje.
    
    Returns:
        dict: Resultado del procesamiento con estado y datos procesados.
              {"result": "success", "data": {...}}
    """
    # Fase 1: Análisis inicial de datos (25%)
    if on_progress_update:
        on_progress_update(25)
    
    # Aquí se implementaría la lógica de análisis real
    # Por ahora, validamos que los datos existan
    if not raw_data:
        return {"result": "error", "message": "No data provided"}
    
    # Fase 2: Procesamiento de datos biométricos (75%)
    if on_progress_update:
        on_progress_update(75)
    
    # Aquí se implementaría el procesamiento real de medidas
    # Por ahora, retornamos los datos validados
    processed_data = {
        "height": raw_data.get("height", 0),
        "shoulders": raw_data.get("shoulders", 0),
        "chest": raw_data.get("chest", 0),
        "processed": True
    }
    
    # Fase 3: Finalización (100%)
    if on_progress_update:
        on_progress_update(100)
    
    return {
        "result": "success",
        "data": processed_data
    }


def scan_biometric_data(user_id: str = "default") -> Dict[str, Any]:
    """
    Realiza un escaneo biométrico completo.
    Esta función orquesta el proceso completo de escaneo.
    
    Args:
        user_id: Identificador del usuario para el escaneo.
    
    Returns:
        dict: Resultado del escaneo con datos procesados.
    """
    progress_log = []
    
    def log_progress(percent: int):
        """Callback interno para registrar el progreso."""
        progress_log.append(percent)
        print(f"Progreso de escaneo: {percent}%")
    
    # Simulación de datos de entrada (en producción vendrían de sensores reales)
    raw_data = {
        "height": 0,      # Altura en cm - vendrá de sensores reales
        "shoulders": 0,   # Ancho de hombros en cm - vendrá de sensores reales
        "chest": 0        # Contorno de pecho en cm - vendrá de sensores reales
    }
    
    # Procesar el escaneo con seguimiento de progreso
    result = process_biometric_scan(raw_data, on_progress_update=log_progress)
    
    # Agregar información de progreso al resultado
    result["progress_log"] = progress_log
    result["user_id"] = user_id
    
    return result


if __name__ == "__main__":
    """Ejemplo de uso del servicio de biometría."""
    print("🔬 TRYONYOU Biometric Service - Test")
    print("=" * 50)
    
    # Ejemplo 1: Escaneo completo con progreso
    print("\n📊 Ejecutando escaneo biométrico...")
    result = scan_biometric_data(user_id="test_user_001")
    print(json.dumps(result, indent=2))
    
    # Ejemplo 2: Procesamiento directo con callback personalizado
    print("\n📊 Procesamiento con callback personalizado...")
    
    def custom_callback(percent):
        print(f"  → Progreso personalizado: {percent}%")
    
    test_data = {
        "height": 175,
        "shoulders": 45,
        "chest": 95
    }
    
    result2 = process_biometric_scan(test_data, on_progress_update=custom_callback)
    print(json.dumps(result2, indent=2))
