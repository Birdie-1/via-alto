import React from 'react';
import { X, RotateCcw, Check, Star } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  selectedSizes = [],
  onToggleSize,
  minRating,
  onSelectMinRating,
  onResetFilters,
  hasActiveFilters,
  isOpenOnMobile,
  onCloseMobile
}) {
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-1000', label: 'Under ฿1,000', min: 0, max: 999 },
    { id: '1000-2000', label: '฿1,000 – ฿2,000', min: 1000, max: 2000 },
    { id: '2000-3000', label: '฿2,000 – ฿3,000', min: 2000, max: 3000 },
    { id: '3000-plus', label: '฿3,000+', min: 3000, max: 99999 }
  ];

  const availableSizes = ['S', 'M', 'L', 'XL', 'One Size'];

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 4, label: '4 Stars & Above' },
    { value: 3, label: '3 Stars & Above' }
  ];

  const content = (
    <div className="space-y-8">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-stone-light/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-forest rounded-full" />
          <h3 className="text-xs uppercase tracking-brand font-bold text-charcoal">
            FILTERS
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-[11px] uppercase tracking-wider text-forest hover:text-forest-light flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          Category
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer group">
            <input
              type="radio"
              name="sidebar-category"
              checked={selectedCategory === 'all'}
              onChange={() => onSelectCategory('all')}
              className="accent-forest w-3.5 h-3.5"
            />
            <span className={selectedCategory === 'all' ? 'font-semibold text-forest' : 'text-charcoal group-hover:text-forest'}>
              All Categories
            </span>
          </label>

          {CATEGORIES.map((cat) => {
            const isChecked = selectedCategory === cat.id;
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer group"
              >
                <input
                  type="radio"
                  name="sidebar-category"
                  checked={isChecked}
                  onChange={() => onSelectCategory(cat.id)}
                  className="accent-forest w-3.5 h-3.5"
                />
                <span className={isChecked ? 'font-semibold text-forest' : 'text-charcoal group-hover:text-forest'}>
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Filter */}
      <div className="space-y-3 pt-6 border-t border-stone-light/40">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isChecked = selectedPriceRange === range.id;
            return (
              <label
                key={range.id}
                className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer group"
              >
                <input
                  type="radio"
                  name="price-range"
                  checked={isChecked}
                  onChange={() => onSelectPriceRange(range.id)}
                  className="accent-forest w-3.5 h-3.5"
                />
                <span className={isChecked ? 'font-semibold text-forest' : 'text-charcoal group-hover:text-forest'}>
                  {range.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Size Filter */}
      <div className="space-y-3 pt-6 border-t border-stone-light/40">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-forest text-offwhite border-forest'
                    : 'bg-white text-charcoal border-stone-light/60 hover:border-forest/50'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Rating Filter */}
      <div className="space-y-3 pt-6 border-t border-stone-light/40">
        <h4 className="text-xs uppercase tracking-brand font-semibold text-charcoal">
          Customer Rating
        </h4>
        <div className="space-y-2">
          {ratingOptions.map((opt) => {
            const isChecked = minRating === opt.value;
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating-filter"
                  checked={isChecked}
                  onChange={() => onSelectMinRating(opt.value)}
                  className="accent-forest w-3.5 h-3.5"
                />
                <span className={`flex items-center gap-1.5 ${isChecked ? 'font-semibold text-forest' : 'text-charcoal group-hover:text-forest'}`}>
                  {opt.value > 0 && <Star size={12} className="fill-forest text-forest" />}
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white/70 border border-stone-light/60 p-6 h-fit sticky top-36">
        {content}
      </aside>

      {/* Mobile / Tablet Filter Drawer Modal */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={onCloseMobile} />
          
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-[#F7F5F0] border-r border-stone-light p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
              <div className="flex justify-between items-center pb-4 border-b border-stone-light/60 mb-6">
                <span className="font-serif text-lg font-bold tracking-wider text-charcoal">
                  REFINE SEARCH
                </span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 text-stone hover:text-charcoal"
                >
                  <X size={20} />
                </button>
              </div>

              {content}

              <div className="mt-8 pt-6 border-t border-stone-light/60">
                <button
                  onClick={onCloseMobile}
                  className="w-full bg-forest text-offwhite py-3 text-xs uppercase tracking-brand font-semibold shadow-xs hover:bg-forest-light transition-colors"
                >
                  APPLY FILTERS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
