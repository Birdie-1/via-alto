import React from 'react';
import { TRANSLATIONS } from '../../data/translations';

export default function ShopHeader({ totalProducts = 0, lang = 'en' }) {
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
      </div>
    </div>
  );
}
