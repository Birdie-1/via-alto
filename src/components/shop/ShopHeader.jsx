import React from 'react';

export default function ShopHeader() {
  return (
    <div className="relative pt-28 pb-14 sm:pb-18 bg-gradient-to-b from-beige/40 via-beige/20 to-[#F7F5F0] border-b border-stone-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        {/* Slogan pill */}
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-4 bg-forest/60" />
          <span className="text-[10px] sm:text-xs uppercase tracking-brand-wide font-bold text-forest">
            VIA ALTO • THE COLLECTION
          </span>
          <span className="h-px w-4 bg-forest/60" />
        </div>

        {/* Serif Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal">
          THE COLLECTION
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-stone font-sans italic max-w-xl mx-auto">
          “Equipment for the trail, the summit, and everything beyond.”
        </p>
      </div>
    </div>
  );
}
