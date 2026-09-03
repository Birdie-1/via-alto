import React from 'react';
import { Compass, Sparkles, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { TRANSLATIONS } from '../../data/translations';

export default function GearFinderBanner({ onOpenGearFinder, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section className="py-16 sm:py-20 bg-[#E8DDCC]/35 border-t border-stone-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#183C32] text-offwhite p-8 sm:p-12 border border-forest-light shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Subtle background graphic */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full bg-beige/10 pointer-events-none" />

          {/* Left: Editorial content */}
          <div className="space-y-4 max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-beige text-[10px] uppercase font-bold tracking-brand-wide border border-white/20">
              <Compass size={13} />
              <span>{t.finder_banner_tag}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {t.finder_banner_title}
            </h2>

            <p className="text-xs sm:text-base text-stone-light font-sans font-light leading-relaxed">
              {t.finder_banner_subtitle}
            </p>

            {/* Micro value props */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-beige">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>Custom Terrain Matching</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Scale size={15} />
                <span>Calculated Pack Weight</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={15} />
                <span>10% Bundle Discount</span>
              </span>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="z-10 shrink-0 flex flex-col sm:flex-row items-stretch lg:items-center gap-3">
            <Button
              variant="outline-light"
              size="lg"
              onClick={onOpenGearFinder}
              className="border-beige text-beige hover:bg-beige hover:text-forest shadow-lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              {t.finder_banner_btn}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
