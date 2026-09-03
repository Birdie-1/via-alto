import React from 'react';
import { Mail, ArrowRight, Compass, Globe, Share2 } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function Footer({ onNavigate, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <footer className="bg-charcoal text-offwhite pt-16 pb-12 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white/90 p-0.5 border border-forest/20">
                <img
                  src="/images/logo.png"
                  alt="VIA ALTO Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                VIA ALTO
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-light font-sans max-w-sm leading-relaxed">
              {t.footer_desc}
            </p>

            <div className="flex space-x-4 pt-2 text-stone-light">
              <span className="inline-flex items-center gap-1.5 text-xs text-beige/80">
                <Compass size={14} />
                <span>Dolomites Alpine Standard</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-brand font-semibold text-white block">
              {t.footer_shop}
            </span>
            <ul className="space-y-2 text-xs text-stone-light font-sans">
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'backpacks' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.cat_backpacks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'clothing' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.cat_clothing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'footwear' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.cat_footwear}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'camping' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.cat_camping}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'accessories' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.cat_accessories}
                </button>
              </li>
            </ul>
          </div>

          {/* Brand Philosophy / Story Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-brand font-semibold text-white block">
              {t.footer_about}
            </span>
            <ul className="space-y-2 text-xs text-stone-light font-sans">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const story = document.getElementById('brand-story');
                      if (story) story.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.phil_cta}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.hero_slogan}
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Journal Box */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-brand font-semibold text-white block">
              {t.footer_journal_title}
            </span>
            <p className="text-xs text-stone-light font-sans">
              {t.footer_journal_desc}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(lang === 'th' ? 'ขอบคุณสำหรับการสมัครรับข่าวสาร VIA ALTO!' : 'Thank you for subscribing to The VIA ALTO Journal.');
              }}
              className="flex"
            >
              <input
                type="email"
                required
                placeholder="email@example.com"
                className="bg-charcoal-light border border-white/20 text-xs text-white px-3 py-2 w-full focus:outline-none focus:border-beige font-sans"
              />
              <button
                type="submit"
                className="bg-beige text-forest px-3 py-2 text-xs font-bold uppercase tracking-brand hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                {t.footer_join}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone font-sans gap-4">
          <span>© {new Date().getFullYear()} {t.footer_rights}</span>
          <div className="flex space-x-6">
            <span>GO BEYOND.</span>
            <span>ELEVATION: 3,842M</span>
            <span>DOLOMITES, ITALY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
