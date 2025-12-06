import React, { useState } from "react";

export default function Showroom() {
  const [currentLook, setCurrentLook] = useState(1);
  const totalLooks = 3;

  const looks = [
    { id: 1, name: "Casual Elegance", items: ["White Shirt", "Blue Jeans", "Sneakers"] },
    { id: 2, name: "Business Professional", items: ["Navy Suit", "White Shirt", "Oxford Shoes"] },
    { id: 3, name: "Evening Glamour", items: ["Black Dress", "Heels", "Clutch Bag"] },
  ];

  const handleNext = () => {
    setCurrentLook((prev) => (prev < totalLooks ? prev + 1 : 1));
  };

  const handlePrevious = () => {
    setCurrentLook((prev) => (prev > 1 ? prev - 1 : totalLooks));
  };

  const currentLookData = looks.find((look) => look.id === currentLook);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Showroom</h1>
      <p style={styles.subtitle}>
        View your final looks in a photorealistic environment
      </p>

      <div style={styles.showroomArea}>
        <button style={styles.navButton} onClick={handlePrevious}>
          ←
        </button>

        <div style={styles.lookDisplay}>
          <div style={styles.avatarArea}>
            <div style={styles.avatarPlaceholder}>
              3D Avatar with {currentLookData.name}
            </div>
          </div>

          <div style={styles.lookInfo}>
            <h2 style={styles.lookName}>{currentLookData.name}</h2>
            <p style={styles.lookNumber}>Look {currentLook} of {totalLooks}</p>
            
            <div style={styles.itemsList}>
              <h3>Items:</h3>
              <ul>
                {currentLookData.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={styles.actions}>
              <button style={styles.saveButton}>Save Look</button>
              <button style={styles.shareButton}>Share</button>
              <button style={styles.buyButton}>Buy Outfit</button>
            </div>
          </div>
        </div>

        <button style={styles.navButton} onClick={handleNext}>
          →
        </button>
      </div>

      <div style={styles.viewOptions}>
        <button style={styles.viewButton}>Front View</button>
        <button style={styles.viewButton}>Side View</button>
        <button style={styles.viewButton}>360° View</button>
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
  showroomArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    marginBottom: "2rem",
  },
  navButton: {
    width: "50px",
    height: "50px",
    fontSize: "1.5rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
  },
  lookDisplay: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "2rem",
    borderRadius: "12px",
    minHeight: "500px",
  },
  avatarArea: {
    flex: 1,
  },
  avatarPlaceholder: {
    width: "350px",
    height: "500px",
    backgroundColor: "#e0e0e0",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    fontSize: "1rem",
    textAlign: "center",
    padding: "1rem",
  },
  lookInfo: {
    flex: 1,
    padding: "1rem",
  },
  lookName: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  lookNumber: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  itemsList: {
    marginBottom: "2rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  saveButton: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  shareButton: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  buyButton: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  viewOptions: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  viewButton: {
    padding: "0.6rem 1.5rem",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};
