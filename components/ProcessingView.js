// ProcessingView Component
// Part of TRYONYOU – ABVETOS – ULTRA – PLUS – ULTIMATUM System

/**
 * ProcessingView - Handles the processing state visualization
 * Used for displaying biometric scanning, garment analysis, and AI processing states
 */
class ProcessingView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.status = 'INITIALIZING';
  }

  /**
   * Initialize the processing view
   */
  init() {
    if (!this.container) {
      console.error('ProcessingView: Container not found');
      return;
    }
    this.render();
  }

  /**
   * Update the processing status
   * @param {string} status - The new status message
   */
  updateStatus(status) {
    this.status = status;
    this.render();
  }

  /**
   * Render the processing view
   */
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="processing-view">
        <div class="processing-overlay"></div>
        <div class="processing-content">
          <div class="processing-spinner"></div>
          <p class="processing-status">${this.status}</p>
          <div class="processing-line"></div>
          <p class="processing-subtitle">TRY ON ME // PROCESSING</p>
        </div>
      </div>
    `;

    this.applyStyles();
  }

  /**
   * Apply styles to the processing view
   */
  applyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .processing-view {
        position: relative;
        width: 100%;
        height: 100vh;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .processing-overlay {
        position: absolute;
        inset: 0;
        box-shadow: inset 0 0 150px rgba(255, 191, 0, 0.2);
        pointer-events: none;
        z-index: 10;
      }

      .processing-content {
        position: relative;
        z-index: 20;
        text-align: center;
      }

      .processing-spinner {
        width: 60px;
        height: 60px;
        border: 2px solid #FFBF00;
        border-top: 2px solid transparent;
        border-radius: 50%;
        margin: 0 auto 30px;
        animation: spin 1s linear infinite;
      }

      .processing-status {
        color: #FFBF00;
        font-family: monospace;
        letter-spacing: 4px;
        font-size: 11px;
        margin: 0 0 10px 0;
      }

      .processing-line {
        width: 200px;
        height: 1px;
        background-color: #FFBF00;
        margin: 10px auto;
        opacity: 0.5;
      }

      .processing-subtitle {
        color: white;
        font-family: sans-serif;
        font-weight: lighter;
        font-size: 9px;
        letter-spacing: 2px;
        margin: 0;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    if (!document.querySelector('style[data-processing-view]')) {
      style.setAttribute('data-processing-view', 'true');
      document.head.appendChild(style);
    }
  }

  /**
   * Show the processing view
   */
  show() {
    if (this.container) {
      this.container.style.display = 'block';
    }
  }

  /**
   * Hide the processing view
   */
  hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  /**
   * Destroy the processing view and clean up
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProcessingView;
}
