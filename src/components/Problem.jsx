import React, { useState, useEffect, useRef } from 'react'

function Problem() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const targetValue = 550

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && count < targetValue) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 10, targetValue))
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [isVisible, count])

  return (
    <section className="problem" ref={sectionRef}>
      <div className="problem-container">
        <div className="problem-content">
          <h2 className="section-title">The $550 Billion Problem</h2>
          <div className="stat-display">
            <span className="stat-number">${count}B</span>
            <span className="stat-label">in annual returns</span>
          </div>
          <p className="problem-text">
            Online fashion returns cost the industry over <strong>$550 billion annually</strong>. 
            The main reason? Customers can't accurately visualize how garments will fit their unique body shape. 
            This creates a cycle of buying, trying, and returning that's costly for businesses and frustrating for customers.
          </p>
          <div className="problem-stats">
            <div className="stat-item">
              <span className="stat-value">30-40%</span>
              <span className="stat-desc">Return Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">70%</span>
              <span className="stat-desc">Due to Fit Issues</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$20-30</span>
              <span className="stat-desc">Cost per Return</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
