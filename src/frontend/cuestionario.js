/**
 * TRYONYOU - Cuestionario (Questionnaire)
 * User profiling and onboarding questionnaire
 */

export class Cuestionario {
  constructor(config = {}) {
    this.containerId = config.containerId || 'questionnaire-container';
    this.steps = config.steps || this.getDefaultSteps();
    this.currentStep = 0;
    this.responses = {};
    this.onComplete = config.onComplete || null;
  }

  /**
   * Get default questionnaire steps
   */
  getDefaultSteps() {
    return [
      {
        id: 'welcome',
        type: 'intro',
        title: 'Welcome to TRYONYOU',
        content: 'Let\'s create your perfect fashion profile in just a few steps.',
        icon: '👋'
      },
      {
        id: 'style-preference',
        type: 'multiple-choice',
        question: 'What\'s your style preference?',
        options: [
          { value: 'modern', label: 'Modern & Minimal', icon: '🖤' },
          { value: 'elegant', label: 'Elegant & Classic', icon: '✨' },
          { value: 'bold', label: 'Bold & Expressive', icon: '🎨' },
          { value: 'casual', label: 'Casual & Comfortable', icon: '👕' }
        ]
      },
      {
        id: 'color-preference',
        type: 'multiple-select',
        question: 'What colors do you prefer?',
        options: [
          { value: 'black', label: 'Black', color: '#000000' },
          { value: 'white', label: 'White', color: '#FFFFFF' },
          { value: 'gold', label: 'Gold', color: '#D4AF37' },
          { value: 'blue', label: 'Blue', color: '#0066CC' },
          { value: 'red', label: 'Red', color: '#CC0000' },
          { value: 'green', label: 'Green', color: '#00AA00' }
        ]
      },
      {
        id: 'measurements',
        type: 'form',
        question: 'Your measurements (optional)',
        fields: [
          { name: 'height', label: 'Height (cm)', type: 'number', placeholder: '170' },
          { name: 'chest', label: 'Chest (cm)', type: 'number', placeholder: '90' },
          { name: 'waist', label: 'Waist (cm)', type: 'number', placeholder: '75' },
          { name: 'hips', label: 'Hips (cm)', type: 'number', placeholder: '95' }
        ]
      },
      {
        id: 'occasions',
        type: 'multiple-select',
        question: 'What occasions do you dress for?',
        options: [
          { value: 'work', label: 'Work/Professional', icon: '💼' },
          { value: 'casual', label: 'Casual/Daily', icon: '☕' },
          { value: 'formal', label: 'Formal Events', icon: '🎩' },
          { value: 'sports', label: 'Sports/Active', icon: '🏃' },
          { value: 'evening', label: 'Evening/Party', icon: '🌙' }
        ]
      },
      {
        id: 'complete',
        type: 'outro',
        title: 'Profile Complete! 🎉',
        content: 'Your personalized TRYONYOU experience is ready.',
        icon: '✅'
      }
    ];
  }

  /**
   * Initialize questionnaire
   */
  async init() {
    console.log('📋 Initializing Cuestionario...');

    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Container ${this.containerId} not found`);
    }

    this.render();
    console.log('✅ Cuestionario initialized');
    return this;
  }

  /**
   * Render current step
   */
  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const step = this.steps[this.currentStep];
    
    let html = `
      <div class="questionnaire-step" data-step="${step.id}">
        <div class="step-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(this.currentStep / (this.steps.length - 1)) * 100}%"></div>
          </div>
          <div class="step-counter">${this.currentStep + 1} / ${this.steps.length}</div>
        </div>
        
        <div class="step-content">
    `;

    switch (step.type) {
      case 'intro':
      case 'outro':
        html += `
          <div class="step-intro">
            <div class="step-icon">${step.icon}</div>
            <h2>${step.title}</h2>
            <p>${step.content}</p>
          </div>
        `;
        break;

      case 'multiple-choice':
        html += `
          <h2>${step.question}</h2>
          <div class="options-grid">
            ${step.options.map(option => `
              <button class="option-button" data-value="${option.value}">
                <span class="option-icon">${option.icon || ''}</span>
                <span class="option-label">${option.label}</span>
              </button>
            `).join('')}
          </div>
        `;
        break;

      case 'multiple-select':
        html += `
          <h2>${step.question}</h2>
          <div class="options-grid">
            ${step.options.map(option => `
              <label class="option-checkbox">
                <input type="checkbox" name="${step.id}" value="${option.value}">
                <span class="option-content">
                  ${option.icon ? `<span class="option-icon">${option.icon}</span>` : ''}
                  ${option.color ? `<span class="option-color" style="background-color: ${option.color}"></span>` : ''}
                  <span class="option-label">${option.label}</span>
                </span>
              </label>
            `).join('')}
          </div>
        `;
        break;

      case 'form':
        html += `
          <h2>${step.question}</h2>
          <div class="form-fields">
            ${step.fields.map(field => `
              <div class="form-field">
                <label for="${step.id}-${field.name}">${field.label}</label>
                <input 
                  type="${field.type}" 
                  id="${step.id}-${field.name}" 
                  name="${field.name}"
                  placeholder="${field.placeholder || ''}"
                >
              </div>
            `).join('')}
          </div>
        `;
        break;
    }

    html += `
        </div>
        
        <div class="step-actions">
          ${this.currentStep > 0 ? '<button class="btn-back" id="btn-back">Back</button>' : ''}
          <button class="btn-next" id="btn-next">${this.currentStep < this.steps.length - 1 ? 'Next' : 'Finish'}</button>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Attach event listeners to buttons
   */
  attachEventListeners() {
    const nextBtn = document.getElementById('btn-next');
    const backBtn = document.getElementById('btn-back');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextStep());
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => this.previousStep());
    }

    // Handle multiple-choice quick select
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = e.currentTarget.dataset.value;
        this.saveResponse(this.steps[this.currentStep].id, value);
        setTimeout(() => this.nextStep(), 300);
      });
    });
  }

  /**
   * Save response for current step
   */
  saveResponse(stepId, value) {
    const step = this.steps.find(s => s.id === stepId);
    
    if (step.type === 'multiple-select') {
      const checkboxes = document.querySelectorAll(`input[name="${stepId}"]:checked`);
      value = Array.from(checkboxes).map(cb => cb.value);
    } else if (step.type === 'form') {
      value = {};
      step.fields.forEach(field => {
        const input = document.getElementById(`${stepId}-${field.name}`);
        if (input && input.value) {
          value[field.name] = input.value;
        }
      });
    }

    this.responses[stepId] = value;
    console.log(`📝 Saved response for ${stepId}:`, value);
  }

  /**
   * Go to next step
   */
  nextStep() {
    // Save current step response
    const currentStepData = this.steps[this.currentStep];
    if (currentStepData.type !== 'intro' && currentStepData.type !== 'outro') {
      this.saveResponse(currentStepData.id, null);
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.complete();
    }
  }

  /**
   * Go to previous step
   */
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  /**
   * Complete questionnaire
   */
  complete() {
    console.log('✅ Questionnaire complete!', this.responses);

    if (this.onComplete) {
      this.onComplete(this.responses);
    }

    // Dispatch event
    document.dispatchEvent(new CustomEvent('questionnaire:complete', {
      detail: { responses: this.responses }
    }));
  }

  /**
   * Get user profile from responses
   */
  getUserProfile() {
    return {
      style: this.responses['style-preference'],
      colors: this.responses['color-preference'],
      measurements: this.responses['measurements'],
      occasions: this.responses['occasions'],
      completedAt: new Date().toISOString()
    };
  }
}

export default Cuestionario;
