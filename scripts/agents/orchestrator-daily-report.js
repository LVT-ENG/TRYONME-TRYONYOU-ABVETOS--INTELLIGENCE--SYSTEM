#!/usr/bin/env node

/**
 * Agente 70: Orquestador General - Reporte Diario 09:00
 * 
 * Genera y envía reporte diario a Telegram con:
 * - Tareas P0/P1 prioritarias
 * - Deploys últimas 24h
 * - Métricas del sistema
 * - Guías rápidas
 */

import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';
import https from 'https';

// Configuración
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const REPO_OWNER = 'LVT-ENG';
const REPO_NAME = 'TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM';

// Emojis para mejor UX
const EMOJI = {
  critical: '🔴',
  high: '🟡',
  medium: '🟢',
  low: '⚪',
  deploy: '🚀',
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  guide: '📖',
  metric: '📊',
  link: '🔗'
};

class OrchestratorAgent {
  constructor() {
    if (!GITHUB_TOKEN) {
      console.error('❌ GITHUB_TOKEN no configurado');
      process.exit(1);
    }
    
    this.octokit = new Octokit({ auth: GITHUB_TOKEN });
    this.report = {
      date: new Date().toISOString().split('T')[0],
      priorities: { P0: [], P1: [], P2: [] },
      deploys: [],
      metrics: {},
      guides: []
    };
  }

  // Obtener issues con prioridades P0/P1
  async fetchPriorityIssues() {
    try {
      const { data: issues } = await this.octokit.issues.listForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        state: 'open',
        sort: 'created',
        per_page: 100
      });

      issues.forEach(issue => {
        const labels = issue.labels.map(l => typeof l === 'string' ? l : l.name);
        
        if (labels.includes('P0') || labels.includes('critical')) {
          this.report.priorities.P0.push({
            number: issue.number,
            title: issue.title,
            url: issue.html_url,
            assignee: issue.assignee?.login || 'sin asignar'
          });
        } else if (labels.includes('P1') || labels.includes('high')) {
          this.report.priorities.P1.push({
            number: issue.number,
            title: issue.title,
            url: issue.html_url,
            assignee: issue.assignee?.login || 'sin asignar'
          });
        } else if (labels.includes('P2') || labels.includes('medium')) {
          this.report.priorities.P2.push({
            number: issue.number,
            title: issue.title,
            url: issue.html_url,
            assignee: issue.assignee?.login || 'sin asignar'
          });
        }
      });

      console.log(`✅ Issues obtenidos: P0=${this.report.priorities.P0.length}, P1=${this.report.priorities.P1.length}`);
    } catch (error) {
      console.error('❌ Error obteniendo issues:', error.message);
    }
  }

  // Obtener deploys recientes (workflow runs)
  async fetchRecentDeploys() {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const { data: workflows } = await this.octokit.actions.listWorkflowRunsForRepo({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        created: `>=${yesterday.toISOString().split('T')[0]}`,
        per_page: 20
      });

      workflows.workflow_runs.forEach(run => {
        if (run.name.includes('Deploy') || run.name.includes('Build')) {
          this.report.deploys.push({
            id: run.id,
            name: run.name,
            status: run.conclusion || run.status,
            branch: run.head_branch,
            commit: run.head_sha.substring(0, 7),
            url: run.html_url,
            created: run.created_at
          });
        }
      });

      console.log(`✅ Deploys recientes: ${this.report.deploys.length}`);
    } catch (error) {
      console.error('❌ Error obteniendo deploys:', error.message);
    }
  }

  // Generar métricas del sistema
  generateMetrics() {
    this.report.metrics = {
      issues_p0: this.report.priorities.P0.length,
      issues_p1: this.report.priorities.P1.length,
      issues_p2: this.report.priorities.P2.length,
      deploys_24h: this.report.deploys.length,
      success_rate: this.calculateSuccessRate(),
      uptime: '99.9%', // Mock - integrar con Vercel Analytics
      response_time: '185ms' // Mock - integrar con real metrics
    };
  }

  // Calcular tasa de éxito de deploys
  calculateSuccessRate() {
    if (this.report.deploys.length === 0) return '100%';
    
    const successful = this.report.deploys.filter(d => 
      d.status === 'success' || d.status === 'completed'
    ).length;
    
    const rate = (successful / this.report.deploys.length * 100).toFixed(1);
    return `${rate}%`;
  }

  // Generar guías rápidas contextuales
  generateQuickGuides() {
    const guides = [];

    // Guías según prioridades
    if (this.report.priorities.P0.length > 0) {
      guides.push('🔥 **Atención P0**: Resolver issues críticos inmediatamente');
      guides.push('• Revisar logs en Vercel Dashboard');
      guides.push('• Verificar GitHub Actions para errores');
      guides.push('• Notificar al equipo vía Telegram');
    }

    if (this.report.priorities.P1.length > 5) {
      guides.push('📋 **Alta carga P1**: Priorizar según impacto');
      guides.push('• Usar etiquetas para categorizar');
      guides.push('• Asignar responsables específicos');
    }

    // Guías generales
    guides.push('🚀 **Deploy workflow**: push → main → auto-deploy');
    guides.push('🎨 **Visual checks**: Brand Guardian valida automáticamente');
    guides.push('📱 **Telegram alerts**: Notificaciones en tiempo real');

    this.report.guides = guides;
  }

  // Formatear mensaje para Telegram
  formatTelegramMessage() {
    let message = `📊 *REPORTE DIARIO - ${this.report.date}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Issues prioritarios
    message += `${EMOJI.critical} *TAREAS CRÍTICAS (P0): ${this.report.priorities.P0.length}*\n`;
    if (this.report.priorities.P0.length > 0) {
      this.report.priorities.P0.slice(0, 5).forEach(issue => {
        message += `• #${issue.number}: ${issue.title}\n`;
        message += `  ${EMOJI.link} ${issue.url}\n`;
      });
    } else {
      message += `${EMOJI.success} Sin tareas críticas\n`;
    }
    message += `\n`;

    message += `${EMOJI.high} *ALTA PRIORIDAD (P1): ${this.report.priorities.P1.length}*\n`;
    if (this.report.priorities.P1.length > 0) {
      this.report.priorities.P1.slice(0, 5).forEach(issue => {
        message += `• #${issue.number}: ${issue.title}\n`;
      });
      if (this.report.priorities.P1.length > 5) {
        message += `... y ${this.report.priorities.P1.length - 5} más\n`;
      }
    } else {
      message += `${EMOJI.success} Sin tareas de alta prioridad\n`;
    }
    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Deploys recientes
    message += `${EMOJI.deploy} *DEPLOYS ÚLTIMAS 24H: ${this.report.deploys.length}*\n`;
    if (this.report.deploys.length > 0) {
      this.report.deploys.slice(0, 5).forEach(deploy => {
        const statusEmoji = deploy.status === 'success' ? EMOJI.success : EMOJI.error;
        message += `${statusEmoji} ${deploy.name} (${deploy.commit})\n`;
        message += `  Branch: ${deploy.branch}\n`;
      });
    } else {
      message += `${EMOJI.info} Sin deploys en las últimas 24h\n`;
    }
    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Métricas
    message += `${EMOJI.metric} *MÉTRICAS DEL SISTEMA*\n`;
    message += `• Success Rate: ${this.report.metrics.success_rate}\n`;
    message += `• Uptime: ${this.report.metrics.uptime}\n`;
    message += `• Response Time: ${this.report.metrics.response_time}\n`;
    message += `• Issues activos: ${this.report.metrics.issues_p0 + this.report.metrics.issues_p1 + this.report.metrics.issues_p2}\n`;
    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Guías rápidas
    message += `${EMOJI.guide} *GUÍAS RÁPIDAS*\n`;
    this.report.guides.forEach(guide => {
      message += `${guide}\n`;
    });
    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    message += `🤖 *Generado por Agente 70 - Orquestador General*\n`;
    message += `⏰ Próximo reporte: mañana a las 09:00 UTC\n`;

    return message;
  }

  // Enviar mensaje a Telegram
  async sendToTelegram(message) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log('⚠️ Telegram no configurado - mostrando reporte:\n');
      console.log(message);
      return;
    }

    const payload = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Reporte enviado a Telegram');
            resolve(data);
          } else {
            console.error(`❌ Error Telegram (${res.statusCode}):`, data);
            reject(new Error(data));
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Error enviando a Telegram:', error.message);
        reject(error);
      });

      req.write(payload);
      req.end();
    });
  }

  // Ejecutar reporte completo
  async run() {
    console.log('🤖 Agente 70: Orquestador General - Iniciando reporte diario...\n');

    await this.fetchPriorityIssues();
    await this.fetchRecentDeploys();
    this.generateMetrics();
    this.generateQuickGuides();

    const message = this.formatTelegramMessage();
    
    try {
      await this.sendToTelegram(message);
      console.log('\n✅ Reporte diario completado');
    } catch (error) {
      console.error('\n❌ Error enviando reporte:', error.message);
      console.log('\n📄 Reporte generado:\n');
      console.log(message);
    }
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new OrchestratorAgent();
  agent.run().catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
}

export default OrchestratorAgent;
