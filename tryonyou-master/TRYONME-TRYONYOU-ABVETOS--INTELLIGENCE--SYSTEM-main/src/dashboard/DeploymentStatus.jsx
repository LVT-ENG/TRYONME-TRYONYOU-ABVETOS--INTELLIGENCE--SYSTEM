import React, { useState, useEffect } from 'react'

const DeploymentStatus = () => {
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeployments()
    const interval = setInterval(fetchDeployments, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchDeployments = async () => {
    try {
      // In production, this would fetch from GitHub Actions API or Vercel API
      // For now, we'll use mock data
      const mockDeployments = [
        {
          id: 1,
          status: 'success',
          version: '1.0.0',
          commit: 'abc123f',
          branch: 'main',
          timestamp: new Date().toISOString(),
          duration: '1m 23s',
          url: 'https://tryonyou.app'
        },
        {
          id: 2,
          status: 'running',
          version: '1.0.1',
          commit: 'def456a',
          branch: 'main',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          duration: '2m 10s',
          url: null
        }
      ]
      
      setDeployments(mockDeployments)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching deployments:', error)
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'running':
        return '🔄'
      case 'failed':
        return '❌'
      default:
        return '⏸️'
    }
  }

  const getStatusClass = (status) => {
    return `status-badge status-${status}`
  }

  if (loading) {
    return (
      <div className="section-card">
        <h2>🚀 Deployment Status</h2>
        <div className="loading-state">Loading deployments...</div>
      </div>
    )
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>🚀 Deployment Status</h2>
        <button className="refresh-button" onClick={fetchDeployments}>
          🔄 Refresh
        </button>
      </div>
      
      <div className="deployments-list">
        {deployments.map(deploy => (
          <div key={deploy.id} className="deployment-item">
            <div className="deployment-header">
              <span className={getStatusClass(deploy.status)}>
                {getStatusIcon(deploy.status)} {deploy.status.toUpperCase()}
              </span>
              <span className="deployment-version">v{deploy.version}</span>
            </div>
            
            <div className="deployment-details">
              <div className="detail-row">
                <span className="detail-label">Commit:</span>
                <code>{deploy.commit}</code>
              </div>
              <div className="detail-row">
                <span className="detail-label">Branch:</span>
                <span>{deploy.branch}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span>{deploy.duration}</span>
              </div>
              {deploy.url && (
                <div className="detail-row">
                  <span className="detail-label">URL:</span>
                  <a href={deploy.url} target="_blank" rel="noopener noreferrer">
                    {deploy.url}
                  </a>
                </div>
              )}
            </div>
            
            <div className="deployment-time">
              {new Date(deploy.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeploymentStatus

