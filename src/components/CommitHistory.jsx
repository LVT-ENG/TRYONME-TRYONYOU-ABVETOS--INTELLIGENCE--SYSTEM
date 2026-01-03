import React, { useState, useEffect } from 'react';
import { fetchCommits, fetchCommitStats, formatCommitDate } from '../utils/gitApi';

/**
 * CommitHistory Component
 * Displays git commit history with repository statistics
 */
export default function CommitHistory({ limit = 20, showStats = true }) {
  const [commits, setCommits] = useState([]);
  const [stats, setStats] = useState(null);
  const [commitsLoading, setCommitsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch commits whenever the limit changes
  useEffect(() => {
    let cancelled = false;

    const loadCommits = async () => {
      try {
        setCommitsLoading(true);
        setError(null);

        const commitsData = await fetchCommits(limit);
        if (cancelled) return;
        setCommits(commitsData.commits || []);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
      } finally {
        if (cancelled) return;
        setCommitsLoading(false);
      }
    };

    loadCommits();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  // Fetch stats when stats are enabled or when limit changes (to preserve existing behavior)
  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      if (!showStats) {
        setStats(null);
        setStatsLoading(false);
        return;
      }

      try {
        setStatsLoading(true);
        setError(null);

        const statsData = await fetchCommitStats();
        if (cancelled) return;
        setStats(statsData.stats || null);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
      } finally {
        if (cancelled) return;
        setStatsLoading(false);
      }
    };

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [showStats, limit]);

  if (commitsLoading || statsLoading) {
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
