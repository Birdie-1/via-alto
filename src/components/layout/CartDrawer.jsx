import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../data/products';
import Button from '../ui/Button';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToShop
}) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F0] border-l border-stone-light/60 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-stone-light/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} className="text-forest" />
              <h2 className="font-serif text-xl font-bold tracking-wide text-charcoal">
                YOUR BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone hover:text-charcoal cursor-pointer"
              aria-label="Close bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-beige/40 flex items-center justify-center text-forest">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-lg text-charcoal">Your bag is empty</h3>
                <p className="text-xs text-stone max-w-xs mx-auto">
                  Equip yourself with gear built for the highest summits and wildest trails.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onClose();
                      onNavigateToShop();
                    }}
                  >
                    EXPLORE COLLECTION
                  </Button>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3.5 bg-white border border-stone-light/40 hover:border-stone-light transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-offwhite"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-semibold text-charcoal font-sans">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-stone hover:text-red-600 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone uppercase tracking-wider">
                        {item.product.category} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-light">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-0.5 text-xs text-stone hover:bg-beige"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-0.5 text-xs text-stone hover:bg-beige"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-charcoal">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-light/60 bg-white/70 space-y-4">
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="text-stone uppercase tracking-wider text-xs">Estimated Subtotal</span>
                <span className="text-base font-bold text-charcoal">{formatPrice(totalAmount)}</span>
              </div>
              <p className="text-[11px] text-stone leading-tight">
                Shipping and taxes calculated at stage 2 checkout.
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  alert('Checkout flow will be implemented in Stage 2 after design review!');
                }}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
