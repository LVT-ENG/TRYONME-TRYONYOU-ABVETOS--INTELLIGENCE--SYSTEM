// src/logic/AvatarController.js
// Avatar Model Configuration - Official High-Fidelity Model
// BEFORE: const modelPath = "/assets/models/dummy.glb";
// NOW: Integrating the aesthetic of the girl in the red dress (official avatar v1)
const modelPath = "/assets/models/official_avatar_v1.glb"; 

/**
 * Loads the official high-fidelity avatar model
 * @returns {string} The path to the official avatar model
 */
export const loadAvatar = () => {
  console.log("🚀 Cargando Avatar Real (Singularidad Activa)...");
  console.log("Loading Official Avatar (Singularity Active)...");
  // High-fidelity model loading logic
  return modelPath;
};

export default modelPath;
