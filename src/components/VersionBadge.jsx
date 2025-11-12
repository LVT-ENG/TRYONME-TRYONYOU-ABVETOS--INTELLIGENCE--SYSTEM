import React from 'react'
import '../styles/VersionBadge.css'

const VersionBadge = () => {
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0'
  const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toISOString().split('T')[0]
  const gitHash = import.meta.env.VITE_GIT_HASH || 'dev'

  return (
    <div className="version-badge" title={`Build: ${buildDate} | Commit: ${gitHash}`}>
      <span className="version-label">v</span>
      <span className="version-number">{version}</span>
    </div>
  )
}

export default VersionBadge

