import React from 'react';

const ClaimsModule = () => {
  const claims = [
    "Claim 1: Sistema de Ajuste Biométrico",
    "Claim 2: Producción Automatizada en Tiempo Real",
    "Claim 3: Integración de Pagos Biométricos",
    "Claim 4: Protección de Propiedad Intelectual Digital",
    "Claim 5: Interfaz de Usuario Holográfica",
    "Claim 6: Red Neural de Diseño Generativo",
    "Claim 7: Sostenibilidad en la Cadena de Suministro",
    "Claim 8: Seguridad y Privacidad de Datos Biométricos"
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'var(--gold)', textAlign: 'center' }}>Super-Claims de la Patente</h1>
      <ul style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        {claims.map((claim, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>{claim}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimsModule;
