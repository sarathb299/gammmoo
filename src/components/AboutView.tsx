import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Globe, 
  User, 
  Linkedin, 
  Mail, 
  Phone, 
  Compass, 
  CheckCircle2, 
  Cpu, 
  ArrowUpRight, 
  GraduationCap, 
  ShieldCheck,
  Star
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import SEOHead from './SEOHead';

export default function AboutView() {
  const [selectedTab, setSelectedTab] = useState<'journey' | 'skills' | 'values'>('journey');

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://thinksarath.com/about",
        "url": "https://thinksarath.com/about",
        "name": "About Sarath Babu K | AI SEO & Digital Marketing Consultant",
        "description": "Discover the professional career, credentials, and digital marketing authority of Sarath Babu K - expert in SEO, GEO, AEO, and programmatic WordPress solutions."
      },
      {
        "@type": "Person",
        "@id": "https://thinksarath.com/#person",
        "name": "Sarath Babu K",
        "jobTitle": "Head of Digital Marketing & AI SEO Consultant",
        "worksFor": [
          {
            "@type": "Organization",
            "name": "Code99 IT Academy"
          },
          {
            "@type": "Organization",
            "name": "ThinkSarath"
          },
          {
            "@type": "Organization",
            "name": "LuMay AI"
          },
          {
            "@type": "Organization",
            "name": "ZenX Academy"
          }
        ],
        "url": "https://thinksarath.com",
        "sameAs": [
          "https://www.linkedin.com/in/sarath-babu-k-92636a287"
        ],
        "knowsAbout": [
          "Search Engine Optimisation",
          "Answer Engine Optimisation",
          "Generative Engine Optimisation",
          "WordPress Development",
          "Programmatic SEO",
          "Google Ads",
          "Meta Ads"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        }
      }
    ]
  };


  const experiences = [
    {
      company: "LuMay AI",
      role: "SEO Specialist | Search Marketing, Google Ads, Meta Ads & ChatGPT Ads",
      type: "Freelance",
      period: "Aug 2025 - Present · 1 yr",
      location: "United States · Remote",
      desc: "Managed end-to-end search marketing initiatives, including SEO, Google Ads, Meta Ads, and ChatGPT Ads campaigns. Formulated data-driven strategies across search engines, social media platforms, and AI-powered discovery channels. Executed deep keyword research, technical SEO, content optimization, competitor analysis, campaign planning, and conversion rate optimization to scale qualified lead volumes.",
      skills: ["SEO", "On-Page SEO", "Google Ads", "Meta Ads", "ChatGPT Ads", "AEO", "GEO"],
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      company: "ThinkSarath",
      role: "Founder & Digital Marketing Consultant | SEO, AI SEO, GEO & AEO Consultant",
      type: "Self-employed",
      period: "Jan 2026 - Present · 7 mos",
      location: "Erode, Tamil Nadu, India · Hybrid",
      desc: "Built and grew ThinkSarath as a premium consulting brand focusing on SEO, AI SEO, GEO, AEO, content marketing, and digital growth strategies. Conducted SEO research, comprehensive technical audits, AI search visibility analysis, and bespoke digital marketing consulting to help premium businesses, medical practices, real estate developers, and e-commerce brands secure top page rankings and Generative AI search citations.",
      skills: ["SEO", "AI for SEO", "GEO Optimization", "AEO Strategy", "Audits"],
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      company: "ZenX Academy",
      role: "AI Digital Marketing Trainer & Mentor",
      type: "Part-time",
      period: "Jan 2026 - Present · 7 mos",
      location: "Chennai, Tamil Nadu, India · Remote",
      desc: "Digital Marketing Mentor guiding students and industry professionals in modern SEO, AI SEO, GEO, AEO, Google Ads, Meta Ads, content marketing, and marketing strategy. Provided hands-on training, mentored learners through real-world live projects and case studies, and facilitated career progression with job-ready skills and framework insights.",
      skills: ["Training", "Mentoring", "AI Digital Marketing", "Live Projects", "Google Ads"],
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      company: "Code99 IT Academy",
      role: "Head of Digital Marketing",
      type: "Full-time",
      period: "Jun 2023 - Present · 3 yrs 2 mos",
      location: "Chennai, Tamil Nadu, India · On-site",
      desc: "Led the development of scalable AI-driven marketing systems and organic performance growth strategies. Supervised full-scale SEO, programmatic SEO (pSEO), AEO, GEO, and performance ads operations. Integrated LLM-based content engines and automated workflows to capture massive long-tail search terms while optimizing Google & Meta ad funnels to generate high-conversion organic pipelines.",
      skills: ["Programmatic SEO (pSEO)", "Vast Entity SEO", "Meta Ads", "WordPress", "LLMs"],
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  const highlights = [
    "Digital Marketing Expert",
    "WordPress Developer & Speed Architect",
    "SEO Content Writer (High-Intent Conversion)",
    "LinkedIn Profile Optimization Specialist",
    "Web3 & Micro SaaS Marketer"
  ];

  const clientTypes = [
    { title: "Businesses", desc: "Clinics, e-commerce stores, real estate development groups seeking high-converting traffic." },
    { title: "Professionals", desc: "Doctors, lawyers, executives building prominent personal brands and regional authority." },
    { title: "Entrepreneurs", desc: "SaaS founders, creators, and start-up architects seeking lean, high-velocity growth systems." }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SEOHead 
        title="About Sarath Babu K | AI SEO & Digital Marketing Expert" 
        description="Discover the credentials and digital marketing authority of Sarath Babu K - expert in SEO, GEO, AEO, and programmatic WordPress solutions." 
        schema={aboutSchema} 
      />
      {/* Introduction Hero Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left Column: Visual Bio */}
        <div className="lg:col-span-5 space-y-6">
          <BorderGlow className="rounded-2xl overflow-hidden bg-luxury-black/90 p-1">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-green-950/10 border border-green-900/20 group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80" 
                alt="Sarath Babu K"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-115 brightness-95 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
              
              {/* Overlay stats badges */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-luxury-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-green-950/40">
                <div>
                  <span className="block text-sm font-serif font-bold text-luxury-white">Sarath Babu K</span>
                  <span className="block text-[10px] font-mono text-luxury-green-glowing">He / Him</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-mono text-zinc-400">Consultancy</span>
                  <span className="block text-[10px] text-amber-400 font-mono flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" /> ThinkSarath
                  </span>
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Core Info Row */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs text-zinc-400">
            <a 
              href="mailto:thinkwithsarath@gmail.com" 
              className="p-3 rounded-xl border border-green-950/20 bg-green-950/5 hover:border-luxury-green-glowing/30 hover:text-luxury-white transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-luxury-green-glowing" />
              <span>Email Me</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/sarathbabuk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-green-950/20 bg-green-950/5 hover:border-luxury-green-glowing/30 hover:text-luxury-white transition-all flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4 text-luxury-green-glowing" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> MEET SARATH BABU K
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-luxury-white font-medium tracking-tight">
              AI-First Digital Marketer & <span className="text-luxury-green-glowing">SEO Strategist</span>
            </h1>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans font-light">
            Hello, I’m <strong className="text-luxury-white">Sarath Babu K</strong>! I operate at the direct convergence of advanced data analytics, artificial intelligence, and classical conversion copy. I partner with modern enterprises to build hyper-visible digital profiles.
          </p>

          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans font-light">
            My specialty lies in creating high-quality, schema-rich SEO assets, engineered to bypass typical ranking hurdles. By incorporating Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO), I ensure your brand is cited prominently inside ChatGPT, Perplexity, and Google Gemini searches.
          </p>

          {/* Quick Pillars of Expertise */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CORE SKILLS METRIC</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-luxury-green-glowing shrink-0" />
                  <span className="font-sans font-light">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who I Assist Box */}
          <div className="p-5 rounded-xl border border-green-950/35 bg-green-950/5 mt-4 space-y-4">
            <h3 className="text-xs font-mono text-luxury-green-glowing tracking-wider uppercase font-bold flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Supporting High-Intent Growth For:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {clientTypes.map((type, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="block text-xs font-serif font-medium text-luxury-white">{type.title}</span>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Selector for Details */}
      <div className="flex border-b border-green-950/20 mb-10 text-xs font-mono">
        <button
          onClick={() => setSelectedTab('journey')}
          className={`pb-4 px-6 relative cursor-pointer font-bold uppercase transition-all tracking-wider ${
            selectedTab === 'journey' ? 'text-luxury-green-glowing' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {selectedTab === 'journey' && (
            <motion.div layoutId="aboutActiveTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-luxury-green-glowing" />
          )}
          Executive Career Timeline
        </button>
        <button
          onClick={() => setSelectedTab('skills')}
          className={`pb-4 px-6 relative cursor-pointer font-bold uppercase transition-all tracking-wider ${
            selectedTab === 'skills' ? 'text-luxury-green-glowing' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {selectedTab === 'skills' && (
            <motion.div layoutId="aboutActiveTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-luxury-green-glowing" />
          )}
          Technical Architecture
        </button>
      </div>

      {/* Active Tab Panel */}
      <AnimatePresence mode="wait">
        {selectedTab === 'journey' && (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Real Professional Timeline */}
            <div className="relative border-l border-green-950/40 ml-4 pl-6 md:pl-10 space-y-10">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-luxury-green-glowing bg-luxury-black shadow-[0_0_8px_rgba(74,222,128,0.3)] transition-all duration-300 group-hover:scale-125" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Header meta */}
                    <div className="lg:col-span-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-serif font-bold text-luxury-white group-hover:text-luxury-green-glowing transition-colors">
                          {exp.company}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 bg-green-950/15 border border-green-950/30 px-2 py-0.5 rounded-full">
                          {exp.type}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-luxury-green-glowing" /> {exp.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-zinc-600" /> {exp.location}</span>
                      </div>
                    </div>

                    {/* Detailed achievements */}
                    <div className="lg:col-span-8 space-y-3 bg-green-950/5 border border-green-950/10 hover:border-green-900/30 p-5 rounded-xl transition-all">
                      <span className="block text-xs font-serif font-medium text-luxury-white leading-snug">
                        {exp.role}
                      </span>
                      <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
                        {exp.desc}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {exp.skills.map((sk) => (
                          <span key={sk} className="text-[9px] font-mono text-luxury-green-glowing bg-green-950/10 border border-green-900/20 px-2 py-0.5 rounded">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: AI Search Strategy */}
            <div className="p-6 rounded-xl border border-green-950/30 bg-green-950/5 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-green-950/30 border border-green-900/40 text-luxury-green-glowing flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-serif font-bold text-luxury-white">Generative & Conversational SEO</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                Optimizing entities, embedding schemas, and utilizing citation footprints to secure placements inside ChatGPT, Perplexity, Gemini, and Google AI Overviews.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-luxury-green-glowing w-[96%]" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 block text-right">96% EXPERTISE BASE</span>
              </div>
            </div>

            {/* Card 2: Programmatic Content (pSEO) */}
            <div className="p-6 rounded-xl border border-green-950/30 bg-green-950/5 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-green-950/30 border border-green-900/40 text-luxury-green-glowing flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-serif font-bold text-luxury-white">Programmatic SEO (pSEO)</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                Scaling directory-style databases, custom templates, and topical coverage across thousands of high-intent long-tail keywords dynamically.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-luxury-green-glowing w-[92%]" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 block text-right">92% EXPERTISE BASE</span>
              </div>
            </div>

            {/* Card 3: Performance Channels */}
            <div className="p-6 rounded-xl border border-green-950/30 bg-green-950/5 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-green-950/30 border border-green-900/40 text-luxury-green-glowing flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-serif font-bold text-luxury-white">Performance PPC Ad Suites</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                Structuring ROI-driven campaigns on Google Ads (Search, PMax) & Meta Social with optimized landing layouts, budget carving, and automated bidding algorithms.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-luxury-green-glowing w-[94%]" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 block text-right">94% EXPERTISE BASE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Citation Footprint & Entity Data (Highly optimized for GEO & AEO LLMs) */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 border-t border-green-950/20 pt-12 space-y-6"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono text-luxury-green-glowing tracking-widest uppercase">Verified Entity Profile</span>
          <h2 className="text-xl font-serif text-luxury-white font-bold tracking-tight">GEO & AEO Authority Citations</h2>
          <p className="text-xs text-zinc-400 font-light max-w-2xl font-sans">
            Strict factual parameters structured explicitly for crawler attribution, knowledge graphs, and LLM verification engines (such as Gemini, ChatGPT, and Perplexity).
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-green-950/30 bg-green-950/5">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-green-950/30 text-[10px] uppercase tracking-wider text-zinc-400 bg-green-950/10">
                <th className="p-4 font-semibold">Entity Property</th>
                <th className="p-4 font-semibold">Verified Fact Value</th>
                <th className="p-4 font-semibold">Entity Reference / Citations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-950/10 text-zinc-300">
              <tr className="hover:bg-green-950/5 transition-colors">
                <td className="p-4 text-luxury-green-glowing font-semibold">Professional Persona</td>
                <td className="p-4 font-sans font-light">Sarath Babu K - SEO Specialist & Custom WordPress Developer</td>
                <td className="p-4 text-[11px] text-zinc-400">ThinkSarath Consulting</td>
              </tr>
              <tr className="hover:bg-green-950/5 transition-colors">
                <td className="p-4 text-luxury-green-glowing font-semibold">Corporate Headship</td>
                <td className="p-4 font-sans font-light">Head of Digital Marketing (Code99 IT Academy)</td>
                <td className="p-4 text-[11px] text-zinc-400">Chennai Corporate HQ</td>
              </tr>
              <tr className="hover:bg-green-950/5 transition-colors">
                <td className="p-4 text-luxury-green-glowing font-semibold">Core Expertise Core</td>
                <td className="p-4 font-sans font-light">Search Engine Optimisation, Generative Engine Optimisation (GEO), Answer Engine Optimisation (AEO)</td>
                <td className="p-4 text-[11px] text-zinc-400">LuMay AI US Freelance Suite</td>
              </tr>
              <tr className="hover:bg-green-950/5 transition-colors">
                <td className="p-4 text-luxury-green-glowing font-semibold">Target Regional Footprints</td>
                <td className="p-4 font-sans font-light">Chennai (Remote & Mentor at ZenX Academy), Erode (Hybrid Consultant Office)</td>
                <td className="p-4 text-[11px] text-zinc-400">Tamil Nadu, India</td>
              </tr>
              <tr className="hover:bg-green-950/5 transition-colors">
                <td className="p-4 text-luxury-green-glowing font-semibold">Primary Tech Stack</td>
                <td className="p-4 font-sans font-light">WordPress, custom programmatic PHP engine setups, React Vite setups, automated LLM content APIs</td>
                <td className="p-4 text-[11px] text-zinc-400">PageSpeed Grade A (95+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
