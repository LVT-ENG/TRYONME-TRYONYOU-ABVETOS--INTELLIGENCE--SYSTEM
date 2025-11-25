import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <img src="/logo.png" alt="TRYONYOU" className="footer-logo" />
            <p className="footer-tagline">
              The Future of Fashion Intelligence
            </p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><a href="#modules">Core Modules</a></li>
              <li><a href="#patents">Patents & IP</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#cta">Request Demo</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Technology</h4>
            <ul>
              <li><a href="#">3D Avatar System</a></li>
              <li><a href="#">Biometric Payment</a></li>
              <li><a href="#">AI Recommendations</a></li>
              <li><a href="#">Production Platform</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Kit</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} TRYONYOU. All rights reserved. | Patents Pending (EPCT)
          </p>
          <p className="footer-trademarks">
            TRYONYOU®, ABVET®, LiveIt Factory®, PAU®, CAP®, FTT® are registered trademarks.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
