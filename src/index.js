/**
 * TRYONYOU Application Entry Point
 * Central initialization and module orchestration
 */

import { initializeModules } from './modules/index.js';

// Initialize all application modules
initializeModules();

// Export modules for external use
export * from './modules/index.js';

console.log('🚀 TRYONYOU Application initialized');
