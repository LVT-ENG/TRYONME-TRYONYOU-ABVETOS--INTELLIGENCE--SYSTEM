import React from 'react'

const AvatarRenderer = ({ avatarData }) => {
  return (
    <div className="pau-avatar-renderer">
      <canvas id="pau-3d-canvas" width="800" height="600"></canvas>
    </div>
  )
}

export default AvatarRenderer
