/**
 * Image Mapping - Maps expected image names to actual uploaded images
 * This allows us to use the actual images provided by the user
 */

// List of all available images
export const AVAILABLE_IMAGES = [
  '058C3228-4186-42DA-A3B0-7FFFC5858475.jpeg',
  '1F86DC41-20DB-40DB-9EAF-AA2DCFBD7659.jpeg',
  '255AF0B2-C8DE-4471-950F-AA85BFFA440A.jpeg',
  '2BA10BC2-B005-4A9F-AB94-031F58EC1576.jpeg',
  '3FA4C6BE-23DB-4BF1-9450-5D937394A212.jpeg',
  '40C333FA-E61F-46B3-ACA5-BE87102925A5.png',
  '4714F6D3-FD00-4740-830F-11A9C7005FE1.jpeg',
  '4B83EBF7-93D1-4A6A-A9CE-8DC4C9525F4C.jpeg',
  '4F9CD5FF-4281-4996-8D90-2F19345C45B3.jpeg',
  '5033D97E-6E8D-445B-B77E-6738E8CD974C.jpeg',
  '54352651-A98A-48EA-BB50-696BF892957D.png',
  '55B2BF3B-8A59-4C91-8982-9F26E5D65C98.png',
  '60EC0BDE-04B2-43B8-B2FD-598A1CC745C5.png',
  '6C3EFD29-A53C-4A8E-A967-F5D6F7AA6E97.jpeg',
  '6EBE4503-BDAE-4C73-954C-2E5B4C5B0F72.png',
  '77D43646-A601-441E-B8E8-EB47EE01B90F.jpeg',
  '7C927899-D80C-4BE3-8FEC-A7161545C333.jpeg',
  '8016CE85-8BA7-4DBC-AA48-FB6344253472.jpeg',
  '9790F68A-42C1-440F-9A09-2E2D41142AF8.png',
  'A281609D-C6CC-4092-BD2F-24520C798446.jpeg',
  'A41D2189-E580-48FF-87D6-CF016BF50D51.jpeg',
  'A90C384A-AF43-4E37-85C1-4CC1F23A1C5E.png',
  'AA553BC6-1179-4792-948D-C83C967C7CE8.jpeg',
  'C2538E4C-3220-4903-9FB3-07C7441DCDDD.jpeg',
  'C5F7259D-1E5C-436E-B8BE-188AFB5292E9.jpeg',
  'C9E46B58-5650-4B9F-A2E0-7DDD53BE2839.jpeg',
  'D6FE88A2-2E68-451D-8937-7868FB5A0EB5.jpeg',
  'E401A25E-BC3A-4E2A-91FB-89C8A7F6D350.png',
  'E4387A05-5259-44F4-8210-51628F5E4EDD.png',
  'E484B241-301A-450E-A7C9-98E824E1FF80.png',
]

// Mapping of expected image names to actual images
export const IMAGE_MAP = {
  // Wardrobe items
  'silk-blouse.jpg': 'C2538E4C-3220-4903-9FB3-07C7441DCDDD.jpeg',
  'jeans.jpg': 'A281609D-C6CC-4092-BD2F-24520C798446.jpeg',
  'midi-dress.jpg': 'AA553BC6-1179-4792-948D-C83C967C7CE8.jpeg',
  'blazer.jpg': '4F9CD5FF-4281-4996-8D90-2F19345C45B3.jpeg',
  'sweater.jpg': 'A41D2189-E580-48FF-87D6-CF016BF50D51.jpeg',
  'belt.jpg': '77D43646-A601-441E-B8E8-EB47EE01B90F.jpeg',
  'skirt.jpg': '6C3EFD29-A53C-4A8E-A967-F5D6F7AA6E97.jpeg',
  'tshirt.jpg': 'C9E46B58-5650-4B9F-A2E0-7DDD53BE2839.jpeg',
  'trench.jpg': '8016CE85-8BA7-4DBC-AA48-FB6344253472.jpeg',
  'dress.jpg': 'D6FE88A2-2E68-451D-8937-7868FB5A0EB5.jpeg',
  'pants.jpg': '5033D97E-6E8D-445B-B77E-6738E8CD974C.jpeg',
  'necklace.jpg': '4714F6D3-FD00-4740-830F-11A9C7005FE1.jpeg',

  // Showroom looks
  'showroom-power-meeting.jpg': 'E4387A05-5259-44F4-8210-51628F5E4EDD.png',
  'showroom-business.jpg': 'E484B241-301A-450E-A7C9-98E824E1FF80.png',
  'showroom-evening.jpg': 'E401A25E-BC3A-4E2A-91FB-89C8A7F6D350.png',
  'showroom-festival.jpg': '54352651-A98A-48EA-BB50-696BF892957D.png',
  'showroom-city-explorer.jpg': '9790F68A-42C1-440F-9A09-2E2D41142AF8.png',
  'showroom-clean-slate.jpg': '6EBE4503-BDAE-4C73-954C-2E5B4C5B0F72.png',
  'showroom-summer-sunset.jpg': 'A90C384A-AF43-4E37-85C1-4CC1F23A1C5E.png',
  'showroom-street-cred.jpg': '40C333FA-E61F-46B3-ACA5-BE87102925A5.png',
  'showroom-weekend-vibes.jpg': '55B2BF3B-8A59-4C91-8982-9F26E5D65C98.png',
  'showroom-date-night.jpg': '60EC0BDE-04B2-43B8-B2FD-598A1CC745C5.png',

  // Glow-up images
  'glowup-before-1.jpg': '2BA10BC2-B005-4A9F-AB94-031F58EC1576.jpeg',
  'glowup-after-1.jpg': '1F86DC41-20DB-40DB-9EAF-AA2DCFBD7659.jpeg',
  'glowup-before-2.jpg': '3FA4C6BE-23DB-4BF1-9450-5D937394A212.jpeg',
  'glowup-after-2.jpg': '255AF0B2-C8DE-4471-950F-AA85BFFA440A.jpeg',
  'glowup-before-3.jpg': '7C927899-D80C-4BE3-8FEC-A7161545C333.jpeg',
  'glowup-after-3.jpg': '058C3228-4186-42DA-A3B0-7FFFC5858475.jpeg',
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

