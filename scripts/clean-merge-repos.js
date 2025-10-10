// scripts/clean-merge-repos.js
// Agente automático para fusionar repos legacy en el maestro y dejar el código limpio

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const MASTER_DIR = path.resolve(__dirname, "../TRYONYOU-MASTER");
const LEGACY_REPOS = [
  path.resolve(__dirname, "../TryonViewApp"),
  path.resolve(__dirname, "../Ultra"),
  path.resolve(__dirname, "../Plus"),
  path.resolve(__dirname, "../Legacy")
];

// Carpetas clave en la estructura definitiva

// Ignorar basura / duplicados
const IGNORE_PATTERNS = [
  "middleware.ts", "sparkles.css", "old-theme.css", "test-", "tmp", ".DS_Store"
];

// Verificar si un archivo debe ser ignorado
function shouldIgnore(file) {
  return IGNORE_PATTERNS.some(pattern => file.includes(pattern));
}

// Copiar archivo si aporta valor y no es duplicado
function copyIfUseful(src, dest) {
  if (shouldIgnore(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log("➕ Añadido:", dest);
  } else {
    // Si ya existe, compara tamaño y fecha
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);
    if (srcStat.size > destStat.size || srcStat.mtime > destStat.mtime) {
      fs.copyFileSync(src, dest);
      console.log("🔄 Reemplazado con versión mejorada:", dest);
    }
  }
}

// Fusionar un repositorio en el maestro
function mergeRepo(repoPath) {
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        const relPath = path.relative(repoPath, fullPath);
        const destPath = path.join(MASTER_DIR, relPath);
        copyIfUseful(fullPath, destPath);
      }
    }
  }
  if (fs.existsSync(repoPath)) {
    console.log("🔎 Escaneando repo:", repoPath);
    walk(repoPath);
  }
}

// Ejecutar la limpieza/fusión
console.log("🚀 Iniciando agente de fusión y limpieza...");
LEGACY_REPOS.forEach(mergeRepo);

// Crear ZIP del repo limpio
const output = fs.createWriteStream(path.join(__dirname, "../tryonyou-clean.zip"));
const archive = archiver("zip", { zlib: { level: 9 } });
output.on("close", () => {
  console.log(`✅ Proyecto limpio empaquetado en tryonyou-clean.zip (${archive.pointer()} bytes)`);
});
archive.pipe(output);
archive.directory(MASTER_DIR, false);
archive.finalize();
