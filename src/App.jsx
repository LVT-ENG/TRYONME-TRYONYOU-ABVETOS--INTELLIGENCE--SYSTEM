import React from "react";

export default function App() {
  return (
    <main style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    }}>
      <h1 style={{ 
        fontSize: '3rem',
        margin: '0 0 1rem 0',
        color: '#333'
      }}>
        <em>TryOnYou.app</em>
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#0f7b0f',
        margin: '0'
      }}>
        ✅ Deploy minimal oficial en Vercel
      </p>
    </main>
  );
}
