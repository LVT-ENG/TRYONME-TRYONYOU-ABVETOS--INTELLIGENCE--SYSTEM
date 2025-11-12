import React, { useState, useEffect } from 'react'

/**
 * Enhanced Version Badge Component
 * Displays current version, build date, and deployment info
 */
const VersionBadgeEnhanced = ({ position = 'bottom-right', showDetails = false }) => {
  const [version, setVersion] = useState('loading...')
  const [buildInfo, setBuildInfo] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Try to load version from multiple sources
    const loadVersion = async () => {
      try {
        // Method 1: Import from version.js if it exists
        const versionModule = await import('../version.js').catch(() => null)
        
        if (versionModule) {
          setVersion(versionModule.VERSION)
          setBuildInfo({
            date: versionModule.BUILD_DATE,
            timestamp: versionModule.BUILD_TIMESTAMP
          })
        } else {
          // Method 2: Get from package.json via env variable
          const envVersion = import.meta.env.VITE_APP_VERSION
          const envHash = import.meta.env.VITE_GIT_HASH
          const envDate = import.meta.env.VITE_BUILD_DATE
          
          if (envVersion) {
            setVersion(envVersion)
            setBuildInfo({
              hash: envHash,
              date: envDate
            })
          } else {
            // Method 3: Fallback to package.json version
            setVersion('1.0.0')
          }
        }
      } catch (error) {
        console.error('Error loading version:', error)
        setVersion('unknown')
      }
    }

    loadVersion()
  }, [])

  const positionStyles = {
    'bottom-right': { bottom: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'top-left': { top: '1rem', left: '1rem' },
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: '0.75rem',
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#00ff00',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          transition: 'all 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)'
          e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
          e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#00ff00' }}>v{version}</span>
          {buildInfo?.hash && (
            <span style={{ color: '#888', fontSize: '0.7rem' }}>
              #{buildInfo.hash}
            </span>
          )}
        </div>
        
        {(expanded || showDetails) && buildInfo && (
          <div
            style={{
              marginTop: '0.5rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(0, 255, 0, 0.2)',
              fontSize: '0.7rem',
              color: '#aaa',
            }}
          >
            <div>Built: {formatDate(buildInfo.date)}</div>
            {buildInfo.timestamp && (
              <div style={{ marginTop: '0.25rem' }}>
                {new Date(buildInfo.timestamp).toLocaleTimeString()}
              </div>
            )}
            <div style={{ marginTop: '0.25rem', color: '#00ff00' }}>
              TRYONYOU-ABVETOS-ULTRA-PLUS
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VersionBadgeEnhanced

