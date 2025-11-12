import React, { useState } from 'react'

function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        interest: ''
      })
    }, 3000)
  }

  return (
    <section className="cta" id="cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="section-title">Ready to Transform Your Fashion Business?</h2>
          <p className="cta-intro">
            Request a personalized demo and discover how TRYONYOU can revolutionize your customer experience, 
            reduce returns, and increase profitability.
          </p>

          <div className="cta-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Reduce returns by up to 85%</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Increase conversion rates by 25%</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Improve customer satisfaction by 40%</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Cut inventory waste by 60%</span>
            </div>
          </div>
        </div>

        <div className="cta-form-wrapper">
          {!submitted ? (
            <form className="cta-form" onSubmit={handleSubmit}>
              <h3>Request a Demo</h3>
              
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <input
                type="email"
                name="email"
                placeholder="Business Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <input
                type="text"
                name="company"
                placeholder="Company Name *"
                value={formData.company}
                onChange={handleChange}
                required
              />
              
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Your Role *</option>
                <option value="ceo">CEO / Founder</option>
                <option value="cto">CTO / Tech Lead</option>
                <option value="cio">CIO / IT Director</option>
                <option value="product">Product Manager</option>
                <option value="ecommerce">E-commerce Manager</option>
                <option value="other">Other</option>
              </select>
              
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
              >
                <option value="">Area of Interest *</option>
                <option value="full-platform">Full Platform Integration</option>
                <option value="avatar">3D Avatar Technology</option>
                <option value="payment">Biometric Payment System</option>
                <option value="production">Production Orchestration</option>
                <option value="licensing">Technology Licensing</option>
                <option value="partnership">Strategic Partnership</option>
              </select>
              
              <button type="submit" className="submit-button">
                Request Demo
              </button>
              
              <p className="form-privacy">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          ) : (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>We've received your request. Our team will contact you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTA
