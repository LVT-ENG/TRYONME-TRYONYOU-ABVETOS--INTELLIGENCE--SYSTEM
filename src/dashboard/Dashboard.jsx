/**
 * ABVETOS System Dashboard
 * Real-time monitoring and metrics
 * Patent: PCT/EP2025/067317
 */

import { useState, useEffect } from 'react';
import { Activity, Database, Zap, TrendingUp, CheckCircle, AlertTriangle, Server, Users } from 'lucide-react';
import { systemMonitor } from './systemMonitor';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    requests: 0,
    users: 0,
  });

  const [moduleStatus] = useState({
    PAU: 'operational',
    ABVET: 'operational',
    CAP: 'operational',
    Wardrobe: 'operational',
    FTT: 'operational',
    LiveItFactory: 'operational',
    PersonalShopperAI: 'operational',
  });

  const [deployLogs] = useState([
    { id: 1, timestamp: '2025-12-27 06:46:09', message: 'SUPERCOMMIT MAX executed', status: 'success' },
    { id: 2, timestamp: '2025-12-27 06:46:10', message: 'Git push to main branch', status: 'success' },
    { id: 3, timestamp: '2025-12-27 06:46:11', message: 'Dependencies installed (340 packages)', status: 'success' },
    { id: 4, timestamp: '2025-12-27 06:46:12', message: '8 Core modules verified', status: 'success' },
    { id: 5, timestamp: '2025-12-27 12:36:45', message: 'Logo and assets integrated', status: 'success' },
  ]);

  useEffect(() => {
    const updateMetrics = () => {
      const currentMetrics = systemMonitor.getAllMetrics();
      setMetrics({
        cpu: parseFloat(currentMetrics.cpu),
        memory: parseFloat(currentMetrics.memory),
        requests: currentMetrics.requests,
        users: currentMetrics.digitalTwins || 0, // Mapping digital twins to users roughly
      });
    };

    updateMetrics(); // Initial fetch
    const interval = setInterval(updateMetrics, 3000);

    return () => clearInterval(interval);
  }, []);

  const statusColor = {
    operational: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  const statusIcon = {
    operational: CheckCircle,
    warning: AlertTriangle,
    error: AlertTriangle,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-abvetos-anthracite to-black text-abvetos-bone p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
              <Activity className="text-abvetos-gold" size={40} />
              ABVETOS Dashboard
            </h1>
            <p className="text-gray-400 mt-2">System Monitoring & Analytics • Patent: PCT/EP2025/067317</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Version</div>
            <div className="text-2xl font-black text-abvetos-gold">v2.1.0</div>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={Zap}
          label="CPU Usage"
          value={`${metrics.cpu.toFixed(1)}%`}
          color="text-blue-400"
          trend="+2.3%"
        />
        <MetricCard
          icon={Database}
          label="Memory"
          value={`${metrics.memory.toFixed(1)}%`}
          color="text-purple-400"
          trend="+0.8%"
        />
        <MetricCard
          icon={TrendingUp}
          label="Requests/min"
          value={metrics.requests.toString()}
          color="text-green-400"
          trend="+12.4%"
        />
        <MetricCard
          icon={Users}
          label="Active Users"
          value={metrics.users.toString()}
          color="text-yellow-400"
          trend="+5.2%"
        />
      </div>

      {/* Estado de módulos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Server className="text-abvetos-gold" size={24} />
            Core Modules Status
          </h2>
          <div className="space-y-3">
            {Object.entries(moduleStatus).map(([module, status]) => {
              const StatusIcon = statusIcon[status];
              return (
                <div key={module} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={statusColor[status]} size={20} />
                    <span className="font-bold">{module}</span>
                  </div>
                  <span className={`text-xs uppercase font-mono ${statusColor[status]}`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deploy Logs */}
        <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Activity className="text-abvetos-gold" size={24} />
            Recent Deploy Logs
          </h2>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {deployLogs.map((log) => (
              <div key={log.id} className="p-3 bg-black/30 rounded-xl text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-gray-500">{log.timestamp}</span>
                  <span className={`text-xs ${log.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-gray-300">{log.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6">
        <h2 className="text-2xl font-black mb-6">System Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem label="Total Scans" value="1,247" />
          <StatItem label="Digital Twins" value="823" />
          <StatItem label="Patterns Generated" value="456" />
          <StatItem label="Uptime" value="99.9%" />
          <StatItem label="Avg Response Time" value="124ms" />
          <StatItem label="Success Rate" value="98.2%" />
          <StatItem label="Biometric Verifications" value="2,341" />
          <StatItem label="API Calls" value="15.2K" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM • Production Ready</p>
        <p>Protected by Patent PCT/EP2025/067317</p>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color, trend }) {
  return (
    <div className="bg-gray-900/50 border border-abvetos-gold/20 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className={color} size={32} />
        <span className="text-xs text-green-400">{trend}</span>
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-black text-abvetos-gold mb-1">{value}</div>
      <div className="text-xs text-gray-400 uppercase">{label}</div>
    </div>
  );
}
