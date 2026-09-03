import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Scale, Check } from 'lucide-react';
import StarRating from '../ui/StarRating';
import { formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  isCompared = false,
  onToggleCompare,
  lang = 'en'
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const productName = lang === 'th' ? product.name_th || product.name : product.name;
  const productCategory = lang === 'th' ? product.category_th || product.category : product.category;
  const productBadge = lang === 'th' ? product.badge_th || product.badge : product.badge;

  // Active image based on selected colorway
  const activeImage = selectedColor?.image || product.image;

  const handleColorClick = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color);
  };

  const handleAdd = () => {
    onAddToCart(product, 1, null, selectedColor);
  };

  return (
    <div className="group bg-white border border-stone-light/60 hover:border-forest/50 transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md relative">
      
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-[#F7F5F0]">
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {productBadge && (
          <div className="absolute top-3 left-3 bg-forest text-offwhite text-[9px] uppercase font-bold tracking-brand px-2 py-1 shadow-xs z-10">
            {productBadge}
          </div>
        )}

        {/* Action icons top right (Wishlist + Compare) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isWishlisted
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-white/85 hover:bg-white text-stone hover:text-charcoal border border-stone-light/60'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist"
          >
            <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
          </button>

          {/* Compare Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare?.(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isCompared
                ? 'bg-forest text-offwhite border border-forest font-bold'
                : 'bg-white/85 hover:bg-white text-stone hover:text-forest border border-stone-light/60'
            }`}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            aria-label="Compare"
          >
            {isCompared ? <Check size={14} /> : <Scale size={14} />}
          </button>
        </div>

        {/* Quick View Hover Overlay Button (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView({ ...product, selectedColor })}
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
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-brand-wide font-semibold text-stone">
              {productCategory}
            </span>

            {/* Micro weight indicator */}
            {product.specs?.weight && (
              <span className="text-[10px] text-stone/80 font-mono">
                {product.specs.weight}
              </span>
            )}
          </div>
          
          <h3
            onClick={() => onQuickView({ ...product, selectedColor })}
            className="font-sans text-base font-semibold text-charcoal group-hover:text-forest transition-colors cursor-pointer mt-1 line-clamp-1"
          >
            {productName}
          </h3>

          {/* Interactive Color Swatches Row */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => {
                const isSelected = selectedColor?.id === c.id;
                const cName = lang === 'th' ? c.name_th || c.name : c.name;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={(e) => handleColorClick(e, c)}
                    className={`w-3.5 h-3.5 rounded-full border border-black/20 transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-offset-1 ring-forest scale-110'
                        : 'opacity-80 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={cName}
                    aria-label={cName}
                  />
                );
              })}
              <span className="text-[10px] text-stone font-sans ml-1">
                {product.colors.length} {t.card_colors_available}
              </span>
            </div>
          )}

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
            onClick={handleAdd}
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
