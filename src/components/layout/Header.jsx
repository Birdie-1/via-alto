import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';
import { assetUrl } from '../../utils/assets';

export default function Header({
  currentPage,
  onNavigate,
  cartCount = 0,
  onOpenSearch,
  onOpenCart,
  currentUser = null,
  onOpenAuthModal,
  lang = 'en',
  onToggleLang
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.nav_home },
    { id: 'shop', label: t.nav_shop },
    { id: 'categories', label: t.nav_categories },
    { id: 'about', label: t.nav_about }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'categories') {
      if (currentPage === 'home') {
        const catSection = document.getElementById('featured-categories');
        if (catSection) {
          catSection.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      onNavigate('shop');
      return;
    }
    if (id === 'about') {
      if (currentPage === 'home') {
        const storySection = document.getElementById('brand-story');
        if (storySection) {
          storySection.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      onNavigate('home');
      setTimeout(() => {
        const storySection = document.getElementById('brand-story');
        if (storySection) storySection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    onNavigate(id);
  };

  const handleAccountClick = () => {
    if (currentUser) {
      onNavigate('account');
    } else {
      onOpenAuthModal?.();
    }
  };

  // Header appearance based on page & scroll state
  const isDarkHero = currentPage === 'home' && !scrolled;
  const headerBgClass = scrolled
    ? 'bg-[#F7F5F0]/95 backdrop-blur-md border-b border-stone-light/40 shadow-xs'
    : currentPage === 'home'
    ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent'
    : 'bg-[#F7F5F0] border-b border-stone-light/40';

  const textColorClass = isDarkHero ? 'text-white' : 'text-charcoal';
  const navHoverClass = isDarkHero ? 'hover:text-beige' : 'hover:text-forest';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Logo & Wordmark */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/90 p-0.5 border border-forest/20 shadow-xs group-hover:scale-105 transition-transform duration-300">
              <img
                src={assetUrl('/images/logo.png')}
                alt="VIA ALTO Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl font-bold tracking-widest leading-none ${textColorClass}`}
              >
                VIA ALTO
              </span>
              <span
                className={`text-[9px] uppercase tracking-brand font-medium ${
                  isDarkHero ? 'text-white/70' : 'text-stone'
                }`}
              >
                OUTDOOR EQUIPMENT
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                (item.id === 'home' && currentPage === 'home') ||
                (item.id === 'shop' && currentPage === 'shop');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-semibold uppercase tracking-brand transition-colors duration-200 cursor-pointer relative py-1 ${
                    isActive
                      ? isDarkHero
                        ? 'text-white'
                        : 'text-forest font-bold'
                      : `${textColorClass} ${navHoverClass}`
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                        isDarkHero ? 'bg-white' : 'bg-forest'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Language Switcher, Search, Account, Bag */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Toggle Button (EN | TH) */}
            <div
              className={`flex items-center text-[11px] font-bold tracking-wider rounded-xs border p-0.5 transition-all ${
                isDarkHero
                  ? 'border-white/30 bg-black/20 text-white'
                  : 'border-stone-light bg-white/80 text-charcoal shadow-2xs'
              }`}
            >
              <button
                onClick={() => onToggleLang('en')}
                className={`px-2 py-1 rounded-2xs transition-colors cursor-pointer ${
                  lang === 'en'
                    ? isDarkHero
                      ? 'bg-white text-forest font-extrabold'
                      : 'bg-forest text-offwhite font-extrabold'
                    : 'opacity-60 hover:opacity-100'
                }`}
                title="English"
              >
                EN
              </button>
              <span className="opacity-40 px-0.5">|</span>
              <button
                onClick={() => onToggleLang('th')}
                className={`px-2 py-1 rounded-2xs transition-colors cursor-pointer ${
                  lang === 'th'
                    ? isDarkHero
                      ? 'bg-white text-forest font-extrabold'
                      : 'bg-forest text-offwhite font-extrabold'
                    : 'opacity-60 hover:opacity-100'
                }`}
                title="ภาษาไทย"
              >
                TH
              </button>
            </div>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className={`p-2 transition-colors cursor-pointer ${textColorClass} ${navHoverClass}`}
              aria-label="Search equipment"
            >
              <Search size={19} />
            </button>

            {/* Account Button / User Pill */}
            {currentUser ? (
              <button
                onClick={handleAccountClick}
                className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border rounded-xs transition-all cursor-pointer ${
                  isDarkHero
                    ? 'border-white/40 bg-white/10 text-white hover:bg-white/20'
                    : 'border-forest/40 bg-forest/5 text-forest hover:bg-forest hover:text-white'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-forest text-offwhite flex items-center justify-center text-[10px] font-bold">
                  {currentUser.fullName?.[0] || 'E'}
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold">
                  {currentUser.fullName?.split(' ')[0]}
                </span>
                <span className="text-[10px] opacity-70">
                  ({currentUser.points || 500} pts)
                </span>
              </button>
            ) : (
              <button
                onClick={handleAccountClick}
                className={`p-2 transition-colors cursor-pointer hidden sm:block ${textColorClass} ${navHoverClass}`}
                aria-label="User Account"
                title={t.nav_signin}
              >
                <User size={19} />
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className={`p-2 transition-colors cursor-pointer relative ${textColorClass} ${navHoverClass}`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-forest text-offwhite text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-offwhite">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors cursor-pointer ${textColorClass}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="fixed top-20 left-0 right-0 bg-[#F7F5F0] border-b border-stone-light p-6 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-sm uppercase tracking-brand font-semibold text-charcoal hover:text-forest py-2 border-b border-stone-light/30 transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Account Link */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAccountClick();
                }}
                className="text-left text-sm uppercase tracking-brand font-bold text-forest py-2 border-b border-stone-light/30 flex items-center justify-between"
              >
                <span>{currentUser ? `${t.nav_account} (${currentUser.fullName})` : t.nav_signin}</span>
                <User size={16} />
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-stone tracking-wider uppercase">
              <span>GO BEYOND.</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
