import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onNavigateToShop, lang = 'en' }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.name_th && p.name_th.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          (p.category_th && p.category_th.toLowerCase().includes(q)) ||
          p.shortDesc.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-2xl border border-stone-light shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-light flex items-center space-x-3 bg-white">
          <Search size={22} className="text-forest shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.search_placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg bg-transparent font-sans text-charcoal placeholder:text-stone focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone hover:text-charcoal cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone hover:text-charcoal cursor-pointer border border-stone-light/60 rounded-full"
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results or Quick Suggestions */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-brand font-semibold text-stone block">
                {t.search_suggested}
              </span>
              <div className="flex flex-wrap gap-2">
                {['Backpacks', 'Alpine Shell', 'Trekking Poles', 'Footwear', 'Tent', 'Merino'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-xs px-3 py-1.5 bg-white border border-stone-light text-charcoal hover:border-forest transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-light/40">
                <span className="text-[11px] uppercase tracking-brand font-semibold text-stone block mb-3">
                  {t.search_popular}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((p) => {
                    const pName = lang === 'th' ? p.name_th || p.name : p.name;
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(p)}
                        className="flex items-center space-x-3 p-2 bg-white border border-stone-light/50 hover:border-forest cursor-pointer transition-colors"
                      >
                        <img src={p.image} alt={pName} className="w-12 h-12 object-cover bg-offwhite" />
                        <div>
                          <h5 className="text-xs font-semibold text-charcoal line-clamp-1">{pName}</h5>
                          <span className="text-[11px] font-bold text-forest">{formatPrice(p.price)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-brand font-semibold text-stone block">
                {filteredProducts.length} {t.search_found}
              </span>
              <div className="divide-y divide-stone-light/40">
                {filteredProducts.map((product) => {
                  const pName = lang === 'th' ? product.name_th || product.name : product.name;
                  const pCat = lang === 'th' ? product.category_th || product.category : product.category;
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelect(product)}
                      className="py-3 flex items-center justify-between hover:bg-beige/30 px-2 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={pName}
                          className="w-14 h-14 object-cover bg-white border border-stone-light/60"
                        />
                        <div>
                          <span className="text-[10px] uppercase tracking-brand font-semibold text-stone">
                            {pCat}
                          </span>
                          <h4 className="font-sans text-sm font-semibold text-charcoal">{pName}</h4>
                          <span className="text-xs text-stone line-clamp-1">{product.shortDesc}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-sans font-bold text-sm text-charcoal block">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] text-forest font-semibold uppercase tracking-wider">
                          View →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-stone font-sans">
                {t.search_no_results} "{query}".
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToShop();
                }}
                className="text-xs uppercase tracking-brand font-bold text-forest hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t.search_browse_all}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
