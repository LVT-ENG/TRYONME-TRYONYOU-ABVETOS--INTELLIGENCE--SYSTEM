import { AnthropometricService, RawMeasurements } from '../services/AnthropometricService';
import { AvatarParameterService } from '../services/AvatarParameterService';
import { v4 as uuidv4 } from 'uuid';

// =========================================================================
// 1. CONFIGURACIÓN Y DATOS DE ENTRADA
// =========================================================================

const USER_ID = uuidv4();
const PROFILE_ID = uuidv4();

// Datos de entrada que simulan un BodyProfile de TryOnYou (Mismos valores que el script Python)
const RAW_INPUT_PROFILE: RawMeasurements = {
  height: 1780,  // mm -> cm conversion handled in service? No, service expects cm for raw.
                 // Wait, RawMeasurementsSchema says height is number. 
                 // Let's assume input is in cm as per schema, but Python script had 1780 (mm).
                 // We will convert to cm for the service input to match schema expectations.
  height: 178,   // cm
  weight: 75.5,  // kg
  chest: 105,    // cm
  waist: 85,     // cm
  hips: 98,      // cm
  shoulderWidth: 45, // cm
  // Inseam/ArmLength missing to test inference
};

// =========================================================================
// 2. MOTOR DE SIMULACIÓN
// =========================================================================

async function runSimulation() {
  console.log("==========================================================");
  console.log("🤖 MANUS IA - MÓDULO DE AVATAR PARAMÉTRICO (TryOnYou - TS Port)");
  console.log(`👤 USER ID: ${USER_ID}`);
  console.log("==========================================================\n");

  console.log("--- 1. Datos de Entrada (RAW) ---");
  console.log(JSON.stringify(RAW_INPUT_PROFILE, null, 2));
  console.log("\n[PROCESANDO...] Ejecutando Normalización y Generación de Avatar...");

  // Instanciar Servicios
  const anthropometricService = new AnthropometricService();
  const avatarService = new AvatarParameterService();

  try {
    // 1. Procesamiento Antropométrico (Validación -> Normalización -> Inferencia)
    const { normalized, confidence } = anthropometricService.processMeasurements(RAW_INPUT_PROFILE);

    // 2. Generación de Parámetros de Avatar
    const avatarParams = avatarService.generateParameters(normalized);

    // 3. Construcción del Objeto de Salida (Simulando BodyProfileOutput)
    const outputData = {
      profile_id: PROFILE_ID,
      user_id: USER_ID,
      timestamp: new Date().toISOString(),
      version: 1,
      confidence_score: confidence,
      raw_measurements: RAW_INPUT_PROFILE,
      normalized_measurements: normalized,
      inferred_measurements: {
        // Extracting inferred fields for display
        neck_mm: normalized.neck,
        thigh_mm: normalized.thigh,
        inseam_mm: normalized.inseam,
        torso_mm: normalized.torsoLength
      },
      avatar_parameters: avatarParams
    };

    console.log("\n[COMPLETADO] Generación de BodyProfile y Parámetros de Avatar.");
    console.log("\n--- 2. Salida Estructurada (JSON READY) ---");
    console.log(JSON.stringify(outputData, null, 2));

    console.log("\n==========================================================");
    console.log(`📊 Resumen: Confianza: ${(confidence * 100).toFixed(1)}% | Versión: ${outputData.version}`);
    console.log(`⚙️  Listo para ser enviado al endpoint: /api/v1/profiles/${USER_ID} (Update)`);
    console.log("==========================================================");
    console.log(`[EVENTO EMITIDO] BODY_PROFILE_UPDATED: ${PROFILE_ID}`);

  } catch (error) {
    console.error("\n[ERROR] Falló la simulación:", error);
  }
}

// Ejecutar
runSimulation();
