import axios from 'axios';
const MAKE_WEBHOOK_URL = 'https://eu2.make.com/webhook/TU_ID_AQUI';
export const enviarEscaneoAFIS = async (datos) => {
    console.log("📡 Enviando datos al Cerebro FIS...");
    try {
        const response = await axios.post(MAKE_WEBHOOK_URL, {
            perfil: datos.perfil,
            medidas: datos.medidas,
            evento: datos.evento,
            tienda: "Galeries Lafayette",
            timestamp: new Date().toISOString()
        });
        console.log("✅ Recomendación recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Fallo en la conexión con Make:", error.message);
    }
};
