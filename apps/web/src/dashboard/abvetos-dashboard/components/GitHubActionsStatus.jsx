import { Activity, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

function GitHubActionsStatus({ builds }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="status-icon status-success" />
      case 'failed':
        return <XCircle className="status-icon status-failed" />
      case 'cancelled':
        return <AlertCircle className="status-icon status-cancelled" />
      case 'in_progress':
        return <Activity className="status-icon status-in-progress" />
      default:
        return <Activity className="status-icon status-default" />
    }
  }

  const getStatusColor = (status) => {
    const statusColors = {
      success: 'status-badge-success',
      failed: 'status-badge-failed',
      cancelled: 'status-badge-cancelled',
      in_progress: 'status-badge-in-progress',
      default: 'status-badge-default'
    }
    return statusColors[status] || statusColors.default
  }

  return (
    <div className="github-actions-container">
      <div className="github-actions-header">
        <div className="header-title">
          <Activity className="header-icon" />
          <h2>GitHub Actions Workflows</h2>
        </div>
        <span className="workflow-count">{builds.length} recent runs</span>
      </div>
      <div className="github-actions-content">
        {builds.map((build) => (
          <div key={build.id} className="workflow-item">
            <div className="workflow-item-content">
              <div className="workflow-status-icon">
                {getStatusIcon(build.status)}
              </div>
              <div className="workflow-details">
                <div className="workflow-title">
                  <h3>{build.name}</h3>
                  <span className={`status-badge ${getStatusColor(build.status)}`}>
                    {build.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="workflow-meta">
                  <span>Workflow: <code className="workflow-code">{build.workflow}</code></span>
                  <span>Trigger: {build.trigger}</span>
                  <span>Duration: {build.duration}</span>
                  {build.branch && <span>Branch: {build.branch}</span>}
                  {build.commit && <code className="workflow-code">{build.commit}</code>}
                </div>
                {build.url && (
                  <a 
                    href={build.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="workflow-link"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GitHubActionsStatus
