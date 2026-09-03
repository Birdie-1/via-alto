import React from 'react';
import Button from '../ui/Button';
import { TRANSLATIONS } from '../../data/translations';

export default function BrandStory({ onStoryClick, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section id="brand-story" className="py-20 sm:py-28 bg-[#E8DDCC]/30 border-y border-stone-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-stone-light shadow-md bg-stone-light group">
              <img
                src="/images/philosophy.jpg"
                alt="VIA ALTO Brand Story - Alpine peaks"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10" />
              
              {/* Subtle Italian Alps Label Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-stone-light/40 text-[10px] uppercase font-mono tracking-brand text-charcoal">
                {t.phil_location}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-brand font-semibold text-forest">
                {t.phil_tag}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-tight">
                {t.phil_title_1} <br />
                {t.phil_title_2}
              </h2>
            </div>

            <div className="space-y-4 text-stone text-sm sm:text-base font-sans font-light leading-relaxed">
              <p>{t.phil_body_1}</p>
              <p>{t.phil_body_2}</p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={onStoryClick}
              >
                {t.phil_cta}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
