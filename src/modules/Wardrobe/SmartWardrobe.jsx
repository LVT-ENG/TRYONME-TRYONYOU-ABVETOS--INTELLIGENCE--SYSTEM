import React, { useState } from 'react'
import AutoFit from './CoreComponents/AutoFit'
import IntelligentClassification from './CoreComponents/IntelligentClassification'
import CompatibilitySystem from './CoreComponents/CompatibilitySystem'
import Avatar3DProjection from './CoreComponents/Avatar3DProjection'
import GarmentProblemDetection from './CoreComponents/GarmentProblemDetection'
import CompleteLookRecommendation from './CoreComponents/CompleteLookRecommendation'
import AutoDonateSolidaryWardrobe from './CoreComponents/AutoDonateSolidaryWardrobe'
import IntelligentPurchasePlan from './CoreComponents/IntelligentPurchasePlan'
import OnDemandProduction from './CoreComponents/OnDemandProduction'
import ABVETConnection from './CoreComponents/ABVETConnection'
import DynamicTrendManagement from './CoreComponents/DynamicTrendManagement'
import EventForecasting from './CoreComponents/EventForecasting'
import MoodSynchronization from './CoreComponents/MoodSynchronization'
import DuplicateGarmentDetection from './CoreComponents/DuplicateGarmentDetection'
import StyleHistoryEvolution from './CoreComponents/StyleHistoryEvolution'
import '../../styles/SmartWardrobeIntegration.css'

/**
 * SmartWardrobe - Intelligent Wardrobe TRYONYOU
 * Integrates garment management, outfit recommendations, and solidarity wardrobe
 * With Pau assistant for intelligent organization
 */

const SmartWardrobe = () => {
      const [watchStatus, setWatchStatus] = useState('Disconnected');
  const [activeTab, setActiveTab] = useState('inventory')
  const [showPau, setShowPau] = useState(false)

      // SmartWatch 2 Logic (V2.0)
      const handleConnectWatch = () => {
        setWatchStatus('Connecting...');
        // Simulación de conexión BLE/Bluetooth
        setTimeout(() => {
          setWatchStatus('Connected');
          console.log('SmartWatch 2 Connected');
        }, 1500);
      };

      const simulateCoreModules = () => {
        console.log('--- Core Modules Simulation Started ---');
        // 1. SolidaryWardrobe: Lógica para sugerir prendas tras la sincronización
        console.log('SolidaryWardrobe Agent: Suggesting garments for donation based on SmartWatch 2 data...');
        // Simulación: 2 prendas sugeridas para donación
        const newDonationItems = [
          { id: 201, name: 'Running Shoes', brand: 'TRYONYOU Sport', reason: 'High wear detected (SmartWatch 2)', donationValue: '€30' },
          { id: 202, name: 'Wool Sweater', brand: 'TRYONYOU Winter', reason: 'Unused for 3 seasons (SmartWatch 2)', donationValue: '€50' }
        ];
        // En un entorno real, esto actualizaría el estado global o llamaría a una API.
        // Aquí, solo lo registramos en la consola.
        console.log(`SolidaryWardrobe Agent: ${newDonationItems.length} new items suggested for donation.`);

        // 2. Rechazo Visual Automático: Lógica para filtrar prendas por desgaste simulado
        console.log('Automatic Visual Rejection: Filtering garments for auto-donation due to simulated wear...');
        // Simulación: 1 prenda marcada para auto-donación
        const autoRejectedItem = { id: 301, name: 'Casual Jacket', brand: 'TRYONYOU Daily', reason: 'Simulated wear level 9/10', action: 'Auto-Donation' };
        console.log(`Automatic Visual Rejection: Item '${autoRejectedItem.name}' marked for ${autoRejectedItem.action}.`);
        
        console.log('--- Core Modules Simulation Finished ---');
      };

      const handleSyncData = () => {
        if (watchStatus !== 'Connected') {
          console.log('Cannot sync: SmartWatch 2 is not connected.');
          return;
        }
        setWatchStatus('Syncing Data...');
        // Simulación de sincronización de datos
        setTimeout(() => {
          setWatchStatus('Connected - Synced');
          console.log('Data Synced from SmartWatch 2');
          // Llamada simulada a SolidaryWardrobe y Rechazo Visual Automático (Paso 3)
          simulateCoreModules(); 
        }, 2500);
      };

  // Smart wardrobe data
  const wardrobeData = {
    totalItems: 247,
    outOfSize: 12,
    recentPurchases: 5,
    unused: 23,
    categories: {
      tops: 45,
      bottoms: 38,
      dresses: 22,
      outerwear: 18,
      shoes: 42,
      accessories: 82
    }
  }

  const sampleItems = [
    {
      id: 1,
      name: 'Premium Blazer',
      brand: 'TRYONYOU Curated',
      category: 'outerwear',
      size: 'M',
      color: 'Charcoal',
      image: '/assets/lTqUG1hcK5tY.jpg',
      timesWorn: 12,
      location: 'Executive Zone - Level 1',
      condition: 'Pristine',
      compatibility: '98%'
    },
    {
      id: 2,
      name: 'Sustainable Denim',
      brand: 'TRYONYOU Eco',
      category: 'bottoms',
      size: 'M',
      color: 'Indigo Blue',
      image: '/assets/tnAB6lK8pIsb.jpg',
      timesWorn: 45,
      location: 'Casual Zone - Level 2',
      condition: 'Excellent',
      compatibility: '95%'
    },
    {
      id: 3,
      name: 'Basic T-Shirt',
      brand: 'TRYONYOU Essentials',
      category: 'tops',
      size: 'M',
      color: 'Pure White',
      image: '/assets/y5iCetV1uLJ0.jpg',
      timesWorn: 0,
      location: 'Basics Zone - Level 3',
      condition: 'New',
      compatibility: '100%'
    }
  ]

  const outOfSizeItems = [
    {
      id: 101,
      name: 'Gala Dress',
      brand: 'TRYONYOU Premium',
      size: 'S',
      color: 'Elegant Gold',
      reason: 'Size change',
      image: '/assets/O5hFSjJeH0X2.webp',
      donationValue: '€85'
    },
    {
      id: 102,
      name: 'Formal Pants',
      brand: 'TRYONYOU Business',
      size: 'L',
      color: 'Professional Black',
      reason: 'No longer fits well',
      image: '/assets/RA8OwzT4mkxG.png',
      donationValue: '€65'
    }
  ]

  const outfitRecommendations = [
    {
      id: 1,
      name: 'Modern Executive',
      occasion: 'Important meetings',
      items: ['Premium Blazer', 'Sustainable Denim', 'Gold Accessories'],
      confidence: '98%',
      image: '/assets/lTqUG1hcK5tY.jpg'
    },
    {
      id: 2,
      name: 'Elegant Casual',
      occasion: 'Weekend',
      items: ['Basic T-Shirt', 'Sustainable Denim', 'Comfortable Shoes'],
      confidence: '95%',
      image: '/assets/tnAB6lK8pIsb.jpg'
    },
    {
      id: 3,
      name: 'Sophisticated Party',
      occasion: 'Special events',
      items: ['Gala Dress', 'Premium Accessories', 'Elegant Shoes'],
      confidence: '92%',
      image: '/assets/O5hFSjJeH0X2.webp'
    }
  ]

  return (
    <section className="smart-wardrobe-integration">
      <div className="wardrobe-container">
        {/* Header */}
        <div className="wardrobe-header">
          <div className="header-content">
            <div className="smartwatch-status">
              <span className={`status-indicator ${watchStatus.includes('Connected') ? 'connected' : 'disconnected'}`}></span>
              <p>SmartWatch 2 Status: <strong>{watchStatus}</strong></p>
            </div>
            <h2>👗 My Smart Wardrobe TRYONYOU</h2>
            <p>Intelligent management, perfect organization, and personalized AI recommendations</p>
          </div>
          <button 
            className="pau-button"
            onClick={handleConnectWatch}
            title="Connect SmartWatch 2"
            disabled={watchStatus === 'Connecting...' || watchStatus === 'Connected' || watchStatus === 'Connected - Synced'}
          >
            ⌚ Connect Watch
          </button>
          <button 
            className="pau-button"
            onClick={handleSyncData}
            title="Sync Data from SmartWatch 2"
            disabled={watchStatus !== 'Connected'}
          >
            🔄 Sync Data
          </button>
          <button 
            className="pau-button"
            onClick={() => setShowPau(!showPau)}
            title="Pau Assistant - Intelligent Organization"
          >
            🤖 Pau
          </button>
        </div>

        {/* Stats Overview */}
        <div className="wardrobe-stats">
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <div className="stat-content">
              <h4>{wardrobeData.totalItems}</h4>
              <p>Cataloged Garments</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <div className="stat-content">
              <h4>{wardrobeData.unused}</h4>
              <p>Usage Opportunities</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📏</span>
            <div className="stat-content">
              <h4>{wardrobeData.outOfSize}</h4>
              <p>Ready to Donate</p>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🆕</span>
            <div className="stat-content">
              <h4>{wardrobeData.recentPurchases}</h4>
              <p>Recent Purchases</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="wardrobe-tabs">
          <button
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📦 My Inventory
          </button>
          <button
            className={`tab-btn ${activeTab === 'outfits' ? 'active' : ''}`}
            onClick={() => setActiveTab('outfits')}
          >
            ✨ Recommendations
          </button>
          <button
            className={`tab-btn ${activeTab === 'solidary' ? 'active' : ''}`}
            onClick={() => setActiveTab('solidary')}
          >
            🤝 Solidarity Wardrobe
          </button>
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button
            className={`tab-btn ${activeTab === 'core' ? 'active' : ''}`}
            onClick={() => setActiveTab('core')}
          >
            ⚙️ Core Modules
          </button>
        </div>

        {/* Content */}
        <div className="wardrobe-content">
          {/* TAB: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="tab-content inventory-tab">
              <h3>Your Smart Inventory</h3>
              <p className="tab-description">
                All your garments organized, cataloged, and ready to be discovered.
              </p>
              
              {/* Categories */}
              <div className="categories-grid">
                {Object.entries(wardrobeData.categories).map(([category, count]) => (
                  <div key={category} className="category-card">
                    <span className="category-icon">
                      {category === 'tops' && '👕'}
                      {category === 'bottoms' && '👖'}
                      {category === 'dresses' && '👗'}
                      {category === 'outerwear' && '🧥'}
                      {category === 'shoes' && '👠'}
                      {category === 'accessories' && '✨'}
                    </span>
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <p className="category-count">{count} garments</p>
                  </div>
                ))}
              </div>

              {/* Items Grid */}
              <div className="items-grid">
                {sampleItems.map(item => (
                  <div key={item.id} className="item-card">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h5>{item.name}</h5>
                      <p className="brand">{item.brand}</p>
                      <p className="specs">Size {item.size} • {item.color}</p>
                      <p className="location">📍 {item.location}</p>
                      <div className="item-stats">
                        <span>Worn {item.timesWorn}x</span>
                        <span className="compatibility">Compatibility: {item.compatibility}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
	          )}
	
	          {/* TAB: CORE MODULES */}
	          {activeTab === 'core' && (
	            <div className="tab-content core-modules-tab">
	              <h3>⚙️ SmartWardrobe Core Modules (V2.0)</h3>
	              <p className="tab-description">
	                Activación y simulación de los 15 agentes de lógica de negocio.
	              </p>
	              <div className="core-modules-grid">
	                <AutoFit />
	                <IntelligentClassification />
	                <CompatibilitySystem />
	                <Avatar3DProjection />
	                <GarmentProblemDetection />
	                <CompleteLookRecommendation />
	                <AutoDonateSolidaryWardrobe />
	                <IntelligentPurchasePlan />
	                <OnDemandProduction />
	                <ABVETConnection />
	                <DynamicTrendManagement />
	                <EventForecasting />
	                <MoodSynchronization />
	                <DuplicateGarmentDetection />
	                <StyleHistoryEvolution />
	              </div>
	            </div>
	          )}

          {/* TAB: OUTFITS */}
          {activeTab === 'outfits' && (
            <div className="tab-content outfits-tab">
              <h3>Personalized Outfit Recommendations</h3>
              <p className="tab-description">
                Our AI system generates perfect combinations based on your style, occasion, and preferences.
              </p>
              
              <div className="outfits-grid">
                {outfitRecommendations.map(outfit => (
                  <div key={outfit.id} className="outfit-card">
                    <div className="outfit-preview">
                      <img src={outfit.image} alt={outfit.name} />
                      <div className="confidence-badge">{outfit.confidence}</div>
                    </div>
                    <h4>{outfit.name}</h4>
                    <p className="occasion">{outfit.occasion}</p>
                    <div className="outfit-items">
                      {outfit.items.map((item, idx) => (
                        <span key={idx} className="item-tag">{item}</span>
                      ))}
                    </div>
                    <button className="outfit-btn">View Combination</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SOLIDARY */}
          {activeTab === 'solidary' && (
            <div className="tab-content solidary-tab">
              <h3>🤝 TRYONYOU Solidarity Wardrobe</h3>
              <p className="tab-description">
                Donate or exchange your out-of-size garments with the TRYONYOU community. 
                Every garment gets a second life and positive impact.
              </p>

              <div className="solidary-actions">
                <div className="action-card">
                  <span className="action-icon">💝</span>
                  <h4>Donate</h4>
                  <p>Help those in need</p>
                  <button className="action-btn">Donate Garments</button>
                </div>
                <div className="action-card">
                  <span className="action-icon">🔄</span>
                  <h4>Exchange</h4>
                  <p>Trade with other users</p>
                  <button className="action-btn">Exchange</button>
                </div>
                <div className="action-card">
                  <span className="action-icon">👥</span>
                  <h4>Community</h4>
                  <p>Join our network</p>
                  <button className="action-btn">View Community</button>
                </div>
              </div>

              {/* Out of Size Items */}
              <div className="out-of-size-section">
                <h4>Garments Ready to Donate ({outOfSizeItems.length})</h4>
                <p className="section-description">
                  These garments are in perfect condition but no longer fit you well. 
                  Donate or exchange them!
                </p>
                <div className="out-of-size-grid">
                  {outOfSizeItems.map(item => (
                    <div key={item.id} className="out-of-size-card">
                      <img src={item.image} alt={item.name} />
                      <div className="card-content">
                        <h5>{item.name}</h5>
                        <p className="brand">{item.brand}</p>
                        <p className="reason">⚠️ {item.reason}</p>
                        <p className="donation-value">Estimated value: {item.donationValue}</p>
                        <div className="card-actions">
                          <button className="btn-donate">💝 Donate</button>
                          <button className="btn-exchange">🔄 Exchange</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="tab-content analytics-tab">
              <h3>📈 Smart Wardrobe Analytics</h3>
              <p className="tab-description">
                Discover usage patterns, improvement opportunities, and personalized recommendations.
              </p>
              
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h4>Most Versatile Garments</h4>
                  <div className="chart-placeholder">
                    <p>✓ Sustainable Denim: 45 wears</p>
                    <p>✓ Premium Blazer: 38 wears</p>
                    <p>✓ Basic T-Shirt: 32 wears</p>
                    <p className="insight">💡 Invest in versatile pieces like these</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <h4>Favorite Categories</h4>
                  <div className="chart-placeholder">
                    <p>👖 Bottoms: 38%</p>
                    <p>👕 Tops: 32%</p>
                    <p>✨ Accessories: 30%</p>
                    <p className="insight">💡 Your style is casual-executive</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <h4>Personalized Recommendations</h4>
                  <div className="recommendations">
                    <p>✓ Maximize your unused garments</p>
                    <p>✓ Combine complementary colors</p>
                    <p>✓ Update with transition pieces</p>
                    <p>✓ Consider a capsule wardrobe</p>
                  </div>
                </div>
              </div>

              <div className="sustainability-section">
                <h4>🌱 Your Sustainable Impact</h4>
                <div className="impact-stats">
                  <div className="impact-item">
                    <span className="impact-number">247</span>
                    <span className="impact-label">Garments Reused</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">12</span>
                    <span className="impact-label">Donations Made</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">€850</span>
                    <span className="impact-label">Solidarity Value</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pau Assistant Overlay */}
      {showPau && (
        <div className="pau-overlay">
          <div className="pau-modal">
            <button className="pau-close" onClick={() => setShowPau(false)}>✕</button>
            <div className="pau-content">
              <span className="pau-icon">🤖</span>
              <h3>Hi, I'm Pau</h3>
              <p>Your personal intelligent organization assistant</p>
              <div className="pau-suggestions">
                <p>💡 <strong>Suggestion:</strong> You have 12 perfect garments to donate. Want to help the community?</p>
                <p>💡 <strong>Tip:</strong> Organize your wardrobe by zones to find garments in seconds</p>
                <p>💡 <strong>Recommendation:</strong> Try new combinations with your 23 unused garments</p>
                <p>💡 <strong>Insight:</strong> Your style is casual-executive. Invest in versatile pieces</p>
              </div>
              <button className="pau-action-btn" onClick={() => setShowPau(false)}>
                Thanks, Pau 👍
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SmartWardrobe

