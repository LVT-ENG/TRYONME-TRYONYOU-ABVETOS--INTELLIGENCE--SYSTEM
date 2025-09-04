import React from "react";
import './styles.css';

export default function App() {
  return (
    <div className="minimal-app">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="title">TryOnMe</h1>
          <p className="subtitle">AVBETOS Intelligence System</p>
          <p className="description">
            Sistema de inteligencia avanzada para recomendaciones de moda y análisis de preferencias
          </p>
          <button className="cta-button">
            Descubre el Futuro
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Características Principales</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎯 Recomendaciones IA</h3>
              <p>Algoritmo avanzado que aprende de tus preferencias</p>
            </div>
            <div className="feature-card">
              <h3>📱 Optimizado Móvil</h3>
              <p>Experiencia perfecta en todos los dispositivos</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Seguro y Privado</h3>
              <p>Tus datos protegidos con tecnología AVBETOS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 TryOnMe - AVBETOS Intelligence System</p>
          <p>Sistema propietario y patentado</p>
        </div>
      </footer>
    </div>
  );
}
