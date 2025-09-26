// Shared configuration for TRYONYOU monorepo
export const config = {
  appName: 'TRYONYOU',
  version: '1.0.0',
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.tryonyou.app' 
    : 'http://localhost:3001',
  features: {
    legacy: true,
    web: true,
    ai: true
  }
};