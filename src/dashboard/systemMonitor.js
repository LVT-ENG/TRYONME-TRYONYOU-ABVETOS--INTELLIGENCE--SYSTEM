/**
 * System Monitor Utility
 * Real-time system metrics collection
 */

export class SystemMonitor {
  constructor() {
    this.metrics = {
      startTime: Date.now(),
      requests: 0,
      errors: 0,
      biometricScans: 0,
      patterns: 0,
      digitalTwins: 0,
    };
  }

  /**
   * Get CPU usage (simulated - in production use Node.js os module)
   */
  getCPUUsage() {
    if (typeof window !== 'undefined' && window.performance) {
      // Browser environment
      const entries = performance.getEntriesByType('navigation');
      if (entries.length > 0) {
        return ((entries[0].domContentLoadedEventEnd / entries[0].loadEventEnd) * 100).toFixed(2);
      }
    }
    return '0.00';
  }

  /**
   * Get memory usage
   */
  getMemoryUsage() {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      const used = window.performance.memory.usedJSHeapSize;
      const total = window.performance.memory.jsHeapSizeLimit;
      return ((used / total) * 100).toFixed(2);
    }
    return '0.00';
  }

  /**
   * Record API request
   */
  recordRequest(endpoint, status) {
    this.metrics.requests++;
    if (status >= 400) {
      this.metrics.errors++;
    }
    
    console.log(`📊 Request: ${endpoint} | Status: ${status} | Total: ${this.metrics.requests}`);
  }

  /**
   * Record biometric scan
   */
  recordBiometricScan(userId, success) {
    if (success) {
      this.metrics.biometricScans++;
    }
    console.log(`🔬 Biometric scan ${success ? 'successful' : 'failed'} for ${userId}`);
  }

  /**
   * Record pattern generation
   */
  recordPattern(patternId) {
    this.metrics.patterns++;
    console.log(`✂️ Pattern generated: ${patternId} | Total: ${this.metrics.patterns}`);
  }

  /**
   * Record digital twin creation
   */
  recordDigitalTwin(userId) {
    this.metrics.digitalTwins++;
    console.log(`🎭 Digital twin created: ${userId} | Total: ${this.metrics.digitalTwins}`);
  }

  /**
   * Get uptime in seconds
   */
  getUptime() {
    return Math.floor((Date.now() - this.metrics.startTime) / 1000);
  }

  /**
   * Get formatted uptime
   */
  getFormattedUptime() {
    const seconds = this.getUptime();
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  }

  /**
   * Get success rate
   */
  getSuccessRate() {
    if (this.metrics.requests === 0) return 100;
    return (((this.metrics.requests - this.metrics.errors) / this.metrics.requests) * 100).toFixed(1);
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    return {
      cpu: this.getCPUUsage(),
      memory: this.getMemoryUsage(),
      requests: this.metrics.requests,
      errors: this.metrics.errors,
      biometricScans: this.metrics.biometricScans,
      patterns: this.metrics.patterns,
      digitalTwins: this.metrics.digitalTwins,
      uptime: this.getFormattedUptime(),
      successRate: this.getSuccessRate(),
    };
  }

  /**
   * Export metrics to JSON
   */
  exportMetrics() {
    return JSON.stringify({
      ...this.getAllMetrics(),
      timestamp: new Date().toISOString(),
      version: '2.1.0',
    }, null, 2);
  }

  /**
   * Reset metrics
   */
  reset() {
    this.metrics = {
      startTime: Date.now(),
      requests: 0,
      errors: 0,
      biometricScans: 0,
      patterns: 0,
      digitalTwins: 0,
    };
    console.log('📊 Metrics reset');
  }
}

// Singleton instance
export const systemMonitor = new SystemMonitor();
export default systemMonitor;
