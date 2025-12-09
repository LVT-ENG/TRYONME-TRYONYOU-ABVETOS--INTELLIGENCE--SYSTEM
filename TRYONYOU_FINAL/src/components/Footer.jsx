import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/logo_tryonyou_symbol.png" alt="TRYONYOU" className="footer-logo" />
            <p className="footer-tagline">Experience Fashion in a New Dimension</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Platform</h3>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#fitting-room">Virtual Try-On</a></li>
              <li><a href="#pau">AI Assistant</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press Kit</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} TRYONYOU. All rights reserved.
          </p>
          <div className="social-links">
            <a href="#instagram" aria-label="Instagram">📷</a>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#linkedin" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
