// Body shape options for personalization
export const BODY_SHAPES = [
  { id: 'blueberry', emoji: '🫐', label: 'Blueberry', description: 'Round and balanced' },
  { id: 'lemon', emoji: '🍋', label: 'Lemon', description: 'Athletic and lean' },
  { id: 'peach', emoji: '🍑', label: 'Peach', description: 'Curvy and defined' },
  { id: 'melon', emoji: '🍈', label: 'Melon', description: 'Broad and powerful' },
  { id: 'watermelon', emoji: '🍉', label: 'Watermelon', description: 'Tall and statuesque' },
  { id: 'fox', emoji: '🦊', label: 'Fox', description: 'Slim and agile' },
  { id: 'panther', emoji: '🐆', label: 'Panther', description: 'Strong and sleek' },
  { id: 'tiger', emoji: '🐅', label: 'Tiger', description: 'Muscular and bold' },
  { id: 'bull', emoji: '🐂', label: 'Bull', description: 'Broad shouldered' },
  { id: 'elephant', emoji: '🐘', label: 'Elephant', description: 'Majestic and grand' },
]

// Brand catalog
export const BRANDS = [
  { 
    id: 'liveit', 
    name: "LIVE 'IT", 
    emoji: '🌟', 
    featured: true, 
    tagline: 'Where beauty lives in movement',
    color: '#d4af37'
  },
  { 
    id: 'everline', 
    name: 'Everline', 
    emoji: '👗', 
    featured: false, 
    tagline: 'Timeless elegance',
    color: '#8b5cf6'
  },
  { 
    id: 'northstudio', 
    name: 'North Studio', 
    emoji: '🧥', 
    featured: false, 
    tagline: 'Urban minimalism',
    color: '#3b82f6'
  },
  { 
    id: 'heritage', 
    name: 'Heritage Mode', 
    emoji: '🎩', 
    featured: false, 
    tagline: 'Classic redefined',
    color: '#78350f'
  },
  { 
    id: 'neoform', 
    name: 'NeoForm', 
    emoji: '⚡', 
    featured: false, 
    tagline: 'Future fashion',
    color: '#06b6d4'
  },
  { 
    id: 'velvet', 
    name: 'Velvet Touch', 
    emoji: '💜', 
    featured: false, 
    tagline: 'Luxury comfort',
    color: '#a855f7'
  },
]

// Wardrobe categories
export const WARDROBE_CATEGORIES = [
  { id: 'clothes', emoji: '👕', label: 'Clothes' },
  { id: 'shoes', emoji: '👟', label: 'Shoes' },
  { id: 'accessories', emoji: '💍', label: 'Accessories' },
  { id: 'makeup', emoji: '💄', label: 'Makeup' },
  { id: 'hair', emoji: '💇', label: 'Hair' },
]

// Sample wardrobe items
export const WARDROBE_ITEMS = {
  clothes: [
    { id: 'c1', name: 'Cubist Flow Jacket', brand: 'liveit', price: 299, image: null },
    { id: 'c2', name: 'High-Rise Texture Pants', brand: 'liveit', price: 189, image: null },
    { id: 'c3', name: 'Silk Geometric Blouse', brand: 'everline', price: 159, image: null },
    { id: 'c4', name: 'Urban Structured Coat', brand: 'northstudio', price: 449, image: null },
  ],
  shoes: [
    { id: 's1', name: 'Urban Sway Sneaker', brand: 'liveit', price: 220, image: null },
    { id: 's2', name: 'Classic Leather Boot', brand: 'heritage', price: 380, image: null },
  ],
  accessories: [
    { id: 'a1', name: 'Geometric Gold Hoops', brand: 'liveit', price: 89, image: null },
    { id: 'a2', name: 'Minimalist Watch', brand: 'northstudio', price: 250, image: null },
  ],
  makeup: [
    { id: 'm1', name: 'Editorial Bold Red', brand: 'liveit', price: 45, image: null },
    { id: 'm2', name: 'Nude Glow Palette', brand: 'velvet', price: 65, image: null },
  ],
  hair: [
    { id: 'h1', name: 'Sleek Modern Cut', brand: null, price: 0, image: null },
    { id: 'h2', name: 'Textured Waves', brand: null, price: 0, image: null },
  ],
}

// Peacock AI responses
export const PEACOCK_RESPONSES = [
  "Mmm… for that, I see silk, structure, and just a whisper of rebellion.",
  "Style is a whisper, not a shout. Let's find your voice.",
  "Now that you feel it… LIVE 'IT.",
  "Elegance is not about being noticed, it's about being remembered.",
  "Your energy speaks before your outfit does. Let's make them harmonize.",
  "I sense something bold in you today. Shall we explore it?",
  "Fashion fades, style is eternal. Let's build something timeless.",
]

// Navigation items
export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/brands', label: 'Brands' },
  { path: '/avatar', label: 'My Avatar' },
  { path: '/wardrobe', label: 'Wardrobe' },
  { path: '/showroom', label: 'Showroom' },
  { path: '/recommendation', label: 'Glow-Up' },
  { path: '/ai-system', label: 'Ask Peacock' },
]

