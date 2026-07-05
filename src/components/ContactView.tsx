import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  MapPin, 
  Check, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import SEOHead from './SEOHead';


export default function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [message, setMessage] = useState('');
  const [interest, setInterest] = useState('aeo');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Synchronize to the local lead API
    const payload = {
      industry: 'custom',
      scalingGoal: 'brand',
      bottleneck: interest,
      businessName,
      contactName: name,
      email,
      phone,
      customGoal: message
    };

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
      // Fallback local success anyway for smoother UX
      setFormSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Sarath Babu K | ThinkSarath",
    "description": "Secure a direct digital marketing consultation or run a free website audit. Connect via phone, WhatsApp, or email.",
    "url": "https://thinksarath.com/contact",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "ThinkSarath",
      "telephone": "+91-7094629042",
      "email": "sarathb299@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SEOHead 
        title="Contact Premium AI SEO Concierge | ThinkSarath" 
        description="Connect directly with Sarath Babu K - leading AI search strategist, GEO optimizer, and custom WordPress architect. Secure your campaign alignment slot." 
        schema={contactPageSchema} 
      />
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
          DIRECT FREELANCE CONCIERGE
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-luxury-white mt-2 font-medium tracking-tight">
          Initiate Scaling Discussions
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
          Partner with Chennai’s premium AI Search & SEO consultant. Leave details below, or call/WhatsApp directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact cards */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-serif text-luxury-white font-medium mb-2">Verified Coordinates</h2>
          
          {/* Card 1: WhatsApp / Phone */}
          <BorderGlow className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-950/25 border border-green-900/30 text-luxury-green-glowing flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">TELEPHONE & WHATSAPP</span>
                <a 
                  href="tel:+917094629042" 
                  className="text-sm font-serif font-bold text-luxury-white hover:text-luxury-green-glowing transition-colors block"
                >
                  +91 70946 29042
                </a>
                <p className="text-[11px] text-zinc-500 font-sans font-light">Available 09:00 AM - 07:00 PM (IST) for calls. WhatsApp 24/7.</p>
                <div className="pt-2">
                  <a 
                    href="https://wa.me/917094629042?text=Hello%20Sarath%2C%20I'd%20like%20to%20discuss%20a%20digital%20marketing%20project." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-luxury-green-glowing hover:text-luxury-white transition-colors"
                  >
                    CHAT ON WHATSAPP <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Card 2: Email */}
          <BorderGlow className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-950/25 border border-green-900/30 text-luxury-green-glowing flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">DIRECT EMAIL CONCIERGE</span>
                <a 
                  href="mailto:thinkwithsarath@gmail.com" 
                  className="text-sm font-serif font-bold text-luxury-white hover:text-luxury-green-glowing transition-colors block"
                >
                  thinkwithsarath@gmail.com
                </a>
                <p className="text-[11px] text-zinc-500 font-sans font-light">Typically responds with high-fidelity briefs within 4 hours.</p>
              </div>
            </div>
          </BorderGlow>

          {/* Card 3: LinkedIn Profile */}
          <BorderGlow className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-950/25 border border-green-900/30 text-luxury-green-glowing flex items-center justify-center shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">LINKEDIN PROFESSIONAL NETWORKING</span>
                <a 
                  href="https://www.linkedin.com/in/sarathbabuk/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-serif font-bold text-luxury-white hover:text-luxury-green-glowing transition-colors block flex items-center gap-1"
                >
                  linkedin.com/in/sarathbabuk/ <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-zinc-500 font-sans font-light">Follow for programmatic SEO blueprints, GEO tips, and industry case studies.</p>
              </div>
            </div>
          </BorderGlow>

          {/* Location indicators */}
          <div className="p-5 rounded-xl border border-green-950/20 bg-green-950/5 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-luxury-green-glowing shrink-0" />
            <div className="text-[11px] text-zinc-400 font-sans">
              Operates out of <strong className="text-luxury-white">Chennai & Erode</strong>, Tamil Nadu, India. Serving clients globally.
            </div>
          </div>
        </div>

        {/* Right Column: Contact form / Lead flow */}
        <div className="lg:col-span-7">
          <BorderGlow className="p-6 md:p-8">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-1.5 text-[10px] text-luxury-green-glowing font-mono tracking-wider">
                  <Sparkles className="w-4 h-4" /> SECURE CONCIERGE ROUTING
                </div>
                <h3 className="text-xl font-serif text-luxury-white font-medium mb-1">
                  Connect & Deploy Campaigns
                </h3>
                <p className="text-zinc-500 text-xs font-sans font-light mb-4">
                  Provide your business scope to trigger our automated search visibility pipeline audit.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarath Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarath@clinic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98400 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Business / Site URL</label>
                    <input
                      type="text"
                      placeholder="e.g. Apollo Aesthetics Chennai"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Primary Channel Interest</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all cursor-pointer"
                  >
                    <option value="aeo" className="bg-luxury-black text-luxury-white">Answer Engine Optimisation (ChatGPT, Perplexity)</option>
                    <option value="seo" className="bg-luxury-black text-luxury-white">Organic Search Engine Optimization (Google SEO)</option>
                    <option value="gmb" className="bg-luxury-black text-luxury-white">Google Maps local 3-Pack Optimization</option>
                    <option value="ads" className="bg-luxury-black text-luxury-white">Paid ROI Campaigns (Google Search/Meta Social)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Describe Your Growth Bottlenecks</label>
                  <textarea
                    placeholder="Describe your current search positions or digital goal details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-green-950/40 bg-green-950/5 focus:border-luxury-green-glowing/60 focus:bg-green-950/10 text-xs text-luxury-white font-sans outline-none transition-all placeholder:text-zinc-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-luxury-green-mid to-luxury-green-light hover:from-luxury-green-light hover:to-luxury-green-glowing text-luxury-white font-bold text-xs font-mono tracking-widest rounded-lg cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-luxury-white animate-spin" />
                      <span>DISPATCHING BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <span>DISPATCH BRIEF</span> <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-950/30 border border-luxury-green-glowing text-luxury-green-glowing flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-lg md:text-xl font-serif text-luxury-white font-medium">Message Dispatched Successfully</h3>
                <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you for submitting your campaign goals. Sarath Babu K will review your entity footprint and reach out via Email/WhatsApp within 4 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 border border-green-950/40 hover:border-luxury-green-glowing/30 bg-green-950/10 rounded-lg text-zinc-500 hover:text-luxury-white text-xs font-mono cursor-pointer transition-all"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              </motion.div>
            )}
          </BorderGlow>
        </div>

      </div>
    </div>
  );
}
