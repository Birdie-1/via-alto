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
  setQuickViewProduct,
  lang = 'en'
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Sidebar Filter States
  const [filters, setFilters] = useState({
    category: initialCategory,
    priceRange: 'all',
    size: 'all',
    minRating: 0
  });

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const handleCategoryNavSelect = (catId) => {
    setSelectedCategory(catId);
    setFilters((prev) => ({ ...prev, category: catId }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'category') {
        setSelectedCategory(value);
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setFilters({
      category: 'all',
      priceRange: 'all',
      size: 'all',
      minRating: 0
    });
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category filter
      if (filters.category !== 'all' && product.categoryId !== filters.category) {
        return false;
      }

      // 2. Price filter
      if (filters.priceRange === 'under-1000' && product.price >= 1000) return false;
      if (filters.priceRange === '1000-2000' && (product.price < 1000 || product.price > 2000)) return false;
      if (filters.priceRange === '2000-3000' && (product.price < 2000 || product.price > 3000)) return false;
      if (filters.priceRange === '3000-plus' && product.price < 3000) return false;

      // 3. Size filter
      if (filters.size !== 'all' && (!product.sizes || !product.sizes.includes(filters.size))) {
        return false;
      }

      // 4. Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') {
        const nameA = lang === 'th' ? a.name_th || a.name : a.name;
        const nameB = lang === 'th' ? b.name_th || b.name : b.name;
        return nameA.localeCompare(nameB);
      }
      // 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters, sortBy, lang]);

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.size !== 'all' ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen">
      {/* 1. Shop Header */}
      <ShopHeader totalProducts={PRODUCTS.length} lang={lang} />

      {/* 2. Sticky Horizontal Category Navigation */}
      <CategoryNav
        activeCategory={selectedCategory}
        onSelectCategory={handleCategoryNavSelect}
        lang={lang}
      />

      {/* 3. Main Catalog Area (Filter Sidebar + Responsive Product Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            lang={lang}
          />

          {/* Product Grid */}
          <ProductGrid
            products={filteredAndSortedProducts}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onAddToCart={onAddToCart}
            onQuickView={(product) => setQuickViewProduct(product)}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            activeFilterCount={activeFilterCount}
            onResetFilters={handleResetFilters}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
            lang={lang}
          />
        </div>
      </div>

      {/* 4. Quick View / Product Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
          lang={lang}
        />
      )}
    </div>
  );
}
