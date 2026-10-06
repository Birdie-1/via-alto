import React from 'react';
import { Eye } from 'lucide-react';
import ProductCard from './ProductCard';

export default function RecentlyViewed({
  products = [],
  onAddToCart,
  onQuickView,
  onSelectProduct,
  wishlist = [],
  onToggleWishlist,
  comparedProducts = [],
  onToggleCompare,
  lang = 'en'
}) {
  if (!products || products.length === 0) return null;

  const handleQuickView = onQuickView || onSelectProduct;

  const gridColsClass =
    products.length === 1
      ? 'grid-cols-1 max-w-sm'
      : products.length === 2
      ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
      : products.length === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <section className="mt-16 pt-12 border-t border-stone-light/60 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#183C32]/80 font-semibold mb-1">
            <Eye className="w-3.5 h-3.5 text-[#183C32]" />
            <span>{lang === 'th' ? 'ประวัติการเข้าชมของคุณ' : 'YOUR BROWSING HISTORY'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold">
            {lang === 'th' ? 'สินค้าที่คุณเพิ่งดูล่าสุด' : 'Recently Viewed Gear'}
          </h3>
        </div>
      </div>

      <div className={`grid ${gridColsClass} gap-6`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={handleQuickView}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            isCompared={comparedProducts.some((p) => p.id === product.id)}
            onToggleCompare={onToggleCompare}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}

