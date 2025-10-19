import React, { useState } from 'react'

const ProductionQueue = ({ orders = [] }) => {
  const [queue, setQueue] = useState(orders)
  
  return (
    <div className="cap-production-queue">
      <h3>Production Queue</h3>
      <div className="queue-list">
        {queue.length === 0 ? (
          <p>No orders in queue</p>
        ) : (
          queue.map((order, index) => (
            <div key={index} className="queue-item">
              <span>Order #{order.id}</span>
              <span>Status: {order.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductionQueue
