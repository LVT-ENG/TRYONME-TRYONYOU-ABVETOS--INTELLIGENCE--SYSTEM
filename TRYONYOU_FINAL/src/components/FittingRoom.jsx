import React, { useState } from 'react'

export default function FittingRoom() {
  const [selectedGarment, setSelectedGarment] = useState(null)

  const garments = [
    { id: 1, name: "Classic Blazer", image: "/editorial_01.png", category: "Jackets" },
    { id: 2, name: "Summer Dress", image: "/editorial_02.png", category: "Dresses" },
    { id: 3, name: "Urban Coat", image: "/editorial_03.png", category: "Outerwear" }
  ]

  return (
    <section className="fitting-room-section">
      <div className="container">
        <h2 className="section-title">Virtual Fitting Room</h2>
        <p className="section-subtitle">Try on our latest collections in 3D</p>
        
        <div className="fitting-room-grid">
          <div className="avatar-viewer">
            <div className="avatar-placeholder">
              <img 
                src="/C029C34A-34F2-4656-925A-6AF757CC2C84.png" 
                alt="Your Avatar" 
                className="avatar-image"
              />
              {selectedGarment && (
                <div className="garment-overlay">
                  <p className="garment-name">{selectedGarment.name}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="garment-selector">
            <h3 className="selector-title">Select a Garment</h3>
            <div className="garments-list">
              {garments.map((garment) => (
                <div 
                  key={garment.id}
                  className={`garment-item ${selectedGarment?.id === garment.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGarment(garment)}
                >
                  <img src={garment.image} alt={garment.name} className="garment-thumb" />
                  <div className="garment-info">
                    <h4>{garment.name}</h4>
                    <p>{garment.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-try-on">Try On Selected</button>
          </div>
        </div>
      </div>
    </section>
  )
}
