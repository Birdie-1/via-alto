import React from 'react';
import Button from '../ui/Button';
import { TRANSLATIONS } from '../../data/translations';

export default function FinalCTA({ onExploreClick, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section className="relative py-24 sm:py-32 bg-[#183C32] text-offwhite overflow-hidden">
      {/* Background Texture with Mountain Silhouette Overlay */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
        <img
          src="/images/cta_bg.jpg"
          alt="High mountain landscape texture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Diagonal Brand Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-forest-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-beige/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Subtle Pre-header */}
        <span className="text-xs uppercase tracking-brand-wide font-semibold text-beige block">
          {t.cta_tag}
        </span>

        {/* Main CTA Header */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {t.cta_title}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-beige/90 font-serif italic max-w-xl mx-auto">
          {t.cta_subtitle}
        </p>

        {/* Action Button */}
        <div className="pt-4 flex justify-center">
          <Button
            variant="outline-light"
            size="lg"
            onClick={onExploreClick}
            className="border-beige text-beige hover:bg-beige hover:text-forest"
          >
            {t.cta_button}
          </Button>
        </div>

      </div>
    </section>
  );
}
