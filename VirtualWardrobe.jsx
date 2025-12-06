import React, { useState } from "react";

export default function VirtualWardrobe() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleStyleMe = () => {
    alert("Let The Peacock guide your style...");
  };

  const categories = [
    { icon: "👕", label: "Clothes" },
    { icon: "👟", label: "Shoes" },
    { icon: "💍", label: "Accessories" },
    { icon: "💄", label: "Makeup" },
    { icon: "💇", label: "Hair" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Categories</h2>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            style={styles.sidebarButton}
            onClick={() => setSelectedCategory(cat.label)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
        <button style={styles.sidebarButton} onClick={handleStyleMe}>
          🎯 Style me (AI)
        </button>
      </div>
      <div style={styles.main}>
        <h1>Virtual Wardrobe</h1>
        <div style={styles.avatarArea}>
          Avatar with outfit preview
          {selectedCategory && (
            <div style={styles.categoryLabel}>
              Selected: {selectedCategory}
            </div>
          )}
        </div>
        <img
          style={styles.peacock}
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Peacock_displaying_tail.jpg"
          alt="The Peacock"
          title="Styled by The Peacock"
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    fontFamily: "'Helvetica Neue', sans-serif",
    backgroundColor: "#f9f9f9",
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#111",
    color: "white",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  sidebarTitle: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  sidebarButton: {
    background: "transparent",
    color: "white",
    border: "1px solid white",
    padding: "0.5rem",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background 0.3s ease",
  },
  main: {
    flex: 1,
    padding: "2rem",
    textAlign: "center",
    position: "relative",
  },
  avatarArea: {
    width: "300px",
    height: "500px",
    margin: "0 auto",
    backgroundColor: "#e0e0e0",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    flexDirection: "column",
  },
  categoryLabel: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#333",
  },
  peacock: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "80px",
    opacity: 0.9,
  },
};
