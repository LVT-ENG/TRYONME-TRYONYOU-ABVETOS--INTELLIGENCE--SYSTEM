import json
import random
import uuid
from datetime import datetime
from typing import Dict, Any, Optional

# =========================================================================
# 1. ESQUEMAS DE DATOS (Basado en tu schema.prisma / Petición estructurada)
# =========================================================================

USER_ID = str(uuid.uuid4())
PROFILE_ID = str(uuid.uuid4())

# Datos de entrada que simulan un BodyProfile de TryOnYou
RAW_INPUT_PROFILE = {
    "userId": USER_ID,
    "name": "Profile 1 (Manual)",
    "height": 1780,  # mm
    "weight": 75.5,   # kg
    "chest": 1050,   # mm
    "waist": 850,    # mm
    "hips": 980,     # mm
    "shoulderWidth": 450, # mm (Valor crudo)
    "source": "MANUAL",
}

# Estructura de Salida esperada por el sistema backend de TryOnYou
class BodyProfileOutput:
    def __init__(self, data: Dict[str, Any]):
        self.profileId = PROFILE_ID
        self.userId = data.get("userId")
        self.rawMeasurements = data
        self.confidence: float = 0.0
        self.version: int = 1
        self.normalizedMeasurements: Optional[Dict[str, Any]] = None
        self.inferredMeasurements: Optional[Dict[str, Any]] = None
        self.avatarParameters: Optional[Dict[str, Any]] = None
        self.timestamp: str = datetime.utcnow().isoformat()

    def to_json_ready(self) -> Dict[str, Any]:
        """Convierte el objeto a un diccionario limpio para JSON."""
        return {
            "profile_id": self.profileId,
            "user_id": self.userId,
            "timestamp": self.timestamp,
            "version": self.version,
            "confidence_score": self.confidence,
            "raw_measurements": self.rawMeasurements,
            "normalized_measurements": self.normalizedMeasurements,
            "inferred_measurements": self.inferredMeasurements,
            "avatar_parameters": self.avatarParameters,
        }

# =========================================================================
# 2. LÓGICA CORE: NORMALIZACIÓN Y AVATAR
# (Simula la función `normalizeAndGenerateAvatar` en ProfileService.ts)
# =========================================================================

def normalize_and_generate_avatar(raw_data: Dict[str, Any]) -> BodyProfileOutput:
    """
    Motor del módulo: Ingresa datos crudos y devuelve un BodyProfile completo y paramétrico.
    
    Esta función simula las siguientes etapas:
    1. Validación (rangos fisiológicos).
    2. Corrección/Inferencia de valores faltantes.
    3. Generación de parámetros 3D.
    """
    
    profile = BodyProfileOutput(raw_data)
    
    # ------------------
    # 1. Normalización y Validación
    # ------------------
    
    # Simulación de un motor de validación:
    confidence_score = random.uniform(0.7, 0.99)
    profile.confidence = round(confidence_score, 2)
    profile.version = 2 # Asumimos que esta es la primera versión generada por IA

    normalized = raw_data.copy()
    inferred = {}
    
    # ------------------
    # 2. Inferencia (Ejemplo: Inferir Cuello y Muslo si faltan)
    # ------------------
    
    # Ejemplo de Lógica de Inferencia de Cuello: (0.22 * Chest + 0.1 * Height) - 100
    if not normalized.get('neck'):
        inferred_neck = int((normalized['chest'] * 0.22) - (normalized['height'] * 0.05) + 300)
        normalized['neck'] = inferred_neck
        inferred['neck_mm'] = inferred_neck
        
    # Ejemplo de Lógica de Inferencia de Muslo (Thigh) usando IMC:
    if not normalized.get('thigh'):
        # BMI = weight / (height_m)^2
        height_m = normalized['height'] / 1000
        weight = normalized['weight']
        bmi = weight / (height_m ** 2)
        
        # Fórmula simplificada: Muslo crece con el pecho y el peso
        inferred_thigh = int((normalized['chest'] * 0.4) + (bmi * 5) + 100)
        normalized['thigh'] = inferred_thigh
        inferred['thigh_mm'] = inferred_thigh

    profile.normalizedMeasurements = normalized
    profile.inferredMeasurements = inferred
    
    # ------------------
    # 3. Generación de Parámetros de Avatar
    # ------------------
    
    # Mapeo de mediciones normalizadas a un espacio de parámetros 3D (e.g., SMPL/MakeHuman).
    # 
    
    avatar_params = {
        "model_type": "PARAMETRIC_V3",
        "scale_factors": {
            "global_height": normalized['height'],
            "global_weight": normalized['weight']
        },
        "pca_shape_coefficients": [
            # Estos son coeficientes que modifican el 'mesh' base.
            (normalized['chest'] / 10000.0) * profile.confidence,  # Coeficiente 1: Grosor torso
            (normalized['hips'] / 10000.0) * -0.5,                 # Coeficiente 2: Forma inferior
            (normalized['waist'] / 10000.0) * 0.2,                 # Coeficiente 3: Cintura
            random.uniform(-0.1, 0.1) # Ejemplo: Coeficiente aleatorio para el ruido
        ],
        "pose_params": {
            "default_pose": "A_POSE",
            "joint_rotations": {} # En una implementación real, aquí iría el set de 24+ rotaciones
        }
    }
    
    profile.avatarParameters = avatar_params
    profile.version += 1 # Confirmar versión final

    return profile

# =========================================================================
# 3. INTERFAZ DE CONSOLA (CLI)
# =========================================================================

def run_cli_process():
    """Ejecuta el proceso completo desde la terminal."""
    print("==========================================================")
    print("🤖 MANUS IA - MÓDULO DE AVATAR PARAMÉTRICO (TryOnYou)")
    print(f"👤 USER ID: {USER_ID}")
    print("==========================================================\n")
    
    print("--- 1. Datos de Entrada (RAW) ---")
    print(json.dumps(RAW_INPUT_PROFILE, indent=2))
    print("\n[PROCESANDO...] Ejecutando Normalización y Generación de Avatar...")

    # Llamada al motor central
    final_profile_output = normalize_and_generate_avatar(RAW_INPUT_PROFILE)
    
    print("\n[COMPLETADO] Generación de BodyProfile y Parámetros de Avatar.")
    
    # Mostrar el resultado estructurado
    output_data = final_profile_output.to_json_ready()

    print("\n--- 2. Salida Estructurada (JSON READY) ---")
    print(json.dumps(output_data, indent=2))

    print("\n==========================================================")
    print(f"📊 Resumen: Confianza: {output_data['confidence_score']*100}% | Versión: {output_data['version']}")
    print(f"⚙️  Listo para ser enviado al endpoint: /api/v1/profiles/{output_data['user_id']} (Update)")
    print("==========================================================")
    
    # Simulación de Emisión de Evento
    print(f"[EVENTO EMITIDO] BODY_PROFILE_UPDATED: {output_data['profile_id']}")


if __name__ == "__main__":
    run_cli_process()
  
