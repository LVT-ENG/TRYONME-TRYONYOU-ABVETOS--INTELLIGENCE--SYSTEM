import { Garment, UserWardrobe, WardrobeSummary, WardrobeEvent, WardrobeEventType, FitStatus } from '../types/wardrobe';

class IntelligentWardrobeService {
  private wardrobe: UserWardrobe;
  private eventLog: WardrobeEvent[] = [];
  private subscribers: ((event: WardrobeEvent) => void)[] = [];

  constructor(userId: string) {
    this.wardrobe = {
      userId,
      garments: [],
      totalItems: 0,
      lastUpdated: new Date()
    };
  }

  // --- Event System ---
  subscribe(callback: (event: WardrobeEvent) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private emit(type: WardrobeEventType, payload: any) {
    const event: WardrobeEvent = {
      type,
      timestamp: new Date(),
      payload
    };
    this.eventLog.push(event);
    this.subscribers.forEach(cb => cb(event));
    console.log(`[Wardrobe Event] ${type}:`, payload);
  }

  // --- Core Business Logic ---

  addGarment(garment: Omit<Garment, 'id' | 'userId' | 'usageCount' | 'lastUsed' | 'fitStatus'>): Garment {
    const newGarment: Garment = {
      ...garment,
      id: crypto.randomUUID(),
      userId: this.wardrobe.userId,
      usageCount: 0,
      lastUsed: null,
      fitStatus: 'unknown', // Initial state
    };

    this.wardrobe.garments.push(newGarment);
    this.wardrobe.totalItems++;
    this.wardrobe.lastUpdated = new Date();

    this.emit('WARDROBE_UPDATED', { action: 'add', garmentId: newGarment.id });
    return newGarment;
  }

  updateGarmentState(garmentId: string, updates: Partial<Garment>): Garment | null {
    const index = this.wardrobe.garments.findIndex(g => g.id === garmentId);
    if (index === -1) return null;

    const oldGarment = this.wardrobe.garments[index];
    const updatedGarment = { ...oldGarment, ...updates };
    
    // Business Rule: Detect Fit Issues
    if (updates.fitStatus && updates.fitStatus !== oldGarment.fitStatus && updates.fitStatus !== 'fits') {
      this.emit('FIT_ISSUE_DETECTED', { 
        garmentId, 
        previousStatus: oldGarment.fitStatus, 
        newStatus: updates.fitStatus 
      });
    }

    this.wardrobe.garments[index] = updatedGarment;
    this.wardrobe.lastUpdated = new Date();
    this.emit('WARDROBE_UPDATED', { action: 'update', garmentId });
    
    return updatedGarment;
  }

  recordUsage(garmentId: string) {
    const garment = this.wardrobe.garments.find(g => g.id === garmentId);
    if (!garment) return;

    garment.usageCount++;
    garment.lastUsed = new Date();
    
    this.emit('GARMENT_USED', { garmentId, usageCount: garment.usageCount });
    this.checkUnderusedGarments();
  }

  // --- Intelligence & Analysis ---

  getWardrobeSummary(): WardrobeSummary {
    const garments = this.wardrobe.garments;
    if (garments.length === 0) {
      return {
        totalGarments: 0,
        mostWorn: null,
        leastWorn: null,
        fitIssuesCount: 0,
        emotionalWellbeingScore: 0,
        underusedCount: 0
      };
    }

    const mostWorn = [...garments].sort((a, b) => b.usageCount - a.usageCount)[0];
    const leastWorn = [...garments].sort((a, b) => a.usageCount - b.usageCount)[0];
    
    const fitIssuesCount = garments.filter(g => g.fitStatus === 'tight' || g.fitStatus === 'loose').length;
    
    const totalEmotionalScore = garments.reduce((sum, g) => sum + g.emotionalScore, 0);
    const emotionalWellbeingScore = Math.round(totalEmotionalScore / garments.length);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const underusedCount = garments.filter(g => 
      g.lastUsed === null || new Date(g.lastUsed) < thirtyDaysAgo
    ).length;

    return {
      totalGarments: garments.length,
      mostWorn,
      leastWorn,
      fitIssuesCount,
      emotionalWellbeingScore,
      underusedCount
    };
  }

  private checkUnderusedGarments() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const underused = this.wardrobe.garments.filter(g => 
      g.lastUsed !== null && new Date(g.lastUsed) < thirtyDaysAgo
    );

    if (underused.length > 0) {
      this.emit('GARMENT_UNUSED', { count: underused.length, ids: underused.map(g => g.id) });
    }
  }

  // --- Data Access ---
  getAllGarments(): Garment[] {
    return this.wardrobe.garments;
  }

  getGarmentById(id: string): Garment | undefined {
    return this.wardrobe.garments.find(g => g.id === id);
  }
}

// Singleton instance for demo purposes
export const wardrobeService = new IntelligentWardrobeService('demo-user-123');
