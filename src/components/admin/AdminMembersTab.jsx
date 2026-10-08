import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Trash2,
  Edit3,
  Award,
  Compass,
  MapPin,
  Tag,
  Gift,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  getRegisteredUsers,
  deleteMemberAdmin,
  updateMemberTierPointsAdmin,
  resetAllMembersAdmin
} from '../../data/auth';

export default function AdminMembersTab({ onToast }) {
  const [members, setMembers] = useState(getRegisteredUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null); // for profile details modal
  const [editingPointsMember, setEditingPointsMember] = useState(null); // for edit points modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Edit points form state
  const [editPoints, setEditPoints] = useState(500);
  const [editTier, setEditTier] = useState('Alpine Explorer');

  const refreshMembers = () => {
    setMembers(getRegisteredUsers());
  };

  // Filter members list
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        (m.fullName && m.fullName.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.telNo && m.telNo.includes(q)) ||
        (m.marketingProfile?.referralCode && m.marketingProfile.referralCode.toLowerCase().includes(q));

      const matchesTier =
        tierFilter === 'all' ||
        (m.tier && m.tier.toLowerCase().includes(tierFilter.toLowerCase()));

      return matchesSearch && matchesTier;
    });
  }, [members, searchQuery, tierFilter]);

  // Handle Delete Single Member
  const handleDeleteMember = (userId, memberName) => {
    const updated = deleteMemberAdmin(userId);
    setMembers(updated);
    setDeleteConfirmId(null);
    onToast(`ลบสมาชิก "${memberName || userId}" ออกจากระบบเรียบร้อยแล้ว`);
  };

  // Handle Save Edit Points & Tier
  const handleSavePointsTier = (e) => {
    e.preventDefault();
    if (!editingPointsMember) return;
    updateMemberTierPointsAdmin(editingPointsMember.id, parseInt(editPoints, 10), editTier);
    refreshMembers();
    setEditingPointsMember(null);
    onToast(`อัปเดตคะแนนและระดับสมาชิกของคุณ ${editingPointsMember.fullName} เรียบร้อยแล้ว`);
  };

  // Handle Clear All Members
  const handleClearAllMembers = async () => {
    resetAllMembersAdmin();
    // Also request backend cleanup if PHP server running
    try {
      await fetch('/php-api/api/admin.php?action=clean_members', { method: 'POST' }).catch(() => {});
    } catch {}
    refreshMembers();
    setIsClearAllModalOpen(false);
    onToast('ล้างข้อมูลสมาชิกและรีเซ็ตกลับสู่สถานะเริ่มต้นเรียบร้อยแล้ว');
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">สมาชิกทั้งหมด</div>
          <div className="text-2xl font-bold text-charcoal mt-1 flex items-baseline gap-2">
            <span>{members.length}</span>
            <span className="text-xs font-normal text-stone">บัญชี</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">Alpine Explorer</div>
          <div className="text-2xl font-bold text-forest mt-1 flex items-baseline gap-2">
            <span>{members.filter((m) => !m.tier || m.tier.includes('Explorer')).length}</span>
            <span className="text-xs font-normal text-stone">คน</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">Alpine Ridge / Ascent</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 flex items-baseline gap-2">
            <span>{members.filter((m) => m.tier && (m.tier.includes('Ridge') || m.tier.includes('Ascent'))).length}</span>
            <span className="text-xs font-normal text-stone">คน</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">คะแนนสะสมรวมทั้งหมด</div>
          <div className="text-2xl font-bold text-charcoal mt-1 flex items-baseline gap-2">
            <span>{members.reduce((sum, m) => sum + (m.points || 0), 0).toLocaleString()}</span>
            <span className="text-xs font-normal text-stone">pts</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, and Bulk Actions */}
      <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ, อีเมล, เบอร์โทร, โค้ดแนะนำ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-sand-light/50 border border-stone-light rounded-lg focus:outline-none focus:border-forest text-charcoal placeholder-stone"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsClearAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium rounded-lg border border-red-200 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ล้างสมาชิกทั้งหมด (Clear All)</span>
            </button>
          </div>
        </div>

        {/* Tier Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-light/60">
          <span className="text-xs text-stone font-medium mr-1">ระดับสมาชิก:</span>
          <button
            onClick={() => setTierFilter('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              tierFilter === 'all'
                ? 'bg-forest text-offwhite font-medium'
                : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
            }`}
          >
            ทั้งหมด ({members.length})
          </button>
          <button
            onClick={() => setTierFilter('Explorer')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              tierFilter === 'Explorer'
                ? 'bg-forest text-offwhite font-medium'
                : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
            }`}
          >
            Alpine Explorer ({members.filter((m) => !m.tier || m.tier.includes('Explorer')).length})
          </button>
          <button
            onClick={() => setTierFilter('Ridge')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              tierFilter === 'Ridge'
                ? 'bg-forest text-offwhite font-medium'
                : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
            }`}
          >
            Alpine Ridge ({members.filter((m) => m.tier && m.tier.includes('Ridge')).length})
          </button>
          <button
            onClick={() => setTierFilter('Ascent')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              tierFilter === 'Ascent'
                ? 'bg-forest text-offwhite font-medium'
                : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
            }`}
          >
            Alpine Ascent ({members.filter((m) => m.tier && m.tier.includes('Ascent')).length})
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl border border-stone-light shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-light/60 text-xs font-semibold uppercase tracking-wider text-stone border-b border-stone-light">
              <tr>
                <th className="py-3.5 px-4">สมาชิก</th>
                <th className="py-3.5 px-4">เบอร์โทร</th>
                <th className="py-3.5 px-4">ระดับ Tier</th>
                <th className="py-3.5 px-4 text-right">คะแนน (Points)</th>
                <th className="py-3.5 px-4">Marketing Profile</th>
                <th className="py-3.5 px-4 text-center">คำสั่งซื้อ</th>
                <th className="py-3.5 px-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light/60">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone">
                    <Users className="w-8 h-8 mx-auto mb-2 text-stone/60" />
                    <p>ไม่พบรายชื่อสมาชิกที่ตรงกับเงื่อนไขการค้นหา</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => {
                  const ordersCount = m.mockOrders?.length || 0;
                  const activities = m.marketingProfile?.primaryActivities || [];
                  const initials = m.fullName
                    ? m.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)
                    : 'EX';

                  return (
                    <tr key={m.id || m.email} className="hover:bg-sand-light/30 transition-colors">
                      {/* Member Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-forest text-offwhite flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-charcoal flex items-center gap-1.5">
                              <span>{m.fullName || 'Unnamed Explorer'}</span>
                              {m.id === 'usr_alpine_001' && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                  DEMO
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-stone font-mono">{m.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-xs text-stone">
                        {m.telNo || '-'}
                      </td>

                      {/* Tier Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            m.tier?.includes('Ascent')
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : m.tier?.includes('Ridge')
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-stone-light/60 text-charcoal'
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          <span>{m.tier || 'Alpine Explorer'}</span>
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-forest">
                        {(m.points || 0).toLocaleString()} pts
                      </td>

                      {/* Marketing Profile Tags */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {activities.slice(0, 2).map((act) => (
                            <span
                              key={act}
                              className="text-[10px] font-medium px-2 py-0.5 rounded bg-sand-light border border-stone-light text-charcoal"
                            >
                              {act}
                            </span>
                          ))}
                          {m.marketingProfile?.sizes?.apparel && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-sand-light border border-stone-light text-stone">
                              {m.marketingProfile.sizes.apparel}
                            </span>
                          )}
                          {activities.length > 2 && (
                            <span className="text-[10px] font-bold text-stone">
                              +{activities.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Orders Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-sand-light text-charcoal">
                          {ordersCount}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setSelectedMember(m)}
                            title="ดูโปรไฟล์แบบเจาะลึก"
                            className="px-2.5 py-1 text-xs font-medium text-forest hover:bg-forest/10 rounded-md transition-colors"
                          >
                            ดูโปรไฟล์
                          </button>
                          <button
                            onClick={() => {
                              setEditingPointsMember(m);
                              setEditPoints(m.points || 500);
                              setEditTier(m.tier || 'Alpine Explorer');
                            }}
                            title="ปรับคะแนนและ Tier"
                            className="p-1.5 text-stone hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(m.id)}
                            title="ลบสมาชิก"
                            className="p-1.5 text-stone hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MEMBER PROFILE DETAIL MODAL */}
      {/* =================================================================== */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-light">
            <div className="p-5 border-b border-stone-light flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest text-offwhite flex items-center justify-center font-bold text-sm">
                  {selectedMember.fullName ? selectedMember.fullName[0] : 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-charcoal">{selectedMember.fullName}</h3>
                  <p className="text-xs text-stone font-mono">{selectedMember.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1 text-stone hover:text-charcoal rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Account Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-sand-light/50 p-4 rounded-xl border border-stone-light/60">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone">Tier Level</div>
                  <div className="text-xs font-bold text-forest mt-0.5">{selectedMember.tier || 'Alpine Explorer'}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone">Loyalty Points</div>
                  <div className="text-xs font-mono font-bold text-charcoal mt-0.5">
                    {selectedMember.points || 0} pts
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone">Phone</div>
                  <div className="text-xs font-mono text-charcoal mt-0.5">{selectedMember.telNo || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone">Joined Date</div>
                  <div className="text-xs text-charcoal mt-0.5">{selectedMember.joinedDate || '2026'}</div>
                </div>
              </div>

              {/* Marketing Profile (Outdoor Preferences) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-forest" />
                  <span>Marketing Profile & ข้อมูลความสนใจ Outdoor</span>
                </h4>
                <div className="bg-white border border-stone-light rounded-xl p-4 space-y-3 text-xs">
                  <div>
                    <span className="text-stone font-medium">กิจกรรมที่สนใจ (Primary Activities):</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {(selectedMember.marketingProfile?.primaryActivities || []).length > 0 ? (
                        selectedMember.marketingProfile.primaryActivities.map((act) => (
                          <span
                            key={act}
                            className="px-2.5 py-1 rounded-md bg-forest/10 text-forest font-semibold capitalize"
                          >
                            {act}
                          </span>
                        ))
                      ) : (
                        <span className="text-stone/60">ไม่ได้ระบุ</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-light/60">
                    <div>
                      <span className="text-stone font-medium">ระดับประสบการณ์:</span>
                      <p className="font-semibold text-charcoal capitalize mt-0.5">
                        {selectedMember.marketingProfile?.experienceLevel || 'Intermediate'}
                      </p>
                    </div>
                    <div>
                      <span className="text-stone font-medium">ภูมิภาคที่เดินทาง:</span>
                      <p className="font-semibold text-charcoal capitalize mt-0.5">
                        {selectedMember.marketingProfile?.region || 'Northern High Elevation'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-light/60">
                    <div>
                      <span className="text-stone font-medium">ไซส์เสื้อผ้า / รองเท้า:</span>
                      <p className="font-semibold text-charcoal mt-0.5">
                        เสื้อ ({selectedMember.marketingProfile?.sizes?.apparel || 'M'}) / รองเท้า (
                        {selectedMember.marketingProfile?.sizes?.footwear || '42'})
                      </p>
                    </div>
                    <div>
                      <span className="text-stone font-medium">โค้ดแนะนำ (Referral Code):</span>
                      <p className="font-mono font-bold text-amber-700 mt-0.5">
                        {selectedMember.marketingProfile?.referralCode || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-forest" />
                  <span>ที่อยู่จัดส่งเริ่มต้น</span>
                </h4>
                {selectedMember.shippingAddress ? (
                  <div className="bg-sand-light/40 border border-stone-light p-3.5 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-charcoal">
                      {selectedMember.shippingAddress.fullName || selectedMember.fullName} (
                      {selectedMember.shippingAddress.telNo || selectedMember.telNo})
                    </div>
                    <div className="text-stone">
                      {selectedMember.shippingAddress.address1} {selectedMember.shippingAddress.address2}
                    </div>
                    <div className="text-stone">
                      {selectedMember.shippingAddress.district}, {selectedMember.shippingAddress.province}{' '}
                      {selectedMember.shippingAddress.postalCode}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone">ยังไม่มีการบันทึกที่อยู่จัดส่ง</p>
                )}
              </div>

              {/* Vouchers Held */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-forest" />
                  <span>คูปองส่วนลดในบัญชี ({selectedMember.vouchers?.length || 0})</span>
                </h4>
                <div className="space-y-2">
                  {(selectedMember.vouchers || []).map((v) => (
                    <div
                      key={v.code}
                      className="flex items-center justify-between p-2.5 bg-white border border-stone-light rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-mono font-bold text-charcoal">{v.code}</span>
                        <span className="text-emerald-700 font-semibold">({v.discount})</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          v.isValid !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-light text-stone'
                        }`}
                      >
                        {v.isValid !== false ? 'Active' : 'Used'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-light bg-sand-light/30 flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2 bg-charcoal text-offwhite text-xs font-semibold rounded-lg hover:bg-black transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* EDIT POINTS & TIER MODAL */}
      {/* =================================================================== */}
      {editingPointsMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-light p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-light mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-charcoal">ปรับคะแนน & ระดับ Tier</h3>
              </div>
              <button
                onClick={() => setEditingPointsMember(null)}
                className="text-stone hover:text-charcoal text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePointsTier} className="space-y-4">
              <p className="text-xs text-stone">
                สมาชิก: <strong className="text-charcoal">{editingPointsMember.fullName}</strong> ({editingPointsMember.email})
              </p>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  คะแนนสะสม (Loyalty Points)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editPoints}
                  onChange={(e) => setEditPoints(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ระดับ Tier
                </label>
                <select
                  value={editTier}
                  onChange={(e) => setEditTier(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest bg-white"
                >
                  <option value="Alpine Explorer">Alpine Explorer (เริ่มต้น)</option>
                  <option value="Alpine Ridge Member">Alpine Ridge Member (ระดับกลาง)</option>
                  <option value="Alpine Ascent Member">Alpine Ascent Member (VIP)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-stone-light flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPointsMember(null)}
                  className="px-4 py-2 text-xs text-stone hover:text-charcoal"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest text-offwhite text-xs font-semibold rounded-lg hover:bg-forest-light transition-colors shadow-xs"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* DELETE SINGLE MEMBER MODAL */}
      {/* =================================================================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-light">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-charcoal mb-1">ยืนยันการลบสมาชิกนี้?</h4>
            <p className="text-xs text-stone mb-6">
              การลบจะลบบัญชีและประวัติทั้งหมดออกจากฐานข้อมูล ทำให้สามารถนำอีเมลเดิมไปทดลองสมัครใหม่ได้ทันที
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-medium text-stone hover:text-charcoal bg-sand-light rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDeleteMember(deleteConfirmId, 'Selected Member')}
                className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CLEAR ALL MEMBERS CONFIRMATION MODAL */}
      {/* =================================================================== */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-light">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-charcoal mb-1">ยืนยันล้างสมาชิกทั้งหมด?</h4>
            <p className="text-xs text-stone mb-6">
              ระบบจะลบสมาชิกที่เคยสมัครออกทั้งหมด และรีเซ็ตกลับสู่บัญชีเริ่มต้น (Marco Silva) พร้อมเคลียร์ Backend JSON เสมือนคำสั่ง clean:members
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setIsClearAllModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone hover:text-charcoal bg-sand-light rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleClearAllMembers}
                className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                ล้างข้อมูลทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
