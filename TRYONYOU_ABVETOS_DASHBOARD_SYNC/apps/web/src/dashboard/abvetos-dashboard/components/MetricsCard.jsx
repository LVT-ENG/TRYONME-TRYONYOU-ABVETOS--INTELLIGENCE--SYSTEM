import React from 'react'

const MetricsCard = ({ title, value, icon, trend }) => {
  const isPositiveTrend = trend?.startsWith('+') || trend === 'now'
  const trendClass = isPositiveTrend ? 'trend-positive' : 'trend-negative'

  return (
    <div className="metrics-card">
      <div className="metrics-icon">{icon}</div>
      <div className="metrics-content">
        <h3 className="metrics-title">{title}</h3>
        <div className="metrics-value">{value}</div>
        {trend && (
          <div className={`metrics-trend ${trendClass}`}>
            {trend !== 'now' ? `${trend} from last month` : 'Just now'}
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricsCard
