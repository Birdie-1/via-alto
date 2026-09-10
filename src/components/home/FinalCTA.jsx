import React, { useState } from 'react';
import Button from '../ui/Button';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function FinalCTA({ onExploreClick, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    // Simulate API call — will connect to real backend later
    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 600);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#183C32] text-offwhite overflow-hidden">
      {/* Background Texture with Mountain Silhouette Overlay */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
        <img
          src="/images/cta_bg.jpg"
          alt="High mountain landscape texture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Diagonal Brand Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-forest-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-beige/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Subtle Pre-header */}
        <span className="text-xs uppercase tracking-brand-wide font-semibold text-beige block">
          {t.cta_tag}
        </span>

        {/* Main CTA Header */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {t.cta_title}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-beige/90 font-serif italic max-w-xl mx-auto">
          {t.cta_subtitle}
        </p>

        {/* Action Button */}
        <div className="pt-4 flex justify-center">
          <Button
            variant="outline-light"
            size="lg"
            onClick={onExploreClick}
            className="border-beige text-beige hover:bg-beige hover:text-forest"
          >
            {t.cta_button}
          </Button>
        </div>

        {/* Newsletter Subscription Form */}
        <div className="pt-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail size={16} className="text-beige/70" />
            <span className="text-xs uppercase tracking-widest font-semibold text-beige/70">
              {t.footer_journal_title}
            </span>
          </div>
          <p className="text-xs text-beige/60 mb-4 font-sans">
            {t.footer_journal_desc}
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 border border-beige/30 animate-in fade-in duration-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Check size={14} />
              </div>
              <span className="text-sm font-sans text-beige">
                {lang === 'th'
                  ? 'ขอบคุณสำหรับการสมัคร! เราจะส่งข่าวสารให้คุณเร็วๆ นี้'
                  : 'You\'re in! Alpine stories & gear drops heading your way.'}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={lang === 'th' ? 'กรอกอีเมลของคุณ...' : 'Enter email address..'}
                className="bg-white/10 border border-white/20 text-sm text-white px-4 py-3 w-full focus:outline-none focus:border-beige font-sans placeholder:text-white/40"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-beige text-forest px-5 py-3 text-xs font-bold uppercase tracking-brand hover:bg-white transition-colors cursor-pointer shrink-0 disabled:opacity-60 flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <span>{lang === 'th' ? 'สมัครรับข่าวสาร' : 'SUBSCRIBE'}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-[10px] text-beige/40 mt-2 font-sans">
            {lang === 'th'
              ? 'เราจะไม่แชร์อีเมลของคุณ ยกเลิกได้ตลอดเวลา'
              : 'We respect your privacy. Unsubscribe anytime.'}
          </p>
        </div>

      </div>
    </section>
  );
}

