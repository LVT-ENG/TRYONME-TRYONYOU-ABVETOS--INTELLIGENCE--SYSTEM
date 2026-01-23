import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Activity } from 'lucide-react';
import api from '../utils/api';
import { SYSTEM_CONFIG } from '../config';

/**
 * System Connection Status Page
 * Tests and displays connection status between frontend and backend
 */
function ConnectionStatus() {
  const [status, setStatus] = useState({
    api: { status: 'checking', message: 'Checking...' },
    garments: { status: 'pending', message: 'Waiting...' },
    backend: { status: 'pending', message: 'Waiting...' },
  });

  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    checkConnections();
  }, []);

  const checkConnections = async () => {
    // Check API Health
    try {
      const health = await api.checkHealth();
      setStatus(prev => ({
        ...prev,
        api: { status: 'success', message: health.status || 'Connected' }
      }));

      // Check garments database
      try {
        const garments = await api.listGarments();
        const total = garments.total || (Array.isArray(garments) ? garments.length : 0);
        setStatus(prev => ({
          ...prev,
          garments: { 
            status: 'success', 
            message: `${total} garments loaded` 
          }
        }));
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          garments: { status: 'error', message: error.message }
        }));
      }

      // Get system info
      setSystemInfo({
        frontend: 'React + Vite',
        backend: 'FastAPI',
        connection: 'Vercel Serverless',
        status: 'Synchronized'
      });

      setStatus(prev => ({
        ...prev,
        backend: { status: 'success', message: 'Backend connected' }
      }));

    } catch (error) {
      setStatus(prev => ({
        ...prev,
        api: { status: 'error', message: error.message }
      }));
    }
  };

  const getStatusIcon = (statusType) => {
    switch (statusType) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'checking':
        return <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />;
      default:
        return <Activity className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'success':
        return 'border-green-400/30 bg-green-400/5';
      case 'error':
        return 'border-red-400/30 bg-red-400/5';
      case 'checking':
        return 'border-blue-400/30 bg-blue-400/5';
      default:
        return 'border-gray-400/30 bg-gray-400/5';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 py-6 px-8">
        <motion.h1 
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          System <span className="text-[#C5A46D]">Sintonia</span>
        </motion.h1>
        <p className="text-gray-400 text-sm mt-2">Connection Status & System Health</p>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Connection Status Cards */}
        <div className="grid gap-6 mb-12">
          {Object.entries(status).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl p-6 ${getStatusColor(value.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(value.status)}
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{key}</h3>
                    <p className="text-sm text-gray-400">{value.message}</p>
                  </div>
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase">
                  {value.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Information */}
        {systemInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-[#C5A46D]/20 rounded-2xl p-8 bg-gradient-to-br from-[#C5A46D]/5 to-transparent"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#C5A46D]">System Architecture</h2>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(systemInfo).map(([key, value]) => (
                <div key={key} className="border-l-2 border-[#C5A46D]/30 pl-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{key}</p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={checkConnections}
            className="px-8 py-3 bg-[#C5A46D] text-black font-bold rounded-full hover:bg-[#D4AF37] transition-colors"
          >
            Refresh Status
          </button>
        </motion.div>

        {/* Technical Info */}
        <div className="mt-12 text-center text-xs text-gray-600 font-mono">
          <p>TRYONYOU v{SYSTEM_CONFIG.version} | Patent: {SYSTEM_CONFIG.patent}</p>
          <p className="mt-1">Jules Engine Active | Lafayette Pilot System</p>
        </div>
      </div>
    </div>
  );
}

export default ConnectionStatus;
