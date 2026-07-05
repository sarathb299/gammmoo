import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Plus, 
  Minus, 
  Sparkles, 
  PhoneCall, 
  FileText 
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import SEOHead from './SEOHead';


interface FaqItem {
  question: string;
  answer: string;
  category: 'ai' | 'seo' | 'pricing' | 'process';
}

const FAQ_DATA: FaqItem[] = [
  {
    category: "ai",
    question: "What is AEO & GEO and why is it necessary in 2026?",
    answer: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are search engine optimization practices tailored for AI-powered discovery platforms (such as ChatGPT Search, Perplexity AI, Google Gemini, and Apple Intelligence). Instead of targeting keywords to rank links on page 1 of Google, we optimize your site's technical schema, factual data pools, and third-party entity profiles so that conversational AI models directly summarize your brand and cite your URL as the primary recommendation."
  },
  {
    category: "seo",
    question: "How long does it take to see results from SEO and AEO?",
    answer: "Traditional Google organic ranking improvements generally take 3 to 6 months depending on keyword competitiveness. However, Answer Engine Optimization (AEO) and Conversational indexing can reflect much faster (within 2 to 6 weeks) because we optimize entity structures and seed citation triggers that AI bots fetch during real-time web crawlers."
  },
  {
    category: "pricing",
    question: "What are your monthly investment retainer tiers?",
    answer: "Our consulting packages are split into three high-performance tiers: Strategic Baseline ($1,000 - $2,500/mo) for local map optimization and entity authority building; Growth Surge ($2,500 - $5,000/mo) for aggressive SEO and multi-funnel paid search campaigns; and Elite Omnichannel Scaling ($5,000+/mo) for full search dominance across Google, ChatGPT, and social networks."
  },
  {
    category: "process",
    question: "How do you handle programmatic content scaling (pSEO) without losing quality?",
    answer: "We employ strict factual validation layers. Every programmatic landing page template is built with specific, real-world databases (e.g., localized clinics, unique staff rosters, procedures, pricing, and genuine client reviews) instead of spinning generic text. This guarantees distinct, valuable page paths that fulfill Google's Helpful Content Guidelines."
  },
  {
    category: "seo",
    question: "Do you specialize in local maps ranking and Google My Business (GMB)?",
    answer: "Yes, we focus heavily on dominating local map packs in key metropolises (e.g., Chennai and Erode). Our GMB blueprint includes synchronizing NAP citations across national registers, optimizing metadata of geo-tagged photos, and setting up automated review generation programs to establish maps presence."
  },
  {
    category: "process",
    question: "What is the process for onboarding a new premium client?",
    answer: "Onboarding is simple and streamlined: 1) You complete our 10-step Elite Growth Qualifier; 2) We generate your complimentary strategic SEO/AEO audit blueprint; 3) We schedule a 30-minute alignment video call; 4) We finalize key deliverables, establish tracking metrics, and initialize optimization sprints."
  },
  {
    category: "pricing",
    question: "Is there any lock-in contract on your retainers?",
    answer: "No, we believe in performance-driven partnerships. Most of our retainers operate on a flexible, rolling 30-day cancellation basis. This aligns our priorities directly with your organic visibility and revenue growth."
  }
];

export default function FaqView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'seo' | 'pricing' | 'process'>('all');
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggleIndex = (idx: number) => {
    setOpenIndexes(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const filteredFaqs = FAQ_DATA.filter((faq, idx) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'ai', label: 'AI & AEO/GEO' },
    { id: 'seo', label: 'SEO & Maps' },
    { id: 'pricing', label: 'Pricing & Tiers' },
    { id: 'process', label: 'Our Process' }
  ];

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEOHead 
        title="Technical AI SEO, AEO & GEO FAQ Hub | ThinkSarath" 
        description="Get exact, structured technical answers on Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), monthly retainers, and organic scaling cycles." 
        schema={faqPageSchema} 
      />
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
          KNOWLEDGE BASE & GUIDELINES
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
          Clear, concise, and jargon-free guidance detailing our core scaling methods, campaign delivery cycles, and performance accountability.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-green-950/20 pb-6 mb-8">
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'bg-green-950/25 border-luxury-green-glowing text-luxury-green-glowing' 
                  : 'bg-green-950/5 border-green-950/35 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-green-950/40 bg-green-950/5 text-xs text-luxury-white outline-none focus:border-luxury-green-glowing/60 transition-all font-sans"
          />
        </div>
      </div>

      {/* Accordion Panel */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = !!openIndexes[idx];
            return (
              <BorderGlow key={idx} className="p-0 overflow-hidden">
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-5 py-4 md:py-5 flex items-center justify-between text-left bg-luxury-black/90 cursor-pointer text-luxury-white hover:text-luxury-green-glowing transition-colors font-serif font-medium text-sm md:text-base"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className="shrink-0 w-6 h-6 rounded-full border border-green-950/30 bg-green-950/10 flex items-center justify-center text-luxury-green-glowing">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-green-950/20 bg-green-950/5"
                    >
                      <div className="px-5 py-4 text-zinc-400 text-xs md:text-sm leading-relaxed font-sans font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BorderGlow>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-green-950/25 rounded-2xl bg-green-950/5">
          <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm font-mono">No matching FAQ items found.</p>
        </div>
      )}

      {/* Instant Help Box */}
      <div className="mt-12 p-6 rounded-2xl border border-green-950/35 bg-green-950/5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-sm font-serif font-medium text-luxury-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-luxury-green-glowing" /> Have a project-specific query?
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-1">Get an immediate diagnostic evaluation on your vertical by speaking to Sarath Babu K directly on WhatsApp.</p>
        </div>
        <div className="flex gap-3 justify-end font-mono text-xs">
          <a
            href="https://wa.me/917094629042?text=Hello%20Sarath%2C%20I%20have%20a%20question%20regarding%20AEO%2FSEO."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-green-950/20 hover:bg-green-950/40 border border-green-900/40 hover:border-luxury-green-glowing text-luxury-white flex items-center gap-2 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-luxury-green-glowing" />
            <span>ASK SARATH DIRECTLY</span>
          </a>
        </div>
      </div>
    </div>
  );
}
