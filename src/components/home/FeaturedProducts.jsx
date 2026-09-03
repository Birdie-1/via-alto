import React from 'react';
import { PRODUCTS, formatPrice } from '../../data/products';
import StarRating from '../ui/StarRating';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function FeaturedProducts({ onAddToCart, onSelectProduct, onNavigateToShop, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  // 4 Featured products matching the mockup
  const featuredIds = [1, 7, 4, 11]; // Alpine 35L, Terra Shoes, Alpine Shell, Trekking Poles
  const featuredProducts = featuredIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-t border-stone-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-stone-light/60 pb-6">
          <div>
            <span className="text-xs uppercase tracking-brand font-semibold text-forest">
              {t.feat_tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mt-1">
              {t.feat_title}
            </h2>
            <p className="text-sm text-stone font-sans italic mt-1">
              {t.feat_quote}
            </p>
          </div>

          <button
            onClick={onNavigateToShop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-brand font-bold text-forest hover:text-forest-light transition-colors mt-4 md:mt-0 group cursor-pointer"
          >
            <span>{t.feat_view_all}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Products Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => {
            const productName = lang === 'th' ? product.name_th || product.name : product.name;
            const productCategory = lang === 'th' ? product.category_th || product.category : product.category;
            const productBadge = lang === 'th' ? product.badge_th || product.badge : product.badge;

            return (
              <div
                key={product.id}
                className="group bg-white border border-stone-light/60 hover:border-forest/50 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                {/* Product Image Area */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square overflow-hidden bg-[#F7F5F0] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={productName}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  {productBadge && (
                    <div className="absolute top-3 left-3 bg-forest text-offwhite text-[9px] uppercase font-bold tracking-brand px-2.5 py-1 shadow-xs">
                      {productBadge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-brand-wide font-semibold text-stone">
                      {productCategory}
                    </span>
                    
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-sans text-base font-semibold text-charcoal group-hover:text-forest transition-colors cursor-pointer mt-1 line-clamp-1"
                    >
                      {productName}
                    </h3>

                    <div className="mt-2.5">
                      <StarRating
                        rating={product.rating}
                        reviewsCount={product.reviewsCount}
                        size="xs"
                      />
                    </div>
                  </div>

                  {/* Price & Quick Add Button Bar */}
                  <div className="mt-5 pt-4 border-t border-stone-light/40 flex items-center justify-between">
                    <div>
                      <span className="text-base sm:text-lg font-bold text-charcoal font-sans">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-9 h-9 bg-forest text-offwhite flex items-center justify-center hover:bg-forest-light active:scale-95 transition-all shadow-xs cursor-pointer"
                      title={t.card_add_to_bag}
                      aria-label={`Add ${productName} to Bag`}
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
