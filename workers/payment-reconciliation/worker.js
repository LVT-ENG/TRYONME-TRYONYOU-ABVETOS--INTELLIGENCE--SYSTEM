/**
 * AI Payment Reconciliation - Cloudflare Worker
 * Conciliación automática de pagos AVBET con órdenes JIT
 * @version 1.0.0
 */

import { OpenAI } from 'openai';

// Configuración
const CONFIG = {
  MATCHING_THRESHOLD: 0.85, // 85% de similitud para considerar match
  AMOUNT_TOLERANCE: 0.01, // 1% de tolerancia en montos
  TIME_WINDOW_HOURS: 48, // Ventana de tiempo para matching
};

class PaymentReconciliation {
  constructor(env) {
    this.env = env;
    this.db = env.PAYMENTS_DB;
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  /**
   * Ejecutar reconciliación completa
   */
  async runReconciliation() {
    const startTime = Date.now();
    const results = {
      runDate: new Date().toISOString(),
      matched: [],
      unmatched: {
        payments: [],
        orders: [],
      },
      discrepancies: [],
      summary: {
        totalPayments: 0,
        totalOrders: 0,
        matchedCount: 0,
        unmatchedPayments: 0,
        unmatchedOrders: 0,
        discrepanciesCount: 0,
      },
    };

    try {
      // 1. Obtener pagos pendientes de AVBET
      const payments = await this.fetchPendingPayments();
      results.summary.totalPayments = payments.length;

      // 2. Obtener órdenes JIT pendientes
      const orders = await this.fetchPendingOrders();
      results.summary.totalOrders = orders.length;

      // 3. Realizar matching automático
      const matches = await this.matchPaymentsWithOrders(payments, orders);

      // 4. Procesar matches
      for (const match of matches) {
        if (match.confidence >= CONFIG.MATCHING_THRESHOLD) {
          await this.processMatch(match);
          results.matched.push(match);
          results.summary.matchedCount++;
        } else {
          results.discrepancies.push({
            payment: match.payment,
            order: match.order,
            confidence: match.confidence,
            reason: match.reason,
          });
          results.summary.discrepanciesCount++;
        }
      }

      // 5. Identificar pagos y órdenes sin match
      const matchedPaymentIds = new Set(
        results.matched.map((m) => m.payment.id)
      );
      const matchedOrderIds = new Set(results.matched.map((m) => m.order.id));

      results.unmatched.payments = payments.filter(
        (p) => !matchedPaymentIds.has(p.id)
      );
      results.unmatched.orders = orders.filter(
        (o) => !matchedOrderIds.has(o.id)
      );

      results.summary.unmatchedPayments = results.unmatched.payments.length;
      results.summary.unmatchedOrders = results.unmatched.orders.length;

      // 6. Guardar log de reconciliación
      await this.saveReconciliationLog(results);

      // 7. Enviar notificación si hay discrepancias
      if (
        results.summary.discrepanciesCount > 0 ||
        results.summary.unmatchedPayments > 5
      ) {
        await this.sendNotification(results);
      }

      results.duration = Date.now() - startTime;
      return results;
    } catch (error) {
      results.error = error.message;
      await this.saveReconciliationLog(results);
      throw error;
    }
  }

  /**
   * Obtener pagos pendientes de AVBET
   */
  async fetchPendingPayments() {
    try {
      // Primero intentar desde la base de datos local
      const stmt = this.db.prepare(`
        SELECT * FROM payments 
        WHERE reconciled = 0 
        AND timestamp > ?
        ORDER BY timestamp DESC
      `);

      const timeWindow = Date.now() - CONFIG.TIME_WINDOW_HOURS * 3600 * 1000;
      const localPayments = await stmt.bind(timeWindow).all();

      if (localPayments.results && localPayments.results.length > 0) {
        return localPayments.results;
      }

      // Si no hay en local, consultar API de AVBET
      if (this.env.AVBET_API_KEY && this.env.AVBET_API_URL) {
        const response = await fetch(`${this.env.AVBET_API_URL}/payments`, {
          headers: {
            Authorization: `Bearer ${this.env.AVBET_API_KEY}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Guardar en base de datos local
          for (const payment of data.payments) {
            await this.savePayment(payment);
          }
          return data.payments;
        }
      }

      return [];
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }

  /**
   * Obtener órdenes JIT pendientes
   */
  async fetchPendingOrders() {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM orders 
        WHERE payment_id IS NULL 
        AND timestamp > ?
        ORDER BY timestamp DESC
      `);

      const timeWindow = Date.now() - CONFIG.TIME_WINDOW_HOURS * 3600 * 1000;
      const result = await stmt.bind(timeWindow).all();

      return result.results || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  /**
   * Matching inteligente usando IA
   */
  async matchPaymentsWithOrders(payments, orders) {
    const matches = [];

    // Primero intentar matching exacto (más rápido)
    for (const payment of payments) {
      for (const order of orders) {
        const exactMatch = this.checkExactMatch(payment, order);
        if (exactMatch) {
          matches.push({
            payment,
            order,
            confidence: 1.0,
            method: 'exact',
            reason: 'Exact match on amount and customer',
          });
          continue;
        }
      }
    }

    // Para los que no tienen match exacto, usar IA
    const unmatchedPayments = payments.filter(
      (p) => !matches.find((m) => m.payment.id === p.id)
    );
    const unmatchedOrders = orders.filter(
      (o) => !matches.find((m) => m.order.id === o.id)
    );

    if (unmatchedPayments.length > 0 && unmatchedOrders.length > 0) {
      const aiMatches = await this.aiMatchingEngine(
        unmatchedPayments,
        unmatchedOrders
      );
      matches.push(...aiMatches);
    }

    return matches;
  }

  /**
   * Verificar match exacto
   */
  checkExactMatch(payment, order) {
    // Verificar monto (con tolerancia)
    const amountMatch =
      Math.abs(payment.amount - order.amount) <=
      order.amount * CONFIG.AMOUNT_TOLERANCE;

    // Verificar moneda
    const currencyMatch = payment.currency === order.currency;

    // Verificar ventana de tiempo
    const timeDiff = Math.abs(payment.timestamp - order.timestamp);
    const timeMatch = timeDiff <= CONFIG.TIME_WINDOW_HOURS * 3600 * 1000;

    // Verificar customer_id si está disponible
    const customerMatch =
      !payment.customer_id ||
      !order.customer_id ||
      payment.customer_id === order.customer_id;

    return amountMatch && currencyMatch && timeMatch && customerMatch;
  }

  /**
   * Motor de matching con IA
   */
  async aiMatchingEngine(payments, orders) {
    const matches = [];

    try {
      const prompt = `
Eres un sistema experto en conciliación de pagos. Analiza los siguientes pagos y órdenes y determina qué pagos corresponden a qué órdenes.

PAGOS:
${JSON.stringify(payments, null, 2)}

ÓRDENES:
${JSON.stringify(orders, null, 2)}

Responde ÚNICAMENTE con un array JSON de matches en este formato:
[
  {
    "payment_id": "id_del_pago",
    "order_id": "id_de_la_orden",
    "confidence": 0.95,
    "reason": "Razón del match"
  }
]

Considera:
- Similitud de montos (con tolerancia del ${CONFIG.AMOUNT_TOLERANCE * 100}%)
- Proximidad temporal (ventana de ${CONFIG.TIME_WINDOW_HOURS} horas)
- Información del cliente
- Patrones de compra

Solo incluye matches con confianza >= ${CONFIG.MATCHING_THRESHOLD}
      `.trim();

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content:
              'Eres un sistema de conciliación de pagos. Responde solo con JSON válido.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
      });

      const aiResponse = completion.choices[0].message.content;
      const aiMatches = JSON.parse(aiResponse);

      // Convertir respuesta de IA a formato interno
      for (const match of aiMatches) {
        const payment = payments.find((p) => p.id === match.payment_id);
        const order = orders.find((o) => o.id === match.order_id);

        if (payment && order) {
          matches.push({
            payment,
            order,
            confidence: match.confidence,
            method: 'ai',
            reason: match.reason,
          });
        }
      }
    } catch (error) {
      console.error('AI matching error:', error);
      // Fallback a matching básico por monto
      matches.push(...this.basicMatching(payments, orders));
    }

    return matches;
  }

  /**
   * Matching básico como fallback
   */
  basicMatching(payments, orders) {
    const matches = [];

    for (const payment of payments) {
      for (const order of orders) {
        const amountDiff = Math.abs(payment.amount - order.amount);
        const amountSimilarity =
          1 - amountDiff / Math.max(payment.amount, order.amount);

        if (amountSimilarity >= 0.95) {
          matches.push({
            payment,
            order,
            confidence: amountSimilarity,
            method: 'basic',
            reason: 'Amount similarity',
          });
          break;
        }
      }
    }

    return matches;
  }

  /**
   * Procesar un match confirmado
   */
  async processMatch(match) {
    try {
      // Actualizar pago como reconciliado
      await this.db
        .prepare(
          `UPDATE payments SET reconciled = 1, order_id = ? WHERE id = ?`
        )
        .bind(match.order.id, match.payment.id)
        .run();

      // Actualizar orden con payment_id
      await this.db
        .prepare(`UPDATE orders SET payment_id = ? WHERE id = ?`)
        .bind(match.payment.id, match.order.id)
        .run();

      // Registrar el match
      await this.db
        .prepare(
          `INSERT INTO reconciliation_matches (payment_id, order_id, confidence, method, matched_at) 
           VALUES (?, ?, ?, ?, ?)`
        )
        .bind(
          match.payment.id,
          match.order.id,
          match.confidence,
          match.method,
          Date.now()
        )
        .run();
    } catch (error) {
      console.error('Error processing match:', error);
      throw error;
    }
  }

  /**
   * Guardar pago en base de datos
   */
  async savePayment(payment) {
    try {
      await this.db
        .prepare(
          `INSERT OR REPLACE INTO payments (id, amount, currency, timestamp, status, customer_id, reconciled)
           VALUES (?, ?, ?, ?, ?, ?, 0)`
        )
        .bind(
          payment.id,
          payment.amount,
          payment.currency || 'USD',
          payment.timestamp,
          payment.status || 'completed',
          payment.customer_id || null
        )
        .run();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  }

  /**
   * Guardar log de reconciliación
   */
  async saveReconciliationLog(results) {
    try {
      await this.db
        .prepare(
          `INSERT INTO reconciliation_logs (run_date, matched_count, unmatched_count, discrepancies_count, results)
           VALUES (?, ?, ?, ?, ?)`
        )
        .bind(
          results.runDate,
          results.summary.matchedCount,
          results.summary.unmatchedPayments + results.summary.unmatchedOrders,
          results.summary.discrepanciesCount,
          JSON.stringify(results)
        )
        .run();
    } catch (error) {
      console.error('Error saving log:', error);
    }
  }

  /**
   * Enviar notificación
   */
  async sendNotification(results) {
    if (!this.env.TELEGRAM_BOT_TOKEN || !this.env.TELEGRAM_CHAT_ID) {
      return;
    }

    const message = `
💰 *Payment Reconciliation Report*

*Date:* ${new Date(results.runDate).toLocaleDateString()}

*Summary:*
✅ Matched: ${results.summary.matchedCount}
❌ Unmatched Payments: ${results.summary.unmatchedPayments}
❌ Unmatched Orders: ${results.summary.unmatchedOrders}
⚠️ Discrepancies: ${results.summary.discrepanciesCount}

${results.summary.discrepanciesCount > 0 ? '*Action Required:* Review discrepancies in dashboard' : ''}
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
    if (token !== env.RECONCILIATION_AUTH_TOKEN) {
      return new Response('Invalid token', { status: 403 });
    }

    const reconciliation = new PaymentReconciliation(env);

    try {
      // POST /api/reconciliation/run - Ejecutar reconciliación
      if (
        url.pathname === '/api/reconciliation/run' &&
        request.method === 'POST'
      ) {
        const results = await reconciliation.runReconciliation();
        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/reconciliation/status - Estado actual
      if (
        url.pathname === '/api/reconciliation/status' &&
        request.method === 'GET'
      ) {
        const stmt = reconciliation.db.prepare(
          'SELECT * FROM reconciliation_logs ORDER BY id DESC LIMIT 1'
        );
        const lastRun = await stmt.first();

        return new Response(
          JSON.stringify(lastRun ? JSON.parse(lastRun.results) : null),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // GET /api/reconciliation/discrepancies - Listar discrepancias
      if (
        url.pathname === '/api/reconciliation/discrepancies' &&
        request.method === 'GET'
      ) {
        const stmt = reconciliation.db.prepare(`
          SELECT p.*, o.* 
          FROM payments p
          LEFT JOIN orders o ON p.amount = o.amount
          WHERE p.reconciled = 0 AND o.payment_id IS NULL
          LIMIT 50
        `);
        const discrepancies = await stmt.all();

        return new Response(JSON.stringify(discrepancies.results || []), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/reconciliation/health
      if (
        url.pathname === '/api/reconciliation/health' &&
        request.method === 'GET'
      ) {
        return new Response(
          JSON.stringify({
            status: 'ok',
            service: 'payment-reconciliation',
          }),
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

  // Cron trigger para ejecución diaria
  async scheduled(event, env, ctx) {
    const reconciliation = new PaymentReconciliation(env);
    try {
      await reconciliation.runReconciliation();
    } catch (error) {
      console.error('Scheduled reconciliation error:', error);
    }
  },
};

