import React, { useState, useEffect } from 'react'

const GitHubActionsStatus = () => {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading] = useState(true)

  const GITHUB_REPO = 'LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM'

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/actions/runs?per_page=10`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        )

        if (response.ok) {
          const data = await response.json()
          const formattedWorkflows = data.workflow_runs.slice(0, 5).map(run => ({
            id: run.id,
            name: run.name,
            status: run.conclusion === 'success' ? 'success' : 
                    run.conclusion === 'failure' ? 'failed' : 
                    run.status === 'in_progress' ? 'running' : 
                    'queued',
            branch: run.head_branch,
            commit: run.head_sha.substring(0, 7),
            timestamp: run.created_at,
            url: run.html_url
          }))

          setWorkflows(formattedWorkflows)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub Actions:', error)
        // Fallback demo data
        setWorkflows([
          {
            id: 1,
            name: 'Build and Deploy',
            status: 'success',
            branch: 'main',
            commit: 'a3f2b1c',
            timestamp: new Date().toISOString(),
            url: '#'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflows()
    const interval = setInterval(fetchWorkflows, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      success: { icon: '✅', class: 'status-success', text: 'Success' },
      failed: { icon: '❌', class: 'status-failed', text: 'Failed' },
      running: { icon: '⏳', class: 'status-running', text: 'Running' },
      queued: { icon: '⏸️', class: 'status-queued', text: 'Queued' }
    }
    return badges[status] || badges.queued
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
      <div className="github-status">
        <h2>🔄 GitHub Actions</h2>
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div className="github-status">
      <div className="section-header">
        <h2>🔄 GitHub Actions</h2>
        <a 
          href={`https://github.com/${GITHUB_REPO}/actions`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-all-link"
        >
          View All →
        </a>
      </div>
      <div className="workflow-list">
        {workflows.map(workflow => {
          const badge = getStatusBadge(workflow.status)
          return (
            <div key={workflow.id} className="workflow-item">
              <div className="workflow-header">
                <span className={`status-badge ${badge.class}`}>
                  {badge.icon} {badge.text}
                </span>
                <span className="workflow-time">{formatTime(workflow.timestamp)}</span>
              </div>
              <div className="workflow-name">{workflow.name}</div>
              <div className="workflow-meta">
                <span className="branch-tag">{workflow.branch}</span>
                <span className="commit-hash">
                  <code>{workflow.commit}</code>
                </span>
                <a 
                  href={workflow.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="workflow-link"
                >
                  Details →
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GitHubActionsStatus
