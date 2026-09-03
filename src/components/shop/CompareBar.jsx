import React from 'react';
import { Scale, X, ArrowRight, Check } from 'lucide-react';
import { formatPrice } from '../../data/products';
import { TRANSLATIONS } from '../../data/translations';

export default function CompareBar({
  comparedProducts = [],
  onOpenCompareModal,
  onRemoveCompare,
  onClearCompare,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (comparedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-in slide-in-from-bottom-6 duration-300">
      <div className="bg-[#183C32] text-offwhite border border-forest-light shadow-2xl p-3 sm:p-4 flex items-center justify-between gap-3">
        
        {/* Left: Indicator & Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <Scale size={18} className="text-beige" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {t.compare_bar_title}
              </span>
              <span className="text-[10px] text-beige/80">
                {comparedProducts.length}/3 {t.compare_bar_selected}
              </span>
            </div>
          </div>

          {/* Product Previews */}
          <div className="flex items-center gap-2">
            {comparedProducts.map((p) => {
              const pName = lang === 'th' ? p.name_th || p.name : p.name;
              return (
                <div
                  key={p.id}
                  className="relative group w-11 h-11 bg-white border border-white/30 overflow-hidden shrink-0"
                >
                  <img src={p.image} alt={pName} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onRemoveCompare(p.id)}
                    className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Remove from compare"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}

            {/* Empty slots placeholders */}
            {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
              <div
                key={i}
                className="w-11 h-11 border border-dashed border-white/20 hidden sm:flex items-center justify-center text-[10px] text-white/40"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearCompare}
            className="text-[11px] uppercase tracking-wider text-stone-light hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
          >
            {t.compare_bar_clear}
          </button>

          <button
            onClick={onOpenCompareModal}
            disabled={comparedProducts.length < 2}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-brand transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              comparedProducts.length >= 2
                ? 'bg-beige text-forest hover:bg-white active:scale-95'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            <span>{t.compare_bar_btn}</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
