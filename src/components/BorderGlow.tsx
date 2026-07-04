import React from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  id?: string;
  key?: React.Key;
}

export default function BorderGlow({ 
  children, 
  className = '', 
  glowColor = 'from-luxury-green-glowing/20 via-transparent to-luxury-green-mid/10',
  id 
}: BorderGlowProps) {
  return (
    <div 
      id={id}
      className={`relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-500 bg-linear-to-b from-green-900/10 to-zinc-900/30 hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.15)] ${className}`}
    >
      {/* Animated glow gradient background on hover */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-r ${glowColor} blur-xl pointer-events-none -z-10`}
      />
      
      {/* Moving highlight beam overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-luxury-green-glowing/25 to-transparent pointer-events-none" />
      
      {/* Internal Content card wrapper */}
      <div className="relative h-full w-full bg-luxury-black/90 rounded-2xl p-6 md:p-8 border border-green-950/20">
        {children}
      </div>
    </div>
  );
}
