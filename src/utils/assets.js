/**
 * Asset utilities for TRYONYOU platform
 */

export function getImageWithFallback(path) {
  // Fallback to a default image if the path doesn't exist
  return path || '/assets/images/placeholder.jpg';
}

export function getLogoPath(brandName) {
  // Get logo path for brand
  return `/assets/logo/${brandName?.toLowerCase() || 'default'}.svg`;
}

export function getAssetUrl(assetPath) {
  // Helper to get full asset URL
  return `/assets/${assetPath}`;
}

export function validateImageUrl(url) {
  // Validate if image URL is valid
  try {
    new URL(url);
    return url;
  } catch {
    return '/assets/images/placeholder.jpg';
  }
}
