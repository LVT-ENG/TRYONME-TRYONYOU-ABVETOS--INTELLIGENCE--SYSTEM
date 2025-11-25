import React from 'react'

const EmotionalWardrobe = ({ emotion, items = [] }) => {
  return (
    <div className="pau-emotional-wardrobe">
      <h4>Wardrobe for {emotion}</h4>
      <div className="wardrobe-items">
        {items.length === 0 ? (
          <p>No items available</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="wardrobe-item">
              {item.name}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EmotionalWardrobe
