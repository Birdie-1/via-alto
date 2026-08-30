import React, { useState } from 'react';
import { X, Eye, EyeOff, Check, Gift, Compass, ShieldCheck, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
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

  // Register Form State (Step 1)
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [telNo, setTelNo] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(true);

  // Register Form State (Step 2 - Explorer Profile)
  const [primaryActivities, setPrimaryActivities] = useState(['trekking']);
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [apparelSize, setApparelSize] = useState('M');
  const [footwearSize, setFootwearSize] = useState('42');
  const [lineId, setLineId] = useState('');

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setRegisterStep(1);
  };

  // 1-Click Demo Login
  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess(DEMO_USER);
      setLoading(false);
      onClose();
    }, 400);
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
        marketingConsent,
        marketingProfile: {
          primaryActivities,
          experienceLevel,
          sizes: {
            apparel: apparelSize,
            footwear: footwearSize
          },
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
                    onClick={() => alert('Password reset link sent to demo account.')}
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
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  registerStep === 1 ? 'bg-forest text-offwhite' : 'bg-forest/20 text-forest'
                }`}>
                  1
                </div>
                <span className={`text-xs uppercase tracking-wider font-semibold ${
                  registerStep === 1 ? 'text-charcoal' : 'text-stone'
                }`}>
                  Credentials
                </span>
              </div>

              <div className="h-px w-8 bg-stone-light" />

              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  registerStep === 2 ? 'bg-forest text-offwhite' : 'bg-stone-light text-stone'
                }`}>
                  2
                </div>
                <span className={`text-xs uppercase tracking-wider font-semibold ${
                  registerStep === 2 ? 'text-charcoal' : 'text-stone'
                }`}>
                  Explorer Profile
                </span>
              </div>
            </div>

            {/* STEP 1: Basic Credentials + Birthday & PDPA */}
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

                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Password * (Min 6 chars)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-stone-light text-charcoal text-xs sm:text-sm focus:outline-none focus:border-forest"
                  />
                </div>

                {/* Birthday Callout Field (Marketing Incentive) */}
                <div className="p-3 bg-beige/40 border border-beige-dark/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-forest font-semibold text-xs">
                    <Gift size={15} />
                    <span>Birthday VIP Voucher (Optional)</span>
                  </div>
                  <p className="text-[11px] text-stone font-sans">
                    Receive an exclusive 15% discount voucher every year on your birthday month.
                  </p>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-light text-xs text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                {/* PDPA Marketing Consent */}
                <label className="flex items-start gap-2.5 text-xs text-charcoal cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="accent-forest w-4 h-4 mt-0.5"
                  />
                  <span className="text-[11px] text-stone leading-tight">
                    I agree to receive VIA ALTO trail guides, technical gear drops, and exclusive member promotions (PDPA consent).
                  </span>
                </label>

                <div className="pt-3 flex gap-2">
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

            {/* STEP 2: Marketing Profiling (Disciplines, Sizing, Experience) */}
            {registerStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="p-3 bg-forest text-offwhite flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-beige" />
                    <span className="font-semibold">Complete profile for +200 Alpine Points!</span>
                  </div>
                </div>

                {/* 1. Primary Activities */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal">
                    Primary Outdoor Disciplines (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
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
                <div className="space-y-2">
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
                        className={`p-2 border text-[11px] font-semibold transition-all cursor-pointer ${
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

                {/* 3. Sizing Preferences */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      Apparel Size
                    </label>
                    <select
                      value={apparelSize}
                      onChange={(e) => setApparelSize(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-light text-xs text-charcoal font-medium"
                    >
                      <option value="S">Small (S)</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                      Footwear Size (EU)
                    </label>
                    <select
                      value={footwearSize}
                      onChange={(e) => setFootwearSize(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-light text-xs text-charcoal font-medium"
                    >
                      {['39', '40', '41', '42', '43', '44', '45'].map((s) => (
                        <option key={s} value={s}>
                          EU {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. LINE ID (Optional) */}
                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    LINE ID (Optional for flash notifications)
                  </label>
                  <input
                    type="text"
                    placeholder="@yourlineid"
                    value={lineId}
                    onChange={(e) => setLineId(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-stone-light text-xs text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-2 flex gap-3">
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
