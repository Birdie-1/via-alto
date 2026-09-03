import React, { useState } from 'react';
import { X, Check, ShoppingBag, Shield, Truck, RotateCcw } from 'lucide-react';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function ProductDetailModal({ product, onClose, onAddToCart, lang = 'en' }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!product) return null;

  const productName = lang === 'th' ? product.name_th || product.name : product.name;
  const productCategory = lang === 'th' ? product.category_th || product.category : product.category;
  const productBadge = lang === 'th' ? product.badge_th || product.badge : product.badge;
  const productShortDesc = lang === 'th' ? product.shortDesc_th || product.shortDesc : product.shortDesc;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-3xl border border-stone-light/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
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
          {/* Product Image Area */}
          <div className="relative aspect-square md:aspect-auto bg-white border-b md:border-b-0 md:border-r border-stone-light/60 overflow-hidden">
            <img
              src={product.image}
              alt={productName}
              className="w-full h-full object-cover object-center"
            />
            {productBadge && (
              <div className="absolute top-4 left-4 bg-forest text-offwhite text-[10px] uppercase font-bold tracking-brand px-3 py-1 shadow-xs">
                {productBadge}
              </div>
            )}
          </div>

          {/* Product Details Area */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-brand font-semibold text-stone">
                  {productCategory}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">
                  {productName}
                </h2>
              </div>

              <div className="flex items-center space-x-3">
                <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
                <span className="text-stone-light">•</span>
                <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  IN STOCK
                </span>
              </div>

              <div className="text-2xl font-bold text-charcoal font-sans">
                {formatPrice(product.price)}
              </div>

              <p className="text-xs sm:text-sm text-stone font-sans leading-relaxed">
                {productShortDesc || product.description}
              </p>

              {/* Sizing Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-light/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-brand text-charcoal">
                      {t.modal_size}
                    </span>
                    <span className="text-stone">{t.modal_selected} {selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-medium uppercase border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-forest text-offwhite border-forest'
                            : 'bg-white text-stone border-stone-light hover:border-forest/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <span className="block text-xs font-semibold uppercase tracking-brand text-charcoal">
                  {t.modal_qty}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-stone-light bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-stone hover:text-charcoal hover:bg-stone-light/20 cursor-pointer font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-stone hover:text-charcoal hover:bg-stone-light/20 cursor-pointer font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Value Props */}
            <div className="space-y-4 pt-4 border-t border-stone-light/60">
              <Button
                variant="primary"
                size="md"
                onClick={handleAdd}
                className="w-full py-3 text-xs"
                icon={ShoppingBag}
              >
                {t.card_add_to_bag} • {formatPrice(product.price * quantity)}
              </Button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-stone text-center">
                <div className="flex flex-col items-center gap-1">
                  <Shield size={14} className="text-forest" />
                  <span>{t.modal_lifetime}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-forest" />
                  <span>{t.modal_express}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={14} className="text-forest" />
                  <span>{t.modal_return}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
