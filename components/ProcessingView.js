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
    this.stylesApplied = false;
  }

  /**
   * Initialize the processing view
   */
  init() {
    if (!this.container) {
      console.error('ProcessingView: Container not found');
      return;
    }
    this.applyStyles();
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

    // Create elements safely to avoid XSS
    const processingView = document.createElement('div');
    processingView.className = 'processing-view';

    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay';

    const content = document.createElement('div');
    content.className = 'processing-content';

    const spinner = document.createElement('div');
    spinner.className = 'processing-spinner';

    const statusEl = document.createElement('p');
    statusEl.className = 'processing-status';
    statusEl.textContent = this.status; // Use textContent to prevent XSS

    const line = document.createElement('div');
    line.className = 'processing-line';

    const subtitle = document.createElement('p');
    subtitle.className = 'processing-subtitle';
    subtitle.textContent = 'TRY ON ME // PROCESSING';

    content.appendChild(spinner);
    content.appendChild(statusEl);
    content.appendChild(line);
    content.appendChild(subtitle);

    processingView.appendChild(overlay);
    processingView.appendChild(content);

    // Clear container safely
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.container.appendChild(processingView);
  }

  /**
   * Apply styles to the processing view
   */
  applyStyles() {
    if (this.stylesApplied || document.querySelector('style[data-processing-view]')) {
      return;
    }

    const style = document.createElement('style');
    style.setAttribute('data-processing-view', 'true');
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

    document.head.appendChild(style);
    this.stylesApplied = true;
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
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProcessingView;
}
