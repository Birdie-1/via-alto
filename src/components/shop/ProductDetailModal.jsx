import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  Scale,
  Layers,
  Droplets,
  Compass,
  Maximize2,
  Check
} from 'lucide-react';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function ProductDetailModal({ product, onClose, onAddToCart, lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'sizeguide'
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState(product?.selectedColor || product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || 'One Size');
      setSelectedColor(product.selectedColor || product.colors?.[0] || null);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const productName = lang === 'th' ? product.name_th || product.name : product.name;
  const productCategory = lang === 'th' ? product.category_th || product.category : product.category;
  const productBadge = lang === 'th' ? product.badge_th || product.badge : product.badge;
  const productShortDesc = lang === 'th' ? product.shortDesc_th || product.shortDesc : product.shortDesc;

  const activeImage = selectedColor?.image || product.image;
  const specs = product.specs || {};
  const isFootwear = product.categoryId === 'footwear';
  const isApparel = product.categoryId === 'clothing';

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const selectedColorName = selectedColor
    ? (lang === 'th' ? selectedColor.name_th || selectedColor.name : selectedColor.name)
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-4xl border border-stone-light/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-charcoal rounded-full border border-stone-light/60 transition-all cursor-pointer shadow-xs"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          {/* Product Image Area */}
          <div className="md:col-span-5 relative bg-white border-b md:border-b-0 md:border-r border-stone-light/60 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-square w-full">
              <img
                src={activeImage}
                alt={productName}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              {productBadge && (
                <div className="absolute top-4 left-4 bg-forest text-offwhite text-[10px] uppercase font-bold tracking-brand px-3 py-1 shadow-xs">
                  {productBadge}
                </div>
              )}
            </div>

            {/* Micro specs pill in image corner */}
            {specs.weight && (
              <div className="p-3 bg-[#F7F5F0] border-t border-stone-light/60 flex items-center justify-between text-[11px] text-stone font-mono">
                <span className="flex items-center gap-1.5">
                  <Scale size={13} className="text-forest" />
                  <span>{specs.weight}</span>
                </span>
                <span>{specs.waterproofRating ? 'WEATHER TESTED' : 'ALPINE GRADE'}</span>
              </div>
            )}
          </div>

          {/* Product Details & Tabs Area */}
          <div className="md:col-span-7 flex flex-col justify-between">
            
            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-stone-light/60 bg-white px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3.5 px-3 text-xs uppercase tracking-brand font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-forest text-forest'
                    : 'border-transparent text-stone hover:text-charcoal'
                }`}
              >
                {t.modal_tab_overview}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`py-3.5 px-3 text-xs uppercase tracking-brand font-bold transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-forest text-forest'
                    : 'border-transparent text-stone hover:text-charcoal'
                }`}
              >
                {t.modal_tab_specs}
              </button>

              {(isApparel || isFootwear) && (
                <button
                  onClick={() => setActiveTab('sizeguide')}
                  className={`py-3.5 px-3 text-xs uppercase tracking-brand font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'sizeguide'
                      ? 'border-forest text-forest'
                      : 'border-transparent text-stone hover:text-charcoal'
                  }`}
                >
                  {t.modal_tab_sizeguide}
                </button>
              )}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="p-6 sm:p-8 space-y-5 flex-1 animate-in fade-in duration-200">
                <div className="space-y-3">
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

                  {/* Colorway Selector */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-stone-light/40">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold uppercase tracking-brand text-charcoal">
                          {t.modal_color}:
                        </span>
                        <span className="font-medium text-forest">{selectedColorName}</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {product.colors.map((color) => {
                          const isSelected = selectedColor?.id === color.id;
                          const cName = lang === 'th' ? color.name_th || color.name : color.name;
                          return (
                            <button
                              key={color.id}
                              type="button"
                              onClick={() => setSelectedColor(color)}
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 border text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-white border-forest ring-1 ring-forest text-charcoal font-semibold shadow-xs'
                                  : 'bg-white border-stone-light text-stone hover:border-forest/50'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span>{cName}</span>
                              {isSelected && <Check size={12} className="text-forest" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

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
                            className={`px-3.5 py-1.5 text-xs font-medium uppercase border transition-all cursor-pointer ${
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
              </div>
            )}

            {/* TAB 2: TECHNICAL SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="p-6 sm:p-8 space-y-5 flex-1 animate-in fade-in duration-200 overflow-y-auto max-h-[420px]">
                <div className="border-b border-stone-light/60 pb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    {productName}
                  </h3>
                  <span className="text-xs uppercase tracking-brand text-forest font-semibold">
                    ALPINE PERFORMANCE SPECIFICATIONS
                  </span>
                </div>

                <div className="space-y-3 divide-y divide-stone-light/40 text-xs">
                  {/* Weight */}
                  <div className="pt-3 first:pt-0 flex items-start justify-between">
                    <span className="font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <Scale size={14} className="text-forest" />
                      <span>{t.spec_weight}</span>
                    </span>
                    <span className="text-stone font-mono font-semibold text-right">
                      {specs.weight || 'Standard Grade'}
                    </span>
                  </div>

                  {/* Materials */}
                  <div className="pt-3 flex items-start justify-between gap-4">
                    <span className="font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                      <Layers size={14} className="text-forest" />
                      <span>{t.spec_materials}</span>
                    </span>
                    <span className="text-stone text-right">
                      {lang === 'th' ? specs.materials_th || specs.materials : specs.materials}
                    </span>
                  </div>

                  {/* Waterproof */}
                  <div className="pt-3 flex items-start justify-between gap-4">
                    <span className="font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                      <Droplets size={14} className="text-forest" />
                      <span>{t.spec_waterproof}</span>
                    </span>
                    <span className="text-stone font-mono text-right">
                      {specs.waterproofRating || 'N/A'}
                    </span>
                  </div>

                  {/* Dimensions */}
                  <div className="pt-3 flex items-start justify-between gap-4">
                    <span className="font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                      <Maximize2 size={14} className="text-forest" />
                      <span>{t.spec_dimensions}</span>
                    </span>
                    <span className="text-stone text-right">
                      {specs.dimensions || 'Standard Fit'}
                    </span>
                  </div>

                  {/* Best Use */}
                  <div className="pt-3 flex items-start justify-between gap-4">
                    <span className="font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                      <Compass size={14} className="text-forest" />
                      <span>{t.spec_best_use}</span>
                    </span>
                    <span className="text-forest font-semibold text-right">
                      {lang === 'th' ? specs.bestUse_th || specs.bestUse : specs.bestUse}
                    </span>
                  </div>

                  {/* Design Origin */}
                  <div className="pt-3 flex items-start justify-between">
                    <span className="font-semibold text-charcoal uppercase tracking-wider">
                      {t.spec_origin}
                    </span>
                    <span className="text-stone font-mono text-right">
                      {t.spec_origin_val}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SIZE & FIT GUIDE */}
            {activeTab === 'sizeguide' && (
              <div className="p-6 sm:p-8 space-y-5 flex-1 animate-in fade-in duration-200 overflow-y-auto max-h-[420px]">
                {isApparel && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal">
                        {t.sizeguide_title_apparel}
                      </h4>
                      <p className="text-xs text-stone mt-0.5">
                        {t.sizeguide_tip_apparel}
                      </p>
                    </div>

                    <table className="w-full text-xs text-left border border-stone-light bg-white">
                      <thead className="bg-beige/40 text-charcoal uppercase font-bold border-b border-stone-light">
                        <tr>
                          <th className="p-2.5">Size</th>
                          <th className="p-2.5">{t.sizeguide_chest}</th>
                          <th className="p-2.5">{t.sizeguide_waist}</th>
                          <th className="p-2.5">{t.sizeguide_sleeve}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-light/50 font-mono">
                        <tr>
                          <td className="p-2.5 font-bold text-forest">S</td>
                          <td className="p-2.5">90 – 96</td>
                          <td className="p-2.5">76 – 81</td>
                          <td className="p-2.5">84</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">M</td>
                          <td className="p-2.5">97 – 104</td>
                          <td className="p-2.5">82 – 89</td>
                          <td className="p-2.5">86</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">L</td>
                          <td className="p-2.5">105 – 112</td>
                          <td className="p-2.5">90 – 97</td>
                          <td className="p-2.5">89</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">XL</td>
                          <td className="p-2.5">113 – 120</td>
                          <td className="p-2.5">98 – 107</td>
                          <td className="p-2.5">91</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {isFootwear && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal">
                        {t.sizeguide_title_footwear}
                      </h4>
                      <div className="p-3 bg-beige/40 border border-beige-dark/50 text-xs text-forest space-y-1">
                        <span className="font-bold block">🏔️ ALPINE FIT ADVISORY:</span>
                        <p className="text-charcoal leading-relaxed">
                          {t.sizeguide_tip_footwear}
                        </p>
                      </div>
                    </div>

                    <table className="w-full text-xs text-left border border-stone-light bg-white">
                      <thead className="bg-beige/40 text-charcoal uppercase font-bold border-b border-stone-light">
                        <tr>
                          <th className="p-2.5">{t.sizeguide_eu}</th>
                          <th className="p-2.5">{t.sizeguide_us}</th>
                          <th className="p-2.5">{t.sizeguide_foot_length}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-light/50 font-mono">
                        <tr>
                          <td className="p-2.5 font-bold text-forest">EU 40</td>
                          <td className="p-2.5">US 7.5 / 9.0</td>
                          <td className="p-2.5">25.0 cm</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">EU 41</td>
                          <td className="p-2.5">US 8.0 / 9.5</td>
                          <td className="p-2.5">25.8 cm</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">EU 42</td>
                          <td className="p-2.5">US 8.5 / 10.0</td>
                          <td className="p-2.5">26.5 cm</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">EU 43</td>
                          <td className="p-2.5">US 9.5 / 11.0</td>
                          <td className="p-2.5">27.3 cm</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">EU 44</td>
                          <td className="p-2.5">US 10.5 / 12.0</td>
                          <td className="p-2.5">28.0 cm</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-forest">EU 45</td>
                          <td className="p-2.5">US 11.5 / 13.0</td>
                          <td className="p-2.5">28.8 cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Actions & Value Props (Always accessible at bottom) */}
            <div className="p-6 bg-white border-t border-stone-light/60 space-y-4">
              <Button
                variant="primary"
                size="md"
                onClick={handleAdd}
                className="w-full py-3 text-xs"
                icon={ShoppingBag}
              >
                {t.card_add_to_bag} • {formatPrice(product.price * quantity)}
              </Button>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] text-stone text-center">
                <div className="flex flex-col items-center gap-1">
                  <Shield size={13} className="text-forest" />
                  <span>{t.modal_lifetime}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck size={13} className="text-forest" />
                  <span>{t.modal_express}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={13} className="text-forest" />
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
