import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  MapPin,
  CreditCard,
  QrCode
} from 'lucide-react';
import Button from '../components/ui/Button';
import { formatPrice } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

export default function OrderConfirmationPage({
  order,
  user,
  onNavigate,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center space-y-4 max-w-md bg-white border border-stone-light p-8">
          <Package size={36} className="text-stone mx-auto" />
          <h2 className="font-serif text-2xl text-charcoal">No Order Found</h2>
          <p className="text-xs text-stone">
            You have not placed an order in this active session.
          </p>
          <Button variant="primary" onClick={() => onNavigate('shop')}>
            {t.conf_continue_shopping}
          </Button>
        </div>
      </div>
    );
  }

  const {
    orderId,
    date,
    items = [],
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingFee,
    discount = 0,
    codFee = 0,
    total,
    pointsEarned = Math.floor(total / 100)
  } = order;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* 1. Celebratory Success Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest text-offwhite shadow-lg animate-bounce duration-1000">
          <CheckCircle2 size={42} strokeWidth={2.2} />
        </div>

        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-forest uppercase">
            {t.conf_order_number}: {orderId}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mt-1">
            {t.conf_title}
          </h1>
          <p className="text-xs sm:text-sm text-stone mt-2 font-sans">
            {t.conf_subtitle}
          </p>
        </div>
      </div>

      {/* 2. Main Order Detail Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Logistics & Items */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status & Delivery Timeline */}
          <div className="bg-white border border-stone-light p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-light/60 pb-3">
              <span className="text-xs font-mono font-bold text-charcoal uppercase">
                {t.conf_order_date}: {date}
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold uppercase tracking-wider">
                PROCESSING
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone flex items-center gap-1.5">
                  <Truck size={13} className="text-forest" />
                  {t.conf_est_delivery}
                </span>
                <p className="font-semibold text-charcoal">
                  {t.conf_est_delivery_val}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone flex items-center gap-1.5">
                  <CreditCard size={13} className="text-forest" />
                  {t.conf_payment_method}
                </span>
                <p className="font-semibold text-charcoal">
                  {paymentMethod === 'promptpay'
                    ? 'PromptPay QR (Verified)'
                    : paymentMethod === 'card'
                    ? 'Credit / Debit Card (256-Bit SSL)'
                    : 'Cash on Delivery (COD)'}
                </p>
              </div>
            </div>

            {shippingAddress && (
              <div className="pt-3 border-t border-stone-light/60 space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone flex items-center gap-1.5">
                  <MapPin size={13} className="text-forest" />
                  {t.conf_delivery_address}
                </span>
                <p className="font-semibold text-charcoal">
                  {shippingAddress.fullName} • {shippingAddress.telNo}
                </p>
                <p className="text-stone">
                  {shippingAddress.address1}
                  {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''},{' '}
                  {shippingAddress.district}, {shippingAddress.province}{' '}
                  {shippingAddress.postalCode}
                </p>
              </div>
            )}
          </div>

          {/* Items in this Order */}
          <div className="bg-white border border-stone-light p-6 space-y-4 shadow-2xs">
            <h3 className="font-serif text-sm font-bold tracking-wide uppercase text-charcoal flex items-center gap-2 border-b border-stone-light/60 pb-3">
              <ShoppingBag size={16} className="text-forest" />
              {t.conf_items_ordered} ({items.length})
            </h3>

            <div className="divide-y divide-stone-light/40 space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover bg-[#F7F5F0] border border-stone-light/60 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-charcoal">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone mt-0.5">
                        {item.color && (
                          <span className="inline-flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            <span>{lang === 'th' ? item.color.name_th || item.color.name : item.color.name}</span>
                          </span>
                        )}
                        {item.color && <span>•</span>}
                        <span>{item.size || 'Standard'}</span>
                        <span>•</span>
                        <span className="font-mono font-bold text-charcoal">Qty: {item.qty}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-charcoal font-mono shrink-0">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Financials & Points & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Alpine Points Earned Card */}
          <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-6 shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/15 text-[11px] font-mono tracking-wider font-bold">
                <Sparkles size={13} className="text-[#E8DDCC]" />
                {t.conf_points_earned}
              </div>
              <div className="font-serif text-3xl font-bold text-[#E8DDCC]">
                +{pointsEarned} PTS
              </div>
              <p className="text-xs text-white/80 font-sans">
                {t.conf_points_desc}
              </p>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white border border-stone-light p-6 space-y-3 shadow-2xs text-xs">
            <div className="flex justify-between text-stone">
              <span>{t.checkout_subtotal}</span>
              <span className="font-mono text-charcoal">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-stone">
              <span>{t.checkout_shipping_fee}</span>
              <span className="font-mono text-charcoal">
                {shippingFee === 0 ? t.checkout_shipping_free : formatPrice(shippingFee)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>{t.checkout_discount}</span>
                <span className="font-mono">-{formatPrice(discount)}</span>
              </div>
            )}

            {codFee > 0 && (
              <div className="flex justify-between text-stone">
                <span>{t.checkout_cod_fee}</span>
                <span className="font-mono text-charcoal">+{formatPrice(codFee)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-stone-light/60 flex justify-between items-baseline">
              <span className="font-serif text-base font-bold text-charcoal uppercase">
                {t.checkout_grand_total}
              </span>
              <span className="font-sans text-2xl font-bold text-forest">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('account')}
            >
              {t.conf_view_orders}
            </Button>

            <Button
              variant="outline"
              size="md"
              className="w-full justify-center"
              onClick={() => onNavigate('shop')}
            >
              {t.conf_continue_shopping}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
