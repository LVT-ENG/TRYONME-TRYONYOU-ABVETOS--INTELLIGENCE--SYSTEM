/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      brand: "TryOnYou",
      tagline: "Body Intelligence",
    },
    enterPilot: "Enter Pilot",
    startExperience: "Start Experience",
    hero: {
      title: "Reveal Your Best",
      titleHighlight: "Self",
      subtitle: "Experience the future of personalized styling. Advanced biometric mapping meets garment physics to determine your optimal fit.",
    },
    claims: {
      zeroReturns: "Zero Returns",
      zeroReturnsDesc: "Predictive sizing accuracy eliminates logistical waste.",
      biometric: "Biometric Intelligence",
      biometricDesc: "Digital silhouette reconstruction with sub-millimeter precision.",
      fabric: "Textile Physics",
      fabricDesc: "Analysis of garment drape, elasticity, and material rigidity.",
      efficient: "Operational Efficiency",
      efficientDesc: "Frictionless virtual consultation in under sixty seconds.",
      patentId: "PCT/EP2025/067317"
    },
    steps: {
      bodyScan: "Step 1: Calibrating optical sensors. Please position yourself in the frame for biometric extraction.",
      inputs: "Step 2: Biometric profile verified. Specify the intended occasion and weight for final fitting logic.",
      result: "Step 3: Neural fit analysis complete. Deterministic matching logic applied."
    },
    ui: {
      biometricProfile: "Biometric Profile",
      measurements: {
        height: "Height",
        weight: "Weight",
        shoulders: "Shoulders",
        chest: "Chest",
        waist: "Waist",
        hips: "Hips",
        armLength: "Arm Length",
        legLength: "Leg Length",
        torsoLength: "Torso Length"
      },
      inputs: {
        occasion: "Occasion Context",
        fit: "Fit Preference",
        calculate: "Execute Fitting Logic",
        voicePrompt: "Voice Input Active",
        voiceFallback: "Speak clearly for Pau"
      },
      results: {
        title: "Optimal Garment Fit",
        analysis: "Technical Analysis",
        reserve: "Reserve Garment",
        reset: "Reset Simulation"
      },
      occasions: {
        work: "Professional",
        event: "Social Event",
        casual: "Daily Casual",
        ceremony: "Ceremonial"
      }
    }
  },
  fr: {
    nav: {
      brand: "TryOnYou",
      tagline: "Intelligence Corporelle",
    },
    enterPilot: "Entrer dans le Pilote",
    startExperience: "Commencer l'Expérience",
    hero: {
      title: "Révélez votre meilleure",
      titleHighlight: "Version",
      subtitle: "Découvrez l'avenir du stylisme personnalisé. La cartographie biométrique avancée rencontre la physique des vêtements.",
    },
    claims: {
      zeroReturns: "Zéro Retour",
      zeroReturnsDesc: "La précision du dimensionnement prédictif élimine le gaspillage logistique.",
      biometric: "Intelligence Biométrique",
      biometricDesc: "Reconstruction de silhouette numérique avec une précision sous-millimétrique.",
      fabric: "Physique Textile",
      fabricDesc: "Analyse du tombé, de l'élasticité et de la rigidité des matériaux.",
      efficient: "Efficacité Opérationnelle",
      efficientDesc: "Consultation virtuelle sans friction en moins de soixante secondes.",
      patentId: "PCT/EP2025/067317"
    },
    steps: {
      bodyScan: "Étape 1 : Calibrage des capteurs optiques. Veuillez vous positionner dans le cadre pour l'extraction biométrique.",
      inputs: "Étape 2 : Profil biométrique vérifié. Précisez l'occasion et votre poids pour la logique finale.",
      result: "Étape 3 : Analyse neuronale de la coupe terminée. Logique de correspondance déterministe appliquée."
    },
    ui: {
      biometricProfile: "Profil Biométrique",
      measurements: {
        height: "Taille",
        weight: "Poids",
        shoulders: "Épaules",
        chest: "Poitrine",
        waist: "Taille",
        hips: "Hanches",
        armLength: "Longueur de Bras",
        legLength: "Longueur de Jambe",
        torsoLength: "Longueur de Buste"
      },
      inputs: {
        occasion: "Contexte de l'Occasion",
        fit: "Préférence de Coupe",
        calculate: "Exécuter la Logique d'Ajustement",
        voicePrompt: "Entrée Vocale Active",
        voiceFallback: "Parlez clairement pour Pau"
      },
      results: {
        title: "Coupe de Vêtement Optimale",
        analysis: "Analyse Technique",
        reserve: "Réserver le Vêtement",
        reset: "Réinitialiser la Simulation"
      },
      occasions: {
        work: "Professionnel",
        event: "Événement Social",
        casual: "Quotidien Casual",
        ceremony: "Cérémonial"
      }
    }
  }
};