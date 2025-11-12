import { Cpu, Database, TrendingUp, Clock } from 'lucide-react'

function MetricsCard({ type, value, label, subtitle }) {
  const getIcon = () => {
    switch (type) {
      case 'cpu':
        return { Icon: Cpu, color: 'blue' }
      case 'memory':
        return { Icon: Database, color: 'purple' }
      case 'requests':
        return { Icon: TrendingUp, color: 'green' }
      case 'uptime':
        return { Icon: Clock, color: 'orange' }
      default:
        return { Icon: Cpu, color: 'blue' }
    }
  }

  const { Icon, color } = getIcon()

  return (
    <div className="metrics-card">
      <div className="metrics-header">
        <div className={`metrics-icon metrics-icon-${color}`}>
          <Icon className="icon" />
        </div>
        <span className="metrics-value">{value}</span>
      </div>
      <h3 className="metrics-label">{label}</h3>
      {type === 'cpu' || type === 'memory' ? (
        <div className="progress-bar">
          <div 
            className={`progress-fill progress-fill-${color}`}
            style={{ width: `${value.replace('%', '')}%` }}
          ></div>
        </div>
      ) : (
        <p className="metrics-subtitle">{subtitle}</p>
      )}
    </div>
  )
}

export default MetricsCard
