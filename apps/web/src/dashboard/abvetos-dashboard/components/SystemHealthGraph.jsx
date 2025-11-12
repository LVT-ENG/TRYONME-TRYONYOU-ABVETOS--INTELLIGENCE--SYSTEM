import MetricsCard from './MetricsCard'

function SystemHealthGraph({ systemStatus }) {
  return (
    <div className="system-health-container">
      <MetricsCard
        type="cpu"
        value={`${systemStatus.cpu}%`}
        label="CPU Usage"
      />
      <MetricsCard
        type="memory"
        value={`${systemStatus.memory}%`}
        label="Memory Usage"
      />
      <MetricsCard
        type="requests"
        value={systemStatus.requests.toLocaleString()}
        label="Total Requests"
        subtitle="+12% from last hour"
      />
      <MetricsCard
        type="uptime"
        value={systemStatus.uptime}
        label="System Uptime"
        subtitle="Since Oct 16, 2025"
      />
    </div>
  )
}

export default SystemHealthGraph
