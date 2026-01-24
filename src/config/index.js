/**
 * Configuration file for TRYONYOU system
 * Manages connection settings and environment configuration
 */

// API Configuration
export const API_CONFIG = {
  // Base URL - automatically determined based on environment
  baseUrl: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api',
};

// System Configuration
export const SYSTEM_CONFIG = {
  // Version information
  version: '3.0.0',
  patent: 'PCT/EP2025/067317',
  
  // Feature flags
  features: {
    biometricScan: true,
    aiRecommendation: true,
    virtualTryOn: true,
    peacockChat: true,
  },
  
  // UI Configuration
  theme: {
    gold: '#C5A46D',
    darkblue: '#003459',
    blue: '#00A8E8',
    black: '#0A0A0A',
  },
};

// Backend Services
export const SERVICES = {
  pilot: {
    name: 'Jules Lafayette Pilot',
    enabled: true,
    description: 'Main matching engine for garment recommendation',
  },
  matching: {
    name: 'Matching Engine',
    enabled: true,
    description: 'Biometric matching and fit analysis',
  },
  database: {
    name: 'Garment Database',
    enabled: true,
    description: 'Lafayette garment catalog',
  },
};

export default {
  API_CONFIG,
  SYSTEM_CONFIG,
  SERVICES,
};
