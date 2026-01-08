import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with the Vite environment variable
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export interface LafayetteItem {
  id: string;
  name: string;
  type: string;
  cut: string;
  elasticity: string;
  drape: string;
  intention: string[];
  body_range: string;
  human_message: string;
  image: string;
  price?: number;
  msg?: string;
  asset_glb?: string;
}

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

export const generateHumanClaim = (item: LafayetteItem) => item.human_message;
export const calculateFit = () => "98.5%";

// AI Recommendation Function
export const getAIRecommendation = async (userMood: string, userBodyType: string) => {
  try {
    if (!API_KEY) {
      console.warn("VITE_GOOGLE_API_KEY is missing. Using fallback logic.");
      return lafayetteDB[0]; // Fallback
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Act as a high-end fashion stylist for Galeries Lafayette. 
    User Mood: ${userMood}. 
    Body Type: ${userBodyType}. 
    Available Items: ${JSON.stringify(lafayetteDB.map(i => ({id: i.id, name: i.name, intention: i.intention})))}.
    Recommend the single best item ID from the list and explain why in one elegant sentence. 
    Return JSON format: { "recommendedId": "ID", "reason": "Reason" }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Simple parsing (in production, use safer JSON parsing)
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return lafayetteDB.find(i => i.id === data.recommendedId) || lafayetteDB[0];
    }
    return lafayetteDB[0];
  } catch (error) {
    console.error("AI Recommendation Failed:", error);
    return lafayetteDB[0];
  }
};
