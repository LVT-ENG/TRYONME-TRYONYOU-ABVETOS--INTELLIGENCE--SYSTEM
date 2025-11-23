import React from 'react';

/**
 * Componente Core: AutoFit
 * Lógica simulada para el SmartWardrobe V2.0.
 */
const AutoFit = ({ onExecute }) => {
  const executeLogic = () => {
    console.log(`AutoFit Agent: Ejecutando lógica...`);
    // Simulación de la lógica de negocio para AutoFit
    const result = `Resultado simulado de AutoFit`;
    console.log(`AutoFit Agent: ${result}`);
    if (onExecute) {
      onExecute(result);
    }
  };

  return (
    <div className="core-component-card">
      <h4>AutoFit</h4>
      <p>Módulo de lógica core. Resultado: {onExecute ? 'Integrado' : 'Stand-alone'}</p>
      <button onClick={executeLogic}>Ejecutar Simulación</button>
    </div>
  );
};

export default AutoFit;
