// Q-API Mock Controller
// Mock endpoints for ABVETOS Factory Console

const mockAgents = [
  { id: 'agent-1', name: 'Vision Agent', description: 'Computer vision for garment detection', status: 'active' },
  { id: 'agent-2', name: 'Style Agent', description: 'Fashion style recommendations', status: 'active' },
  { id: 'agent-3', name: 'Fit Agent', description: 'Body measurement and fit prediction', status: 'pending' },
  { id: 'agent-4', name: 'Trend Agent', description: 'Real-time trend analysis engine', status: 'active' },
  { id: 'agent-5', name: 'Payment Agent', description: 'Biometric payment processing', status: 'active' },
  { id: 'agent-6', name: 'Social Agent', description: 'Social sharing and community features', status: 'pending' }
];

const mockLogs = [
  { timestamp: '2024-01-15 10:30:00', source: 'Agent70', level: 'info', message: 'System initialized' },
  { timestamp: '2024-01-15 10:30:05', source: 'CoreDock', level: 'success', message: 'All layers verified' },
  { timestamp: '2024-01-15 10:30:10', source: 'Vision Agent', level: 'info', message: 'Connected to image pipeline' },
  { timestamp: '2024-01-15 10:31:00', source: 'Style Agent', level: 'success', message: 'Model loaded successfully' },
  { timestamp: '2024-01-15 10:32:00', source: 'Fit Agent', level: 'info', message: 'Calibration in progress' }
];

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// GET /agents - List all agents
export async function getAgents() {
  await delay(300);
  return [...mockAgents];
}

// GET /agents/:id - Get agent by ID
export async function getAgent(id) {
  await delay(200);
  return mockAgents.find(a => a.id === id) || null;
}

// POST /agents/:id/restart - Restart an agent
export async function restartAgent(id) {
  await delay(500);
  const agent = mockAgents.find(a => a.id === id);
  if (agent) {
    agent.status = 'pending';
    setTimeout(() => { agent.status = 'active'; }, 2000);
    return { success: true, message: `Agent ${agent.name} is restarting` };
  }
  return { success: false, message: 'Agent not found' };
}

// POST /agents/merge - Merge agent configurations
export async function mergeAgents(agentIds) {
  await delay(400);
  return { success: true, message: `Merged configurations for ${agentIds.length} agents` };
}

// POST /dsx - Trigger DSX fallback
export async function triggerDSXFallback() {
  await delay(1000);
  return { success: true, message: 'DSX Fallback initiated' };
}

// POST /abvet - Execute ABVET command
export async function executeAbvetCommand(command) {
  await delay(300);
  const commands = {
    'verify': { success: true, message: 'Verification complete - all systems operational' },
    'log': { success: true, message: 'Logging enabled for all agents' },
    'fix': { success: true, message: 'Auto-correction applied to detected issues' },
    'status': { success: true, message: 'All ABVET layers functioning normally' }
  };
  return commands[command] || { success: false, message: `Unknown ABVET command: ${command}` };
}

// POST /agent70/authorize - Authorize Agent70
export async function authorizeAgent70() {
  await delay(500);
  return { authorized: true, message: 'Agent70 authorized - full control granted' };
}

// GET /agent70/status - Get Agent70 status
export async function getAgent70Status() {
  await delay(100);
  return { connected: true, mode: 'active', authority: 'full' };
}

// Execute general command
export async function executeCommand(command) {
  await delay(400);
  const cmd = command.toLowerCase().trim();
  
  if (cmd.startsWith('restart')) {
    const agentName = cmd.replace('restart', '').trim();
    return { success: true, message: `Restart command sent for ${agentName || 'all agents'}` };
  }
  if (cmd.startsWith('merge')) {
    return { success: true, message: 'Merge operation completed successfully' };
  }
  if (cmd.startsWith('dsx')) {
    return { success: true, message: 'DSX command executed' };
  }
  if (cmd.startsWith('abvet')) {
    const subCmd = cmd.replace('abvet', '').trim();
    return executeAbvetCommand(subCmd);
  }
  
  return { success: true, message: `Command "${command}" executed` };
}

// GET /logs - Get system logs
export async function getLogs() {
  await delay(200);
  return [...mockLogs];
}
