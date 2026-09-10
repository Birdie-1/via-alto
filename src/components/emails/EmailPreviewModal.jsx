import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Check,
  Compass,
  ArrowRight,
  Sparkles,
  Mail,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  Layers,
  Eye
} from 'lucide-react';
import { PRODUCTS, formatPrice } from '../../data/products';

export default function EmailPreviewModal({
  isOpen,
  onClose,
  initialTemplate = 'welcome', // 'welcome' | 'recommendation'
  lang = 'th',
  user = null,
  onNavigate
}) {
  const [activeTemplate, setActiveTemplate] = useState(initialTemplate);
  const [currentLang, setCurrentLang] = useState(lang);
  const [viewMode, setViewMode] = useState('html'); // 'html' | 'mockup'

  if (!isOpen) return null;

  // Selected demo product for recommendation
  const recommendedProduct = PRODUCTS.find((p) => p.id === 1) || PRODUCTS[0];
  const pairedProduct = PRODUCTS.find((p) => p.id === 2) || PRODUCTS[1];

  const userName = user?.fullName || (currentLang === 'th' ? 'ปวีณ์นุช นามแดง' : 'Marco Silva');
  const userEmail = user?.email || (currentLang === 'th' ? 'paweenuch.n@gmail.com' : 'marco@via-alto.com');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1F2421] border border-white/20 w-full max-w-4xl max-h-[95vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden text-offwhite">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-charcoal border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-beige" />
            <span className="font-serif text-sm font-bold tracking-wider text-white">
              VIA ALTO Email Studio Preview
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-forest text-beige rounded-full border border-beige/30">
              Responsive Design
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Template Selector Tabs */}
            <div className="bg-white/10 rounded-lg p-0.5 flex text-xs">
              <button
                onClick={() => setActiveTemplate('welcome')}
                className={`px-3 py-1 rounded-md transition-all font-sans cursor-pointer ${
                  activeTemplate === 'welcome'
                    ? 'bg-beige text-forest font-bold shadow-sm'
                    : 'text-stone-light hover:text-white'
                }`}
              >
                1. {currentLang === 'th' ? 'ต้อนรับ & สมัครสมาชิก' : 'Welcome & Subscription'}
              </button>
              <button
                onClick={() => setActiveTemplate('recommendation')}
                className={`px-3 py-1 rounded-md transition-all font-sans cursor-pointer ${
                  activeTemplate === 'recommendation'
                    ? 'bg-beige text-forest font-bold shadow-sm'
                    : 'text-stone-light hover:text-white'
                }`}
              >
                2. {currentLang === 'th' ? 'แนะนำสินค้าเฉพาะคุณ' : 'Personalized Recommendations'}
              </button>
            </div>

            {/* Language Toggle */}
            <div className="bg-white/10 rounded-lg p-0.5 flex text-xs">
              <button
                onClick={() => setCurrentLang('th')}
                className={`px-2 py-1 rounded-md font-sans cursor-pointer ${
                  currentLang === 'th' ? 'bg-forest text-white font-bold' : 'text-stone-light'
                }`}
              >
                TH
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-1 rounded-md font-sans cursor-pointer ${
                  currentLang === 'en' ? 'bg-forest text-white font-bold' : 'text-stone-light'
                }`}
              >
                EN
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="bg-white/10 rounded-lg p-0.5 flex text-xs">
              <button
                onClick={() => setViewMode('html')}
                className={`px-2.5 py-1 rounded-md font-sans cursor-pointer ${
                  viewMode === 'html' ? 'bg-stone-700 text-white font-medium' : 'text-stone-light'
                }`}
                title="Interactive HTML View"
              >
                HTML
              </button>
              <button
                onClick={() => setViewMode('mockup')}
                className={`px-2.5 py-1 rounded-md font-sans cursor-pointer ${
                  viewMode === 'mockup' ? 'bg-stone-700 text-white font-medium' : 'text-stone-light'
                }`}
                title="Studio Mockup Render"
              >
                Photo
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full text-stone-light hover:text-white transition-colors cursor-pointer ml-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#141815] bg-[radial-gradient(#2a342e_1px,transparent_1px)] [background-size:16px_16px]">
          
          {viewMode === 'mockup' ? (
            /* Studio Photo Mockup Render */
            <div className="max-w-md w-full flex flex-col items-center space-y-4">
              <div className="rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
                <img
                  src={
                    activeTemplate === 'welcome'
                      ? '/images/welcome_email_mockup.jpg'
                      : '/images/recommendation_email_mockup.jpg'
                  }
                  onError={(e) => {
                    e.target.src =
                      activeTemplate === 'welcome'
                        ? 'welcome_email_design_1789012235946.jpg'
                        : 'recommendation_email_design_1789012253664.jpg';
                  }}
                  alt="Email Studio Mockup"
                  className="w-full h-auto object-cover max-h-[750px]"
                />
              </div>
              <p className="text-xs text-stone-light text-center font-sans">
                {activeTemplate === 'welcome'
                  ? 'Alpine Minimalist Welcome Email rendered on Apple iPhone 16 Pro'
                  : 'Personalized Product Recommendation Email rendered on Apple iPhone 16 Pro'}
              </p>
            </div>
          ) : (
            /* Interactive Mobile Frame */
            <div className="w-full max-w-[390px] bg-[#1a1e1b] rounded-[44px] p-3 shadow-2xl border-4 border-[#333a35] relative">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-stone-800 mr-1" />
              </div>

              {/* Status Bar */}
              <div className="pt-2 pb-3 px-6 flex justify-between items-center text-[11px] text-stone-300 font-medium font-sans">
                <span>10:14</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-2 border border-stone-300 rounded-sm p-0.5 flex items-center">
                    <div className="h-full w-full bg-stone-300" />
                  </div>
                </div>
              </div>

              {/* Email Client Header */}
              <div className="bg-[#242925] border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs text-stone-300 font-sans">
                <div className="flex items-center gap-2">
                  <ChevronLeft size={16} />
                  <span>Inbox</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>🗑️</span>
                  <span>✉️</span>
                  <span>•••</span>
                </div>
              </div>

              {/* Email Envelope Header */}
              <div className="bg-[#242925] p-3 border-b border-white/10 text-xs font-sans">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#183C32] border border-beige/40 flex items-center justify-center text-beige font-serif font-bold text-xs">
                    VA
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-white truncate">
                        VIA ALTO Explorer Club
                      </span>
                      <span className="text-[10px] text-stone-400">10:14 AM</span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      To: {userName} &lt;{userEmail}&gt;
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Body Scrollable Container */}
              <div className="overflow-y-auto max-h-[620px] scrollbar-thin scrollbar-thumb-stone-700 bg-[#161a17] text-white">
                
                {activeTemplate === 'welcome' ? (
                  /* ========================================================================= */
                  /* TEMPLATE 1: WELCOME & NEWSLETTER SUBSCRIPTION EMAIL (Caffellina-style)     */
                  /* ========================================================================= */
                  <div className="p-4 space-y-5">
                    
                    {/* Sage Green Brand Pill Banner */}
                    <div className="bg-[#8EA690]/90 text-[#14231A] rounded-2xl p-5 text-center shadow-md">
                      <div className="flex justify-center items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-[#183C32] flex items-center justify-center text-beige">
                          <Compass size={14} />
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-widest">
                          VIA ALTO
                        </span>
                      </div>
                      <p className="text-[11px] font-sans tracking-wide text-[#14231A]/80">
                        {currentLang === 'th'
                          ? 'อุปกรณ์เดินป่าอัลไพน์ · สู่จุดสูงสุดแห่งการสำรวจ'
                          : 'Alpine Outdoor Standard · The Path to Higher Ground'}
                      </p>
                    </div>

                    {/* Email Main Headline */}
                    <div className="text-center pt-2 space-y-2">
                      <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
                        {currentLang === 'th'
                          ? 'ขอบคุณที่สมัครรับข่าวสาร'
                          : 'Welcome to Explorer Club'}
                      </h2>
                      <p className="text-xs text-stone-300 font-sans leading-relaxed">
                        {currentLang === 'th' ? (
                          <>
                            อีเมล <span className="text-beige underline">{userEmail}</span> ถูกเพิ่มในรายชื่อสมาชิก VIA ALTO เรียบร้อยแล้ว
                          </>
                        ) : (
                          <>
                            Your email <span className="text-beige underline">{userEmail}</span> has been successfully enrolled in the VIA ALTO Explorer Registry.
                          </>
                        )}
                      </p>
                    </div>

                    {/* Explanation Text */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-stone-300 font-sans leading-relaxed">
                      {currentLang === 'th' ? (
                        <p>
                          ต่อจากนี้คุณสามารถรับข่าวสารอุปกรณ์อัลไพน์รุ่นใหม่ล่าสุด เทคนิคการเดินทางในสภาพอากาศแปรปรวน และสิทธิพิเศษเฉพาะสมาชิกผ่านอีเมลนี้ได้
                        </p>
                      ) : (
                        <p>
                          You are now on the official dispatch for exclusive technical alpine drops, Dolomites expedition journals, and private member privileges.
                        </p>
                      )}
                    </div>

                    {/* Alpine Points Welcome Credit Card */}
                    <div className="bg-[#183C32] border border-beige/30 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-brand font-bold text-beige block">
                          {currentLang === 'th' ? 'สิทธิพิเศษสมาชิกใหม่' : 'NEW MEMBER CREDIT'}
                        </span>
                        <span className="text-xs text-stone-200 font-sans">
                          {currentLang === 'th' ? 'รับแต้มสะสมทันที' : 'Alpine Points Credited'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-beige">
                          +500 AP
                        </span>
                      </div>
                    </div>

                    {/* Tip / Recommendation Helper Card (Exact match to Caffellina's coffee tip card) */}
                    <div className="bg-[#242925] border border-white/10 rounded-xl p-4 text-xs font-sans text-stone-200 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <span className="text-base leading-none">🏔️</span>
                        <div>
                          <span className="font-semibold text-white">
                            {currentLang === 'th' ? 'แนะนำ:' : 'Alpine Tip:'}
                          </span>{' '}
                          {currentLang === 'th'
                            ? 'ใช้ตัวช่วยค้นหาอุปกรณ์ (Gear Finder) บนเว็บไซต์ เพื่อค้นหาชุดอุปกรณ์ที่เหมาะกับสภาพภูมิประเทศและสภาพอากาศของคุณ'
                            : 'Use the interactive Gear Finder on our website to discover customized equipment engineered for your specific climate and route.'}
                        </div>
                      </div>
                    </div>

                    {/* Primary Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate?.('home');
                        }}
                        className="w-full py-3.5 bg-[#E8DDCC] hover:bg-white text-[#183C32] rounded-xl font-bold text-xs uppercase tracking-brand transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{currentLang === 'th' ? 'กลับไปที่หน้าร้าน' : 'RETURN TO STORE'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 pb-2 text-center text-[10px] text-stone-400 font-sans space-y-1">
                      <p>VIA ALTO · กาแฟและอุปกรณ์ที่ดี เติมวันให้สดใส</p>
                      <p className="text-stone-500">
                        {currentLang === 'th'
                          ? 'อีเมลนี้ส่งโดยระบบอัตโนมัติของ VIA ALTO'
                          : 'This is an automated dispatch from VIA ALTO Explorer Registry.'}
                      </p>
                    </div>

                  </div>
                ) : (
                  /* ========================================================================= */
                  /* TEMPLATE 2: PERSONALIZED RECOMMENDATION EMAIL (Caffellina-style)           */
                  /* ========================================================================= */
                  <div className="p-4 space-y-5">
                    
                    {/* Top Hero Banner */}
                    <div className="rounded-2xl overflow-hidden relative shadow-md">
                      <img
                        src="/images/hero.jpg"
                        alt="Alpine Landscape"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161a17] via-[#161a17]/40 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/90 p-0.5">
                          <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-serif text-sm font-bold tracking-widest text-white">
                          VIA ALTO
                        </span>
                      </div>
                    </div>

                    {/* Welcome User Header */}
                    <div className="text-center space-y-1.5 pt-1">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                        {currentLang === 'th'
                          ? `ยินดีต้อนรับคุณ ${userName}`
                          : `Welcome, ${userName}`}
                      </h2>
                      <p className="text-xs text-stone-300 font-sans leading-relaxed">
                        {currentLang === 'th'
                          ? 'สมัครสมาชิกเรียบร้อยแล้ว และเราใช้ความสนใจที่คุณเลือกเพื่อค้นหาอุปกรณ์ที่น่าจะเหมาะกับคุณ'
                          : 'Your membership is active. We analyzed your trail preferences to engineer the ideal setup for your next journey.'}
                      </p>
                    </div>

                    {/* User Preference Summary Card (Exact match to Caffellina) */}
                    <div className="bg-[#242925] border border-white/10 rounded-xl p-4 text-xs font-sans space-y-2">
                      <span className="font-bold text-beige uppercase tracking-wider text-[11px] block">
                        {currentLang === 'th' ? 'ความสนใจที่คุณเลือก' : 'YOUR SELECTED PREFERENCES'}
                      </span>
                      <div className="space-y-1.5 text-stone-300 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'กิจกรรมหลัก:' : 'Activity:'}
                          </span>
                          <span className="font-medium text-white">
                            {currentLang === 'th' ? 'เดินป่า & แคมป์ปิ้ง (Trekking)' : 'Alpine Trekking & Camping'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'ภูมิภาคสำรวจ:' : 'Region:'}
                          </span>
                          <span className="font-medium text-white">
                            {currentLang === 'th' ? 'ดอยสูง & ภาคเหนือ (Alpine)' : 'Northern Thailand (High Elevation)'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'ระดับประสบการณ์:' : 'Experience Level:'}
                          </span>
                          <span className="font-medium text-white">
                            {currentLang === 'th' ? 'ระดับกลาง (Intermediate)' : 'Intermediate'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'ไซส์ที่สวมใส่:' : 'Sizes:'}
                          </span>
                          <span className="font-medium text-white">L (Apparel) / 42 (Footwear)</span>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Product Section */}
                    <div className="space-y-3 pt-1">
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold tracking-brand-wide text-beige block">
                          {currentLang === 'th' ? 'สินค้าแนะนำจากความสนใจของคุณ' : 'RECOMMENDED FOR YOUR PROFILE'}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-white">
                          {currentLang === 'th' ? recommendedProduct.name_th : recommendedProduct.name}
                        </h3>
                      </div>

                      {/* Product Photo Canvas */}
                      <div className="bg-[#F7F5F0] rounded-xl p-3 flex items-center justify-center border border-white/20">
                        <img
                          src={recommendedProduct.image}
                          alt={recommendedProduct.name}
                          className="w-48 h-48 object-contain"
                        />
                      </div>

                      {/* Product Specs List Card (Exact match to Caffellina's coffee specs) */}
                      <div className="bg-[#242925] border border-white/10 rounded-xl p-4 text-xs font-sans space-y-2 text-stone-300">
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'วัสดุหลัก:' : 'Materials:'}
                          </span>
                          <span className="font-medium text-white text-right max-w-[60%] truncate">
                            {recommendedProduct.specs.materials}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'ระดับกันน้ำ:' : 'Weatherproofing:'}
                          </span>
                          <span className="font-medium text-white">
                            {recommendedProduct.specs.waterproofRating}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'น้ำหนัก:' : 'Weight:'}
                          </span>
                          <span className="font-medium text-white">
                            {recommendedProduct.specs.weight}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'ขนาดความจุ:' : 'Dimensions:'}
                          </span>
                          <span className="font-medium text-white">
                            {recommendedProduct.specs.dimensions}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5">
                          <span className="text-stone-400">
                            {currentLang === 'th' ? 'การใช้งานแนะนำ:' : 'Best Use:'}
                          </span>
                          <span className="font-medium text-white text-right max-w-[60%] truncate">
                            {currentLang === 'th' ? recommendedProduct.specs.bestUse_th : recommendedProduct.specs.bestUse}
                          </span>
                        </div>
                        <div className="flex justify-between pt-1 text-sm font-bold text-white items-center">
                          <span>{currentLang === 'th' ? 'ราคาพิเศษ:' : 'Member Price:'}</span>
                          <span className="font-serif text-lg text-beige">
                            {formatPrice(recommendedProduct.price)}
                          </span>
                        </div>
                      </div>

                      {/* 3 Action Buttons (Exact match to Caffellina) */}
                      <div className="space-y-2 pt-2">
                        {/* 1. View Recommended Item */}
                        <button
                          onClick={() => {
                            onClose();
                            onNavigate?.('shop');
                          }}
                          className="w-full py-3 bg-[#E8DDCC] hover:bg-white text-[#183C32] rounded-xl font-bold text-xs uppercase tracking-brand transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{currentLang === 'th' ? 'ดูสินค้าที่แนะนำนี้' : 'VIEW THIS GEAR'}</span>
                          <ArrowRight size={14} />
                        </button>

                        {/* 2. View All Products */}
                        <button
                          onClick={() => {
                            onClose();
                            onNavigate?.('shop');
                          }}
                          className="w-full py-3 bg-[#242925] hover:bg-[#2e3530] text-white border border-white/20 rounded-xl font-bold text-xs uppercase tracking-brand transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{currentLang === 'th' ? 'ดูสินค้าทั้งหมด' : 'BROWSE ALL COLLECTIONS'}</span>
                        </button>

                        {/* 3. Return to Store */}
                        <button
                          onClick={() => {
                            onClose();
                            onNavigate?.('home');
                          }}
                          className="w-full py-3 bg-[#8EA690]/80 hover:bg-[#8EA690] text-[#14231A] rounded-xl font-bold text-xs uppercase tracking-brand transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{currentLang === 'th' ? 'กลับไปที่หน้าร้าน VIA ALTO' : 'RETURN TO VIA ALTO'}</span>
                        </button>
                      </div>

                    </div>

                    {/* Footer */}
                    <div className="pt-6 pb-2 text-center text-[10px] text-stone-400 font-sans space-y-1">
                      <p>VIA ALTO · Dolomites Alpine Standard</p>
                      <p className="text-stone-500">
                        {currentLang === 'th'
                          ? 'อีเมลนี้ส่งจากระบบสมาชิกของร้าน VIA ALTO'
                          : 'This email was generated from your VIA ALTO profile preferences.'}
                      </p>
                    </div>

                  </div>
                )}

              </div>

              {/* Mobile Home Bar */}
              <div className="pt-2 pb-1 flex justify-center">
                <div className="w-32 h-1 bg-stone-500 rounded-full" />
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer info */}
        <div className="px-5 py-3 bg-charcoal border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-beige" />
            <span>
              {activeTemplate === 'welcome'
                ? 'Trigger: Sent automatically upon email registration or newsletter subscription'
                : 'Trigger: Sent 2 minutes after registration based on user profile preferences'}
            </span>
          </div>
          <span className="text-[11px] text-stone-500">
            Powered by Resend + React Email Design System
          </span>
        </div>

      </div>
    </div>
  );
}
