import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function SmartCloset() {
  const { t } = useLanguage()
  const [activeView, setActiveView] = useState('overview')

  return (
    <section className="smart-closet" id="smart-closet">
      <div className="closet-container">
        {/* Section Header */}
        <div className="closet-header">
          <span className="closet-badge">
            <span className="badge-icon">👔</span>
            <span className="badge-text">Smart Wardrobe Technology</span>
          </span>
          <h2 className="closet-title">
            Your Digital Closet
            <br />
            <span className="title-gradient">Always Organized, Always Accessible</span>
          </h2>
          <p className="closet-subtitle">
            Transform your physical wardrobe into an intelligent digital ecosystem. 
            Every piece catalogued, analyzed, and ready to create the perfect outfit.
          </p>
        </div>

        {/* Closet Views Tabs */}
        <div className="closet-tabs">
          <button 
            className={`closet-tab ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            <span className="tab-icon">🏠</span>
            <span className="tab-text">Overview</span>
          </button>
          <button 
            className={`closet-tab ${activeView === 'holographic' ? 'active' : ''}`}
            onClick={() => setActiveView('holographic')}
          >
            <span className="tab-icon">✨</span>
            <span className="tab-text">Holographic View</span>
          </button>
        </div>

        {/* Closet Content */}
        <div className="closet-content">
          {/* Main Wardrobe Image */}
          <div className="closet-main-image">
            <div className="closet-holographic-frame">
              <div className="holographic-border"></div>
              <div className="holographic-glow-closet"></div>
              <img 
                src="/wardrobe-module.png" 
                alt="Smart Wardrobe Holographic Interface"
                className="closet-image"
                loading="lazy"
              />
              <div className="holographic-scan-line"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="closet-features">
            <div className="closet-feature-card">
              <div className="feature-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4L4 10V18C4 24.6274 9.37258 28 16 28C22.6274 28 28 24.6274 28 18V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 16C17.6569 16 19 14.6569 19 13C19 11.3431 17.6569 10 16 10C14.3431 10 13 11.3431 13 13C13 14.6569 14.3431 16 16 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 22C11 20.3431 13.2386 19 16 19C18.7614 19 21 20.3431 21 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card-title">AI Cataloging</h3>
              <p className="feature-card-description">
                Automatically recognize and categorize every item in your wardrobe with computer vision
              </p>
            </div>

            <div className="closet-feature-card">
              <div className="feature-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 10V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card-title">Outfit Timeline</h3>
              <p className="feature-card-description">
                Track when you wore each piece and get smart suggestions based on your history
              </p>
            </div>

            <div className="closet-feature-card">
              <div className="feature-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 16L16 26L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L16 16L26 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card-title">Weather Integration</h3>
              <p className="feature-card-description">
                Get outfit recommendations based on real-time weather and your schedule
              </p>
            </div>

            <div className="closet-feature-card">
              <div className="feature-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4V28M4 16H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-card-title">Mix & Match AI</h3>
              <p className="feature-card-description">
                Discover new combinations from your existing wardrobe you never thought of
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="closet-stats">
          <div className="closet-stat">
            <div className="stat-value">∞</div>
            <div className="stat-label">Outfit Combinations</div>
          </div>
          <div className="closet-stat">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Access Anywhere</div>
          </div>
          <div className="closet-stat">
            <div className="stat-value">100%</div>
            <div className="stat-label">Organized</div>
          </div>
          <div className="closet-stat">
            <div className="stat-value">AI</div>
            <div className="stat-label">Powered</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmartCloset

