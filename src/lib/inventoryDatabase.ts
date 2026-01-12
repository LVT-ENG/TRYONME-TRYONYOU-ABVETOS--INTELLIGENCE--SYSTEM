
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Product } from '../types';

export const inventory: Product[] = [
  {
    id: 'GARMENT-552',
    name: 'Milano Structured Blazer',
    price: 890,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1200',
    description: 'Blazer estructurado en mezcla de lana italiana. Hombros arquitectónicos y cintura entallada.',
    occasions: ['work', 'event', 'ceremony'],
    properties: {
      elasticity: 5, // 0.05 en Python logic
      drape: 8,      // Rigidez media-alta
      cut: 'slim'
    },
    sizeTable: {
      'M': { shoulders: 46.0, chest: 100.0, waist: 84.0, hips: 98, length: 74 },
      'L': { shoulders: 48.0, chest: 106.0, waist: 90.0, hips: 104, length: 76 }
    }
  },
  {
    id: 'GL-KNIT-405',
    name: 'Cashmere Tech Knit',
    price: 450,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1200',
    description: 'Tejido técnico con alta recuperación de fibra.',
    occasions: ['casual', 'work'],
    properties: {
      elasticity: 25, 
      drape: 4,       
      cut: 'regular'
    },
    sizeTable: {
      'S': { shoulders: 40, chest: 86, waist: 76, hips: 88, length: 65 },
      'M': { shoulders: 42, chest: 92, waist: 82, hips: 94, length: 67 }
    }
  }
];
