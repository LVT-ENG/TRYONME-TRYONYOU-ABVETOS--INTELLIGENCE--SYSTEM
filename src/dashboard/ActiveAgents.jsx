import React, { useState, useEffect } from 'react'

const ActiveAgents = () => {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetchAgents()
    const interval = setInterval(fetchAgents, 15000) // Refresh every 15s
    return () => clearInterval(interval)
  }, [])

  const fetchAgents = () => {
    // Mock agents data - in production, fetch from your agent orchestration system
    const mockAgents = [
      {
        id: 1,
        name: 'Deploy Agent',
        status: 'active',
        task: 'Monitoring GitHub commits',
        lastActivity: new Date(Date.now() - 30000),
        uptime: '24h 15m'
      },
      {
        id: 2,
        name: 'Build Agent',
        status: 'idle',
        task: 'Waiting for new builds',
        lastActivity: new Date(Date.now() - 180000),
        uptime: '24h 15m'
      },
      {
        id: 3,
        name: 'Test Agent',
        status: 'active',
        task: 'Running Lighthouse audit',
        lastActivity: new Date(Date.now() - 5000),
        uptime: '12h 45m'
      },
      {
        id: 4,
        name: 'Notification Agent',
        status: 'active',
        task: 'Sending deployment status',
        lastActivity: new Date(Date.now() - 10000),
        uptime: '24h 15m'
      },
      {
        id: 5,
        name: 'Analytics Agent',
        status: 'active',
        task: 'Collecting performance metrics',
        lastActivity: new Date(Date.now() - 2000),
        uptime: '6h 30m'
      }
    ]
    
    setAgents(mockAgents)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#00ff88'
      case 'idle':
        return '#ffd700'
      case 'error':
        return '#ff4444'
      default:
        return '#888'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return '🟢'
      case 'idle':
        return '🟡'
      case 'error':
        return '🔴'
      default:
        return '⚪'
    }
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>🤖 Active Agents</h2>
        <span className="agent-count">{agents.filter(a => a.status === 'active').length}/{agents.length} Active</span>
      </div>
      
      <div className="agents-list">
        {agents.map(agent => (
          <div key={agent.id} className="agent-item">
            <div className="agent-header">
              <div className="agent-name">
                <span className="agent-status-icon">{getStatusIcon(agent.status)}</span>
                <strong>{agent.name}</strong>
              </div>
              <span 
                className="agent-status-badge"
                style={{ backgroundColor: getStatusColor(agent.status) }}
              >
                {agent.status}
              </span>
            </div>
            
            <div className="agent-task">
              <span className="task-label">Task:</span>
              <span className="task-text">{agent.task}</span>
            </div>
            
            <div className="agent-footer">
              <span className="agent-uptime">⏱️ {agent.uptime}</span>
              <span className="agent-activity">
                Last: {Math.floor((Date.now() - agent.lastActivity) / 1000)}s ago
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveAgents

