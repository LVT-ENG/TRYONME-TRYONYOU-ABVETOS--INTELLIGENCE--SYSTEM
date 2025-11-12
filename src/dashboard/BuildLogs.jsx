import React, { useState, useEffect } from 'react'

const BuildLogs = () => {
  const [logs, setLogs] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [])

  const fetchLogs = () => {
    // Mock logs - in production, fetch from GitHub Actions or custom logging service
    const mockLogs = [
      { id: 1, level: 'info', message: 'Starting build process...', timestamp: new Date(Date.now() - 300000) },
      { id: 2, level: 'info', message: 'Installing dependencies...', timestamp: new Date(Date.now() - 280000) },
      { id: 3, level: 'success', message: 'Dependencies installed successfully', timestamp: new Date(Date.now() - 260000) },
      { id: 4, level: 'info', message: 'Running Vite build...', timestamp: new Date(Date.now() - 240000) },
      { id: 5, level: 'info', message: 'Transforming 50 modules...', timestamp: new Date(Date.now() - 220000) },
      { id: 6, level: 'success', message: 'Build completed in 1.56s', timestamp: new Date(Date.now() - 200000) },
      { id: 7, level: 'info', message: 'Deploying to Vercel...', timestamp: new Date(Date.now() - 180000) },
      { id: 8, level: 'success', message: 'Deployment successful: https://tryonyou.app', timestamp: new Date(Date.now() - 160000) },
      { id: 9, level: 'warning', message: 'Large bundle size detected: 18MB', timestamp: new Date(Date.now() - 140000) },
      { id: 10, level: 'info', message: 'Running Lighthouse audit...', timestamp: new Date(Date.now() - 120000) },
    ]
    
    setLogs(mockLogs)
  }

  const getLogIcon = (level) => {
    switch (level) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
      default:
        return 'ℹ️'
    }
  }

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter)

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>📋 Build Logs</h2>
        <div className="log-filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'info' ? 'active' : ''} 
            onClick={() => setFilter('info')}
          >
            Info
          </button>
          <button 
            className={filter === 'success' ? 'active' : ''} 
            onClick={() => setFilter('success')}
          >
            Success
          </button>
          <button 
            className={filter === 'warning' ? 'active' : ''} 
            onClick={() => setFilter('warning')}
          >
            Warnings
          </button>
          <button 
            className={filter === 'error' ? 'active' : ''} 
            onClick={() => setFilter('error')}
          >
            Errors
          </button>
        </div>
      </div>
      
      <div className="logs-container">
        {filteredLogs.length === 0 ? (
          <div className="no-logs">No logs to display</div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className={`log-entry log-${log.level}`}>
              <span className="log-icon">{getLogIcon(log.level)}</span>
              <span className="log-time">
                {log.timestamp.toLocaleTimeString()}
              </span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BuildLogs

