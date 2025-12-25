import React, { useState } from 'react';

const Pilot = () => {
    const [result, setResult] = useState("");

    const startScan = () => {
        // Lógica para activar cámara y enviar a /api/process-biometry
        setResult("Analizando Biometría... Espere un momento.");
        setTimeout(() => setResult("Ajuste Perfecto: Talla M (98% Precisión)"), 2000);
    };

    return (
        <div style={{backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', textAlign: 'center', padding: '50px'}}>
            <nav><img src="/assets/logo_tryonyou.png" style={{height: '40px'}} /></nav>
            <h1>La fin des retours est arrivée.</h1>
            <p>Système d'Intelligence de Mode pour Lafayette.</p>

            <div style={{border: '2px solid #c5a059', padding: '20px', margin: '20px auto', maxWidth: '500px'}}>
                <img src="/assets/pau_blanco_chasquido.png" style={{width: '150px'}} />
                <h2>{result || "Listo para el escaneo"}</h2>
                <button
                    onClick={startScan}
                    style={{background: '#c5a059', color: 'black', padding: '15px 30px', fontWeight: 'bold', cursor: 'pointer'}}
                >
                    LANZAR ESCÁNER BIOMÉTRICO
                </button>
            </div>
        </div>
    );
};
export default Pilot;