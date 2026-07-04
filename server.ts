import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely with our recommended User-Agent for AI Studio Build
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Real full-stack API endpoint for AI Marketing Audits
app.post("/api/audit", async (req, res) => {
  try {
    const { businessName, websiteUrl, niche, selectedServices, goals } = req.body;

    if (!businessName || !niche) {
      return res.status(400).json({ error: "Business Name and Niche/Industry are required." });
    }

    const servicesStr = selectedServices && selectedServices.length > 0 
      ? selectedServices.join(", ") 
      : "SEO, AEO, GEO, Local GMB, Google Ads, Meta Ads";

    // Call the high-speed gemini-3.5-flash model
    const prompt = `
      You are ThinkSarath, an elite AI Digital Marketing & SEO/AEO/GEO Freelancer in Chennai, Tamil Nadu.
      Analyze the following business and generate a bespoke, ultra-premium digital marketing audit and growth strategy matching a luxury, high-end demographic.
      
      Business Name: ${businessName}
      Website/Asset URL: ${websiteUrl || "No website yet"}
      Niche/Industry: ${niche}
      Target Services: ${servicesStr}
      Business Goals: ${goals || "Scale traffic, secure top position on search and AI overviews, maximize ROAS"}
      
      Your analysis must contain:
      1. A customized strategic overview summarizing Chennai or national market opportunities.
      2. A score card of performance (scores from 0 to 100) for SEO, AEO (Answer Engine), GEO (Generative SEO), and Ads.
      3. Exactly 3 high-impact recommendations detailing precise steps, impact level (High, Medium, Low), and marketing channel.
      4. Exactly 2 custom AI/Search prompt funnels showing what high-end customers would prompt on ChatGPT/Perplexity and how to optimize for citations.
      5. An estimated revenue/traffic growth outline (e.g. 3x Traffic Growth over 6 months).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are ThinkSarath, a luxury digital marketing specialist in Chennai. Keep your copy sophisticated, elegant, and directly aligned with revenue growth.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { 
              type: Type.STRING,
              description: "Elegant and professional strategic digital opportunity overview for the client."
            },
            scoreCard: {
              type: Type.OBJECT,
              properties: {
                seoScore: { type: Type.INTEGER, description: "Estimated SEO health score (0-100)" },
                aeoScore: { type: Type.INTEGER, description: "Estimated Answer Engine Optimisation score (0-100)" },
                geoScore: { type: Type.INTEGER, description: "Estimated Generative Engine Optimisation score (0-100)" },
                adsScore: { type: Type.INTEGER, description: "Estimated Paid Ads performance score (0-100)" },
              },
              required: ["seoScore", "aeoScore", "geoScore", "adsScore"]
            },
            recommendations: {
              type: Type.ARRAY,
              description: "Exactly three highly tactical, luxury-aligned digital recommendations.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, description: "Must be 'High', 'Medium', or 'Low'" },
                  channel: { type: Type.STRING },
                },
                required: ["title", "description", "impact", "channel"]
              }
            },
            aeoFunnels: {
              type: Type.ARRAY,
              description: "Exactly two customer-centric AI Overviews prompt optimization funnels.",
              items: {
                type: Type.OBJECT,
                properties: {
                  query: { type: Type.STRING, description: "The high-value prompt a high-net-worth client would enter into ChatGPT/Perplexity." },
                  competitorPresence: { type: Type.STRING, description: "A summary of competitor presence for this search." },
                  recommendedKeywords: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "3-4 precise keywords or entities to feed into the AI index."
                  },
                },
                required: ["query", "competitorPresence", "recommendedKeywords"]
              }
            },
            estimatedGrowth: { 
              type: Type.STRING,
              description: "Professional projected traffic/lead lift (e.g. 3x Traffic Growth over 6 months)."
            }
          },
          required: ["overview", "scoreCard", "recommendations", "aeoFunnels", "estimatedGrowth"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text generated from the Gemini model.");
    }

    const auditData = JSON.parse(text);
    return res.json(auditData);

  } catch (error: any) {
    console.error("Gemini Audit Error:", error);
    return res.status(500).json({ 
      error: "Failed to generate AI Audit. Please ensure GEMINI_API_KEY is configured in Secrets.",
      details: error.message 
    });
  }
});

// Configure Vite and static folders
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server connected in middleware mode.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving production build from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ThinkSarath AI Server running on port ${PORT}`);
  });
}

bootstrap();
