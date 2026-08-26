import React from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({
  products = [],
  totalCount = 0,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount = 0,
  onAddToCart,
  onQuickView,
  wishlist = [],
  onToggleWishlist,
  onResetFilters
}) {
  return (
    <div className="flex-1">
      {/* Top Bar: Count, Sort Dropdown & Mobile Filter Trigger */}
      <div className="bg-white/70 border border-stone-light/60 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Product Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-brand font-bold text-charcoal">
            {products.length} {products.length === 1 ? 'PRODUCT' : 'PRODUCTS'} AVAILABLE
          </span>
          {activeFilterCount > 0 && (
            <span className="text-[11px] text-forest font-semibold">
              ({activeFilterCount} active filters)
            </span>
          )}
        </div>

        {/* Right: Mobile Filter Button & Sort By */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-brand font-semibold bg-forest text-offwhite border border-forest cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-forest text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone font-sans hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-stone-light/80 px-3 py-2 pr-8 text-xs font-sans font-medium text-charcoal focus:outline-none focus:border-forest cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone">
                <ArrowUpDown size={12} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Display: 3 Columns on Desktop, 2 on Tablet/Mobile */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white/60 border border-stone-light/60 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-beige mx-auto flex items-center justify-center text-forest">
            <SlidersHorizontal size={20} />
          </div>
          <h3 className="font-serif text-2xl text-charcoal">No Matching Equipment</h3>
          <p className="text-xs sm:text-sm text-stone max-w-sm mx-auto font-sans">
            No products match your active filter criteria. Try adjusting the category, price, or size filters.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-2 bg-forest text-offwhite px-6 py-2.5 text-xs uppercase tracking-brand font-semibold hover:bg-forest-light transition-colors cursor-pointer"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
