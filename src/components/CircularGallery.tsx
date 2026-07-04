import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

interface GalleryItem {
  id: number;
  industry: string;
  metric: string;
  title: string;
  desc: string;
  client: string;
  color: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 0,
    industry: "Healthcare",
    metric: "3× Traffic Growth",
    title: "Aesthetics Clinic, Chennai",
    desc: "Optimised technical structure and implemented custom AEO Schema, elevating voice search answers on Google & Alexa for luxury cosmetic surgery searches.",
    client: "VIP Medical Group",
    color: "from-emerald-950/40 to-green-900/10",
  },
  {
    id: 1,
    industry: "Real Estate",
    metric: "98% Lead Quality Lift",
    title: "Luxury Villas, ECR",
    desc: "Built full-funnel Meta Ads & Google Search campaigns targeting high-net-worth individuals, triggering Chennai's premier residential real estate boom.",
    client: "Alliance Developers",
    color: "from-green-950/40 to-emerald-950/10",
  },
  {
    id: 2,
    industry: "Retail & Commerce",
    metric: "50+ Page-1 Ranks",
    title: "Elite Silk Brand",
    desc: "Revolutionised organic ecommerce search visibility. Dominated premium silk sarees search queries on mobile devices across south India.",
    client: "Kanchipuram Silks Ltd",
    color: "from-zinc-950 to-green-950/20",
  },
  {
    id: 3,
    industry: "Technology & SaaS",
    metric: "340% GEO Footprint",
    title: "AI Security Systems",
    desc: "Engineered high-authority Generative Engine Optimisation. Established permanent context citations inside Perplexity AI and ChatGPT Search.",
    client: "CyberSecure Corp",
    color: "from-emerald-950/40 to-zinc-950",
  },
  {
    id: 4,
    industry: "Legal & Finance",
    metric: "98% Trust Score",
    title: "Investment Advisors",
    desc: "Supercharged GMB Profile Optimization & Google Local Service Ads, locking top map pack results and premium local reviews for wealth managers.",
    client: "WealthCare Capital",
    color: "from-green-950/50 to-emerald-900/10",
  },
];

export default function CircularGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const rotationStart = useRef(0);

  // rotation angle around the Y axis
  const rotationY = useMotionValue(0);
  const rotationYSpring = useSpring(rotationY, { stiffness: 45, damping: 15 });

  const count = GALLERY_ITEMS.length;
  const radius = 280; // Distance of cards from the center in 3D space
  const theta = 360 / count; // Angle spacing between each card

  useEffect(() => {
    // Keep activeIndex synced to rotationY target
    const angle = activeIndex * -theta;
    rotationY.set(angle);
  }, [activeIndex, theta, rotationY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    rotationStart.current = rotationY.get();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current;
    // Map movement speed to 3D rotation angle
    const newRotation = rotationStart.current + deltaX * 0.45;
    rotationY.set(newRotation);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Snap to the closest item
    const currentRot = rotationY.get();
    const approxIndex = Math.round(currentRot / -theta);
    const normalizedIndex = ((approxIndex % count) + count) % count;

    setActiveIndex(normalizedIndex);
    rotationY.set(approxIndex * -theta); // clean snap
  };

  // Touch support for premium mobile responsiveness
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStart.current = e.touches[0].clientX;
    rotationStart.current = rotationY.get();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStart.current;
    const newRotation = rotationStart.current + deltaX * 0.45;
    rotationY.set(newRotation);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden" id="circular-gallery-container">
      {/* Top Description */}
      <div className="text-center mb-10 max-w-xl px-4 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-800/30 bg-green-950/20 text-xs text-luxury-glowing font-mono tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> INTERACTIVE 3D PRODUCT SHOWCASE
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-luxury-white font-medium tracking-tight">
          Success Across High-End Industries
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm mt-2">
          Click and drag to rotate the interactive showroom. View premium marketing results curated for discerning brand leaders.
        </p>
      </div>

      {/* 3D Viewport Stage */}
      <div 
        ref={containerRef}
        className="relative w-full h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        style={{ perspective: '1000px' }}
      >
        {/* Carousel Rotation Axis */}
        <motion.div
          className="relative w-[280px] h-[240px] flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            rotateY: rotationYSpring,
          }}
        >
          {GALLERY_ITEMS.map((item, index) => {
            const angleDeg = index * theta;
            const isFront = activeIndex === index;

            return (
              <div
                key={item.id}
                className="absolute w-[260px] h-[230px] md:w-[280px] md:h-[240px] rounded-2xl border transition-all duration-500 overflow-hidden"
                style={{
                  transform: `rotateY(${angleDeg}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  borderColor: isFront ? 'rgba(74, 222, 128, 0.35)' : 'rgba(74, 222, 128, 0.08)',
                  boxShadow: isFront 
                    ? '0 15px 30px -5px rgba(21, 69, 34, 0.4), 0 0 15px rgba(74, 222, 128, 0.15)' 
                    : '0 5px 15px rgba(0,0,0,0.4)',
                }}
              >
                {/* Background glow gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} -z-10`} />

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Header: Industry & Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400">
                        {item.industry}
                      </span>
                      <span className="bg-green-950/60 border border-green-800/30 text-luxury-glowing text-[9px] font-mono px-2 py-0.5 rounded-full">
                        {item.client}
                      </span>
                    </div>

                    {/* Stat callout */}
                    <div className="flex items-center gap-1 text-green-400 font-serif font-semibold text-lg mb-1">
                      <TrendingUp className="w-4 h-4 text-luxury-glowing" />
                      {item.metric}
                    </div>

                    {/* Title */}
                    <h4 className="text-luxury-white text-xs md:text-sm font-medium font-serif line-clamp-1 mb-2">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-4 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  {/* Footer badge */}
                  <div className="flex items-center gap-1 border-t border-green-900/20 pt-2 text-[10px] text-zinc-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-luxury-glowing" /> Certified Client Performance
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Control Triggers */}
      <div className="flex items-center gap-5 mt-6 z-10">
        <button
          onClick={prev}
          className="p-2.5 rounded-full border border-green-900/30 hover:border-luxury-green-light bg-luxury-black/60 text-zinc-300 hover:text-luxury-glowing transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
          aria-label="Previous Case Study"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Indicator dots */}
        <div className="flex items-center gap-2">
          {GALLERY_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-6 bg-luxury-green-glowing' 
                  : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2.5 rounded-full border border-green-900/30 hover:border-luxury-green-light bg-luxury-black/60 text-zinc-300 hover:text-luxury-glowing transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
          aria-label="Next Case Study"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
