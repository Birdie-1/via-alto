import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { formatPrice } from '../../data/products';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-4xl border border-stone-light shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-charcoal rounded-full border border-stone-light/60 transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-white flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-stone-light/60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[420px] object-contain object-center"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-forest text-offwhite text-[10px] uppercase font-bold tracking-brand px-3 py-1">
                {product.badge}
              </div>
            )}
          </div>

          {/* Right: Details & Order Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Breadcrumb */}
              <div>
                <span className="text-[10px] uppercase tracking-brand-wide font-bold text-forest">
                  VIA ALTO • {product.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between border-b border-stone-light/60 pb-3">
                <span className="text-2xl font-bold text-charcoal font-sans">
                  {formatPrice(product.price)}
                </span>
                <StarRating
                  rating={product.rating}
                  reviewsCount={product.reviewsCount}
                  size="sm"
                />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal-light font-sans leading-relaxed">
                {product.description || product.shortDesc}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-brand font-semibold text-charcoal">
                      Size
                    </span>
                    <span className="text-xs text-stone font-sans">
                      Selected: <strong className="text-charcoal">{selectedSize}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-forest text-offwhite border-forest'
                            : 'bg-white text-charcoal border-stone-light/60 hover:border-forest/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-brand font-semibold text-charcoal">
                  Quantity
                </span>
                <div className="flex items-center border border-stone-light w-fit bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone hover:text-charcoal hover:bg-beige"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-charcoal">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone hover:text-charcoal hover:bg-beige"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-stone-light/60">
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  size="md"
                  onClick={handleAdd}
                  icon={ShoppingBag}
                >
                  ADD TO BAG • {formatPrice(product.price * quantity)}
                </Button>

                <button
                  onClick={() => onToggleWishlist?.(product.id)}
                  className={`p-3 border border-stone-light transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white hover:bg-beige/40 text-charcoal'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? 'fill-red-600' : ''}
                  />
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] uppercase tracking-wider text-stone text-center">
                <div className="flex flex-col items-center gap-1 p-2 bg-white/60 border border-stone-light/30">
                  <ShieldCheck size={14} className="text-forest" />
                  <span>Lifetime Craft</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/60 border border-stone-light/30">
                  <Truck size={14} className="text-forest" />
                  <span>Free Express</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/60 border border-stone-light/30">
                  <RotateCcw size={14} className="text-forest" />
                  <span>30-Day Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
