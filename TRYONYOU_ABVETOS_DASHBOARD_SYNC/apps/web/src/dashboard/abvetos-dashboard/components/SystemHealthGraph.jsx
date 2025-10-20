import React, { useState, useEffect } from 'react'

const SystemHealthGraph = () => {
  const [healthData, setHealthData] = useState({
    cpu: 0,
    memory: 0,
    requests: 0,
    errorRate: 0
  })

  const [history, setHistory] = useState([])

  useEffect(() => {
    const generateHealthData = () => {
      // Simulate real-time health metrics
      const cpu = Math.random() * 60 + 20 // 20-80%
      const memory = Math.random() * 50 + 30 // 30-80%
      const requests = Math.floor(Math.random() * 500 + 100) // 100-600 req/s
      const errorRate = Math.random() * 2 // 0-2%

      const newData = {
        cpu: cpu.toFixed(1),
        memory: memory.toFixed(1),
        requests,
        errorRate: errorRate.toFixed(2),
        timestamp: new Date().toISOString()
      }

      setHealthData(newData)
      setHistory(prev => [...prev.slice(-20), newData]) // Keep last 20 data points
    }

    generateHealthData()
    const interval = setInterval(generateHealthData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getHealthStatus = (cpu, memory) => {
    const avgLoad = (parseFloat(cpu) + parseFloat(memory)) / 2
    if (avgLoad < 50) return { status: 'healthy', color: '#00ff88', text: 'Healthy' }
    if (avgLoad < 70) return { status: 'moderate', color: '#ffaa00', text: 'Moderate' }
    return { status: 'high', color: '#ff4444', text: 'High Load' }
  }

  const health = getHealthStatus(healthData.cpu, healthData.memory)

  const renderMiniGraph = (data, key) => {
    const values = data.map(d => parseFloat(d[key]))
    const max = Math.max(...values, 100)
    const min = Math.min(...values, 0)
    const range = max - min || 1

    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <svg className="mini-graph" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    )
  }

  return (
    <div className="system-health">
      <div className="section-header">
        <h2>💓 System Health</h2>
        <span className={`health-badge ${health.status}`} style={{ backgroundColor: health.color }}>
          {health.text}
        </span>
      </div>

      <div className="health-metrics">
        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-label">CPU Usage</span>
            <span className="metric-value">{healthData.cpu}%</span>
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill cpu" 
              style={{ width: `${healthData.cpu}%` }}
            />
          </div>
          {history.length > 0 && renderMiniGraph(history, 'cpu')}
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-label">Memory Usage</span>
            <span className="metric-value">{healthData.memory}%</span>
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill memory" 
              style={{ width: `${healthData.memory}%` }}
            />
          </div>
          {history.length > 0 && renderMiniGraph(history, 'memory')}
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-label">Requests/sec</span>
            <span className="metric-value">{healthData.requests}</span>
          </div>
          <div className="metric-graph">
            {history.length > 0 && renderMiniGraph(history, 'requests')}
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-label">Error Rate</span>
            <span className="metric-value">{healthData.errorRate}%</span>
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill error" 
              style={{ width: `${Math.min(healthData.errorRate * 20, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemHealthGraph
