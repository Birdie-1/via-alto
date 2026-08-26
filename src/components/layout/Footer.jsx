import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleCategoryClick = (catId) => {
    onNavigate('shop', { category: catId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#183C32] text-offwhite pt-16 pb-12 border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-md">
                <img
                  src="/images/logo.png"
                  alt="VIA ALTO"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-widest text-offwhite">
                  VIA ALTO
                </h3>
                <p className="text-[10px] uppercase tracking-brand text-beige">
                  OUTDOOR EQUIPMENT
                </p>
              </div>
            </div>

            <p className="text-stone-light text-sm max-w-sm font-sans font-light leading-relaxed">
              Via = The Path. Alto = High / Elevated. Born in the European Alps, crafted for those who choose the path to higher ground.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-brand font-semibold text-beige border-b border-beige/40 pb-0.5">
                GO BEYOND.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-brand font-bold text-beige">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-light font-sans tracking-wide">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-offwhite transition-colors"
                >
                  All Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('backpacks')}
                  className="hover:text-offwhite transition-colors"
                >
                  Backpacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('clothing')}
                  className="hover:text-offwhite transition-colors"
                >
                  Apparel & Shells
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('footwear')}
                  className="hover:text-offwhite transition-colors"
                >
                  Alpine Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('camping')}
                  className="hover:text-offwhite transition-colors"
                >
                  Tents & Sleeping
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-brand font-bold text-beige">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-light font-sans tracking-wide">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-offwhite transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <span className="text-stone-light/60 cursor-default">Sustainability</span>
              </li>
              <li>
                <span className="text-stone-light/60 cursor-default">Alpine Craft</span>
              </li>
              <li>
                <span className="text-stone-light/60 cursor-default">Careers</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-brand font-bold text-beige">
              THE VIA ALTO JOURNAL
            </h4>
            <p className="text-xs text-stone-light font-sans leading-relaxed">
              Subscribe for new expedition gear drops, technical guides, and alpine stories.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to VIA ALTO.');
              }}
              className="flex items-center border border-white/20 hover:border-beige transition-colors"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-transparent px-3 py-2 text-xs text-offwhite placeholder:text-stone-light/60 w-full focus:outline-none font-sans"
              />
              <button
                type="submit"
                className="bg-beige text-charcoal px-3 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-light/70 font-sans tracking-wider gap-4">
          <div>
            © {currentYear} VIA ALTO OUTDOOR EQUIPMENT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-xs uppercase tracking-wider">
            <span className="hover:text-offwhite cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-offwhite cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-offwhite cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
