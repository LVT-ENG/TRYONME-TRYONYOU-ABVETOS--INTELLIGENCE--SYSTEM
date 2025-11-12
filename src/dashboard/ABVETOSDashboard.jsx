import React, { useState, useEffect } from 'react'
import './ABVETOSDashboard.css'
import SystemMetrics from './SystemMetrics'
import DeploymentStatus from './DeploymentStatus'
import BuildLogs from './BuildLogs'
import ActiveAgents from './ActiveAgents'
import PerformanceMetrics from './PerformanceMetrics'

const ABVETOSDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple password protection (in production, use proper auth)
    if (password === 'ABVETOS2025' || password === import.meta.env.VITE_DASHBOARD_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('abvetos_auth', 'true')
    } else {
      alert('Invalid password')
    }
  }

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('abvetos_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="dashboard-login">
        <div className="login-container">
          <div className="login-header">
            <h1>🔐 ABVETOS Control Panel</h1>
            <p>Enter password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoFocus
            />
            <button type="submit" className="login-button">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="abvetos-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🤖 ABVETOS Control Panel</h1>
          <p className="subtitle">TRYONYOU Intelligence System</p>
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
          <button 
            className="logout-button"
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem('abvetos_auth')
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-section full-width">
          <SystemMetrics />
        </div>

        <div className="dashboard-section">
          <DeploymentStatus />
        </div>

        <div className="dashboard-section">
          <ActiveAgents />
        </div>

        <div className="dashboard-section">
          <PerformanceMetrics />
        </div>

        <div className="dashboard-section full-width">
          <BuildLogs />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>ABVETOS Intelligence System v1.0.0 | © 2025 TRYONYOU</p>
      </footer>
    </div>
  )
}

export default ABVETOSDashboard

