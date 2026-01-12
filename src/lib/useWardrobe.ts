import { useState, useEffect, useCallback } from 'react';
import { wardrobeService } from '../services/IntelligentWardrobeService';
import { Garment, WardrobeSummary, WardrobeEvent } from '../types/wardrobe';

export function useWardrobe() {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [summary, setSummary] = useState<WardrobeSummary | null>(null);
  const [events, setEvents] = useState<WardrobeEvent[]>([]);

  const refreshData = useCallback(() => {
    setGarments([...wardrobeService.getAllGarments()]);
    setSummary(wardrobeService.getWardrobeSummary());
  }, []);

  useEffect(() => {
    // Initial load
    refreshData();

    // Subscribe to service events
    const unsubscribe = wardrobeService.subscribe((event) => {
      setEvents(prev => [event, ...prev].slice(0, 50)); // Keep last 50 events
      refreshData(); // Auto-refresh on any change
    });

    return () => unsubscribe();
  }, [refreshData]);

  const addGarment = (garment: Omit<Garment, 'id' | 'userId' | 'usageCount' | 'lastUsed' | 'fitStatus'>) => {
    wardrobeService.addGarment(garment);
  };

  const recordUsage = (id: string) => {
    wardrobeService.recordUsage(id);
  };

  const updateFitStatus = (id: string, status: 'fits' | 'tight' | 'loose') => {
    wardrobeService.updateGarmentState(id, { fitStatus: status });
  };

  return {
    garments,
    summary,
    events,
    addGarment,
    recordUsage,
    updateFitStatus
  };
}
