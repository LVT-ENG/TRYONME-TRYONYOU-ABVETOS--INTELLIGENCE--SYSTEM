import React from 'react'

const MetricsCard = ({ title, value, icon, trend, status }) => {
  const getStatusClass = () => {
    if (status === 'online') return 'status-online'
    if (status === 'healthy') return 'status-healthy'
    return ''
  }

  const getTrendClass = () => {
    if (trend && trend.startsWith('+')) return 'trend-positive'
    if (trend && trend.startsWith('-')) return 'trend-negative'
    return ''
  }

  return (
    <div className={`metrics-card ${getStatusClass()}`}>
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <div className="card-value">{value}</div>
        {trend && (
          <div className={`card-trend ${getTrendClass()}`}>
            {trend}
          </div>
        )}
        {status && (
          <div className="card-status">
            <span className={`status-indicator ${status}`}></span>
            {status}
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricsCard
