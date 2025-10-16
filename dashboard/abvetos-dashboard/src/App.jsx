import { useState, useEffect } from 'react'
import { Activity, GitBranch, Package, Server, Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Database, Cpu, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/button.jsx'
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

  // Simular datos en tiempo real (en producción, esto vendría de APIs reales)
  useEffect(() => {
    const fetchData = async () => {
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setDeployments([
        {
          id: 1,
          name: 'Premium Design Update',
          status: 'success',
          branch: 'main',
          commit: '2be9adb',
          timestamp: new Date().toISOString(),
          duration: '1m 24s',
          url: 'https://tryonyou.app'
        },
        {
          id: 2,
          name: 'Module Optimization',
          status: 'success',
          branch: 'main',
          commit: 'cd82777',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          duration: '1m 18s',
          url: 'https://tryonyou.app'
        }
      ])

      setBuilds([
        {
          id: 1,
          name: 'Build and Deploy',
          status: 'success',
          workflow: 'deploy.yml',
          trigger: 'push',
          duration: '6h 0m 27s'
        },
        {
          id: 2,
          name: 'Clean & Merge',
          status: 'cancelled',
          workflow: 'clean-merge.yml',
          trigger: 'push',
          duration: '5s'
        }
      ])

      setSystemStatus({
        cpu: 23,
        memory: 45,
        requests: 1247,
        uptime: '24h 15m'
      })

      setLoading(false)
    }

    fetchData()

    // Actualizar cada 30 segundos
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
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
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading ABVETOS Dashboard...</p>
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </div>
            </div>
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
            <p className="text-xs text-slate-500 mt-1">Last restart: 1 day ago</p>
          </div>
        </div>

        {/* Deployments Section */}
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

        {/* Builds Section */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-slate-900">GitHub Actions Workflows</h2>
              </div>
              <span className="text-sm text-slate-500">{builds.length} workflows</span>
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
                          {build.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Workflow: <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{build.workflow}</code></span>
                        <span>Trigger: {build.trigger}</span>
                        <span>Duration: {build.duration}</span>
                      </div>
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
            <p>Dashboard v2.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

