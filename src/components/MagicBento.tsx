import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Building2, 
  ChevronRight, 
  Cpu, 
  GraduationCap, 
  HeartPulse, 
  Award, 
  Percent, 
  Scale, 
  Search, 
  Shield, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  UtensilsCrossed, 
  Wrench 
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import LaserFlow from './LaserFlow';

const STATS = [
  {
    id: 'brands',
    value: '100+',
    label: 'Brands Served',
    desc: 'High-growth companies transformed across sectors.',
    icon: Users,
    glow: 'from-emerald-500/20 to-transparent',
  },
  {
    id: 'experience',
    value: '5+',
    label: 'Years Experience',
    desc: 'Pioneering organic, paid & AI-driven client funnels.',
    icon: Award,
    glow: 'from-teal-500/20 to-transparent',
  },
  {
    id: 'traffic',
    value: '3×',
    label: 'Avg Traffic Growth',
    desc: 'Unlocking massive scale via algorithmic excellence.',
    icon: TrendingUp,
    glow: 'from-green-500/20 to-transparent',
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'Client Satisfaction',
    desc: 'Dedicated retention built on strict revenue alignment.',
    icon: Shield,
    glow: 'from-emerald-400/20 to-transparent',
  },
  {
    id: 'rankings',
    value: '50+',
    label: 'Page-1 Rankings',
    desc: 'Dominating high-commercial-intent search keywords.',
    icon: Search,
    glow: 'from-lightgreen-500/20 to-transparent',
  },
];

const INDUSTRIES = [
  { name: 'Healthcare', icon: HeartPulse, desc: 'Medical AEO, private practices, clinics' },
  { name: 'Real Estate', icon: Building2, desc: 'ECR villas, premium commercial, luxury developers' },
  { name: 'Retail', icon: ShoppingBag, desc: 'Ecommerce silk saree shops, high-end design boutiques' },
  { name: 'Education', icon: GraduationCap, desc: 'International academies, professional institutes' },
  { name: 'Manufacturing', icon: Wrench, desc: 'Automotive parts, machinery, industrial exports' },
  { name: 'Hospitality', icon: UtensilsCrossed, desc: 'Luxury Chennai resorts, premium dining chains' },
  { name: 'Technology', icon: Cpu, desc: 'SaaS, deeptech hardware, IT security audits' },
  { name: 'Legal & Finance', icon: Scale, desc: 'Chennai wealth managers, corporate attorneys' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
  maxTilt?: number;
}

function TiltCard({ children, className, variants, maxTilt = 5 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation and scaling
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), { damping: 25, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), { damping: 25, stiffness: 220 });
  const scale = useSpring(1, { damping: 25, stiffness: 220 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized coordinates (-0.5 to 0.5)
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    scale.set(1.02); // 3D lift effect
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`${className} group/tilt transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(34,197,94,0.12)]`}
    >
      <div style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function MagicBento() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-20 overflow-hidden" id="magic-bento-section">
      {/* 3D background LaserFlow laser ray effect specifically for Premium Growth section */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none overflow-hidden select-none">
        <LaserFlow 
          color="#22c55e" 
          wispDensity={1.2}
          fogIntensity={0.65}
          flowSpeed={0.25}
          mouseTiltStrength={0.015}
          horizontalSizing={0.8}
          verticalSizing={2.4}
        />
      </div>

      <div className="relative z-10 text-center md:text-left mb-16 max-w-3xl">
        <span className="text-[10px] tracking-[0.25em] font-mono text-luxury-green-glowing uppercase font-semibold">
          DECISIVE IMPACT
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-luxury-white mt-3 font-medium tracking-tight">
          Crafted for Premium Growth
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-4 leading-relaxed font-sans">
          ThinkSarath merges data precision with minimalist luxury aesthetics, delivering industry-leading performance markers that directly impact top-line revenue.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <motion.div 
        className="relative z-10 grid grid-cols-1 md:grid-cols-6 gap-6" 
        id="bento-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* Core Stat 1: 3x Traffic Growth (Featured Card) */}
        <TiltCard variants={itemVariants} className="col-span-1 md:col-span-3 h-full" maxTilt={6}>
          <BorderGlow className="h-full" glowColor="from-green-500/30 via-transparent to-emerald-400/10">
            <div className="flex flex-col justify-between h-full min-h-[240px]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-green-950/40 rounded-xl border border-green-800/30">
                  <TrendingUp className="w-6 h-6 text-luxury-glowing" />
                </div>
                <span className="text-[10px] font-mono text-luxury-green-glowing tracking-wider px-2.5 py-1 rounded-full bg-green-950/40 border border-green-800/30">
                  PRIMARY METRIC
                </span>
              </div>
              
              <div className="mt-6">
                <span className="text-5xl md:text-7xl font-serif font-bold text-luxury-white block tracking-tighter">
                  3×
                </span>
                <span className="text-lg font-serif font-semibold text-luxury-white block mt-2">
                  Average Traffic Growth
                </span>
                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-sans leading-relaxed">
                  We double and triple high-value commercial search traffic. Our methodology is built specifically to withstand search algorithm changes, maintaining peak positioning indefinitely.
                </p>
              </div>
            </div>
          </BorderGlow>
        </TiltCard>

        {/* Core Stat 2: Brands Served */}
        <TiltCard variants={itemVariants} className="col-span-1 md:col-span-3 h-full" maxTilt={6}>
          <BorderGlow className="h-full" glowColor="from-teal-500/20 via-transparent to-green-500/10">
            <div className="flex flex-col justify-between h-full min-h-[240px]">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-green-950/40 rounded-xl border border-green-800/30">
                  <Users className="w-6 h-6 text-luxury-glowing" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  SCALE REACHED
                </span>
              </div>

              <div className="mt-6">
                <span className="text-5xl md:text-6xl font-serif font-bold text-luxury-white block tracking-tighter">
                  100+
                </span>
                <span className="text-lg font-serif font-semibold text-luxury-white block mt-2">
                  Brands Served
                </span>
                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-sans leading-relaxed">
                  Trusted by founders, elite medical facilities, premium hospitality groups, and multi-million dollar real estate developers in Chennai and across India.
                </p>
              </div>
            </div>
          </BorderGlow>
        </TiltCard>

        {/* Mini stats & Experience Section */}
        <TiltCard variants={itemVariants} className="col-span-1 md:col-span-2 h-full" maxTilt={8}>
          <BorderGlow className="h-full" glowColor="from-emerald-400/20 via-transparent to-transparent">
            <div className="flex flex-col justify-between h-full min-h-[180px]">
              <div className="p-2.5 bg-green-950/40 rounded-xl border border-green-800/20 w-fit">
                <Award className="w-5 h-5 text-luxury-glowing" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-serif font-bold text-luxury-white">5+ Years</span>
                <span className="text-xs font-mono text-luxury-green-glowing block mt-1">Dedicated Freelance Authority</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-2 font-sans">
                  Bridging traditional SEO with modern AEO & Generative Engine optimization.
                </p>
              </div>
            </div>
          </BorderGlow>
        </TiltCard>

        <TiltCard variants={itemVariants} className="col-span-1 md:col-span-2 h-full" maxTilt={8}>
          <BorderGlow className="h-full" glowColor="from-green-500/20 via-transparent to-transparent">
            <div className="flex flex-col justify-between h-full min-h-[180px]">
              <div className="p-2.5 bg-green-950/40 rounded-xl border border-green-800/20 w-fit">
                <Shield className="w-5 h-5 text-luxury-glowing" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-serif font-bold text-luxury-white">98%</span>
                <span className="text-xs font-mono text-luxury-green-glowing block mt-1">Client Retention Rate</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-2 font-sans">
                  Strict focus on transparent revenue tracking rather than superficial vanity metrics.
                </p>
              </div>
            </div>
          </BorderGlow>
        </TiltCard>

        <TiltCard variants={itemVariants} className="col-span-1 md:col-span-2 h-full" maxTilt={8}>
          <BorderGlow className="h-full" glowColor="from-emerald-500/20 via-transparent to-transparent">
            <div className="flex flex-col justify-between h-full min-h-[180px]">
              <div className="p-2.5 bg-green-950/40 rounded-xl border border-green-800/20 w-fit">
                <Search className="w-5 h-5 text-luxury-glowing" />
              </div>
              <div className="mt-4">
                <span className="text-4xl font-serif font-bold text-luxury-white">50+</span>
                <span className="text-xs font-mono text-luxury-green-glowing block mt-1">Page-1 Rankings Secured</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-2 font-sans">
                  High-intent organic keywords that consistently drive qualified purchase leads.
                </p>
              </div>
            </div>
          </BorderGlow>
        </TiltCard>

        {/* Niche Industry Showcase (Large Row) */}
        <TiltCard variants={itemVariants} className="col-span-1 md:col-span-6 mt-4 h-full" maxTilt={3}>
          <div className="bg-gradient-to-r from-luxury-green-dark/40 via-luxury-black to-luxury-green-dark/20 rounded-2xl border border-green-950/20 p-6 md:p-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-green-950/30 pb-6">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-luxury-green-glowing uppercase">
                  MATCHING YOUR AUDIENCE
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-luxury-white mt-1">
                  Dominating All Premium Industries
                </h3>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm max-w-md">
                We craft specialized campaigns mapped to buying personas in Chennai and internationally.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={ind.name}
                    className="p-4 rounded-xl border border-green-950/15 bg-luxury-black/50 hover:bg-green-950/10 hover:border-luxury-green-glowing/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-green-950/30 rounded-lg text-luxury-green-glowing group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-luxury-white font-medium text-xs md:text-sm tracking-tight font-serif">
                        {ind.name}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[10px] leading-normal font-sans">
                      {ind.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </TiltCard>

      </motion.div>
    </div>
  );
}
