import React, { useState } from 'react';
import {
  User,
  Compass,
  Gift,
  Tag,
  Heart,
  Package,
  ShieldCheck,
  LogOut,
  Check,
  Sparkles,
  ArrowRight,
  Save,
  Share2,
  MapPin,
  HelpCircle,
  Mail,
  Eye
} from 'lucide-react';
import Button from '../components/ui/Button';
import { PRODUCTS, formatPrice } from '../data/products';

export default function AccountPage({
  user,
  onLogout,
  onUpdateProfile,
  wishlist = [],
  onAddToCart,
  onNavigate,
  onOpenEmailPreview,
  initialTab = 'overview'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [copiedCode, setCopiedCode] = useState('');
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form Edit State
  const [editFullName, setEditFullName] = useState(user?.fullName || '');
  const [editTelNo, setEditTelNo] = useState(user?.telNo || '');
  const [editDob, setEditDob] = useState(user?.dateOfBirth || '');
  const [editActivities, setEditActivities] = useState(user?.marketingProfile?.primaryActivities || []);
  const [editExperience, setEditExperience] = useState(user?.marketingProfile?.experienceLevel || 'intermediate');
  const [editApparel, setEditApparel] = useState(user?.marketingProfile?.sizes?.apparel || 'M');
  const [editFootwear, setEditFootwear] = useState(user?.marketingProfile?.sizes?.footwear || '42');
  const [editRegion, setEditRegion] = useState(user?.marketingProfile?.region || 'northern');
  const [editDiscoverySource, setEditDiscoverySource] = useState(user?.marketingProfile?.discoverySource || 'instagram');
  const [editLineId, setEditLineId] = useState(user?.marketingProfile?.lineId || '');

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4 bg-[#F7F5F0]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-beige/60 mx-auto flex items-center justify-center text-forest">
            <User size={28} />
          </div>
          <h2 className="font-serif text-2xl text-charcoal">Sign in to Access Your Explorer Account</h2>
          <p className="text-xs text-stone font-sans">
            Track your expedition gear orders, manage your member vouchers, and personalize your trail profile.
          </p>
          <Button variant="primary" onClick={() => onNavigate('home')}>
            RETURN TO HOME
          </Button>
        </div>
      </div>
    );
  }

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  const myReferralCode = user.marketingProfile?.referralCode || `ALTO-${user.fullName?.split(' ')[0]?.toUpperCase() || 'EXPLORER'}`;

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(myReferralCode);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile(user.id, {
      fullName: editFullName,
      telNo: editTelNo,
      dateOfBirth: editDob,
      marketingProfile: {
        primaryActivities: editActivities,
        experienceLevel: editExperience,
        sizes: {
          apparel: editApparel,
          footwear: editFootwear
        },
        region: editRegion,
        discoverySource: editDiscoverySource,
        lineId: editLineId
      }
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleActivity = (actId) => {
    setEditActivities((prev) =>
      prev.includes(actId) ? prev.filter((a) => a !== actId) : [...prev, actId]
    );
  };

  // Filter products for wishlist
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const activityLabels = {
    day_hiking: 'Day Hiking',
    trekking: 'Alpine Trekking',
    camping: 'Mountain Camping',
    trail_running: 'Trail Running',
    travel: 'Travel & Lifestyle'
  };

  const regionLabels = {
    northern: 'Northern Thailand (Doi & High Elevation)',
    central: 'Central & Bangkok (Weekend Trails)',
    southern: 'Southern & Coastal (Rain Shells)',
    northeastern: 'Northeastern (Plateau)',
    international: 'International Expeditions'
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Hero Banner */}
        <div className="bg-[#183C32] text-offwhite p-6 sm:p-10 border border-forest-light shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-beige text-[10px] uppercase font-bold tracking-brand-wide border border-white/20">
              <Compass size={12} />
              <span>{user.tier || 'Alpine Explorer'}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
              {user.fullName}
            </h1>

            <p className="text-xs text-stone-light font-sans tracking-wider">
              {user.email} • Member since {user.joinedDate || '2026'}
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
            {/* Alpine Points Card */}
            <div className="bg-white/10 border border-white/20 p-4 text-center min-w-[130px]">
              <span className="text-[10px] uppercase tracking-brand text-beige block font-medium">
                ALPINE POINTS
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {user.points || 500}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-3 bg-white/10 hover:bg-red-900/40 text-stone-light hover:text-white border border-white/20 transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mt-8 border-b border-stone-light/60 flex items-center space-x-2 sm:space-x-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'OVERVIEW & VOUCHERS', icon: Gift },
            { id: 'profile', label: 'EXPLORER PROFILE (MARKETING)', icon: User },
            { id: 'wishlist', label: `SAVED WISHLIST (${wishlist.length})`, icon: Heart },
            { id: 'orders', label: 'EXPEDITION ORDERS', icon: Package }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 text-xs uppercase tracking-brand font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-forest text-forest bg-beige/30'
                    : 'border-transparent text-stone hover:text-charcoal'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & VOUCHERS */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8 animate-in fade-in duration-300">
            {/* Active Promotions & Vouchers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  YOUR ACTIVE EXPEDITION VOUCHERS
                </h3>
                <span className="text-xs text-stone font-sans">
                  {user.vouchers?.length || 0} Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.vouchers?.map((v, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white border border-stone-light/80 hover:border-forest/50 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block bg-forest text-beige text-[10px] font-bold tracking-brand px-2.5 py-0.5 mb-1.5">
                          {v.discount}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-charcoal">
                          {v.description}
                        </h4>
                      </div>
                      <Tag size={18} className="text-forest shrink-0 mt-1" />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-light/40">
                      <div>
                        <span className="text-[10px] uppercase text-stone tracking-wider block">PROMO CODE</span>
                        <span className="font-mono text-sm font-bold text-forest tracking-wider">
                          {v.code}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(v.code)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                          copiedCode === v.code
                            ? 'bg-forest text-offwhite border-forest'
                            : 'bg-beige/40 text-charcoal border-stone-light hover:bg-beige'
                        }`}
                      >
                        {copiedCode === v.code ? 'COPIED!' : 'COPY CODE'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member-Get-Member Referral Growth Card */}
            <div className="p-6 bg-white border border-stone-light/80 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-forest text-xs uppercase font-bold tracking-brand">
                  <Share2 size={14} />
                  <span>MEMBER-GET-MEMBER PROGRAM</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-charcoal">
                  Invite Fellow Trekkers & Earn 150 Alpine Points
                </h4>
                <p className="text-xs text-stone max-w-lg">
                  Share your personal invite code. When a friend joins VIA ALTO, they get ฿150 off their first order and you receive 150 points.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-beige/40 border border-stone-light font-mono font-bold text-forest text-sm">
                  {myReferralCode}
                </div>
                <button
                  onClick={handleCopyReferral}
                  className={`px-4 py-2 text-xs uppercase tracking-brand font-bold border transition-colors cursor-pointer ${
                    copiedReferral
                      ? 'bg-forest text-offwhite border-forest'
                      : 'bg-forest text-offwhite hover:bg-forest-light'
                  }`}
                >
                  {copiedReferral ? 'COPIED!' : 'COPY INVITE CODE'}
                </button>
              </div>
            </div>

            {/* Quick Profile Snapshot */}
            <div className="p-6 bg-beige/40 border border-stone-light/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-brand font-bold text-forest">
                  YOUR TRAIL PROFILE
                </span>
                <h4 className="font-serif text-lg font-bold text-charcoal">
                  Tailored Gear Preferences: {editActivities.map((a) => activityLabels[a] || a).join(', ') || 'General Alpine'}
                </h4>
                <p className="text-xs text-stone">
                  Region: {regionLabels[editRegion] || editRegion} • Sizes: Apparel ({editApparel}), Footwear (EU {editFootwear})
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('profile')}
              >
                EDIT PROFILE
              </Button>
            </div>

            {/* Email Dispatch Previews Card */}
            {onOpenEmailPreview && (
              <div className="p-6 bg-white border border-stone-light/80 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-forest text-xs uppercase font-bold tracking-brand">
                    <Mail size={14} />
                    <span>AUTOMATED EMAIL DISPATCH PREVIEWS</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-charcoal">
                    Member Welcome & Personalized Product Recommendations
                  </h4>
                  <p className="text-xs text-stone max-w-xl">
                    Preview the responsive email designs triggered automatically upon member registration and tailored gear suggestions matched to your trail profile.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenEmailPreview('welcome')}
                    className="px-4 py-2.5 bg-forest text-beige hover:bg-forest-light text-xs uppercase tracking-brand font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye size={14} />
                    <span>1. WELCOME EMAIL</span>
                  </button>
                  <button
                    onClick={() => onOpenEmailPreview('recommendation')}
                    className="px-4 py-2.5 bg-beige text-forest hover:bg-white border border-stone-light text-xs uppercase tracking-brand font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles size={14} />
                    <span>2. GEAR RECOMMENDATION</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLORER PROFILE (MARKETING ATTRIBUTES) */}
        {activeTab === 'profile' && (
          <div className="mt-8 bg-white border border-stone-light/80 p-6 sm:p-10 shadow-xs max-w-3xl animate-in fade-in duration-300">
            <div className="border-b border-stone-light/60 pb-4 mb-6">
              <span className="text-xs uppercase tracking-brand font-bold text-forest">
                CUSTOMER RELATIONSHIP & MARKETING PREFERENCES
              </span>
              <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
                Explorer Personalization Profile
              </h3>
              <p className="text-xs text-stone mt-1">
                Updating your trail discipline and sizing ensures you receive exclusive drops in your exact fit.
              </p>
            </div>

            {saveSuccess && (
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
                <Check size={16} />
                <span>Profile and marketing preferences updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-offwhite border border-stone-light text-xs sm:text-sm text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Phone Number (SMS Notifications)
                  </label>
                  <input
                    type="tel"
                    required
                    value={editTelNo}
                    onChange={(e) => setEditTelNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-offwhite border border-stone-light text-xs sm:text-sm text-charcoal focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              {/* Birthday (Annual Reward Trigger) */}
              <div className="p-4 bg-beige/30 border border-beige-dark/40 space-y-2">
                <div className="flex items-center gap-2 text-forest font-semibold text-xs">
                  <Gift size={15} />
                  <span>Birthday (Annual 15% VIP Reward Voucher)</span>
                </div>
                <input
                  type="date"
                  value={editDob}
                  onChange={(e) => setEditDob(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-stone-light text-xs text-charcoal focus:outline-none focus:border-forest"
                />
              </div>

              {/* Outdoor Activities */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal">
                  Primary Outdoor Disciplines
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activityLabels).map(([id, label]) => {
                    const isSelected = editActivities.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleActivity(id)}
                        className={`px-3.5 py-2 text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-forest text-offwhite border-forest'
                            : 'bg-offwhite text-charcoal border-stone-light hover:border-forest/50'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizing & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Apparel Size
                  </label>
                  <select
                    value={editApparel}
                    onChange={(e) => setEditApparel(e.target.value)}
                    className="w-full px-3 py-2.5 bg-offwhite border border-stone-light text-xs text-charcoal font-medium"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Footwear (EU)
                  </label>
                  <select
                    value={editFootwear}
                    onChange={(e) => setEditFootwear(e.target.value)}
                    className="w-full px-3 py-2.5 bg-offwhite border border-stone-light text-xs text-charcoal font-medium"
                  >
                    {['39', '40', '41', '42', '43', '44', '45'].map((s) => (
                      <option key={s} value={s}>
                        EU {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                    Preferred Region
                  </label>
                  <select
                    value={editRegion}
                    onChange={(e) => setEditRegion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-offwhite border border-stone-light text-xs text-charcoal font-medium"
                  >
                    {Object.entries(regionLabels).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LINE ID */}
              <div>
                <label className="block text-xs uppercase tracking-brand font-semibold text-charcoal mb-1">
                  LINE Official Account ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="@yourlineid"
                  value={editLineId}
                  onChange={(e) => setEditLineId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-offwhite border border-stone-light text-xs text-charcoal focus:outline-none focus:border-forest"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Save}
                >
                  SAVE PROFILE PREFERENCES
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SAVED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="mt-8 animate-in fade-in duration-300">
            {wishlistedProducts.length === 0 ? (
              <div className="bg-white border border-stone-light p-12 text-center space-y-4">
                <Heart size={32} className="text-stone mx-auto" />
                <h4 className="font-serif text-xl text-charcoal">Your Wishlist is Empty</h4>
                <p className="text-xs text-stone max-w-sm mx-auto">
                  Explore our alpine catalog and click the heart icon on any gear to save it to your wishlist.
                </p>
                <Button variant="primary" onClick={() => onNavigate('shop')}>
                  EXPLORE SHOP
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-stone-light p-4 flex flex-col justify-between space-y-4"
                  >
                    <div className="aspect-square bg-offwhite overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-brand text-forest font-semibold">
                        {p.category}
                      </span>
                      <h4 className="font-sans text-sm font-semibold text-charcoal">{p.name}</h4>
                      <p className="text-sm font-bold text-charcoal mt-1">{formatPrice(p.price)}</p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onAddToCart(p)}
                    >
                      ADD TO BAG
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXPEDITION ORDERS (HISTORY) */}
        {activeTab === 'orders' && (
          <div className="mt-8 space-y-4 animate-in fade-in duration-300">
            {user.mockOrders?.length > 0 ? (
              user.mockOrders.map((order, idx) => (
                <div key={idx} className="bg-white border border-stone-light p-6 space-y-4 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-light/60 pb-3 gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-charcoal">
                        Order #{order.orderId}
                      </span>
                      <span className="text-xs text-stone ml-3">Date: {order.date}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold tracking-wider uppercase">
                      <ShieldCheck size={13} />
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {order.items?.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover bg-offwhite border border-stone-light/40" />
                          <div>
                            <h5 className="text-xs font-semibold text-charcoal">{item.name}</h5>
                            <div className="text-[11px] text-stone flex items-center gap-1.5 mt-0.5">
                              {item.color && (
                                <span className="inline-flex items-center gap-1">
                                  <span
                                    className="w-2 h-2 rounded-full border border-black/20 shrink-0"
                                    style={{ backgroundColor: item.color.hex }}
                                  />
                                  <span>{item.color.name}</span>
                                </span>
                              )}
                              {item.color && <span>•</span>}
                              {item.size && <span>{item.size} •</span>}
                              <span className="font-mono">Qty: {item.qty}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-charcoal">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  {order.shippingAddress && (
                    <div className="pt-2 text-[11px] text-stone flex items-center gap-1.5 border-t border-stone-light/40">
                      <MapPin size={12} className="text-forest shrink-0" />
                      <span className="truncate">
                        Destination: {order.shippingAddress.district}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-light/60 flex justify-between items-center text-xs">
                    <span className="uppercase text-stone font-semibold">Total Paid</span>
                    <span className="text-sm font-bold text-forest">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-stone-light p-12 text-center space-y-3">
                <Package size={32} className="text-stone mx-auto" />
                <h4 className="font-serif text-xl text-charcoal">No Orders Placed Yet</h4>
                <p className="text-xs text-stone">Your past orders and live tracking will appear here.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
