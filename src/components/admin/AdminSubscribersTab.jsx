import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Search,
  Trash2,
  Copy,
  Download,
  RotateCcw,
  Check,
  AlertTriangle,
  Send,
  Users,
  ExternalLink
} from 'lucide-react';
import {
  getStoredSubscribers,
  deleteSubscriber,
  clearAllSubscribers,
  syncWithBackendSubscribers
} from '../../data/subscribersStore';

export default function AdminSubscribersTab({ onToast }) {
  const [subscribers, setSubscribers] = useState(getStoredSubscribers);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  // Sync with backend API on mount
  useEffect(() => {
    syncWithBackendSubscribers().then((list) => {
      if (Array.isArray(list)) setSubscribers(list);
    });

    const handleUpdate = (e) => {
      if (e.detail) setSubscribers(e.detail);
      else setSubscribers(getStoredSubscribers());
    };

    window.addEventListener('via_alto_subscribers_updated', handleUpdate);
    return () => window.removeEventListener('via_alto_subscribers_updated', handleUpdate);
  }, []);

  // Filtered subscribers list
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      return q === '' || (s.email && s.email.toLowerCase().includes(q));
    });
  }, [subscribers, searchQuery]);

  // Handle Copy All Emails
  const handleCopyAll = () => {
    if (subscribers.length === 0) {
      onToast('ไม่มีรายชื่ออีเมลให้คัดลอก');
      return;
    }
    const emailList = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emailList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onToast(`คัดลอกอีเมลผู้ติดตามทั้งหมด (${subscribers.length} อีเมล) ไปยัง Clipboard เรียบร้อยแล้ว`);
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      onToast('ไม่มีข้อมูลสำหรับ Export CSV');
      return;
    }
    const headers = ['Email', 'Name', 'Subscribed Date', 'Status', 'Source'];
    const rows = subscribers.map((s) => [
      `"${s.email}"`,
      `"${s.name || 'Explorer'}"`,
      `"${s.date || ''}"`,
      `"${s.status || 'Active'}"`,
      `"${s.source || 'Newsletter'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `via_alto_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('ดาวน์โหลดไฟล์ CSV รายชื่อผู้ติดตามเรียบร้อยแล้ว');
  };

  // Handle Delete Single Subscriber
  const handleDeleteSubscriber = async (email) => {
    const updated = await deleteSubscriber(email);
    setSubscribers(updated);
    setDeleteEmail(null);
    onToast(`ลบอีเมล ${email} ออกจากระบบเรียบร้อยแล้ว`);
  };

  // Handle Clear All Subscribers
  const handleClearAll = async () => {
    await clearAllSubscribers();
    setSubscribers([]);
    setIsClearAllModalOpen(false);
    onToast('ล้างรายชื่อผู้รับข่าวสารทั้งหมดเรียบร้อยแล้ว');
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">ผู้ติดตามทั้งหมด</div>
          <div className="text-2xl font-bold text-charcoal mt-1 flex items-baseline gap-2">
            <span>{subscribers.length}</span>
            <span className="text-xs font-normal text-stone">อีเมล</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">สถานะ Active</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 flex items-baseline gap-2">
            <span>{subscribers.filter((s) => s.status === 'Active').length}</span>
            <span className="text-xs font-normal text-stone">คน</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">แหล่งที่มาหลัก</div>
          <div className="text-lg font-bold text-forest mt-1 truncate">
            Footer Newsletter
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">Backend Storage</div>
          <div className="text-xs text-stone mt-1 font-mono">
            subscribers.json & txt
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาอีเมลผู้รับข่าวสาร..."
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-sand-light/80 hover:bg-stone-light/60 text-charcoal text-sm font-medium rounded-lg border border-stone-light transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone" />}
              <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอกทั้งหมด'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-forest text-offwhite text-sm font-medium rounded-lg hover:bg-forest-light transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsClearAllModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium rounded-lg border border-red-200 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ล้างทั้งหมด</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl border border-stone-light shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-light/60 text-xs font-semibold uppercase tracking-wider text-stone border-b border-stone-light">
              <tr>
                <th className="py-3.5 px-4 w-12">#</th>
                <th className="py-3.5 px-4">อีเมลผู้รับข่าวสาร</th>
                <th className="py-3.5 px-4">ชื่อ</th>
                <th className="py-3.5 px-4">วันที่สมัคร</th>
                <th className="py-3.5 px-4">แหล่งที่มา</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone">
                    กำลังโหลดข้อมูลผู้ติดตาม...
                  </td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone">
                    <Mail className="w-8 h-8 mx-auto mb-2 text-stone/60" />
                    <p>ยังไม่มีรายชื่อผู้ติดตาม หรือไม่พบอีเมลที่ค้นหา</p>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((s, idx) => (
                  <tr key={s.email + idx} className="hover:bg-sand-light/30 transition-colors">
                    {/* Index */}
                    <td className="py-3.5 px-4 text-xs font-mono text-stone">{idx + 1}</td>

                    {/* Email */}
                    <td className="py-3.5 px-4 font-mono font-medium text-charcoal">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-stone shrink-0" />
                        <span>{s.email}</span>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 text-xs text-stone">{s.name || 'Explorer'}</td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs font-mono text-stone">{s.date || '-'}</td>

                    {/* Source */}
                    <td className="py-3.5 px-4 text-xs text-stone">
                      <span className="inline-block px-2 py-0.5 rounded bg-sand-light border border-stone-light/60">
                        {s.source || 'Newsletter Form'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(s.email);
                            onToast(`คัดลอก ${s.email} เรียบร้อยแล้ว`);
                          }}
                          title="คัดลอกอีเมล"
                          className="p-1.5 text-stone hover:text-forest hover:bg-forest/10 rounded-md transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteEmail(s.email)}
                          title="ลบอีเมลนี้"
                          className="p-1.5 text-stone hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* DELETE SINGLE SUBSCRIBER MODAL */}
      {/* =================================================================== */}
      {deleteEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-light">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-charcoal mb-1">ยืนยันการลบผู้ติดตาม?</h4>
            <p className="text-xs text-stone mb-6 font-mono font-medium">{deleteEmail}</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeleteEmail(null)}
                className="px-4 py-2 text-xs font-medium text-stone hover:text-charcoal bg-sand-light rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDeleteSubscriber(deleteEmail)}
                className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CLEAR ALL SUBSCRIBERS CONFIRMATION MODAL */}
      {/* =================================================================== */}
      {isClearAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-light">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-charcoal mb-1">ยืนยันล้างรายชื่อผู้ติดตามทั้งหมด?</h4>
            <p className="text-xs text-stone mb-6">
              ระบบจะลบอีเมลทั้งหมดใน `subscribers.json` และ `subscribers.txt`
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setIsClearAllModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone hover:text-charcoal bg-sand-light rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleClearAll}
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
