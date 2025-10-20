import React, { useState, useEffect } from 'react'

const DeployList = () => {
  const [deployments, setDeployments] = useState([
    {
      id: 1,
      status: 'success',
      branch: 'main',
      commit: 'a1b2c3d',
      message: 'Update dashboard components',
      author: 'LVT-ENG',
      timestamp: new Date().toISOString(),
      url: 'https://tryonyou.app'
    },
    {
      id: 2,
      status: 'success',
      branch: 'main',
      commit: 'e4f5g6h',
      message: 'Add Telegram notifications',
      author: 'LVT-ENG',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      url: 'https://tryonyou.app'
    },
    {
      id: 3,
      status: 'success',
      branch: 'main',
      commit: 'i7j8k9l',
      message: 'Optimize build process',
      author: 'LVT-ENG',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      url: 'https://tryonyou.app'
    }
  ])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'pending':
        return '🔄'
      case 'failed':
        return '❌'
      default:
        return '⚪'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="deploy-list-container">
      <h2>🚀 Recent Deployments</h2>
      <div className="deploy-list">
        {deployments.map((deploy) => (
          <div key={deploy.id} className="deploy-item">
            <div className="deploy-status">
              <span className="status-icon">{getStatusIcon(deploy.status)}</span>
              <span className="status-text">{deploy.status}</span>
            </div>
            <div className="deploy-info">
              <div className="deploy-commit">
                <code>{deploy.commit}</code> on <strong>{deploy.branch}</strong>
              </div>
              <div className="deploy-message">{deploy.message}</div>
              <div className="deploy-meta">
                <span>👤 {deploy.author}</span>
                <span>⏰ {formatTime(deploy.timestamp)}</span>
              </div>
            </div>
            {deploy.url && (
              <a 
                href={deploy.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="deploy-link"
              >
                🔗 View
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeployList
