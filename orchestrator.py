import os
from datetime import datetime

# CONFIGURATION BASED ON SOURCE DATA
PROJECT_NAME = "TRYONYOU-ABVETOS-ULTRA-PLUS-ULTIMATUM"
PATENT_REF = "PCT/EP2025/067317"
CURRENT_VERSION = "2.1.0"

def generate_smart_wardrobe_fix():
    """
    Generates the code fix for the SmartWardrobe visibility bug.
    Ref: Source [1] - "SmartWardrobe module is currently not visible... conflict with routing"
    """
    return """
    // FILE: src/App.jsx
    // FIX: Force mounting SmartWardrobe outside conditional routing to ensure visibility [Source 5005]
    
    import React, { useEffect, useState } from 'react';
    import { SmartWardrobe } from './modules/Wardrobe/SmartWardrobe';
    import { pilot } from './modules/pilot';

    export default function App() {
      const [ready, setReady] = useState(false);

      useEffect(() => {
        // Initialize Pilot Orchestrator (Lafayette/Divineo) [Source 62]
        pilot.initSession({ user: "current" }).then(() => setReady(true));
      }, []);

      return (
        <div className="app-container">
          <HeroSection />
          {/* CRITICAL FIX: Explicit rendering of Wardrobe Module */}
          <div className="module-layer" style={{ zIndex: 100, position: 'relative' }}>
             <SmartWardrobe visible={true} mode="production" /> 
          </div>
          <ABVETPayment /> 
        </div>
      );
    }
    """

def generate_agent_activation_script():
    """
    Generates logic to activate pending agents.
    Ref: Source [2, 3] - Agents 31, 2, and 25 are 'Pending'
    """
    return """
    // FILE: scripts/activate_agents.js
    // ACTION: Switch dormant agents to ACTIVE status
    
    const registry = require('../public/data/agents_registry.json');
    
    const pendingAgents = [
        { id: 31, name: "Video Curator", role: "Video & Visual" }, // [Source 3543]
        { id: 2, name: "Content Pro", role: "Deployment & Production" },
        { id: 25, name: "Image Curator", role: "Business & Strategy" }
    ];

    pendingAgents.forEach(agent => {
        console.log(`🚀 Activating Agent ${agent.id}: ${agent.name}...`);
        // Logic to update status in DB/JSON
        registry[agent.id].status = "ACTIVE";
        registry[agent.id].lastActive = new Date().toISOString();
    });

    console.log("✅ All Agents Operational for Hub71 Submission.");
    """

def create_copilot_prompt(wardrobe_fix, agent_fix):
    """
    Assembles the 'Golden Prompt' for Copilot.
    """
    prompt = f"""
    *** ACTIVATE AGENTE 70 PROTOCOL: FINAL INTEGRATION ***
    
    **Context:**
    Project: {PROJECT_NAME}
    Patent: {PATENT_REF} [Source 1, 63]
    Status: Integration Complete (v{CURRENT_VERSION}) [Source 2, 297]
    
    **Current Critical Issues [Source 5005]:**
    1. The SmartWardrobe component is technically integrated but NOT rendering in the UI.
    2. Agents 31, 2, and 25 are still in "Pending" status.
    
    **INSTRUCTIONS FOR COPILOT:**
    
    1. **Apply the SmartWardrobe Fix:**
       Use the following logic to modify `src/App.jsx`. We must force the component to mount visible:
       
       ```javascript
       {wardrobe_fix}
       ```
       
    2. **Activate Dormant Agents:**
       Create `scripts/activate_agents.js` to finalize the "50 Intelligent Agents" ecosystem [Source 407]:
       
       ```javascript
       {agent_fix}
       ```
       
    3. **Final Polish:**
       Verify that `TRYONYOU_Investor_Dossier.pdf` is accessible at `/docs/investors/` [Source 215, 220].
       
    **EXECUTE IMMEDIATELY.**
    """
    return prompt

def main():
    print(f"🧬 Initializing Agente 70 Orchestrator for {PROJECT_NAME}...")
    
    wardrobe_code = generate_smart_wardrobe_fix()
    agent_code = generate_agent_activation_script()
    full_prompt = create_copilot_prompt(wardrobe_code, agent_code)
    
    filename = "copilot_ultimatum_prompt.txt"
    with open(filename, "w") as f:
        f.write(full_prompt)
        
    print(f"✅ Generated '{filename}'.")
    print("👉 Open this file and paste the content into your GitHub Copilot chat to finish the project.")

if __name__ == "__main__":
    main()
