import React, { useState, useMemo, useEffect } from 'react';
import ShopHeader from '../components/shop/ShopHeader';
import CategoryNav from '../components/shop/CategoryNav';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import ProductDetailModal from '../components/shop/ProductDetailModal';
import { PRODUCTS } from '../data/products';

export default function ShopPage({
  initialCategory = 'all',
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
  quickViewProduct,
  setQuickViewProduct
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync when initialCategory prop changes (e.g. clicked category from Home or Footer)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleToggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedSizes([]);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedSizes.length > 0 ||
    minRating > 0;

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    selectedSizes.length +
    (minRating > 0 ? 1 : 0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // 2. Price filter
      if (selectedPriceRange === 'under-1000' && product.price >= 1000) return false;
      if (selectedPriceRange === '1000-2000' && (product.price < 1000 || product.price > 2000)) return false;
      if (selectedPriceRange === '2000-3000' && (product.price < 2000 || product.price > 3000)) return false;
      if (selectedPriceRange === '3000-plus' && product.price < 3000) return false;

      // 3. Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes?.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // 4. Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // 'featured'
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.id - b.id;
    });
  }, [selectedCategory, selectedPriceRange, selectedSizes, minRating, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0]">
      {/* 1. Page Header */}
      <ShopHeader />

      {/* 2. Category Tab Navigation */}
      <CategoryNav
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* 3. Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Filter Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            onSelectPriceRange={setSelectedPriceRange}
            selectedSizes={selectedSizes}
            onToggleSize={handleToggleSize}
            minRating={minRating}
            onSelectMinRating={setMinRating}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            isOpenOnMobile={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          {/* Right: Product Grid & Sorting */}
          <ProductGrid
            products={filteredProducts}
            totalCount={PRODUCTS.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
            onAddToCart={onAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
          isWishlisted={wishlist.includes(quickViewProduct?.id)}
          onToggleWishlist={onToggleWishlist}
        />
      )}
    </div>
  );
}
