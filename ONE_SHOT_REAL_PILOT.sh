#!/bin/bash
set -e

echo "======================================="
echo " TRYONYOU – REAL PILOT CREATOR"
echo "======================================="

# ---------- index.html (LANDING) ----------
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRYONYOU – Virtual Try-On Intelligence</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .container {
      text-align: center;
      padding: 40px;
      max-width: 800px;
    }
    h1 {
      font-size: 4rem;
      margin-bottom: 20px;
      font-weight: 900;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .tagline {
      font-size: 1.5rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    .cta-button {
      display: inline-block;
      padding: 20px 60px;
      font-size: 1.3rem;
      font-weight: bold;
      text-decoration: none;
      color: white;
      background: rgba(255,255,255,0.2);
      border: 2px solid white;
      border-radius: 50px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    .cta-button:hover {
      background: white;
      color: #667eea;
      transform: scale(1.05);
    }
    .features {
      margin-top: 60px;
      display: flex;
      gap: 30px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .feature {
      background: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      flex: 1;
      min-width: 200px;
      max-width: 250px;
    }
    .feature h3 {
      margin-bottom: 10px;
      font-size: 1.2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TRYONYOU</h1>
    <p class="tagline">AI-Powered Virtual Try-On Intelligence System</p>
    <a href="pilot.html" class="cta-button">Start Pilot</a>
    
    <div class="features">
      <div class="feature">
        <h3>🎯 Precision Fit</h3>
        <p>Advanced body measurements using AI</p>
      </div>
      <div class="feature">
        <h3>👔 Virtual Try-On</h3>
        <p>See clothes on your digital twin</p>
      </div>
      <div class="feature">
        <h3>⚡ Real-Time</h3>
        <p>Instant results powered by ABVETOS</p>
      </div>
    </div>
  </div>
</body>
</html>
EOF

# ---------- pilot.html (REAL PILOT) ----------
cat > pilot.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRYONYOU – Pilot Running</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0f0f1e;
      min-height: 100vh;
      color: white;
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: rgba(255,255,255,0.05);
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .status-indicator {
      width: 12px;
      height: 12px;
      background: #00ff88;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .pilot-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .pilot-stage {
      text-align: center;
      margin-bottom: 40px;
    }
    .pilot-stage h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .pilot-stage p {
      font-size: 1.2rem;
      opacity: 0.7;
    }
    .workflow {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }
    .step {
      background: rgba(255,255,255,0.05);
      padding: 30px;
      border-radius: 15px;
      border: 2px solid rgba(0,255,136,0.3);
      transition: all 0.3s ease;
    }
    .step:hover {
      border-color: #00ff88;
      transform: translateY(-5px);
    }
    .step-number {
      font-size: 2rem;
      font-weight: bold;
      color: #00ff88;
      margin-bottom: 10px;
    }
    .step h3 {
      margin-bottom: 10px;
      font-size: 1.3rem;
    }
    .step p {
      opacity: 0.7;
      line-height: 1.6;
    }
    .camera-preview {
      margin: 40px auto;
      max-width: 600px;
      background: rgba(255,255,255,0.03);
      border: 2px dashed rgba(0,255,136,0.5);
      border-radius: 15px;
      padding: 60px 40px;
      text-align: center;
    }
    .camera-preview h2 {
      color: #00ff88;
      margin-bottom: 20px;
    }
    .camera-btn {
      padding: 15px 40px;
      font-size: 1.1rem;
      font-weight: bold;
      background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
      color: #0f0f1e;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .camera-btn:hover {
      transform: scale(1.05);
    }
    .back-link {
      display: inline-block;
      margin-top: 40px;
      padding: 10px 30px;
      color: white;
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 20px;
      opacity: 0.7;
      transition: all 0.3s;
    }
    .back-link:hover {
      opacity: 1;
      border-color: white;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">TRYONYOU PILOT</div>
    <div class="status">
      <div class="status-indicator"></div>
      <span>Pilot Running</span>
    </div>
  </div>

  <div class="pilot-container">
    <div class="pilot-stage">
      <h1>🚀 Pilot Mode Active</h1>
      <p>Real-time virtual try-on intelligence system</p>
    </div>

    <div class="workflow">
      <div class="step">
        <div class="step-number">01</div>
        <h3>Initialize</h3>
        <p>Camera and sensors ready. System calibrated for optimal measurement accuracy.</p>
      </div>
      
      <div class="step">
        <div class="step-number">02</div>
        <h3>Measure</h3>
        <p>AI-powered body scanning. Capturing precise measurements in real-time.</p>
      </div>
      
      <div class="step">
        <div class="step-number">03</div>
        <h3>Fit Analysis</h3>
        <p>Matching your measurements with clothing database. Finding perfect fit.</p>
      </div>
      
      <div class="step">
        <div class="step-number">04</div>
        <h3>Visualization</h3>
        <p>Rendering virtual try-on. See how clothes look on your digital twin.</p>
      </div>
    </div>

    <div class="camera-preview">
      <h2>📸 Camera Integration Ready</h2>
      <p style="margin-bottom: 20px;">Start your measurement session</p>
      <button class="camera-btn" onclick="alert('Camera integration will be activated in the next iteration.\n\nCurrent pilot demonstrates:\n✓ Independent routing\n✓ Distinct UI from landing\n✓ Real pilot workflow\n✓ Direct URL access')">
        Activate Camera
      </button>
    </div>

    <div style="text-align: center;">
      <a href="index.html" class="back-link">← Back to Landing</a>
    </div>
  </div>
</body>
</html>
EOF

echo "✅ DONE"
echo "Landing  → /index.html"
echo "Pilot    → /pilot.html"
echo "Commit & deploy. That's it."
