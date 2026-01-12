import { useState, useEffect } from 'react';
import garmentsData from '../data/garments_db.json';

export interface Garment {
  id: string;
  name: string;
  category: string;
  price: number;
  fabric: string;
  elasticity: string;
  sizes: string[];
  image: string;
  texture: string;
  fit: string;
}

export const useGarmentSelector = (initialSku?: string) => {
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [garments, setGarments] = useState<Garment[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setGarments(garmentsData);

    if (initialSku) {
      const found = garmentsData.find(g => g.id === initialSku);
      if (found) setSelectedGarment(found);
    }
  }, [initialSku]);

  const selectGarment = (id: string) => {
    const found = garments.find(g => g.id === id);
    if (found) setSelectedGarment(found);
  };

  return {
    selectedGarment,
    garments,
    selectGarment
  };
};
