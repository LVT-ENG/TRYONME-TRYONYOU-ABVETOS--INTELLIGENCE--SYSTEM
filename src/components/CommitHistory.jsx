import React, { useState, useEffect } from 'react';
import { fetchCommits, fetchCommitStats, formatCommitDate } from '../utils/gitApi';

/**
 * CommitHistory Component
 * Displays git commit history with repository statistics
 */
export default function CommitHistory({ limit = 20, showStats = true }) {
  const [commits, setCommits] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch commits
        const commitsData = await fetchCommits(limit);
        setCommits(commitsData.commits || []);

        // Fetch stats if enabled
        if (showStats) {
          const statsData = await fetchCommitStats();
          setStats(statsData.stats || null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [limit, showStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-[#C5A46D] animate-pulse">Loading commits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-300">
        <p className="font-semibold">Error loading commits:</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Repository Statistics */}
      {showStats && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] border border-[#C5A46D]/20 rounded-lg p-4">
            <div className="text-[#C5A46D]/60 text-sm uppercase tracking-wider">Total Commits</div>
            <div className="text-3xl font-bold text-white mt-2">{stats.total_commits}</div>
          </div>
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] border border-[#C5A46D]/20 rounded-lg p-4">
            <div className="text-[#C5A46D]/60 text-sm uppercase tracking-wider">Current Branch</div>
            <div className="text-xl font-semibold text-white mt-2 truncate">{stats.current_branch}</div>
          </div>
          <div className="bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0A] border border-[#C5A46D]/20 rounded-lg p-4">
            <div className="text-[#C5A46D]/60 text-sm uppercase tracking-wider">Contributors</div>
            <div className="text-3xl font-bold text-white mt-2">{stats.contributors}</div>
          </div>
        </div>
      )}

      {/* Commit List */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-[#C5A46D] uppercase tracking-wider">
          Recent Commits
        </h3>
        {commits.length === 0 ? (
          <p className="text-gray-400 italic">No commits found.</p>
        ) : (
          <div className="space-y-2">
            {commits.map((commit) => (
              <div
                key={commit.hash}
                className="bg-gradient-to-r from-[#1A1A2E]/80 to-[#0A0A0A]/80 backdrop-blur-sm border border-[#C5A46D]/10 rounded-lg p-4 hover:border-[#C5A46D]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-[#C5A46D] font-mono text-sm bg-black/30 px-2 py-1 rounded">
                        {commit.short_hash}
                      </code>
                      <span className="text-gray-400 text-sm">
                        {formatCommitDate(commit.date)}
                      </span>
                    </div>
                    <p className="text-white font-medium mb-1">{commit.message}</p>
                    <p className="text-gray-400 text-sm">
                      by <span className="text-[#C5A46D]/80">{commit.author}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
