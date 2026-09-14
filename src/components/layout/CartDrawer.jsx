import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { formatPrice, PRODUCTS } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';
import { getCartCrossSells } from '../../services/behaviorService';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToShop,
  onCheckout,
  onAddToCart,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const crossSellItems = getCartCrossSells(cartItems, PRODUCTS, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#F7F5F0] border-l border-stone-light/80 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header */}
          <div className="p-6 border-b border-stone-light/60 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-forest" />
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-charcoal">
                {t.cart_title} ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone hover:text-charcoal cursor-pointer rounded-full hover:bg-stone-light/20 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-stone-light/40">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-white border border-stone-light flex items-center justify-center text-stone">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {t.cart_empty}
                </h3>
                <p className="text-xs text-stone max-w-xs font-sans">
                  {t.cart_empty_desc}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="mt-2"
                >
                  {t.cart_explore}
                </Button>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const pName = lang === 'th' ? item.product.name_th || item.product.name : item.product.name;
                const itemImg = item.selectedColor?.image || item.product.image;
                const colorId = item.selectedColor?.id || 'default';
                const colorName = item.selectedColor
                  ? (lang === 'th' ? item.selectedColor.name_th || item.selectedColor.name : item.selectedColor.name)
                  : null;

                return (
                  <div key={`${item.product.id}-${item.selectedSize}-${colorId}-${index}`} className="pt-6 first:pt-0 flex space-x-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 bg-white border border-stone-light/60 shrink-0 overflow-hidden">
                      <img
                        src={itemImg}
                        alt={pName}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-sans text-sm font-semibold text-charcoal">
                            {pName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-stone mt-0.5">
                            {colorName && (
                              <span className="inline-flex items-center gap-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{ backgroundColor: item.selectedColor.hex }}
                                />
                                <span>{colorName}</span>
                              </span>
                            )}
                            {colorName && <span>•</span>}
                            <span>{t.modal_size}: {item.selectedSize}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, colorId)}
                          className="text-stone hover:text-red-700 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-stone-light bg-white">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedSize,
                                colorId,
                                item.quantity - 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-stone hover:text-charcoal cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedSize,
                                colorId,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-stone hover:text-charcoal cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="text-sm font-bold text-charcoal font-sans">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Cart Cross-sells (Step 5 Behavioral Recommendation) */}
            {cartItems.length > 0 && crossSellItems && crossSellItems.length > 0 && (
              <div className="pt-6 mt-6 border-t border-stone-light/60 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
                  <Sparkles size={13} className="text-forest" />
                  <span>{lang === 'th' ? 'อุปกรณ์เสริมแนะนำสำหรับทริปนี้' : 'Recommended Add-ons'}</span>
                </div>

                <div className="space-y-2">
                  {crossSellItems.map((addon) => {
                    const addonName = lang === 'th' && addon.name_th ? addon.name_th : addon.name;
                    return (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between p-2.5 bg-white border border-stone-light/60 rounded-sm"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={addon.image}
                            alt={addonName}
                            className="w-10 h-10 object-contain bg-[#F7F5F0] p-1 rounded border border-stone-light/30 shrink-0"
                            loading="lazy"
                          />
                          <div className="min-w-0 pr-1">
                            <p className="text-xs font-semibold text-charcoal truncate">{addonName}</p>
                            <span className="text-xs font-mono font-bold text-forest">{formatPrice(addon.price)}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddToCart && onAddToCart(addon, 1, addon.sizes?.[0] || 'One Size', addon.colors?.[0] || null)}
                          className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-forest hover:bg-forest-light text-white rounded flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                        >
                          <Plus size={11} />
                          <span>{lang === 'th' ? 'เพิ่ม' : 'Add'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Subtotal & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-light/80 space-y-4 shadow-lg">
              <div className="flex justify-between items-center text-sm font-semibold text-charcoal">
                <span>{t.cart_subtotal}</span>
                <span className="text-xl font-bold font-sans text-forest">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-stone italic">
                {t.cart_tax_note}
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => {
                  onClose();
                  if (onCheckout) onCheckout();
                }}
              >
                {t.cart_checkout}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
