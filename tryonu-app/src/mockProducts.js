/**
 * Mock product data for TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM demo
 * Used for demonstration purposes in the recommendation system
 */

export const products = [
  {
    id: 1,
    name: "AVBETOS Smart Jacket",
    brand: "TRYONYOU",
    category: "Jackets",
    price: 299.99,
    currency: "EUR",
    color: "Peacock Blue",
    size: "M",
    style: "Modern",
    fit: "Regular",
    materials: ["Smart Fabric", "Biometric Sensors"],
    image: "/images/smart-jacket.jpg",
    description: "Revolutionary smart jacket with integrated biometric sensors for perfect fit analysis.",
    features: ["Biometric Integration", "Smart Fabric", "Perfect Fit Technology"],
    trend_score: 0.95,
    compatibility_score: 0.92
  },
  {
    id: 2,
    name: "Ultra Adaptive Dress",
    brand: "TRYONYOU",
    category: "Dresses",
    price: 249.99,
    currency: "EUR",
    color: "Luxury Gold",
    size: "S",
    style: "Elegant",
    fit: "Fitted",
    materials: ["Adaptive Fabric", "Memory Fibers"],
    image: "/images/adaptive-dress.jpg",
    description: "Self-adjusting dress that adapts to your body measurements in real-time.",
    features: ["Adaptive Technology", "Memory Fibers", "Real-time Adjustment"],
    trend_score: 0.89,
    compatibility_score: 0.88
  },
  {
    id: 3,
    name: "ABVET Premium Pants",
    brand: "ABVETOS",
    category: "Pants",
    price: 179.99,
    currency: "EUR",
    color: "Deep Navy",
    size: "L",
    style: "Professional",
    fit: "Slim",
    materials: ["Performance Fabric", "Moisture-Wicking"],
    image: "/images/premium-pants.jpg",
    description: "Professional pants with ABVET dual-biometric technology integration.",
    features: ["Biometric Ready", "Performance Fabric", "Professional Design"],
    trend_score: 0.87,
    compatibility_score: 0.91
  },
  {
    id: 4,
    name: "Smart Wardrobe Shirt",
    brand: "TRYONYOU",
    category: "Shirts",
    price: 129.99,
    currency: "EUR",
    color: "Pure White",
    size: "M",
    style: "Classic",
    fit: "Regular",
    materials: ["Smart Cotton", "Tech Fibers"],
    image: "/images/smart-shirt.jpg",
    description: "Classic shirt enhanced with smart wardrobe connectivity features.",
    features: ["Smart Connectivity", "Classic Design", "Tech Enhanced"],
    trend_score: 0.83,
    compatibility_score: 0.86
  },
  {
    id: 5,
    name: "Solidarity Collection Hoodie",
    brand: "ABVETOS",
    category: "Hoodies",
    price: 89.99,
    currency: "EUR",
    color: "Forest Green",
    size: "L",
    style: "Casual",
    fit: "Oversized",
    materials: ["Sustainable Cotton", "Recycled Fibers"],
    image: "/images/solidarity-hoodie.jpg",
    description: "Eco-friendly hoodie from our Solidarity Wardrobe collection.",
    features: ["Sustainable Materials", "Eco-Friendly", "Solidarity Collection"],
    trend_score: 0.79,
    compatibility_score: 0.84
  }
];

/**
 * Product categories for filtering
 */
export const categories = [
  "All",
  "Jackets",
  "Dresses", 
  "Pants",
  "Shirts",
  "Hoodies"
];

/**
 * Available sizes
 */
export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

/**
 * Brand options
 */
export const brands = ["TRYONYOU", "ABVETOS"];

/**
 * Style preferences
 */
export const styles = ["Modern", "Classic", "Elegant", "Professional", "Casual"];

/**
 * Fit preferences  
 */
export const fits = ["Fitted", "Slim", "Regular", "Relaxed", "Oversized"];