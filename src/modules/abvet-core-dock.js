/**
 * ABVET Core Dock
 * Provides verification, logging, auto-correction, and fallback mechanisms
 */

const ABVET_VERSION = '1.0.0';

// Logging levels
const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

// Internal log storage
const logStore = [];

/**
 * ABVET Core Dock Module
 */
export const ABVETCoreDock = {
  version: ABVET_VERSION,

  /**
   * Initialize the ABVET Core Dock
   * @param {Object} options - Configuration options
   */
  init(options = {}) {
    this.config = {
      enableLogging: options.enableLogging ?? true,
      enableAutoCorrection: options.enableAutoCorrection ?? true,
      enableFallback: options.enableFallback ?? true,
      maxLogEntries: options.maxLogEntries ?? 1000,
      ...options
    };
    this.log(LogLevel.INFO, 'ABVET Core Dock initialized');
    return this;
  },

  /**
   * Log a message
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {Object} data - Additional data
   */
  log(level, message, data = {}) {
    if (!this.config?.enableLogging) return;

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };

    logStore.push(entry);

    // Trim log store if needed
    if (logStore.length > (this.config?.maxLogEntries || 1000)) {
      logStore.shift();
    }

    // Console output based on level
    const logFn = level === LogLevel.ERROR ? console.error
      : level === LogLevel.WARN ? console.warn
      : console.log;
    
    logFn(`[ABVET ${level}] ${message}`, data);
  },

  /**
   * Get all logs
   * @returns {Array} Log entries
   */
  getLogs() {
    return [...logStore];
  },

  /**
   * Clear logs
   */
  clearLogs() {
    logStore.length = 0;
    this.log(LogLevel.INFO, 'Logs cleared');
  },

  /**
   * Verify data integrity
   * @param {*} data - Data to verify
   * @param {Object} schema - Validation schema
   * @returns {Object} Verification result
   */
  verify(data, schema = {}) {
    this.log(LogLevel.DEBUG, 'Verifying data', { schema });

    const result = {
      valid: true,
      errors: [],
      corrected: false,
      data: data
    };

    // Basic type checking
    if (schema.type && typeof data !== schema.type) {
      result.valid = false;
      result.errors.push(`Expected type ${schema.type}, got ${typeof data}`);
    }

    // Required fields check
    if (schema.required && Array.isArray(schema.required)) {
      for (const field of schema.required) {
        if (data && data[field] === undefined) {
          result.valid = false;
          result.errors.push(`Missing required field: ${field}`);
        }
      }
    }

    this.log(
      result.valid ? LogLevel.INFO : LogLevel.WARN,
      'Verification complete',
      { valid: result.valid, errorCount: result.errors.length }
    );

    return result;
  },

  /**
   * Auto-correct data based on rules
   * @param {*} data - Data to correct
   * @param {Object} rules - Correction rules
   * @returns {Object} Corrected data and status
   */
  autoCorrect(data, rules = {}) {
    if (!this.config?.enableAutoCorrection) {
      return { corrected: false, data };
    }

    this.log(LogLevel.DEBUG, 'Attempting auto-correction', { rules });

    let correctedData = { ...data };
    let corrections = [];

    // Apply default values
    if (rules.defaults) {
      for (const [key, value] of Object.entries(rules.defaults)) {
        if (correctedData[key] === undefined || correctedData[key] === null) {
          correctedData[key] = value;
          corrections.push(`Applied default for ${key}`);
        }
      }
    }

    // Apply transformations
    if (rules.transforms) {
      for (const [key, transform] of Object.entries(rules.transforms)) {
        if (correctedData[key] !== undefined && typeof transform === 'function') {
          correctedData[key] = transform(correctedData[key]);
          corrections.push(`Transformed ${key}`);
        }
      }
    }

    const result = {
      corrected: corrections.length > 0,
      corrections,
      data: correctedData
    };

    this.log(LogLevel.INFO, 'Auto-correction complete', { 
      correctionCount: corrections.length 
    });

    return result;
  },

  /**
   * Execute with fallback
   * @param {Function} primaryFn - Primary function to execute
   * @param {Function} fallbackFn - Fallback function
   * @param {Object} context - Execution context
   * @returns {Promise<*>} Execution result
   */
  async withFallback(primaryFn, fallbackFn, context = {}) {
    if (!this.config?.enableFallback) {
      return primaryFn();
    }

    this.log(LogLevel.DEBUG, 'Executing with fallback enabled', context);

    try {
      const result = await primaryFn();
      this.log(LogLevel.INFO, 'Primary function succeeded');
      return result;
    } catch (error) {
      this.log(LogLevel.WARN, 'Primary function failed, using fallback', {
        error: error.message
      });

      try {
        const fallbackResult = await fallbackFn();
        this.log(LogLevel.INFO, 'Fallback function succeeded');
        return fallbackResult;
      } catch (fallbackError) {
        this.log(LogLevel.ERROR, 'Fallback function also failed', {
          error: fallbackError.message
        });
        throw fallbackError;
      }
    }
  },

  /**
   * Health check for ABVET Core Dock
   * @returns {Object} Health status
   */
  healthCheck() {
    return {
      status: 'healthy',
      version: ABVET_VERSION,
      config: this.config,
      logCount: logStore.length,
      timestamp: new Date().toISOString()
    };
  }
};

export { LogLevel };
export default ABVETCoreDock;
