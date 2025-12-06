import React from "react";
import { Link } from "react-router-dom";

export default function StationF() {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>TRYONYOU</h1>
        <p style={styles.heroSubtitle}>
          Full Virtual Fitting System + Smart Wardrobe + ABVETOS Intelligence Layer
        </p>
        <p style={styles.heroDescription}>
          Patent-based fashion intelligence ecosystem for boutiques, brands, and consumers
        </p>
        <div style={styles.heroActions}>
          <Link to="/demo" style={styles.primaryButton}>
            Start Demo
          </Link>
          <Link to="/lafayette-demo" style={styles.secondaryButton}>
            Lafayette Experience
          </Link>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Core Technologies</h2>
        <div style={styles.techGrid}>
          <div style={styles.techCard}>
            <div style={styles.techIcon}>🎯</div>
            <h3>PAU</h3>
            <p>Emotional style recommender AI</p>
          </div>
          <div style={styles.techCard}>
            <div style={styles.techIcon}>👤</div>
            <h3>CAP</h3>
            <p>Cognitive avatar personalization</p>
          </div>
          <div style={styles.techCard}>
            <div style={styles.techIcon}>📏</div>
            <h3>FTT</h3>
            <p>Fit tracking technology</p>
          </div>
          <div style={styles.techCard}>
            <div style={styles.techIcon}>🔐</div>
            <h3>ABVET</h3>
            <p>Dual-biometric payment (Iris + Voice)</p>
          </div>
          <div style={styles.techCard}>
            <div style={styles.techIcon}>⚙️</div>
            <h3>DSX</h3>
            <p>Deploy orchestration system</p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Business Model</h2>
        <div style={styles.businessGrid}>
          <div style={styles.businessCard}>
            <h3>B2C Platform</h3>
            <p>Direct-to-consumer virtual fitting and smart wardrobe management</p>
            <ul style={styles.featureList}>
              <li>Personalized avatar creation</li>
              <li>AI-powered outfit recommendations</li>
              <li>Virtual try-on with millimetric precision</li>
              <li>Wardrobe lifecycle management</li>
            </ul>
          </div>
          <div style={styles.businessCard}>
            <h3>B2B White-Label</h3>
            <p>Complete virtual fitting solution for boutiques and brands</p>
            <ul style={styles.featureList}>
              <li>Embeddable widgets</li>
              <li>Custom branding</li>
              <li>API integration</li>
              <li>Analytics dashboard</li>
            </ul>
          </div>
          <div style={styles.businessCard}>
            <h3>SaaS Platform</h3>
            <p>Plug-and-play integration for e-commerce platforms</p>
            <ul style={styles.featureList}>
              <li>One-click installation</li>
              <li>Real-time sync</li>
              <li>Multi-brand support</li>
              <li>Subscription-based pricing</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Market Opportunity</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>€450B</div>
            <div style={styles.statLabel}>European Fashion Market</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>30%</div>
            <div style={styles.statLabel}>Online Return Rate</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>€12B</div>
            <div style={styles.statLabel}>Annual Return Costs</div>
          </div>
        </div>
      </section>

      <section style={styles.ctaSection}>
        <h2>Ready to Transform Fashion Retail?</h2>
        <p>Experience the complete TRYONYOU ecosystem</p>
        <div style={styles.ctaButtons}>
          <Link to="/demo" style={styles.ctaPrimary}>
            Explore Full Demo
          </Link>
          <a href="#contact" style={styles.ctaSecondary}>
            Schedule Meeting
          </a>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', sans-serif",
    backgroundColor: "#0d0d0d",
    color: "#ffffff",
    minHeight: "100vh",
  },
  hero: {
    textAlign: "center",
    padding: "6rem 2rem",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  heroTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #00aaff 0%, #0070f3 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    opacity: 0.9,
  },
  heroDescription: {
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto 2rem auto",
    opacity: 0.7,
  },
  heroActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  primaryButton: {
    padding: "1rem 2.5rem",
    backgroundColor: "#0070f3",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  secondaryButton: {
    padding: "1rem 2.5rem",
    backgroundColor: "#222",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "3rem",
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },
  techCard: {
    padding: "2rem",
    backgroundColor: "#151515",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "center",
  },
  techIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  businessGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  businessCard: {
    padding: "2rem",
    backgroundColor: "#151515",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  featureList: {
    marginTop: "1rem",
    paddingLeft: "1.5rem",
    lineHeight: "1.8",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  statCard: {
    padding: "2rem",
    backgroundColor: "#0070f3",
    borderRadius: "12px",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "1.1rem",
    opacity: 0.9,
  },
  ctaSection: {
    textAlign: "center",
    padding: "6rem 2rem",
    backgroundColor: "#151515",
  },
  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "2rem",
  },
  ctaPrimary: {
    padding: "1.2rem 3rem",
    backgroundColor: "#0070f3",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  ctaSecondary: {
    padding: "1.2rem 3rem",
    backgroundColor: "transparent",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "2px solid white",
  },
};
