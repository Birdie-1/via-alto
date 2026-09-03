import React from 'react';
import { X, Scale, ShoppingBag, Layers, Droplets, Maximize2, Compass, Check } from 'lucide-react';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function CompareModal({
  isOpen,
  onClose,
  comparedProducts = [],
  onRemoveCompare,
  onAddToCart,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-5xl border border-stone-light/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#183C32] text-offwhite p-5 sm:p-6 flex items-center justify-between border-b border-forest-light relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-beige">
              <Scale size={20} />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
                {t.compare_modal_title}
              </h2>
              <p className="text-xs text-beige tracking-wider">
                {t.compare_modal_subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {comparedProducts.length < 2 ? (
            <div className="py-16 text-center space-y-3">
              <Scale size={32} className="text-stone mx-auto" />
              <p className="text-sm text-stone">{t.compare_empty}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b-2 border-forest/40">
                    <th className="p-3 w-40 text-xs uppercase tracking-brand font-bold text-stone bg-beige/30">
                      {t.compare_metric}
                    </th>
                    {comparedProducts.map((p) => {
                      const pName = lang === 'th' ? p.name_th || p.name : p.name;
                      const pCat = lang === 'th' ? p.category_th || p.category : p.category;
                      return (
                        <th key={p.id} className="p-4 text-center bg-white border-l border-stone-light/60 align-top relative">
                          <button
                            onClick={() => onRemoveCompare(p.id)}
                            className="absolute top-2 right-2 p-1 text-stone hover:text-red-600 transition-colors cursor-pointer"
                            title={t.compare_remove}
                          >
                            <X size={14} />
                          </button>

                          <div className="w-28 h-28 mx-auto bg-[#F7F5F0] overflow-hidden border border-stone-light/60 mb-2.5">
                            <img src={p.image} alt={pName} className="w-full h-full object-cover" />
                          </div>

                          <span className="text-[10px] uppercase tracking-brand font-semibold text-stone block">
                            {pCat}
                          </span>
                          <h4 className="font-serif text-base font-bold text-charcoal line-clamp-1 mt-0.5">
                            {pName}
                          </h4>
                          <span className="text-sm font-bold text-forest font-sans block mt-1">
                            {formatPrice(p.price)}
                          </span>

                          <div className="mt-3">
                            <button
                              onClick={() => {
                                onAddToCart(p);
                                onClose();
                              }}
                              className="w-full py-2 px-3 bg-forest hover:bg-forest-light text-offwhite text-xs uppercase tracking-brand font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <ShoppingBag size={13} />
                              <span>{t.card_add_to_bag}</span>
                            </button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-light/60 text-xs">
                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-semibold uppercase tracking-wider text-charcoal bg-beige/20">
                      {t.compare_rating}
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-center border-l border-stone-light/60">
                        <div className="flex items-center justify-center gap-1.5">
                          <StarRating rating={p.rating} size="xs" />
                          <span className="text-[11px] font-mono text-stone font-semibold">({p.rating})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Weight */}
                  <tr>
                    <td className="p-3 font-semibold uppercase tracking-wider text-charcoal bg-beige/20 flex items-center gap-1.5">
                      <Scale size={13} className="text-forest" />
                      <span>{t.spec_weight}</span>
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-center font-mono font-bold text-charcoal border-l border-stone-light/60">
                        {p.specs?.weight || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Materials */}
                  <tr>
                    <td className="p-3 font-semibold uppercase tracking-wider text-charcoal bg-beige/20 flex items-center gap-1.5">
                      <Layers size={13} className="text-forest" />
                      <span>{t.spec_materials}</span>
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-center text-stone leading-relaxed border-l border-stone-light/60">
                        {lang === 'th' ? p.specs?.materials_th || p.specs?.materials : p.specs?.materials || 'Alpine Grade Material'}
                      </td>
                    ))}
                  </tr>

                  {/* Weatherproof Rating */}
                  <tr>
                    <td className="p-3 font-semibold uppercase tracking-wider text-charcoal bg-beige/20 flex items-center gap-1.5">
                      <Droplets size={13} className="text-forest" />
                      <span>{t.spec_waterproof}</span>
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-center font-mono text-stone border-l border-stone-light/60">
                        {p.specs?.waterproofRating || 'Standard'}
                      </td>
                    ))}
                  </tr>

                  {/* Dimensions / Capacity */}
                  <tr>
                    <td className="p-3 font-semibold uppercase tracking-wider text-charcoal bg-beige/20 flex items-center gap-1.5">
                      <Maximize2 size={13} className="text-forest" />
                      <span>{t.spec_dimensions}</span>
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-center text-stone border-l border-stone-light/60">
                        {p.specs?.dimensions || 'Standard Fit'}
                      </td>
                    ))}
                  </tr>

                  {/* Best Trail Use */}
                  <tr>
                    <td className="p-3 font-semibold uppercase tracking-wider text-charcoal bg-beige/20 flex items-center gap-1.5">
                      <Compass size={13} className="text-forest" />
                      <span>{t.spec_best_use}</span>
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 text-center font-semibold text-forest border-l border-stone-light/60">
                        {lang === 'th' ? p.specs?.bestUse_th || p.specs?.bestUse : p.specs?.bestUse || 'All-Round Outdoor'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-stone-light/80 flex items-center justify-between text-xs text-stone">
          <span>{comparedProducts.length} items in comparison matrix</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-light/40 hover:bg-stone-light text-charcoal uppercase tracking-wider font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
