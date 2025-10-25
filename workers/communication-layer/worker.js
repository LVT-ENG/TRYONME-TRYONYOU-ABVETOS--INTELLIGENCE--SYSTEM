/**
 * AI Communication Layer - Cloudflare Worker
 * Filtrado inteligente y respuesta automática a comunicaciones
 * @version 1.0.0
 */

import { OpenAI } from 'openai';

// Configuración
const CONFIG = {
  CATEGORIES: {
    COLLABORATION: 'colaboración',
    PRESS: 'prensa',
    LICENSE: 'licencia',
    SUPPORT: 'soporte',
    SPAM: 'spam',
    URGENT: 'urgente',
    OTHER: 'otro',
  },
  AUTO_RESPOND_CATEGORIES: ['colaboración', 'prensa', 'licencia'],
  NOTIFY_CATEGORIES: ['prensa', 'licencia', 'urgente'],
};

class CommunicationLayer {
  constructor(env) {
    this.env = env;
    this.db = env.MESSAGES_DB;
    this.kv = env.TEMPLATES_KV;
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  /**
   * Procesar mensaje entrante
   */
  async processMessage(message) {
    const startTime = Date.now();
    const result = {
      messageId: message.id || this.generateId(),
      timestamp: new Date().toISOString(),
      source: message.source, // 'email', 'telegram', 'form'
      from: message.from,
      subject: message.subject || '',
      body: message.body,
      classification: null,
      autoResponded: false,
      notified: false,
      saved: false,
    };

    try {
      // 1. Clasificar el mensaje con IA
      result.classification = await this.classifyMessage(message);

      // 2. Verificar si es spam
      if (result.classification.category === CONFIG.CATEGORIES.SPAM) {
        await this.saveMessage(result, '/spam/');
        return result;
      }

      // 3. Responder automáticamente si aplica
      if (
        CONFIG.AUTO_RESPOND_CATEGORIES.includes(
          result.classification.category
        )
      ) {
        const response = await this.generateAutoResponse(
          message,
          result.classification
        );
        await this.sendResponse(message, response);
        result.autoResponded = true;
        result.response = response;
      }

      // 4. Guardar en la carpeta correspondiente
      const folder = this.getCategoryFolder(result.classification.category);
      await this.saveMessage(result, folder);
      result.saved = true;

      // 5. Notificar si es necesario
      if (
        CONFIG.NOTIFY_CATEGORIES.includes(result.classification.category) ||
        result.classification.urgent
      ) {
        await this.sendNotification(result);
        result.notified = true;
      }

      result.duration = Date.now() - startTime;
      return result;
    } catch (error) {
      result.error = error.message;
      await this.saveMessage(result, '/errors/');
      throw error;
    }
  }

  /**
   * Clasificar mensaje con IA
   */
  async classifyMessage(message) {
    try {
      const prompt = `
Clasifica el siguiente mensaje en una de estas categorías:
- colaboración: propuestas de colaboración, partnerships
- prensa: consultas de medios, entrevistas
- licencia: consultas sobre licencias, términos de uso
- soporte: problemas técnicos, ayuda
- spam: correo no deseado, publicidad
- urgente: asuntos que requieren atención inmediata
- otro: otros temas

Mensaje:
De: ${message.from}
Asunto: ${message.subject || 'Sin asunto'}
Cuerpo: ${message.body}

Responde ÚNICAMENTE con un JSON en este formato:
{
  "category": "categoria",
  "confidence": 0.95,
  "urgent": false,
  "keywords": ["palabra1", "palabra2"],
  "summary": "Resumen breve del mensaje"
}
      `.trim();

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content:
              'Eres un asistente de clasificación de mensajes. Responde solo con JSON válido.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
      });

      const classification = JSON.parse(
        completion.choices[0].message.content
      );
      return classification;
    } catch (error) {
      console.error('Classification error:', error);
      // Fallback a clasificación básica
      return this.basicClassification(message);
    }
  }

  /**
   * Clasificación básica como fallback
   */
  basicClassification(message) {
    const text = `${message.subject} ${message.body}`.toLowerCase();

    const keywords = {
      colaboración: [
        'colaboración',
        'partnership',
        'colaborar',
        'alianza',
        'trabajo conjunto',
      ],
      prensa: ['prensa', 'entrevista', 'medio', 'periodista', 'artículo'],
      licencia: ['licencia', 'términos', 'uso', 'copyright', 'derechos'],
      soporte: ['ayuda', 'problema', 'error', 'no funciona', 'soporte'],
      spam: ['comprar', 'oferta', 'descuento', 'gratis', 'promoción'],
      urgente: ['urgente', 'inmediato', 'asap', 'crítico', 'emergencia'],
    };

    for (const [category, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (text.includes(word)) {
          return {
            category,
            confidence: 0.7,
            urgent: category === 'urgente',
            keywords: [word],
            summary: message.subject || 'Sin asunto',
          };
        }
      }
    }

    return {
      category: CONFIG.CATEGORIES.OTHER,
      confidence: 0.5,
      urgent: false,
      keywords: [],
      summary: message.subject || 'Sin asunto',
    };
  }

  /**
   * Generar respuesta automática
   */
  async generateAutoResponse(message, classification) {
    try {
      // Intentar obtener plantilla del KV
      const templateKey = `template_${classification.category}`;
      const template = await this.kv.get(templateKey);

      if (template) {
        // Personalizar plantilla con IA
        const prompt = `
Personaliza esta plantilla de respuesta para el siguiente mensaje:

PLANTILLA:
${template}

MENSAJE ORIGINAL:
De: ${message.from}
Asunto: ${message.subject}
Resumen: ${classification.summary}

Genera una respuesta personalizada manteniendo el tono profesional y la estructura de la plantilla.
        `.trim();

        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content:
                'Eres un asistente de comunicación profesional de TRYONYOU.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        });

        return completion.choices[0].message.content;
      }

      // Si no hay plantilla, generar respuesta desde cero
      return this.generateDefaultResponse(classification.category);
    } catch (error) {
      console.error('Response generation error:', error);
      return this.generateDefaultResponse(classification.category);
    }
  }

  /**
   * Generar respuesta por defecto
   */
  generateDefaultResponse(category) {
    const responses = {
      colaboración: `
Hola,

Gracias por tu interés en colaborar con TRYONYOU. Hemos recibido tu mensaje y lo revisaremos con atención.

Nuestro equipo de partnerships se pondrá en contacto contigo en los próximos días para explorar oportunidades de colaboración.

Saludos,
Equipo TRYONYOU
      `.trim(),
      prensa: `
Hola,

Gracias por tu interés en TRYONYOU. Hemos recibido tu consulta de prensa.

Nuestro equipo de comunicación revisará tu solicitud y se pondrá en contacto contigo a la brevedad.

Saludos,
Equipo TRYONYOU
      `.trim(),
      licencia: `
Hola,

Gracias por tu consulta sobre licencias y términos de uso de TRYONYOU.

Hemos recibido tu mensaje y nuestro equipo legal revisará tu solicitud. Te responderemos con la información solicitada en breve.

Saludos,
Equipo TRYONYOU
      `.trim(),
    };

    return responses[category] || 'Gracias por tu mensaje. Lo revisaremos pronto.';
  }

  /**
   * Enviar respuesta
   */
  async sendResponse(message, responseText) {
    try {
      if (message.source === 'email' && this.env.EMAIL_API_KEY) {
        // Enviar email (implementar según proveedor: SendGrid, Mailgun, etc.)
        await this.sendEmail(message.from, responseText);
      } else if (message.source === 'telegram' && this.env.TELEGRAM_BOT_TOKEN) {
        // Enviar mensaje de Telegram
        await this.sendTelegramMessage(message.chat_id, responseText);
      }
    } catch (error) {
      console.error('Error sending response:', error);
    }
  }

  /**
   * Enviar email
   */
  async sendEmail(to, text) {
    // Placeholder - implementar según proveedor de email
    console.log(`Sending email to ${to}: ${text}`);
  }

  /**
   * Enviar mensaje de Telegram
   */
  async sendTelegramMessage(chatId, text) {
    if (!this.env.TELEGRAM_BOT_TOKEN) return;

    try {
      await fetch(
        `https://api.telegram.org/bot${this.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
          }),
        }
      );
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    }
  }

  /**
   * Guardar mensaje en base de datos
   */
  async saveMessage(result, folder) {
    try {
      await this.db
        .prepare(
          `INSERT INTO messages (id, source, sender, subject, body, category, confidence, folder, auto_responded, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          result.messageId,
          result.source,
          result.from,
          result.subject,
          result.body,
          result.classification?.category || 'unknown',
          result.classification?.confidence || 0,
          folder,
          result.autoResponded ? 1 : 0,
          Date.now()
        )
        .run();

      // Guardar clasificación completa
      if (result.classification) {
        await this.db
          .prepare(
            `INSERT INTO message_classifications (message_id, classification_data)
             VALUES (?, ?)`
          )
          .bind(result.messageId, JSON.stringify(result.classification))
          .run();
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }

  /**
   * Obtener carpeta según categoría
   */
  getCategoryFolder(category) {
    const folders = {
      colaboración: '/partners/',
      prensa: '/press/',
      licencia: '/legal/',
      soporte: '/support/',
      urgente: '/urgent/',
      spam: '/spam/',
      otro: '/other/',
    };

    return folders[category] || '/other/';
  }

  /**
   * Enviar notificación
   */
  async sendNotification(result) {
    if (!this.env.TELEGRAM_BOT_TOKEN || !this.env.TELEGRAM_CHAT_ID) {
      return;
    }

    const message = `
📬 *Nuevo Mensaje - ${result.classification.category.toUpperCase()}*

*De:* ${result.from}
*Asunto:* ${result.subject || 'Sin asunto'}

*Resumen:* ${result.classification.summary}

*Categoría:* ${result.classification.category}
*Confianza:* ${(result.classification.confidence * 100).toFixed(0)}%
${result.classification.urgent ? '⚠️ *URGENTE*' : ''}

${result.autoResponded ? '✅ Respuesta automática enviada' : ''}
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

  /**
   * Generar ID único
   */
  generateId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Obtener estadísticas
   */
  async getStats(days = 7) {
    try {
      const since = Date.now() - days * 24 * 3600 * 1000;

      const stmt = this.db.prepare(`
        SELECT 
          category,
          COUNT(*) as count,
          SUM(CASE WHEN auto_responded = 1 THEN 1 ELSE 0 END) as auto_responded_count,
          AVG(confidence) as avg_confidence
        FROM messages
        WHERE timestamp > ?
        GROUP BY category
        ORDER BY count DESC
      `);

      const result = await stmt.bind(since).all();
      return result.results || [];
    } catch (error) {
      console.error('Error getting stats:', error);
      return [];
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
    if (token !== env.COMM_AUTH_TOKEN) {
      return new Response('Invalid token', { status: 403 });
    }

    const commLayer = new CommunicationLayer(env);

    try {
      // POST /api/comm/webhook - Recibir mensaje entrante
      if (url.pathname === '/api/comm/webhook' && request.method === 'POST') {
        const message = await request.json();
        const result = await commLayer.processMessage(message);

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/comm/threads/:category - Listar hilos por categoría
      if (
        url.pathname.startsWith('/api/comm/threads/') &&
        request.method === 'GET'
      ) {
        const category = url.pathname.split('/').pop();

        const stmt = commLayer.db.prepare(
          'SELECT * FROM messages WHERE category = ? ORDER BY timestamp DESC LIMIT 50'
        );
        const threads = await stmt.bind(category).all();

        return new Response(JSON.stringify(threads.results || []), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/comm/stats - Estadísticas
      if (url.pathname === '/api/comm/stats' && request.method === 'GET') {
        const days = parseInt(url.searchParams.get('days') || '7');
        const stats = await commLayer.getStats(days);

        return new Response(JSON.stringify(stats), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GET /api/comm/health
      if (url.pathname === '/api/comm/health' && request.method === 'GET') {
        return new Response(
          JSON.stringify({ status: 'ok', service: 'communication-layer' }),
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

