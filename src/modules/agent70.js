/**
 * Agent70 Monitoring Layer
 * Provides approval workflow and monitoring capabilities
 */

const AGENT70_VERSION = '1.0.0';

// Approval states
const ApprovalState = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REVIEW_REQUIRED: 'REVIEW_REQUIRED'
};

// Metric types
const MetricType = {
  PERFORMANCE: 'PERFORMANCE',
  SECURITY: 'SECURITY',
  QUALITY: 'QUALITY',
  COMPLIANCE: 'COMPLIANCE'
};

// Internal state
const state = {
  approvals: [],
  metrics: [],
  alerts: [],
  isActive: false
};

/**
 * Agent70 Monitoring Layer
 */
export const Agent70 = {
  version: AGENT70_VERSION,

  /**
   * Activate Agent70 monitoring
   * @param {Object} options - Configuration options
   */
  activate(options = {}) {
    state.isActive = true;
    this.config = {
      autoApprove: options.autoApprove ?? false,
      thresholds: options.thresholds ?? {
        performance: 80,
        security: 90,
        quality: 85
      },
      alertOnThreshold: options.alertOnThreshold ?? true,
      ...options
    };
    console.log('[Agent70] Monitoring layer activated');
    return this;
  },

  /**
   * Deactivate Agent70 monitoring
   */
  deactivate() {
    state.isActive = false;
    console.log('[Agent70] Monitoring layer deactivated');
  },

  /**
   * Check if Agent70 is active
   * @returns {boolean} Active status
   */
  isActive() {
    return state.isActive;
  },

  /**
   * Request approval for an action
   * @param {Object} request - Approval request
   * @returns {Object} Approval result
   */
  requestApproval(request) {
    const approval = {
      id: `approval_${Date.now()}`,
      type: request.type,
      description: request.description,
      requestedBy: request.requestedBy,
      requestedAt: new Date().toISOString(),
      state: ApprovalState.PENDING,
      metadata: request.metadata || {}
    };

    // Auto-approve if enabled and meets strict criteria
    if (this.config?.autoApprove && this.meetsAutoApprovalCriteria(request)) {
      approval.state = ApprovalState.APPROVED;
      approval.approvedAt = new Date().toISOString();
      approval.approvedBy = 'Agent70-AutoApproval';
      approval.autoApprovalReason = 'Met strict auto-approval criteria';
    }

    state.approvals.push(approval);
    console.log(`[Agent70] Approval requested: ${approval.id}`, approval);

    return approval;
  },

  /**
   * Check if request meets auto-approval criteria
   * Implements strict validation for security
   * @param {Object} request - Approval request
   * @returns {boolean} Meets criteria
   */
  meetsAutoApprovalCriteria(request) {
    // Validate required fields
    if (!request.type || !request.description || !request.requestedBy) {
      return false;
    }

    // Check for whitelisted sources (if configured)
    const whitelistedSources = this.config?.whitelistedSources || [];
    if (whitelistedSources.length > 0 && !whitelistedSources.includes(request.requestedBy)) {
      return false;
    }

    // Only allow specific low-risk read-only operations
    const lowRiskTypes = ['READ', 'VIEW', 'QUERY'];
    if (!lowRiskTypes.includes(request.type)) {
      return false;
    }

    // Rate limiting check: max 100 auto-approvals per hour
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const recentAutoApprovals = state.approvals.filter(
      a => a.approvedBy === 'Agent70-AutoApproval' && a.approvedAt > oneHourAgo
    );
    if (recentAutoApprovals.length >= 100) {
      console.warn('[Agent70] Auto-approval rate limit reached');
      return false;
    }

    // Description must be at least 10 characters for audit trail
    if (request.description.length < 10) {
      return false;
    }

    return true;
  },

  /**
   * Manually approve a request
   * @param {string} approvalId - Approval ID
   * @param {string} approver - Approver identifier
   * @returns {Object} Updated approval
   */
  approve(approvalId, approver) {
    const approval = state.approvals.find(a => a.id === approvalId);
    if (approval) {
      approval.state = ApprovalState.APPROVED;
      approval.approvedAt = new Date().toISOString();
      approval.approvedBy = approver;
      console.log(`[Agent70] Approved: ${approvalId}`);
    }
    return approval;
  },

  /**
   * Reject a request
   * @param {string} approvalId - Approval ID
   * @param {string} rejector - Rejector identifier
   * @param {string} reason - Rejection reason
   * @returns {Object} Updated approval
   */
  reject(approvalId, rejector, reason) {
    const approval = state.approvals.find(a => a.id === approvalId);
    if (approval) {
      approval.state = ApprovalState.REJECTED;
      approval.rejectedAt = new Date().toISOString();
      approval.rejectedBy = rejector;
      approval.rejectionReason = reason;
      console.log(`[Agent70] Rejected: ${approvalId} - ${reason}`);
    }
    return approval;
  },

  /**
   * Record a metric
   * @param {Object} metric - Metric data
   */
  recordMetric(metric) {
    const entry = {
      id: `metric_${Date.now()}`,
      type: metric.type || MetricType.PERFORMANCE,
      name: metric.name,
      value: metric.value,
      unit: metric.unit,
      timestamp: new Date().toISOString(),
      metadata: metric.metadata || {}
    };

    state.metrics.push(entry);

    // Check against thresholds
    if (this.config?.alertOnThreshold) {
      this.checkThreshold(entry);
    }

    return entry;
  },

  /**
   * Check metric against threshold
   * @param {Object} metric - Metric to check
   */
  checkThreshold(metric) {
    const threshold = this.config?.thresholds?.[metric.type.toLowerCase()];
    if (threshold !== undefined && metric.value < threshold) {
      this.createAlert({
        type: 'THRESHOLD_BREACH',
        metric: metric.name,
        value: metric.value,
        threshold,
        message: `${metric.name} (${metric.value}) is below threshold (${threshold})`
      });
    }
  },

  /**
   * Create an alert
   * @param {Object} alert - Alert data
   */
  createAlert(alert) {
    const entry = {
      id: `alert_${Date.now()}`,
      ...alert,
      createdAt: new Date().toISOString(),
      acknowledged: false
    };

    state.alerts.push(entry);
    console.warn(`[Agent70] ALERT: ${alert.message}`);
    return entry;
  },

  /**
   * Get all pending approvals
   * @returns {Array} Pending approvals
   */
  getPendingApprovals() {
    return state.approvals.filter(a => a.state === ApprovalState.PENDING);
  },

  /**
   * Get all metrics
   * @param {Object} filter - Filter options
   * @returns {Array} Metrics
   */
  getMetrics(filter = {}) {
    let metrics = [...state.metrics];

    if (filter.type) {
      metrics = metrics.filter(m => m.type === filter.type);
    }

    if (filter.since) {
      metrics = metrics.filter(m => new Date(m.timestamp) >= new Date(filter.since));
    }

    return metrics;
  },

  /**
   * Get all alerts
   * @param {boolean} unacknowledgedOnly - Only return unacknowledged alerts
   * @returns {Array} Alerts
   */
  getAlerts(unacknowledgedOnly = false) {
    if (unacknowledgedOnly) {
      return state.alerts.filter(a => !a.acknowledged);
    }
    return [...state.alerts];
  },

  /**
   * Acknowledge an alert
   * @param {string} alertId - Alert ID
   */
  acknowledgeAlert(alertId) {
    const alert = state.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date().toISOString();
    }
    return alert;
  },

  /**
   * Generate status report
   * @returns {Object} Status report
   */
  generateReport() {
    return {
      timestamp: new Date().toISOString(),
      version: AGENT70_VERSION,
      isActive: state.isActive,
      approvals: {
        total: state.approvals.length,
        pending: state.approvals.filter(a => a.state === ApprovalState.PENDING).length,
        approved: state.approvals.filter(a => a.state === ApprovalState.APPROVED).length,
        rejected: state.approvals.filter(a => a.state === ApprovalState.REJECTED).length
      },
      metrics: {
        total: state.metrics.length,
        byType: Object.values(MetricType).reduce((acc, type) => {
          acc[type] = state.metrics.filter(m => m.type === type).length;
          return acc;
        }, {})
      },
      alerts: {
        total: state.alerts.length,
        unacknowledged: state.alerts.filter(a => !a.acknowledged).length
      }
    };
  },

  /**
   * Health check
   * @returns {Object} Health status
   */
  healthCheck() {
    return {
      status: state.isActive ? 'active' : 'inactive',
      version: AGENT70_VERSION,
      timestamp: new Date().toISOString()
    };
  }
};

export { ApprovalState, MetricType };
export default Agent70;
