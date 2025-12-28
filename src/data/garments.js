/**
 * Lafayette-like Garment Dataset for TRYONYOU Pilot
 * Strict "Real Measurements" Architecture
 */

export const garments = [
  {
    id: "g_001",
    name: "Lafayette Signature Silk Blouse",
    brand: "Galeries Lafayette",
    category: "top",
    occasion: ["work", "ceremony"],
    cut_type: "regular",
    fabric: {
      type: "Silk Crepe",
      elasticity: 0.05, // 5% stretch (minimal)
      drape_score: 0.9, // Very fluid
      rigidity: 0.1
    },
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    size_table: [
      { size: "36", chest: 84, waist: 66, hips: 92, tolerance: 2 },
      { size: "38", chest: 88, waist: 70, hips: 96, tolerance: 2 },
      { size: "40", chest: 92, waist: 74, hips: 100, tolerance: 2 },
      { size: "42", chest: 96, waist: 78, hips: 104, tolerance: 3 }
    ]
  },
  {
    id: "g_002",
    name: "Tech-Wool Structured Blazer",
    brand: "Lafayette Homme",
    category: "jacket",
    occasion: ["work", "event"],
    cut_type: "slim",
    fabric: {
      type: "Tech Wool Blend",
      elasticity: 0.15, // 15% stretch
      drape_score: 0.3, // Structured
      rigidity: 0.7
    },
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    size_table: [
      { size: "48", chest: 96, waist: 84, shoulders: 44, tolerance: 4 },
      { size: "50", chest: 100, waist: 88, shoulders: 45, tolerance: 4 },
      { size: "52", chest: 104, waist: 92, shoulders: 46, tolerance: 4 },
      { size: "54", chest: 108, waist: 96, shoulders: 47, tolerance: 5 }
    ]
  },
  {
    id: "g_003",
    name: "Riviera Linen Trousers",
    brand: "Galeries Lafayette",
    category: "pants",
    occasion: ["casual", "work"],
    cut_type: "relaxed",
    fabric: {
      type: "Linen",
      elasticity: 0.02, // 2% stretch
      drape_score: 0.6,
      rigidity: 0.4
    },
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
    size_table: [
      { size: "38", waist: 76, hips: 98, inseam: 80, tolerance: 2 },
      { size: "40", waist: 80, hips: 102, inseam: 81, tolerance: 2 },
      { size: "42", waist: 84, hips: 106, inseam: 81, tolerance: 2 },
      { size: "44", waist: 88, hips: 110, inseam: 82, tolerance: 2 }
    ]
  },
  {
    id: "g_004",
    name: "Midnight Velvet Evening Dress",
    brand: "Lafayette Gold",
    category: "dress",
    occasion: ["event", "ceremony"],
    cut_type: "fitted",
    fabric: {
      type: "Stretch Velvet",
      elasticity: 0.25, // 25% stretch
      drape_score: 0.8,
      rigidity: 0.2
    },
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
    size_table: [
      { size: "S", chest: 84, waist: 64, hips: 90, tolerance: 6 }, // Higher tolerance due to stretch
      { size: "M", chest: 90, waist: 70, hips: 96, tolerance: 6 },
      { size: "L", chest: 96, waist: 76, hips: 102, tolerance: 6 }
    ]
  }
];
