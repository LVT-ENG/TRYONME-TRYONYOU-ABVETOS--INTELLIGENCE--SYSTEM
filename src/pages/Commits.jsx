import React, { useState, useEffect } from 'react';

const Commits = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/commits');
      const data = await response.json();
      
      if (data.success) {
        setCommits(data.commits);
        setError(null);
      } else {
        setError(data.message || 'Failed to load commits');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommits = commits.filter(commit => 
    commit.message.toLowerCase().includes(filter.toLowerCase()) ||
    commit.author.toLowerCase().includes(filter.toLowerCase()) ||
    commit.hash.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading commits...</p>
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
            onClick={fetchCommits}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Git Commits History
          </h1>
          <p className="text-xl text-gray-600">
            {commits.length} commit{commits.length !== 1 ? 's' : ''} in repository
          </p>
        </div>

        {/* Search Filter */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search commits by message, author, or hash..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-gray-700 text-lg shadow-lg"
            />
            <svg 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Commits List */}
        <div className="space-y-4">
          {filteredCommits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No commits found matching your search.</p>
            </div>
          ) : (
            filteredCommits.map((commit, index) => (
              <div 
                key={commit.hash}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-purple-500 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left side - Commit info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {commit.author.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {commit.message}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {commit.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {commit.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Hash and date */}
                  <div className="flex flex-col items-end gap-2">
                    <code className="px-3 py-1 bg-gray-100 text-purple-600 rounded-lg font-mono text-sm">
                      {commit.hash.substring(0, 8)}
                    </code>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(commit.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-12 text-center">
          <button
            onClick={fetchCommits}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Refresh Commits
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commits;
