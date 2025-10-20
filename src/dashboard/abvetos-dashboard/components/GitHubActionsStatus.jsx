import React, { useState, useEffect } from 'react'

const GitHubActionsStatus = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Build and Deploy',
      status: 'success',
      branch: 'main',
      lastRun: new Date().toISOString(),
      duration: '2m 34s'
    },
    {
      id: 2,
      name: 'Dashboard Sync',
      status: 'success',
      branch: 'main',
      lastRun: new Date(Date.now() - 1800000).toISOString(),
      duration: '1m 12s'
    },
    {
      id: 3,
      name: 'Agent Orchestrator',
      status: 'success',
      branch: 'main',
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      duration: '45s'
    },
    {
      id: 4,
      name: 'Brand Guardian',
      status: 'success',
      branch: 'main',
      lastRun: new Date(Date.now() - 7200000).toISOString(),
      duration: '1m 5s'
    }
  ])

  const getStatusBadge = (status) => {
    const badges = {
      success: { icon: '✅', class: 'status-success', text: 'Passing' },
      pending: { icon: '🔄', class: 'status-pending', text: 'Running' },
      failed: { icon: '❌', class: 'status-failed', text: 'Failed' },
      cancelled: { icon: '⚪', class: 'status-cancelled', text: 'Cancelled' }
    }
    return badges[status] || badges.success
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="github-actions-container">
      <h2>⚙️ GitHub Actions</h2>
      <div className="workflows-list">
        {workflows.map((workflow) => {
          const badge = getStatusBadge(workflow.status)
          return (
            <div key={workflow.id} className="workflow-item">
              <div className="workflow-header">
                <span className="workflow-name">{workflow.name}</span>
                <span className={`workflow-badge ${badge.class}`}>
                  {badge.icon} {badge.text}
                </span>
              </div>
              <div className="workflow-details">
                <span className="workflow-branch">🌿 {workflow.branch}</span>
                <span className="workflow-time">⏱️ {workflow.duration}</span>
                <span className="workflow-lastrun">⏰ {formatTime(workflow.lastRun)}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="github-actions-footer">
        <a 
          href="https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View all workflows on GitHub →
        </a>
      </div>
    </div>
  )
}

export default GitHubActionsStatus
