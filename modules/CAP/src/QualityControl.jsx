import React from 'react'

const QualityControl = ({ productId, metrics = {} }) => {
  return (
    <div className="cap-quality-control">
      <h3>Quality Control</h3>
      <div className="quality-metrics">
        <p>Product ID: {productId}</p>
        <p>Quality Score: {metrics.score || 'N/A'}</p>
        <p>Status: {metrics.passed ? 'Passed' : 'Pending'}</p>
      </div>
    </div>
  )
}

export default QualityControl
