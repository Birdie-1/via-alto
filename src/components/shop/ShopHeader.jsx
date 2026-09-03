import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function ShopHeader({ totalProducts = 0, onOpenGearFinder, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="pt-28 pb-12 bg-[#F7F5F0] border-b border-stone-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-brand-wide font-semibold text-forest block">
          {t.shop_badge}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-charcoal">
          {t.shop_title}
        </h1>
        <p className="text-sm sm:text-base text-stone font-serif italic max-w-lg mx-auto">
          {t.shop_subtitle}
        </p>

        {/* Gear Finder Shortcut Button */}
        {onOpenGearFinder && (
          <div className="pt-3">
            <button
              onClick={onOpenGearFinder}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-forest hover:text-white text-forest border border-forest/40 text-xs font-bold uppercase tracking-brand shadow-2xs transition-all cursor-pointer group"
            >
              <Compass size={15} className="group-hover:rotate-45 transition-transform" />
              <span>{t.finder_nav_btn} (60s)</span>
              <Sparkles size={13} className="text-amber-600 group-hover:text-beige" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
