import { useState, useEffect } from 'react'
import { Activity, GitBranch, Package, Server, Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Database, Cpu, Zap, RefreshCw } from 'lucide-react'
import './App.css'

function App() {
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

  // Fetch real data from GitHub Actions API
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

      // Extract deployments from successful builds
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
      // Fallback to demo data
      loadDemoData()
    }
  }

  // Format duration between two dates
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

  // Load demo data as fallback
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
      },
      {
        id: 2,
        name: 'Module Optimization',
        status: 'success',
        branch: 'main',
        commit: '7ca8982',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        duration: '1m 18s',
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
      },
      {
        id: 2,
        name: 'Clean & Merge',
        status: 'failed',
        workflow: 'clean-merge.yml',
        trigger: 'push',
        duration: '11s',
        branch: 'main',
        commit: '4d08570'
      }
    ])
  }

  // Simulate system metrics
  const updateSystemMetrics = () => {
    setSystemStatus({
      cpu: Math.floor(Math.random() * 30) + 15, // 15-45%
      memory: Math.floor(Math.random() * 20) + 40, // 40-60%
      requests: Math.floor(Math.random() * 500) + 1000, // 1000-1500
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

  // Initial data load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetchGitHubActions()
      updateSystemMetrics()
      setLastUpdate(new Date())
      setLoading(false)
    }

    fetchData()

    // Auto-refresh every 30 seconds
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'in_progress':
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
      default:
        return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading && !builds.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading ABVETOS Dashboard...</p>
          <p className="text-slate-400 text-sm mt-2">Connecting to GitHub Actions API</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">ABVETOS Dashboard</h1>
                <p className="text-sm text-slate-500">TRYONYOU – Control Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refresh: 30s
            {error && <span className="text-red-500 ml-2">⚠️ Using fallback data</span>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{systemStatus.cpu}%</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600">CPU Usage</h3>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${systemStatus.cpu}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{systemStatus.memory}%</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600">Memory Usage</h3>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${systemStatus.memory}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{systemStatus.requests.toLocaleString()}</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600">Total Requests</h3>
            <p className="text-xs text-green-600 mt-1">+12% from last hour</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{systemStatus.uptime}</span>
            </div>
            <h3 className="text-sm font-medium text-slate-600">System Uptime</h3>
            <p className="text-xs text-slate-500 mt-1">Since Oct 16, 2025</p>
          </div>
        </div>

        {/* Deployments Section */}
        {deployments.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 mb-8">
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Recent Deployments</h2>
                </div>
                <span className="text-sm text-slate-500">{deployments.length} total</span>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {deployments.map((deploy) => (
                <div key={deploy.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        {getStatusIcon(deploy.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-900">{deploy.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(deploy.status)}`}>
                            {deploy.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4" />
                            <span>{deploy.branch}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Package className="w-4 h-4" />
                            <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{deploy.commit}</code>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{deploy.duration}</span>
                          </div>
                        </div>
                        <a href={deploy.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                          {deploy.url}
                        </a>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(deploy.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Builds Section */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-slate-900">GitHub Actions Workflows</h2>
              </div>
              <span className="text-sm text-slate-500">{builds.length} recent runs</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {builds.map((build) => (
              <div key={build.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div>
                      {getStatusIcon(build.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900">{build.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(build.status)}`}>
                          {build.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Workflow: <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{build.workflow}</code></span>
                        <span>Trigger: {build.trigger}</span>
                        <span>Duration: {build.duration}</span>
                        {build.branch && <span>Branch: {build.branch}</span>}
                        {build.commit && <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{build.commit}</code>}
                      </div>
                      {build.url && (
                        <a href={build.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                          View on GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>© 2025 TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</p>
            <div className="flex items-center gap-4">
              <p>Dashboard v2.1.0</p>
              <a href={`https://github.com/${GITHUB_REPO}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

