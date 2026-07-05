import React from 'react';

export interface EntityLink {
  regex: RegExp;
  text: string;
  view: 'home' | 'about' | 'services' | 'blog' | 'faq' | 'contact' | 'brand-hub';
  tab?: string;
}

export const KEYWORDS_MAP: EntityLink[] = [
  { regex: /ThinkSarath GEO Framework™/g, text: 'ThinkSarath GEO Framework™', view: 'brand-hub', tab: 'method-ai-search' },
  { regex: /ThinkSarath AEO Framework™/g, text: 'ThinkSarath AEO Framework™', view: 'brand-hub', tab: 'method-ai-search' },
  { regex: /ThinkSarath Method™/g, text: 'ThinkSarath Method™', view: 'brand-hub', tab: 'method-ai-search' },
  { regex: /Answer Engine Optimisation/gi, text: 'Answer Engine Optimisation', view: 'services' },
  { regex: /Answer Engine Optimization/gi, text: 'Answer Engine Optimization', view: 'services' },
  { regex: /Generative Engine Optimisation/gi, text: 'Generative Engine Optimisation', view: 'services' },
  { regex: /Generative Engine Optimization/gi, text: 'Generative Engine Optimization', view: 'services' },
  { regex: /Programmatic SEO/gi, text: 'Programmatic SEO', view: 'services' },
  { regex: /Sarath Babu K/g, text: 'Sarath Babu K', view: 'brand-hub', tab: 'about-sarath-babu' },
  { regex: /Sarath Babu/g, text: 'Sarath Babu', view: 'brand-hub', tab: 'about-sarath-babu' },
  { regex: /Code99 IT Academy/gi, text: 'Code99 IT Academy', view: 'brand-hub', tab: 'about-thinksarath' },
  { regex: /Code99 Academy/gi, text: 'Code99 Academy', view: 'brand-hub', tab: 'about-thinksarath' },
  { regex: /ZenX Academy/gi, text: 'ZenX Academy', view: 'brand-hub', tab: 'about-thinksarath' },
  { regex: /\bAEO\b/g, text: 'AEO', view: 'services' },
  { regex: /\bGEO\b/g, text: 'GEO', view: 'services' },
  { regex: /\bpSEO\b/g, text: 'pSEO', view: 'services' }
];

// Single capturing pattern matching any of our entity keywords
const ENTITIES_PATTERN = /(ThinkSarath GEO Framework™|ThinkSarath AEO Framework™|ThinkSarath Method™|Answer Engine Optimisation|Answer Engine Optimization|Generative Engine Optimisation|Generative Engine Optimization|Programmatic SEO|Sarath Babu K|Sarath Babu|Code99 IT Academy|Code99 Academy|ZenX Academy|\bAEO\b|\bGEO\b|\bpSEO\b)/g;

export interface BlogPostHeading {
  id: string;
  text: string;
}

const POSTS_HEADINGS_MAP: Record<string, BlogPostHeading[]> = {
  "who-is-thinksarath-brand-story": [
    { id: "brand-origin-rag-search", text: "1. The Origin of ThinkSarath in the Retrieval-Augmented Generation Search Era" },
    { id: "generative-engine-optimization-aeo-geo", text: "2. Pioneering Generative Engine Optimization & Answer Engine Optimization" },
    { id: "thinksarath-ai-seo-framework-architectures", text: "3. Integrating the ThinkSarath AI SEO Framework™ and WordPress Architectures" },
    { id: "academic-networks-code99-academy", text: "4. Establishing Domain Authority with Code99 IT Academy and ZenX Academy" }
  ],
  "why-i-started-thinksarath-mission": [
    { id: "legacy-seo-shortcomings", text: "1. Beyond Superficial Vanity Metrics and Legacy Search Engine Practices" },
    { id: "generative-ai-search-zero-click", text: "2. Combating the Zero-Click Crisis through LLM and RAG Retrieval Optimization" },
    { id: "thinksarath-aeo-geo-frameworks", text: "3. Securing Conversational Citations with the ThinkSarath GEO & AEO Frameworks™" },
    { id: "organic-marketing-growth-paths", text: "4. Building Real, Verifiable Organic Authority for High-Intent Business Sectors" }
  ],
  "meet-sarath-babu-ai-seo-consultant": [
    { id: "sarath-babu-custom-wordpress-development", text: "1. Sarath Babu K: Combining Programming Expertise with Search Optimization" },
    { id: "code99-academy-mentorship", text: "2. Head of Digital Marketing at Code99 IT Academy and Trainer at ZenX Academy" },
    { id: "enterprise-organic-acquisitions-tamillnadu", text: "3. Acquiring Enterprise Leads across Healthcare and SaaS Verticals in Tamil Nadu" },
    { id: "thinksarath-method-ai-search", text: "4. Deploying the Signature ThinkSarath Method™ for AI Search" }
  ],
  "what-does-thinksarath-do": [
    { id: "boutique-advisory-services", text: "1. Technical and Semantic Search Advisory Built for Corporate Scaling" },
    { id: "ai-seo-geo-citation-signals", text: "2. Restructuring Layout Designs for Google, ChatGPT, and Perplexity Citation Signals" },
    { id: "pseo-engines-code99-academy", text: "3. Programmatic SEO (pSEO) Engine Engineering with Code99 IT Academy" },
    { id: "omnichannel-google-meta-ads", text: "4. AEO Conversational Hubs Matched with Google Ads and Meta Campaigns" }
  ],
  "seo-philosophy-ai-search-era": [
    { id: "keywords-dead-entities-eternal", text: "1. Why Keywords Are Obsolete and Entity Associations Are Eternal" },
    { id: "knowledge-graphs-wikipedia-linkage", text: "2. Structuring Corporate Nodes with JSON-LD Schema Linked to Wikipedia and ZenX Academy" },
    { id: "thinksarath-ai-seo-framework-clustering", text: "3. Applying the ThinkSarath AI SEO Framework™ to Topic Clusters" },
    { id: "definitive-recommendations-ai-search", text: "4. Achieving Zero-Error Definitive Recommendations in Conversational AI Search" }
  ],
  "how-thinksarath-helps-businesses-grow": [
    { id: "converting-informational-to-transactional", text: "1. Engineering High-Intent Search Paths That Turn Traffic into Sales" },
    { id: "aeo-framework-conversational-recommender", text: "2. Deploying the ThinkSarath AEO Framework™ for Specialized Medical Clinics" },
    { id: "core-web-vitals-loading-speed", text: "3. Optimizing Core Web Vitals and Eliminating Page Load Bottlenecks" },
    { id: "topic-cluster-organic-synergy", text: "4. Leveraging Topic Clusters to Reduce Acquisition Costs" }
  ],
  "my-digital-marketing-journey-seo-to-ai": [
    { id: "ten-years-technical-seo", text: "1. A Decade of Custom PHP, WordPress Development, and Page Speed Optimization" },
    { id: "collaboration-code99-zenx-academies", text: "2. Integrating Development and Marketing with Code99 and ZenX Academy" },
    { id: "llm-retrievers-entity-structures", text: "3. Transitioning from PageRank to Entity Structures for LLM Retrieval Models" },
    { id: "global-authority-campaigns", text: "4. Helping Businesses Claim Authority Inside Next-Generation Search Systems" }
  ],
  "thinksarath-brand-values-marketing-principles": [
    { id: "scientific-organic-marketing", text: "1. Treating Search Marketing as a Precise, Data-Driven Science" },
    { id: "eliminating-page-builder-bloat", text: "2. Technical Integrity: Eliminating Bloated Plugins and Slow Page Builders" },
    { id: "transparency-bottomline-metrics", text: "3. Radical Transparency: Focusing on Metrics That Impact Your Bottom Line" },
    { id: "client-centric-performance", text: "4. Semantic Accuracy and Client-Centric Performance Marketing" }
  ],
  "why-ai-will-change-seo-forever": [
    { id: "multi-modal-generative-search-shift", text: "1. The Historic Paradigm Shift from Link Directories to Conversational Synthesizers" },
    { id: "zero-click-content-scrapers", text: "2. Zero-Click Search: Why Generic Content Blogs Face Digital Extinction" },
    { id: "thinksarath-geo-framework-citations", text: "3. Restructuring Content into Dense Factual Tables using the ThinkSarath GEO Framework™" },
    { id: "entity-mapping-next-decade", text: "4. Dominating Organic Search through Advanced Technical Entity Mapping" }
  ],
  "geo-2026-blueprint": [
    { id: "blue-link-decay", text: "1. The Decay of Standard Blue-Links and Keyword Stuffing in 2026" },
    { id: "generative-engine-optimization-linkages", text: "2. Pioneering Generative Engine Optimization (GEO) and Semantic Linkages" },
    { id: "ranking-signals-llm-aggregators", text: "3. Key Ranking Signals: Citation Sources, Technical Terms, and Schema Precision" },
    { id: "json-ld-entity-data-tables", text: "4. Implementing JSON-LD Entity Structures and Structured Factual Tables" }
  ],
  "aeo-perplexity-chatgpt": [
    { id: "conversational-recommendation-curations", text: "1. Appearing Inside the Conversational Recommendations of ChatGPT and Gemini" },
    { id: "aeo-tactical-branding-hubs", text: "2. Developing Tactical Question-and-Answer Resource Hubs" },
    { id: "longtail-conversational-queries", text: "3. Mapping Long-Tail Conversational User Queries to Business Solutions" },
    { id: "perplexity-realtime-citations-reviews", text: "4. Triggering Perplexity Real-Time Web Citations through Third-Party Review Seeding" }
  ],
  "pseo-scaling-longtail": [
    { id: "manual-vs-programmatic-scaling", text: "1. Scaling Organic Traffic Without Writing Thousands of Articles Manually" },
    { id: "programmatic-seo-data-registers", text: "2. How Programmatic SEO (pSEO) Leverages Structured Database Registers" },
    { id: "wordpress-pSEO-code99-academy", text: "3. Case Study: Scaling Course Page Arrays for Code99 IT Academy" },
    { id: "duplicate-content-filters", text: "4. Bypassing Helpful Content Filters with Unique Localized Data Blocks" }
  ],
  "google-meta-ads-synergy": [
    { id: "pmax-google-ppc-facebook-silos", text: "1. The Failure of Running Paid Acquisition Channels in Silos" },
    { id: "capturing-high-intent-keywords", text: "2. Capturing High-Intent Transactional Searchers on Google Ads" },
    { id: "cross-channel-meta-pixels", text: "3. Remarketing Google Click Referrals with Meta Pixel Custom Events" },
    { id: "lowering-acquisition-costs", text: "4. Reducing Facebook CPA by up to 40% with Cross-Channel Audience Loops" }
  ]
};

export function getPostHeadings(postId: string): BlogPostHeading[] {
  return POSTS_HEADINGS_MAP[postId] || [
    { id: "overview", text: "1. Deep-Tech Optimization Overview" },
    { id: "methodology", text: "2. Growth Methodology & Architecture" },
    { id: "implementation", text: "3. Factual Verification & Citations" },
    { id: "conclusion", text: "4. Strategic Business Outcomes" }
  ];
}

/**
 * Automatically link predefined keywords to internal service/brand-hub views or tabs.
 */
export function linkEntities(
  text: string, 
  onNavigate?: (view: 'home' | 'about' | 'services' | 'blog' | 'faq' | 'contact' | 'brand-hub', tab?: string) => void
): React.ReactNode[] {
  if (!text) return [];

  const parts = text.split(ENTITIES_PATTERN);
  return parts.map((part, index) => {
    // Find matching keyword configuration
    const match = KEYWORDS_MAP.find(item => item.regex.test(part));
    
    if (match) {
      return (
        <button
          key={`${part}-${index}`}
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) {
              onNavigate(match.view, match.tab);
            } else {
              const url = match.tab ? `/${match.view}?tab=${match.tab}` : `/${match.view}`;
              window.history.pushState(null, '', url);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          className="text-luxury-green-glowing hover:text-luxury-white underline decoration-luxury-green-glowing/25 hover:decoration-luxury-white cursor-pointer font-semibold transition-all bg-transparent border-none p-0 inline font-sans hover:shadow-[0_0_8px_rgba(74,222,128,0.2)]"
        >
          {part}
        </button>
      );
    }
    return part;
  });
}
