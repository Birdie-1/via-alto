import React from 'react';
import { CATEGORIES, COLOR_PALETTE } from '../../data/products';
import { X, RotateCcw } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const priceRanges = [
    { label: t.filter_all_prices, value: 'all' },
    { label: t.filter_under_1000, value: 'under-1000' },
    { label: t.filter_1000_2000, value: '1000-2000' },
    { label: t.filter_2000_3000, value: '2000-3000' },
    { label: t.filter_3000_plus, value: '3000-plus' }
  ];

  const sizeOptions = ['One Size', 'S', 'M', 'L', 'XL'];

  const ratingOptions = [
    { label: t.filter_all_ratings, value: 0 },
    { label: `★ ★ ★ ★ ☆ (${t.filter_4_stars})`, value: 4.5 },
    { label: `★ ★ ★ ☆ ☆ (${t.filter_3_stars})`, value: 4.0 }
  ];

  const sidebarContent = (
    <div className="space-y-8">
      {/* Header / Reset Action */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-light/60">
        <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-charcoal">
          {t.filter_title}
        </h3>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-brand font-semibold text-stone hover:text-forest transition-colors cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>{t.filter_reset}</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          {t.filter_cat}
        </h4>
        <div className="space-y-1.5">
          <label className="flex items-center space-x-2 text-xs text-stone hover:text-charcoal cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={filters.category === 'all'}
              onChange={() => onFilterChange('category', 'all')}
              className="accent-forest"
            />
            <span className={filters.category === 'all' ? 'font-bold text-forest' : ''}>
              {t.filter_all_cat}
            </span>
          </label>
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center space-x-2 text-xs text-stone hover:text-charcoal cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.id}
                onChange={() => onFilterChange('category', cat.id)}
                className="accent-forest"
              />
              <span className={filters.category === cat.id ? 'font-bold text-forest' : ''}>
                {lang === 'th' ? cat.name_th : cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-light/40">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          {t.filter_price}
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map((range) => (
            <label
              key={range.value}
              className="flex items-center space-x-2 text-xs text-stone hover:text-charcoal cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === range.value}
                onChange={() => onFilterChange('priceRange', range.value)}
                className="accent-forest"
              />
              <span className={filters.priceRange === range.value ? 'font-bold text-forest' : ''}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Color Palette Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-light/40">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
            {t.filter_color}
          </h4>
          {filters.color && filters.color !== 'all' && (
            <button
              onClick={() => onFilterChange('color', 'all')}
              className="text-[10px] text-stone hover:text-forest underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_PALETTE.map((c) => {
            const isSelected = filters.color === c.id;
            const cName = lang === 'th' ? c.name_th : c.name;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onFilterChange('color', isSelected ? 'all' : c.id)}
                className={`flex items-center gap-1.5 px-2 py-1 border text-[11px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-forest ring-1 ring-forest font-bold text-forest'
                    : 'bg-white border-stone-light/80 text-stone hover:border-forest/40'
                }`}
                title={cName}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{cName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Size Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-light/40">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          {t.filter_size}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {sizeOptions.map((size) => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onFilterChange('size', isSelected ? 'all' : size)}
                className={`text-xs px-2.5 py-1.5 border transition-all cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-forest text-offwhite border-forest'
                    : 'bg-white text-stone border-stone-light hover:border-forest/50'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Rating Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-light/40">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          {t.filter_rating}
        </h4>
        <div className="space-y-1.5">
          {ratingOptions.map((r, i) => (
            <label
              key={i}
              className="flex items-center space-x-2 text-xs text-stone hover:text-charcoal cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r.value}
                onChange={() => onFilterChange('minRating', r.value)}
                className="accent-forest"
              />
              <span className={filters.minRating === r.value ? 'font-bold text-forest' : ''}>
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 pr-6">
        <div className="sticky top-36 bg-white/60 p-6 border border-stone-light/60 shadow-2xs backdrop-blur-xs">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Filter */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#F7F5F0] p-6 shadow-2xl overflow-y-auto z-10 animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-light mb-6">
              <span className="font-serif text-lg font-bold text-charcoal">{t.filter_refine_search}</span>
              <button
                onClick={onCloseMobile}
                className="p-2 text-stone hover:text-charcoal cursor-pointer"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
            <div className="mt-8 pt-4 border-t border-stone-light">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-forest text-offwhite text-xs uppercase tracking-brand font-bold shadow-xs cursor-pointer"
              >
                {t.filter_apply}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
