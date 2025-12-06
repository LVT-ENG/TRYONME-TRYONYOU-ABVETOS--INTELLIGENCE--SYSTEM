import React from "react";

export default function Demo() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TRYONYOU Demo</h1>
      <p style={styles.subtitle}>
        Experience the complete virtual fitting journey
      </p>

      <div style={styles.stepsContainer}>
        <div style={styles.step}>
          <div style={styles.stepNumber}>1</div>
          <h3>Welcome & Body Selection</h3>
          <p>Choose your body type or upload your measurements for a personalized avatar.</p>
        </div>

        <div style={styles.step}>
          <div style={styles.stepNumber}>2</div>
          <h3>Measurements</h3>
          <p>Precise body measurements ensure perfect fit recommendations.</p>
        </div>

        <div style={styles.step}>
          <div style={styles.stepNumber}>3</div>
          <h3>Color Profile</h3>
          <p>Discover which colors complement your skin tone and personal style.</p>
        </div>

        <div style={styles.step}>
          <div style={styles.stepNumber}>4</div>
          <h3>User Profile</h3>
          <p>Set your style preferences, occasions, and wardrobe goals.</p>
        </div>

        <div style={styles.step}>
          <div style={styles.stepNumber}>5</div>
          <h3>Look Sheet</h3>
          <p>AI-generated outfit combinations based on your profile and wardrobe.</p>
        </div>

        <div style={styles.step}>
          <div style={styles.stepNumber}>6</div>
          <h3>Glow Up</h3>
          <p>Transform your style with personalized recommendations and virtual try-on.</p>
        </div>
      </div>

      <div style={styles.ctaSection}>
        <button style={styles.ctaButton}>Start Your Journey</button>
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
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#666",
    marginBottom: "3rem",
  },
  stepsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  step: {
    padding: "1.5rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    textAlign: "center",
  },
  stepNumber: {
    width: "50px",
    height: "50px",
    backgroundColor: "#667eea",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0 auto 1rem auto",
  },
  ctaSection: {
    textAlign: "center",
    padding: "2rem",
  },
  ctaButton: {
    padding: "1rem 3rem",
    fontSize: "1.2rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
