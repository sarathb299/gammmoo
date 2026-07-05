/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  ChevronRight, 
  Cpu, 
  MapPin, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Phone, 
  Mail, 
  Globe, 
  Check, 
  Lock, 
  Layers, 
  CheckCircle2,
  ExternalLink,
  Calendar,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Galaxy from './components/Galaxy';
import PerformanceMonitor from './components/PerformanceMonitor';
import CircularGallery from './components/CircularGallery';
import MagicBento from './components/MagicBento';
import ProfileCard from './components/ProfileCard';
import AeoShowcase from './components/AeoShowcase';
import AuditTool from './components/AuditTool';
import LeadQualifier from './components/LeadQualifier';
import ElectricBorder from './components/ElectricBorder';
import BorderGlow from './components/BorderGlow';
import CustomCursor from './components/CustomCursor';
import AboutView from './components/AboutView';
import ServiceView from './components/ServiceView';
import BlogView, { BlogPost, POSTS } from './components/BlogView';
import FaqView from './components/FaqView';
import ContactView from './components/ContactView';
import SEOHead from './components/SEOHead';
import BrandHub from './components/BrandHub';
import DatabaseView from './components/DatabaseView';
import { getCentralSchema, getPageMetadata } from './utils/seo';


const SERVICES = [
  {
    id: 'aeo',
    title: 'Answer Engine Optimisation',
    badge: 'AI Visibility',
    shortDesc: 'Appear in ChatGPT, Perplexity & Google AI Overviews.',
    fullDesc: 'AEO puts your brand inside AI-generated answers where your audience searches next, driving high-intent organic visibility in the generative age.',
    details: ['LLM schema injections', 'Entity linkage authority', 'Voice search preparedness', 'Citaton footprint seeding'],
    highlight: true,
  },
  {
    id: 'geo',
    title: 'Generative Engine Optimisation',
    badge: 'Future SEO',
    shortDesc: 'Future-proof your content for AI-generated search summaries.',
    fullDesc: 'GEO structures and feeds your content directly into large language models, capturing premium references as search systems transition into synthesizers in 2026.',
    details: ['Generative index compliance', 'Direct LLM citation loops', 'Semantic relevance tuning', 'High-authority source linking'],
    highlight: true,
  },
  {
    id: 'seo',
    title: 'Search Engine Optimisation',
    badge: 'Organic Growth',
    shortDesc: 'Technical, on-page & off-page SEO that pushes your brand to the top.',
    fullDesc: 'Custom search strategies built to withstand core algorithm updates, securing top organic placements for high-value transactional search terms.',
    details: ['Deep crawl architecture', 'Semantic keyword clusters', 'High-trust editorial backlinks', 'Mobile core web vitals tuning'],
    highlight: false,
  },
  {
    id: 'gmb',
    title: 'Google My Business',
    badge: 'Local SEO',
    shortDesc: 'Dominate local search with a fully optimised GMB profile.',
    fullDesc: 'Manage maps, review generation, citations, and local rankings in Chennai to establish supreme physical prominence in your immediate vicinity.',
    details: ['Map pack ranking domination', 'Citations synchronization', 'Local reviews strategy', 'Photo metadata optimization'],
    highlight: false,
  },
  {
    id: 'google_ads',
    title: 'Google Ads',
    badge: 'PPC ROI',
    shortDesc: 'Search, Display & Performance Max campaigns built for ROAS.',
    fullDesc: 'Data-driven Google pay-per-click management focusing strictly on conversion metrics, optimized landing pages, and automated bid strategies.',
    details: ['Performance Max optimization', 'Precise match type funnels', 'Negative keyword scrubbing', 'Bespoke high-converting copy'],
    highlight: false,
  },
  {
    id: 'meta_ads',
    title: 'Meta Paid Ads',
    badge: 'Paid Social',
    shortDesc: 'Facebook & Instagram campaigns that reach your ideal buyer.',
    fullDesc: 'Hyper-targeted visual campaign systems engineered to capture, nurture, and convert high-net-worth audiences with continuous creative iterations.',
    details: ['Lookalike funnel scaling', 'Premium demographic carving', 'CBO & ABO budget optimization', 'Interactive lead ads'],
    highlight: false,
  },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://thinksarath.com/#website",
      "name": "ThinkSarath",
      "url": "https://thinksarath.com",
      "description": "Premium AI Search, GEO, AEO & traditional SEO scaling pipelines by Sarath Babu K, based in Chennai and Erode, India."
    },
    {
      "@type": "ProfessionalService",
      "name": "ThinkSarath | AI Search, AEO & SEO Consultant Chennai & Erode",
      "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80",
      "telephone": "+91-7094629042",
      "url": "https://thinksarath.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    }
  ]
};

export default function App() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'about' | 'services' | 'blog' | 'faq' | 'contact' | 'brand-hub' | 'database'>(() => {
    const path = window.location.pathname;
    if (path === '/about') return 'about';
    if (path === '/services' || path === '/service') return 'services';
    if (path === '/blog') return 'blog';
    if (path === '/faq') return 'faq';
    if (path === '/contact') return 'contact';
    if (path === '/brand-hub') return 'brand-hub';
    if (path === '/database') return 'database';
    return 'home';
  });

  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    if (postId && window.location.pathname === '/blog') {
      return POSTS.find(p => p.id === postId) || null;
    }
    return null;
  });

  // Sync state changes back to the URL path
  useEffect(() => {
    const viewToPathMap: Record<string, string> = {
      home: '/',
      about: '/about',
      services: '/service',
      blog: '/blog',
      faq: '/faq',
      contact: '/contact',
      'brand-hub': '/brand-hub',
      database: '/database',
    };
    
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    let targetPath = viewToPathMap[activeView] || '/';
    
    if (activeView === 'blog' && activeBlogPost) {
      targetPath = `/blog?post=${activeBlogPost.id}`;
    }
    
    const currentFull = currentPath + currentSearch;
    if (currentFull !== targetPath) {
      window.history.pushState({ view: activeView }, '', targetPath);
    }
  }, [activeView, activeBlogPost]);

  // Handle browser back/forward buttons and query param routing sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('post');

      if (path === '/about') setActiveView('about');
      else if (path === '/services' || path === '/service') setActiveView('services');
      else if (path === '/blog') {
        setActiveView('blog');
        if (postId) {
          setActiveBlogPost(POSTS.find(p => p.id === postId) || null);
        } else {
          setActiveBlogPost(null);
        }
      }
      else if (path === '/faq') setActiveView('faq');
      else if (path === '/contact') setActiveView('contact');
      else if (path === '/brand-hub') setActiveView('brand-hub');
      else if (path === '/database') setActiveView('database');
      else setActiveView('home');

      // Clear blog post if we left the blog page
      if (path !== '/blog') {
        setActiveBlogPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('thinksarath-theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('thinksarath-theme', nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById('services-hub');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        // Visible when the user has scrolled past the services hub
        setShowFloatingCTA(rect.bottom < 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-luxury-black text-luxury-white overflow-x-hidden font-sans selection:bg-luxury-green-glowing selection:text-luxury-black lg:cursor-none">
      
      {(() => {
        const seoData = getPageMetadata(activeView, activeBlogPost);
        const centralSchema = getCentralSchema();
        return (
          <Helmet>
            <title>{seoData.title}</title>
            <meta name="description" content={seoData.description} />
            <meta name="keywords" content={seoData.keywords} />
            <meta name="author" content="ThinkSarath" />
            <meta name="robots" content="index, follow" />

            {/* OpenGraph Tags */}
            <meta property="og:title" content={seoData.title} />
            <meta property="og:description" content={seoData.description} />
            <meta property="og:type" content={activeView === 'blog' && activeBlogPost ? 'article' : 'website'} />
            <meta property="og:url" content={activeView === 'blog' && activeBlogPost ? `https://thinksarath.com/blog?post=${activeBlogPost.id}` : `https://thinksarath.com${window.location.pathname}`} />
            <meta property="og:image" content={activeView === 'blog' && activeBlogPost ? activeBlogPost.image : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"} />
            <meta property="og:site_name" content="ThinkSarath AI Marketing" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoData.title} />
            <meta name="twitter:description" content={seoData.description} />
            <meta name="twitter:image" content={activeView === 'blog' && activeBlogPost ? activeBlogPost.image : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"} />

            {/* Centralized JSON-LD Schema (Person, Organization, ProfessionalService) */}
            <script type="application/ld+json">
              {JSON.stringify(centralSchema)}
            </script>

            {/* Dynamic Page Schema (e.g. BlogPosting or Blog List) */}
            {seoData.schema && (
              <script type="application/ld+json">
                {JSON.stringify(seoData.schema)}
              </script>
            )}
          </Helmet>
        );
      })()}

      {/* Custom premium mouse cursor effect */}
      <CustomCursor />
      
      {/* 3D background Galaxy particle system overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Galaxy />
      </div>



      {/* Global premium ambient header */}
      <header className="relative w-full z-20 border-b border-green-950/25 bg-luxury-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo & Location block */}
          <div 
            onClick={() => {
              setActiveView('home');
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="relative">
              <span className="absolute -inset-1 rounded-md bg-luxury-green-glowing blur opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-luxury-black border border-luxury-green text-luxury-white font-serif font-bold text-lg px-3 py-1 rounded-md tracking-wider">
                THINKSARATH<span className="text-luxury-green-glowing">.AI</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-green-900/20 bg-green-950/25 text-[10px] text-zinc-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-luxury-green-glowing" /> CHENNAI, TAMIL NADU
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider">
            <button 
              onClick={() => {
                setActiveView('home');
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'home' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              HOME
            </button>
            <button 
              onClick={() => {
                setActiveView('about');
                window.history.pushState(null, '', '/about');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'about' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              ABOUT
            </button>
            <button 
              onClick={() => {
                setActiveView('services');
                window.history.pushState(null, '', '/service');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'services' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              SERVICES
            </button>
            <button 
              onClick={() => {
                setActiveView('blog');
                window.history.pushState(null, '', '/blog');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'blog' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              BLOG
            </button>
            <button 
              onClick={() => {
                setActiveView('faq');
                window.history.pushState(null, '', '/faq');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'faq' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              FAQ
            </button>
            <button 
              onClick={() => {
                setActiveView('brand-hub');
                window.history.pushState(null, '', '/brand-hub');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'brand-hub' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              BRAND HUB
            </button>
            <button 
              onClick={() => {
                setActiveView('database');
                window.history.pushState(null, '', '/database');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'database' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              DATABASE
            </button>
            <button 
              onClick={() => {
                setActiveView('contact');
                window.history.pushState(null, '', '/contact');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }} 
              className={`transition-colors cursor-pointer font-semibold uppercase ${activeView === 'contact' ? 'text-luxury-green-glowing' : 'text-zinc-400 hover:text-luxury-green-glowing'}`}
            >
              CONTACT
            </button>
          </nav>

          {/* Right side operations (Theme Toggle, Desktop CTA, Mobile Menu Button) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-green-950/30 bg-green-950/10 hover:bg-green-950/20 hover:border-luxury-green-glowing/40 text-zinc-400 hover:text-luxury-green-glowing transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Action trigger CTA (Desktop only) */}
            <div className="hidden md:block">
              <a 
                href={activeView === 'home' ? '#ai-auditor-section' : '#'}
                onClick={(e) => {
                  if (activeView !== 'home') {
                    e.preventDefault();
                    setActiveView('contact');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-linear-to-r from-luxury-green to-luxury-green-mid hover:from-luxury-green-mid hover:to-luxury-green-light text-xs font-mono text-luxury-white font-semibold transition-all hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]"
              >
                RUN FREE AUDIT <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex md:hidden p-2 rounded-lg border border-green-950/30 bg-green-950/10 hover:bg-green-950/20 hover:border-luxury-green-glowing/40 text-zinc-400 hover:text-luxury-green-glowing transition-all cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Off-canvas Side Drawer (Mobile Navigation Menu) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-xs cursor-pointer"
            />
            
            {/* Off-canvas Side Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[290px] sm:w-[340px] bg-luxury-black/95 border-l border-green-950/35 z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-green-950/20 pb-4 mb-8">
                  <div className="bg-luxury-black border border-luxury-green text-luxury-white font-serif font-bold text-sm px-2.5 py-1 rounded-md tracking-wider">
                    THINKSARATH<span className="text-luxury-green-glowing">.AI</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 rounded-lg border border-green-950/40 text-zinc-400 hover:text-luxury-green-glowing hover:border-luxury-green-glowing/30 transition-all cursor-pointer"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Vertical Navigation Links */}
                <nav className="flex flex-col gap-5 text-xs font-mono tracking-widest text-zinc-300">
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={() => {
                      setActiveView('home');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'home' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>HOME</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => {
                      setActiveView('about');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/about');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'about' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>ABOUT</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    onClick={() => {
                      setActiveView('services');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/service');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'services' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>SERVICES</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => {
                      setActiveView('blog');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/blog');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'blog' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>BLOG</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.23 }}
                    onClick={() => {
                      setActiveView('faq');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/faq');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'faq' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>FAQ</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.24 }}
                    onClick={() => {
                      setActiveView('brand-hub');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/brand-hub');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'brand-hub' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>BRAND HUB</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.245 }}
                    onClick={() => {
                      setActiveView('database');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/database');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'database' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>DATABASE</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    onClick={() => {
                      setActiveView('contact');
                      setIsMenuOpen(false);
                      window.history.pushState(null, '', '/contact');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                    className={`hover:text-luxury-green-glowing text-left transition-colors border-b border-green-950/10 pb-2.5 flex justify-between items-center group w-full cursor-pointer ${activeView === 'contact' ? 'text-luxury-green-glowing font-bold' : ''}`}
                  >
                    <span>CONTACT</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-luxury-green-glowing transition-colors" />
                  </motion.button>
                </nav>
              </div>

              {/* Bottom section of drawer */}
              <div className="space-y-5">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-900/25 bg-green-950/20 text-[10px] text-zinc-400 font-mono w-fit">
                  <MapPin className="w-3 h-3 text-luxury-green-glowing" /> CHENNAI, INDIA
                </div>

                <a 
                  href={activeView === 'home' ? '#ai-auditor-section' : '#'}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (activeView !== 'home') {
                      e.preventDefault();
                      setActiveView('contact');
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-linear-to-r from-luxury-green to-luxury-green-mid hover:from-luxury-green-mid hover:to-luxury-green-light text-xs font-mono text-luxury-white font-semibold transition-all hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                >
                  RUN FREE AUDIT <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <div className="text-[10px] text-zinc-500 font-mono flex flex-col gap-1 border-t border-green-950/15 pt-4">
                  <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-luxury-green-glowing" /> contact@thinksarath.com</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-luxury-green-glowing" /> +91 98765 43210</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SEOHead 
              title="ThinkSarath | AI Search, AEO & SEO Consultant Chennai & Erode" 
              description="Premium SEO, GEO & AEO scaling programs by Sarath Babu K. Capture top-tier Google search real estate and Generative AI chat citations." 
              schema={homeSchema} 
            />
            {/* Hero Section */}
            <motion.section 
              className="relative pt-12 md:pt-24 pb-16 md:pb-24 max-w-7xl mx-auto px-4 z-10" 
              id="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Subtle intro chip */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-green-900/30 bg-green-950/20 text-xs text-luxury-green-glowing font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> ARCHITECT OF AI SEARCH, AEO & REVENUE PIPELINES
          </div>

          {/* Luxury Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-luxury-white font-medium tracking-tight leading-none">
            Scale Your Brand <br className="hidden md:inline" />
            Into the <span className="text-gradient-green font-semibold">Generative AI Era</span>
          </h1>

          {/* Luxury Description */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-sans">
            Bespoke SEO, AEO, and Paid Ads architectures engineered specifically for luxury demographics, medical consultancies, real estate developers, and premium retail brands in Chennai & worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              href="#ai-auditor-section"
              className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-luxury-green-mid to-luxury-green-light hover:from-luxury-green-light hover:to-luxury-green-glowing text-luxury-white hover:text-luxury-black font-serif font-medium text-sm rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              Generate AI Strategy Blueprint
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services-hub"
              className="w-full sm:w-auto px-7 py-4 border border-green-900/30 hover:border-luxury-green bg-luxury-black/60 text-zinc-300 hover:text-luxury-glowing font-mono text-xs tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              EXPLORE CAPABILITIES
            </a>
          </div>

          {/* Floating statistics preview under hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-16 border-t border-green-950/20">
            <div className="p-3 text-center">
              <span className="block text-2xl md:text-3xl font-serif font-bold text-luxury-white">3×</span>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Avg Traffic Growth</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl md:text-3xl font-serif font-bold text-luxury-white">100+</span>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Brands Served</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl md:text-3xl font-serif font-bold text-luxury-white">50+</span>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Page-1 Rankings</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl md:text-3xl font-serif font-bold text-luxury-white">98%</span>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Client Satisfaction</span>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Custom Services Hub (Electric borders / BorderGlow wrappers) */}
      <motion.section 
        className="relative py-20 bg-linear-to-b from-transparent via-luxury-green-dark/10 to-transparent z-10" 
        id="services-hub"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.12 }
          }
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
              PREMIUM WORKSHOPS & ARCHITECTURES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
              Algorithmic Channels
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
              We move away from mass tactics, focusing strictly on elite-level entity visibility, generative engine indexing, local presence scaling, and performance PPC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const isHiglighted = service.highlight;
              
              // Wrap with ElectricBorder for flagged core services, BorderGlow for standard ones
              const CardContent = (
                <div className="flex flex-col justify-between h-full min-h-[280px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase text-luxury-green-glowing tracking-widest">
                        {service.badge}
                      </span>
                      {isHiglighted && (
                        <span className="bg-green-950/60 border border-green-800/30 text-[9px] font-mono text-luxury-glowing px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          Next-Gen SEO
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-serif font-medium text-luxury-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs mt-3 leading-relaxed font-sans">
                      {service.shortDesc}
                    </p>

                    <p className="text-zinc-500 text-[11px] leading-relaxed mt-2.5 font-light">
                      {service.fullDesc}
                    </p>
                  </div>

                  <div className="border-t border-green-950/20 pt-4 mt-6">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">INTEGRATIONS INCLUDE:</span>
                    <div className="flex flex-wrap gap-1">
                      {service.details.map((det) => (
                        <span key={det} className="text-[9px] font-mono text-zinc-300 bg-green-950/10 border border-green-900/10 px-2 py-0.5 rounded">
                          {det}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div 
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  className="h-full"
                >
                  {isHiglighted ? (
                    <ElectricBorder className="h-full">
                      {CardContent}
                    </ElectricBorder>
                  ) : (
                    <BorderGlow className="h-full">
                      {CardContent}
                    </BorderGlow>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </motion.section>

      {/* Flagship Interactive Showcase Simulator */}
      <motion.section 
        className="relative bg-luxury-black/40 z-10 py-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AeoShowcase />
      </motion.section>

      {/* Impact & Industry Bento */}
      <motion.section 
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <MagicBento />
      </motion.section>

      {/* 3D Circular Showroom */}
      <motion.section 
        className="relative z-10 py-10 bg-linear-to-b from-transparent via-luxury-green-dark/15 to-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <CircularGallery />
      </motion.section>

      {/* Bespoke AI Lead Qualification & Filter Flow Section */}
      <motion.section 
        className="relative z-10 bg-luxury-black py-16 border-t border-green-950/15"
        id="lead-qualifier-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <LeadQualifier />
      </motion.section>

      {/* AI Strategy Auditing Tool Section */}
      <motion.section 
        className="relative z-10 bg-luxury-black/80 py-12 border-t border-green-950/20"
        id="ai-auditor-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AuditTool />
      </motion.section>

      {/* Freelancer Profile Bio */}
      <motion.section 
        className="relative py-20 z-10 bg-linear-to-b from-transparent to-luxury-black"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
              MEET THE FREELANCER
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
              Certified Expert Authority
            </h2>
            <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
              ThinkSarath acts as a bespoke, agile growth architect for businesses that require extreme search precision and custom marketing conversion funnels.
            </p>
          </div>

          <ProfileCard />
        </div>
      </motion.section>
          </motion.div>
        )}

        {activeView === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <AboutView />
          </motion.div>
        )}

        {activeView === 'services' && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <ServiceView />
          </motion.div>
        )}

        {activeView === 'blog' && (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <BlogView onViewChange={(view, tab) => {
              setActiveView(view);
              if (tab) {
                setTimeout(() => {
                  window.history.pushState(null, '', `/brand-hub?tab=${tab}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }, 50);
              }
            }} />
          </motion.div>
        )}

        {activeView === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <FaqView />
          </motion.div>
        )}

        {activeView === 'brand-hub' && (
          <motion.div
            key="brand-hub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <BrandHub />
          </motion.div>
        )}

        {activeView === 'database' && (
          <motion.div
            key="database"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <DatabaseView />
          </motion.div>
        )}

        {activeView === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 pt-10"
          >
            <ContactView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Footer with Local Maps Accent */}
      <footer className="relative border-t border-green-950/30 bg-luxury-black pt-16 pb-12 z-10">
        
        {/* Subtle glowing mesh in footer */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-linear-to-r from-transparent via-luxury-green-glowing/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Branding column */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-lg text-luxury-white">
                THINKSARATH<span className="text-luxury-green-glowing">.AI</span>
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-xs font-sans">
                Next-generation digital marketing freelance consultancy in Chennai, Tamil Nadu. Merging SEO, AEO, and performance paid ads.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-luxury-green-glowing" /> Chennai, Tamil Nadu, India
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-4 text-xs font-mono">
              <h5 className="text-luxury-green-glowing text-[10px] uppercase tracking-wider font-bold">Quick Navigation</h5>
              <ul className="space-y-2 text-zinc-400">
                <li><button onClick={() => { setActiveView('about'); window.history.pushState(null, '', '/about'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">About Sarath Babu</button></li>
                <li><button onClick={() => { setActiveView('services'); window.history.pushState(null, '', '/service'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">Our Premium Services</button></li>
                <li><button onClick={() => { setActiveView('blog'); window.history.pushState(null, '', '/blog'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">Advanced AI SEO Blog</button></li>
                <li><button onClick={() => { setActiveView('faq'); window.history.pushState(null, '', '/faq'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">Technical FAQ Hub</button></li>
                <li><button onClick={() => { setActiveView('brand-hub'); window.history.pushState(null, '', '/brand-hub'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">Brand Entity Hub</button></li>
                <li><button onClick={() => { setActiveView('database'); window.history.pushState(null, '', '/database'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">MySQL Lead Database</button></li>
                <li><button onClick={() => { setActiveView('contact'); window.history.pushState(null, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-luxury-white transition-colors cursor-pointer text-left block">Contact Direct Concierge</button></li>
              </ul>
            </div>

            {/* Capabilities */}
            <div className="space-y-4 text-xs font-mono">
              <h5 className="text-luxury-green-glowing text-[10px] uppercase tracking-wider font-bold">Client Industries</h5>
              <ul className="space-y-2 text-zinc-400">
                <li><span className="text-zinc-400">Healthcare Clinics</span></li>
                <li><span className="text-zinc-400">Real Estate Developers</span></li>
                <li><span className="text-zinc-400">High-End Retail Boutiques</span></li>
                <li><span className="text-zinc-400">Technology & SaaS Groups</span></li>
              </ul>
            </div>

            {/* Contact / Location highlights */}
            <div className="space-y-4 text-xs font-mono">
              <h5 className="text-luxury-green-glowing text-[10px] uppercase tracking-wider font-bold">Inquiries</h5>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <span className="block text-[9px] text-zinc-600 uppercase">DIRECT FREELANCE CONCIERGE</span>
                  <span className="text-luxury-white text-xs">sarathb299@gmail.com</span>
                </li>
                <li>
                  <span className="block text-[9px] text-zinc-600 uppercase">LOCATION STATUS</span>
                  <span className="text-luxury-white text-xs flex items-center gap-1">
                    Anna Nagar, Chennai <ExternalLink className="w-3 h-3 text-luxury-green-glowing" />
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal copyrights */}
          <div className="border-t border-green-950/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-mono">
            <div>
              © 2026 ThinkSarath AI. All Rights Reserved. Crafted for Luxury Demographics.
            </div>
            <div className="flex gap-4">
              <span className="text-luxury-green-glowing">Chennai SEO Consulting</span>
              <span>·</span>
              <span>AEO & GEO Pioneer</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
          >
            <a
              href="#ai-auditor-section"
              className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-luxury-black/95 border border-luxury-green-glowing text-luxury-white hover:text-luxury-black font-mono text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] hover:bg-luxury-green-glowing transition-all duration-300 group"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-luxury-green-glowing group-hover:text-luxury-black transition-colors" />
              <span>Book Consultation</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Monitor Component */}
      <PerformanceMonitor />

    </div>
  );
}
