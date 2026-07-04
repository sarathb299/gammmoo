import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  TrendingUp, 
  Lightbulb, 
  Award,
  Zap,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import BorderGlow from './BorderGlow';

interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
  type: 'select' | 'form';
  field: string;
  options?: QuestionOption[];
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Industry Focus",
    subtitle: "Select the vertical that matches your business model",
    type: 'select',
    field: 'industry',
    options: [
      { id: 'healthcare', label: 'Healthcare & Wellness Clinics', description: 'Medical practices, aesthetic clinics, and super-specialty hospitals.' },
      { id: 'realestate', label: 'Premium Real Estate Developers', description: 'Luxury residential, commercial properties, and infrastructure builders.' },
      { id: 'retail', label: 'Luxury E-Commerce & Retail Brands', description: 'Premium fashion, designer goods, high-end consumer products.' },
      { id: 'tech', label: 'High-Growth SaaS & Tech Enterprises', description: 'Software platforms, technology solutions, and global cloud ventures.' },
      { id: 'professional', label: 'Elite Local & Professional Services', description: 'Luxury concierge, legal advisory, and high-end niche consultancies.' }
    ]
  },
  {
    id: 2,
    title: "Current Scaling Goal",
    subtitle: "What is your primary commercial or digital search objective?",
    type: 'select',
    field: 'scalingGoal',
    options: [
      { id: 'highTicket', label: 'Secure Premium High-Ticket Clients', description: 'Maximize average deal size and capture affluent, high-LTV clientele.' },
      { id: 'volume', label: 'Maximize Lead Flow Volume', description: 'Scale organic raw inquiry pipelines and boost brand transaction counts.' },
      { id: 'authority', label: 'Establish Solid Topical Authority', description: 'Build absolute market trust through in-depth thought leadership content.' },
      { id: 'brand', label: 'Dominate Brand Citation Indices', description: 'Ensure omnipresent references across search, social, and GenAI directories.' }
    ]
  },
  {
    id: 3,
    title: "Primary Growth Bottleneck",
    subtitle: "Identify your critical search engine & conversion challenge",
    type: 'select',
    field: 'bottleneck',
    options: [
      { id: 'aeo', label: 'Invisible in GenAI Overviews', description: 'No citations on ChatGPT Search, Perplexity AI, or Google Gemini.' },
      { id: 'gmb', label: 'Weak Local Maps 3-Pack Rankings', description: 'Failing to rank in high-value local queries in your target cities.' },
      { id: 'seo', label: 'Low High-Intent Search Traffic', description: 'Missing high-ticket buyer searches and transactional search intent.' },
      { id: 'ads', label: 'Paid Ad Budget Bleeding', description: 'Experiencing low ROAS and unsustainable acquisition costs on Google or Meta PPC.' }
    ]
  },
  {
    id: 4,
    title: "Digital Authority Level",
    subtitle: "Assess your brand's current organic and domain footprint",
    type: 'select',
    field: 'authorityLevel',
    options: [
      { id: 'startup', label: 'Fresh Entity / New Domain', description: 'Brand is new online (under 1 year) with low initial search footprints.' },
      { id: 'growing', label: 'Stable Mid-Tier Player', description: 'Steady organic traffic but missing out on top-tier premium clients.' },
      { id: 'marketLeader', label: 'Established Category Leader', description: 'Seeking to defensive-block challengers and cement maximum AI mindshare.' },
      { id: 'offline', label: 'Transitioning Offline Giant', description: 'Exceptional real-world repute, but weak digital entity & citation profile.' }
    ]
  },
  {
    id: 5,
    title: "Target Demographics",
    subtitle: "Define the specific consumer tier you aim to acquire",
    type: 'select',
    field: 'audience',
    options: [
      { id: 'ultra', label: 'Ultra-High-Net-Worth & C-Suite', description: 'Luxury seekers, enterprise directors, and premium corporate buyers.' },
      { id: 'affluent', label: 'Affluent Local Residents', description: 'High-income families, luxury homeowners, and premium elective patients.' },
      { id: 'b2b', label: 'B2B Enterprise Decision Makers', description: 'SaaS procurement, tech leads, and venture-backed corporate heads.' },
      { id: 'massPremium', label: 'Tech-Savvy Mass Premium Tier', description: 'High-growth professionals, specialized experts, and modern consumers.' }
    ]
  },
  {
    id: 6,
    title: "Competitor Landscape",
    subtitle: "What best describes the online competition in your sector?",
    type: 'select',
    field: 'competitorState',
    options: [
      { id: 'aggressive', label: 'Hyper-Aggressive Challengers', description: 'Direct competitors bidding heavily on your brand keywords & local turf.' },
      { id: 'monopoly', label: 'Legacy Directory Dominance', description: 'Huge aggregators or multi-billion directories occupy the top page 1 spots.' },
      { id: 'fragmented', label: 'Scattered & Weak Local Landscape', description: 'No single dominant authority. An ideal climate for a swift takeover.' },
      { id: 'unaware', label: 'Ignorant of GenAI/AEO Search', description: 'Competitors ignore conversational search engines, leaving a blue ocean.' }
    ]
  },
  {
    id: 7,
    title: "Content Production Capacity",
    subtitle: "How is your brand equipped to create high-value content?",
    type: 'select',
    field: 'contentCapability',
    options: [
      { id: 'none', label: 'No Internal Editorial Staff', description: 'Require fully hands-off, authoritative content generation & strategy.' },
      { id: 'light', label: 'Small Team for Review Only', description: 'Need expert topical outlines, content briefs, and keyword blueprints.' },
      { id: 'active', label: 'Fully Active Content Team', description: 'Need advanced technical schemas, entity optimization, and API syndication.' }
    ]
  },
  {
    id: 8,
    title: "Geographical Target Scope",
    subtitle: "What is the physical perimeter of your growth strategy?",
    type: 'select',
    field: 'geoScope',
    options: [
      { id: 'hyperlocal', label: 'Hyperlocal Hub (10-15km Radius)', description: 'Laser focus around specific regional clinics, showrooms, or offices.' },
      { id: 'city', label: 'Metropolitan City-Wide Dominance', description: 'Capturing multiple branches across key tier-1 urban hubs.' },
      { id: 'national', label: 'Pan-National Search Footprint', description: 'Acquiring high-intent searchers across the entire country.' },
      { id: 'global', label: 'International / Global Authority', description: 'Competing on a global stage across multiple continents & languages.' }
    ]
  },
  {
    id: 9,
    title: "Monthly Budget Tier",
    subtitle: "Select your target digital marketing monthly scope capacity",
    type: 'select',
    field: 'budget',
    options: [
      { id: 'elite', label: 'Elite Scaling ($5,000+ / mo)', description: 'Full omnichannel dominance across Google, AI Search engines, and core paid channels.' },
      { id: 'growth', label: 'Growth Surge ($2,500 - $5,000 / mo)', description: 'Aggressive SEO, GMB optimization, and multi-funnel paid search campaigns.' },
      { id: 'baseline', label: 'Strategic Baseline ($1,000 - $2,500 / mo)', description: 'Laser-focused authority building, entity SEO, and optimized campaign baselines.' },
      { id: 'custom', label: 'Custom Customization / Project Based', description: 'Specialized audits, technical setup, or localized short-term projects.' }
    ]
  },
  {
    id: 10,
    title: "Growth Details",
    subtitle: "Submit your brand details to generate your curated blueprint",
    type: 'form',
    field: 'details'
  }
];

export default function LeadQualifier() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({
    industry: '',
    scalingGoal: '',
    bottleneck: '',
    authorityLevel: '',
    audience: '',
    competitorState: '',
    contentCapability: '',
    geoScope: '',
    budget: '',
  });

  // Details form state
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [customGoal, setCustomGoal] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    industryMatch: string;
    primaryPrescription: string;
    tacticalPillars: string[];
    geminiResponse: string;
    estimatedTimeline: string;
  } | null>(null);

  const handleSelectOption = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    // Auto-advance to next step for selection questions to make the UX smooth
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 250);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    const step = STEPS[currentStep - 1];
    if (step.type === 'select') {
      return !!answers[step.field];
    }
    // Form validation
    return businessName.trim() !== '' && contactName.trim() !== '' && email.trim() !== '' && phone.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsLoading(true);
    setError(null);

    const fullPayload = {
      ...answers,
      businessName,
      contactName,
      email,
      phone,
      websiteUrl,
      customGoal
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit qualification lead.');
      }

      setAnalysisResult(data);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Server connection issue. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setAnswers({ 
      industry: '', 
      scalingGoal: '', 
      bottleneck: '', 
      authorityLevel: '', 
      audience: '', 
      competitorState: '', 
      contentCapability: '', 
      geoScope: '', 
      budget: '' 
    });
    setBusinessName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setWebsiteUrl('');
    setCustomGoal('');
    setSubmitted(false);
    setAnalysisResult(null);
    setCurrentStep(1);
  };

  const currentStepData = STEPS[currentStep - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16" id="lead-qualifier-section">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
          GROWTH QUALIFIER ENGINE
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
          Elite Growth Qualifier
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
          Answer our 10 strategic evaluation questions to analyze your domain and competitor ecosystem. Our AI model will immediately compile a customized scaling prescription for your brand.
        </p>
      </div>

      <BorderGlow className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-radial-grid opacity-5 pointer-events-none" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="survey-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10"
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mb-2">
                  <span>STEP {currentStep} OF {STEPS.length}: {currentStepData.title}</span>
                  <span>{Math.round(((currentStep - 1) / STEPS.length) * 100)}% COMPLETE</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-luxury-green to-luxury-green-glowing"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Step contents */}
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-luxury-white font-medium mb-1">
                  {currentStepData.title}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm mb-6 font-sans font-light">
                  {currentStepData.subtitle}
                </p>

                {/* Selection Grid */}
                {currentStepData.type === 'select' && currentStepData.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStepData.options.map((option) => {
                      const isSelected = answers[currentStepData.field] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ y: -2, borderColor: 'rgba(74, 222, 128, 0.3)' }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelectOption(currentStepData.field, option.id)}
                          className={`p-4 md:p-5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-green-950/20 border-luxury-green-glowing shadow-[0_0_15px_rgba(74,222,128,0.1)]' 
                              : 'bg-green-950/5 border-green-950/40 hover:bg-green-950/10'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-serif font-medium text-sm md:text-base text-luxury-white">
                              {option.label}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-luxury-green-glowing text-luxury-black flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-sans font-light">
                            {option.description}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Details Form Step */}
                {currentStepData.type === 'form' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3 text-luxury-green-glowing" /> BUSINESS / BRAND NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apollo Aesthetics Chennai"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3 text-luxury-green-glowing" /> YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Sarath Kumar"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-luxury-green-glowing" /> WORK EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. sarath@brand.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-luxury-green-glowing" /> CONTACT / WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98400 12345"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-luxury-green-glowing" /> CURRENT WEBSITE URL (IF ANY)
                        </label>
                        <input
                          type="url"
                          placeholder="e.g. https://www.yourclinic.com"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-luxury-green-glowing" /> CHIEF BUSINESS GOAL OR TARGET AUDIENCE
                        </label>
                        <textarea
                          placeholder="e.g. Scale premium patient consulting bookings for rhinoplasty in Chennai over 6 months."
                          value={customGoal}
                          onChange={(e) => setCustomGoal(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono pt-2 border-t border-green-950/20">
                      <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-luxury-green-glowing" /> Encrypted & strictly confidential. No spam guaranteed.</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Step navigation triggers */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-green-950/20">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider border rounded-lg cursor-pointer transition-all ${
                    currentStep === 1 
                      ? 'border-zinc-800 text-zinc-700 cursor-not-allowed' 
                      : 'border-green-950/40 text-zinc-400 hover:text-luxury-green-glowing hover:border-luxury-green-glowing/30 bg-green-950/5'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> BACK
                </button>

                {error && (
                  <span className="text-rose-500 font-mono text-[10px] animate-pulse">{error}</span>
                )}

                {currentStep < STEPS.length ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={!answers[currentStepData.field]}
                    className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-mono tracking-widest rounded-lg cursor-pointer transition-all ${
                      answers[currentStepData.field]
                        ? 'bg-gradient-to-r from-luxury-green to-luxury-green-mid text-luxury-white font-bold hover:shadow-[0_0_15px_rgba(74,222,128,0.25)]'
                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    CONTINUE <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !isStepValid()}
                    className={`flex items-center gap-1.5 px-6 py-3 text-xs font-mono tracking-widest rounded-lg cursor-pointer transition-all ${
                      isStepValid() && !isLoading
                        ? 'bg-gradient-to-r from-luxury-green-mid to-luxury-green-light hover:from-luxury-green-light hover:to-luxury-green-glowing text-luxury-white font-bold hover:shadow-[0_0_20px_rgba(74,222,128,0.35)]'
                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-luxury-white animate-spin" />
                        <span>ANALYZING PIPELINE...</span>
                      </>
                    ) : (
                      <>
                        <span>GENERATE EVALUATION</span> <Sparkles className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-pane"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 p-2 md:p-4"
            >
              {/* Results Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-green-950/20 pb-6 mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-luxury-green-glowing font-mono tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" /> ALGORITHMIC QUALIFICATION COMPLETE
                  </div>
                  <h3 className="text-2xl font-serif text-luxury-white font-medium">
                    Your Curated Scaling Architecture
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    Prepared for <strong className="text-luxury-white">{businessName}</strong> · Strategic Lead ID: TS-{Math.floor(Math.random() * 9000 + 1000)}
                  </p>
                </div>
                
                <button
                  onClick={resetFlow}
                  className="px-4 py-2 border border-green-950/40 hover:border-luxury-green-glowing/40 bg-green-950/10 text-zinc-400 hover:text-luxury-white font-mono text-[10px] rounded-lg cursor-pointer transition-all"
                >
                  RE-QUALIFY ROUTE
                </button>
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Structural prescription */}
                <div className="lg:col-span-1 p-5 rounded-xl border border-green-950/30 bg-green-950/5 space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-widest">VERTICAL DIRECTIVE</span>
                    <span className="font-serif font-medium text-luxury-white text-base mt-1 block">
                      {analysisResult?.industryMatch || "Luxury Consultation"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-widest">PRIMARY RECIPE</span>
                    <span className="text-xs font-mono text-luxury-green-glowing font-bold mt-1.5 block">
                      {analysisResult?.primaryPrescription || "Search Entity Amplification"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-widest">PROPOSED HORIZON</span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-zinc-300 font-medium">{analysisResult?.estimatedTimeline || "6-12 Weeks"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-green-950/20 space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-widest">CORE SCALE PILLARS</span>
                    <ul className="space-y-1.5 text-xs">
                      {analysisResult?.tacticalPillars?.map((pillar, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-zinc-300 font-sans font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-green-glowing" />
                          {pillar}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Curated Strategic Evaluation from Gemini */}
                <div className="lg:col-span-2 p-6 rounded-xl border border-green-900/20 bg-luxury-black relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-3">
                    <Zap className="w-4 h-4 text-luxury-green-glowing animate-pulse" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-luxury-green-glowing" /> BESPOKE AUDIT RECOMMENDATION
                    </h4>
                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed whitespace-pre-line font-sans font-light">
                      {analysisResult?.geminiResponse}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-green-950/20 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span className="text-[9px] font-mono text-zinc-500">
                      * Recommendation based on ThinkSarath's proprietary indexing guidelines.
                    </span>

                    <a
                      href="#ai-auditor-section"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-linear-to-r from-luxury-green to-luxury-green-mid hover:from-luxury-green-mid hover:to-luxury-green-light text-xs font-mono text-luxury-white font-semibold transition-all shadow-[0_0_12px_rgba(74,222,128,0.15)] hover:shadow-[0_0_18px_rgba(74,222,128,0.35)]"
                    >
                      RUN DETAILED SITE AUDIT <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Next Steps Prompt */}
              <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-950/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-medium text-luxury-white">Confirm Your Priority Booking Slot</h5>
                    <p className="text-[11px] text-zinc-500 font-sans">Our team will reach out via WhatsApp/Email within 4 hours with your detailed scope report.</p>
                  </div>
                </div>
                
                <span className="px-3 py-1 rounded-full border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase tracking-wider animate-pulse shrink-0">
                  Slot Reserved
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BorderGlow>
    </div>
  );
}
