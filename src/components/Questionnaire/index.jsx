import React, { useState } from 'react';

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    size: '',
    color: '',
    city: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log('Avatar 3D generado:', result);
      // Aquí se manejaría la respuesta del avatar
    } catch (error) {
      console.error('Error generando avatar:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="questionnaire holographic">
      <h2 style={{ 
        background: 'linear-gradient(45deg, #7DD9DC, #6cc6c9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Tu Perfil TRYONYOU
      </h2>
      
      <form onSubmit={handleSubmit} style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '2rem',
        background: 'rgba(244, 246, 247, 0.9)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(125, 217, 220, 0.3)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            color: '#4B4F52',
            fontWeight: '500'
          }}>
            Talla habitual:
            <input 
              type="text" 
              name="size"
              value={formData.size}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '2px solid #D5DADD',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#7DD9DC'}
              onBlur={(e) => e.target.style.borderColor = '#D5DADD'}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            color: '#4B4F52',
            fontWeight: '500'
          }}>
            Color preferido:
            <input 
              type="text" 
              name="color"
              value={formData.color}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '2px solid #D5DADD',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#7DD9DC'}
              onBlur={(e) => e.target.style.borderColor = '#D5DADD'}
            />
          </label>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            color: '#4B4F52',
            fontWeight: '500'
          }}>
            Ciudad:
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '2px solid #D5DADD',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#7DD9DC'}
              onBlur={(e) => e.target.style.borderColor = '#D5DADD'}
            />
          </label>
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(145deg, #7DD9DC, #6cc6c9)',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(125, 217, 220, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(125, 217, 220, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(125, 217, 220, 0.4)';
          }}
        >
          Generar mi Avatar 3D
        </button>
      </form>
    </div>
  );
}