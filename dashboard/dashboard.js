/**
 * ABVETOS Dashboard
 * System monitoring and orchestration interface
 */

class ABVETOSDashboard {
  constructor() {
    this.agents = [
      { id: 70, name: 'Orquestador General', status: 'active', lastCheck: new Date() },
      { id: 22, name: 'Deploy Operator', status: 'active', lastCheck: new Date() },
      { id: 20, name: 'GitHub Commit Agent', status: 'active', lastCheck: new Date() },
      { id: 46, name: 'Document Locker', status: 'active', lastCheck: new Date() },
      { id: 12, name: 'Brand Guardian', status: 'active', lastCheck: new Date() },
      { id: 31, name: 'Video Curator', status: 'pending', lastCheck: null },
      { id: 2, name: 'Content Pro', status: 'pending', lastCheck: null },
      { id: 25, name: 'Image Curator', status: 'pending', lastCheck: null }
    ];
    this.logs = [];
  }

  init() {
    console.log('Initializing ABVETOS Dashboard...');
    this.renderAgents();
    this.renderLogs();
    this.startAutoRefresh();
    this.addLog('Dashboard initialized', 'info');
  }

  renderAgents() {
    const container = document.getElementById('agents-list');
    if (!container) return;

    container.innerHTML = this.agents.map(agent => {
      const statusIcon = agent.status === 'active' ? '🟢' : '🟡';
      const lastCheck = agent.lastCheck 
        ? new Date(agent.lastCheck).toLocaleTimeString() 
        : 'Not checked';
      
      return `
        <div class="agent-item ${agent.status}">
          <div class="agent-info">
            <span class="agent-id">Agent ${agent.id}</span>
            <span class="agent-name">${agent.name}</span>
          </div>
          <div class="agent-status">
            <span class="status-icon">${statusIcon}</span>
            <span class="last-check">${lastCheck}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderLogs() {
    const container = document.getElementById('logs-container');
    if (!container) return;

    if (this.logs.length === 0) {
      container.innerHTML = '<p class="no-logs">No recent activity</p>';
      return;
    }

    container.innerHTML = this.logs.map(log => {
      const time = new Date(log.timestamp).toLocaleTimeString();
      const levelClass = `log-${log.level}`;
      
      return `
        <div class="log-entry ${levelClass}">
          <span class="log-time">${time}</span>
          <span class="log-message">${log.message}</span>
        </div>
      `;
    }).join('');
  }

  addLog(message, level = 'info') {
    this.logs.unshift({
      timestamp: new Date(),
      message,
      level
    });

    // Keep only last 50 logs
    if (this.logs.length > 50) {
      this.logs = this.logs.slice(0, 50);
    }

    this.renderLogs();
  }

  updateDeployStatus() {
    const deployStatus = document.getElementById('deploy-status');
    const lastDeploy = document.getElementById('last-deploy');
    
    if (deployStatus) {
      deployStatus.textContent = '✅ Active';
    }
    
    if (lastDeploy) {
      lastDeploy.textContent = new Date().toLocaleString();
    }
  }

  startAutoRefresh() {
    // Refresh every 30 seconds
    setInterval(() => {
      this.updateDeployStatus();
      this.addLog('Dashboard refreshed', 'info');
    }, 30000);
  }

  checkSystemHealth() {
    const activeAgents = this.agents.filter(a => a.status === 'active').length;
    const totalAgents = this.agents.length;
    
    const healthStatus = document.getElementById('health-status');
    const agentCount = document.getElementById('agent-count');
    
    if (healthStatus) {
      if (activeAgents === totalAgents) {
        healthStatus.textContent = '🟢 Healthy';
      } else if (activeAgents >= totalAgents * 0.7) {
        healthStatus.textContent = '🟡 Degraded';
      } else {
        healthStatus.textContent = '🔴 Critical';
      }
    }
    
    if (agentCount) {
      agentCount.textContent = `${activeAgents}/${totalAgents}`;
    }
  }
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new ABVETOSDashboard();
  dashboard.init();
  dashboard.checkSystemHealth();
});
