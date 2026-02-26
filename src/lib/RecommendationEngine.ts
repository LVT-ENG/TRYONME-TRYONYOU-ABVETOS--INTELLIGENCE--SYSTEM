/**
 * RecommendationEngine.ts — AI-powered fashion recommendation engine.
 *
 * Integrates Google Gemini 2.0 Flash to suggest a garment from `lafayetteDB`
 * based on the user's mood and body type.
 *
 * Environment variable required:
 *   VITE_GOOGLE_API_KEY — Google Generative AI API key.
 *   When missing, the engine gracefully falls back to the first catalog item.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with the Vite environment variable
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/** Represents a single garment in the Lafayette catalog. */
export interface LafayetteItem {
  id: string;
  name: string;
  type: string;
  /** Silhouette feeling: Fitted | Fluid | Relaxed */
  cut: string;
  elasticity: string;
  drape: string;
  /** Occasions this item suits, e.g. ["work", "event"] */
  intention: string[];
  body_range: string;
  /** Empathetic message shown to the end-user after a recommendation. */
  human_message: string;
  image: string;
  price?: number;
  /** Short editorial tagline. */
  msg?: string;
  /** Path to a 3-D model file for AR try-on. */
  asset_glb?: string;
}

/** Static product catalog — source of truth for all recommendation logic. */
export const lafayetteDB: LafayetteItem[] = [
  {
    id: "GL-9928",
    name: "Structured Blazer",
    type: "Blazer",
    cut: "Fitted",
    elasticity: "Low",
    drape: "Firm",
    intention: ["work", "event"],
    body_range: "Defined Shoulders",
    human_message: "This blazer respects your natural structure, ideal for an elegant presence.",
    image: "/assets/catalog/red_dress_minimal.png",
    price: 850,
    msg: "Structure defines presence.",
    asset_glb: "blazer.glb"
  },
  {
    id: "GL-4412",
    name: "Fluid Midi Dress",
    type: "Midi Dress",
    cut: "Fluid",
    elasticity: "Medium",
    drape: "High",
    intention: ["casual", "daily"],
    body_range: "Free Movement",
    human_message: "The drape of this fabric accompanies your walk without restrictions.",
    image: "/assets/catalog/red_dress_fur.png",
    price: 1200,
    msg: "Fluidity is freedom.",
    asset_glb: "dress.glb"
  },
  {
    id: "burberry_trench",
    name: "Classic Trench",
    type: "Coat",
    cut: "Relaxed",
    elasticity: "High",
    drape: "Soft",
    intention: ["daily", "work"],
    body_range: "Comfort First",
    human_message: "Effortless elegance that moves with your daily rhythm.",
    image: "/assets/catalog/burberry_trench.png",
    price: 2400,
    msg: "Timeless protection.",
    asset_glb: "trench.glb"
  }
];

/** Returns the empathetic human message associated with a catalog item. */
export const generateHumanClaim = (item: LafayetteItem) => item.human_message;

/** Placeholder fit-score calculation (to be replaced with MediaPipe data). */
export const calculateFit = () => "98.5%";

/**
 * Queries Gemini 2.0 Flash to select the best matching item from `lafayetteDB`.
 *
 * @param userMood     — e.g. "confident", "relaxed"
 * @param userBodyType — e.g. "athletic", "petite"
 * @returns The recommended LafayetteItem, or the first item as a safe fallback.
 */
export const getAIRecommendation = async (userMood: string, userBodyType: string) => {
  try {
    if (!API_KEY) {
      console.warn("VITE_GOOGLE_API_KEY is missing. Using fallback logic.");
      return lafayetteDB[0]; // Fallback: return first catalog item
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build a structured prompt for the stylist persona
    const prompt = `Act as a high-end fashion stylist for Galeries Lafayette. 
    User Mood: ${userMood}. 
    Body Type: ${userBodyType}. 
    Available Items: ${JSON.stringify(lafayetteDB.map(i => ({id: i.id, name: i.name, intention: i.intention})))}.
    Recommend the single best item ID from the list and explain why in one elegant sentence. 
    Return JSON format: { "recommendedId": "ID", "reason": "Reason" }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Attempt to extract the first JSON object from the model response using a non-greedy match
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return lafayetteDB.find(i => i.id === data.recommendedId) || lafayetteDB[0];
    }
    return lafayetteDB[0];
  } catch (error) {
    console.error("AI Recommendation Failed:", error);
    return lafayetteDB[0]; // Safe fallback on any error
  }
};
