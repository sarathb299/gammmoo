import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Check, 
  ChevronRight, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  HelpCircle, 
  Download, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { AuditResult } from '../types';
import BorderGlow from './BorderGlow';

const SERVICE_OPTIONS = [
  { id: 'seo', name: 'SEO (Search Engine Optimisation)' },
  { id: 'aeo', name: 'AEO (Answer Engine Optimisation)' },
  { id: 'geo', name: 'GEO (Generative Engine Optimisation)' },
  { id: 'gmb', name: 'Google My Business / GMB' },
  { id: 'google_ads', name: 'Google PPC Ads' },
  { id: 'meta_ads', name: 'Meta Paid Ads' },
];

export default function AuditTool() {
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [niche, setNiche] = useState('');
  const [goals, setGoals] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['seo', 'aeo', 'geo']);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !niche.trim()) {
      setError('Please provide at least your Business Name and Niche/Industry.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    // Ticking visual stages to improve user experience
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 1800);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          websiteUrl,
          niche,
          goals,
          selectedServices: selectedServices.map(s => 
            SERVICE_OPTIONS.find(o => o.id === s)?.name || s
          )
        })
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate audit strategy.');
      }

      setResult(data);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please check your Gemini API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAudit = () => {
    setResult(null);
    setBusinessName('');
    setWebsiteUrl('');
    setNiche('');
    setGoals('');
    setSelectedServices(['seo', 'aeo', 'geo']);
  };

  const renderLoadingState = () => {
    const steps = [
      "Consulting regional search indexing maps...",
      "Analyzing ChatGPT & Perplexity AEO citation weights...",
      "Modeling luxury competitor organic conversion rates...",
      "Structuring bespoke digital strategy blueprint..."
    ];

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-green-950/40 border-t-luxury-green-glowing animate-spin" />
          <Bot className="w-6 h-6 text-luxury-green-glowing absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="space-y-2">
          <p className="text-luxury-white font-serif text-lg font-medium">
            ThinkSarath AI Auditor Processing
          </p>
          <p className="text-luxury-green-glowing font-mono text-xs animate-pulse">
            {steps[loadingStep]}
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 justify-center">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-500 ${
                loadingStep >= idx ? 'w-6 bg-luxury-green-glowing' : 'w-2 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16" id="ai-auditor-section">
      <div className="text-center mb-12">
        <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
          REAL-TIME STRATEGY ENGINE
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
          AI Digital Strategy Audit
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mt-3 max-w-xl mx-auto">
          Enter your business profile below to trigger our server-side LLM algorithm. Experience real SEO, AEO, and GEO optimization recommendations.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* Loading overlay */}
        {isLoading && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 rounded-2xl border border-green-900/30 bg-luxury-black/95 max-w-2xl mx-auto"
          >
            {renderLoadingState()}
          </motion.div>
        )}

        {/* Input Form */}
        {!isLoading && !result && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border border-green-900/20 bg-luxury-black/80"
          >
            <form onSubmit={handleRunAudit} className="space-y-6 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase">
                    BUSINESS NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Aura Aesthetics"
                    className="w-full bg-luxury-black border border-green-950/50 hover:border-green-900 focus:border-luxury-green-glowing text-sm p-3 rounded-lg text-luxury-white outline-none transition-all"
                  />
                </div>

                {/* Website URL */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase">
                    WEBSITE URL (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={e => setWebsiteUrl(e.target.value)}
                    placeholder="e.g. https://auraesthetics.com"
                    className="w-full bg-luxury-black border border-green-950/50 hover:border-green-900 focus:border-luxury-green-glowing text-sm p-3 rounded-lg text-luxury-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Business Niche / Industry */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  NICHE / INDUSTRY SECTOR *
                </label>
                <input
                  type="text"
                  required
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  placeholder="e.g. Cosmetic surgery & laser clinic, Chennai"
                  className="w-full bg-luxury-black border border-green-950/50 hover:border-green-900 focus:border-luxury-green-glowing text-sm p-3 rounded-lg text-luxury-white outline-none transition-all"
                />
              </div>

              {/* Channels Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  SELECT CHANNELS TO OPTIMISE
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map(opt => {
                    const isSelected = selectedServices.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleService(opt.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                          isSelected 
                            ? 'bg-green-950/20 border-luxury-green text-luxury-white' 
                            : 'bg-luxury-black/60 border-green-950/20 text-zinc-400 hover:border-green-900'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                          isSelected 
                            ? 'bg-luxury-green-glowing border-luxury-green-glowing text-luxury-black' 
                            : 'border-zinc-700 bg-transparent'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-[11px] md:text-xs font-medium truncate">{opt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  MAIN GROWTH GOALS (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  value={goals}
                  onChange={e => setGoals(e.target.value)}
                  placeholder="e.g. Generate 50 qualified laser surgery leads monthly, lock top spot on local maps..."
                  className="w-full bg-luxury-black border border-green-950/50 hover:border-green-900 focus:border-luxury-green-glowing text-sm p-3 rounded-lg text-luxury-white outline-none transition-all resize-none"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Trigger */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-luxury-green to-luxury-green-mid hover:from-luxury-green-mid hover:to-luxury-green-light text-luxury-white font-serif font-medium text-sm rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group hover:scale-[1.01] cursor-pointer"
              >
                GENERATE CUSTOM DIGITAL BLUEPRINT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

            </form>
          </motion.div>
        )}

        {/* Results Screen */}
        {!isLoading && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            {/* Header / Summary Card */}
            <div className="p-6 md:p-8 rounded-2xl border border-green-900/30 bg-gradient-to-br from-luxury-green-dark/60 via-luxury-black to-luxury-black">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-green-900/20 pb-5 mb-5">
                <div>
                  <span className="text-[10px] font-mono text-luxury-green-glowing uppercase tracking-widest bg-green-950/60 border border-green-800/30 px-3 py-1 rounded-full">
                    STRATEGY BLUEPRINT READY
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-luxury-white mt-3 font-semibold">
                    {businessName} Strategy Audit
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">
                    Industry Sector: {niche} {websiteUrl && `· Asset: ${websiteUrl}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="p-2.5 rounded-lg border border-green-900/30 hover:border-luxury-green-light bg-luxury-black text-zinc-300 hover:text-luxury-glowing text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF / PRINT
                  </button>
                  <button
                    onClick={resetAudit}
                    className="p-2.5 rounded-lg border border-green-950/20 hover:border-green-900 bg-luxury-black text-zinc-400 hover:text-luxury-white text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> RUN NEW
                  </button>
                </div>
              </div>

              {/* Strategic overview copy */}
              <div className="space-y-3.5 text-zinc-300 text-xs md:text-sm leading-relaxed font-sans">
                <div className="flex items-center gap-1.5 text-luxury-green-glowing font-mono text-[10px] font-bold">
                  <Sparkles className="w-4 h-4 animate-pulse" /> ARCHITECTURAL STRATEGY OVERVIEW
                </div>
                <p>{result.overview}</p>
              </div>
            </div>

            {/* Scorecard Radial Meters & Estimated Growth */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Scorecard Wrapper */}
              <div className="col-span-1 md:col-span-3 bg-luxury-black border border-green-950/20 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase mb-4 tracking-wider">
                    ESTIMATED POSITION SCORECARD
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* SEO Score */}
                    <div className="text-center p-3 rounded-xl bg-luxury-green-dark/20 border border-green-950/35">
                      <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                        <svg className="w-full h-full rotate-270">
                          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="4" />
                          <circle cx="32" cy="32" r="26" fill="none" stroke="#4ade80" strokeWidth="4" 
                            strokeDasharray={`${2 * Math.PI * 26}`}
                            strokeDashoffset={`${2 * Math.PI * 26 * (1 - result.scoreCard.seoScore / 100)}`}
                          />
                        </svg>
                        <span className="absolute font-serif text-sm font-semibold text-luxury-white">{result.scoreCard.seoScore}%</span>
                      </div>
                      <span className="block text-[10px] font-mono text-zinc-300 font-bold uppercase">SEO STATUS</span>
                    </div>

                    {/* AEO Score */}
                    <div className="text-center p-3 rounded-xl bg-luxury-green-dark/20 border border-green-950/35">
                      <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                        <svg className="w-full h-full rotate-270">
                          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="4" />
                          <circle cx="32" cy="32" r="26" fill="none" stroke="#4ade80" strokeWidth="4" 
                            strokeDasharray={`${2 * Math.PI * 26}`}
                            strokeDashoffset={`${2 * Math.PI * 26 * (1 - result.scoreCard.aeoScore / 100)}`}
                          />
                        </svg>
                        <span className="absolute font-serif text-sm font-semibold text-luxury-white">{result.scoreCard.aeoScore}%</span>
                      </div>
                      <span className="block text-[10px] font-mono text-zinc-300 font-bold uppercase">AEO COMPLIANT</span>
                    </div>

                    {/* GEO Score */}
                    <div className="text-center p-3 rounded-xl bg-luxury-green-dark/20 border border-green-950/35">
                      <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                        <svg className="w-full h-full rotate-270">
                          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="4" />
                          <circle cx="32" cy="32" r="26" fill="none" stroke="#4ade80" strokeWidth="4" 
                            strokeDasharray={`${2 * Math.PI * 26}`}
                            strokeDashoffset={`${2 * Math.PI * 26 * (1 - result.scoreCard.geoScore / 100)}`}
                          />
                        </svg>
                        <span className="absolute font-serif text-sm font-semibold text-luxury-white">{result.scoreCard.geoScore}%</span>
                      </div>
                      <span className="block text-[10px] font-mono text-zinc-300 font-bold uppercase">GEO FOOTPRINT</span>
                    </div>

                    {/* Ads Score */}
                    <div className="text-center p-3 rounded-xl bg-luxury-green-dark/20 border border-green-950/35">
                      <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                        <svg className="w-full h-full rotate-270">
                          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="4" />
                          <circle cx="32" cy="32" r="26" fill="none" stroke="#4ade80" strokeWidth="4" 
                            strokeDasharray={`${2 * Math.PI * 26}`}
                            strokeDashoffset={`${2 * Math.PI * 26 * (1 - result.scoreCard.adsScore / 100)}`}
                          />
                        </svg>
                        <span className="absolute font-serif text-sm font-semibold text-luxury-white">{result.scoreCard.adsScore}%</span>
                      </div>
                      <span className="block text-[10px] font-mono text-zinc-300 font-bold uppercase">PPC ROI</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Estimated Traffic Growth Banner */}
              <div className="col-span-1 bg-gradient-to-b from-green-950/40 to-luxury-green-dark/30 border border-luxury-green-glowing/25 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <TrendingUp className="w-7 h-7 text-luxury-green-glowing mb-3" />
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    REVENUE ALIGNED GROWTH
                  </span>
                  <p className="text-xs text-zinc-300 mt-2 font-sans">
                    Projected performance metrics upon deploying customized search integrations:
                  </p>
                </div>
                <div className="mt-4 border-t border-green-900/30 pt-3">
                  <span className="text-2xl md:text-3xl font-serif font-bold text-luxury-glowing block">
                    {result.estimatedGrowth}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block mt-1">Verified Audit Projection</span>
                </div>
              </div>

            </div>

            {/* Tactical High-Impact Recommendations */}
            <div className="bg-luxury-black border border-green-950/20 rounded-2xl p-6 md:p-8 space-y-6">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                CORE HIGH-IMPACT STRATEGY IMPLEMENTATIONS
              </h4>

              <div className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl border border-green-950/15 bg-luxury-black/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-luxury-green-glowing/15 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-luxury-white font-serif text-sm font-semibold">
                          {rec.title}
                        </span>
                        <span className="bg-green-950 text-luxury-green-glowing border border-green-800/40 text-[9px] font-mono px-2 py-0.5 rounded">
                          {rec.channel}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-sans max-w-2xl">
                        {rec.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 bg-green-950/20 px-3 py-1 rounded border border-green-900/30 w-fit">
                      <span className="text-[9px] font-mono text-zinc-400">IMPACT:</span>
                      <span className="text-[10px] font-mono font-bold text-luxury-green-glowing uppercase">{rec.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generative Engine Optimization (AEO/GEO) Funnel Blueprint */}
            <div className="bg-luxury-black border border-green-950/20 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  GENERATIVE SEARCH CITATION SCHEMAS
                </h4>
                <span className="bg-green-950/60 border border-green-800/30 text-luxury-glowing text-[9px] font-mono px-2.5 py-0.5 rounded-full">
                  2026 AI Overviews Future-Proofing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.aeoFunnels.map((funnel, idx) => (
                  <div key={idx} className="p-4 bg-luxury-green-dark/10 rounded-xl border border-green-950/30 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 block">HNW USER PROMPT #{idx + 1}</span>
                      <p className="text-luxury-white font-serif italic text-xs md:text-sm">
                        "{funnel.query}"
                      </p>
                    </div>

                    <div className="space-y-1.5 border-t border-green-950/35 pt-2.5">
                      <span className="text-[9px] font-mono text-zinc-400 block">COMPETITOR MAP</span>
                      <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
                        {funnel.competitorPresence}
                      </p>
                    </div>

                    <div className="space-y-1.5 border-t border-green-950/35 pt-2.5">
                      <span className="text-[9px] font-mono text-luxury-green-glowing block">SCHEMA ENTITIES TO WEAVE</span>
                      <div className="flex flex-wrap gap-1">
                        {funnel.recommendedKeywords.map((kw, k) => (
                          <span key={k} className="text-[9px] font-mono text-zinc-300 bg-luxury-black/80 px-2 py-0.5 rounded border border-green-950/15">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
