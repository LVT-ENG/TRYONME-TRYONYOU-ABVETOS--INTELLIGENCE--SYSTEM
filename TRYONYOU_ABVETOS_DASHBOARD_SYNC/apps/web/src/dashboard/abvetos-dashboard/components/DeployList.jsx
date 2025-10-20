import React from 'react'

const DeployList = ({ deployments }) => {
  if (!deployments || deployments.length === 0) {
    return (
      <div className="deploy-list-empty">
        <p>No deployments found</p>
      </div>
    )
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
    return `deploy-status status-${status}`
  }

  return (
    <div className="deploy-list">
      {deployments.map((deploy) => (
        <div key={deploy.id} className="deploy-item">
          <div className="deploy-header">
            <span className={getStatusClass(deploy.status)}>
              {getStatusIcon(deploy.status)} {deploy.status.toUpperCase()}
            </span>
            <span className="deploy-time">
              {new Date(deploy.timestamp).toLocaleString()}
            </span>
          </div>
          
          <div className="deploy-content">
            <div className="deploy-info">
              <div className="info-row">
                <span className="info-label">Commit:</span>
                <code className="info-value">{deploy.commit}</code>
              </div>
              <div className="info-row">
                <span className="info-label">Branch:</span>
                <span className="info-value">{deploy.branch}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Author:</span>
                <span className="info-value">{deploy.author}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Duration:</span>
                <span className="info-value">{deploy.duration}</span>
              </div>
            </div>
            
            <div className="deploy-message">
              <p>{deploy.message}</p>
            </div>
            
            {deploy.url && (
              <div className="deploy-url">
                <a href={deploy.url} target="_blank" rel="noopener noreferrer">
                  🌐 {deploy.url}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeployList
