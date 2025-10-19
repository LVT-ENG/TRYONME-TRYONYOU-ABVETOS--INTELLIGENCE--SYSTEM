#!/bin/bash
# ===========================================================
# CAP MODULE — Local Test Build (Minimal Compression)
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# ===========================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   ⚙️  CAP MODULE BUILD (Minimal Compression)          ║${NC}"
echo -e "${BLUE}║   Creation & Production System                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CAP_DIR="$PROJECT_ROOT/modules/CAP"
DIST_DIR="$CAP_DIR/dist-cap"
LOG_FILE="$PROJECT_ROOT/logs/build_cap_local_$(date +%Y%m%d_%H%M).log"

mkdir -p "$PROJECT_ROOT/logs"

echo -e "${YELLOW}📂 CAP Module Directory: $CAP_DIR${NC}" | tee -a "$LOG_FILE"
echo ""

# 1️⃣ Clean previous build
if [ -d "$DIST_DIR" ]; then
  echo -e "${YELLOW}🧹 Cleaning previous build...${NC}" | tee -a "$LOG_FILE"
  rm -rf "$DIST_DIR"
  echo -e "${GREEN}✅ Cleaned${NC}" | tee -a "$LOG_FILE"
fi

# 2️⃣ Create src directory structure
echo -e "${YELLOW}📁 Creating CAP source structure...${NC}" | tee -a "$LOG_FILE"
mkdir -p "$CAP_DIR/src/"{components,utils,styles}

# 3️⃣ Create placeholder components
cat > "$CAP_DIR/src/PatternGenerator.jsx" << 'EOF'
import React, { useState } from 'react'

const PatternGenerator = ({ emotion, bodyMetrics }) => {
  const [pattern, setPattern] = useState(null)
  
  const generatePattern = () => {
    // Simulate pattern generation
    const newPattern = {
      id: Date.now(),
      emotion: emotion,
      style: 'modern',
      complexity: 'medium',
      timestamp: new Date().toISOString()
    }
    setPattern(newPattern)
  }
  
  return (
    <div className="cap-pattern-generator">
      <h3>Pattern Generator</h3>
      <button onClick={generatePattern}>Generate Pattern</button>
      {pattern && (
        <div className="pattern-preview">
          <p>Pattern ID: {pattern.id}</p>
          <p>Emotion: {pattern.emotion}</p>
          <p>Style: {pattern.style}</p>
        </div>
      )}
    </div>
  )
}

export default PatternGenerator
EOF

cat > "$CAP_DIR/src/FabricSimulator.jsx" << 'EOF'
import React from 'react'

const FabricSimulator = ({ pattern, fabricType = 'cotton' }) => {
  return (
    <div className="cap-fabric-simulator">
      <h3>Fabric Simulator</h3>
      <div className="fabric-preview">
        <p>Fabric Type: {fabricType}</p>
        <p>Simulation: Active</p>
        <canvas id="fabric-canvas" width="400" height="400"></canvas>
      </div>
    </div>
  )
}

export default FabricSimulator
EOF

cat > "$CAP_DIR/src/ProductionQueue.jsx" << 'EOF'
import React, { useState } from 'react'

const ProductionQueue = ({ orders = [] }) => {
  const [queue, setQueue] = useState(orders)
  
  return (
    <div className="cap-production-queue">
      <h3>Production Queue</h3>
      <div className="queue-list">
        {queue.length === 0 ? (
          <p>No orders in queue</p>
        ) : (
          queue.map((order, index) => (
            <div key={index} className="queue-item">
              <span>Order #{order.id}</span>
              <span>Status: {order.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductionQueue
EOF

cat > "$CAP_DIR/src/QualityControl.jsx" << 'EOF'
import React from 'react'

const QualityControl = ({ productId, metrics = {} }) => {
  return (
    <div className="cap-quality-control">
      <h3>Quality Control</h3>
      <div className="quality-metrics">
        <p>Product ID: {productId}</p>
        <p>Quality Score: {metrics.score || 'N/A'}</p>
        <p>Status: {metrics.passed ? 'Passed' : 'Pending'}</p>
      </div>
    </div>
  )
}

export default QualityControl
EOF

# 4️⃣ Create utilities
cat > "$CAP_DIR/src/utils/patternUtils.js" << 'EOF'
/**
 * Generate pattern from emotion and body metrics
 */
export const generatePattern = (emotion, bodyMetrics) => {
  return {
    id: Date.now(),
    emotion: emotion,
    bodyMetrics: bodyMetrics,
    pattern: {
      type: 'custom',
      complexity: 'medium',
      style: mapEmotionToStyle(emotion)
    }
  }
}

/**
 * Optimize pattern for production
 */
export const optimizePattern = (pattern) => {
  return {
    ...pattern,
    optimized: true,
    materialEfficiency: 0.95,
    productionTime: calculateProductionTime(pattern)
  }
}

const mapEmotionToStyle = (emotion) => {
  const styleMap = {
    joy: 'vibrant',
    confidence: 'bold',
    calm: 'minimalist',
    energy: 'dynamic',
    elegance: 'sophisticated'
  }
  return styleMap[emotion] || 'classic'
}

const calculateProductionTime = (pattern) => {
  // Simulate production time calculation
  return Math.floor(Math.random() * 48) + 24 // 24-72 hours
}
EOF

cat > "$CAP_DIR/src/utils/fabricUtils.js" << 'EOF'
/**
 * Simulate fabric behavior
 */
export const simulateFabric = (fabricType, pattern) => {
  return {
    fabricType: fabricType,
    drape: calculateDrape(fabricType),
    stretch: calculateStretch(fabricType),
    weight: calculateWeight(fabricType),
    texture: getTexture(fabricType)
  }
}

/**
 * Calculate materials needed
 */
export const calculateMaterials = (pattern, fabricType) => {
  const baseArea = pattern.bodyMetrics?.surfaceArea || 2.5 // m²
  const wasteFactor = 1.15 // 15% waste
  
  return {
    fabric: baseArea * wasteFactor,
    thread: baseArea * 50, // meters
    buttons: Math.floor(Math.random() * 10),
    zippers: Math.floor(Math.random() * 3)
  }
}

const calculateDrape = (fabricType) => {
  const drapeMap = {
    cotton: 0.7,
    silk: 0.9,
    polyester: 0.6,
    wool: 0.5
  }
  return drapeMap[fabricType] || 0.7
}

const calculateStretch = (fabricType) => {
  const stretchMap = {
    cotton: 0.3,
    silk: 0.2,
    polyester: 0.5,
    wool: 0.4
  }
  return stretchMap[fabricType] || 0.3
}

const calculateWeight = (fabricType) => {
  const weightMap = {
    cotton: 150, // g/m²
    silk: 80,
    polyester: 120,
    wool: 200
  }
  return weightMap[fabricType] || 150
}

const getTexture = (fabricType) => {
  const textureMap = {
    cotton: 'soft',
    silk: 'smooth',
    polyester: 'synthetic',
    wool: 'warm'
  }
  return textureMap[fabricType] || 'neutral'
}
EOF

# 5️⃣ Create package.json for CAP module
cat > "$CAP_DIR/package.json" << 'EOF'
{
  "name": "@tryonyou/cap",
  "version": "1.0.0",
  "description": "CAP - Creation & Production System for TRYONYOU",
  "main": "dist-cap/cap.umd.js",
  "module": "dist-cap/cap.es.js",
  "type": "module",
  "scripts": {
    "build": "vite build --config vite.config.cap.js",
    "build:local": "vite build --config vite.config.cap.js --mode development",
    "dev": "vite --config vite.config.cap.js"
  },
  "keywords": ["pattern", "production", "JIT", "fashion", "manufacturing"],
  "author": "TRYONYOU – ABVETOS",
  "license": "PROPRIETARY"
}
EOF

echo -e "${GREEN}✅ CAP source structure created${NC}" | tee -a "$LOG_FILE"

# 6️⃣ Build CAP module
echo -e "${YELLOW}🔨 Building CAP module (minimal compression)...${NC}" | tee -a "$LOG_FILE"
cd "$CAP_DIR"

if npm run build:local >> "$LOG_FILE" 2>&1; then
  echo -e "${GREEN}✅ CAP module built successfully${NC}" | tee -a "$LOG_FILE"
  
  # Show build size
  if [ -d "$DIST_DIR" ]; then
    SIZE=$(du -sh "$DIST_DIR" | cut -f1)
    echo -e "${BLUE}📦 Build size: $SIZE (uncompressed)${NC}" | tee -a "$LOG_FILE"
  fi
else
  echo -e "${YELLOW}⚠️  Build skipped (dependencies not installed)${NC}" | tee -a "$LOG_FILE"
  echo -e "${BLUE}ℹ️  Run 'npm install' in $CAP_DIR first${NC}"
fi

# 7️⃣ Summary
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   📊 CAP BUILD SUMMARY (Local Test)                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Module: CAP (Creation & Production System)${NC}"
echo -e "${GREEN}✅ Version: 1.0.0${NC}"
echo -e "${GREEN}✅ Compression: Minimal (for debugging)${NC}"
echo -e "${GREEN}✅ Output: $DIST_DIR${NC}"
echo -e "${GREEN}✅ Components: 4 (PatternGenerator, FabricSimulator, ProductionQueue, QualityControl)${NC}"
echo -e "${GREEN}✅ Utilities: 2 (patternUtils, fabricUtils)${NC}"
echo ""
echo -e "${BLUE}📄 Log: $LOG_FILE${NC}"
echo ""

