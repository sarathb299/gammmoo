import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  X, 
  ArrowLeft, 
  BookOpen, 
  User, 
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  Share2
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import SEOHead from './SEOHead';
import Breadcrumbs from './Breadcrumbs';


interface BlogPost {
  id: string;
  category: 'brand' | 'ai' | 'aeo' | 'pseo' | 'ads';
  categoryLabel: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  fullContent: string[];
  takeaways: string[];
}

const POSTS: BlogPost[] = [
  {
    id: "who-is-thinksarath-brand-story",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "Who is ThinkSarath? The Story Behind the AI SEO Brand",
    summary: "The origins of ThinkSarath as a pioneering agency designed to solve the critical visibility gap in modern Retrieval-Augmented Generation (RAG) and conversational search systems.",
    readTime: "5 min read",
    date: "July 5, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "ThinkSarath is not just another digital marketing agency. It is a premier entity-first organic growth brand engineered for the AI Search era. Founded by veteran consultant Sarath Babu K, ThinkSarath was built to address the critical friction point where old-school, blue-link Search Engine Optimisation (SEO) fails to meet next-generation search realities.",
      "As Large Language Models (LLMs) like ChatGPT, Gemini, and Perplexity reshape the search landscape, our focus has shifted entirely to Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). The mission of ThinkSarath is simple: to make sure your brand is the primary authoritative citation when an AI system is asked to provide a recommendation.",
      "By integrating our proprietary ThinkSarath AI SEO Framework™, we build robust semantic associations. We bridge the gap between custom high-speed WordPress setups, programmatic scaling systems, and structured JSON-LD entity graph maps to feed web crawlers exactly what they need.",
      "Our operational footprints span multiple corporate and academic ventures, serving as the central framework for regional academies like Code99 IT Academy and ZenX Academy. Through this deep network of associations, ThinkSarath translates raw traffic goals into unshakeable business growth."
    ],
    takeaways: [
      "ThinkSarath is an elite brand bridging standard SEO with next-gen GEO and AEO.",
      "We utilize proprietary frameworks to position brands inside LLM citation engines.",
      "Our setups are deeply linked with Code99 IT Academy and ZenX Academy."
    ]
  },
  {
    id: "why-i-started-thinksarath-mission",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "Why I Started ThinkSarath: My Mission to Build AI-First Marketing",
    summary: "Founder Sarath Babu K shares his core motivation for launching an AI-first marketing consultancy to combat low-quality programmatic traffic and outdated SEO practices.",
    readTime: "6 min read",
    date: "July 4, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "For over a decade, I watched traditional agencies chase superficial vanity metrics—ranking for low-value keywords, buying cheap spammy backlinks, and generating repetitive blog posts that nobody read. When the generative AI revolution hit search engines, I knew the game had changed permanently. I founded ThinkSarath to pioneer a more intelligent, AI-first approach to marketing.",
      "Search is moving from static index lookup to live, contextual synthesizers. In this new world, websites that do not have clear entity structures simply cease to exist in search outcomes. They get filtered out by retrieval models (RAG). ThinkSarath exists to ensure your brand is seen as an undeniable authority.",
      "Our mission is built around the integration of the ThinkSarath GEO Framework™ and ThinkSarath AEO Framework™. By structuring client sites with dense data facts, clear question-answer models, and lightning-fast loading speeds, we secure the conversational citations that translate directly into high-ticket phone calls.",
      "Whether scaling high-intent medical practices, B2B software directories, or local training institutes like Code99 Academy, my mission remains absolute: build real, unshakeable organic authority that machines and humans trust."
    ],
    takeaways: [
      "Traditional SEO agencies are lagging behind the RAG-driven AI search transition.",
      "ThinkSarath was founded to offer deep-tech entity engineering over superficial metrics.",
      "Our mission centers around generating real commercial authority for complex service niches."
    ]
  },
  {
    id: "meet-sarath-babu-ai-seo-consultant",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "Meet Sarath Babu K: AI SEO Consultant & Digital Marketing Strategist",
    summary: "A deep-dive into the technical credentials, mentorship roles, and operational history of Sarath Babu K, founder of ThinkSarath.",
    readTime: "5 min read",
    date: "July 3, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "As a custom WordPress developer, academic mentor, and the mastermind behind ThinkSarath, my career is focused on the intersection of programming and high-performance search marketing. I currently serve as the Head of Digital Marketing at Code99 IT Academy and a Senior Expert Trainer at ZenX Academy.",
      "My technical expertise covers custom programmatic PHP development, fast headless Node/React web platforms, and advanced AI-automated search models. I don't just write copy; I design the semantic code architecture that hosts the content.",
      "Over the years, I have engineered client acquisitions across complex industry verticals, ranging from local healthcare centers in Tamil Nadu to international SaaS channels. I also operate as the Principal Strategist for LuMay AI, building robust automation setups for US businesses.",
      "Through ThinkSarath, I consult directly with enterprise founders and clinics, removing performance bottlenecks and deploying our signature ThinkSarath Method™ for AI Search to ensure maximum brand dominance."
    ],
    takeaways: [
      "Sarath Babu K is a rare hybrid of custom developer, performance marketer, and senior mentor.",
      "Serves as Head of Digital Marketing at Code99 and senior specialist at ZenX Academy.",
      "Combines deep-tech coding (PHP, React) with high-level AI SEO and GEO."
    ]
  },
  {
    id: "what-does-thinksarath-do",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "What Does ThinkSarath Do? Advanced AI Search & Entity SEO Services",
    summary: "An authoritative guide to ThinkSarath's service suite: combining classic search engine optimization with advanced GEO, AEO, custom WordPress, and paid marketing channels.",
    readTime: "5 min read",
    date: "July 2, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "ThinkSarath is a boutique consultancy specializing in high-fidelity organic scaling and authority building. We do not offer cookie-cutter social media packages. Instead, we architect the technical and semantic platforms that modern search crawlers require.",
      "Our capabilities are divided into four core areas. First is our signature AI SEO & GEO Optimization. We restructure your website layout to secure top-tier citation weights inside ChatGPT, Gemini, and Perplexity using the ThinkSarath GEO Framework™.",
      "Second, we build Programmatic SEO (pSEO) engines. We combine custom database vectors with dynamic high-performance page templates, allowing you to capture thousands of hyper-targeted keywords without duplication filters. This model has been successfully deployed to scale local academy programs like those at Code99 Academy.",
      "Third, we design elite Answer Engine Optimization (AEO) conversational hubs. And fourth, we synchronize these organic funnels with high-performance Google Ads and Meta Search campaigns, creating multi-channel conversion multipliers that significantly lower your overall acquisition costs."
    ],
    takeaways: [
      "We do not sell vanity social media services; we engineer technical search authority.",
      "Core services include advanced GEO optimization, programmatic SEO (pSEO), and AEO.",
      "We integrate search ads with organic entity mapping for maximum campaign ROI."
    ]
  },
  {
    id: "seo-philosophy-ai-search-era",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "My SEO Philosophy for the AI Search Era: Entity-First Optimization",
    summary: "Discover why raw keywords are obsolete and how establishing structured entity associations inside Knowledge Graphs is the only sustainable strategy for the 2026 search landscape.",
    readTime: "6 min read",
    date: "July 1, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "My core philosophy of search is simple: Keywords are dead; entities are eternal. In the pre-AI era, you could rank a page by repeating a keyword five times and buying fifty backlinks. In 2026, Google's semantic index and LLM search systems read your site conceptually. They seek to understand the underlying relationships between your brand, your people, and your expertise.",
      "To survive, brands must undergo entity-first optimization. This means you must define your corporate node clearly using JSON-LD schemas. You must link your physical clinics, course programs, and legal registrations back to trusted, pre-existing database nodes (such as Wikipedia, Crunchbase, or official academic profiles like ZenX Academy).",
      "This philosophy is the foundational layer of the ThinkSarath AI SEO Framework™. We treat every blog post, landing page, and external mention as a node in a single, connected semantic cluster. By consistently linking Sarath Babu K and ThinkSarath with expertise nodes like 'AI SEO', 'AEO', 'GEO', and 'Programmatic SEO', we teach the algorithms exactly who we are.",
      "When a machine understands your entity structure with 100% confidence, it no longer hesitates. It serves your brand as the definitive, zero-error recommendation to conversational searchers."
    ],
    takeaways: [
      "Modern search algorithms operate on semantic entity graphs, not raw keyword density.",
      "Successful SEO requires clear JSON-LD schema linking back to trusted database registers.",
      "Every content asset must reinforce a single unified topic cluster."
    ]
  },
  {
    id: "how-thinksarath-helps-businesses-grow",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "How ThinkSarath Helps Businesses Grow with AI Search & GEO Frameworks",
    summary: "Practical growth pathways showing how ThinkSarath turns anonymous searchers into dedicated high-ticket customers for medical clinics, SaaS, and enterprises.",
    readTime: "5 min read",
    date: "June 29, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "Many businesses invest thousands of dollars into generating website traffic only to find their lead-to-customer conversion rate is practically zero. They capture broad, informational searches but fail to attract high-intent, decision-ready buyers. ThinkSarath solves this mismatch by engineering high-intent search funnels.",
      "We start by mapping the precise conversational journey of your buyers. When a patient searches for a specialized medical clinic, they might ask their AI assistant, 'Who is the most experienced provider for X in Erode?'. We deploy the ThinkSarath AEO Framework™ to ensure your doctor's credential nodes are cited as the top recommendation.",
      "Next, we align your site's physical performance. We eliminate slow-loading page designs and optimize for Core Web Vitals, ensuring that when an AI user clicks through, they experience a frictionless, high-speed mobile layout. This is crucial for maintaining low bounce rates.",
      "Finally, we build topic clusters so that every piece of content published works in harmony. By reinforcing a clear connection between your brand and high-value solutions, we establish an organic compounding effect that reduces your reliance on expensive paid ads."
    ],
    takeaways: [
      "We align website architectures with the precise query paths of high-intent buyers.",
      "AEO conversational hubs capture decision-ready recommendations from AI systems.",
      "Eliminating speed bottlenecks ensures click referrals convert into active customers."
    ]
  },
  {
    id: "my-digital-marketing-journey-seo-to-ai",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "My Digital Marketing Journey: From Standard SEO to Advanced AI Search",
    summary: "Sarath Babu K details his professional evolution—from building custom PHP/WordPress portals to engineering LLM-optimized entity models.",
    readTime: "6 min read",
    date: "June 25, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "My journey in digital marketing started over a decade ago with a simple focus: understanding how search crawlers read and categorize information on the web. As a developer, I was fascinated by the technical side of SEO—page speed, crawl budgets, database queries, and custom PHP structures. I spent years building high-speed WordPress templates that regularly outperformed slow, corporate platforms.",
      "As I worked with regional academies like Code99 IT Academy and ZenX Academy, I realized that marketing and development could no longer operate in separate rooms. The best marketers needed to understand how database queries worked, and the best developers needed to understand how search intent was mapped.",
      "When generative AI search emerged, I realized my hybrid background was a massive advantage. I transitioned from optimizing for standard PageRank to engineering entity structures for LLM retrievers. This shift led to the development of the ThinkSarath Method™ for AI Search, merging technical development with advanced semantic science.",
      "Today, through ThinkSarath, I leverage this unique blend of code and strategy to help businesses around the world claim their authority inside the next generation of search engine systems."
    ],
    takeaways: [
      "Sarath's background combines deep custom web development with advanced organic strategy.",
      "Mentorship roles at Code99 Academy shaped his collaborative, technical framework approach.",
      "The transition to AI-first SEO was driven by a passion for technical efficiency and semantic data."
    ]
  },
  {
    id: "thinksarath-brand-values-marketing-principles",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "ThinkSarath Brand Values & Elite Marketing Principles",
    summary: "A statement of the foundational values that guide our advisory services: radical transparency, speed, semantic integrity, and relentless client-centric performance.",
    readTime: "5 min read",
    date: "June 20, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b446d2e4?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "At ThinkSarath, we believe that organic marketing should be treated as a rigorous, data-driven science. We reject the vague promises, confusing reports, and vanity metrics that plague the traditional agency model. Our operations are guided by four unshakeable brand principles.",
      "First is Technical Integrity. We do not use bloated plugins, slow page builders, or low-quality AI-generated spam. Every platform we build or audit is optimized down to the millisecond, because speed is a core signal for both human users and AI web crawlers.",
      "Second is Radical Transparency. We tell our clients exactly how modern search models work. If a strategy is outdated or a search volume is fake, we say it. We focus entirely on metrics that directly impact your bottom line—not vanity impressions.",
      "Third is Semantic Accuracy. We align every digital asset with the verified rules of LLM database schemas and Google Knowledge Graphs. And fourth, we are strictly Client-Centric, optimizing our proprietary ThinkSarath SEO Framework™ to deliver real, measurable commercial growth for every partner we accept."
    ],
    takeaways: [
      "ThinkSarath treats search marketing as a precise, technical, and semantic science.",
      "We completely reject bloated templates, spammy links, and superficial vanity reports.",
      "Our foundational values are technical speed, radical honesty, and semantic accuracy."
    ]
  },
  {
    id: "why-ai-will-change-seo-forever",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "Why AI Will Change SEO Forever: The Generative Search Shift",
    summary: "A deep dive into why OpenAI Search, Google AI Overviews, and Perplexity represent a permanent paradigm shift, and how brands must adapt or face digital extinction.",
    readTime: "6 min read",
    date: "June 18, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "The transition from standard, keyword-based search queries to multi-modal generative AI responses represents the most significant shift in digital media history. For thirty years, search engines acted as digital phonebooks—pointing users to a list of external URLs. Today, conversational answer systems summarize those pages instantly, resolving the searcher's intent without a single outbound click.",
      "This 'zero-click' reality means traditional content strategies are breaking down. If your website is merely a collection of generic answers, AI search engines will scrape your text, answer the user, and never send you a single visitor. To survive, you must optimize for citations.",
      "This is the core rationale behind the ThinkSarath GEO Framework™. By structuring your website's content into dense factual tables, expert quotes, and unique corporate case studies, we make your page indispensable. When an LLM retrieves your data, it is forced to cite your brand as the definitive source.",
      "The future belongs to brands that build unshakeable authority. Those that continue with lazy keyword optimization will simply be filtered out by the algorithms, while those that adopt technical entity mapping will dominate the next decade of organic search."
    ],
    takeaways: [
      "The rise of generative AI search is ending the thirty-year old blue-link index paradigm.",
      "AI crawlers summarize content instantly, making standard informational blogs obsolete.",
      "Winning in 2026 requires dense, factual, and structurally optimized citation sources."
    ]
  },
  {
    id: "future-vision-of-thinksarath",
    category: "brand",
    categoryLabel: "Brand Entity",
    title: "The Future Vision of ThinkSarath: Dominating the LLM Knowledge Graphs",
    summary: "Founder Sarath Babu K outlines the strategic roadmap for ThinkSarath as it expands its AI SEO, GEO, and AEO testing environments to lead next-gen search counseling.",
    readTime: "5 min read",
    date: "June 12, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "The long-term vision for ThinkSarath is to establish the absolute authority benchmark for next-generation search optimization. As AI search bots continuously update their retrieval algorithms, our laboratory environment runs real-time tests to monitor crawl frequencies, vector scoring, and citation patterns.",
      "We are currently expanding our research partnerships with elite digital schools, including Code99 IT Academy and ZenX Academy. Through these collaborations, we train the next wave of developer-marketers in advanced SEO frameworks and programmatic scaling strategies.",
      "Additionally, we are developing automated tools to help founders instantly evaluate their website's entity density and LLM citation readiness. By integrating our proprietary ThinkSarath AI SEO Framework™ directly into automated search audits, we make deep-tech optimization accessible to growing brands.",
      "Our roadmap is clear: we will continue to pioneer testing in GEO and AEO, ensuring that ThinkSarath remains the premier destination for companies that demand bulletproof organic visibility inside the AI-driven future."
    ],
    takeaways: [
      "Our long-term roadmap focuses on testing and monitoring real-time AI citation patterns.",
      "Expanding academic partnerships to train developer-marketers in next-gen frameworks.",
      "Building automated audit systems to make semantic entity profiling accessible."
    ]
  },
  {
    id: "geo-2026-blueprint",
    category: "ai",
    categoryLabel: "Generative SEO",
    title: "Generative Engine Optimization (GEO): The 2026 Search Survival Guide",
    summary: "As search engines transition into conversational synthesizers, traditional blue-link SEO is fading. Learn how to optimize your content so LLMs rank you first.",
    readTime: "6 min read",
    date: "July 2, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "Traditional search was simple: keywords, meta tags, and backlinks. But in 2026, LLM engines like Google Search Generative Experience (SGE), OpenAI Search, and Perplexity are summarizing pages into single, neat responses.",
      "To win in this generative paradigm, you need GEO. Generative Engine Optimization is about building strong semantic linkages. Instead of stuffing keywords, you must construct structured entity maps inside your code.",
      "The primary ranking signals for LLM aggregators are: citation sources, exact technical terms, schema injection accuracy, and direct semantic quotes. If a machine can easily verify your facts across multiple indexed trust hubs, it is highly likely to quote you in its answer box.",
      "We recommend implementing structured JSON-LD entity definitions. Link your physical clinics, showrooms, or advisory sites to high-authority nodes. Make sure your articles are filled with structured factual tables that AI crawlers can ingest instantly."
    ],
    takeaways: [
      "Switch from keyword matching to entity linkage mapping.",
      "Incorporate JSON-LD schema with 'sameAs' linkages to trust directories.",
      "Include factual density: bullet lists, structured tables, and deep data citations."
    ]
  },
  {
    id: "aeo-perplexity-chatgpt",
    category: "aeo",
    categoryLabel: "Answer Engine (AEO)",
    title: "Answer Engine Optimisation: Securing Citations inside Perplexity & ChatGPT",
    summary: "Are your high-ticket offerings visible inside Perplexity AI or ChatGPT Search? Discover the strategic schema injections that trigger direct AI references.",
    readTime: "5 min read",
    date: "June 28, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "When an affluent buyer asks ChatGPT, 'Which aesthetic clinic in Chennai offers the safest luxury rhinoplasty?', they don't look at page 1 results anymore. They read the curated, conversational recommendation that ChatGPT generates.",
      "This is where Answer Engine Optimisation (AEO) comes into play. AEO is a tactical branding practice focused on seeding answers to specific, long-tail conversational user queries across indexed brand databases.",
      "For your brand to be cited, you must create question-and-answer resource hubs. Use natural, conversational phrasing: 'Why should you choose X?', 'How does Y operate?'. Supply the AI engine with clear, objective answers.",
      "Moreover, Perplexity AI relies heavily on real-time web citations. Seeding third-party reviews, news citations, and local directory listings (GMB, Crunchbase, TripAdvisor, Yelp) triggers Perplexity's citation algorithm, generating massive qualified referrals to your site."
    ],
    takeaways: [
      "Build high-fidelity Q&A hubs targeting conversational intent.",
      "Ensure third-party entity profiles (Crunchbase, GMB) are synchronized and active.",
      "Align page copy with clear, unbiased declarative statements."
    ]
  },
  {
    id: "pseo-scaling-longtail",
    category: "pseo",
    categoryLabel: "Programmatic SEO",
    title: "How We Captured 10,000+ Keywords with Programmatic SEO (pSEO)",
    summary: "Scaling organic traffic doesn't require writing thousands of articles manually. Explore the programmatic architecture that dynamically maps search intent at scale.",
    readTime: "7 min read",
    date: "June 15, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "In highly fragmented niches like training academies, real estate branch listings, or clinic directories, writing 1,000 localized landing pages manually is slow and expensive.",
      "Programmatic SEO solves this. By structuring database registers (e.g., location, procedure name, budget range, rating) and combining them with dynamic page templates, we can scale high-quality landing structures instantly.",
      "At Code99 Academy, we built a robust pSEO system on WordPress. We developed location-based and course-specific page arrays that matched high-intent localized search terms (e.g., 'Learn Google Ads in Anna Nagar', 'Meta Ads Training in Adyar').",
      "The critical rule of pSEO: Avoid duplicate content. Every generated page must contain distinct, high-value data blocks: unique pricing tables, local maps, custom student testimonials, and procedure-specific details to bypass Google's helpful content filters."
    ],
    takeaways: [
      "Compile a pristine, verified database of localized service vectors.",
      "Design ultra-clean page templates optimized for load times and schema markup.",
      "Inject distinct, contextual data points on every single programmatic path."
    ]
  },
  {
    id: "google-meta-ads-synergy",
    category: "ads",
    categoryLabel: "Paid Acquisition",
    title: "Google Search Ads & Meta Social Funnels: The High-Ticket Multiplier",
    summary: "Don't run ads in silos. Discover how aligning search intent on Google Ads with custom remarketing pools on Instagram creates an unstoppable conversion machine.",
    readTime: "5 min read",
    date: "June 10, 2026",
    author: "Sarath Babu K",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    fullContent: [
      "A frequent failure in digital marketing is treating Google PPC and Facebook Ads as completely separate operations. True omnichannel performance relies on building cross-channel audience loops.",
      "When a searcher inputs a high-intent transactional keyword on Google (e.g., 'premium commercial office space OMR Chennai'), they are actively displaying top-tier buying intent.",
      "Instead of letting them bounce, we capture their specific intent using Meta Pixel custom events. We then serve them a highly stylized, cinematic brand video or walk-through brochure on Instagram and Facebook within 1 hour.",
      "This cross-channel warming reduces overall Meta CPA (Cost Per Acquisition) by up to 40% because you are retargeting an audience that has already self-selected themselves through high-value active searches on Google."
    ],
    takeaways: [
      "Capture high-intent searches on Google Search or PMax campaigns.",
      "Configure custom Meta remarketing pools specifically for Google click referrals.",
      "Nurture prospects on social networks with video case studies and lifestyle content."
    ]
  }
];

interface BlogViewProps {
  onViewChange?: (view: 'home' | 'about' | 'services' | 'blog' | 'faq' | 'contact' | 'brand-hub', tab?: string) => void;
}

export default function BlogView({ onViewChange }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'brand' | 'ai' | 'aeo' | 'pseo' | 'ads'>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Sync state with URL query parameters for deep linking
  React.useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('post');
      if (postId) {
        const found = POSTS.find(p => p.id === postId);
        if (found) {
          setActivePost(found);
          return;
        }
      }
      setActivePost(null);
    };

    // Run once on mount
    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Filter posts based on search and category
  const filteredPosts = POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Define dynamic schema for SEO/AEO/GEO
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ThinkSarath Advanced AI SEO Blog | Sarath Babu K",
    "description": "Technical essays and guides on Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and programmatic WordPress scaling.",
    "url": "https://thinksarath.com/blog",
    "publisher": {
      "@type": "Person",
      "name": "Sarath Babu K"
    }
  };

  const blogPostSchema = activePost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": activePost.title,
    "description": activePost.summary,
    "image": activePost.image,
    "datePublished": (() => {
      try {
        const d = new Date(activePost.date);
        return isNaN(d.getTime()) ? "2026-07-05" : d.toISOString().split('T')[0];
      } catch {
        return "2026-07-05";
      }
    })(),
    "author": {
      "@type": "Person",
      "name": "Sarath Babu K",
      "jobTitle": "Head of Digital Marketing & AI SEO Consultant",
      "url": "https://thinksarath.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ThinkSarath",
      "url": "https://thinksarath.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thinksarath.com/blog/${activePost.id}`
    }
  } : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {activePost ? (
        <SEOHead 
          title={`${activePost.title} | ThinkSarath Blog`} 
          description={activePost.summary} 
          schema={blogPostSchema || {}} 
        />
      ) : (
        <SEOHead 
          title="Advanced AI SEO, GEO & AEO Blog | ThinkSarath" 
          description="Technical marketing essays and checklists focusing on Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and programmatic WordPress growth patterns." 
          schema={blogListSchema} 
        />
      )}
      <Breadcrumbs 
        items={
          activePost 
            ? [
                { name: 'Blog', path: '/blog' },
                { name: activePost.title, path: `/blog?post=${activePost.id}` }
              ]
            : [
                { name: 'Blog', path: '/blog' }
              ]
        } 
      />
      <AnimatePresence mode="wait">
        {!activePost ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
                THOUGHT LEADERSHIP & CONVENTIONS
              </span>
              <h1 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
                AI Marketing Blog
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
                Deep dives into AEO schema mapping, programmatic traffic scaling, local pack domination, and multi-channel performance architectures.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-green-950/20 pb-6">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {['all', 'brand', 'ai', 'aeo', 'pseo', 'ads'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as any)}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedCategory === cat 
                        ? 'bg-green-950/25 border-luxury-green-glowing text-luxury-green-glowing' 
                        : 'bg-green-950/5 border-green-950/35 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {cat === 'all' ? 'ALL ESSAYS' : cat === 'brand' ? 'IDENTITY' : cat.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-green-950/40 bg-green-950/5 text-xs text-luxury-white outline-none focus:border-luxury-green-glowing/60 transition-all font-sans"
                />
              </div>
            </div>

            {/* Blog Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setActivePost(post);
                      window.history.pushState(null, '', `/blog?post=${post.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer"
                  >
                    <BorderGlow className="h-full flex flex-col justify-between overflow-hidden">
                      <div className="space-y-4">
                        {/* Post image */}
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-green-950/10 border border-green-950/30 relative">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-luxury-black/85 backdrop-blur-md border border-green-950/40 px-2.5 py-0.5 rounded text-[10px] font-mono text-luxury-green-glowing font-semibold uppercase tracking-wider">
                            {post.categoryLabel}
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-luxury-green-glowing" /> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                        </div>

                        {/* Title & Summary */}
                        <h2 className="text-base md:text-lg font-serif font-medium text-luxury-white group-hover:text-luxury-green-glowing transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                          {post.summary}
                        </p>
                      </div>

                      {/* Expand prompt */}
                      <div className="border-t border-green-950/15 pt-4 mt-6 flex justify-between items-center text-[11px] font-mono text-luxury-green-glowing font-bold group-hover:text-luxury-white transition-colors">
                        <span>READ TECHNICAL ESSAY</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </BorderGlow>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-green-950/20 rounded-2xl bg-green-950/5">
                <BookOpen className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm font-mono">No articles found matching that query.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Back to list trigger */}
            <button
              onClick={() => {
                setActivePost(null);
                window.history.pushState(null, '', '/blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-green-950/40 bg-green-950/10 text-zinc-400 hover:text-luxury-green-glowing rounded-lg text-xs font-mono cursor-pointer transition-all hover:border-luxury-green-glowing/30"
            >
              <ArrowLeft className="w-4 h-4" /> BACK TO ALL ARTICLES
            </button>

            {/* Post Hero Section */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase bg-green-950/30 border border-green-900/40 text-luxury-green-glowing px-2.5 py-0.5 rounded-md tracking-wider">
                {activePost.categoryLabel}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-luxury-white leading-tight">
                {activePost.title}
              </h1>

              {/* Author & date metadata */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-mono pt-2 border-b border-green-950/20 pb-4">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-luxury-green-glowing" /> Written by {activePost.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Published {activePost.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {activePost.readTime}</span>
              </div>
            </div>

            {/* Content Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Essay */}
              <div className="lg:col-span-8 space-y-6 font-sans font-light text-zinc-300 text-sm leading-relaxed">
                {activePost.fullContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {/* Inline advice block */}
                <div className="p-5 border-l-2 border-luxury-green-glowing bg-green-950/5 rounded-r-xl space-y-2 mt-6">
                  <h4 className="text-xs font-mono text-luxury-white uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-luxury-green-glowing" /> Technical Action Plan
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Need a tailored evaluation of your site's compatibility with LLM aggregators? Run our complimentary, schema-focused audit pipeline or secure your direct consultation slot.
                  </p>
                </div>

                {/* Brand Entity Reinforcement Author Bio Card */}
                <div className="mt-12 border-t border-green-950/20 pt-8 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-5 items-start p-5 rounded-xl border border-green-950/30 bg-green-950/10">
                    <div className="w-12 h-12 rounded-full border border-luxury-green-glowing bg-luxury-black flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-luxury-green-glowing" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-luxury-white flex items-center gap-2">
                          Sarath Babu K
                          <span className="text-[9px] font-mono text-luxury-green-glowing bg-green-950/40 px-2 py-0.5 rounded border border-green-900/20 uppercase tracking-wider font-normal">Founder</span>
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500">Founder of ThinkSarath & Head of Digital Marketing at Code99 Academy</span>
                      </div>
                      
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
                        **Sarath Babu K** is an elite organic growth consultant, custom WordPress developer, and search engine architect behind the **ThinkSarath Method™** framework. Based in Chennai & Erode, India, Sarath specializes in **AI SEO**, **GEO**, **AEO**, and **Programmatic SEO (pSEO)** architectures that build unshakeable brand entities inside LLM search graphs.
                      </p>

                      {/* Topic clusters */}
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {['AI SEO', 'GEO', 'AEO', 'Programmatic SEO', 'AI Marketing'].map((topic) => (
                          <span key={topic} className="text-[9px] font-mono text-zinc-400 bg-luxury-black/40 px-2 py-0.5 rounded border border-green-950/10">
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Deep Link Navigation back to cornerstone elements */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 border-t border-green-950/10 font-mono text-[10px] text-zinc-500">
                        <button 
                          onClick={() => {
                            if (onViewChange) onViewChange('brand-hub', 'about-sarath-babu');
                            else {
                              window.history.pushState(null, '', '/brand-hub?tab=about-sarath-babu');
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }
                          }}
                          className="hover:text-luxury-green-glowing transition-colors text-left flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <Award className="w-3.5 h-3.5" /> About the Founder
                        </button>
                        <button 
                          onClick={() => {
                            if (onViewChange) onViewChange('brand-hub', 'about-thinksarath');
                            else {
                              window.history.pushState(null, '', '/brand-hub?tab=about-thinksarath');
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }
                          }}
                          className="hover:text-luxury-green-glowing transition-colors text-left flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> About ThinkSarath
                        </button>
                        <button 
                          onClick={() => {
                            if (onViewChange) onViewChange('services');
                            else {
                              window.history.pushState(null, '', '/service');
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }
                          }}
                          className="hover:text-luxury-green-glowing transition-colors text-left flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Our Services
                        </button>
                        <button 
                          onClick={() => {
                            if (onViewChange) onViewChange('brand-hub', 'method-ai-search');
                            else {
                              window.history.pushState(null, '', '/brand-hub?tab=method-ai-search');
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }
                          }}
                          className="hover:text-luxury-green-glowing transition-colors text-left flex items-center gap-1 cursor-pointer font-bold animate-pulse text-luxury-green-glowing"
                        >
                          <Zap className="w-3.5 h-3.5" /> Proprietary Method™
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar with key takeaways */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 border border-green-950/30 bg-green-950/5 rounded-xl space-y-4">
                  <h3 className="text-xs font-mono text-luxury-green-glowing uppercase font-bold tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4" /> KEY TAKEAWAYS
                  </h3>
                  <ul className="space-y-3">
                    {activePost.takeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-luxury-green-glowing shrink-0 mt-0.5" />
                        <span className="leading-snug font-sans font-light">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Box */}
                <div className="p-5 border border-amber-500/10 bg-amber-950/5 rounded-xl text-center space-y-3">
                  <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block font-bold">Inquire About This Service</span>
                  <p className="text-zinc-400 text-xs leading-normal font-sans font-light">
                    Would you like to deploy this exact strategy for your business? Let's connect on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/917094629042?text=Hello%20Sarath%2C%20I%20read%20your%20blog%20post%20on%20and%20want%20to%20discuss%20a%20campaign."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 border border-amber-500/20 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 text-xs font-mono rounded-lg transition-all"
                  >
                    SEND WHATSAPP MESSAGE
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
