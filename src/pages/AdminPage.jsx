import React, { useState, useEffect } from 'react';
import {
  Package,
  Users,
  Mail,
  ShoppingBag,
  ArrowLeft,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  RotateCcw,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import AdminProductsTab from '../components/admin/AdminProductsTab';
import AdminMembersTab from '../components/admin/AdminMembersTab';
import AdminSubscribersTab from '../components/admin/AdminSubscribersTab';
import AdminOrdersTab from '../components/admin/AdminOrdersTab';
import { getStoredProducts } from '../data/productsStore';
import { getRegisteredUsers, getAllOrdersAdmin } from '../data/auth';

export default function AdminPage({ onNavigate, showToast, lang = 'th' }) {
  const [activeTab, setActiveTab] = useState('products'); // products, members, subscribers, orders
  const [stats, setStats] = useState({
    productsCount: 30,
    membersCount: 1,
    subscribersCount: 0,
    ordersCount: 1
  });

  // Calculate quick stats on load and tab change
  const refreshStats = () => {
    const products = getStoredProducts();
    const members = getRegisteredUsers();
    const orders = getAllOrdersAdmin();

    setStats((prev) => ({
      ...prev,
      productsCount: products.length,
      membersCount: members.length,
      ordersCount: orders.length
    }));

    // Check subscribers count from backend if available
    fetch('/php-api/api/admin.php?action=stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.stats) {
          setStats((prev) => ({
            ...prev,
            subscribersCount: data.stats.subscribersCount || 0
          }));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshStats();
    // Listen for custom products updated event
    const handleProductsUpdated = () => refreshStats();
    window.addEventListener('via_alto_products_updated', handleProductsUpdated);
    return () => window.removeEventListener('via_alto_products_updated', handleProductsUpdated);
  }, [activeTab]);

  const navItems = [
    {
      id: 'products',
      label: 'จัดการสินค้า',
      labelEn: 'Product Catalog',
      icon: Package,
      count: stats.productsCount,
      color: 'text-amber-400'
    },
    {
      id: 'members',
      label: 'จัดการสมาชิก',
      labelEn: 'Members & Profiles',
      icon: Users,
      count: stats.membersCount,
      color: 'text-emerald-400'
    },
    {
      id: 'subscribers',
      label: 'ผู้ติดตาม Newsletter',
      labelEn: 'Subscribers Leads',
      icon: Mail,
      count: stats.subscribersCount,
      color: 'text-sky-400'
    },
    {
      id: 'orders',
      label: 'จัดการคำสั่งซื้อ',
      labelEn: 'Orders & Receipts',
      icon: ShoppingBag,
      count: stats.ordersCount,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-sand-light/40 flex flex-col md:flex-row text-charcoal">
      {/* =================================================================== */}
      {/* 1. LEFT SIDEBAR (ALPINE DARK TECHNICAL STYLE) */}
      {/* =================================================================== */}
      <aside className="w-full md:w-64 bg-charcoal text-offwhite flex flex-col justify-between shrink-0 border-r border-charcoal/80">
        <div>
          {/* Brand & Portal Header */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-offwhite shadow-xs">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="font-serif font-black tracking-wider text-sm text-offwhite">
                  VIA ALTO
                </div>
                <div className="text-[10px] tracking-widest font-mono uppercase text-stone-light/60">
                  ADMIN DASHBOARD
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-stone-light/40">
              Core Modules (1 - 4)
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    refreshStats();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-forest text-offwhite shadow-sm'
                      : 'text-stone-light/80 hover:bg-white/5 hover:text-offwhite'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : item.color}`} />
                    <span>{lang === 'th' ? item.label : item.labelEn}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-black/30 text-emerald-300' : 'bg-white/10 text-stone-light/70'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Return to Storefront */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => onNavigate('shop')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 text-offwhite text-xs font-medium rounded-xl border border-white/10 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>กลับไปหน้าร้านค้า (Shop)</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-stone-light/70 hover:text-offwhite text-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>หน้าแรก (Home)</span>
          </button>

          <div className="pt-2 text-[10px] text-stone-light/40 text-center font-mono">
            VIA ALTO System v1.0 • Phase 1
          </div>
        </div>
      </aside>

      {/* =================================================================== */}
      {/* 2. MAIN CONTENT AREA */}
      {/* =================================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-stone-light px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone">
              <span>Admin Portal</span>
              <span>/</span>
              <span className="font-semibold text-charcoal capitalize">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
            <h1 className="text-xl font-bold text-charcoal mt-0.5">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                refreshStats();
                showToast('รีเฟรชข้อมูลล่าสุดเรียบร้อยแล้ว');
              }}
              title="รีเฟรชข้อมูล"
              className="p-2 text-stone hover:text-charcoal bg-sand-light/60 hover:bg-sand-light rounded-lg border border-stone-light transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-forest bg-forest/10 hover:bg-forest/20 rounded-lg transition-colors"
            >
              <span>ดูหน้าร้านจริง</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-6 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'products' && (
            <AdminProductsTab
              onToast={showToast}
              onPreviewProduct={(product) => {
                onNavigate('shop', { product: product.id });
              }}
            />
          )}

          {activeTab === 'members' && (
            <AdminMembersTab onToast={showToast} />
          )}

          {activeTab === 'subscribers' && (
            <AdminSubscribersTab onToast={showToast} />
          )}

          {activeTab === 'orders' && (
            <AdminOrdersTab onToast={showToast} />
          )}
        </div>
      </main>
    </div>
  );
}
