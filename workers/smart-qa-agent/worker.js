/**
 * Smart QA Agent - Cloudflare Worker
 * Automatiza el control de calidad de cada deployment
 * @version 1.0.0
 */

// Configuración
const CONFIG = {
  MAX_RESPONSE_TIME: 3000, // 3 segundos
  TIMEOUT: 30000, // 30 segundos
  USER_AGENT: 'TRYONYOU-QA-Agent/1.0',
};

// Clase principal del QA Agent
class SmartQAAgent {
  constructor(env) {
    this.env = env;
    this.db = env.QA_DB;
    this.kv = env.QA_CONFIG;
  }

  /**
   * Ejecutar suite completa de tests
   */
  async runQASuite(deployId, targetUrl) {
    const startTime = Date.now();
    const results = {
      deployId,
      targetUrl,
      timestamp: new Date().toISOString(),
      tests: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0,
      },
    };

    try {
      // Test 1: Verificación de rutas HTTP
      results.tests.push(await this.testHttpRoutes(targetUrl));

      // Test 2: Detección de assets faltantes
      results.tests.push(await this.testAssets(targetUrl));

      // Test 3: Verificación de enlaces rotos
      results.tests.push(await this.testBrokenLinks(targetUrl));

      // Test 4: Performance básica
      results.tests.push(await this.testPerformance(targetUrl));

      // Test 5: Validación de metadata
      results.tests.push(await this.testMetadata(targetUrl));

      // Calcular resumen
      results.tests.forEach((test) => {
        results.summary.total++;
        if (test.status === 'passed') results.summary.passed++;
        if (test.status === 'failed') results.summary.failed++;
        if (test.status === 'warning') results.summary.warnings++;
      });

      results.duration = Date.now() - startTime;
      results.status = results.summary.failed === 0 ? 'success' : 'failed';

      // Guardar resultados en D1
      await this.saveResults(results);

      // Enviar notificación si hay fallos
      if (results.status === 'failed') {
        await this.sendNotification(results);
      }

      return results;
    } catch (error) {
      results.status = 'error';
      results.error = error.message;
      await this.saveResults(results);
      throw error;
    }
  }

  /**
   * Test 1: Verificar rutas HTTP principales
   */
  async testHttpRoutes(baseUrl) {
    const test = {
      name: 'HTTP Routes Verification',
      status: 'passed',
      details: [],
    };

    const routes = ['/', '/about', '/api/health'];

    for (const route of routes) {
      try {
        const url = new URL(route, baseUrl).toString();
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'User-Agent': CONFIG.USER_AGENT },
          signal: AbortSignal.timeout(CONFIG.TIMEOUT),
        });

        const detail = {
          route,
          status: response.status,
          ok: response.ok,
        };

        if (!response.ok) {
          test.status = 'failed';
          detail.error = `HTTP ${response.status}`;
        }

        test.details.push(detail);
      } catch (error) {
        test.status = 'failed';
        test.details.push({
          route,
          error: error.message,
        });
      }
    }

    return test;
  }

  /**
   * Test 2: Verificar assets (CSS, JS, imágenes)
   */
  async testAssets(baseUrl) {
    const test = {
      name: 'Assets Verification',
      status: 'passed',
      details: [],
    };

    try {
      const response = await fetch(baseUrl, {
        headers: { 'User-Agent': CONFIG.USER_AGENT },
      });
      const html = await response.text();

      // Extraer assets del HTML
      const cssMatches = html.match(/href=["']([^"']+\.css[^"']*)["']/g) || [];
      const jsMatches = html.match(/src=["']([^"']+\.js[^"']*)["']/g) || [];

      const assets = [
        ...cssMatches.map((m) => m.match(/["']([^"']+)["']/)[1]),
        ...jsMatches.map((m) => m.match(/["']([^"']+)["']/)[1]),
      ];

      // Verificar cada asset (máximo 10 para no exceder límites)
      const assetsToCheck = assets.slice(0, 10);
      
      for (const asset of assetsToCheck) {
        try {
          const assetUrl = new URL(asset, baseUrl).toString();
          const assetResponse = await fetch(assetUrl, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000),
          });

          if (!assetResponse.ok) {
            test.status = 'warning';
            test.details.push({
              asset,
              status: assetResponse.status,
              error: 'Asset not found',
            });
          }
        } catch (error) {
          test.status = 'warning';
          test.details.push({
            asset,
            error: error.message,
          });
        }
      }

      test.details.push({
        totalAssets: assets.length,
        checked: assetsToCheck.length,
      });
    } catch (error) {
      test.status = 'failed';
      test.details.push({ error: error.message });
    }

    return test;
  }

  /**
   * Test 3: Verificar enlaces rotos
   */
  async testBrokenLinks(baseUrl) {
    const test = {
      name: 'Broken Links Check',
      status: 'passed',
      details: [],
    };

    try {
      const response = await fetch(baseUrl);
      const html = await response.text();

      // Extraer enlaces internos
      const linkMatches = html.match(/href=["']([^"']+)["']/g) || [];
      const links = linkMatches
        .map((m) => m.match(/["']([^"']+)["']/)[1])
        .filter((link) => link.startsWith('/') || link.startsWith(baseUrl))
        .slice(0, 5); // Limitar a 5 enlaces

      for (const link of links) {
        try {
          const linkUrl = new URL(link, baseUrl).toString();
          const linkResponse = await fetch(linkUrl, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000),
          });

          if (!linkResponse.ok) {
            test.status = 'warning';
            test.details.push({
              link,
              status: linkResponse.status,
            });
          }
        } catch (error) {
          test.status = 'warning';
          test.details.push({
            link,
            error: error.message,
          });
        }
      }

      test.details.push({ totalLinksChecked: links.length });
    } catch (error) {
      test.status = 'failed';
      test.details.push({ error: error.message });
    }

    return test;
  }

  /**
   * Test 4: Verificar performance básica
   */
  async testPerformance(baseUrl) {
    const test = {
      name: 'Performance Check',
      status: 'passed',
      details: [],
    };

    try {
      const startTime = Date.now();
      const response = await fetch(baseUrl, {
        headers: { 'User-Agent': CONFIG.USER_AGENT },
      });
      const responseTime = Date.now() - startTime;

      const contentLength = response.headers.get('content-length') || 0;

      test.details.push({
        responseTime: `${responseTime}ms`,
        contentLength: `${(contentLength / 1024).toFixed(2)}KB`,
        status: response.status,
      });

      if (responseTime > CONFIG.MAX_RESPONSE_TIME) {
        test.status = 'warning';
        test.details.push({
          warning: `Response time exceeds ${CONFIG.MAX_RESPONSE_TIME}ms`,
        });
      }
    } catch (error) {
      test.status = 'failed';
      test.details.push({ error: error.message });
    }

    return test;
  }

  /**
   * Test 5: Validar metadata (SEO básico)
   */
  async testMetadata(baseUrl) {
    const test = {
      name: 'Metadata Validation',
      status: 'passed',
      details: [],
    };

    try {
      const response = await fetch(baseUrl);
      const html = await response.text();

      const title = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const description = html.match(
        /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
      );
      const ogImage = html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
      );

      test.details.push({
        hasTitle: !!title,
        hasDescription: !!description,
        hasOgImage: !!ogImage,
      });

      if (!title || !description) {
        test.status = 'warning';
        test.details.push({
          warning: 'Missing essential metadata (title or description)',
        });
      }
    } catch (error) {
      test.status = 'failed';
      test.details.push({ error: error.message });
    }

    return test;
  }

  /**
   * Guardar resultados en D1
   */
  async saveResults(results) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO qa_results (deploy_id, target_url, status, results, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `);

      await stmt
        .bind(
          results.deployId,
          results.targetUrl,
          results.status,
          JSON.stringify(results),
          Date.now()
        )
        .run();
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }

  /**
   * Enviar notificación a Telegram
   */
  async sendNotification(results) {
    if (!this.env.TELEGRAM_BOT_TOKEN || !this.env.TELEGRAM_CHAT_ID) {
      return;
    }

    const message = `
🚨 *QA Alert - Deployment Failed*

*Deploy ID:* \`${results.deployId}\`
*URL:* ${results.targetUrl}
*Status:* ${results.status}

*Summary:*
✅ Passed: ${results.summary.passed}
❌ Failed: ${results.summary.failed}
⚠️ Warnings: ${results.summary.warnings}

*Duration:* ${results.duration}ms
    `.trim();

    try {
      await fetch(
        `https://api.telegram.org/bot${this.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        }
      );
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}

// Handler principal del Worker
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Autenticación
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.substring(7);
    if (token !== env.QA_AUTH_TOKEN) {
      return new Response('Invalid token', { status: 403 });
    }

    const agent = new SmartQAAgent(env);

    try {
      // POST /api/qa/trigger - Iniciar análisis QA
      if (url.pathname === '/api/qa/trigger' && request.method === 'POST') {
        const body = await request.json();
        const { deployId, url: targetUrl } = body;

        if (!deployId || !targetUrl) {
          return new Response('Missing deployId or url', { status: 400 });
        }

        const results = await agent.runQASuite(deployId, targetUrl);

        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/qa/status/:deployId - Consultar estado
      if (url.pathname.startsWith('/api/qa/status/') && request.method === 'GET') {
        const deployId = url.pathname.split('/').pop();

        const stmt = agent.db.prepare(
          'SELECT * FROM qa_results WHERE deploy_id = ? ORDER BY timestamp DESC LIMIT 1'
        );
        const result = await stmt.bind(deployId).first();

        if (!result) {
          return new Response('Not found', { status: 404 });
        }

        return new Response(result.results, {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/qa/health - Health check
      if (url.pathname === '/api/qa/health' && request.method === 'GET') {
        return new Response(
          JSON.stringify({ status: 'ok', service: 'smart-qa-agent' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response('Not found', { status: 404 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

