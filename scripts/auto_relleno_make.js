const axios = require('axios');
const fs = require('fs');

async function sincronizarTodoElSistema() {
    const inventario = JSON.parse(fs.readFileSync('./src/inventory_index.json', 'utf8'));
    
    console.log("📤 Enviando 166 elementos a los Agentes en Make...");
    
    try {
        const response = await axios.post(process.env.MAKE_WEBHOOK_URL, {
            org: process.env.MAKE_ORGANIZATION_ID,
            accion: "RELLENAR_INVENTARIO",
            items: inventario,
            slogan: "Ne vous le faites pas raconter, vivez-le."
        });
        console.log("✅ Agentes sincronizados en Make.com/2683131");
    } catch (e) {
        console.error("❌ Error de orquestación:", e.message);
    }
}
sincronizarTodoElSistema();
