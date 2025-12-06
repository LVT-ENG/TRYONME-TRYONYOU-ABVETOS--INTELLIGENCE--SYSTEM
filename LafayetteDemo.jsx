import React from "react";

export default function LafayetteDemo() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Lafayette Exclusive Demo</h1>
        <p style={styles.subtitle}>
          Premium virtual fitting experience for Lafayette partners and investors
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.demoSection}>
          <h2>🎯 Demo Highlights</h2>
          <ul style={styles.list}>
            <li>Ultra-precise virtual fitting with millimetric alignment</li>
            <li>Photorealistic 3D avatar generation</li>
            <li>AI-powered style recommendations via Pau</li>
            <li>Smart Wardrobe integration</li>
            <li>Biometric payment with ABVET</li>
            <li>Real-time garment visualization</li>
          </ul>
        </div>

        <div style={styles.demoSection}>
          <h2>🏢 For Station F & Investors</h2>
          <p>
            This demo showcases the complete TRYONYOU ecosystem, including our patent-pending 
            technologies and ABVETOS intelligence layer.
          </p>
          <p>
            <strong>Key Technologies:</strong>
          </p>
          <ul style={styles.list}>
            <li><strong>PAU:</strong> Emotional style recommender</li>
            <li><strong>CAP:</strong> Cognitive avatar personalization</li>
            <li><strong>FTT:</strong> Fit tracking technology</li>
            <li><strong>ABVET:</strong> Dual-biometric payment (Iris + Voice)</li>
            <li><strong>DSX:</strong> Deploy orchestration system</li>
          </ul>
        </div>

        <div style={styles.demoSection}>
          <h2>📊 Business Model</h2>
          <div style={styles.businessGrid}>
            <div style={styles.businessCard}>
              <h3>B2C</h3>
              <p>Direct consumer virtual fitting platform</p>
            </div>
            <div style={styles.businessCard}>
              <h3>B2B</h3>
              <p>White-label solution for boutiques and brands</p>
            </div>
            <div style={styles.businessCard}>
              <h3>SaaS</h3>
              <p>Embeddable widgets for e-commerce sites</p>
            </div>
          </div>
        </div>

        <div style={styles.ctaSection}>
          <h2>Ready to Experience TRYONYOU?</h2>
          <button style={styles.ctaButton}>Start Demo Journey</button>
          <button style={styles.secondaryButton}>Download Pitch Deck</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', sans-serif",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
    padding: "3rem 1rem",
    background: "linear-gradient(135deg, #856404 0%, #ffc107 100%)",
    borderRadius: "12px",
    color: "white",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    opacity: 0.9,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  demoSection: {
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  list: {
    lineHeight: "1.8",
  },
  businessGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  businessCard: {
    padding: "1.5rem",
    backgroundColor: "white",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  ctaSection: {
    textAlign: "center",
    padding: "3rem 1rem",
    backgroundColor: "#fff3cd",
    borderRadius: "8px",
  },
  ctaButton: {
    padding: "1rem 3rem",
    fontSize: "1.2rem",
    backgroundColor: "#856404",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "1rem",
  },
  secondaryButton: {
    padding: "1rem 3rem",
    fontSize: "1.2rem",
    backgroundColor: "white",
    color: "#856404",
    border: "2px solid #856404",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
