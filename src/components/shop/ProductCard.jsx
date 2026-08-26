import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { formatPrice } from '../../data/products';
import StarRating from '../ui/StarRating';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-stone-light/60 hover:border-forest/50 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md relative"
    >
      {/* Product Image Box */}
      <div className="relative aspect-square overflow-hidden bg-[#F7F5F0]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge (e.g. BESTSELLER, NEW, 0°C RATED) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-forest text-offwhite text-[9px] uppercase font-bold tracking-brand px-2.5 py-1 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? 'bg-white text-red-600 shadow-md opacity-100'
              : 'bg-white/90 text-charcoal hover:text-forest shadow-xs opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={isWishlisted ? 'fill-red-600 text-red-600' : ''}
          />
        </button>

        {/* Quick View Button overlay on hover */}
        <button
          onClick={() => onQuickView?.(product)}
          className="absolute inset-x-4 bottom-4 py-2 bg-charcoal/90 text-offwhite text-xs font-semibold uppercase tracking-brand flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-forest cursor-pointer shadow-md backdrop-blur-xs"
        >
          <Eye size={14} />
          <span>QUICK VIEW</span>
        </button>
      </div>

      {/* Product Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Category */}
          <span className="text-[10px] uppercase tracking-brand-wide font-semibold text-stone">
            {product.category}
          </span>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView?.(product)}
            className="font-sans text-base font-semibold text-charcoal group-hover:text-forest transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone font-sans line-clamp-2 leading-relaxed">
            “{product.shortDesc}”
          </p>

          {/* Star Rating */}
          <div className="pt-1">
            <StarRating
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              size="xs"
            />
          </div>
        </div>

        {/* Bottom Price & Add to Bag */}
        <div className="pt-4 border-t border-stone-light/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-lg font-bold text-charcoal font-sans">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-transparent hover:bg-forest text-forest hover:text-offwhite border border-forest px-4 py-2 text-xs font-semibold uppercase tracking-brand transition-all duration-200 cursor-pointer active:scale-95 text-center flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={13} />
            <span>ADD TO BAG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
