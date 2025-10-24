#!/usr/bin/env node
/**
 * ABVETOS FULL-MERGE PROTOCOL
 * Integrates ABVETOS + NOTS + ABVEY into TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const log = (m) => console.log("🔹 " + m);

log("Starting ABVETOS Full Merge...");

// 1️⃣ Clone repos into workspace
fs.mkdirSync("./workspace", { recursive: true });
process.chdir("./workspace");

const repos = [
  "https://github.com/LVT-ENG/ABVETOS.git",
  "https://github.com/LVT-ENG/NOTS.git",
  "https://github.com/LVT-ENG/ABVEY.git"
];

for (const repo of repos) {
  const name = repo.split("/").pop().replace(".git", "");
  if (!fs.existsSync(name)) {
    log(`Cloning ${name}...`);
    execSync(`git clone ${repo}`, { stdio: "inherit" });
  } else log(`${name} already present`);
}

// 2️⃣ Merge key modules into main repo
process.chdir("..");
fs.mkdirSync("./merged", { recursive: true });
log("Merging code and modules...");

execSync(
  "rsync -av workspace/ABVETOS/ ./merged/ --exclude=.git && " +
  "rsync -av workspace/NOTS/ ./merged/ --exclude=.git && " +
  "rsync -av workspace/ABVEY/ ./merged/ --exclude=.git",
  { stdio: "inherit" }
);

// 3️⃣ Normalize configuration
log("Normalizing config (Vite 7.1.2 / Node 20)...");
const pkgPath = "./merged/package.json";
let pkg = {};
if (fs.existsSync(pkgPath)) pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.scripts = Object.assign(pkg.scripts || {}, {
  dev: "vite",
  build: "vite build",
  preview: "vite preview"
});
pkg.dependencies = Object.assign(pkg.dependencies || {}, { vite: "7.1.2" });
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// 4️⃣ Build and deploy
log("Running build and deploy to tryonyou.app...");
execSync("cd merged && npm install && npm run build && npx vercel --prod --confirm", {
  stdio: "inherit"
});

// 5️⃣ Create fusion report
fs.mkdirSync("./reports", { recursive: true });
const report = {
  timestamp: new Date().toISOString(),
  merged: ["ABVETOS", "NOTS", "ABVEY"],
  domain: "https://tryonyou.app",
  status: "Success"
};
fs.writeFileSync("./reports/fusion-summary.json", JSON.stringify(report, null, 2));
log("✅ Fusion completed. See reports/fusion-summary.json");
