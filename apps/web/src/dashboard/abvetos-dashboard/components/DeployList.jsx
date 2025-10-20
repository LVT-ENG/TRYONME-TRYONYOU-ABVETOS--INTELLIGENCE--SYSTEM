import { Zap, GitBranch, Package, Clock, CheckCircle2, XCircle, AlertCircle, Activity } from 'lucide-react'

function DeployList({ deployments }) {
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
    <div className="deploy-list-container">
      <div className="deploy-list-header">
        <div className="header-title">
          <Zap className="header-icon" />
          <h2>Recent Deployments</h2>
        </div>
        <span className="deploy-count">{deployments.length} total</span>
      </div>
      <div className="deploy-list-content">
        {deployments.map((deploy) => (
          <div key={deploy.id} className="deploy-item">
            <div className="deploy-item-content">
              <div className="deploy-item-left">
                <div className="deploy-status-icon">
                  {getStatusIcon(deploy.status)}
                </div>
                <div className="deploy-details">
                  <div className="deploy-title">
                    <h3>{deploy.name}</h3>
                    <span className={`status-badge ${getStatusColor(deploy.status)}`}>
                      {deploy.status}
                    </span>
                  </div>
                  <div className="deploy-meta">
                    <div className="meta-item">
                      <GitBranch className="meta-icon" />
                      <span>{deploy.branch}</span>
                    </div>
                    <div className="meta-item">
                      <Package className="meta-icon" />
                      <code className="commit-hash">{deploy.commit}</code>
                    </div>
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <span>{deploy.duration}</span>
                    </div>
                  </div>
                  <a 
                    href={deploy.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="deploy-link"
                  >
                    {deploy.url}
                  </a>
                </div>
              </div>
              <span className="deploy-timestamp">
                {new Date(deploy.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeployList
