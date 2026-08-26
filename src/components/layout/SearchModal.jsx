import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onNavigateToShop }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-offwhite w-full max-w-2xl border border-stone-light/60 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-light/50 flex items-center gap-3">
          <Search className="text-forest shrink-0" size={22} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search equipment, shells, boots, packs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-charcoal placeholder:text-stone text-base sm:text-lg focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone hover:text-charcoal p-1"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-brand font-medium text-stone hover:text-forest px-2 py-1 ml-2"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase tracking-brand font-semibold text-stone mb-3">
                Suggested Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Backpacks', 'Alpine Shell', 'Trekking Poles', 'Footwear', 'Camping'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 bg-beige/60 hover:bg-beige text-charcoal border border-beige-dark/40 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <p className="text-xs uppercase tracking-brand font-semibold text-stone mb-3">
                Popular Gear
              </p>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.slice(0, 2).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct?.(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 bg-white/60 hover:bg-white border border-stone-light/40 cursor-pointer transition-all hover:border-forest/40"
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" />
                    <div>
                      <h4 className="text-xs font-semibold text-charcoal font-sans">{p.name}</h4>
                      <p className="text-xs text-stone">{formatPrice(p.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-brand font-semibold text-stone mb-3">
                {filteredProducts.length} Results Found
              </p>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct?.(p);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-white/60 hover:bg-white border border-stone-light/40 hover:border-forest/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-cover" />
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-forest">
                        {p.category}
                      </span>
                      <h4 className="text-sm font-medium text-charcoal group-hover:text-forest transition-colors font-sans">
                        {p.name}
                      </h4>
                      <p className="text-xs text-stone font-sans">{formatPrice(p.price)}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-stone group-hover:text-forest transition-colors group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-stone font-sans">No products found for "{query}"</p>
              <button
                onClick={() => {
                  onNavigateToShop();
                  onClose();
                }}
                className="mt-3 text-xs uppercase tracking-brand text-forest hover:underline font-semibold"
              >
                Browse All Equipment →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
