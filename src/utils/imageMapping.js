/**
 * Image Mapping - Maps expected image names to actual uploaded images
 * This allows us to use the actual images provided by the user
 */

// List of all available images in /public/assets/images/
export const AVAILABLE_IMAGES = [
  '5033D97E-6E8D-445B-B77E-6738E8CD974C.jpeg',
  '54352651-A98A-48EA-BB50-696BF892957D.png',
  '8016CE85-8BA7-4DBC-AA48-FB6344253472.jpeg',
  '9790F68A-42C1-440F-9A09-2E2D41142AF8.png',
  'A281609D-C6CC-4092-BD2F-24520C798446.jpeg',
  'A41D2189-E580-48FF-87D6-CF016BF50D51.jpeg',
  'A90C384A-AF43-4E37-85C1-4CC1F23A1C5E.png',
  'D6FE88A2-2E68-451D-8937-7868FB5A0EB5.jpeg',
  'E401A25E-BC3A-4E2A-91FB-89C8A7F6D350.png',
  'E484B241-301A-450E-A7C9-98E824E1FF80.png',
  'bg.jpeg',
  'dress.jpeg',
  'jeans.jpeg',
  'midi-dress.jpeg',
  'pant-coat.jpeg',
  'showroom-bg.png',
  'silk-blouse.jpeg',
  'template.jpeg',
  'wardrobe-bg.jpeg',
]

// Mapping of expected image names to actual images
export const IMAGE_MAP = {
  // Background images
  'bg.jpg': 'bg.jpeg',
  'showroom-bg.jpg': 'showroom-bg.png',
  'wardrobe-bg.jpg': 'wardrobe-bg.jpeg',
  
  // Wardrobe items (named files)
  'silk-blouse.jpg': 'silk-blouse.jpeg',
  'jeans.jpg': 'jeans.jpeg',
  'midi-dress.jpg': 'midi-dress.jpeg',
  'dress.jpg': 'dress.jpeg',
  'pant-coat.jpg': 'pant-coat.jpeg',
  'template.jpg': 'template.jpeg',
  
  // UUID-named wardrobe items
  'pants.jpg': '5033D97E-6E8D-445B-B77E-6738E8CD974C.jpeg',
  'blazer.jpg': '8016CE85-8BA7-4DBC-AA48-FB6344253472.jpeg',
  'sweater.jpg': 'A41D2189-E580-48FF-87D6-CF016BF50D51.jpeg',
  'belt.jpg': 'A281609D-C6CC-4092-BD2F-24520C798446.jpeg',
  'dress2.jpg': 'D6FE88A2-2E68-451D-8937-7868FB5A0EB5.jpeg',

  // Showroom looks (PNG files)
  'showroom-power-meeting.jpg': 'E484B241-301A-450E-A7C9-98E824E1FF80.png',
  'showroom-business.jpg': 'E484B241-301A-450E-A7C9-98E824E1FF80.png',
  'showroom-evening.jpg': 'E401A25E-BC3A-4E2A-91FB-89C8A7F6D350.png',
  'showroom-festival.jpg': '54352651-A98A-48EA-BB50-696BF892957D.png',
  'showroom-city-explorer.jpg': '9790F68A-42C1-440F-9A09-2E2D41142AF8.png',
  'showroom-clean-slate.jpg': 'A90C384A-AF43-4E37-85C1-4CC1F23A1C5E.png',
  'showroom-summer-sunset.jpg': 'A90C384A-AF43-4E37-85C1-4CC1F23A1C5E.png',
  'showroom-street-cred.jpg': '54352651-A98A-48EA-BB50-696BF892957D.png',
  'showroom-weekend-vibes.jpg': '9790F68A-42C1-440F-9A09-2E2D41142AF8.png',
  'showroom-date-night.jpg': 'E401A25E-BC3A-4E2A-91FB-89C8A7F6D350.png',

  // Glow-up / transformation images
  'glowup-before-1.jpg': '5033D97E-6E8D-445B-B77E-6738E8CD974C.jpeg',
  'glowup-after-1.jpg': 'A41D2189-E580-48FF-87D6-CF016BF50D51.jpeg',
  'glowup-before-2.jpg': '8016CE85-8BA7-4DBC-AA48-FB6344253472.jpeg',
  'glowup-after-2.jpg': 'D6FE88A2-2E68-451D-8937-7868FB5A0EB5.jpeg',
  'glowup-before-3.jpg': 'A281609D-C6CC-4092-BD2F-24520C798446.jpeg',
  'glowup-after-3.jpg': 'silk-blouse.jpeg',
}

/**
 * Get the actual image filename from the mapping
 */
export function getMappedImage(expectedName) {
  // If the expected name exists in the map, return the mapped image
  if (IMAGE_MAP[expectedName]) {
    return IMAGE_MAP[expectedName]
  }
  
  // If the expected name is already a UUID filename, return as-is
  if (AVAILABLE_IMAGES.includes(expectedName)) {
    return expectedName
  }
  
  // Return null to trigger fallback
  return null
}

/**
 * Get a random image from available images (for fallback)
 */
export function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_IMAGES.length)
  return AVAILABLE_IMAGES[randomIndex]
}

