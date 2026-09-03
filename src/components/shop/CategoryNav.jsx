import React from 'react';
import { CATEGORIES } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function CategoryNav({ activeCategory, onSelectCategory, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const tabs = [
    { id: 'all', label: t.shop_tab_all },
    ...CATEGORIES.map((cat) => ({
      id: cat.id,
      label: lang === 'th' ? cat.name_th.toUpperCase() : cat.name.toUpperCase()
    }))
  ];

  return (
    <div className="bg-[#F7F5F0] border-b border-stone-light/60 sticky top-20 z-20 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-8 overflow-x-auto py-3.5 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`text-xs font-semibold uppercase tracking-brand py-1 px-3 sm:px-1 whitespace-nowrap transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'text-forest font-bold'
                    : 'text-stone hover:text-charcoal'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-forest" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
