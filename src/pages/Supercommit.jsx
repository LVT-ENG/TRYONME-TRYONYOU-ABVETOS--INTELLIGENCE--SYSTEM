import React, { useState, useEffect } from 'react';

const Supercommit = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/supercommit');
      const data = await response.json();
      
      if (data.success) {
        setStatus(data);
        setError(null);
      } else {
        setError(data.message || 'Failed to load supercommit status');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading supercommit status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button 
            onClick={fetchStatus}
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            SuperCommit MAX
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {status.description || 'Automated deployment and commit system for TRYONYOU-ABVETOS'}
          </p>
        </div>

        {/* Repository Status Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-t-4 border-indigo-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Repository Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Branch Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700">Current Branch</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{status.status.branch}</p>
            </div>

            {/* Changes Status */}
            <div className={`rounded-xl p-6 border-l-4 ${status.status.has_changes ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-500' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500'}`}>
              <div className="flex items-center gap-3 mb-2">
                <svg className={`w-6 h-6 ${status.status.has_changes ? 'text-amber-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700">Uncommitted Changes</h3>
              </div>
              <p className={`text-2xl font-bold ${status.status.has_changes ? 'text-amber-600' : 'text-green-600'}`}>
                {status.status.uncommitted_changes}
              </p>
              {status.status.has_changes && (
                <p className="text-sm text-gray-600 mt-2">Files modified but not committed</p>
              )}
            </div>
          </div>
        </div>

        {/* Last Commit Card */}
        {status.status.last_commit && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last Commit
            </h2>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600 font-medium">Author</span>
                  <p className="text-lg font-semibold text-gray-800">{status.status.last_commit.author}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 font-medium">Date</span>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(status.status.last_commit.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <span className="text-sm text-gray-600 font-medium">Commit Hash</span>
                <code className="block mt-1 px-3 py-2 bg-white text-purple-600 rounded-lg font-mono text-sm">
                  {status.status.last_commit.hash}
                </code>
              </div>
              <div>
                <span className="text-sm text-gray-600 font-medium">Message</span>
                <p className="mt-1 text-gray-800 font-medium">{status.status.last_commit.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* SuperCommit Scripts Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Available Scripts
            <span className="ml-auto text-lg font-normal text-gray-500">
              {status.total_scripts} script{status.total_scripts !== 1 ? 's' : ''}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {status.scripts.map((script, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {script.exists && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 break-all">
                  {script.name}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Size: {(script.size / 1024).toFixed(2)} KB</p>
                  <p>Modified: {new Date(script.modified * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-2xl font-bold mb-2">About SuperCommit MAX</h3>
              <p className="text-blue-100 leading-relaxed">
                SuperCommit MAX is an automated deployment system that consolidates all TRYONYOU-ABVETOS 
                subsystems into a unified, production-ready platform. It handles git operations, dependency 
                installation, asset management, and automated deployment to Vercel with Telegram notifications.
              </p>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-12 text-center">
          <button
            onClick={fetchStatus}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default Supercommit;
