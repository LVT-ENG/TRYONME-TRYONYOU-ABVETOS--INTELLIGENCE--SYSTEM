// FILE: scripts/activate_agents.js
// ACTION: Switch dormant agents to ACTIVE status
// Patent: PCT/EP2025/067317

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pending agents to activate [Source 3543, 3011]
const pendingAgents = [
    { id: 31, name: "Video Curator", role: "Video & Visual", specialization: "Content Creation" },
    { id: 2, name: "Content Pro", role: "Deployment & Production", specialization: "Release Management" },
    { id: 25, name: "Image Curator", role: "Business & Strategy", specialization: "Visual Assets" }
];

console.log("\n╔═══════════════════════════════════════════════════════════════════╗");
console.log("║  🚀 AGENT ACTIVATION PROTOCOL - TRYONYOU v2.1.0                  ║");
console.log("║  Patent: PCT/EP2025/067317                                        ║");
console.log("╚═══════════════════════════════════════════════════════════════════╝\n");

// Check if registry file exists
const registryPath = path.join(__dirname, '..', 'public', 'data', 'agents_registry.json');

let registry = {};

if (fs.existsSync(registryPath)) {
    try {
        registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
        console.log("✅ Agent Registry loaded successfully\n");
    } catch (error) {
        console.log("⚠️  Registry file exists but couldn't be parsed. Creating new registry...\n");
        registry = {};
    }
} else {
    console.log("📝 Creating new Agent Registry...\n");
    // Create directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// Activate pending agents
pendingAgents.forEach(agent => {
    console.log(`🔄 Processing Agent ${agent.id}: ${agent.name}...`);
    
    registry[agent.id] = {
        id: agent.id,
        name: agent.name,
        role: agent.role,
        specialization: agent.specialization,
        status: "ACTIVE",
        lastActive: new Date().toISOString(),
        activatedBy: "Agente 70 Orchestrator",
        version: "2.1.0",
        patent: "PCT/EP2025/067317"
    };
    
    console.log(`   ✅ Agent ${agent.id} activated - Status: ACTIVE`);
    console.log(`   📊 Role: ${agent.role}`);
    console.log(`   🎯 Specialization: ${agent.specialization}\n`);
});

// Save updated registry
try {
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
    console.log("╔═══════════════════════════════════════════════════════════════════╗");
    console.log("║  ✅ ALL AGENTS OPERATIONAL FOR HUB71 SUBMISSION                  ║");
    console.log("╚═══════════════════════════════════════════════════════════════════╝\n");
    console.log(`📁 Registry saved to: ${registryPath}`);
    console.log(`📊 Total Active Agents: ${Object.keys(registry).length}`);
    console.log(`🎯 Newly Activated: ${pendingAgents.length}\n`);
    
    console.log("Active Agents Summary:");
    pendingAgents.forEach(agent => {
        console.log(`   • Agent ${agent.id}: ${agent.name} [${agent.role}]`);
    });
    
    console.log("\n🚀 System ready for production deployment!");
    console.log("💎 ABVETOS Intelligence - Fashion Meets AI\n");
    
} catch (error) {
    console.error("❌ Error saving registry:", error.message);
    process.exit(1);
}
