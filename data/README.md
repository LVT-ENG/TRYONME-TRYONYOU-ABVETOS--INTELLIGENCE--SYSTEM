# ABVETOS Agent Registry

## Overview

The `agents_registry.json` file contains the official registry of all 81 intelligent agents in the TRYONYOU/ABVETOS Intelligence System for Q4 2025.

## Structure

The registry is organized into the following sections:

### Meta Information
- **version**: Current version of the registry (2025-Q4)
- **total_agents**: Total number of agents (81)
- **active_count**: Number of active agents (15)
- **backstage_count**: Number of backstage agents (60)
- **watchdog_count**: Number of watchdog agents (3)
- **core_count**: Number of core agents (3)
- **generated_by**: Agent 70 – ABVETOS Core
- **date**: Registry generation date

### Agent Categories

#### Core Agents (3)
The foundational orchestration layer:
- **CORE-01**: ABVETOS Core - Global orchestrator and automation nucleus
- **CORE-02**: Agent 70 - Decision custodian and strategic supervision
- **CORE-03**: ABVET - Bot orchestrator connected to Telegram and Deploy Express

#### Active Agents (15)
Currently active and operational agents handling critical functions:
- Project management (PMV)
- Deployment and CI/CD
- UX optimization
- Brand management
- Content creation
- AI-powered recommendations
- And more...

#### Backstage Agents (60)
Supporting agents working behind the scenes:
- Technical specifications management
- Social media automation
- Image processing
- Integration connectors
- Analytics and monitoring
- And many more specialized functions...

#### Watchdog Agents (3)
Always-active monitoring and security agents:
- **W-01**: Security & Token Guardian - Protects keys, .env, and system encryption
- **W-02**: Compliance Auditor - Regulatory compliance auditing
- **W-03**: AI Ethics & Transparency Officer - AI ethics and transparency oversight

These watchdog agents operate in "silent mode" and are always enabled.

## Usage

### Loading the Registry

**JavaScript/Node.js:**
```javascript
import { readFileSync } from 'fs';
const registry = JSON.parse(readFileSync('data/agents_registry.json', 'utf-8'));

// Access metadata
console.log(registry.meta.version); // "2025-Q4"
console.log(registry.meta.total_agents); // 81

// Access agents by category
const coreAgents = registry.core;
const activeAgents = registry.active;
const backstageAgents = registry.backstage;
const watchdogAgents = registry.watchdog;
```

**Python:**
```python
import json

with open('data/agents_registry.json', 'r') as f:
    registry = json.load(f)

# Access metadata
print(registry['meta']['version'])  # "2025-Q4"
print(registry['meta']['total_agents'])  # 81

# Access agents by category
core_agents = registry['core']
active_agents = registry['active']
backstage_agents = registry['backstage']
watchdog_agents = registry['watchdog']
```

## Agent Permissions

According to the implementation specifications:

- **Agent 70** has permissions to promote or deactivate any agent
- **ABVETOS Core** loads this registry at startup and updates in-memory tables (agents_active, agents_backstage, agents_watchdog)
- **PMV Dashboard** reflects only active agents and their progress states
- **Watchdog agents** (Security & Token Guardian, AI Ethics Officer, Compliance Auditor) remain always enabled in silent mode

## Maintenance

This registry is maintained by **Agent 70 – ABVETOS Core** and should be updated when:
- New agents are added to the system
- Agents are promoted from backstage to active status
- Agents are deprecated or removed
- Major system updates require agent reorganization

## Version History

- **2025-Q4** (2025-11-01): Official registry with 81 agents
  - 3 Core agents
  - 15 Active agents
  - 60 Backstage agents
  - 3 Watchdog agents (always active)
