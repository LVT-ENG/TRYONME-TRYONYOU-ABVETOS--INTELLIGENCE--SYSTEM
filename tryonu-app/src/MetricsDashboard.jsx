import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { captureException, trackFashionEvent } from './sentry.js';

const PEACOCK = "#0F5E68";

/**
 * Metrics Dashboard Component for TryOnMe-AVBETOS Intelligence System
 * Displays key performance indicators and system health metrics
 */
const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch health/metrics data
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/health.php');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setMetrics(data);
      setError(null);
      setLastUpdate(new Date());
      
      // Track dashboard view
      trackFashionEvent('dashboard_view', {
        status: data.status,
        response_time: data.total_response_time_ms,
        timestamp: Date.now()
      });
      
    } catch (err) {
      setError(err.message);
      captureException(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  // Status indicator component
  const StatusIndicator = ({ status, label }) => {
    const getColor = () => {
      switch (status) {
        case 'ok': return 'bg-green-500';
        case 'degraded': return 'bg-yellow-500';
        case 'error': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getColor()}`}></div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  };

  // Metric card component
  const MetricCard = ({ title, value, unit, threshold, warning }) => {
    const isWarning = warning && threshold && value > threshold;
    
    return (
      <motion.div 
        className={`bg-white rounded-lg p-4 shadow-md border-l-4 ${
          isWarning ? 'border-red-500' : 'border-green-500'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className={`text-2xl font-bold ${isWarning ? 'text-red-600' : 'text-gray-900'}`}>
            {typeof value === 'number' ? value.toFixed(2) : value}
          </span>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
        {threshold && (
          <div className="text-xs text-gray-400 mt-1">
            Threshold: {threshold}{unit}
          </div>
        )}
      </motion.div>
    );
  };

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading metrics dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchMetrics}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { metrics: data, status, health_checks } = metrics || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: PEACOCK }}>
                AVBETOS Intelligence System
              </h1>
              <p className="text-gray-600 mt-1">Observability Dashboard</p>
            </div>
            <div className="text-right">
              <StatusIndicator status={status} label={`System ${status.toUpperCase()}`} />
              {lastUpdate && (
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Response Time P95"
            value={data?.p95_response_time_ms}
            unit="ms"
            threshold={300}
            warning={true}
          />
          <MetricCard
            title="Error Rate"
            value={data?.error_rate_percent}
            unit="%"
            threshold={1.0}
            warning={true}
          />
          <MetricCard
            title="Active Users"
            value={data?.active_users?.current}
            unit="users"
          />
          <MetricCard
            title="Conversion Rate"
            value={data?.fashion_metrics?.conversion_rate_percent}
            unit="%"
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4" style={{ color: PEACOCK }}>
              Performance Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Current Response Time:</span>
                <span className="font-medium">{data?.response_time_ms}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Memory Usage:</span>
                <span className="font-medium">{data?.memory?.used_mb}MB</span>
              </div>
              {data?.system_load && (
                <div className="flex justify-between">
                  <span>System Load (1min):</span>
                  <span className="font-medium">{data.system_load['1min']}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4" style={{ color: PEACOCK }}>
              Fashion Metrics (24h)
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Products Viewed:</span>
                <span className="font-medium">{data?.fashion_metrics?.products_viewed_24h}</span>
              </div>
              <div className="flex justify-between">
                <span>Try-On Sessions:</span>
                <span className="font-medium">{data?.fashion_metrics?.try_on_sessions_24h}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Session Duration:</span>
                <span className="font-medium">{data?.fashion_metrics?.avg_session_duration_min}min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Checks */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4" style={{ color: PEACOCK }}>
            System Health Checks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(health_checks || {}).map(([check, passed]) => (
              <div key={check} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm capitalize">
                  {check.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchMetrics}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Refreshing...' : 'Refresh Metrics'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;