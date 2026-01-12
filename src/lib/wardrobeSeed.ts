import { wardrobeService } from '../services/IntelligentWardrobeService';

export function seedWardrobeData() {
  if (wardrobeService.getAllGarments().length > 0) return; // Already seeded

  console.log('Seeding Intelligent Wardrobe data...');

  // 1. High emotional value, fits well
  wardrobeService.addGarment({
    name: 'Vintage Leather Jacket',
    category: 'outerwear',
    size: 'M',
    elasticity: 'low',
    emotionalScore: 95,
    purchaseDate: new Date('2023-01-15'),
    imageUrl: '/assets/garments/outerwear-leather-jacket.png',
    tags: ['vintage', 'favorite', 'winter']
  });

  // 2. Fit issue (Tight)
  const tightJeans = wardrobeService.addGarment({
    name: 'Slim Fit Blue Jeans',
    category: 'bottom',
    size: '32',
    elasticity: 'medium',
    emotionalScore: 60,
    purchaseDate: new Date('2023-06-10'),
    imageUrl: '/assets/garments/bottom-blue-jeans.png',
    tags: ['casual', 'denim']
  });
  wardrobeService.updateGarmentState(tightJeans.id, { fitStatus: 'tight' });

  // 3. Underused item
  const unusedDress = wardrobeService.addGarment({
    name: 'Floral Summer Dress',
    category: 'dress',
    size: 'S',
    elasticity: 'high',
    emotionalScore: 80,
    purchaseDate: new Date('2022-05-20'),
    imageUrl: '/assets/garments/dress-floral-summer.png',
    tags: ['summer', 'vacation']
  });
  // Manually set last used to long ago to trigger "underused" logic
  // (Note: In a real app, we wouldn't hack private state, but this is for demo seeding)
  wardrobeService.updateGarmentState(unusedDress.id, { lastUsed: new Date('2023-01-01') });

  // 4. Frequently used
  const favoriteTee = wardrobeService.addGarment({
    name: 'Classic White T-Shirt',
    category: 'top',
    size: 'M',
    elasticity: 'medium',
    emotionalScore: 70,
    purchaseDate: new Date('2024-01-10'),
    imageUrl: '/assets/garments/top-white-tshirt.png',
    tags: ['basic', 'essential']
  });
  // Simulate usage
  for(let i=0; i<15; i++) wardrobeService.recordUsage(favoriteTee.id);

  console.log('Wardrobe seeding complete.');
}
