import React, { useState } from "react";

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const brands = [
    { name: "Zara", category: "Fast Fashion", description: "Contemporary fashion for everyone" },
    { name: "Gucci", category: "Luxury", description: "Italian luxury fashion and leather goods" },
    { name: "H&M", category: "Fast Fashion", description: "Affordable fashion and quality" },
    { name: "Prada", category: "Luxury", description: "Sophisticated Italian fashion house" },
    { name: "Uniqlo", category: "Casual", description: "Japanese casual wear designer" },
    { name: "Louis Vuitton", category: "Luxury", description: "French luxury fashion house" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Brand Selection</h1>
      <p style={styles.subtitle}>
        Choose from our curated selection of premium brands integrated with virtual fitting
      </p>

      <div style={styles.filterSection}>
        <button style={styles.filterButton}>All Brands</button>
        <button style={styles.filterButton}>Luxury</button>
        <button style={styles.filterButton}>Fast Fashion</button>
        <button style={styles.filterButton}>Casual</button>
      </div>

      <div style={styles.brandsGrid}>
        {brands.map((brand, idx) => (
          <div
            key={idx}
            style={{
              ...styles.brandCard,
              ...(selectedBrand === brand.name ? styles.brandCardSelected : {}),
            }}
            onClick={() => setSelectedBrand(brand.name)}
          >
            <div style={styles.brandLogo}>{brand.name[0]}</div>
            <h3 style={styles.brandName}>{brand.name}</h3>
            <span style={styles.brandCategory}>{brand.category}</span>
            <p style={styles.brandDescription}>{brand.description}</p>
            <button style={styles.tryButton}>Try Virtual Fitting</button>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div style={styles.selectedInfo}>
          <p>Selected: <strong>{selectedBrand}</strong></p>
          <button style={styles.continueButton}>Continue to Wardrobe</button>
        </div>
      )}
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
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    textAlign: "center",
    color: "#666",
    marginBottom: "2rem",
  },
  filterSection: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  filterButton: {
    padding: "0.6rem 1.5rem",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  brandsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  brandCard: {
    padding: "2rem",
    backgroundColor: "#fff",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  brandCardSelected: {
    borderColor: "#667eea",
    backgroundColor: "#f0f4ff",
  },
  brandLogo: {
    width: "80px",
    height: "80px",
    backgroundColor: "#111",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0 auto 1rem auto",
  },
  brandName: {
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  brandCategory: {
    display: "inline-block",
    padding: "0.3rem 0.8rem",
    backgroundColor: "#e0e0e0",
    borderRadius: "12px",
    fontSize: "0.8rem",
    marginBottom: "1rem",
  },
  brandDescription: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "1rem",
  },
  tryButton: {
    padding: "0.6rem 1.5rem",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  selectedInfo: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#f0f4ff",
    borderRadius: "8px",
  },
  continueButton: {
    marginTop: "1rem",
    padding: "0.8rem 2rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};
