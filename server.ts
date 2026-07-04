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

// Real full-stack API endpoint for Interactive Lead Qualification & Q&A collection
app.post("/api/lead", async (req, res) => {
  try {
    const { 
      industry, 
      scalingGoal,
      bottleneck, 
      authorityLevel,
      audience,
      competitorState,
      contentCapability,
      geoScope,
      budget, 
      businessName, 
      contactName, 
      email, 
      phone, 
      websiteUrl, 
      customGoal 
    } = req.body;

    if (!businessName || !contactName || !email || !phone) {
      return res.status(400).json({ error: "Missing required contact details (Business Name, Contact Name, Email, Phone are mandatory)." });
    }

    // Static mappings for reference/fallback
    const industryMap: Record<string, string> = {
      healthcare: "Healthcare & Medical Aesthetics Vertical",
      realestate: "Premium Real Estate & Developer Vertical",
      retail: "Luxury Retail & Premium E-Commerce Vertical",
      tech: "High-Growth B2B SaaS & Tech Vertical",
      professional: "Elite Professional & Advisory Services"
    };

    const scalingGoalMap: Record<string, string> = {
      highTicket: "Secure Premium High-Ticket Clients (Acquire affluent, high-LTV clientele)",
      volume: "Maximize Lead Flow Volume (Raw organic inquiry scales)",
      authority: "Establish Solid Topical Authority (Build deep category trust)",
      brand: "Dominate Brand Citation Indices (Convert search share of voice)"
    };

    const bottleneckMap: Record<string, string> = {
      aeo: "Answer Engine Optimization (AEO) Domination",
      gmb: "GMB Google Maps 3-Pack Local Dominance",
      seo: "High-Intent Entity Search Engine Optimization (SEO)",
      ads: "High-Performance ROAS Paid Campaign Architectures"
    };

    const authorityLevelMap: Record<string, string> = {
      startup: "Fresh Entity / New Domain (Under 1 year of age, minimal digital footprints)",
      growing: "Stable Mid-Tier Player (Consistent rankings but missing out on top-tier buyers)",
      marketLeader: "Established Category Leader (Defensive positioning, cementing voice share)",
      offline: "Transitioning Offline Giant (Strong offline footprint but weak digital citations)"
    };

    const audienceMap: Record<string, string> = {
      ultra: "Ultra-High-Net-Worth Individuals & C-Suite Execs",
      affluent: "Affluent Local Residents & High-Income Households",
      b2b: "B2B Enterprise Decision Makers",
      massPremium: "Tech-Savvy Mass Premium Tier Consumers"
    };

    const competitorStateMap: Record<string, string> = {
      aggressive: "Hyper-Aggressive Competitors bidding on keywords and regions",
      monopoly: "Legacy Directory / Aggregator Monopolies owning page 1",
      fragmented: "Scattered and Unoptimized Local Landscape (Prime for rapid takeover)",
      unaware: "Underserved conversational AI landscape (Competitors unaware of GenAI)"
    };

    const contentCapabilityMap: Record<string, string> = {
      none: "No internal writers (Requires full-service high-authority content syndication)",
      light: "Small team for review (Requires expert guidelines and thematic outlines)",
      active: "Fully capable editorial team (Requires advanced entity schema optimization)"
    };

    const geoScopeMap: Record<string, string> = {
      hyperlocal: "Hyperlocal Hub (Within 10-15km radius of specific clinics/showrooms)",
      city: "Metropolitan City-Wide Dominance (Multi-locality coverage)",
      national: "Pan-National Enterprise Reach",
      global: "International / Global Authority (Multi-continental target market)"
    };

    const budgetMap: Record<string, string> = {
      elite: "Elite Omnichannel Dominance ($5000+/mo)",
      growth: "Aggressive Expansion ($2500-$5000/mo)",
      baseline: "Laser-focused Authority Building ($1000-$2500/mo)",
      custom: "Targeted Project Engagement"
    };

    const mappedIndustry = industryMap[industry] || "Custom Premium Vertical";
    const mappedScalingGoal = scalingGoalMap[scalingGoal] || "Commercial Scaling & Visibility";
    const mappedBottleneck = bottleneckMap[bottleneck] || "Omnichannel Traffic Architectures";
    const mappedAuthorityLevel = authorityLevelMap[authorityLevel] || "New Search Engine Entity";
    const mappedAudience = audienceMap[audience] || "Premium Targeted Customer Base";
    const mappedCompetitorState = competitorStateMap[competitorState] || "Scattered / Traditional Players";
    const mappedContentCapability = contentCapabilityMap[contentCapability] || "Need Content Creation Support";
    const mappedGeoScope = geoScopeMap[geoScope] || "Localized Search Visibility";
    const mappedBudget = budgetMap[budget] || "Custom Project Scope";

    // Call Gemini to generate a bespoke strategic evaluation
    const prompt = `
      You are ThinkSarath, an elite AI Search (SEO/AEO/GEO) Freelance Consultant based in Chennai, Tamil Nadu.
      A high-value lead has completed our robust 10-step Q&A qualification flow. Generate a bespoke, highly strategic investment blueprint evaluation for them.

      Lead Profile:
      - Brand/Business Name: ${businessName}
      - Contact Person: ${contactName}
      - Website: ${websiteUrl || "No website yet"}
      - Industry Vertical: ${mappedIndustry}
      - Strategic Scaling Goal: ${mappedScalingGoal}
      - Primary Growth Bottleneck: ${mappedBottleneck}
      - Digital Authority Baseline: ${mappedAuthorityLevel}
      - Core Target Demographics: ${mappedAudience}
      - Competitor Landscape Dynamics: ${mappedCompetitorState}
      - Internal Editorial Capability: ${mappedContentCapability}
      - Target Geographical Perimeter: ${mappedGeoScope}
      - Monthly Investment Budget Tier: ${mappedBudget}
      - Custom Business Goals & Notes: ${customGoal || "Scale traffic, maximize generative search index rankings, and boost organic conversions."}

      Generate an elegant, sophisticated response addressing their specific vertical, goals, bottleneck, content capabilities, and geography. Focus on entity authority, search index citation optimization, conversational search engine optimization (ChatGPT, Perplexity, Gemini, Apple Intelligence), and high-ticket customer acquisition. Align your copy with luxury and premium demographics.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are ThinkSarath, a luxury digital marketing specialist in Chennai. Generate a highly strategic, professional, and convincing consultation evaluation.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            industryMatch: { 
              type: Type.STRING, 
              description: "A professional mapping label for their industry vertical, e.g. 'Healthcare Aesthetics Architecture' or 'Real Estate Growth Engine'." 
            },
            primaryPrescription: { 
              type: Type.STRING, 
              description: "The primary growth system proposed for them, e.g., 'Omnichannel AEO Domination' or 'Hyperlocal Maps 3-Pack Authority'." 
            },
            tacticalPillars: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly three highly professional tactical pillars tailored specifically to their vertical and bottleneck."
            },
            geminiResponse: { 
              type: Type.STRING, 
              description: "A highly custom, authoritative 150-word consulting response addressing their business directly and outlining how to overcome their specific bottleneck using advanced techniques." 
            },
            estimatedTimeline: { 
              type: Type.STRING, 
              description: "A customized estimated execution timeline, e.g., '6-8 Weeks Initial Sprint' or '8-12 Weeks Setup'." 
            }
          },
          required: ["industryMatch", "primaryPrescription", "tacticalPillars", "geminiResponse", "estimatedTimeline"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from Gemini.");
    }

    const leadData = JSON.parse(text);
    return res.json(leadData);

  } catch (error: any) {
    console.error("Gemini Lead Qualification Error:", error);
    return res.status(500).json({
      error: "Failed to generate dynamic qualification blueprint. Please verify your system configuration.",
      details: error.message
    });
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
