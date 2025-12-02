/**
 * Q-API - Unified API Gateway
 * Central API layer for all ABVETOS system communications
 */

export const QAPIEndpoints = {
  agents: {
    list: '/agents',
    get: '/agents/{id}',
    restart: '/agents/{id}/restart',
    capabilities: '/agents/{id}/capabilities',
    dsx: '/agents/{id}/dsx',
    merge: '/agents/merge'
  },
  abvet: {
    commands: '/abvet/commands'
  },
  agent70: {
    authorize: '/agent70/authorize',
    status: '/agent70/status'
  },
  templates: {
    list: '/templates'
  }
};

export const QAPI = {
  call: async (endpoint, method = 'GET', data = null) => {
    console.log(`[Q-API] ${method} ${endpoint}`);
    // Simulated API response
    return {
      success: true,
      endpoint,
      method,
      data,
      timestamp: new Date().toISOString()
    };
  },
  
  getAgents: async () => {
    return QAPI.call(QAPIEndpoints.agents.list);
  },
  
  getAgent: async (id) => {
    return QAPI.call(QAPIEndpoints.agents.get.replace('{id}', id));
  },
  
  restartAgent: async (id) => {
    return QAPI.call(QAPIEndpoints.agents.restart.replace('{id}', id), 'POST');
  },
  
  getAgentCapabilities: async (id) => {
    return QAPI.call(QAPIEndpoints.agents.capabilities.replace('{id}', id));
  },
  
  getAgent70Status: async () => {
    return QAPI.call(QAPIEndpoints.agent70.status);
  },
  
  authorizeAgent70: async (request) => {
    return QAPI.call(QAPIEndpoints.agent70.authorize, 'POST', request);
  }
};

export default QAPI;
