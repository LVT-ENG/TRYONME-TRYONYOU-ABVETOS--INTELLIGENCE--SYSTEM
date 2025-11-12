import React from 'react'

function Partners() {
  const partners = [
    { name: 'Inditex', category: 'Strategic Partner', logo: '🏢' },
    { name: 'Fashion Retailers', category: 'B2B Clients', logo: '🛍️' },
    { name: 'Tech Partners', category: 'Technology', logo: '💻' },
    { name: 'Manufacturing', category: 'Production', logo: '🏭' },
    { name: 'Payment Providers', category: 'Fintech', logo: '💳' },
    { name: 'Logistics', category: 'Supply Chain', logo: '📦' }
  ]

  const integrations = [
    'E-commerce Platforms',
    'ERP Systems',
    'Payment Gateways',
    'Shipping Providers',
    'CRM Solutions',
    'Analytics Tools'
  ]

  return (
    <section className="partners" id="partners">
      <div className="partners-container">
        <h2 className="section-title">Partners & Integrations</h2>
        <p className="partners-intro">
          We collaborate with industry leaders to deliver seamless, end-to-end fashion technology solutions
        </p>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card">
              <div className="partner-logo">{partner.logo}</div>
              <h4 className="partner-name">{partner.name}</h4>
              <span className="partner-category">{partner.category}</span>
            </div>
          ))}
        </div>

        <div className="integrations-section">
          <h3 className="subsection-title">Platform Integrations</h3>
          <div className="integrations-list">
            {integrations.map((integration, index) => (
              <span key={index} className="integration-tag">
                {integration}
              </span>
            ))}
          </div>
        </div>

        <div className="partnership-cta">
          <h3>Become a Partner</h3>
          <p>
            Join our ecosystem and leverage cutting-edge fashion technology to transform your business
          </p>
          <button className="partner-button">Partner with Us</button>
        </div>
      </div>
    </section>
  )
}

export default Partners
