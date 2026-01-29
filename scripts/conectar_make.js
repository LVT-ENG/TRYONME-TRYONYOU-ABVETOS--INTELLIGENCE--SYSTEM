const axios = require('axios');
const enviarAlCerebroFIS = async (datos) => {
    try {
        const response = await axios.post(process.env.MAKE_WEBHOOK_URL, {
            perfil: datos.nombre,
            drama: datos.drama,
            escaneo: datos.escaneo,
            tienda: "Galeries Lafayette"
        });
        console.log("💎 Respuesta del Agente:", response.data.prenda_ideal || "Procesando...");
        console.log("📣 Slogan: Ne vous le faites pas raconter, vivez-le.");
    } catch (error) {
        console.error("❌ Error de enlace:", error.message);
    }
};
const pruebaAngel = { 
    nombre: "Ángel", 
    drama: "horma ancha", 
    escaneo: { hombros: 45, cintura: 85, cadera: 95 } 
};
enviarAlCerebroFIS(pruebaAngel);
