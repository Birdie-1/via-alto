import React from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function ProductGrid({
  products,
  sortBy,
  onSortChange,
  onAddToCart,
  onQuickView,
  onOpenMobileFilters,
  activeFilterCount,
  onResetFilters,
  wishlist = [],
  onToggleWishlist,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const sortOptions = [
    { value: 'featured', label: t.grid_sort_featured },
    { value: 'price-asc', label: t.grid_sort_price_asc },
    { value: 'price-desc', label: t.grid_sort_price_desc },
    { value: 'rating', label: t.grid_sort_rating },
    { value: 'name', label: t.grid_sort_name }
  ];

  return (
    <div className="flex-1 space-y-6">
      {/* Grid Utility Toolbar (Count, Mobile Filter Toggle, Sort Dropdown) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-light/60">
        
        {/* Left: Product Count & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-light text-xs font-semibold uppercase tracking-brand text-charcoal shadow-2xs hover:border-forest transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>{t.grid_filter_btn}</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-forest text-offwhite rounded-full text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs font-semibold text-stone uppercase tracking-brand font-mono">
            {products.length} {t.grid_available}
            {activeFilterCount > 0 && (
              <span className="hidden sm:inline text-forest ml-2 font-normal">
                ({activeFilterCount} {t.grid_active_filters})
              </span>
            )}
          </span>
        </div>

        {/* Right: Sorting Select */}
        <div className="flex items-center space-x-2">
          <label htmlFor="shop-sort" className="text-xs text-stone uppercase tracking-brand font-medium">
            {t.grid_sort}
          </label>
          <select
            id="shop-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white border border-stone-light text-xs font-medium text-charcoal py-1.5 px-3 focus:outline-none focus:border-forest cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid / Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white/40 border border-dashed border-stone-light p-8 space-y-4">
          <h3 className="font-serif text-2xl text-charcoal font-bold">
            {t.grid_no_match}
          </h3>
          <p className="text-sm text-stone max-w-md mx-auto font-sans">
            {t.grid_no_match_desc}
          </p>
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-forest text-offwhite text-xs uppercase tracking-brand font-bold transition-all hover:bg-forest-light shadow-xs cursor-pointer"
          >
            {t.grid_reset_all}
          </button>
        </div>
      )}
    </div>
  );
}
