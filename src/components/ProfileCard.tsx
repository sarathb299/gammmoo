import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Award, Globe, MessageSquare, Linkedin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ProfileCard() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sarathb299@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-10" id="profile-card-container">
      <div className="relative rounded-2xl overflow-hidden border border-green-900/30 bg-gradient-to-b from-luxury-green-dark/40 via-luxury-black to-luxury-black p-1 luxury-glow">
        
        {/* Absolute top glowing line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-green-glowing to-transparent" />
        
        {/* Grid luxury mesh overlay in background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(74,222,128,0.04)_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none -z-10" />

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
          
          {/* ThinkSarath Custom Vector Avatar (No hotlinking, using high-end dynamic gradient SVG profile representational shape) */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-luxury-green-glowing to-luxury-green blur opacity-30 group-hover:opacity-60 transition duration-500" />
            
            <div className="relative w-24 h-24 rounded-full bg-luxury-black border border-green-900/40 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-luxury-green-glowing">
                <defs>
                  <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#154522" />
                  </linearGradient>
                </defs>
                {/* Dynamic futuristic face representation & letters */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#avatarGrad)" strokeWidth="1.5" />
                <path d="M50,22 C40,22 36,30 36,40 C36,54 50,68 50,68 C50,68 64,54 64,40 C64,30 60,22 50,22 Z" fill="none" stroke="url(#avatarGrad)" strokeWidth="1" />
                <text x="50" y="44" fill="#fcfdfd" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">TS</text>
                <text x="50" y="80" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle">AI ARCHITECT</text>
              </svg>
            </div>
            
            <span className="absolute bottom-0 right-1 bg-luxury-green-glowing w-3.5 h-3.5 rounded-full border-2 border-luxury-black animate-pulse" />
          </div>

          {/* Info Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-luxury-white font-semibold">
                  ThinkSarath
                </h3>
                <p className="text-xs font-mono text-luxury-green-glowing mt-0.5 tracking-wider uppercase">
                  AI Digital Marketing Architect
                </p>
              </div>
              <div className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full bg-green-950/40 border border-green-800/30 text-[10px] text-luxury-glowing font-mono w-fit mx-auto md:mx-0">
                <MapPin className="w-3 h-3" /> CHENNAI, TN
              </div>
            </div>

            <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans">
              I partner with premium brands, medical consultants, real estate groups, and retail giants in Chennai to architect custom search pipelines that bypass standard algorithms. Specializing in high-end Search, AEO, and Meta Campaigns.
            </p>

            {/* Micro Skills Tag */}
            <div className="flex flex-wrap gap-1.5 mt-4 justify-center md:justify-start">
              {['SEO Expert', 'AEO Engineer', 'GEO Strategist', 'Paid Ads Expert', 'Web Dev Consultant'].map((sk) => (
                <span key={sk} className="text-[9px] font-mono text-zinc-300 bg-green-950/20 border border-green-900/15 px-2 py-0.5 rounded-md">
                  {sk}
                </span>
              ))}
            </div>

            {/* Quick Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 border-t border-green-900/20 pt-4 text-xs text-zinc-300 font-sans">
              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-luxury-black hover:bg-green-950/15 border border-green-900/10 hover:border-luxury-green-glowing/20 transition-all text-left"
              >
                <Mail className="w-4 h-4 text-luxury-green-glowing" />
                <div className="truncate">
                  <span className="block text-[10px] text-zinc-500 font-mono">EMAIL ME</span>
                  <span className="text-[11px] font-medium text-luxury-white">{copied ? 'Copied to Clipboard!' : 'sarathb299@gmail.com'}</span>
                </div>
              </button>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-luxury-black hover:bg-green-950/15 border border-green-900/10 hover:border-luxury-green-glowing/20 transition-all text-left"
              >
                <Linkedin className="w-4 h-4 text-luxury-green-glowing" />
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono">LINKEDIN PROFILE</span>
                  <span className="text-[11px] font-medium text-luxury-white flex items-center gap-0.5">
                    Connect on LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] text-zinc-500 font-mono mt-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-luxury-green-glowing" /> 5+ Years Verified Freelance Record
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
