/**
 * TRYONYOU Modules Index
 * Central export for all platform modules
 */

export { QAPI } from './qapi.js';
export { ABVETCoreDock, LogLevel } from './abvet-core-dock.js';
export { Agent70, ApprovalState, MetricType } from './agent70.js';

// Module versions
export const moduleVersions = {
  qapi: '1.0.0',
  abvetCoreDock: '1.0.0',
  agent70: '1.0.0'
};

// Initialize all modules
export function initializeModules(options = {}) {
  const { QAPI } = require('./qapi.js');
  const { ABVETCoreDock } = require('./abvet-core-dock.js');
  const { Agent70 } = require('./agent70.js');

  // Initialize ABVET Core Dock
  ABVETCoreDock.init(options.abvet || {});

  // Activate Agent70
  Agent70.activate(options.agent70 || {});

  console.log('[TRYONYOU] All modules initialized');

  return {
    qapi: QAPI,
    abvet: ABVETCoreDock,
    agent70: Agent70
  };
}
