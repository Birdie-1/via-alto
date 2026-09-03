import React from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import StarRating from '../ui/StarRating';
import { formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const productName = lang === 'th' ? product.name_th || product.name : product.name;
  const productCategory = lang === 'th' ? product.category_th || product.category : product.category;
  const productBadge = lang === 'th' ? product.badge_th || product.badge : product.badge;

  return (
    <div className="group bg-white border border-stone-light/60 hover:border-forest/50 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md relative">
      
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-[#F7F5F0]">
        <img
          src={product.image}
          alt={productName}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {productBadge && (
          <div className="absolute top-3 left-3 bg-forest text-offwhite text-[9px] uppercase font-bold tracking-brand px-2 py-1 shadow-xs z-10">
            {productBadge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-white/80 hover:bg-white text-stone hover:text-charcoal border border-stone-light/60'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Quick View Hover Overlay Button (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 bg-white/95 hover:bg-white text-charcoal text-[11px] uppercase tracking-brand font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Eye size={13} />
            <span>{t.card_quick_view}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-brand-wide font-semibold text-stone">
            {productCategory}
          </span>
          
          <h3
            onClick={() => onQuickView(product)}
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
            className="h-9 px-3.5 bg-forest text-offwhite flex items-center justify-center gap-1.5 hover:bg-forest-light active:scale-95 transition-all text-xs font-semibold uppercase tracking-wider shadow-xs cursor-pointer"
            title={t.card_add_to_bag}
            aria-label={`Add ${productName} to Bag`}
          >
            <ShoppingBag size={14} />
            <span className="hidden sm:inline text-[11px]">{t.card_add_to_bag}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
