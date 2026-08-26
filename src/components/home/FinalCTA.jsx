import React from 'react';
import Button from '../ui/Button';

export default function FinalCTA({ onExploreGearClick }) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#183C32] text-offwhite border-t border-forest-light">
      {/* Background Mountain Silhouette Image Texture */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img
          src="/images/cta_bg.jpg"
          alt="Mountain mist texture"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#183C32] via-transparent to-[#183C32]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-block">
          <span className="text-xs uppercase tracking-brand-wide font-medium text-beige border-b border-beige/40 pb-1">
            ALPINE EXPEDITION GEAR
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          READY TO GO BEYOND?
        </h2>

        <p className="text-base sm:text-lg text-stone-light font-sans max-w-md mx-auto font-light">
          “Your next trail is waiting.”
        </p>

        <div className="pt-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={onExploreGearClick}
            className="bg-beige text-charcoal hover:bg-white border border-beige-dark/30 shadow-lg text-xs sm:text-sm font-bold tracking-brand-wide"
          >
            EXPLORE GEAR
          </Button>
        </div>
      </div>
    </section>
  );
}
