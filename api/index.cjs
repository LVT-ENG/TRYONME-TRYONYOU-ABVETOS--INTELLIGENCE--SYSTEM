
const express = require('express');
const cors = require('cors');
// Initialize Google GenAI
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize GenAI client if key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient = null;
if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
}

// Route for Gemini
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Missing prompt" });
        }

        if (aiClient) {
            // Real AI logic
            const result = await aiClient.models.generateContent({
              model: "gemini-2.0-flash",
              contents: [{ role: "user", parts: [{ text: prompt }] }],
            });
             res.status(200).json({ text: result.response.text() });
        } else {
             // Fallback/Mock logic if no key provided
             console.warn("⚠️ No GEMINI_API_KEY found. Returning mock response.");
             res.status(200).json({
                 text: `[MOCK AI]: I received your prompt: "${prompt}". (Configure GEMINI_API_KEY to get real responses).`
             });
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
});

// Export for Vercel
module.exports = app;
