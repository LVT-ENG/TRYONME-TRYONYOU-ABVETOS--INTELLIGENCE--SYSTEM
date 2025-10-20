import React, { useState, useEffect } from 'react'

const MetricsCard = () => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    requests: 0,
    uptime: '0d 0h 0m'
  })

  useEffect(() => {
    // Simulate real-time metrics
    const updateMetrics = () => {
      setMetrics({
        cpu: Math.floor(Math.random() * 30) + 20, // 20-50%
        memory: Math.floor(Math.random() * 20) + 60, // 60-80%
        requests: Math.floor(Math.random() * 500) + 1000, // 1000-1500
        uptime: calculateUptime()
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  const calculateUptime = () => {
    const startDate = new Date('2025-01-01')
    const now = new Date()
    const diff = now - startDate
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <div className="metrics-container">
      <h2>📊 System Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💻</div>
          <div className="metric-info">
            <div className="metric-label">CPU Usage</div>
            <div className="metric-value">{metrics.cpu}%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🧠</div>
          <div className="metric-info">
            <div className="metric-label">Memory</div>
            <div className="metric-value">{metrics.memory}%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📡</div>
          <div className="metric-info">
            <div className="metric-label">Requests/min</div>
            <div className="metric-value">{metrics.requests}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-info">
            <div className="metric-label">Uptime</div>
            <div className="metric-value">{metrics.uptime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetricsCard
