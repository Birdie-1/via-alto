import React, { useState } from 'react';
import { Mail, ArrowRight, Compass, Globe, Share2, Check } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';
import { sendSubscribeEmail } from '../../services/emailService';
import { assetUrl } from '../../utils/assets';

export default function Footer({ onNavigate, onOpenEmailPreview, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [footerEmail, setFooterEmail] = useState('');
  const [footerConsent, setFooterConsent] = useState(false);
  const [footerConsentError, setFooterConsentError] = useState(false);
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const handleFooterSubscribe = async (e) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    if (!footerConsent) {
      setFooterConsentError(true);
      return;
    }
    setFooterConsentError(false);
    try {
      await sendSubscribeEmail(footerEmail.trim(), 'Explorer', 'footer', { consent: true });
    } catch (err) {
      console.warn('Footer subscribe error:', err);
    }
    setFooterSubscribed(true);
    setFooterEmail('');
  };

  return (
    <footer className="bg-charcoal text-offwhite pt-16 pb-12 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white/90 p-0.5 border border-forest/20">
                <img
                  src={assetUrl('/images/logo.png')}
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
              {onOpenEmailPreview && (
                <li>
                  <button
                    onClick={() => onOpenEmailPreview('welcome')}
                    className="text-beige/90 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 pt-1"
                  >
                    <Mail size={12} />
                    <span>{lang === 'th' ? 'ตัวอย่างอีเมล (Email Preview)' : 'Email Previews'}</span>
                  </button>
                </li>
              )}
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

            {footerSubscribed ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 py-2 px-3 bg-white/10 border border-beige/30">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-sans text-beige">
                    {lang === 'th' ? 'สมัครรับข่าวสารสำเร็จ!' : 'Subscribed successfully!'}
                  </span>
                </div>
                {onOpenEmailPreview && (
                  <button
                    onClick={() => onOpenEmailPreview('welcome')}
                    className="text-[11px] text-beige hover:text-white underline cursor-pointer inline-flex items-center gap-1 font-sans"
                  >
                    <Mail size={12} />
                    <span>{lang === 'th' ? 'ดูตัวอย่างอีเมลต้อนรับ' : 'Preview Welcome Email'}</span>
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleFooterSubscribe} className="space-y-2 text-left">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="bg-charcoal-light border border-white/20 text-xs text-white px-3 py-2 w-full focus:outline-none focus:border-beige font-sans"
                  />
                  <button
                    type="submit"
                    className="bg-beige text-forest px-3 py-2 text-xs font-bold uppercase tracking-brand hover:bg-white transition-colors cursor-pointer shrink-0"
                  >
                    {t.footer_join}
                  </button>
                </div>
                {/* PDPA Consent Checkbox */}
                <div className="pt-0.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none font-sans group">
                    <input
                      type="checkbox"
                      checked={footerConsent}
                      onChange={(e) => {
                        setFooterConsent(e.target.checked);
                        if (e.target.checked) setFooterConsentError(false);
                      }}
                      className="mt-0.5 w-3.5 h-3.5 rounded border-white/20 bg-charcoal-light accent-[#183C32] text-forest shrink-0 cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-light leading-tight group-hover:text-white transition-colors">
                      {t.newsletter_consent}
                    </span>
                  </label>
                  {footerConsentError && (
                    <p className="text-[10px] text-red-400 mt-1 pl-5 font-sans">
                      ⚠️ {t.newsletter_consent_error}
                    </p>
                  )}
                </div>
              </form>
            )}

            {onOpenEmailPreview && !footerSubscribed && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onOpenEmailPreview('welcome')}
                  className="text-[11px] text-beige/70 hover:text-white underline cursor-pointer inline-flex items-center gap-1 font-sans"
                >
                  <Mail size={12} />
                  <span>{lang === 'th' ? 'ดูตัวอย่างอีเมลระบบ' : 'Preview Automated Emails'}</span>
                </button>
              </div>
            )}
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

