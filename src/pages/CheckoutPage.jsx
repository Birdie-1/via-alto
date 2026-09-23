import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  ArrowLeft,
  Check,
  Tag,
  Lock,
  Leaf,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { formatPrice } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
// บรรทัดที่ 18: นำเข้าฟังก์ชันดึงข้อมูลจังหวัด อำเภอ และรหัสไปรษณีย์จาก locationService
import {
  fetchProvinces,
  fetchDistricts,
  fetchPostalCode,
  findProvince
} from '../services/locationService';

export default function CheckoutPage({
  user,
  cartItems = [],
  onPlaceOrder,
  onNavigate,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Form State
  const [fullName, setFullName] = useState(user?.shippingAddress?.fullName || user?.fullName || '');
  // บรรทัดที่ 46: อีเมลสำหรับรับใบเสร็จ E-Receipt (ดึงจากผู้ใช้ หรือให้กรอกใหม่ได้)
  const [email, setEmail] = useState(user?.shippingAddress?.email || user?.email || '');
  const [phone, setPhone] = useState(user?.shippingAddress?.telNo || user?.telNo || '');
  const [address1, setAddress1] = useState(user?.shippingAddress?.address1 || '');
  const [address2, setAddress2] = useState(user?.shippingAddress?.address2 || '');
  const [district, setDistrict] = useState(user?.shippingAddress?.district || '');
  const [province, setProvince] = useState(user?.shippingAddress?.province || (lang === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok'));
  const [postalCode, setPostalCode] = useState(user?.shippingAddress?.postalCode || '');
  const [saveAddress, setSaveAddress] = useState(true);

  // บรรทัดที่ 48: State สำหรับเก็บรายชื่อ 77 จังหวัด และรายชื่ออำเภอตามจังหวัดที่เลือก
  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  // บรรทัดที่ 53: โหลดรายชื่อ 77 จังหวัดทั้งหมดเมื่อ Component Mount หรือเมื่อภาษาเปลี่ยน
  useEffect(() => {
    let isMounted = true;
    fetchProvinces(lang).then((data) => {
      if (isMounted && data) {
        setProvincesList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  // บรรทัดที่ 66: ดึงรายชื่ออำเภอ/เขต เมื่อเลือกหรือสลับจังหวัด
  useEffect(() => {
    if (!province) {
      setDistrictsList([]);
      return;
    }

    let isMounted = true;
    setIsLoadingDistricts(true);

    fetchDistricts(province, lang)
      .then((dists) => {
        if (!isMounted) return;
        setDistrictsList(dists);
        setIsLoadingDistricts(false);

        // ตรวจสอบว่าอำเภอที่เลือกไว้เดิม ยังมีอยู่ในจังหวัดใหม่หรือไม่
        if (district) {
          const match = dists.find((d) =>
            d.name_en.toLowerCase() === district.toLowerCase() ||
            d.name_th.toLowerCase() === district.toLowerCase() ||
            d.name_th.replace(/^(เขต|อำเภอ)/, '').toLowerCase() === district.toLowerCase()
          );
          if (match) {
            // ซิงค์ชื่ออำเภอให้ตรงกับภาษาที่แสดงผลปัจจุบัน (TH / EN)
            const localizedName = lang === 'th' ? match.name_th : match.name_en;
            if (district !== localizedName) {
              setDistrict(localizedName);
            }
            // หากยังไม่มีรหัสไปรษณีย์ ให้เติมรหัสไปรษณีย์หลักของอำเภอให้อัตโนมัติ
            if (!postalCode && match.zip_code) {
              setPostalCode(match.zip_code);
            }
          }
        }
      })
      .catch((err) => {
        console.warn('Failed to load districts:', err);
        if (isMounted) setIsLoadingDistricts(false);
      });

    return () => {
      isMounted = false;
    };
  }, [province, lang]);

  // บรรทัดที่ 113: ฟังก์ชันจัดการเมื่อผู้ใช้เลือกเปลี่ยนจังหวัดใน Dropdown
  const handleProvinceChange = (e) => {
    const selectedProv = e.target.value;
    setProvince(selectedProv);
    // รีเซ็ตค่าอำเภอและรหัสไปรษณีย์เพื่อป้องกันความขัดแย้งของข้อมูล
    setDistrict('');
    setPostalCode('');
  };

  // บรรทัดที่ 122: ฟังก์ชันจัดการเมื่อผู้ใช้เลือกเขต/อำเภอ พร้อม Auto-fill รหัสไปรษณีย์
  const handleDistrictChange = (e) => {
    const selectedDist = e.target.value;
    setDistrict(selectedDist);

    // Auto-fill รหัสไปรษณีย์อัตโนมัติจากอำเภอที่เลือก
    if (selectedDist) {
      const autoZip = fetchPostalCode(province, selectedDist);
      if (autoZip) {
        setPostalCode(autoZip);
      }
    }
  };

  // Payment Method: 'card' | 'promptpay' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('promptpay');

  // Card Mock Inputs
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('789');

  // Voucher / Discount State
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Auto-fill from user object when it updates
  useEffect(() => {
    if (user?.shippingAddress) {
      setFullName(user.shippingAddress.fullName || user.fullName || '');
      setEmail(user.shippingAddress.email || user.email || '');
      setPhone(user.shippingAddress.telNo || user.telNo || '');
      setAddress1(user.shippingAddress.address1 || '');
      setAddress2(user.shippingAddress.address2 || '');
      const rawProv = user.shippingAddress.province || 'Bangkok';
      const matchedProv = findProvince(rawProv);
      const localizedProv = matchedProv ? (lang === 'th' ? matchedProv.name_th : matchedProv.name_en) : rawProv;
      setProvince(localizedProv);
      setDistrict(user.shippingAddress.district || '');
      setPostalCode(user.shippingAddress.postalCode || '');
    } else if (user) {
      if (!fullName) setFullName(user.fullName || '');
      if (!email) setEmail(user.email || '');
      if (!phone) setPhone(user.telNo || '');
    }
  }, [user]);

  // Auto-apply voucher from localStorage if user arrived via promo/email link
  useEffect(() => {
    const savedVoucher = localStorage.getItem('via_alto_active_voucher');
    if (savedVoucher && !appliedVoucher) {
      handleApplyVoucher(savedVoucher);
    }
  }, []);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Free shipping threshold: 2,000 THB (ยอดซื้อครบ 2,000 บาท จัดส่งฟรี)
  const shippingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 150;

  // บรรทัดที่ 103: คำนวณส่วนลดจากโค้ดคูปอง (Voucher Discount)
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discount.includes('%')) {
      const pct = parseInt(appliedVoucher.discount.replace(/[^0-9]/g, ''), 10);
      discountAmount = Math.round((subtotal * pct) / 100);
    } else {
      // ส่วนลดแบบจำนวนเงินคงที่ เช่น ฿150 OFF
      const flat = parseInt(appliedVoucher.discount.replace(/[^0-9]/g, ''), 10);
      discountAmount = Math.min(subtotal, flat);
    }
  }

  // บรรทัดที่ 115: กำหนดค่าธรรมเนียมบริการเก็บเงินปลายทาง (COD) หากเลือกชำระแบบ COD คิด 50 บาท
  const codFee = paymentMethod === 'cod' ? 50 : 0;

  // บรรทัดที่ 118: คำนวณยอดสุทธิทั้งสิ้น (ยอดรวมสินค้า - ส่วนลด + ค่าส่ง + ค่าบริการ COD)
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + codFee);

  // Apply Voucher
  const handleApplyVoucher = (codeToApply) => {
    const targetCode = (codeToApply || voucherInput).trim().toUpperCase();
    setVoucherError('');

    if (!targetCode) return;

    // Check available user vouchers or hardcoded valid vouchers
    const userVouchers = user?.vouchers || [];
    const matched = userVouchers.find((v) => v.code.toUpperCase() === targetCode && v.isValid);

    if (matched) {
      setAppliedVoucher(matched);
      setVoucherInput(matched.code);
      localStorage.setItem('via_alto_active_voucher', matched.code);
    } else if (targetCode === 'WELCOME10' || targetCode === 'GOBEYOND10') {
      setAppliedVoucher({
        code: targetCode,
        discount: '10% OFF',
        description: 'Welcome Explorer 10% discount on your order'
      });
      setVoucherInput(targetCode);
      localStorage.setItem('via_alto_active_voucher', targetCode);
    } else if (targetCode === 'SUMMIT15') {
      setAppliedVoucher({
        code: 'SUMMIT15',
        discount: '15% OFF',
        description: 'Annual VIP Alpine Birthday Reward Voucher'
      });
      setVoucherInput('SUMMIT15');
      localStorage.setItem('via_alto_active_voucher', 'SUMMIT15');
    } else if (targetCode === 'FRIEND150') {
      setAppliedVoucher({
        code: 'FRIEND150',
        discount: '฿150 OFF',
        description: 'Explorer Referral Invitation Bonus'
      });
      setVoucherInput('FRIEND150');
      localStorage.setItem('via_alto_active_voucher', 'FRIEND150');
    } else {
      setVoucherError(t.checkout_voucher_invalid);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherInput('');
    setVoucherError('');
    localStorage.removeItem('via_alto_active_voucher');
  };

  // Submit Order
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !address1.trim() || !district.trim() || !postalCode.trim()) {
      setFormError(t.checkout_required_fields);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (cartItems.length === 0) {
      setFormError(t.checkout_empty_cart);
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      orderId: `VA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      items: cartItems.map((item) => ({
        id: item.product.id,
        name: lang === 'th' ? item.product.name_th || item.product.name : item.product.name,
        price: item.product.price,
        qty: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
        image: item.selectedColor?.image || item.product.image
      })),
      shippingAddress: {
        fullName,
        email,
        telNo: phone,
        address1,
        address2,
        district,
        province,
        postalCode
      },
      saveAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      discount: discountAmount,
      codFee,
      total: grandTotal,
      appliedVoucherCode: appliedVoucher?.code || null
    };

    // Simulate order placement delay for realistic UX
    setTimeout(() => {
      onPlaceOrder(orderData);
      setIsSubmitting(false);
    }, 900);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4">
        <div className="bg-white border border-stone-light p-8 max-w-md text-center space-y-4 shadow-sm">
          <AlertCircle size={36} className="text-stone mx-auto" />
          <h2 className="font-serif text-2xl text-charcoal">{t.checkout_empty_cart}</h2>
          <Button variant="primary" onClick={() => onNavigate('shop')}>
            {t.cart_explore}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-stone hover:text-forest transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} className="mr-1.5" />
          {t.checkout_back_to_cart}
        </button>
      </div>

      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-mono tracking-widest text-forest font-semibold uppercase">
          VIA ALTO LOGISTICS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold tracking-tight mt-1">
          {t.checkout_page_title}
        </h1>
        <p className="text-xs sm:text-sm text-stone mt-1 font-sans">
          {t.checkout_page_subtitle}
        </p>
      </div>

      {formError && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT COLUMN: Shipping + Payment + Voucher */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Shipping Address Section */}
          <div className="bg-white border border-stone-light p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-light/60 pb-3">
              <h2 className="font-serif text-lg font-bold tracking-wide uppercase text-charcoal flex items-center gap-2">
                <Truck size={18} className="text-forest" />
                {t.checkout_step_shipping}
              </h2>
              {user && (
                <span className="text-[11px] font-mono text-stone">
                  {user.tier}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  {t.checkout_recipient_name} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marco Silva"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  {t.checkout_recipient_phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 089-452-9182"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal font-mono"
                />
              </div>

              {/* ช่องกรอกอีเมลสำหรับรับใบเสร็จรับเงินอิเล็กทรอนิกส์ (E-Receipt) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{lang === 'th' ? 'อีเมลสำหรับรับใบเสร็จ (E-Receipt Email) *' : 'Email for E-Receipt *'}</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    {lang === 'th' ? 'ระบบจะส่งใบเสร็จรับเงินไปยังอีเมลนี้ทันที' : 'E-Receipt will be dispatched here'}
                  </span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. narueborde@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  {t.checkout_address_line1} *
                </label>
                <input
                  type="text"
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="e.g. 88/12 Alpine Ridge Condominium, Sukhumvit 55"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone uppercase tracking-wider mb-1.5">
                  {t.checkout_address_line2}
                </label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="e.g. Thonglor Soi 10, Floor 14"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal"
                />
              </div>

              {/* บรรทัดที่ 452: ช่องเลือกจังหวัด (Province Dropdown - 77 จังหวัดทั่วไทย) */}
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  {t.checkout_province} *
                </label>
                <select
                  required
                  value={province}
                  onChange={handleProvinceChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal cursor-pointer"
                >
                  <option value="">{t.checkout_select_province}</option>
                  {provincesList.map((prov) => {
                    const provName = lang === 'th' ? prov.name_th : prov.name_en;
                    return (
                      <option key={prov.id} value={provName}>
                        {provName}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* บรรทัดที่ 473: ช่องเลือกเขต/อำเภอ (District Dropdown - กรองตามจังหวัดที่เลือก) */}
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  {t.checkout_district} *
                </label>
                <select
                  required
                  value={district}
                  onChange={handleDistrictChange}
                  disabled={!province || isLoadingDistricts}
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal cursor-pointer ${
                    !province || isLoadingDistricts ? 'opacity-60 cursor-not-allowed bg-stone-100' : ''
                  }`}
                >
                  <option value="">
                    {!province
                      ? (lang === 'th' ? '-- กรุณาเลือกจังหวัดก่อน --' : '-- Select Province First --')
                      : isLoadingDistricts
                      ? t.checkout_loading_districts
                      : t.checkout_select_district}
                  </option>
                  {districtsList.map((d) => {
                    const distName = lang === 'th' ? d.name_th : d.name_en;
                    return (
                      <option key={d.id} value={distName}>
                        {distName} {d.zip_code ? `(${d.zip_code})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* บรรทัดที่ 505: ช่องรหัสไปรษณีย์ (Auto-fill พร้อม Badge แสดงสถานะและแก้ไขได้) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
                    {t.checkout_postal_code} *
                  </label>
                  {postalCode && district && (
                    <span className="text-[10px] text-emerald-700 font-medium">
                      {lang === 'th' ? '✓ เติมอัตโนมัติ' : '✓ Auto-filled'}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="e.g. 10110"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F5F0] border border-stone-light focus:outline-none focus:border-forest text-charcoal font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="accent-forest w-3.5 h-3.5"
                />
                <span className="text-xs text-stone font-sans">
                  {t.checkout_save_default_addr}
                </span>
              </label>
            </div>
          </div>

          {/* 2. Payment Method Section */}
          <div className="bg-white border border-stone-light p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-light/60 pb-3">
              <h2 className="font-serif text-lg font-bold tracking-wide uppercase text-charcoal flex items-center gap-2">
                <CreditCard size={18} className="text-forest" />
                {t.checkout_step_payment}
              </h2>
              <span className="text-[11px] font-mono text-stone flex items-center gap-1">
                <Lock size={12} className="text-forest" />
                256-Bit SSL
              </span>
            </div>

            <div className="space-y-3">
              {/* Option 1: PromptPay QR */}
              <div
                onClick={() => setPaymentMethod('promptpay')}
                className={`p-4 border cursor-pointer transition-all ${
                  paymentMethod === 'promptpay'
                    ? 'border-forest bg-forest/5'
                    : 'border-stone-light hover:border-stone bg-[#F7F5F0]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
                      {paymentMethod === 'promptpay' && (
                        <div className="w-2.5 h-2.5 bg-forest rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-charcoal flex items-center gap-2">
                        <QrCode size={16} className="text-forest" />
                        {t.checkout_pay_promptpay}
                      </h4>
                      <p className="text-[11px] text-stone mt-0.5">
                        {t.checkout_pay_promptpay_desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    INSTANT
                  </span>
                </div>

                {paymentMethod === 'promptpay' && (
                  <div className="mt-4 pt-4 border-t border-forest/20 flex flex-col sm:flex-row items-center gap-4 bg-white p-4 border border-stone-light">
                    {/* Simulated Alpine QR Code */}
                    <div className="w-28 h-28 bg-[#183C32] p-2 flex flex-col items-center justify-between text-white shrink-0">
                      <div className="w-full flex justify-between">
                        <div className="w-5 h-5 border-2 border-white bg-transparent" />
                        <div className="w-5 h-5 border-2 border-white bg-transparent" />
                      </div>
                      <div className="font-mono text-[9px] tracking-widest text-center">
                        PROMPTPAY
                      </div>
                      <div className="w-full flex justify-between items-end">
                        <div className="w-5 h-5 border-2 border-white bg-transparent" />
                        <div className="w-3 h-3 bg-white" />
                      </div>
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-mono text-stone uppercase tracking-wider">
                        Biller ID: 0105562098412
                      </span>
                      <h5 className="text-xs font-bold text-charcoal">
                        VIA ALTO (THAILAND) CO., LTD.
                      </h5>
                      <p className="text-[11px] text-stone">
                        {lang === 'th'
                          ? 'คำสั่งซื้อจะได้รับการยืนยันทันทีหลังกดสั่งซื้อ'
                          : 'Scan QR with any Thai banking app. Auto-verifies upon placing order.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: Credit Card */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-forest bg-forest/5'
                    : 'border-stone-light hover:border-stone bg-[#F7F5F0]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
                      {paymentMethod === 'card' && (
                        <div className="w-2.5 h-2.5 bg-forest rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-charcoal flex items-center gap-2">
                        <CreditCard size={16} className="text-forest" />
                        {t.checkout_pay_card}
                      </h4>
                      <p className="text-[11px] text-stone mt-0.5">
                        {t.checkout_pay_card_desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-stone-100 text-stone-700 border border-stone-200">
                      VISA
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-stone-100 text-stone-700 border border-stone-200">
                      MC
                    </span>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-4 pt-4 border-t border-forest/20 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 border border-stone-light">
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        {t.checkout_card_number}
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-stone-light font-mono focus:outline-none focus:border-forest"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        {t.checkout_card_expiry}
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-stone-light font-mono focus:outline-none focus:border-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-charcoal uppercase tracking-wider mb-1">
                        {t.checkout_card_cvv}
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#F7F5F0] border border-stone-light font-mono focus:outline-none focus:border-forest"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Cash on Delivery (COD) */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-forest bg-forest/5'
                    : 'border-stone-light hover:border-stone bg-[#F7F5F0]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
                      {paymentMethod === 'cod' && (
                        <div className="w-2.5 h-2.5 bg-forest rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-charcoal flex items-center gap-2">
                        <Truck size={16} className="text-forest" />
                        {t.checkout_pay_cod}
                      </h4>
                      <p className="text-[11px] text-stone mt-0.5">
                        {t.checkout_pay_cod_desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-stone font-bold">
                    +฿50
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Expedition Voucher Section */}
          <div className="bg-white border border-stone-light p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-light/60 pb-3">
              <h2 className="font-serif text-sm font-bold tracking-wide uppercase text-charcoal flex items-center gap-2">
                <Tag size={16} className="text-forest" />
                {t.checkout_voucher_title}
              </h2>
            </div>

            {appliedVoucher ? (
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check size={14} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-900">
                      {appliedVoucher.code} ({appliedVoucher.discount})
                    </span>
                    <p className="text-[11px] text-emerald-700">
                      {appliedVoucher.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveVoucher}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                >
                  {t.checkout_voucher_remove}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder={t.checkout_voucher_placeholder}
                    className="flex-1 px-3.5 py-2 text-xs bg-[#F7F5F0] border border-stone-light font-mono uppercase focus:outline-none focus:border-forest"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleApplyVoucher()}
                  >
                    {t.checkout_voucher_apply}
                  </Button>
                </div>

                {voucherError && (
                  <p className="text-xs text-red-600 font-sans">
                    {voucherError}
                  </p>
                )}

                {/* Quick select from user vouchers */}
                {user?.vouchers?.filter((v) => v.isValid)?.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone block mb-2">
                      {lang === 'th' ? 'คูปองของคุณที่พร้อมใช้งาน (คลิกเพื่อใส่):' : 'Available Explorer Vouchers (click to apply):'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {user.vouchers
                        .filter((v) => v.isValid)
                        .map((v) => (
                          <button
                            key={v.code}
                            type="button"
                            onClick={() => handleApplyVoucher(v.code)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige/60 hover:bg-beige border border-stone-light text-[11px] font-mono font-bold text-forest transition-colors cursor-pointer"
                          >
                            <Tag size={12} />
                            <span>{v.code}</span>
                            <span className="text-charcoal font-normal">({v.discount})</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white border border-stone-light p-6 sm:p-8 space-y-6 shadow-md">
            <div className="border-b border-stone-light/60 pb-3 flex justify-between items-center">
              <h2 className="font-serif text-lg font-bold tracking-wide uppercase text-charcoal">
                {t.checkout_step_summary}
              </h2>
              <span className="text-xs font-mono text-stone">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {lang === 'th' ? 'รายการ' : 'ITEMS'}
              </span>
            </div>

            {/* Scrollable Item List */}
            <div className="max-h-64 overflow-y-auto divide-y divide-stone-light/40 pr-1 space-y-3">
              {cartItems.map((item, index) => {
                const pName = lang === 'th' ? item.product.name_th || item.product.name : item.product.name;
                const itemImg = item.selectedColor?.image || item.product.image;
                const colorName = item.selectedColor
                  ? (lang === 'th' ? item.selectedColor.name_th || item.selectedColor.name : item.selectedColor.name)
                  : null;

                return (
                  <div key={index} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-[#F7F5F0] border border-stone-light/60 shrink-0 overflow-hidden">
                        <img src={itemImg} alt={pName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-charcoal line-clamp-1">
                          {pName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone mt-0.5">
                          {colorName && (
                            <span className="inline-flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span>{colorName}</span>
                            </span>
                          )}
                          {colorName && <span>•</span>}
                          <span>{item.selectedSize}</span>
                          <span>•</span>
                          <span className="font-mono font-bold text-charcoal">x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-charcoal font-mono shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-stone-light/60 text-xs">
              <div className="flex justify-between text-stone">
                <span>{t.checkout_subtotal}</span>
                <span className="font-mono text-charcoal">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-stone">
                <span>{t.checkout_shipping_fee}</span>
                <span className="font-mono text-charcoal">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                      {t.checkout_shipping_free}
                    </span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>{t.checkout_discount} ({appliedVoucher?.code})</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {codFee > 0 && (
                <div className="flex justify-between text-stone">
                  <span>{t.checkout_cod_fee}</span>
                  <span className="font-mono text-charcoal">+{formatPrice(codFee)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-light/60 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-charcoal uppercase">
                  {t.checkout_grand_total}
                </span>
                <span className="font-sans text-2xl font-bold text-forest">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.checkout_placing_order : `${t.checkout_place_order} • ${formatPrice(grandTotal)}`}
            </Button>

            {/* Alpine Assurance Badges */}
            <div className="pt-4 border-t border-stone-light/40 space-y-2 text-[11px] text-stone font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-forest shrink-0" />
                <span>30-Day Trail Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-forest shrink-0" />
                <span>100% Carbon-Neutral Alpine Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-forest shrink-0" />
                <span>Free Exchanges on Sizing & Fit</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
