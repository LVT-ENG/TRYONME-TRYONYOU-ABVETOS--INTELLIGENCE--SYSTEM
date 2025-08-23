#!/usr/bin/env node
const { execSync } = require("child_process");

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || "PON_AQUI_TU_TOKEN";
const PROJECT_PATH = process.env.PROJECT_PATH || ".";

try {
  console.log("🔧 Compilando proyecto con Vite...");
  execSync("npm run build", { stdio: "inherit", cwd: PROJECT_PATH });

  console.log("🚀 Desplegando en Vercel...");
  execSync(
    `npx vercel --token ${VERCEL_TOKEN} --prod --yes`,
    { stdio: "inherit", cwd: PROJECT_PATH }
  );

  console.log("✅ Deploy completado con éxito.");
  process.exit(0);
} catch (err) {
  console.error("❌ Error en el despliegue:", err.message);
  process.exit(1);
}
