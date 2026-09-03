import React, { useState } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Check,
  Gift,
  Compass,
  Sparkles,
  ArrowRight,
  UserCheck,
  Share2,
  MapPin,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import Button from '../ui/Button';
import { DEMO_USER } from '../../data/auth';

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = 'signin',
  onLoginSuccess,
  onRegisterSuccess
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [registerStep, setRegisterStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register Form State (Step 1 - Core Credentials & Growth Triggers)
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [telNo, setTelNo] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(true);

  // Register Form State (Step 2 - Explorer Marketing Profile & Attribution)
  const [primaryActivities, setPrimaryActivities] = useState(['trekking']);
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [apparelSize, setApparelSize] = useState('M');
  const [footwearSize, setFootwearSize] = useState('42');
  const [region, setRegion] = useState('northern');
  const [discoverySource, setDiscoverySource] = useState('instagram');
  const [lineId, setLineId] = useState('');

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setRegisterStep(1);
  };

  // Password Strength Calculation
  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-stone-light' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500', width: 'w-2/4' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-lime-600', width: 'w-3/4' };
    return { score: 4, label: 'Alpine Grade (Strong)', color: 'bg-emerald-600', width: 'w-full' };
  };

  const passwordStrength = calculatePasswordStrength(regPassword);

  // 1-Click Demo Login
  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess(DEMO_USER);
      setLoading(false);
      onClose();
    }, 400);
  };

  // Social Sign In Mockup Handler
  const handleSocialAuth = (provider) => {
    setLoading(true);
    setTimeout(() => {
      const socialUser = {
        ...DEMO_USER,
        id: `usr_${provider}_${Date.now()}`,
        fullName: `${provider === 'Google' ? 'Alex Rivera' : provider === 'LINE' ? 'Kenta Trekker' : 'Sarah Alpine'}`,
        email: `explorer.${provider.toLowerCase()}@via-alto.com`,
        tier: 'Alpine Ridge Member'
      };
      onLoginSuccess(socialUser);
      setLoading(false);
      onClose();
    }, 500);
  };

  // Sign In Submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!signInEmail || !signInPassword) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      onLoginSuccess({ email: signInEmail, password: signInPassword });
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
      setLoading(false);
    }
  };

  // Register Step 1 -> Step 2
  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim() || !regEmail.trim() || !regPassword.trim() || !telNo.trim()) {
      setError('Please fill in all required credentials.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setRegisterStep(2);
  };

  // Register Final Submit
  const handleFinalRegister = () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        fullName,
        email: regEmail,
        telNo,
        password: regPassword,
        dateOfBirth,
        referralCode,
        marketingConsent,
        marketingProfile: {
          primaryActivities,
          experienceLevel,
          sizes: {
            apparel: apparelSize,
            footwear: footwearSize
          },
          region,
          discoverySource,
          lineId
        }
      };
      onRegisterSuccess(payload);
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err.message || 'Registration failed.');
      setLoading(false);
    }
  };

  const toggleActivity = (actId) => {
    setPrimaryActivities((prev) =>
      prev.includes(actId) ? prev.filter((a) => a !== actId) : [...prev, actId]
    );
  };

  const activityOptions = [
    { id: 'day_hiking', label: 'Day Hiking' },
    { id: 'trekking', label: 'Alpine Trekking' },
    { id: 'camping', label: 'Mountain Camping' },
    { id: 'trail_running', label: 'Trail Running' },
    { id: 'travel', label: 'Travel & Lifestyle' }
  ];

  const discoverySources = [
    { id: 'instagram', label: 'Instagram / TikTok' },
    { id: 'friend', label: 'Fellow Hiker / Friend Referral' },
    { id: 'community', label: 'Trail Community / Facebook Group' },
    { id: 'youtube', label: 'YouTube Gear Review' },
    { id: 'search', label: 'Google / Search Engine' },
    { id: 'event', label: 'Outdoor Expo / Alpine Workshop' }
  ];

  const regions = [
    { id: 'northern', label: 'Northern Thailand (Doi & High Elevation)' },
    { id: 'central', label: 'Central & Bangkok (Urban & Weekend Trails)' },
    { id: 'southern', label: 'Southern & Coastal (Rain Shells & Island)' },
    { id: 'northeastern', label: 'Northeastern (Plateau & Forests)' },
    { id: 'international', label: 'International / Overseas Expeditions' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-[#F7F5F0] w-full max-w-lg border border-stone-light/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-charcoal rounded-full border border-stone-light/60 transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Brand Banner Top */}
        <div className="bg-[#183C32] text-offwhite p-6 sm:p-7 text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-2 border border-white/20">
            <Compass size={20} className="text-beige" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-offwhite">
            VIA ALTO EXPLORER CLUB
          </h2>
          <p className="text-xs text-beige tracking-brand-wide uppercase mt-1">
            GO BEYOND • THE PATH TO HIGHER GROUND
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-light/60 bg-white">
          <button
            onClick={() => handleTabChange('signin')}
            className={`flex-1 py-3 text-xs uppercase tracking-brand font-bold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'signin'
                ? 'border-forest text-forest bg-[#F7F5F0]'
                : 'border-transparent text-stone hover:text-charcoal'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`flex-1 py-3 text-xs uppercase tracking-brand font-bold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'register'
                ? 'border-forest text-forest bg-[#F7F5F0]'
                : 'border-transparent text-stone hover:text-charcoal'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <X size={14} />
            </button>
          </div>
        )}

        {/* TAB 1: SIGN IN */}
        {activeTab === 'signin' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Social Logins */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-brand font-bold text-stone block text-center">
                FAST 1-CLICK ACCESS
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="py-2.5 px-3 bg-white hover:bg-beige/40 border border-stone-light text-xs font-semibold text-charcoal flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-red-500">G</span> Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialAuth('LINE')}
                  className="py-2.5 px-3 bg-[#06C755]/10 hover:bg-[#06C755]/20 border border-[#06C755]/30 text-xs font-semibold text-[#05963E] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="font-bold">L</span> LINE
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Apple')}
                  className="py-2.5 px-3 bg-white hover:bg-beige/40 border border-stone-light text-xs font-semibold text-charcoal flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="font-bold"></span> Apple
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px bg-stone-light/70 flex-1" />
              <span className="text-[10px] uppercase tracking-wider text-stone">or email login</span>
              <div className="h-px bg-stone-light/70 flex-1" />
            </div>

            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. explorer@via-alto.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-light text-charcoal text-xs sm:text-sm font-sans focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs uppercase tracking-brand font-semibold text-charcoal">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo: Password reset token dispatched to email.')}
                    className="text-[11px] text-stone hover:text-forest underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-light text-charcoal text-xs sm:text-sm font-sans focus:outline-none focus:border-forest pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3"
                  disabled={loading}
                >
                  {loading ? 'SIGNING IN...' : 'SIGN IN TO ACCOUNT'}
                </Button>
              </div>
            </form>

            {/* Quick 1-Click Demo Login Bar */}
            <div className="pt-4 border-t border-stone-light/60 text-center space-y-2.5">
              <div className="inline-flex items-center gap-1 text-[11px] text-stone font-mono">
                <Sparkles size={13} className="text-forest" />
                <span>FOR DEMO & REVIEW PRESENTATION</span>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 bg-beige/60 hover:bg-beige text-charcoal border border-beige-dark/50 text-xs uppercase tracking-brand font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck size={16} className="text-forest" />
                <span>1-Click Demo Login (Marco Silva)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTER (2-STEP PROGRESSIVE PROFILING) */}
        {activeTab === 'register' && (
          <div className="p-6 sm:p-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-light/60">
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    registerStep === 1 ? 'bg-forest text-offwhite' : 'bg-forest/20 text-forest'
                  }`}
                >
                  1
                </div>
                <span
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    registerStep === 1 ? 'text-charcoal' : 'text-stone'
                  }`}
                >
                  Credentials & Rewards
                </span>
              </div>

              <div className="h-px w-8 bg-stone-light" />

              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    registerStep === 2 ? 'bg-forest text-offwhite' : 'bg-stone-light text-stone'
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    registerStep === 2 ? 'text-charcoal' : 'text-stone'
                  }`}
                >
                  Explorer Profile
                </span>
              </div>
            </div>

            {/* STEP 1: Basic Credentials + Password Strength + Birthday + Referral */}
            {registerStep === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Ranger"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-stone-light text-charcoal text-xs sm:text-sm focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-stone-light text-charcoal text-xs sm:text-sm focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08x-xxx-xxxx"
                      value={telNo}
                      onChange={(e) => setTelNo(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-stone-light text-charcoal text-xs sm:text-sm focus:outline-none focus:border-forest"
                    />
                  </div>
                </div>

                {/* Password + Live Strength Meter */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs uppercase tracking-brand font-semibold text-charcoal">
                      Password *
                    </label>
                    {regPassword && (
                      <span className="text-[10px] font-mono font-semibold text-forest">
                        {passwordStrength.label}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-stone-light text-charcoal text-xs sm:text-sm focus:outline-none focus:border-forest pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Visual Strength Bar */}
                  {regPassword && (
                    <div className="mt-1.5 h-1 bg-stone-light/50 overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-300`}
                      />
                    </div>
                  )}
                </div>

                {/* Birthday & Referral Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Birthday Callout */}
                  <div className="p-3 bg-beige/40 border border-beige-dark/50 space-y-1">
                    <div className="flex items-center gap-1 text-forest font-semibold text-xs">
                      <Gift size={13} />
                      <span>Birthday 15% VIP</span>
                    </div>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal focus:outline-none focus:border-forest"
                    />
                  </div>

                  {/* Referral Code (Growth Loop) */}
                  <div className="p-3 bg-beige/40 border border-beige-dark/50 space-y-1">
                    <div className="flex items-center gap-1 text-forest font-semibold text-xs">
                      <Share2 size={13} />
                      <span>Invite Code (+฿150)</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. ALTO-TRAIL"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs uppercase font-mono text-charcoal focus:outline-none focus:border-forest placeholder:normal-case"
                    />
                  </div>
                </div>

                {/* PDPA Marketing Consent */}
                <label className="flex items-start gap-2.5 text-xs text-charcoal cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="accent-forest w-4 h-4 mt-0.5 shrink-0"
                  />
                  <span className="text-[11px] text-stone leading-tight">
                    I agree to receive VIA ALTO trail guides, technical gear drops, and exclusive member promotions (PDPA consent).
                  </span>
                </label>

                <div className="pt-2 flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    CONTINUE TO EXPLORER PROFILE
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2: Marketing Profiling (Disciplines, Sizing, Region & Source) */}
            {registerStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-2.5 bg-forest text-offwhite flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-beige" />
                    <span className="font-semibold">Complete profile for +200 Alpine Points!</span>
                  </div>
                </div>

                {/* 1. Primary Activities */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal">
                    Primary Outdoor Disciplines
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {activityOptions.map((act) => {
                      const isSelected = primaryActivities.includes(act.id);
                      return (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => toggleActivity(act.id)}
                          className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-forest text-offwhite border-forest'
                              : 'bg-white text-charcoal border-stone-light/80 hover:border-forest/50'
                          }`}
                        >
                          {act.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Experience Level */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {[
                      { id: 'beginner', label: 'Beginner' },
                      { id: 'intermediate', label: 'Weekend Trekker' },
                      { id: 'advanced', label: 'Alpine Pro' }
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setExperienceLevel(lvl.id)}
                        className={`p-1.5 border text-[11px] font-semibold transition-all cursor-pointer ${
                          experienceLevel === lvl.id
                            ? 'bg-forest text-offwhite border-forest'
                            : 'bg-white text-charcoal border-stone-light/80 hover:border-forest/50'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Sizing & Region Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      Apparel
                    </label>
                    <select
                      value={apparelSize}
                      onChange={(e) => setApparelSize(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal font-medium"
                    >
                      <option value="S">Small (S)</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      Shoes (EU)
                    </label>
                    <select
                      value={footwearSize}
                      onChange={(e) => setFootwearSize(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal font-medium"
                    >
                      {['39', '40', '41', '42', '43', '44', '45'].map((s) => (
                        <option key={s} value={s}>
                          EU {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      LINE ID
                    </label>
                    <input
                      type="text"
                      placeholder="@lineid"
                      value={lineId}
                      onChange={(e) => setLineId(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal focus:outline-none focus:border-forest"
                    />
                  </div>
                </div>

                {/* 4. Attribution: "How Did You Discover VIA ALTO?" */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1 flex items-center gap-1">
                      <HelpCircle size={12} className="text-forest" />
                      <span>How Did You Find Us?</span>
                    </label>
                    <select
                      value={discoverySource}
                      onChange={(e) => setDiscoverySource(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal"
                    >
                      {discoverySources.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1 flex items-center gap-1">
                      <MapPin size={12} className="text-forest" />
                      <span>Preferred Trail Region</span>
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal"
                    >
                      {regions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisterStep(1)}
                    className="px-4 py-2.5 border border-stone-light text-stone hover:text-charcoal text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Back
                  </button>

                  <Button
                    type="button"
                    variant="primary"
                    className="flex-1 py-3"
                    onClick={handleFinalRegister}
                    disabled={loading}
                  >
                    {loading ? 'REGISTERING...' : 'COMPLETE & CLAIM VOUCHER'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
