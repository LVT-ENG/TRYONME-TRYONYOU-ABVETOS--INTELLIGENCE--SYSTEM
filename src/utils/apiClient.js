/**
 * Asset path utilities for TRYONYOU
 * All assets should be in /public/assets/ or /public/models/
 */

// Base paths
export const ASSETS_BASE = '/assets'
export const MODELS_BASE = '/models'
export const IMAGES_BASE = `${ASSETS_BASE}/images`
export const VIDEOS_BASE = `${ASSETS_BASE}/videos`
export const LOGO_BASE = `${ASSETS_BASE}/logo`
export const ANIMATION_BASE = `${ASSETS_BASE}/animation`

/**
 * Get image path
 */
export function getImagePath(filename, subfolder = '') {
  if (!filename) return null
  const path = subfolder ? `${IMAGES_BASE}/${subfolder}/${filename}` : `${IMAGES_BASE}/${filename}`
  return path
}

/**
 * Get video path
 */
export function getVideoPath(filename) {
  if (!filename) return null
  return `${VIDEOS_BASE}/${filename}`
}

/**
 * Get model path
 */
export function getModelPath(filename) {
  if (!filename) return null
  return `${MODELS_BASE}/${filename}`
}

/**
 * Get logo path
 */
export function getLogoPath(filename) {
  if (!filename) return 'favicon.svg' // Fallback to favicon
  return `${LOGO_BASE}/${filename}`
}

/**
 * Default fallback images (if assets not available)
 */
export const DEFAULT_IMAGES = {
  avatar: '/assets/images/avatar-placeholder.jpg',
  wardrobe: '/assets/images/wardrobe-placeholder.jpg',
  before: '/assets/images/before-placeholder.jpg',
  after: '/assets/images/after-placeholder.jpg',
  glowUp: '/assets/images/glowup-placeholder.jpg',
  brand: '/assets/images/brand-placeholder.jpg',
}

/**
 * Try to load image, fallback to placeholder
 */
export function getImageWithFallback(filename, fallbackType = 'avatar') {
  if (!filename) return DEFAULT_IMAGES[fallbackType] || DEFAULT_IMAGES.avatar
  return getImagePath(filename)
}

// Matching service endpoint (FastAPI backend)
const MATCH_API_URL = 'http://localhost:8000/api/match/best'

/**
 * Request the best match from the backend.
 * Expects backend JSON response with a matchResult field.
 */
export async function fetchBestMatch(payload) {
  const response = await fetch(MATCH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    throw new Error(`Match API request failed (${response.status}): ${details}`)
  }

  const data = await response.json()
  return data?.matchResult ?? null
}

