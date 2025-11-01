// ===========================================================
// QUESTIONNAIRE MODULE — User Profile & Preferences
// Version 1.4 - Deploy Express Package
// TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
// ===========================================================

/**
 * QUESTIONNAIRE (User Profile & Preferences System)
 * Sistema de cuestionarios para capturar preferencias de usuario
 * Genera perfiles personalizados para mejorar recomendaciones
 * 
 * @version 1.4
 * @module QUESTIONNAIRE
 * @agent Agent 70
 */

// Core Components
export { default as QuestionManager } from './core/QuestionManager'
export { default as ProfileBuilder } from './core/ProfileBuilder'
export { default as ResponseAnalyzer } from './core/ResponseAnalyzer'
export { default as PreferenceEngine } from './core/PreferenceEngine'

// Utilities
export { createQuestion, validateResponse } from './utils/questionUtils'
export { buildProfile, updateProfile } from './utils/profileUtils'
export { analyzeResponses, extractPreferences } from './utils/analysisUtils'

// Constants
export const QUESTIONNAIRE_VERSION = '1.4'
export const QUESTIONNAIRE_MODULE_NAME = 'QUESTIONNAIRE - User Profile & Preferences'
export const AGENT_SOURCE = 'Agent 70'

// Question Types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SINGLE_CHOICE: 'single_choice',
  RATING_SCALE: 'rating_scale',
  TEXT_INPUT: 'text_input',
  IMAGE_SELECTION: 'image_selection',
  SLIDER: 'slider',
  YES_NO: 'yes_no'
}

// Profile Categories
export const PROFILE_CATEGORIES = {
  STYLE: 'style',
  COLOR: 'color',
  FIT: 'fit',
  OCCASION: 'occasion',
  BUDGET: 'budget',
  SUSTAINABILITY: 'sustainability',
  BIOMETRIC: 'biometric'
}

// Default Questionnaire Templates
export const QUESTIONNAIRE_TEMPLATES = {
  ONBOARDING: 'onboarding',
  STYLE_DISCOVERY: 'style_discovery',
  SEASONAL: 'seasonal',
  SPECIAL_EVENT: 'special_event',
  FEEDBACK: 'feedback'
}

// Default configuration
export const QUESTIONNAIRE_DEFAULT_CONFIG = {
  adaptiveQuestions: true,
  progressTracking: true,
  autoSave: true,
  requireCompletion: false,
  maxQuestions: 50,
  timeoutEnabled: false,
  timeout: 1800000, // 30 minutes
  allowSkip: true,
  showProgress: true,
  multiLanguage: true,
  languages: ['en', 'es', 'fr', 'de', 'it'],
  debugMode: false
}

// API Interface
export class QUESTIONNAIRE_API {
  constructor(config = {}) {
    this.config = { ...QUESTIONNAIRE_DEFAULT_CONFIG, ...config }
    this.isInitialized = false
    this.questionnaires = new Map()
    this.responses = new Map()
    this.profiles = new Map()
  }

  async initialize() {
    console.log(`Initializing ${QUESTIONNAIRE_MODULE_NAME} v${QUESTIONNAIRE_VERSION}`)
    this.isInitialized = true
    return { success: true, version: QUESTIONNAIRE_VERSION }
  }

  async createQuestionnaire(template = QUESTIONNAIRE_TEMPLATES.ONBOARDING, customQuestions = []) {
    if (!this.isInitialized) {
      throw new Error('QUESTIONNAIRE not initialized')
    }

    const questionnaireId = `QUEST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const questionnaire = {
      id: questionnaireId,
      template,
      questions: customQuestions.length > 0 ? customQuestions : this._getTemplateQuestions(template),
      createdAt: Date.now(),
      status: 'active'
    }

    this.questionnaires.set(questionnaireId, questionnaire)
    return { success: true, questionnaireId, questionnaire }
  }

  _getTemplateQuestions(template) {
    // Default questions based on template
    const templates = {
      onboarding: [
        { id: 1, type: QUESTION_TYPES.SINGLE_CHOICE, text: 'What is your primary style?', options: ['Casual', 'Formal', 'Sporty', 'Eclectic'] },
        { id: 2, type: QUESTION_TYPES.MULTIPLE_CHOICE, text: 'What colors do you prefer?', options: ['Neutrals', 'Brights', 'Pastels', 'Dark'] },
        { id: 3, type: QUESTION_TYPES.RATING_SCALE, text: 'How important is sustainability?', min: 1, max: 5 }
      ],
      style_discovery: [
        { id: 1, type: QUESTION_TYPES.IMAGE_SELECTION, text: 'Select styles you like', images: [] },
        { id: 2, type: QUESTION_TYPES.SLIDER, text: 'Casual to Formal preference', min: 0, max: 100 }
      ]
    }

    return templates[template] || templates.onboarding
  }

  async submitResponse(questionnaireId, userId, responses) {
    if (!this.isInitialized) {
      throw new Error('QUESTIONNAIRE not initialized')
    }

    const responseId = `RESP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const response = {
      id: responseId,
      questionnaireId,
      userId,
      responses,
      submittedAt: Date.now()
    }

    this.responses.set(responseId, response)

    // Build or update profile
    await this._buildProfile(userId, responses)

    return { success: true, responseId, profileUpdated: true }
  }

  async _buildProfile(userId, responses) {
    let profile = this.profiles.get(userId) || {
      userId,
      preferences: {},
      createdAt: Date.now()
    }

    // Analyze responses and update profile
    profile.preferences = { ...profile.preferences, ...responses }
    profile.updatedAt = Date.now()

    this.profiles.set(userId, profile)
    return profile
  }

  async getProfile(userId) {
    return this.profiles.get(userId) || null
  }

  async getQuestionnaire(questionnaireId) {
    return this.questionnaires.get(questionnaireId) || null
  }

  async getStatus() {
    return {
      module: QUESTIONNAIRE_MODULE_NAME,
      version: QUESTIONNAIRE_VERSION,
      initialized: this.isInitialized,
      questionnairesCount: this.questionnaires.size,
      responsesCount: this.responses.size,
      profilesCount: this.profiles.size,
      config: this.config
    }
  }
}

export default QUESTIONNAIRE_API
