import React, { useState, useEffect } from 'react'

const SystemHealthGraph = () => {
  const [healthData, setHealthData] = useState({
    uptime: '99.9%',
    responseTime: '120ms',
    activeServices: 8,
    totalServices: 8,
    status: 'healthy'
  })

  useEffect(() => {
    fetchHealthData()
    const interval = setInterval(fetchHealthData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchHealthData = async () => {
    try {
      // Mock health data
      // In production, this would fetch from monitoring service
      const mockData = {
        uptime: '99.9%',
        responseTime: `${Math.floor(Math.random() * 50 + 100)}ms`,
        activeServices: 8,
        totalServices: 8,
        status: 'healthy'
      }

      setHealthData(mockData)
    } catch (error) {
      console.error('Error fetching health data:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return '#22c55e'
      case 'degraded':
        return '#f59e0b'
      case 'down':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const healthPercentage = (healthData.activeServices / healthData.totalServices) * 100

  return (
    <div className="system-health-graph">
      <div className="health-overview">
        <div className="health-status">
          <div 
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(healthData.status) }}
          ></div>
          <span className="status-text">{healthData.status.toUpperCase()}</span>
        </div>
        
        <div className="health-metrics">
          <div className="health-metric">
            <span className="metric-label">Uptime</span>
            <span className="metric-value">{healthData.uptime}</span>
          </div>
          <div className="health-metric">
            <span className="metric-label">Response Time</span>
            <span className="metric-value">{healthData.responseTime}</span>
          </div>
          <div className="health-metric">
            <span className="metric-label">Active Services</span>
            <span className="metric-value">
              {healthData.activeServices}/{healthData.totalServices}
            </span>
          </div>
        </div>
      </div>

      <div className="health-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${healthPercentage}%`,
              backgroundColor: getStatusColor(healthData.status)
            }}
          ></div>
        </div>
        <span className="progress-label">{Math.round(healthPercentage)}% Operational</span>
      </div>

      <div className="services-grid">
        {[
          { name: 'Deploy Express', status: 'active' },
          { name: 'GitHub Actions', status: 'active' },
          { name: 'Vercel', status: 'active' },
          { name: 'Telegram Bot', status: 'active' },
          { name: 'Build System', status: 'active' },
          { name: 'Dashboard API', status: 'active' },
          { name: 'Monitoring', status: 'active' },
          { name: 'Auto-Deploy', status: 'active' }
        ].map((service, index) => (
          <div key={index} className="service-item">
            <span className={`service-dot ${service.status}`}></span>
            <span className="service-name">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SystemHealthGraph
