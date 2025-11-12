/**
 * EPIC MONITOR DASHBOARD
 * TRYONYOU Intelligence System
 * Real-time API and Agent Monitoring
 */

// State management
let apiData = null;
let filteredApis = [];
let currentCategory = 'all';
let currentStatus = 'all';

/**
 * Initialize dashboard on page load
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 EPIC Monitor Dashboard initializing...');
  
  try {
    await loadApiStatus();
    renderDashboard();
    setupEventListeners();
    startAutoRefresh();
    
    console.log('✅ Dashboard initialized successfully');
  } catch (error) {
    console.error('❌ Dashboard initialization failed:', error);
    showError('Failed to initialize dashboard. Please refresh the page.');
  }
});

/**
 * Load API status data from JSON file
 */
async function loadApiStatus() {
  try {
    const response = await fetch('apiStatus.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    apiData = await response.json();
    filteredApis = apiData.apis;
    console.log('📊 API status data loaded:', apiData);
  } catch (error) {
    console.error('Failed to load API status:', error);
    throw error;
  }
}

/**
 * Render the complete dashboard
 */
function renderDashboard() {
  if (!apiData) return;
  
  updateLastUpdateTime();
  renderMetricsOverview();
  renderFilteredApis();
  renderAgentStats();
}

/**
 * Update last update timestamp
 */
function updateLastUpdateTime() {
  const lastUpdateEl = document.getElementById('lastUpdate');
  if (lastUpdateEl && apiData) {
    const date = new Date(apiData.lastUpdate);
    lastUpdateEl.textContent = `Last updated: ${formatDateTime(date)}`;
  }
}

/**
 * Render metrics overview cards
 */
function renderMetricsOverview() {
  const container = document.getElementById('metricsOverview');
  if (!container || !apiData) return;
  
  const metrics = [
    {
      label: 'System Uptime',
      value: `${apiData.systemMetrics.overallUptime}%`,
      description: 'Overall system availability',
      badge: 'Excellent'
    },
    {
      label: 'Average Response',
      value: `${apiData.systemMetrics.averageResponseTime}ms`,
      description: 'Across all API endpoints',
      badge: 'Fast'
    },
    {
      label: 'Success Rate',
      value: `${apiData.systemMetrics.successRate}%`,
      description: 'Successful API requests',
      badge: 'High'
    },
    {
      label: 'Security Score',
      value: `${apiData.systemMetrics.securityScore}`,
      description: 'System security rating',
      badge: 'Secure'
    },
    {
      label: 'Active Agents',
      value: `${apiData.agentStats.activeAgents}/${apiData.agentStats.totalAgents}`,
      description: 'Intelligent agents running',
      badge: 'Online'
    },
    {
      label: 'Agent Efficiency',
      value: `${apiData.agentStats.averageEfficiency}%`,
      description: 'Average agent performance',
      badge: 'Optimal'
    }
  ];
  
  container.innerHTML = metrics.map(metric => `
    <div class="metric-card">
      <div class="metric-label">${metric.label}</div>
      <div class="metric-value">${metric.value}</div>
      <div class="metric-description">${metric.description}</div>
      <div class="metric-badge">${metric.badge}</div>
    </div>
  `).join('');
}

/**
 * Render filtered API cards
 */
function renderFilteredApis() {
  const container = document.getElementById('apiGrid');
  if (!container) return;
  
  if (filteredApis.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
        <p style="font-size: 1.2rem; color: var(--text-secondary);">
          No APIs match the selected filters.
        </p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredApis.map(api => {
    const statusClass = api.status.toLowerCase().replace(' ', '-');
    const uptimeColor = getUptimeColor(api.uptime);
    const responseColor = getResponseTimeColor(api.responseTime);
    
    return `
      <div class="api-card status-${statusClass}">
        <div class="api-header">
          <div class="api-name">${api.name}</div>
          <div class="status-indicator ${statusClass}">
            <span class="status-dot"></span>
            ${api.status}
          </div>
        </div>
        
        <div class="api-endpoint">${api.endpoint}</div>
        
        <div class="api-stats">
          <div class="stat-item">
            <div class="stat-label">Uptime</div>
            <div class="stat-value" style="color: ${uptimeColor}">
              ${api.uptime}<span class="stat-unit">%</span>
            </div>
          </div>
          
          <div class="stat-item">
            <div class="stat-label">Response</div>
            <div class="stat-value" style="color: ${responseColor}">
              ${api.responseTime}<span class="stat-unit">ms</span>
            </div>
          </div>
        </div>
        
        <div class="api-category">
          <div class="category-badge">${api.category}</div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render agent statistics section
 */
function renderAgentStats() {
  const container = document.getElementById('agentStatsGrid');
  if (!container || !apiData) return;
  
  const stats = [
    {
      label: 'Total Agents',
      value: apiData.agentStats.totalAgents
    },
    {
      label: 'Active Agents',
      value: apiData.agentStats.activeAgents
    },
    {
      label: 'Avg Efficiency',
      value: `${apiData.agentStats.averageEfficiency}%`
    },
    {
      label: 'Total Tasks',
      value: formatNumber(apiData.agentStats.totalTasks)
    },
    {
      label: 'Completed',
      value: formatNumber(apiData.agentStats.completedTasks)
    },
    {
      label: 'Success Rate',
      value: `${apiData.agentStats.successRate}%`
    }
  ];
  
  container.innerHTML = stats.map(stat => `
    <div class="agent-stat-card">
      <div class="agent-stat-value">${stat.value}</div>
      <div class="agent-stat-label">${stat.label}</div>
    </div>
  `).join('');
}

/**
 * Setup event listeners for filters
 */
function setupEventListeners() {
  // Category filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      applyFilters();
    });
  }
  
  // Status filter
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      currentStatus = e.target.value;
      applyFilters();
    });
  }
}

/**
 * Apply current filters to API list
 */
function applyFilters() {
  if (!apiData) return;
  
  filteredApis = apiData.apis.filter(api => {
    const categoryMatch = currentCategory === 'all' || api.category === currentCategory;
    const statusMatch = currentStatus === 'all' || api.status === currentStatus;
    return categoryMatch && statusMatch;
  });
  
  renderFilteredApis();
  console.log(`Filtered APIs: ${filteredApis.length} of ${apiData.apis.length}`);
}

/**
 * Start auto-refresh interval
 */
function startAutoRefresh() {
  // Refresh data every 30 seconds
  setInterval(async () => {
    try {
      await loadApiStatus();
      renderDashboard();
      console.log('🔄 Dashboard auto-refreshed');
    } catch (error) {
      console.error('Auto-refresh failed:', error);
    }
  }, 30000);
}

/**
 * Utility: Get color based on uptime percentage
 */
function getUptimeColor(uptime) {
  if (uptime >= 99) return 'var(--status-operational)';
  if (uptime >= 95) return 'var(--status-degraded)';
  return 'var(--status-outage)';
}

/**
 * Utility: Get color based on response time
 */
function getResponseTimeColor(responseTime) {
  if (responseTime <= 200) return 'var(--status-operational)';
  if (responseTime <= 400) return 'var(--status-degraded)';
  return 'var(--status-outage)';
}

/**
 * Utility: Format date and time
 */
function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
}

/**
 * Utility: Format large numbers with commas
 */
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

/**
 * Show error message to user
 */
function showError(message) {
  const container = document.querySelector('.dashboard-container');
  if (container) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid var(--status-outage);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
      color: var(--status-outage);
      text-align: center;
    `;
    errorDiv.textContent = message;
    container.prepend(errorDiv);
  }
}

/**
 * Get unique categories from API data
 */
function getUniqueCategories() {
  if (!apiData) return [];
  return [...new Set(apiData.apis.map(api => api.category))].sort();
}

/**
 * Populate category filter dropdown
 */
function populateCategoryFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter || !apiData) return;
  
  const categories = getUniqueCategories();
  const currentValue = categoryFilter.value;
  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>' +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
  
  categoryFilter.value = currentValue;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadApiStatus,
    renderDashboard,
    applyFilters,
    getUptimeColor,
    getResponseTimeColor,
    formatDateTime,
    formatNumber
  };
}
