import React, { useState, useEffect } from 'react'
import MetricsCard from './components/MetricsCard'
import DeployList from './components/DeployList'
import GitHubActionsStatus from './components/GitHubActionsStatus'
import SystemHealthGraph from './components/SystemHealthGraph'
import './styles/dashboard.css'

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemMetrics, setSystemMetrics] = useState({
    deployments: 0,
    activeAgents: 0,
    builds: 0,
    uptime: '99.9%'
  })

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Fetch system metrics
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics')
        if (response.ok) {
          const data = await response.json()
          setSystemMetrics(data)
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Update every 30s

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="abvetos-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🤖 ABVETOS Control Panel</h1>
          <p className="subtitle">TRYONYOU Intelligence System - Real-time Monitoring</p>
        </div>
        <div className="header-right">
          <div className="current-time">
            {currentTime.toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </header>

      <div className="metrics-grid">
        <MetricsCard 
          title="Total Deployments"
          value={systemMetrics.deployments}
          icon="🚀"
          trend="+12%"
        />
        <MetricsCard 
          title="Active Agents"
          value={systemMetrics.activeAgents}
          icon="🤖"
          status="online"
        />
        <MetricsCard 
          title="Builds Today"
          value={systemMetrics.builds}
          icon="📦"
          trend="+5%"
        />
        <MetricsCard 
          title="System Uptime"
          value={systemMetrics.uptime}
          icon="⚡"
          status="healthy"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <GitHubActionsStatus />
        </div>

        <div className="dashboard-section">
          <SystemHealthGraph />
        </div>

        <div className="dashboard-section full-width">
          <DeployList />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>ABVETOS Intelligence System v1.0.0 | © 2025 TRYONYOU | Auto-Deploy Enabled</p>
      </footer>
    </div>
  )
}

export default Dashboard
