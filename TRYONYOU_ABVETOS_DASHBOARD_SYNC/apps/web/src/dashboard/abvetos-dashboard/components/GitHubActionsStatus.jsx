import React, { useState, useEffect } from 'react'

const GitHubActionsStatus = () => {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkflowStatus()
    const interval = setInterval(fetchWorkflowStatus, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const fetchWorkflowStatus = async () => {
    try {
      // Mock workflow data
      // In production, this would fetch from GitHub Actions API
      const mockWorkflows = [
        {
          id: 1,
          name: 'ABVETOS Dashboard Deploy',
          status: 'success',
          lastRun: new Date().toISOString(),
          duration: '2m 15s',
          conclusion: 'success'
        },
        {
          id: 2,
          name: 'Vercel Token Refresh',
          status: 'success',
          lastRun: new Date(Date.now() - 3600000).toISOString(),
          duration: '45s',
          conclusion: 'success'
        },
        {
          id: 3,
          name: 'Build and Deploy',
          status: 'success',
          lastRun: new Date(Date.now() - 7200000).toISOString(),
          duration: '3m 42s',
          conclusion: 'success'
        }
      ]

      setWorkflows(mockWorkflows)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching workflow status:', error)
      setLoading(false)
    }
  }

  const getStatusIcon = (conclusion) => {
    switch (conclusion) {
      case 'success':
        return '✅'
      case 'failure':
        return '❌'
      case 'cancelled':
        return '⏸️'
      case 'running':
        return '🔄'
      default:
        return '⚪'
    }
  }

  const getStatusClass = (conclusion) => {
    return `workflow-status status-${conclusion}`
  }

  if (loading) {
    return (
      <div className="github-actions-loading">
        <div className="loading-spinner-small"></div>
        <p>Loading workflows...</p>
      </div>
    )
  }

  return (
    <div className="github-actions-status">
      {workflows.length === 0 ? (
        <div className="no-workflows">
          <p>No workflows found</p>
        </div>
      ) : (
        <div className="workflows-list">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="workflow-item">
              <div className="workflow-header">
                <span className="workflow-name">{workflow.name}</span>
                <span className={getStatusClass(workflow.conclusion)}>
                  {getStatusIcon(workflow.conclusion)} {workflow.conclusion}
                </span>
              </div>
              <div className="workflow-details">
                <span className="workflow-detail">
                  ⏱️ {workflow.duration}
                </span>
                <span className="workflow-detail">
                  🕐 {new Date(workflow.lastRun).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GitHubActionsStatus
