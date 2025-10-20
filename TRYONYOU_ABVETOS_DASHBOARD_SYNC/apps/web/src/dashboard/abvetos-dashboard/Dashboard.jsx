import React, { useState, useEffect } from 'react'
import MetricsCard from './components/MetricsCard'
import DeployList from './components/DeployList'
import GitHubActionsStatus from './components/GitHubActionsStatus'
import SystemHealthGraph from './components/SystemHealthGraph'
import './styles/dashboard.css'

const Dashboard = () => {
  const [deployments, setDeployments] = useState([])
  const [metrics, setMetrics] = useState({
    totalDeployments: 0,
    successRate: 100,
    avgDeployTime: '2m 15s',
    lastDeployment: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      // In production, this would fetch from GitHub API or backend
      // For now, we'll simulate with mock data
      
      // Try to fetch deployment history from logs
      const mockDeployments = [
        {
          id: 1,
          timestamp: new Date().toISOString(),
          commit: 'abc123f',
          branch: 'main',
          author: 'LVT-ENG',
          message: 'Update ABVETOS Dashboard components',
          url: 'https://tryonyou.app',
          status: 'success',
          duration: '2m 15s'
        }
      ]

      setDeployments(mockDeployments)
      
      // Calculate metrics
      const total = mockDeployments.length
      const successful = mockDeployments.filter(d => d.status === 'success').length
      const successRate = total > 0 ? Math.round((successful / total) * 100) : 100
      
      setMetrics({
        totalDeployments: total,
        successRate: successRate,
        avgDeployTime: '2m 15s',
        lastDeployment: mockDeployments[0]?.timestamp || null
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading ABVETOS Dashboard...</p>
      </div>
    )
  }

  return (
    <div className="abvetos-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🤖 ABVETOS Dashboard</h1>
          <p className="subtitle">TRYONYOU Intelligence System - Deploy Express</p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchDashboardData}>
            🔄 Refresh
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Metrics Overview */}
        <section className="metrics-section">
          <h2>📊 Metrics Overview</h2>
          <div className="metrics-grid">
            <MetricsCard
              title="Total Deployments"
              value={metrics.totalDeployments}
              icon="🚀"
              trend="+12%"
            />
            <MetricsCard
              title="Success Rate"
              value={`${metrics.successRate}%`}
              icon="✅"
              trend="+2%"
            />
            <MetricsCard
              title="Avg Deploy Time"
              value={metrics.avgDeployTime}
              icon="⏱️"
              trend="-15%"
            />
            <MetricsCard
              title="Last Deployment"
              value={metrics.lastDeployment ? new Date(metrics.lastDeployment).toLocaleString() : 'N/A'}
              icon="📅"
              trend="now"
            />
          </div>
        </section>

        {/* Deployment History */}
        <section className="deployments-section">
          <h2>📦 Recent Deployments</h2>
          <DeployList deployments={deployments} />
        </section>

        {/* GitHub Actions Status */}
        <section className="actions-section">
          <h2>⚙️ GitHub Actions Status</h2>
          <GitHubActionsStatus />
        </section>

        {/* System Health */}
        <section className="health-section">
          <h2>💚 System Health</h2>
          <SystemHealthGraph />
        </section>
      </div>

      <footer className="dashboard-footer">
        <p>ABVETOS Intelligence System v1.0.0 | © 2025 TRYONYOU.APP</p>
        <p className="footer-note">Sistema de Inteligencia Operativo 24/7</p>
      </footer>
    </div>
  )
}

export default Dashboard
