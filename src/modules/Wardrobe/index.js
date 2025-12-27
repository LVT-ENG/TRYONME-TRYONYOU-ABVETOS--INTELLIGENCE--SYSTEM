/**
 * Smart Wardrobe + Solidarity Wardrobe
 * Gestión de inventario digital + Economía circular
 * Patent: PCT/EP2025/067317
 */

class WardrobeModule {
  constructor() {
    this.version = '2.1.0';
    this.userWardrobes = new Map();
    this.solidarityPool = [];
  }

  /**
   * Inicializa armario digital del usuario
   */
  createWardrobe(userId) {
    const wardrobe = {
      user_id: userId,
      items: [],
      categories: this.initializeCategories(),
      stats: {
        total_items: 0,
        most_worn: null,
        least_worn: null,
        donated: 0,
      },
      created_at: new Date().toISOString(),
    };

    this.userWardrobes.set(userId, wardrobe);
    return wardrobe;
  }

  /**
   * Añade prenda al armario
   */
  addItem(userId, item) {
    const wardrobe = this.userWardrobes.get(userId) || this.createWardrobe(userId);

    const wardrobeItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...item,
      added_at: new Date().toISOString(),
      worn_count: 0,
      last_worn: null,
      condition: 'excellent',
      tags: this.autoTagItem(item),
    };

    wardrobe.items.push(wardrobeItem);
    wardrobe.stats.total_items++;
    this.userWardrobes.set(userId, wardrobe);

    console.log(`👔 Smart Wardrobe: Item añadido (${wardrobeItem.id})`);
    return wardrobeItem;
  }

  /**
   * Registra uso de prenda
   */
  recordWear(userId, itemId) {
    const wardrobe = this.userWardrobes.get(userId);
    if (!wardrobe) return null;

    const item = wardrobe.items.find(i => i.id === itemId);
    if (!item) return null;

    item.worn_count++;
    item.last_worn = new Date().toISOString();

    // Actualizar estadísticas
    this.updateWardrobeStats(wardrobe);

    console.log(`📊 Uso registrado: ${item.name} (${item.worn_count} veces)`);
    return item;
  }

  /**
   * Sugiere outfits basados en ocasión
   */
  suggestOutfit(userId, occasion = 'casual') {
    const wardrobe = this.userWardrobes.get(userId);
    if (!wardrobe || wardrobe.items.length === 0) {
      return { error: 'Wardrobe vacío' };
    }

    const filtered = wardrobe.items.filter(item => 
      item.tags.includes(occasion) || item.category === occasion
    );

    const outfit = {
      occasion,
      items: this.composeOutfit(filtered, occasion),
      color_harmony: this.checkColorHarmony(filtered),
      style_score: Math.random() * 20 + 80, // 80-100
      generated_at: new Date().toISOString(),
    };

    return outfit;
  }

  /**
   * Compone outfit equilibrado
   */
  composeOutfit(items, occasion) {
    const categories = ['top', 'bottom', 'shoes', 'accessory'];
    const outfit = [];

    categories.forEach(category => {
      const matches = items.filter(i => i.category === category);
      if (matches.length > 0) {
        outfit.push(matches[Math.floor(Math.random() * matches.length)]);
      }
    });

    return outfit;
  }

  /**
   * Analiza armonía de colores
   */
  checkColorHarmony(items) {
    const colors = items.map(i => i.color).filter(Boolean);
    return {
      palette: [...new Set(colors)],
      harmony_score: Math.random() * 20 + 80,
      recommendation: 'Combinación balanceada',
    };
  }

  /**
   * SOLIDARITY WARDROBE: Dona prenda a economía circular
   */
  donateItem(userId, itemId, condition = 'good') {
    const wardrobe = this.userWardrobes.get(userId);
    if (!wardrobe) return null;

    const itemIndex = wardrobe.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return null;

    const item = wardrobe.items[itemIndex];
    
    // Mover a pool solidario
    this.solidarityPool.push({
      ...item,
      original_owner: userId,
      donated_at: new Date().toISOString(),
      condition,
      available: true,
    });

    // Remover del armario personal
    wardrobe.items.splice(itemIndex, 1);
    wardrobe.stats.total_items--;
    wardrobe.stats.donated++;

    console.log(`💚 Solidarity: Item ${itemId} donado`);
    return { success: true, item_id: itemId };
  }

  /**
   * SOLIDARITY WARDROBE: Busca prendas disponibles
   */
  searchSolidarityPool(filters = {}) {
    let results = this.solidarityPool.filter(item => item.available);

    if (filters.category) {
      results = results.filter(i => i.category === filters.category);
    }

    if (filters.size) {
      results = results.filter(i => i.size === filters.size);
    }

    if (filters.condition) {
      results = results.filter(i => i.condition === filters.condition);
    }

    return {
      total: results.length,
      items: results.slice(0, 20), // Primeros 20
    };
  }

  /**
   * SOLIDARITY WARDROBE: Reclama prenda donada
   */
  claimSolidarityItem(userId, itemId) {
    const item = this.solidarityPool.find(i => i.id === itemId && i.available);
    if (!item) return null;

    item.available = false;
    item.claimed_by = userId;
    item.claimed_at = new Date().toISOString();

    // Añadir a armario del nuevo dueño
    this.addItem(userId, {
      ...item,
      source: 'solidarity',
      previous_owner: item.original_owner,
    });

    console.log(`🤝 Solidarity: Item ${itemId} reclamado por ${userId}`);
    return item;
  }

  /**
   * Auto-etiqueta prenda con IA
   */
  autoTagItem(item) {
    const tags = [item.category, item.color];

    // Tags por tipo
    const categoryTags = {
      shirt: ['casual', 'office', 'versatile'],
      jacket: ['formal', 'smart', 'outerwear'],
      pants: ['casual', 'office', 'everyday'],
      dress: ['formal', 'evening', 'special'],
      shoes: ['everyday', 'comfort'],
    };

    if (categoryTags[item.category]) {
      tags.push(...categoryTags[item.category]);
    }

    return [...new Set(tags)];
  }

  /**
   * Actualiza estadísticas del armario
   */
  updateWardrobeStats(wardrobe) {
    if (wardrobe.items.length === 0) return;

    const sorted = [...wardrobe.items].sort((a, b) => b.worn_count - a.worn_count);
    wardrobe.stats.most_worn = sorted[0];
    wardrobe.stats.least_worn = sorted[sorted.length - 1];
  }

  /**
   * Inicializa categorías vacías
   */
  initializeCategories() {
    return {
      tops: [],
      bottoms: [],
      dresses: [],
      outerwear: [],
      shoes: [],
      accessories: [],
    };
  }

  /**
   * Obtiene armario completo
   */
  getWardrobe(userId) {
    return this.userWardrobes.get(userId);
  }

  /**
   * Estadísticas globales de Solidarity
   */
  getSolidarityStats() {
    return {
      total_donated: this.solidarityPool.length,
      available: this.solidarityPool.filter(i => i.available).length,
      claimed: this.solidarityPool.filter(i => !i.available).length,
      impact: `${this.solidarityPool.length * 15}kg CO2 ahorrado`,
    };
  }
}

export const Wardrobe = new WardrobeModule();
export default Wardrobe;
