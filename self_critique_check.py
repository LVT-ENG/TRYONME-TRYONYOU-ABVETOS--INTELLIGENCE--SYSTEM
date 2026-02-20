# ==============================================================================
# SCRIPT: self_critique_check.py
# ROL: Agente 70 (Filtro Zero-Size & Privacy Firewall)
# PROYECTO: TryOnYou - Piloto Lafayette
# ==============================================================================

import json
import re

def validate_and_sanitize_fit(agent_output_json):
    """
    Motor de Autocrítica: Analiza el output de Gemini 3 Pro.
    Si detecta fugas de tallas o medidas, las destruye y devuelve solo el fit_id.
    """

    # Patrones estrictamente prohibidos en la interfaz
    forbidden_patterns = [
        r'\b(XS|S|M|L|XL|XXL|XXXL)\b',           # Tallas alfabéticas
        r'\b(34|36|38|40|42|44|46|48|50|52)\b',  # Tallas numéricas comunes
        r'\d+\s*(kg|lbs|cm|in|kilos|metros)\b',  # Unidades de medida explícitas
        r'\b(peso|altura|talla|medidas|weight|height|size)\b' # Conceptos prohibidos
    ]

    try:
        data = json.loads(agent_output_json)
    except json.JSONDecodeError:
        return {
            "status": "ERROR",
            "fit_id": "FALLBACK_FIT",
            "message": "Tu selección perfecta está lista."
        }

    # Serialización en minúsculas para escaneo profundo
    data_str = json.dumps(data).lower()

    # Bucle ReAct: Observación de infracciones
    for pattern in forbidden_patterns:
        if re.search(pattern, data_str):
            # ACCIÓN: El Agente 70 detecta una infracción y sanitiza la salida.
            # Solo devuelve el ID interno para cruzarlo con los 510 pantalones de la base de datos.
            return {
                "status": "SANITIZED",
                "fit_id": data.get("fit_id", "DEFAULT_FIT_001"),
                "drape_score": data.get("drape_score", 0.99),
                "message": "Ajuste perfecto encontrado basado en la elasticidad del tejido."
            }

    # Si el output es limpio (Zero-Size compliant), pasa directo al Agente Pau
    return {
        "status": "APPROVED",
        "payload": data
    }

# --- PRUEBA INTERNA DEL SISTEMA ---
if __name__ == "__main__":
    print("Iniciando validación de motor físico...")

    # Caso A: Gemini alucina e intenta justificar con el peso (Intercepción)
    bad_output = '{"fit_id": "EG-004", "size": "L", "reason": "Ajustado para 82 kg"}'
    print("Test Fallo:", validate_and_sanitize_fit(bad_output))

    # Caso B: Gemini razona correctamente según la tensión y la caída de la prenda (Aprobado)
    good_output = '{"fit_id": "EG-002", "drape_score": 0.997, "reason": "Caída ideal para la silueta capturada y el movimiento."}'
    print("Test Éxito:", validate_and_sanitize_fit(good_output))
