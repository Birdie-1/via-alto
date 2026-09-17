import React from 'react';
import Button from '../ui/Button';
import { TRANSLATIONS } from '../../data/translations';
import { assetUrl } from '../../utils/assets';

export default function Hero({ onExploreClick, onDiscoverClick, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-20">
      {/* Background Image with Cinematic Alpine Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={assetUrl('/images/hero.jpg')}
          alt="Alpine mountain ridge with explorer"
          className="w-full h-full object-cover object-center scale-[1.02] transform animate-in fade-in zoom-in-105 duration-1000"
        />
        {/* Subtle dark gradient overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="max-w-2xl text-offwhite space-y-6">
          
          {/* Slogan Label */}
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-6 bg-beige/80" />
            <span className="text-xs sm:text-sm uppercase tracking-brand-wide font-medium text-beige">
              {t.hero_slogan}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            {t.hero_headline_1} <br />
            {t.hero_headline_2}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-offwhite/90 font-sans font-light max-w-lg leading-relaxed">
            {t.hero_subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onExploreClick}
              className="bg-forest hover:bg-forest-light border border-forest-light/50 shadow-lg text-white"
            >
              {t.hero_cta_explore}
            </Button>

            <Button
              variant="outline-light"
              size="lg"
              onClick={onDiscoverClick}
            >
              {t.hero_cta_discover}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates / Altitude Indicator Decoration */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex items-center gap-6 text-white/60 text-[10px] uppercase tracking-brand font-mono">
        <span>{t.nav_elevation}</span>
        <span>•</span>
        <span>{t.nav_lat}</span>
        <span>•</span>
        <span>{t.nav_series}</span>
      </div>
    </section>
  );
}
