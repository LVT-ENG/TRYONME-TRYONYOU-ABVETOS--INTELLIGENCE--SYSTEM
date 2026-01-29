const axios = require('axios');

const enviarAlCerebroFIS = async (datos) => {
    try {
        const response = await axios.post(process.env.MAKE_WEBHOOK_URL, {
            perfil: datos.nombre,
            drama: datos.drama,
            escaneo: {
                hombros: datos.hombros,
                cintura: datos.cintura,
                cadera: datos.cadera
            },
            tienda: "Galeries Lafayette"
        });

        console.log("💎 Respuesta del Agente:", response.data.prenda_ideal);
        console.log("📣 Slogan:", "Ne vous le faites pas raconter, vivez-le.");
    } catch (error) {
        console.error("❌ Error de enlace:", error.message);
    }
};

// Datos de prueba para validación automática
const pruebaAngel = { 
    nombre: "Ángel", 
    drama: "horma ancha", 
    hombros: 45, 
    cintura: 85, 
    cadera: 95 
};

enviarAlCerebroFIS(pruebaAngel);
