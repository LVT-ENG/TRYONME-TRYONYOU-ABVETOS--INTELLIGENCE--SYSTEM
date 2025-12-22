import os

# --- ARQUITECTURA FINAL TRYONYOU (ONE-SHOT COMPLETE) ---

# 1. Landing Page (Entry Point)
INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYONYOU - Intelligence System</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }
        p {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            opacity: 0.9;
        }
        a {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 1rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.2rem;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }
        a:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>TRYONYOU</h1>
        <p>The intelligence layer for virtual retail.</p>
        <a href="pilot.html">LAUNCH PILOT →</a>
    </div>
</body>
</html>"""

# 2. Pilot Runtime (Con Deep Linking e Inteligencia)
PILOT_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYONYOU Pilot - Intelligence Runtime</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #0f172a;
            color: white;
            min-height: 100vh;
            padding: 2rem;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
        }
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        .header p {
            opacity: 0.9;
            font-size: 1.1rem;
        }
        .content {
            background: #1e293b;
            padding: 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
        }
        .status {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .info-box {
            background: #334155;
            padding: 1.5rem;
            border-radius: 12px;
            margin-top: 1rem;
        }
        .info-box h3 {
            color: #a78bfa;
            margin-bottom: 1rem;
        }
        .info-box p {
            line-height: 1.6;
            margin-bottom: 0.5rem;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }
        .button:hover {
            opacity: 0.9;
        }
        code {
            background: #0f172a;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 TRYONYOU Pilot</h1>
        <p>Intelligence System Runtime - Active</p>
    </div>

    <div class="content">
        <span class="status">✓ SYSTEM ONLINE</span>
        <h2>Pilot Runtime Status</h2>
        
        <div class="info-box">
            <h3>📋 Current Configuration</h3>
            <p><strong>Item Parameter:</strong> <code id="item-param">None</code></p>
            <p><strong>Deep Link Support:</strong> <code>Enabled</code></p>
            <p><strong>Intelligence API:</strong> <code>Ready (Issue #1292)</code></p>
        </div>

        <div class="info-box">
            <h3>🔗 Deep Linking</h3>
            <p>Test the pilot with: <code>pilot.html?item=jacket_test</code></p>
            <p>The system will automatically parse URL parameters and activate the intelligence layer.</p>
        </div>

        <div class="info-box">
            <h3>🎯 Features</h3>
            <p>• Persistent state (refresh-resistant)</p>
            <p>• Direct URL access</p>
            <p>• Parameter parsing</p>
            <p>• Intelligence system integration</p>
        </div>

        <button class="button" onclick="testDeepLink()">Test Deep Link</button>
        <a href="index.html" class="button" style="margin-left: 1rem;">Back to Landing</a>
    </div>

    <script>
        // Parse URL parameters on load
        function getUrlParameter(name) {
            name = name.replace(/\\[/g, '\\\\[').replace(/\\]/g, '\\\\]');
            const regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
        }

        // Initialize on load
        window.addEventListener('DOMContentLoaded', function() {
            const itemParam = getUrlParameter('item');
            if (itemParam) {
                document.getElementById('item-param').textContent = itemParam;
                console.log('Intelligence System activated for item:', itemParam);
                // Here you would integrate with the Intelligence API from Issue #1292
            } else {
                document.getElementById('item-param').textContent = 'No item specified';
            }
        });

        // Test deep linking
        function testDeepLink() {
            window.location.href = 'pilot.html?item=jacket_test';
        }
    </script>
</body>
</html>"""

# 3. GitHub Action (Auto-Deploy)
DEPLOY_YML = """name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4"""

def build():
    # Asegurar directorios
    os.makedirs(".github/workflows", exist_ok=True)
    
    # Generar archivos
    files = {
        "index.html": INDEX_HTML,
        "pilot.html": PILOT_HTML,
        ".github/workflows/deploy.yml": DEPLOY_YML
    }
    
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ Created: {path}")

    print("-" * 30)
    print("🚀 ARCHITECTURE DEPLOYED SUCCESSFULLY")
    print("Deep Link Test: pilot.html?item=jacket_test")

if __name__ == "__main__":
    build()
