/**
 * API utilities for fetching git commit data
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Fetch git commits from the backend
 * @param {number} limit - Number of commits to fetch (default: 20)
 * @param {string} branch - Specific branch to fetch commits from
 * @returns {Promise<Object>} - Promise resolving to commits data
 */
export async function fetchCommits(limit = 20, branch = null) {
  try {
    const url = new URL(`${API_BASE_URL}/api/commits`);
    url.searchParams.append('limit', limit);
    if (branch) {
      url.searchParams.append('branch', branch);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch commits');
    }

    return data;
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
}

/**
 * Fetch repository statistics
 * @returns {Promise<Object>} - Promise resolving to repository stats
 */
export async function fetchCommitStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/commit-stats`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch commit stats');
    }

    return data;
  } catch (error) {
    console.error('Error fetching commit stats:', error);
    throw error;
  }
}

/**
 * Format date for display
 * @param {string} isoDate - ISO formatted date string
 * @returns {string} - Formatted date string
 */
export function formatCommitDate(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // Handle future dates or very recent commits
  if (diffMins < 1) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
