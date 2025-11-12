import { useState, useEffect } from 'react'
import { Activity, Server, RefreshCw } from 'lucide-react'
import MetricsCard from './components/MetricsCard'
import DeployList from './components/DeployList'
import GitHubActionsStatus from './components/GitHubActionsStatus'
import SystemHealthGraph from './components/SystemHealthGraph'
import './styles/dashboard.css'

function Dashboard() {
  const [deployments, setDeployments] = useState([])
  const [builds, setBuilds] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    cpu: 0,
    memory: 0,
    requests: 0,
    uptime: '0h 0m'
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [error, setError] = useState(null)

  const GITHUB_REPO = 'LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM'
  const PRODUCTION_URL = 'https://tryonyou.app'

  const fetchGitHubActions = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/actions/runs?per_page=10`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub Actions data')
      }

      const data = await response.json()
      
      const formattedBuilds = data.workflow_runs.slice(0, 5).map(run => ({
        id: run.id,
        name: run.name,
        status: run.conclusion === 'success' ? 'success' : 
                run.conclusion === 'failure' ? 'failed' : 
                run.conclusion === 'cancelled' ? 'cancelled' : 
                'in_progress',
        workflow: run.path.split('/').pop(),
        trigger: run.event,
        duration: formatDuration(run.created_at, run.updated_at),
        branch: run.head_branch,
        commit: run.head_sha.substring(0, 7),
        timestamp: run.created_at,
        url: run.html_url
      }))

      setBuilds(formattedBuilds)

      const successfulDeployments = formattedBuilds
        .filter(build => build.status === 'success' && build.name.includes('Deploy'))
        .map(build => ({
          id: build.id,
          name: build.name,
          status: build.status,
          branch: build.branch,
          commit: build.commit,
          timestamp: build.timestamp,
          duration: build.duration,
          url: PRODUCTION_URL
        }))

      setDeployments(successfulDeployments)
      setError(null)
    } catch (err) {
      console.error('Error fetching GitHub data:', err)
      setError(err.message)
      loadDemoData()
    }
  }

  const formatDuration = (start, end) => {
    const startTime = new Date(start)
    const endTime = new Date(end)
    const diff = Math.abs(endTime - startTime)
    
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
    if (minutes > 0) return `${minutes}m ${seconds}s`
    return `${seconds}s`
  }

  const loadDemoData = () => {
    setDeployments([
      {
        id: 1,
        name: 'Premium Design Update',
        status: 'success',
        branch: 'main',
        commit: '4d08570',
        timestamp: new Date().toISOString(),
        duration: '1m 24s',
        url: PRODUCTION_URL
      }
    ])

    setBuilds([
      {
        id: 1,
        name: 'Build and Deploy',
        status: 'in_progress',
        workflow: 'deploy.yml',
        trigger: 'push',
        duration: '51s',
        branch: 'main',
        commit: '4d08570'
      }
    ])
  }

  const updateSystemMetrics = () => {
    setSystemStatus({
      cpu: Math.floor(Math.random() * 30) + 15,
      memory: Math.floor(Math.random() * 20) + 40,
      requests: Math.floor(Math.random() * 500) + 1000,
      uptime: calculateUptime()
    })
  }

  const calculateUptime = () => {
    const now = new Date()
    const start = new Date('2025-10-16T00:00:00Z')
    const diff = now - start
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return `${hours}h ${minutes}m`
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetchGitHubActions()
      updateSystemMetrics()
      setLastUpdate(new Date())
      setLoading(false)
    }

    fetchData()

    const interval = setInterval(() => {
      fetchGitHubActions()
      updateSystemMetrics()
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleManualRefresh = () => {
    setLoading(true)
    fetchGitHubActions()
    updateSystemMetrics()
    setLastUpdate(new Date())
    setTimeout(() => setLoading(false), 500)
  }

  if (loading && !builds.length) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <Activity className="loading-spinner" />
          <p className="loading-text">Loading ABVETOS Dashboard...</p>
          <p className="loading-subtext">Connecting to GitHub Actions API</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">
              <Server className="icon" />
            </div>
            <div className="header-title">
              <h1>ABVETOS Dashboard</h1>
              <p className="subtitle">TRYONYOU – Control Center</p>
            </div>
          </div>
          <div className="header-right">
            <button
              onClick={handleManualRefresh}
              disabled={loading}
              className="refresh-button"
            >
              <RefreshCw className={`refresh-icon ${loading ? 'spinning' : ''}`} />
              Refresh
            </button>
            <div className="live-indicator">
              <div className="live-dot"></div>
              Live
            </div>
          </div>
        </div>
        <div className="header-info">
          Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refresh: 30s
          {error && <span className="error-indicator">⚠️ Using fallback data</span>}
        </div>
      </header>

      <main className="dashboard-main">
        <SystemHealthGraph systemStatus={systemStatus} />
        
        {deployments.length > 0 && (
          <DeployList deployments={deployments} />
        )}
        
        <GitHubActionsStatus builds={builds} />
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>© 2025 TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</p>
          <div className="footer-links">
            <p>Dashboard v2.1.0</p>
            <a href={`https://github.com/${GITHUB_REPO}`} target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
