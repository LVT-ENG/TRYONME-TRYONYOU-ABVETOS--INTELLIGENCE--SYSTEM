import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>TRYONYOU</h1>
        <p style={styles.subtitle}>
          Full Virtual Fitting System + Smart Wardrobe + ABVETOS Intelligence Layer
        </p>
        <p style={styles.description}>
          An end-to-end ecosystem for virtual fitting, emotional style recommendation, 
          intelligent wardrobe management, and advanced biometric payment.
        </p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>🎯 Virtual Try-On</h2>
          <p>Ultra-precise virtual fitting engine with millimetric garment alignment.</p>
          <Link to="/demo" style={styles.link}>Explore Demo</Link>
        </div>

        <div style={styles.card}>
          <h2>👤 3D Avatar</h2>
          <p>Generate an avatar based on your real body or choose an idealized version.</p>
          <Link to="/avatar" style={styles.link}>Create Avatar</Link>
        </div>

        <div style={styles.card}>
          <h2>🧠 Intelligent System</h2>
          <p>AI assistant that recommends outfits based on emotional state and personal style.</p>
          <Link to="/intelligent-system" style={styles.link}>Meet Pau</Link>
        </div>

        <div style={styles.card}>
          <h2>👗 Smart Wardrobe</h2>
          <p>Intelligent wardrobe system that registers, measures, and combines your garments.</p>
          <Link to="/wardrobe" style={styles.link}>Open Wardrobe</Link>
        </div>

        <div style={styles.card}>
          <h2>🏬 Brand Selection</h2>
          <p>Discover and shop from premium brands integrated with our virtual fitting system.</p>
          <Link to="/brands" style={styles.link}>Browse Brands</Link>
        </div>

        <div style={styles.card}>
          <h2>✨ Showroom</h2>
          <p>View your final looks in a photorealistic showroom environment.</p>
          <Link to="/showroom" style={styles.link}>Enter Showroom</Link>
        </div>
      </div>

      <div style={styles.demoSection}>
        <h2>Special Demos</h2>
        <Link to="/lafayette-demo" style={styles.demoLink}>
          Lafayette Exclusive Demo →
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  hero: {
    textAlign: "center",
    marginBottom: "3rem",
    padding: "3rem 1rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    color: "white",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    maxWidth: "700px",
    margin: "0 auto",
    opacity: 0.9,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  card: {
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  link: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#111",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
  },
  demoSection: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#fff3cd",
    borderRadius: "8px",
  },
  demoLink: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "1rem 2rem",
    backgroundColor: "#856404",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
};
