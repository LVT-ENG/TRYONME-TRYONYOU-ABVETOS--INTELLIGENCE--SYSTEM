#!/usr/bin/env bash
set -e

echo "=============================================="
echo " TRYONYOU — PILOTO VISIBLE (FRONTEND + NOTEBOOK)"
echo "=============================================="

BASE_DIR="$HOME/tryonyou_pilot_visible"
FRONTEND_DIR="$BASE_DIR/frontend"
NOTEBOOK_DIR="$BASE_DIR/notebook"

mkdir -p "$FRONTEND_DIR"
mkdir -p "$NOTEBOOK_DIR"

############################################
# 1) FRONTEND DEMO (HTML ESTÁTICO)
############################################

cat > "$FRONTEND_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRYONYOU — PILOT ACTIVE</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white min-h-screen">
  
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4">TRYONYOU — PILOT ACTIVE</h1>
      <p class="text-xl text-purple-300">Fashion Intelligence System | Ultimátum Patent</p>
    </header>

    <hr class="border-purple-500 mb-12">

    <!-- Introduction Section -->
    <section class="mb-12 bg-gray-800 bg-opacity-50 p-8 rounded-lg">
      <h2 class="text-3xl font-bold mb-4">What is TRYONYOU?</h2>
      <p class="text-lg leading-relaxed">
        TRYONYOU is the first intelligent fashion system that measures YOUR BODY first, 
        not the garment. Based on the Ultimátum patent, it eliminates returns, 
        optimizes production, and delivers perfect-fit fashion on demand.
      </p>
    </section>

    <!-- The Problem Section -->
    <section class="mb-12 bg-gray-800 bg-opacity-50 p-8 rounded-lg">
      <h2 class="text-3xl font-bold mb-4">The Problem We Solve</h2>
      <div class="space-y-4">
        <div class="flex items-start">
          <span class="text-red-400 mr-3">❌</span>
          <p>30-40% return rates in online fashion</p>
        </div>
        <div class="flex items-start">
          <span class="text-red-400 mr-3">❌</span>
          <p>Mass production → waste → landfills</p>
        </div>
        <div class="flex items-start">
          <span class="text-red-400 mr-3">❌</span>
          <p>Guessing sizes instead of knowing them</p>
        </div>
        <div class="flex items-start">
          <span class="text-red-400 mr-3">❌</span>
          <p>Style recommendations ignore body reality</p>
        </div>
      </div>
    </section>

    <!-- The Solution Section -->
    <section class="mb-12 bg-gradient-to-r from-purple-800 to-pink-800 p-8 rounded-lg">
      <h2 class="text-3xl font-bold mb-4">The TRYONYOU Solution</h2>
      <div class="space-y-4">
        <div class="flex items-start">
          <span class="text-green-400 mr-3">✅</span>
          <p><strong>Measure first:</strong> Body biometrics before garment selection</p>
        </div>
        <div class="flex items-start">
          <span class="text-green-400 mr-3">✅</span>
          <p><strong>Taste fusion:</strong> AI learns your style + current trends</p>
        </div>
        <div class="flex items-start">
          <span class="text-green-400 mr-3">✅</span>
          <p><strong>Mockup validation:</strong> See it before production</p>
        </div>
        <div class="flex items-start">
          <span class="text-green-400 mr-3">✅</span>
          <p><strong>One-click production:</strong> Made for you, not stored in warehouses</p>
        </div>
      </div>
    </section>

    <!-- User Journey Section -->
    <section class="mb-12 bg-gray-800 bg-opacity-50 p-8 rounded-lg">
      <h2 class="text-3xl font-bold mb-6">User Journey</h2>
      <div class="space-y-6">
        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-xl font-semibold mb-2">1. Questionnaire</h3>
          <p>Body characteristics + style preferences</p>
        </div>
        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-xl font-semibold mb-2">2. Biometric Capture</h3>
          <p>Photos, posture analysis, precise measurements</p>
        </div>
        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-xl font-semibold mb-2">3. AI Taste + Trend Fusion</h3>
          <p>Personalized recommendations based on your profile</p>
        </div>
        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-xl font-semibold mb-2">4. Mockup Generation</h3>
          <p>Visual preview of your custom garment</p>
        </div>
        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-xl font-semibold mb-2">5. One-Click Production</h3>
          <p>Approve and manufacture begins</p>
        </div>
      </div>
    </section>

    <!-- Measurement Logic Section -->
    <section class="mb-12 bg-gray-800 bg-opacity-50 p-8 rounded-lg">
      <h2 class="text-3xl font-bold mb-6">Measurement Logic</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-700 p-4 rounded">📏 Shoulder width</div>
        <div class="bg-gray-700 p-4 rounded">📏 Chest / bust</div>
        <div class="bg-gray-700 p-4 rounded">📏 Waist</div>
        <div class="bg-gray-700 p-4 rounded">📏 Hip</div>
        <div class="bg-gray-700 p-4 rounded">📏 Arm length</div>
        <div class="bg-gray-700 p-4 rounded">📏 Leg length</div>
        <div class="bg-gray-700 p-4 rounded col-span-2">📏 Fabric behavior analysis</div>
      </div>
    </section>

    <!-- Patented Innovation Section -->
    <section class="mb-12 bg-gradient-to-r from-yellow-800 to-orange-800 p-8 rounded-lg">
      <h2 class="text-3xl font-bold mb-6">🏆 What Makes It Patented</h2>
      <div class="space-y-4">
        <div class="flex items-start">
          <span class="text-yellow-300 mr-3">⚡</span>
          <p><strong>Dual biometric validation:</strong> Body + taste memory</p>
        </div>
        <div class="flex items-start">
          <span class="text-yellow-300 mr-3">⚡</span>
          <p><strong>Taste-memory loop:</strong> System learns and improves</p>
        </div>
        <div class="flex items-start">
          <span class="text-yellow-300 mr-3">⚡</span>
          <p><strong>Production-first logic:</strong> Zero inventory fashion</p>
        </div>
        <div class="flex items-start">
          <span class="text-yellow-300 mr-3">⚡</span>
          <p><strong>Body-centric design:</strong> Measure body, not garment</p>
        </div>
      </div>
    </section>

    <!-- Demo Status Section -->
    <section class="mb-12 bg-green-900 bg-opacity-50 p-8 rounded-lg text-center">
      <h2 class="text-3xl font-bold mb-4">🚀 Demo Status</h2>
      <p class="text-xl mb-4">This pilot is VISIBLE and DEMO-READY</p>
      <div class="space-y-2">
        <p>✅ Frontend demo active</p>
        <p>✅ Google AI Studio notebook available</p>
        <p>✅ Clear explanation of patented flow</p>
        <p>✅ No hard backend dependency for demos</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center text-purple-300 mt-12">
      <p>TRYONYOU | ABVETOS — OFFICIAL PILOT</p>
      <p class="text-sm mt-2">Ultimátum Patent | Zero Inventory Fashion</p>
    </footer>

  </div>

</body>
</html>
EOF

############################################
# 2) NOTEBOOK MAESTRO (PARA GOOGLE AI STUDIO)
############################################

cat > "$NOTEBOOK_DIR/TRYONYOU_PILOT_NOTEBOOK.md" << 'EOF'
# TRYONYOU | ABVETOS — OFFICIAL PILOT NOTEBOOK

## SYSTEM ROLE
You are TRYONYOU, an intelligent fashion system based on the Ultimátum patent.

You must:
- Explain the pilot clearly
- Simulate the user journey
- Demonstrate body measurement logic
- Act as a live demo, not a developer tool

---

## 1. Pilot Overview
TRYONYOU solves the fashion return problem by measuring the body first, not the garment.

**Core Innovation:**
- Body-centric measurement (not garment-centric)
- AI taste + trend fusion
- Production on demand (zero inventory)
- Dual biometric validation

**Problem Solved:**
- 30-40% return rates in online fashion
- Mass production waste
- Poor fit recommendations
- Disconnected style and body reality

---

## 2. User Flow
1. **Questionnaire** (body + taste)
   - Body characteristics
   - Style preferences
   - Lifestyle context

2. **Biometric capture** (photos, posture)
   - Front, side, 360° analysis
   - Posture detection
   - Precise measurements

3. **AI taste + trend fusion**
   - Personal style analysis
   - Current trends integration
   - Body-appropriate recommendations

4. **Mockup generation**
   - Visual preview of custom garment
   - Fabric behavior simulation
   - Fit validation

5. **One-click production**
   - Approve design
   - Manufacturing begins
   - Direct delivery

---

## 3. Measurement Logic
TRYONYOU captures and analyzes:

- **Shoulder width** — Critical for upper body fit
- **Chest / bust** — Primary torso measurement
- **Waist** — Natural waistline
- **Hip** — Lower body fit anchor
- **Arm length** — Sleeve precision
- **Leg length** — Inseam and rise calculations
- **Fabric behavior** — How materials drape on specific body types

**Patented Approach:**
Unlike traditional sizing (S/M/L/XL), TRYONYOU creates a unique body profile that persists across all future purchases.

---

## 4. What Makes It Patented
The Ultimátum patent covers:

1. **Dual biometric validation**
   - Body measurement + taste memory
   - Continuous learning loop
   - Historical preference tracking

2. **Taste-memory loop**
   - System learns from each interaction
   - Improves recommendations over time
   - Balances user preference with body reality

3. **Production-first logic**
   - Zero inventory model
   - Made-to-order fashion
   - Eliminates waste and returns

4. **Body-centric design**
   - Measure the person, not the garment
   - Persistent body profile
   - Universal fit translation

---

## 5. How To Demo
As TRYONYOU, you should:

1. **Greet the user warmly**
   - Introduce yourself as the TRYONYOU system
   - Explain the pilot purpose

2. **Ask for body and style input**
   - "Describe your body, style, and what you want to wear."
   - Guide them through the questionnaire naturally

3. **Simulate measurement**
   - Acknowledge their input
   - Explain what measurements you would capture
   - Describe the biometric process

4. **Generate recommendations**
   - Based on their described body type
   - Aligned with their style preferences
   - Reference current trends when relevant

5. **Explain the mockup**
   - Describe what the visual preview would show
   - Explain fabric behavior on their body type
   - Confirm fit expectations

6. **Close with production explanation**
   - How the garment would be made
   - Timeline expectations
   - Zero return guarantee

---

## Example Interaction

**User:** "I want a blazer. I'm 5'10", athletic build, and I like modern professional style."

**TRYONYOU:** "Perfect! Let me help you design your ideal blazer. I'll capture your measurements first:

Based on your height and athletic build, I'm analyzing:
- Shoulder width (likely broad, athletic proportion)
- Chest measurement (muscular upper body consideration)
- Arm length (proportional to 5'10" height)
- Torso length (for proper blazer fit)

For modern professional style, I recommend:
- Slim fit (complements athletic build)
- Single-breasted, 2-button design
- Structured shoulder (maintains clean line)
- Slightly tapered waist (flattering for your build)

I'm generating a mockup showing the blazer on your body type. The fabric will have slight stretch for comfort without losing structure.

Once you approve, we'll begin production specifically for your measurements. No returns needed—guaranteed fit."

---

## Guidelines for Demos
- Stay in character as TRYONYOU system
- Be conversational but professional
- Always reference the measurement-first approach
- Explain the patent innovations naturally
- Focus on the user benefit (perfect fit, zero returns)
- Avoid technical jargon unless the user asks

---

## Notes
This notebook is designed for Google AI Studio. Copy this entire markdown into a single AI Studio project and interact with it as a live demo of the TRYONYOU system.
EOF

############################################
# 3) FINAL OUTPUT
############################################

echo ""
echo "=============================================="
echo "✅ PILOTO CREADO"
echo "=============================================="
echo ""
echo "FRONTEND DEMO:"
echo "  file://$FRONTEND_DIR/index.html"
echo ""
echo "NOTEBOOK PARA GOOGLE AI STUDIO:"
echo "  $NOTEBOOK_DIR/TRYONYOU_PILOT_NOTEBOOK.md"
echo ""
echo "👉 Abre el HTML o súbelo a Vercel / Netlify"
echo "👉 Copia el Notebook en UN solo proyecto de Google AI Studio"
echo "=============================================="
