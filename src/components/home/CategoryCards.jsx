import React from 'react';
import { CATEGORIES } from '../../data/products';
import { ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function CategoryCards({ onSelectCategory, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section id="featured-categories" className="py-20 sm:py-28 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-stone-light/60 pb-6">
          <div>
            <span className="text-xs uppercase tracking-brand font-semibold text-forest">
              {t.cat_tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mt-1">
              {t.cat_title}
            </h2>
          </div>
          <p className="text-sm text-stone max-w-md font-sans mt-3 md:mt-0">
            {t.cat_subtitle}
          </p>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="group relative h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden cursor-pointer bg-charcoal border border-stone-light/40 shadow-xs transition-all duration-500 hover:shadow-xl hover:border-forest"
            >
              {/* Category Image with Smooth Zoom */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlays (Default & Hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-forest/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Content at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-center">
                <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-widest text-offwhite transition-transform duration-300 group-hover:-translate-y-1">
                  {lang === 'th' ? category.name_th || category.name : category.name}
                </h3>
                
                {/* Underline Indicator */}
                <div className="w-8 h-[2px] bg-beige mx-auto mt-2 transition-all duration-300 group-hover:w-16 group-hover:bg-white" />

                {/* Subtitle / Discover text visible on hover */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 mt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-brand font-medium text-beige">
                    {t.cat_view_gear} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
