import React, { useState, useEffect } from 'react'

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const fetchMetrics = () => {
    // Mock performance metrics - in production, fetch from Lighthouse CI or similar
    const mockMetrics = {
      performance: 92,
      accessibility: 98,
      bestPractices: 95,
      seo: 100,
      pwa: 85,
      loadTime: 1.2,
      fcp: 0.8,
      lcp: 1.5,
      cls: 0.05,
      tti: 2.1,
      bundleSize: 18.2,
      requests: 24,
      cacheHitRate: 87
    }
    
    setMetrics(mockMetrics)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#00ff88'
    if (score >= 70) return '#ffd700'
    return '#ff4444'
  }

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  if (!metrics) {
    return (
      <div className="section-card">
        <h2>📊 Performance Metrics</h2>
        <div className="loading-state">Loading metrics...</div>
      </div>
    )
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>📊 Performance Metrics</h2>
        <span className="metrics-timestamp">Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Performance</span>
            <span 
              className="metric-grade"
              style={{ color: getScoreColor(metrics.performance) }}
            >
              {getScoreGrade(metrics.performance)}
            </span>
          </div>
          <div className="metric-value" style={{ color: getScoreColor(metrics.performance) }}>
            {metrics.performance}
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill" 
              style={{ 
                width: `${metrics.performance}%`,
                backgroundColor: getScoreColor(metrics.performance)
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Accessibility</span>
            <span 
              className="metric-grade"
              style={{ color: getScoreColor(metrics.accessibility) }}
            >
              {getScoreGrade(metrics.accessibility)}
            </span>
          </div>
          <div className="metric-value" style={{ color: getScoreColor(metrics.accessibility) }}>
            {metrics.accessibility}
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill" 
              style={{ 
                width: `${metrics.accessibility}%`,
                backgroundColor: getScoreColor(metrics.accessibility)
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Best Practices</span>
            <span 
              className="metric-grade"
              style={{ color: getScoreColor(metrics.bestPractices) }}
            >
              {getScoreGrade(metrics.bestPractices)}
            </span>
          </div>
          <div className="metric-value" style={{ color: getScoreColor(metrics.bestPractices) }}>
            {metrics.bestPractices}
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill" 
              style={{ 
                width: `${metrics.bestPractices}%`,
                backgroundColor: getScoreColor(metrics.bestPractices)
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">SEO</span>
            <span 
              className="metric-grade"
              style={{ color: getScoreColor(metrics.seo) }}
            >
              {getScoreGrade(metrics.seo)}
            </span>
          </div>
          <div className="metric-value" style={{ color: getScoreColor(metrics.seo) }}>
            {metrics.seo}
          </div>
          <div className="metric-bar">
            <div 
              className="metric-bar-fill" 
              style={{ 
                width: `${metrics.seo}%`,
                backgroundColor: getScoreColor(metrics.seo)
              }}
            />
          </div>
        </div>
      </div>

      <div className="core-web-vitals">
        <h3>Core Web Vitals</h3>
        <div className="vitals-grid">
          <div className="vital-item">
            <span className="vital-label">FCP</span>
            <span className="vital-value">{metrics.fcp}s</span>
          </div>
          <div className="vital-item">
            <span className="vital-label">LCP</span>
            <span className="vital-value">{metrics.lcp}s</span>
          </div>
          <div className="vital-item">
            <span className="vital-label">CLS</span>
            <span className="vital-value">{metrics.cls}</span>
          </div>
          <div className="vital-item">
            <span className="vital-label">TTI</span>
            <span className="vital-value">{metrics.tti}s</span>
          </div>
        </div>
      </div>

      <div className="additional-metrics">
        <div className="metric-row">
          <span className="metric-label">Bundle Size:</span>
          <span className="metric-value">{metrics.bundleSize} MB</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">HTTP Requests:</span>
          <span className="metric-value">{metrics.requests}</span>
        </div>
        <div className="metric-row">
          <span className="metric-label">Cache Hit Rate:</span>
          <span className="metric-value">{metrics.cacheHitRate}%</span>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMetrics

