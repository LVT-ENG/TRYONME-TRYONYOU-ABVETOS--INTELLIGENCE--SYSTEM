export interface FabricPhysics {
  elasticity: number; // 0-100 (0=rigid, 100=spandex)
  drape: number; // 0-100 (0=stiff, 100=fluid)
  grammage: number; // Gramaje en g/m²
  structure: 'structured' | 'fluid' | 'tailored';
}

export const FABRIC_PROFILES: Record<string, FabricPhysics> = {
  silk: {
    elasticity: 5,
    drape: 95,
    grammage: 80, // g/m² - Muy ligera
    structure: 'fluid',
  },
  cotton_poplin: {
    elasticity: 10,
    drape: 40,
    grammage: 120, // g/m² - Ligera
    structure: 'structured',
  },
  wool_crepe: {
    elasticity: 25,
    drape: 60,
    grammage: 180, // g/m² - Media
    structure: 'tailored',
  },
  denim_stretch: {
    elasticity: 45,
    drape: 20,
    grammage: 350, // g/m² - Pesada
    structure: 'structured',
  },
  jersey_viscose: {
    elasticity: 85,
    drape: 90,
    grammage: 200, // g/m² - Media-alta (con elastano)
    structure: 'fluid',
  },
  chiffon: {
    elasticity: 0,
    drape: 100,
    grammage: 50, // g/m² - Ultra ligera
    structure: 'fluid',
  },
  linen: {
    elasticity: 5,
    drape: 50,
    grammage: 150, // g/m² - Media-ligera
    structure: 'structured',
  },
  tweed: {
    elasticity: 0,
    drape: 15,
    grammage: 280, // g/m² - Pesada
    structure: 'tailored',
  },
  satin_duchesse: {
    elasticity: 10,
    drape: 30,
    grammage: 160, // g/m² - Media-ligera
    structure: 'structured',
  },
};
