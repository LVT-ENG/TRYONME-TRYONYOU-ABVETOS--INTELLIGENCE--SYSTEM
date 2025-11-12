import React from 'react'

/**
 * Dashboard Link Component
 * Provides access to the ABVETOS Control Panel
 */
const DashboardLink = ({ className = '' }) => {
  return (
    <a
      href="/dashboard/"
      target="_blank"
      rel="noopener noreferrer"
      className={`dashboard-link ${className}`}
      title="ABVETOS Control Panel"
      aria-label="Open ABVETOS Control Panel"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dashboard-icon"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
      <span className="dashboard-text">Dashboard</span>
    </a>
  )
}

export default DashboardLink

