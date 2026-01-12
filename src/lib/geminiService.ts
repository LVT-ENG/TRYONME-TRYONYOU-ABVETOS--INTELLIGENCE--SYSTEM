
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from "@google/genai";
import { Asset, BiometricData, PlacedLayer, Product, RecommendationResult } from "../types";
import { Language } from "../data/i18n";

/**
 * Genera una justificación técnica del ajuste basada en física textil.
 */
export const generateFittingLogic = async (user: BiometricData, product: Product, size: string, lang: Language): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langMap = { en: 'English', fr: 'French' };
  
  const prompt = `Actúa como un Ingeniero Textil Senior para Galeries Lafayette. 
  Justifica el ajuste para:
  Prenda: ${product.name} (Talla ${size})
  Biometría Usuario: Pecho ${user.chest}cm, Hombros ${user.shoulders}cm.
  Física del Material: Elasticidad ${product.properties.elasticity}%, Rigidez ${product.properties.drape}/10.
  
  Explica por qué esta talla es la óptima basándote en la "distribución de tensión" y la "recuperación del tejido". 
  Máximo 2 frases. Idioma: ${langMap[lang]}. Profesional y directo.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text || "Ajuste validado mediante varianza biométrica y coeficientes de elasticidad.";
};

/**
 * Motor de Coincidencia Determinístico (Sync con main.py).
 */
export const calculateBestFit = (user: BiometricData, inventory: Product[], preference: string, occasion: string): RecommendationResult => {
  let bestResult: RecommendationResult | null = null;
  let highestScore = -Infinity;

  for (const product of inventory) {
    if (product.occasions && !product.occasions.includes(occasion as any)) continue;

    for (const [sizeLabel, dims] of Object.entries(product.sizeTable)) {
      let score = 100.0;
      
      // 1. Varianza de Pecho con Lógica de Elasticidad (Sync con main.py)
      const chestDiff = Math.abs(user.chest - dims.chest);
      if (chestDiff > 2) {
        // Compensación por elasticidad (0.04 en Python = 4% aquí)
        if (product.properties.elasticity > 4 && user.chest > dims.chest) {
          score -= (chestDiff * 0.5); 
        } else {
          score -= (chestDiff * 2.0); 
        }
      }

      // 2. Alineación de Hombros (Peso Crítico x3.5)
      const shoulderDiff = Math.abs(user.shoulders - dims.shoulders);
      score -= (shoulderDiff * 3.5);

      // 3. Alineación de Cintura
      const waistDiff = Math.abs(user.waist - dims.waist);
      score -= (waistDiff * 1.0);

      // 4. Preferencia de Estilo
      if (product.properties.cut === preference) score += 5;

      if (score > highestScore) {
        highestScore = score;
        bestResult = {
          product,
          size: sizeLabel,
          matchScore: score,
          logicExplanation: "" 
        };
      }
    }
  }

  return bestResult || {
    product: inventory[0],
    size: 'M',
    matchScore: 0,
    logicExplanation: "Anomalía detectada: Varianza biométrica fuera de rango."
  };
};

/**
 * Procesa audio para extraer preferencias de fit.
 */
export const processAudioCommand = async (audioBase64: string, mimeType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: audioBase64, mimeType } },
        { text: "Extract user styling preferences: 'occasion' (work, event, casual, ceremony) and 'fitPreference' (slim, regular, relaxed). Respond only in JSON." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          occasion: { type: Type.STRING },
          fitPreference: { type: Type.STRING }
        }
      }
    }
  });
  
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return {};
  }
};

export const generateAsset = async (prompt: string, type: 'logo' | 'product'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: `Professional studio photo of a ${type}: ${prompt}. Isolated on white background.`,
  });
  const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  return imagePart?.inlineData ? `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}` : "";
};

export const generateMockup = async (product: Asset, layers: { asset: Asset, placement: PlacedLayer }[], prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const parts: any[] = [];
  const [pMime, pData] = product.data.split(';base64,');
  parts.push({ inlineData: { data: pData, mimeType: pMime.split(':')[1] } });
  layers.forEach(l => {
    const [lMime, lData] = l.asset.data.split(';base64,');
    parts.push({ inlineData: { data: lData, mimeType: lMime.split(':')[1] } });
  });
  parts.push({ text: prompt });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts }
  });
  const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  return imagePart?.inlineData ? `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}` : "";
};

export const generateRealtimeComposite = async (imageB64: string, prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let data = imageB64;
  let mimeType = 'image/png';
  if (imageB64.includes(';base64,')) {
    const parts = imageB64.split(';base64,');
    mimeType = parts[0].split(':')[1];
    data = parts[1];
  }
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ inlineData: { data, mimeType } }, { text: prompt }] }
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
  return "";
};
