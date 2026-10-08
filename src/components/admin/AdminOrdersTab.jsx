import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  MapPin,
  CreditCard,
  Tag,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { getAllOrdersAdmin, updateOrderStatusAdmin } from '../../data/auth';
import { formatPrice } from '../../data/products';

export default function AdminOrdersTab({ onToast }) {
  const [orders, setOrders] = useState(getAllOrdersAdmin);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshOrders = () => {
    setOrders(getAllOrdersAdmin());
  };

  // Status options
  const statusOptions = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  // Handle Quick Status Change
  const handleStatusChange = (orderId, newStatus) => {
    const success = updateOrderStatusAdmin(orderId, newStatus);
    if (success) {
      refreshOrders();
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
      onToast(`อัปเดตสถานะคำสั่งซื้อ #${orderId} เป็น "${newStatus}" เรียบร้อยแล้ว`);
    } else {
      onToast('ไม่สามารถอัปเดตสถานะคำสั่งซื้อได้');
    }
  };

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        (o.orderId && o.orderId.toLowerCase().includes(q)) ||
        (o.customerName && o.customerName.toLowerCase().includes(q)) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
        (o.shippingAddress?.phone && o.shippingAddress.phone.includes(q));

      const matchesStatus =
        statusFilter === 'all' ||
        (o.status && o.status.toLowerCase() === statusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // Aggregate metrics
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
  }, [orders]);

  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      {/* Top Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">ยอดขายรวมสุทธิ</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            {formatPrice(totalRevenue)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">คำสั่งซื้อทั้งหมด</div>
          <div className="text-2xl font-bold text-charcoal mt-1 flex items-baseline gap-2">
            <span>{orders.length}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">รอดำเนินการ (Processing)</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 flex items-baseline gap-2">
            <span>{processingCount}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">จัดส่งสำเร็จ (Delivered)</div>
          <div className="text-2xl font-bold text-forest mt-1 flex items-baseline gap-2">
            <span>{deliveredCount}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหา Order ID (เช่น VA-2026), ลูกค้า, อีเมล..."
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
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-light/60">
          <span className="text-xs text-stone font-medium mr-1">สถานะคำสั่งซื้อ:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              statusFilter === 'all'
                ? 'bg-forest text-offwhite font-medium'
                : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
            }`}
          >
            ทั้งหมด ({orders.length})
          </button>
          {statusOptions.map((st) => {
            const count = orders.filter((o) => (o.status || '').toLowerCase() === st.toLowerCase()).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  statusFilter.toLowerCase() === st.toLowerCase()
                    ? 'bg-forest text-offwhite font-medium'
                    : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-light shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-light/60 text-xs font-semibold uppercase tracking-wider text-stone border-b border-stone-light">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">ลูกค้า</th>
                <th className="py-3.5 px-4">วันที่</th>
                <th className="py-3.5 px-4">สินค้า</th>
                <th className="py-3.5 px-4 text-right">ยอดรวม</th>
                <th className="py-3.5 px-4">การชำระเงิน</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-4 text-right">รายละเอียด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-stone/60" />
                    <p>ยังไม่มีคำสั่งซื้อ หรือไม่พบคำสั่งซื้อที่ค้นหา</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const itemsCount = (o.items || []).reduce((acc, it) => acc + (it.qty || it.quantity || 1), 0);
                  const firstItem = o.items?.[0];

                  return (
                    <tr key={o.orderId} className="hover:bg-sand-light/30 transition-colors">
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-charcoal">
                        {o.orderId}
                      </td>

                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-charcoal text-xs">
                          {o.customerName || 'Explorer'}
                        </div>
                        <div className="text-[11px] text-stone font-mono truncate max-w-[140px]">
                          {o.customerEmail}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-xs font-mono text-stone">
                        {o.date}
                      </td>

                      {/* Items Preview */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {firstItem?.image && (
                            <img
                              src={firstItem.image}
                              alt=""
                              className="w-8 h-8 rounded object-cover border border-stone-light shrink-0"
                            />
                          )}
                          <div className="text-xs text-charcoal">
                            <span className="font-medium line-clamp-1 max-w-[160px]">
                              {firstItem?.name || 'Technical Gear'}
                            </span>
                            {itemsCount > 1 && (
                              <span className="text-stone text-[10px]">+{itemsCount - 1} ชิ้นอื่น</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-charcoal">
                        {formatPrice(o.total || o.subtotal || 0)}
                      </td>

                      {/* Payment Method */}
                      <td className="py-3.5 px-4 text-xs">
                        <span className="capitalize px-2 py-0.5 rounded bg-sand-light border border-stone-light/60 font-medium text-stone">
                          {o.paymentMethod || 'PromptPay'}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 text-center">
                        <select
                          value={o.status || 'Processing'}
                          onChange={(e) => handleStatusChange(o.orderId, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            o.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : o.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : o.status === 'Confirmed'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : o.status === 'Cancelled'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          {statusOptions.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-forest hover:bg-forest/10 rounded-md transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>ดูรายละเอียด</span>
                        </button>
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
      {/* ORDER DETAILS MODAL */}
      {/* =================================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-light">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-light flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-forest" />
                  <h3 className="font-bold text-charcoal">คำสั่งซื้อ #{selectedOrder.orderId}</h3>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      selectedOrder.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedOrder.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : selectedOrder.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-stone mt-0.5">วันที่สั่งซื้อ: {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-stone hover:text-charcoal rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer & Shipping Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sand-light/40 border border-stone-light p-4 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-charcoal text-sm mb-2">ข้อมูลลูกค้า</div>
                  <div>
                    <span className="text-stone">ชื่อผู้สั่งซื้อ: </span>
                    <strong className="text-charcoal">{selectedOrder.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-stone">อีเมล: </span>
                    <span className="font-mono text-charcoal">{selectedOrder.customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-stone">ประเภทบัญชี: </span>
                    <span className="font-semibold text-forest">
                      {selectedOrder.isGuest ? 'ลูกค้าทั่วไป (Guest)' : selectedOrder.customerTier || 'Member'}
                    </span>
                  </div>
                </div>

                <div className="bg-sand-light/40 border border-stone-light p-4 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-charcoal text-sm mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-forest" />
                    <span>ที่อยู่จัดส่งสินค้า</span>
                  </div>
                  {selectedOrder.shippingAddress ? (
                    <>
                      <div className="font-semibold text-charcoal">
                        {selectedOrder.shippingAddress.fullName || selectedOrder.shippingAddress.name} (
                        {selectedOrder.shippingAddress.telNo || selectedOrder.shippingAddress.phone})
                      </div>
                      <div className="text-stone">
                        {selectedOrder.shippingAddress.address1 || selectedOrder.shippingAddress.address}{' '}
                        {selectedOrder.shippingAddress.address2 || ''}
                      </div>
                      <div className="text-stone">
                        {selectedOrder.shippingAddress.district || selectedOrder.shippingAddress.subdistrict},{' '}
                        {selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.postalCode}
                      </div>
                    </>
                  ) : (
                    <div className="text-stone">ไม่มีข้อมูลที่อยู่จัดส่ง</div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                  รายการสินค้าในคำสั่งซื้อ ({(selectedOrder.items || []).length} รายการ)
                </h4>
                <div className="border border-stone-light rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sand-light/60 font-semibold text-stone border-b border-stone-light">
                      <tr>
                        <th className="py-2.5 px-3">สินค้า</th>
                        <th className="py-2.5 px-3 text-center">ตัวเลือก (ไซส์/สี)</th>
                        <th className="py-2.5 px-3 text-right">ราคาต่อหน่วย</th>
                        <th className="py-2.5 px-3 text-center">จำนวน</th>
                        <th className="py-2.5 px-3 text-right">รวม</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-light/60">
                      {(selectedOrder.items || []).map((it, idx) => {
                        const qty = it.qty || it.quantity || 1;
                        const lineTotal = (it.price || 0) * qty;
                        return (
                          <tr key={idx} className="hover:bg-sand-light/20">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5">
                                {it.image && (
                                  <img
                                    src={it.image}
                                    alt=""
                                    className="w-10 h-10 rounded object-cover border border-stone-light shrink-0"
                                  />
                                )}
                                <span className="font-semibold text-charcoal">{it.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center text-stone">
                              {it.size || it.selectedSize || 'Standard'}{' '}
                              {it.color ? `/ ${it.color}` : ''}
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-stone">
                              {formatPrice(it.price || 0)}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-semibold text-charcoal">
                              {qty}
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-bold text-charcoal">
                              {formatPrice(lineTotal)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="bg-sand-light/50 border border-stone-light rounded-xl p-4 text-xs space-y-2 max-w-sm ml-auto">
                <div className="flex justify-between text-stone">
                  <span>ยอดรวมสินค้า (Subtotal):</span>
                  <span className="font-mono text-charcoal">{formatPrice(selectedOrder.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>ค่าจัดส่ง (Shipping):</span>
                  <span className="font-mono text-charcoal">
                    {selectedOrder.shippingFee ? formatPrice(selectedOrder.shippingFee) : 'ฟรี (Free)'}
                  </span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>ส่วนลด (Discount):</span>
                    <span className="font-mono">-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                {selectedOrder.codFee > 0 && (
                  <div className="flex justify-between text-stone">
                    <span>ค่าบริการ COD:</span>
                    <span className="font-mono text-charcoal">+{formatPrice(selectedOrder.codFee)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-light flex justify-between text-sm font-bold text-charcoal">
                  <span>ยอดชำระสุทธิ (Grand Total):</span>
                  <span className="font-mono text-base text-forest">
                    {formatPrice(selectedOrder.total || selectedOrder.subtotal || 0)}
                  </span>
                </div>
                {selectedOrder.pointsEarned > 0 && (
                  <div className="text-[11px] text-amber-700 font-semibold pt-1 flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>ได้รับคะแนนสะสม: +{selectedOrder.pointsEarned} pts</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with Status Updater */}
            <div className="p-4 border-t border-stone-light bg-sand-light/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-charcoal">เปลี่ยนสถานะ:</span>
                <select
                  value={selectedOrder.status || 'Processing'}
                  onChange={(e) => handleStatusChange(selectedOrder.orderId, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-stone-light bg-white focus:outline-none focus:border-forest"
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-charcoal text-offwhite text-xs font-semibold rounded-lg hover:bg-black transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
