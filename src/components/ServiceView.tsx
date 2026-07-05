import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Cpu, 
  Linkedin, 
  Globe, 
  TrendingUp, 
  PenTool, 
  Sparkles, 
  Code, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import SEOHead from './SEOHead';
import Breadcrumbs from './Breadcrumbs';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ThinkSarath | Premium SEO, GEO & AEO Consulting Services",
  "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80",
  "url": "https://thinksarath.com/service",
  "telephone": "+91-9876543210",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nasiyanur Road",
    "addressLocality": "Erode",
    "addressRegion": "Tamil Nadu",
    "postalCode": "638011",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "11.3410",
    "longitude": "77.7172"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.linkedin.com/in/sarath-babu-k-92636a287"
  ]
};


interface ServiceItem {
  id: string;
  category: 'content' | 'ai' | 'ads' | 'dev';
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  timeline: string;
  outcome: string;
  techStack?: string[];
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "seo-articles",
    category: "content",
    title: "SEO Articles & Authority Blogging",
    badge: "Traffic Scale",
    description: "In-depth, topical authority mapping and keyword-aligned blog articles designed to command organic real estate on search result pages.",
    deliverables: [
      "Semantic keyword clusters & topic maps",
      "Comprehensive search intent blueprinting",
      "Plagiarism-free, high-converting editorial copies",
      "Readability scoring & schema markup injection"
    ],
    timeline: "3-5 Business Days per set",
    outcome: "Command organic keywords & scale referral pipelines."
  },
  {
    id: "website-writing",
    category: "content",
    title: "High-Intent Website Writing",
    badge: "Conversion Copy",
    description: "Premium website copies crafted specifically for luxury medical clinics, high-end real estate brochures, and professional consultants. Conversational layout with absolute zero fluff.",
    deliverables: [
      "Homepage, Services & Custom Landing layout copies",
      "High-persuasion CTA framing & sales triggers",
      "Semantic markup optimization",
      "Consistent, luxury-demographic brand tone alignment"
    ],
    timeline: "7-10 Days complete site",
    outcome: "Boost site conversion rates (CRO) by up to 2.5x."
  },
  {
    id: "linkedin-opt",
    category: "content",
    title: "LinkedIn Profile Optimization & Badges",
    badge: "Personal Brand",
    description: "Establishing elite-tier personal brand authority. Tailor-fit headlines, search-indexed about summaries, and structured badge acquisition layouts.",
    deliverables: [
      "Custom keyword-rich LinkedIn Headline structuring",
      "Persuasive, story-driven About Section crafting",
      "Featured Section setup & recommendations blueprinting",
      "LinkedIn Top Voice Badge preparation frameworks"
    ],
    timeline: "3-5 Business Days",
    outcome: "Drastically increase profile views & inbound enterprise opportunities."
  },
  {
    id: "social-content",
    category: "content",
    title: "Social Media Content Creation",
    badge: "Omnipresence",
    description: "Engineered content strategies that foster high engagement across LinkedIn, Twitter, and premium business networks.",
    deliverables: [
      "Weekly thought-leadership content calendars",
      "High-engagement carousels & vector text summaries",
      "Niche trend alignment & hashtag mapping",
      "Audience engagement triggers"
    ],
    timeline: "Monthly Retainer Flow",
    outcome: "Build organic community and cement personal brand mindshare."
  },
  {
    id: "geo-optimization",
    category: "ai",
    title: "Generative Engine Optimisation (GEO)",
    badge: "LLM Citations",
    description: "Structuring your website assets, semantic entities, and verified web profiles so that your brand is cited as the primary expert reference in ChatGPT Search, Gemini, Perplexity, and Google AI Overviews.",
    deliverables: [
      "Entity relationship map alignment",
      "LLM citation footprint generation and reviews seeding",
      "Dynamic factual parameter injection (JSON-LD Graph)",
      "Unstructured data formatting for crawler ease"
    ],
    timeline: "2-3 Weeks strategic injection",
    outcome: "Secure top-of-mind recommendations and authoritative direct AI brand mentions."
  },
  {
    id: "aeo-strategy",
    category: "ai",
    title: "Answer Engine Optimisation (AEO)",
    badge: "Direct Answers",
    description: "Fine-tuning content architecture to target featured snippets, voice search responses, and direct conversational question-answer systems.",
    deliverables: [
      "Conversational FAQ block design and markup",
      "High-intent long-tail question-answer mapping",
      "Structured voice-search query keyword tagging",
      "Micro-format structured data setup"
    ],
    timeline: "1-2 Weeks audit & setup",
    outcome: "Capture position-zero listings and high-volume conversational referral clicks."
  },
  {
    id: "programmatic-seo",
    category: "dev",
    title: "Programmatic SEO (pSEO) & Database Scaling",
    badge: "Scale Domination",
    description: "Designing database-driven WordPress or custom React structures to auto-generate thousands of highly targeted localized or template landing pages.",
    deliverables: [
      "High-intent parent keyword template blueprinting",
      "Dynamic CSV / database compilation & schema mappings",
      "High-speed programmatically scaled page layout build",
      "Sitemap routing & crawl budget optimization"
    ],
    timeline: "3-4 Weeks platform launch",
    outcome: "Scale to thousands of organic keyword targets within weeks without content fatigue."
  },
  {
    id: "ai-content",
    category: "ai",
    title: "AI-Powered Content & Page Systems",
    badge: "Generative Scale",
    description: "Scaling high-fidelity, highly researched content hubs using integrated LLM systems while maintaining absolute editorial compliance.",
    deliverables: [
      "Prompt engineering workflows for local page content",
      "Retrieval Augmented Generation (RAG) content maps",
      "Entity schema injections for AI search recognition",
      "Automated factual review pipelines"
    ],
    timeline: "1-2 Weeks setup",
    outcome: "10x content output velocity with premium quality compliance."
  },
  {
    id: "ai-tools-saas",
    category: "ai",
    title: "AI Tools & Micro SaaS Strategies",
    badge: "Productive Growth",
    description: "Integrating custom conversational chatbots, auditing widgets, or micro calculators on your site to capture viral, highly qualified intent leads.",
    deliverables: [
      "Embeddable AI logic widget design",
      "Custom system instruction parameters tuning",
      "User session logging & data collection flows",
      "Seamless backend proxy integrations"
    ],
    timeline: "2-4 Weeks execution",
    outcome: "Drastically lower lead acquisition costs (CPL) through interactive hooks."
  },
  {
    id: "wp-dev",
    category: "dev",
    title: "WordPress Development & Core Vitals",
    badge: "Speed & SEO",
    description: "Bespoke, hand-crafted WordPress sites optimized for extreme loading speeds (95+ score), responsive mobile viewports, and native schema compliance.",
    deliverables: [
      "Responsive luxury UI custom themes development",
      "Core Web Vitals configuration (LCP, FID, CLS correction)",
      "RankMath or Yoast Pro technical schema integrations",
      "Server-side cache and proxy configurations"
    ],
    timeline: "2-3 Weeks build",
    outcome: "Lightning-fast page loads matching modern technical search standards."
  },
  {
    id: "google-ads",
    category: "ads",
    title: "High-Performance Google Ads",
    badge: "Paid Search ROI",
    description: "Data-backed pay-per-click management focusing strictly on client acquisition, negative bid scrubbing, and conversion tracking.",
    deliverables: [
      "Performance Max (PMax) campaign architectures",
      "Hyper-specific intent keyword targeting matrices",
      "Bespoke ad copy matching luxury buyer needs",
      "Offline conversion tracking setup"
    ],
    timeline: "Ongoing Management",
    outcome: "Maximize ROAS and build a repeatable customer faucet."
  },
  {
    id: "meta-ads",
    category: "ads",
    title: "Meta Paid Social Funnels",
    badge: "Audience Scale",
    description: "Capturing, nurturing, and converting high-net-worth local demographics through targeted Instagram & Facebook campaigns.",
    deliverables: [
      "Custom demographic mapping & carving patterns",
      "High-CTR ad creative ideas and content hooks",
      "Instant lead ad setup & CRM integrations",
      "Retargeting funnel configurations"
    ],
    timeline: "Ongoing Management",
    outcome: "Sustain high-volume inquiries and establish local digital presence."
  }
];

export default function ServiceView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'content' | 'ai' | 'ads' | 'dev'>('all');

  const filteredServices = activeCategory === 'all' 
    ? ALL_SERVICES 
    : ALL_SERVICES.filter(srv => srv.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'content', label: 'SEO & Copywriting' },
    { id: 'ai', label: 'AI & AEO/GEO' },
    { id: 'ads', label: 'Paid Acquisition' },
    { id: 'dev', label: 'Web & WordPress' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SEOHead 
        title="Premium SEO, GEO & AEO Consulting Services | ThinkSarath" 
        description="Premium search, generative AI citation, and answer engine marketing solutions by Sarath Babu K. Scale your local clinic, firm, or SaaS brand sustainably." 
        schema={serviceSchema} 
      />
      <Breadcrumbs items={[{ name: 'Services', path: '/service' }]} />
      {/* Services Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
          TECHNICAL SERVICES PORTFOLIO
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
          Bespoke Scaling Channels
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
          Engineered strategies mapping client touchpoints directly to high-margin revenue goals. Explore specific channels and operational footprints.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-green-950/20 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 text-xs font-mono tracking-wider rounded-lg border transition-all cursor-pointer ${
              activeCategory === cat.id 
                ? 'bg-green-950/25 border-luxury-green-glowing text-luxury-green-glowing shadow-[0_0_12px_rgba(74,222,128,0.12)]' 
                : 'bg-green-950/5 border-green-950/30 text-zinc-500 hover:text-zinc-300 hover:border-green-900/50'
            }`}
          >
            {cat.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <BorderGlow className="h-full flex flex-col justify-between">
                <div className="p-1 space-y-4">
                  {/* Badge & Category indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-green-950/30 border border-green-900/40 text-luxury-green-glowing px-2.5 py-0.5 rounded-md tracking-wider">
                      {service.badge}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase">
                      {service.category} ID-{idx + 10}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-serif font-medium text-luxury-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                    {service.description}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">CORE INCLUSIONS:</span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-luxury-green-glowing shrink-0 mt-0.5" />
                          <span className="leading-snug font-sans font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer specs of card */}
                <div className="border-t border-green-950/20 pt-4 mt-6 space-y-2.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-500 uppercase">Est. Delivery Timeline:</span>
                    <span className="text-luxury-white font-medium">{service.timeline}</span>
                  </div>
                  <div className="flex justify-between items-start text-[10px] font-mono">
                    <span className="text-zinc-500 uppercase shrink-0">Primary Impact:</span>
                    <span className="text-luxury-green-glowing text-right pl-4 leading-normal font-medium">{service.outcome}</span>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Trust reassurance banner */}
      <div className="mt-16 p-6 rounded-2xl border border-green-950/35 bg-green-950/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-950/25 border border-green-900/30 text-luxury-green-glowing flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-medium text-luxury-white">Need a dynamic, multi-channel growth program?</h4>
            <p className="text-xs text-zinc-400 font-sans font-light mt-0.5">We combine custom SEO, AEO optimizations, and Google ads scaling into an integrated campaign blueprint.</p>
          </div>
        </div>

        <a
          href="#lead-qualifier-section"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-linear-to-r from-luxury-green to-luxury-green-mid hover:from-luxury-green-mid hover:to-luxury-green-light text-xs font-mono text-luxury-white font-bold transition-all shadow-[0_0_12px_rgba(74,222,128,0.15)] shrink-0"
        >
          GENERATE CUSTOM SCOPE <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
