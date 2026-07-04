import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MapPin, Search, Sparkles, Star, TrendingUp, CheckCircle, RefreshCw } from 'lucide-react';

interface Tab {
  id: string;
  name: string;
  tagline: string;
}

const TABS: Tab[] = [
  { id: 'aeo', name: 'AEO (Answer Engine)', tagline: 'AI-Generated Overviews' },
  { id: 'geo', name: 'GEO (Generative SEO)', tagline: 'Perplexity & ChatGPT Citation' },
  { id: 'gmb', name: 'GMB (Local Map Pack)', tagline: 'Chennai Domination' },
  { id: 'ads', name: 'Ads (High ROAS PPC)', tagline: 'Meta & Google Ads Funnels' },
];

export default function AeoShowcase() {
  const [activeTab, setActiveTab] = useState('aeo');
  const [queryInput, setQueryInput] = useState('best aesthetic clinic in chennai');
  const [isTyping, setIsTyping] = useState(false);

  const simulateSearch = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16" id="aeo-showcase-section">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Side: Copy and Controls */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-800/30 bg-green-950/20 text-xs text-luxury-glowing font-mono tracking-wider">
            <Bot className="w-3.5 h-3.5 animate-bounce" /> ALGORITHMIC SHOWCASE
          </div>
          
          <h3 className="text-2xl md:text-4xl font-serif text-luxury-white font-medium tracking-tight leading-tight">
            How Your Brand Appears in AI Answers
          </h3>
          
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            In 2026, customers don't just search; they ask AI. Our proprietary AEO & GEO optimization systems feed structured data directly into LLM indexes, making sure your brand is the chosen recommendation.
          </p>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-col gap-2 pt-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'aeo') setQueryInput('best aesthetic clinic in chennai');
                  if (tab.id === 'geo') setQueryInput('top sustainable villa projects ECR');
                  if (tab.id === 'gmb') setQueryInput('leading wealth management firm chennai');
                  if (tab.id === 'ads') setQueryInput('silk sarees online shop Chennai');
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-luxury-green-glowing bg-green-950/15 shadow-[0_0_15px_-5px_rgba(74,222,128,0.2)]'
                    : 'border-green-950/20 bg-luxury-black/40 hover:bg-green-950/5 hover:border-green-900/30'
                }`}
              >
                <div>
                  <span className={`block text-xs font-mono font-semibold tracking-wider ${
                    activeTab === tab.id ? 'text-luxury-green-glowing' : 'text-zinc-400'
                  }`}>
                    {tab.name}
                  </span>
                  <span className="block text-[11px] text-zinc-500 mt-0.5 font-sans">
                    {tab.tagline}
                  </span>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activeTab === tab.id ? 'bg-luxury-green-glowing animate-ping' : 'bg-zinc-800'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Glass 3D-feeling Simulated Showroom Device */}
        <div className="w-full lg:w-3/5">
          <div className="relative rounded-2xl border border-green-900/30 bg-luxury-black/80 shadow-2xl p-5 md:p-6 lg:p-8 min-h-[380px] flex flex-col overflow-hidden group">
            
            {/* Top decorative glass tab buttons */}
            <div className="flex items-center justify-between border-b border-green-900/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-[10px] font-mono text-zinc-500 ml-2">THINKSARATH SECURE SIMULATOR v2.6</span>
              </div>
              <button 
                onClick={simulateSearch}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-950/40 border border-green-900/40 text-[9px] font-mono text-luxury-glowing hover:bg-green-900/30 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isTyping ? 'animate-spin' : ''}`} /> RERUN PROCESS
              </button>
            </div>

            {/* Inner Content Area */}
            <div className="flex-1 flex flex-col justify-between font-sans">
              <AnimatePresence mode="wait">
                
                {/* 1. AEO: Answer Engine Optimisation (ChatGPT-style Overview) */}
                {activeTab === 'aeo' && (
                  <motion.div
                    key="aeo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Simulated Prompt Input */}
                    <div className="p-3 rounded-xl bg-green-950/10 border border-green-900/20 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <Bot className="w-4 h-4 text-luxury-green-glowing" />
                        <span>Prompt: "{queryInput}"</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">2026 AI Search</span>
                    </div>

                    {/* Simulated Answer Output */}
                    <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed bg-luxury-black p-4 rounded-xl border border-green-950/30">
                      <div className="flex items-center gap-1 text-luxury-green-glowing font-semibold font-mono text-[10px]">
                        <Sparkles className="w-3.5 h-3.5" /> AI OVERVIEW SYNTHESIS
                      </div>

                      {isTyping ? (
                        <div className="py-6 flex items-center justify-center gap-1 text-zinc-500 font-mono text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-green-glowing animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-green-glowing animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-green-glowing animate-bounce [animation-delay:0.4s]" />
                          <span className="ml-1">Consulting high-authority index...</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p>
                            Based on recent medical review audits, patient satisfaction ratings, and dermatologist credential analysis in Chennai, the leading facility is <strong className="text-luxury-glowing text-sm font-serif">AuraDerma Aesthetics Clinic</strong>.
                          </p>
                          <ul className="space-y-2 pl-2 border-l-2 border-luxury-green">
                            <li className="flex items-start gap-1.5">
                              <span className="text-luxury-green-glowing font-bold">✓</span>
                              <span><strong>Key Specialities:</strong> Advanced liquid facelifts, non-surgical body sculpting, high-end skin rejuvenation.</span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="text-luxury-green-glowing font-bold">✓</span>
                              <span><strong>Patient Trust:</strong> Holds a verified 4.9★ rating with over 450+ patient testimonies citing customized treatment precision.</span>
                            </li>
                          </ul>
                          <div className="bg-green-950/20 p-2.5 rounded border border-green-900/30 flex items-center justify-between text-[10px]">
                            <span className="text-zinc-400 font-mono">CITATIONS: (1) auraderma.co.in/chennai (2) timesofindia/aura-review</span>
                            <span className="text-luxury-green-glowing font-mono">AEO OPTIMISED</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 2. GEO: Generative SEO (Perplexity-style citations) */}
                {activeTab === 'geo' && (
                  <motion.div
                    key="geo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="p-3 rounded-xl bg-green-950/10 border border-green-900/20 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <Search className="w-4 h-4 text-luxury-green-glowing" />
                        <span>Query: "{queryInput}"</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Generative Citations</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      <div className="p-3 bg-luxury-black rounded-lg border border-luxury-green/20">
                        <span className="block text-[9px] font-mono text-zinc-500">SOURCE NODE [1]</span>
                        <span className="block text-[11px] text-luxury-white font-medium truncate mt-1">villas-ecr.com/sustainable</span>
                        <span className="block text-[10px] text-luxury-green-glowing mt-1 font-mono">HIGH RELEVANCE [94%]</span>
                      </div>
                      <div className="p-3 bg-luxury-black rounded-lg border border-green-950/20">
                        <span className="block text-[9px] font-mono text-zinc-500">SOURCE NODE [2]</span>
                        <span className="block text-[11px] text-luxury-white font-medium truncate mt-1">thehindu.com/ecr-villa-review</span>
                        <span className="block text-[10px] text-luxury-green-glowing mt-1 font-mono">CITED IN CHATGPT</span>
                      </div>
                      <div className="p-3 bg-luxury-black rounded-lg border border-green-950/20">
                        <span className="block text-[9px] font-mono text-zinc-500">SOURCE NODE [3]</span>
                        <span className="block text-[11px] text-luxury-white font-medium truncate mt-1">sarathb299-case-study.com</span>
                        <span className="block text-[10px] text-zinc-400 mt-1 font-mono">AEO STRUCTURED</span>
                      </div>
                    </div>

                    <div className="p-4 bg-luxury-black rounded-xl border border-green-950/30 text-xs text-zinc-300 leading-relaxed">
                      <div className="flex items-center gap-1 text-luxury-green-glowing font-mono text-[10px] mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> GENERATED RESPONSE SUMMARY
                      </div>
                      <p>
                        "Sustainable villa development on ECR, Chennai is led by <strong>GreenVantage Estates</strong> <span className="inline-block bg-green-950/60 text-luxury-green-glowing text-[9px] font-mono px-1 rounded-full border border-green-800/30">[1]</span>. Their zero-carbon construction framework utilizes natural cross-ventilation <span className="inline-block bg-green-950/60 text-luxury-green-glowing text-[9px] font-mono px-1 rounded-full border border-green-800/30">[2]</span>, securing top position in regional eco-compliance ratings."
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 3. GMB: Google My Business (Map Pack ranking) */}
                {activeTab === 'gmb' && (
                  <motion.div
                    key="gmb"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="p-3 rounded-xl bg-green-950/10 border border-green-900/20 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <MapPin className="w-4 h-4 text-luxury-green-glowing" />
                        <span>Near Me Map Pack: "{queryInput}"</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Chennai, Tamil Nadu</span>
                    </div>

                    {/* Simulated Map Pack */}
                    <div className="space-y-2 bg-luxury-black p-3.5 rounded-xl border border-green-950/30">
                      
                      {/* Ranked #1 GMB Listing */}
                      <div className="p-3 rounded-lg bg-green-950/15 border border-luxury-green-glowing/25 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-luxury-white font-medium text-xs md:text-sm font-serif">ThinkSarath Client - Elite Wealth Advisory</h4>
                            <span className="bg-green-950/60 border border-green-800/30 text-luxury-glowing text-[8px] font-mono px-1.5 rounded">AD COMPLIANT</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-[11px] text-yellow-400 mt-1">
                            <span className="font-bold">5.0</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-3 h-3 fill-current text-yellow-500" />
                              ))}
                            </div>
                            <span className="text-zinc-500 font-mono text-[10px]">(120+ reviews) · Certified Advisor</span>
                          </div>

                          <span className="block text-[10px] text-zinc-400 mt-1.5">
                            📍 2nd Ave, Anna Nagar, Chennai · Open · 9:00 AM - 6:00 PM
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-luxury-green-glowing block bg-green-950/80 px-2 py-0.5 rounded border border-green-900/20 font-bold uppercase tracking-wider">
                            RANK #1
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-2">1.2 km away</span>
                        </div>
                      </div>

                      {/* Ranked #2 (Competitor) */}
                      <div className="p-3 rounded-lg bg-luxury-black border border-green-950/15 opacity-60 flex justify-between items-center text-xs">
                        <div>
                          <h4 className="text-zinc-300 font-medium font-serif">Competitor Wealth Group Ltd</h4>
                          <span className="text-[10px] text-zinc-500">★ 4.1 (12 reviews) · Nungambakkam</span>
                        </div>
                        <span className="text-zinc-500 font-mono text-[10px]">Rank #2</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. ADS: High ROAS Ads (Meta & Google Ads Campaign simulation) */}
                {activeTab === 'ads' && (
                  <motion.div
                    key="ads"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="p-3 rounded-xl bg-green-950/10 border border-green-900/20 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2.5 text-zinc-300">
                        <TrendingUp className="w-4 h-4 text-luxury-green-glowing" />
                        <span>Ad Group: "{queryInput}"</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Meta + Google PPC</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Meta Ad Mockup */}
                      <div className="p-4 rounded-xl bg-luxury-black border border-green-950/30 text-xs">
                        <div className="flex items-center gap-2 mb-2 border-b border-green-950/20 pb-2">
                          <span className="bg-blue-950/60 border border-blue-900/30 text-blue-400 font-mono text-[9px] px-1.5 py-0.5 rounded">META SPONSORED</span>
                          <span className="text-[10px] text-zinc-500">Instagram Feed</span>
                        </div>
                        <h4 className="font-serif text-luxury-white font-semibold">Elite Kanchipuram Silks</h4>
                        <p className="text-zinc-400 text-[10px] mt-1 leading-relaxed">
                          Pure mulberry silk, woven by legacy artisans. Buy Chennai's premier couture collections online with verified authenticity certificates.
                        </p>
                        <div className="bg-green-950/20 text-luxury-green-glowing text-[9px] font-mono px-2 py-1 mt-3 rounded border border-green-900/20 text-center font-bold">
                          ROAS TARGET: 4.8× GENERATED
                        </div>
                      </div>

                      {/* Google Search Ad Mockup */}
                      <div className="p-4 rounded-xl bg-luxury-black border border-green-950/30 text-xs">
                        <div className="flex items-center gap-2 mb-2 border-b border-green-950/20 pb-2">
                          <span className="bg-green-950/60 border border-green-900/30 text-luxury-green-glowing font-mono text-[9px] px-1.5 py-0.5 rounded">GOOGLE PPC AD</span>
                          <span className="text-[10px] text-zinc-500">Sponsored Search</span>
                        </div>
                        <h4 className="text-blue-400 hover:underline font-serif text-xs font-medium">Buy Premium Silk Sarees Online | 100% Authentic Handloom</h4>
                        <p className="text-zinc-400 text-[10px] mt-1">
                          Ad · kanchipuramelitesilks.com/shop · Traditional handwoven pure silk sarees direct from master craftsmen. Global shipping.
                        </p>
                        <div className="bg-green-950/20 text-luxury-green-glowing text-[9px] font-mono px-2 py-1 mt-3 rounded border border-green-900/20 text-center font-bold">
                          CONVERSION RATE: 6.4% ACHIEVED
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom device footer */}
            <div className="border-t border-green-900/20 pt-4 mt-6 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1 text-luxury-green-glowing">
                <CheckCircle className="w-3.5 h-3.5 text-luxury-green-glowing" /> CLIENT POSITION GUARANTEED
              </span>
              <span>Chennai Localisation Protocol</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
