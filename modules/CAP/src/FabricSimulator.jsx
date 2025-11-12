import React from 'react'

const FabricSimulator = ({ pattern, fabricType = 'cotton' }) => {
  return (
    <div className="cap-fabric-simulator">
      <h3>Fabric Simulator</h3>
      <div className="fabric-preview">
        <p>Fabric Type: {fabricType}</p>
        <p>Simulation: Active</p>
        <canvas id="fabric-canvas" width="400" height="400"></canvas>
      </div>
    </div>
  )
}

export default FabricSimulator
