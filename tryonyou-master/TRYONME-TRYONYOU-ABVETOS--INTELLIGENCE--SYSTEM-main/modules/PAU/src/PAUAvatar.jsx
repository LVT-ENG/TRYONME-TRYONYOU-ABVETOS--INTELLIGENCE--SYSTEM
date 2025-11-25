import React from 'react'

const PAUAvatar = ({ emotion = 'neutral', config = {} }) => {
  return (
    <div className="pau-avatar">
      <div className="pau-avatar-container">
        <h3>PAU Avatar</h3>
        <p>Emotion: {emotion}</p>
        <p>Status: Active</p>
      </div>
    </div>
  )
}

export default PAUAvatar
