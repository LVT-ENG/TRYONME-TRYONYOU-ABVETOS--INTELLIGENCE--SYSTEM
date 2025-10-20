/**
 * TRYONYOU Modules Index
 * Central export point for all application modules
 */

import PAUModule from './pau/index.js';
import ABVETModule from './abvet/index.js';
import CAPModule from './cap/index.js';
import AutoDonateModule from './autodonate/index.js';

export {
  PAUModule,
  ABVETModule,
  CAPModule,
  AutoDonateModule
};

// Initialize all modules
export const initializeModules = () => {
  PAUModule.initialize();
  ABVETModule.initialize();
  CAPModule.initialize();
  AutoDonateModule.initialize();
  console.log('✅ All TRYONYOU modules initialized');
};

export default {
  PAUModule,
  ABVETModule,
  CAPModule,
  AutoDonateModule,
  initializeModules
};
