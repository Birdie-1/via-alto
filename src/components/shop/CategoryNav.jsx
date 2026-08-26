import React from 'react';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const tabs = [
    { id: 'all', label: 'ALL' },
    { id: 'backpacks', label: 'BACKPACKS' },
    { id: 'clothing', label: 'CLOTHING' },
    { id: 'footwear', label: 'FOOTWEAR' },
    { id: 'camping', label: 'CAMPING' },
    { id: 'accessories', label: 'ACCESSORIES' }
  ];

  return (
    <div className="border-b border-stone-light/60 bg-[#F7F5F0] sticky top-20 z-20 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-4 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeCategory.toLowerCase() === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 sm:px-6 py-2 text-xs font-semibold uppercase tracking-brand transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-forest text-offwhite shadow-xs border border-forest'
                    : 'bg-transparent text-charcoal hover:bg-beige/60 border border-stone-light/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
