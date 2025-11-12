import React, { useState, useEffect } from 'react'
import './SystemMetrics.css'

function SystemMetrics() {
  const [metrics, setMetrics] = useState({
    commits: [],
    buildStatus: 'success',
    deployLogs: [],
    systemHealth: {
      cpu: 0,
      memory: 0,
      uptime: '0h 0m',
      requests: 0
    }
  })

  const [loading, setLoading] = useState(true)

  // Simular carga de datos desde API
  useEffect(() => {
    const fetchMetrics = async () => {
      // En producción, esto vendría de /api/system-status
      const mockData = {
        commits: [
          {
            hash: '7ca8982',
            message: 'docs(dashboard): Añadir documentación de despliegue',
            author: 'Manus AI',
            date: new Date().toISOString(),
            branch: 'main'
          },
          {
            hash: '7b265b4',
            message: 'feat(complete): Sistema completo de versionado automático',
            author: 'Manus AI',
            date: new Date(Date.now() - 3600000).toISOString(),
            branch: 'main'
          },
          {
            hash: '2be9adb',
            message: 'feat(design): Premium Human-Centered Design',
            author: 'Manus AI',
            date: new Date(Date.now() - 7200000).toISOString(),
            branch: 'main'
          }
        ],
        buildStatus: 'success',
        deployLogs: [
          {
            id: 1,
            timestamp: new Date().toISOString(),
            message: '✅ Build completed successfully',
            type: 'success'
          },
          {
            id: 2,
            timestamp: new Date(Date.now() - 60000).toISOString(),
            message: '🔨 Building production bundle...',
            type: 'info'
          },
          {
            id: 3,
            timestamp: new Date(Date.now() - 120000).toISOString(),
            message: '📦 Installing dependencies...',
            type: 'info'
          },
          {
            id: 4,
            timestamp: new Date(Date.now() - 180000).toISOString(),
            message: '🚀 Deploy initiated',
            type: 'info'
          }
        ],
        systemHealth: {
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 30) + 40,
          uptime: '24h 15m',
          requests: 1247 + Math.floor(Math.random() * 100)
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      setMetrics(mockData)
      setLoading(false)
    }

    fetchMetrics()

    // Actualizar cada 30 segundos
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return '#10B981'
      case 'failed':
        return '#EF4444'
      case 'pending':
        return '#F59E0B'
      default:
        return '#6B7280'
    }
  }

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  if (loading) {
    return (
      <div className="system-metrics loading">
        <div className="loading-spinner"></div>
        <p>Loading system metrics...</p>
      </div>
    )
  }

  return (
    <div className="system-metrics">
      {/* Header */}
      <div className="metrics-header">
        <h2 className="metrics-title">
          <span className="title-icon">📊</span>
          System Metrics
        </h2>
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span className="live-text">Live</span>
        </div>
      </div>

      {/* System Health Cards */}
      <div className="health-cards">
        <div className="health-card">
          <div className="card-icon cpu">💻</div>
          <div className="card-content">
            <span className="card-label">CPU Usage</span>
            <span className="card-value">{metrics.systemHealth.cpu}%</span>
          </div>
          <div className="card-bar">
            <div 
              className="card-bar-fill cpu"
              style={{ width: `${metrics.systemHealth.cpu}%` }}
            ></div>
          </div>
        </div>

        <div className="health-card">
          <div className="card-icon memory">💾</div>
          <div className="card-content">
            <span className="card-label">Memory</span>
            <span className="card-value">{metrics.systemHealth.memory}%</span>
          </div>
          <div className="card-bar">
            <div 
              className="card-bar-fill memory"
              style={{ width: `${metrics.systemHealth.memory}%` }}
            ></div>
          </div>
        </div>

        <div className="health-card">
          <div className="card-icon uptime">⏱️</div>
          <div className="card-content">
            <span className="card-label">Uptime</span>
            <span className="card-value">{metrics.systemHealth.uptime}</span>
          </div>
        </div>

        <div className="health-card">
          <div className="card-icon requests">📈</div>
          <div className="card-content">
            <span className="card-label">Requests</span>
            <span className="card-value">{metrics.systemHealth.requests.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Build Status */}
      <div className="metrics-section">
        <h3 className="section-title">
          <span className="section-icon">🔨</span>
          Build Status
        </h3>
        <div className="build-status-card">
          <div 
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(metrics.buildStatus) }}
          ></div>
          <div className="status-content">
            <span className="status-label">Current Build</span>
            <span className="status-value">{metrics.buildStatus.toUpperCase()}</span>
          </div>
          <div className="status-time">
            Last build: {formatDate(metrics.commits[0]?.date)}
          </div>
        </div>
      </div>

      {/* Recent Commits */}
      <div className="metrics-section">
        <h3 className="section-title">
          <span className="section-icon">📝</span>
          Recent Commits
        </h3>
        <div className="commits-list">
          {metrics.commits.map((commit) => (
            <div key={commit.hash} className="commit-item">
              <div className="commit-hash">
                <code>{commit.hash}</code>
              </div>
              <div className="commit-details">
                <p className="commit-message">{commit.message}</p>
                <div className="commit-meta">
                  <span className="commit-author">{commit.author}</span>
                  <span className="commit-separator">•</span>
                  <span className="commit-time">{formatDate(commit.date)}</span>
                  <span className="commit-separator">•</span>
                  <span className="commit-branch">{commit.branch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy Logs */}
      <div className="metrics-section">
        <h3 className="section-title">
          <span className="section-icon">🚀</span>
          Deploy Logs
        </h3>
        <div className="logs-container">
          {metrics.deployLogs.map((log) => (
            <div key={log.id} className={`log-entry ${log.type}`}>
              <span className="log-icon">{getLogIcon(log.type)}</span>
              <span className="log-time">{formatDate(log.timestamp)}</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="metrics-footer">
        <p className="footer-text">
          TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
        </p>
        <p className="footer-subtext">
          System monitoring powered by ABVETOS Intelligence
        </p>
      </div>
    </div>
  )
}

export default SystemMetrics

