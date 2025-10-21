import React, { useState, useEffect } from 'react'

const DeployList = () => {
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        // Fetch from Vercel API or GitHub Actions
        const response = await fetch('/api/deployments')
        if (response.ok) {
          const data = await response.json()
          setDeployments(data)
        } else {
          // Fallback demo data
          setDeployments([
            {
              id: 1,
              name: 'Production Deploy',
              status: 'success',
              url: 'https://tryonyou.app',
              branch: 'main',
              commit: 'a3f2b1c',
              timestamp: new Date().toISOString(),
              duration: '2m 34s'
            },
            {
              id: 2,
              name: 'Staging Deploy',
              status: 'success',
              url: 'https://staging.tryonyou.app',
              branch: 'develop',
              commit: 'b4c5d6e',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              duration: '2m 12s'
            }
          ])
        }
      } catch (error) {
        console.error('Failed to fetch deployments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeployments()
    const interval = setInterval(fetchDeployments, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'failed':
        return '❌'
      case 'in_progress':
        return '⏳'
      default:
        return '⚪'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="deploy-list">
        <h2>📋 Recent Deployments</h2>
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="deploy-list">
      <div className="section-header">
        <h2>📋 Recent Deployments</h2>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          🔄 Refresh
        </button>
      </div>
      <div className="deploy-table">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Commit</th>
              <th>Duration</th>
              <th>Time</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {deployments.map(deploy => (
              <tr key={deploy.id}>
                <td className="status-cell">
                  <span className="status-icon">{getStatusIcon(deploy.status)}</span>
                </td>
                <td className="deploy-name">{deploy.name}</td>
                <td className="branch-name">
                  <span className="branch-tag">{deploy.branch}</span>
                </td>
                <td className="commit-hash">
                  <code>{deploy.commit}</code>
                </td>
                <td className="duration">{deploy.duration}</td>
                <td className="timestamp">{formatTime(deploy.timestamp)}</td>
                <td className="url-cell">
                  <a href={deploy.url} target="_blank" rel="noopener noreferrer">
                    🔗 View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeployList
