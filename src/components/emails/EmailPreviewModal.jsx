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
              <div className={`overflow-y-auto max-h-[620px] scrollbar-thin scrollbar-thumb-stone-700 ${activeTemplate === 'welcome' ? 'bg-[#EDE8E2]' : 'bg-[#161a17] text-white'}`}>
                
                {activeTemplate === 'welcome' ? (
                  /* ========================================================================= */
                  /* TEMPLATE 1: WELCOME & NEWSLETTER SUBSCRIPTION EMAIL (VIA ALTO Standard)   */
                  /* ========================================================================= */
                  <div className="bg-[#FAF7F2] text-[#183C32] font-sans antialiased shadow-md">
                    
                    {/* 1. Header (Cream background with Circular Logo & GO BEYOND) */}
                    <div className="px-5 py-4 border-b border-[#E5DFD7] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/circular_logo.png"
                          alt="VIA ALTO Logo"
                          className="w-10 h-10 rounded-full object-cover border border-[#183C32]/20 shadow-sm"
                          onError={(e) => { e.target.src = '/images/logo.png'; }}
                        />
                        <div>
                          <span className="font-serif text-lg font-bold tracking-wider text-[#183C32] block leading-none">
                            VIA ALTO
                          </span>
                          <span className="text-[8px] tracking-[2px] font-semibold text-[#5C6E63] uppercase block mt-1">
                            OUTDOOR EQUIPMENT
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold tracking-[2px] text-[#183C32] uppercase">
                        GO BEYOND.
                      </span>
                    </div>

                    {/* 2. Hero Image Banner (Mountain + Typography) */}
                    <div className="w-full bg-[#141A16] overflow-hidden">
                      <img
                        src="/images/email_hero_banner.jpg"
                        alt="Welcome to VIA ALTO"
                        className="w-full h-auto object-cover block"
                      />
                    </div>

                    {/* 3. สิ่งที่จะได้รับจากเรา (4 Columns with Extracted Icons) */}
                    <div className="px-4 py-7 text-center">
                      <h3 className="text-base font-bold text-[#183C32] mb-6 tracking-wide">
                        {currentLang === 'th' ? 'สิ่งที่จะได้รับจากเรา' : 'What You Will Receive'}
                      </h3>

                      <div className="grid grid-cols-4 gap-1.5 mb-7">
                        {/* Benefit 1 */}
                        <div className="border-r border-[#E5DFD7] pr-1.5 flex flex-col items-center text-center">
                          <div className="h-10 flex items-center justify-center mb-2">
                            <img src="/images/icon_promo.png" alt="โปรโมชั่นพิเศษ" className="h-7 w-auto object-contain" />
                          </div>
                          <h4 className="text-[10px] font-bold text-[#183C32] leading-tight mb-1">
                            {currentLang === 'th' ? 'โปรโมชั่นพิเศษ' : 'Special Offers'}<br />
                            <span className="text-[9px] font-semibold text-[#183C32]">{currentLang === 'th' ? 'เฉพาะสมาชิก' : 'Members Only'}</span>
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight">
                            {currentLang === 'th' ? 'รับส่วนลดและข้อเสนอสุดพิเศษก่อนใคร' : 'Exclusive discounts and member perks'}
                          </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="border-r border-[#E5DFD7] px-1 flex flex-col items-center text-center">
                          <div className="h-10 flex items-center justify-center mb-2">
                            <img src="/images/icon_new.png" alt="สินค้าใหม่" className="h-7 w-auto object-contain" />
                          </div>
                          <h4 className="text-[10px] font-bold text-[#183C32] leading-tight mb-1">
                            {currentLang === 'th' ? 'สินค้าใหม่' : 'New Arrivals'}<br />
                            <span className="text-[9px] font-semibold text-[#183C32]">{currentLang === 'th' ? 'และคอลเลกชันล่าสุด' : 'Latest Drops'}</span>
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight">
                            {currentLang === 'th' ? 'อัปเดตคอลเลกชันใหม่และสินค้าน่าสนใจ' : 'Latest collections and alpine gear'}
                          </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="border-r border-[#E5DFD7] px-1 flex flex-col items-center text-center">
                          <div className="h-10 flex items-center justify-center mb-2">
                            <img src="/images/icon_mountain.png" alt="เรื่องราวและแรงบันดาลใจ" className="h-7 w-auto object-contain" />
                          </div>
                          <h4 className="text-[10px] font-bold text-[#183C32] leading-tight mb-1">
                            {currentLang === 'th' ? 'แรงบันดาลใจ' : 'Adventures'}<br />
                            <span className="text-[9px] font-semibold text-[#183C32]">{currentLang === 'th' ? 'จากการผจญภัย' : '& Stories'}</span>
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight">
                            {currentLang === 'th' ? 'บทความ แนะนำเส้นทางและไลฟ์สไตล์' : 'Route guides and trail inspiration'}
                          </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="pl-1 flex flex-col items-center text-center">
                          <div className="h-10 flex items-center justify-center mb-2">
                            <img src="/images/icon_guide.png" alt="เคล็ดลับและคำแนะนำ" className="h-7 w-auto object-contain" />
                          </div>
                          <h4 className="text-[10px] font-bold text-[#183C32] leading-tight mb-1">
                            {currentLang === 'th' ? 'เคล็ดลับและวิธีใช้' : 'Gear Care'}<br />
                            <span className="text-[9px] font-semibold text-[#183C32]">{currentLang === 'th' ? 'การใช้งานสินค้า' : '& Tips'}</span>
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight">
                            {currentLang === 'th' ? 'ดูแลอุปกรณ์ของคุณให้ใช้งานได้ยาวนาน' : 'Maintain equipment for longer life'}
                          </p>
                        </div>
                      </div>

                      {/* Action Button: Start Exploring */}
                      <div className="pt-1">
                        <button
                          onClick={() => {
                            onClose();
                            onNavigate?.('home');
                          }}
                          className="w-full max-w-xs mx-auto py-3 bg-[#183C32] hover:bg-[#11241D] text-white rounded-full font-bold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{currentLang === 'th' ? 'เริ่มต้นสำรวจสินค้า →' : 'EXPLORE COLLECTION →'}</span>
                        </button>
                      </div>

                      {/* Subtext */}
                      <p className="mt-4 text-[10px] text-[#6E7D75]">
                        {currentLang === 'th'
                          ? 'ขอบคุณที่ไว้วางใจ VIA ALTO แล้วพบกันในอีเมลฉบับต่อไป'
                          : 'Thank you for trusting VIA ALTO. See you in the next dispatch.'}
                      </p>
                    </div>

                    {/* 4. Footer (Deep Forest Alpine Green with Circular Logo & Socials) */}
                    <div className="bg-[#11241D] px-5 py-4 border-t border-white/10 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/circular_logo.png"
                          alt="VIA ALTO"
                          className="w-8 h-8 rounded-full object-cover border border-white/20"
                          onError={(e) => { e.target.src = '/images/logo.png'; }}
                        />
                        <div>
                          <span className="font-serif text-sm font-bold tracking-wider block leading-none">
                            VIA ALTO
                          </span>
                          <span className="text-[7px] tracking-[1.5px] uppercase text-[#9FB3A6] block mt-0.5">
                            OUTDOOR EQUIPMENT
                          </span>
                          <span className="text-[7.5px] tracking-[1.2px] text-[#E8DDCC] font-bold block mt-0.5">
                            GO BEYOND.
                          </span>
                        </div>
                      </div>

                      <div className="h-7 w-[1px] bg-white/20 mx-2" />

                      {/* Social Badges */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px] font-bold">f</span>
                        <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">📸</span>
                        <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">▶</span>
                        <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">🔗</span>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* ========================================================================= */
                  /* TEMPLATE 2: PERSONALIZED RECOMMENDATION EMAIL (VIA ALTO Standard)         */
                  /* ========================================================================= */
                  <div className="bg-[#FAF7F2] text-[#183C32] font-sans antialiased shadow-md">
                    
                    {/* 1. Header (Cream with Circular Logo & GO BEYOND) */}
                    <div className="px-5 py-4 border-b border-[#E5DFD7] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/circular_logo.png"
                          alt="VIA ALTO Logo"
                          className="w-10 h-10 rounded-full object-cover border border-[#183C32]/20 shadow-sm"
                          onError={(e) => { e.target.src = '/images/logo.png'; }}
                        />
                        <div>
                          <span className="font-serif text-lg font-bold tracking-wider text-[#183C32] block leading-none">
                            VIA ALTO
                          </span>
                          <span className="text-[8px] tracking-[2px] font-semibold text-[#5C6E63] uppercase block mt-1">
                            OUTDOOR EQUIPMENT
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#183C32]/40 font-light">|</span>
                        <span className="text-[10px] font-extrabold tracking-[2px] text-[#183C32] uppercase">
                          GO BEYOND.
                        </span>
                      </div>
                    </div>

                    {/* 2. Hero Section & Contour Voucher Banner */}
                    <div className="w-full bg-[#141A16] overflow-hidden">
                      <img
                        src="/images/recom_hero_banner.jpg"
                        alt="Your Next Adventure Awaits"
                        className="w-full h-auto object-cover block"
                      />
                    </div>

                    {/* 3. Section Title: OUR TOP PICKS FOR YOU */}
                    <div className="px-4 pt-7 pb-4 text-center">
                      <div className="text-[11px] font-extrabold tracking-[2px] text-[#183C32] uppercase">
                        &mdash;&mdash;&nbsp; OUR TOP PICKS FOR YOU &nbsp;&mdash;&mdash;
                      </div>
                      <p className="text-[10px] text-[#6E7D75] mt-1.5">
                        {currentLang === 'th'
                          ? 'สินค้าของดีเยี่ยมที่เหมาะกับสไตล์การเดินทางและการผจญภัยของคุณ'
                          : 'Curated premium equipment engineered for your next trail ascent'}
                      </p>
                    </div>

                    {/* 4. 3 Product Cards Side-by-Side */}
                    <div className="px-3 pb-6">
                      <div className="grid grid-cols-3 gap-2">
                        
                        {/* Card 1: Alpine 35L Backpack */}
                        <div className="flex flex-col">
                          <div className="rounded overflow-hidden bg-[#141A16] shadow-sm">
                            <img
                              src="/images/recom_card_img_1.jpg"
                              alt="Alpine 35L Backpack"
                              className="w-full h-auto object-cover block"
                            />
                          </div>
                          <span className="text-[7.5px] font-bold tracking-[1.5px] uppercase text-[#7D8D84] mt-2 block">
                            BACKPACKS
                          </span>
                          <h4 className="text-[10.5px] font-bold text-[#183C32] leading-tight mt-0.5 truncate">
                            Alpine 35L Backpack
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight mt-1 line-clamp-2 min-h-[22px]">
                            {currentLang === 'th'
                              ? 'กระเป๋าเป้ขนาดพอดี เหมาะสำหรับทั้งทริปสั้นและทริปหลายวัน'
                              : 'Optimal size backpack for technical treks.'}
                          </p>
                          <div className="text-[9px] text-[#183C32] mt-1">
                            ★★★★★ <span className="text-[8px] text-[#7D8D84]">(128)</span>
                          </div>
                          <div className="text-[12px] font-extrabold text-[#183C32] mt-1">
                            ฿2,490
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <button
                              onClick={() => {
                                onClose();
                                onNavigate?.('shop');
                              }}
                              className="flex-1 py-1.5 bg-[#183C32] hover:bg-[#11241D] text-white rounded-full text-[8.5px] font-bold text-center transition-all cursor-pointer"
                            >
                              🛒 เพิ่มใส่ตะกร้า
                            </button>
                            <span className="w-5 h-5 rounded-full border border-[#D5CEBF] flex items-center justify-center text-[9px] text-[#183C32] cursor-pointer">
                              ♡
                            </span>
                          </div>
                        </div>

                        {/* Card 2: Alpine Shell Jacket */}
                        <div className="flex flex-col">
                          <div className="rounded overflow-hidden bg-[#141A16] shadow-sm">
                            <img
                              src="/images/recom_card_img_2.jpg"
                              alt="Alpine Shell Jacket"
                              className="w-full h-auto object-cover block"
                            />
                          </div>
                          <span className="text-[7.5px] font-bold tracking-[1.5px] uppercase text-[#7D8D84] mt-2 block">
                            CLOTHING
                          </span>
                          <h4 className="text-[10.5px] font-bold text-[#183C32] leading-tight mt-0.5 truncate">
                            Alpine Shell Jacket
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight mt-1 line-clamp-2 min-h-[22px]">
                            {currentLang === 'th'
                              ? 'แจ็คเก็ตกันลม กันน้ำ ระบายอากาศได้ดี เหมาะกับทุกสภาพอากาศ'
                              : 'Weatherproof breathable 3-layer alpine shell.'}
                          </p>
                          <div className="text-[9px] text-[#183C32] mt-1">
                            ★★★★★ <span className="text-[8px] text-[#7D8D84]">(74)</span>
                          </div>
                          <div className="text-[12px] font-extrabold text-[#183C32] mt-1">
                            ฿2,890
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <button
                              onClick={() => {
                                onClose();
                                onNavigate?.('shop');
                              }}
                              className="flex-1 py-1.5 bg-[#183C32] hover:bg-[#11241D] text-white rounded-full text-[8.5px] font-bold text-center transition-all cursor-pointer"
                            >
                              🛒 เพิ่มใส่ตะกร้า
                            </button>
                            <span className="w-5 h-5 rounded-full border border-[#D5CEBF] flex items-center justify-center text-[9px] text-[#183C32] cursor-pointer">
                              ♡
                            </span>
                          </div>
                        </div>

                        {/* Card 3: Terra Hiking Shoes */}
                        <div className="flex flex-col">
                          <div className="rounded overflow-hidden bg-[#141A16] shadow-sm">
                            <img
                              src="/images/recom_card_img_3.jpg"
                              alt="Terra Hiking Shoes"
                              className="w-full h-auto object-cover block"
                            />
                          </div>
                          <span className="text-[7.5px] font-bold tracking-[1.5px] uppercase text-[#7D8D84] mt-2 block">
                            FOOTWEAR
                          </span>
                          <h4 className="text-[10.5px] font-bold text-[#183C32] leading-tight mt-0.5 truncate">
                            Terra Hiking Shoes
                          </h4>
                          <p className="text-[8px] text-[#6E7D75] leading-tight mt-1 line-clamp-2 min-h-[22px]">
                            {currentLang === 'th'
                              ? 'รองเท้าเดินป่า น้ำหนักเบา ยึดเกาะดีเยี่ยมทุกเส้นทาง'
                              : 'High-traction lightweight alpine trail shoes.'}
                          </p>
                          <div className="text-[9px] text-[#183C32] mt-1">
                            ★★★★★ <span className="text-[8px] text-[#7D8D84]">(96)</span>
                          </div>
                          <div className="text-[12px] font-extrabold text-[#183C32] mt-1">
                            ฿3,290
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <button
                              onClick={() => {
                                onClose();
                                onNavigate?.('shop');
                              }}
                              className="flex-1 py-1.5 bg-[#183C32] hover:bg-[#11241D] text-white rounded-full text-[8.5px] font-bold text-center transition-all cursor-pointer"
                            >
                              🛒 เพิ่มใส่ตะกร้า
                            </button>
                            <span className="w-5 h-5 rounded-full border border-[#D5CEBF] flex items-center justify-center text-[9px] text-[#183C32] cursor-pointer">
                              ♡
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* View All Products Button */}
                      <div className="pt-6 text-center">
                        <button
                          onClick={() => {
                            onClose();
                            onNavigate?.('shop');
                          }}
                          className="w-full max-w-xs mx-auto py-3 bg-[#183C32] hover:bg-[#11241D] text-white rounded-full font-bold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>{currentLang === 'th' ? 'ดูสินค้าทั้งหมด →' : 'VIEW ALL PRODUCTS →'}</span>
                        </button>
                      </div>

                      {/* Subtext */}
                      <p className="mt-4 text-[10px] text-[#6E7D75] text-center">
                        {currentLang === 'th'
                          ? 'ขอบคุณที่ไว้วางใจ VIA ALTO แล้วพบกันในเส้นทางถัดไป'
                          : 'Thank you for choosing VIA ALTO. See you on the trail.'}
                      </p>
                    </div>

                    {/* 5. Footer (Deep Forest Alpine Green with Circular Logo & Socials) */}
                    <div className="bg-[#11241D] px-5 py-4 border-t border-white/10 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src="/images/circular_logo.png"
                            alt="VIA ALTO"
                            className="w-8 h-8 rounded-full object-cover border border-white/20"
                            onError={(e) => { e.target.src = '/images/logo.png'; }}
                          />
                          <div>
                            <span className="font-serif text-sm font-bold tracking-wider block leading-none">
                              VIA ALTO
                            </span>
                            <span className="text-[7px] tracking-[1.5px] uppercase text-[#9FB3A6] block mt-0.5">
                              OUTDOOR EQUIPMENT
                            </span>
                            <span className="text-[7.5px] tracking-[1.2px] text-[#E8DDCC] font-bold block mt-0.5">
                              GO BEYOND.
                            </span>
                          </div>
                        </div>

                        <div className="h-7 w-[1px] bg-white/20 mx-2" />

                        {/* Social Badges */}
                        <div className="flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px] font-bold">f</span>
                          <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">📸</span>
                          <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">▶</span>
                          <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">🔗</span>
                        </div>
                      </div>

                      {/* Sub-footer Links */}
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[9px]">
                        <span className="text-[#7E9186]">&copy; 2024 VIA ALTO. All rights reserved.</span>
                        <div className="flex items-center gap-2 text-[#9FB3A6]">
                          <span>ร้านค้า</span>
                          <span>|</span>
                          <span>หมวดหมู่</span>
                          <span>|</span>
                          <span>เกี่ยวกับเรา</span>
                          <span>|</span>
                          <span>ติดต่อเรา</span>
                        </div>
                      </div>
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
