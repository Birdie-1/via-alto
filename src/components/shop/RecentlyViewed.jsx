import React from 'react';
import { Eye, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../data/products';

export default function RecentlyViewed({ products = [], onSelectProduct, lang = 'en' }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-[#183C32]/15">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#183C32]/70 font-semibold mb-1">
            <Eye className="w-3.5 h-3.5 text-[#183C32]" />
            <span>{lang === 'th' ? 'ประวัติการเข้าชมของคุณ' : 'YOUR BROWSING HISTORY'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold">
            {lang === 'th' ? 'สินค้าที่คุณเพิ่งดูล่าสุด' : 'Recently Viewed Gear'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => {
          const name = lang === 'th' && product.name_th ? product.name_th : product.name;
          const category = lang === 'th' && product.category_th ? product.category_th : product.category;

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer bg-white rounded-xl border border-charcoal/10 overflow-hidden hover:border-[#183C32]/40 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Product Thumbnail with Beige Canvas */}
              <div className="relative bg-[#F7F5F0] pt-[85%] overflow-hidden">
                <img
                  src={product.image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 text-[9px] uppercase tracking-wider font-bold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-charcoal/80 border border-charcoal/5">
                  {category}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-amber-600 mb-1.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-charcoal group-hover:text-[#183C32] transition-colors line-clamp-1 mb-1">
                    {name}
                  </h4>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-charcoal/5">
                  <span className="font-serif font-bold text-sm text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[11px] text-[#183C32] font-semibold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{lang === 'th' ? 'ดูสินค้า' : 'View'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
