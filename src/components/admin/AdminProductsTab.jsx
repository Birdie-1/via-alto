import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Plus,
  RotateCcw,
  Edit2,
  Trash2,
  Check,
  X,
  Package,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';
import {
  getStoredProducts,
  updateProduct,
  toggleProductStock,
  toggleProductFeatured,
  addProduct,
  deleteProduct,
  resetProductsToDefault
} from '../../data/productsStore';
import { CATEGORIES, formatPrice } from '../../data/products';

// Quick Preset Product Images from existing catalog
const PRESET_PRODUCT_IMAGES = [
  { label: 'Alpine 35L Pack', url: '/images/prod_alpine_35l.jpg' },
  { label: 'Summit 50L Pack', url: '/images/prod_summit_50l.jpg' },
  { label: 'Trail 25L Pack', url: '/images/prod_trail_25l.jpg' },
  { label: 'Summit 18L Pack', url: '/images/prod_summit_18l.jpg' },
  { label: 'Alpine Shell', url: '/images/prod_alpine_shell.jpg' },
  { label: 'Down Jacket', url: '/images/prod_down_jacket.jpg' },
  { label: 'Windbreaker', url: '/images/prod_windbreaker.jpg' },
  { label: 'Alto Boots', url: '/images/prod_alto_boots.jpg' },
  { label: 'Trail Runners', url: '/images/prod_trail_runners.jpg' },
  { label: 'Terra Shoes', url: '/images/prod_terra_shoes.jpg' },
  { label: 'Alpine Tent', url: '/images/prod_alpine_tent.jpg' },
  { label: 'Sleeping Bag', url: '/images/prod_sleeping_bag.jpg' },
  { label: 'Camp Lantern', url: '/images/prod_camp_lantern.jpg' },
  { label: 'Titanium Stove', url: '/images/prod_titanium_stove.jpg' },
  { label: 'Headlamp', url: '/images/prod_headlamp.jpg' },
  { label: 'Trekking Poles', url: '/images/prod_trekking_poles.jpg' },
  { label: 'Hydration Vest', url: '/images/prod_hydration_vest.jpg' },
  { label: 'First Aid Kit', url: '/images/prod_first_aid.jpg' }
];

// Helper: Resize and compress image file to compact Base64 JPEG (default maxDim 480px for fast loading and low storage footprint)
const compressImageFile = (file, callback, targetDim = 480) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const naturalW = img.naturalWidth || img.width;
      const naturalH = img.naturalHeight || img.height;
      const canvas = document.createElement('canvas');
      const maxDim = targetDim || 480;
      let width = naturalW;
      let height = naturalH;
      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
      callback(dataUrl, { width, height });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

// Helper: Apply instant transformation (scale down, un-squeeze horizontally, fit square with background padding)
const transformImage = (
  sourceUrl,
  {
    stretchX = 1.0,
    stretchY = 1.0,
    scaleContent = 1.0,
    fitSquare = false,
    padding = 0.08,
    bgColor = '#F7F5F0',
    targetDim = 480
  },
  callback
) => {
  if (!sourceUrl) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');

    let targetW = Math.round(naturalW * stretchX);
    let targetH = Math.round(naturalH * stretchY);
    const maxDim = targetDim || 480;
    const maxCurrent = Math.max(targetW, targetH);
    if (maxCurrent > maxDim) {
      const factor = maxDim / maxCurrent;
      targetW = Math.round(targetW * factor);
      targetH = Math.round(targetH * factor);
    }

    if (fitSquare || scaleContent < 1.0) {
      canvas.width = maxDim;
      canvas.height = maxDim;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, maxDim, maxDim);

      const effectivePadding = Math.max(padding, (1 - scaleContent) / 2);
      const drawArea = maxDim * (1 - effectivePadding * 2);
      const scale = Math.min(drawArea / targetW, drawArea / targetH);
      const dw = Math.round(targetW * scale);
      const dh = Math.round(targetH * scale);
      const dx = Math.round((maxDim - dw) / 2);
      const dy = Math.round((maxDim - dh) / 2);
      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, targetW, targetH);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
    callback(dataUrl);
  };
  img.src = sourceUrl;
};

// Reusable Product Image Selector Component with Aspect-Ratio & Fit Tuning
function ProductImageField({
  label = 'รูปภาพสินค้า (Product Image)',
  value,
  onChange,
  imageFit = 'contain',
  onImageFitChange,
  categoryDefault
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [justTuned, setJustTuned] = useState(false);
  const [resizeTarget, setResizeTarget] = useState(480);
  const fileInputRef = useRef(null);

  const approxKb = value && value.startsWith('data:') ? Math.round((value.length * 3) / 4 / 1024) : null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (PNG, JPG, WebP)');
      return;
    }

    setIsUploading(true);
    compressImageFile(file, (dataUrl) => {
      onChange(dataUrl);
      setIsUploading(false);
    }, resizeTarget);
  };

  const handleApplyTransform = (options) => {
    if (!value) return;
    setIsProcessing(true);
    transformImage(value, { targetDim: resizeTarget, ...options }, (newDataUrl) => {
      onChange(newDataUrl);
      setIsProcessing(false);
      setJustTuned(true);
      setTimeout(() => setJustTuned(false), 2000);
    });
  };

  return (
    <div className="space-y-3 border border-stone-light/80 rounded-xl p-3.5 bg-sand-light/30">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-charcoal flex items-center gap-1.5">
          <span>{label}</span>
          {approxKb && (
            <span className="text-[10px] text-stone font-mono bg-white px-2 py-0.5 rounded border border-stone-light/60">
              ขนาด ~{approxKb} KB
            </span>
          )}
          {justTuned && (
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-normal animate-fadeIn">
              ✓ ปรับรูปเรียบร้อย
            </span>
          )}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="text-[11px] text-red-600 hover:text-red-700 hover:underline cursor-pointer"
          >
            ลบรูป / ใช้รูปหมวดหมู่
          </button>
        )}
      </div>

      <div className="flex gap-3 items-start">
        {/* Thumbnail Preview */}
        <div className="w-24 h-24 rounded-lg border-2 border-dashed border-stone-light bg-[#F7F5F0] overflow-hidden flex items-center justify-center shrink-0 relative shadow-2xs p-1.5">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className={`w-full h-full ${imageFit === 'contain' ? 'object-contain max-h-[90%] max-w-[90%]' : 'object-cover'}`}
              onError={(e) => {
                e.currentTarget.src = categoryDefault || '/images/cat_backpacks.jpg';
              }}
            />
          ) : (
            <div className="text-center p-1">
              <ImageIcon className="w-6 h-6 text-stone/40 mx-auto" />
              <span className="text-[9px] text-stone/60 block mt-0.5">รูปหมวดหมู่</span>
            </div>
          )}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-medium">
              กำลังปรับ...
            </div>
          )}
        </div>

        {/* Upload Button, Resize Target & URL Input */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isProcessing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-light text-charcoal text-xs font-medium rounded-lg hover:bg-sand-light shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5 text-forest" />
              <span>{isUploading ? 'กำลังประมวลผลรูป...' : 'อัปโหลดรูปจากเครื่อง...'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Target Resolution Preset Pills */}
            <div className="flex items-center gap-1 bg-white/70 p-0.5 rounded-md border border-stone-light/60">
              <span className="text-[10px] text-stone pl-1 pr-0.5">Resize:</span>
              {[
                { dim: 400, label: '400px (กะทัดรัด)' },
                { dim: 480, label: '480px (แนะนำ)' },
                { dim: 600, label: '600px' }
              ].map((opt) => (
                <button
                  key={opt.dim}
                  type="button"
                  onClick={() => setResizeTarget(opt.dim)}
                  className={`text-[9px] px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    resizeTarget === opt.dim
                      ? 'bg-forest text-offwhite font-bold'
                      : 'text-stone hover:text-charcoal'
                  }`}
                  title={`ย่อขนาดด้านยาวสุดไม่เกิน ${opt.dim}px`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <LinkIcon className="w-3.5 h-3.5 text-stone absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="หรือวาง URL รูปภาพ (https://... หรือ /images/...)"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-light rounded-lg focus:outline-none focus:border-forest bg-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Image Display Fit & Aspect Ratio Tuning Tool */}
      {value && (
        <div className="p-2.5 bg-white/80 rounded-lg border border-stone-light/70 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-charcoal">การจัดวางรูปภาพ (Display Fit):</span>
            <div className="inline-flex rounded-md border border-stone-light overflow-hidden bg-sand-light/50">
              <button
                type="button"
                onClick={() => onImageFitChange?.('contain')}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  imageFit === 'contain'
                    ? 'bg-forest text-offwhite font-semibold'
                    : 'text-stone hover:text-charcoal'
                }`}
              >
                ✓ พอดีกรอบ (Contain - แนะนำ)
              </button>
              <button
                type="button"
                onClick={() => onImageFitChange?.('cover')}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  imageFit === 'cover'
                    ? 'bg-forest text-offwhite font-semibold'
                    : 'text-stone hover:text-charcoal'
                }`}
              >
                เต็มกรอบ (Cover)
              </button>
            </div>
          </div>

          {/* Quick Resize / Scale Down Tools (แก้ปัญหารูปใหญ่เกินไป) */}
          <div className="pt-2 border-t border-stone-light/50 text-[11px]">
            <div className="text-stone font-medium mb-1.5 flex items-center justify-between">
              <span>ย่อขนาดรูป / เว้นขอบระบาย (Scale Down):</span>
              <span className="text-[10px] text-stone/70">ป้องกันรูปดูใหญ่ล้นกล่อง</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleApplyTransform({ scaleContent: 0.85, fitSquare: true, bgColor: '#F7F5F0', padding: 0.08 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-white hover:bg-sand-light text-charcoal border border-stone-light rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                title="ย่อขนาดรูปลง 15% พร้อมเพิ่มระยะขอบสบายตา"
              >
                🔍 ย่อลง -15% (เพิ่มขอบระบาย)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTransform({ scaleContent: 0.75, fitSquare: true, bgColor: '#F7F5F0', padding: 0.12 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-white hover:bg-sand-light text-charcoal border border-stone-light rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                title="ย่อขนาดรูปลง 25% ให้กะทัดรัดยิ่งขึ้น"
              >
                🔍 ย่อลง -25% (กะทัดรัด)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTransform({ targetDim: 400 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-white hover:bg-sand-light text-forest border border-forest/30 rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                title="บีบอัดขนาดไฟล์ลงเหลือสูงสุด 400px"
              >
                ⚡ ย่อความละเอียดเป็น 400px
              </button>
            </div>
          </div>

          {/* Quick Un-squeeze & Aspect Correction (แก้ปัญหารูปบีบ) */}
          <div className="pt-2 border-t border-stone-light/50 text-[11px]">
            <div className="text-stone font-medium mb-1.5 flex items-center justify-between">
              <span>แก้อาการรูปบีบ / ขยายสัดส่วนกว้าง (Un-squeeze):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleApplyTransform({ stretchX: 1.15 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-white hover:bg-sand-light text-charcoal border border-stone-light rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                title="ขยายแนวนอนขึ้น 15%"
              >
                +15% กว้างขึ้น
              </button>
              <button
                type="button"
                onClick={() => handleApplyTransform({ stretchX: 1.25 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-50 shadow-2xs"
                title="ขยายแนวนอนขึ้น 25% (แก้รูปบีบยอดนิยม)"
              >
                +25% กว้างขึ้น (แก้รูป Squeeze)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTransform({ stretchX: 1.35 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-white hover:bg-sand-light text-charcoal border border-stone-light rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                title="ขยายแนวนอนขึ้น 35%"
              >
                +35% กว้างขึ้น
              </button>
              <button
                type="button"
                onClick={() => handleApplyTransform({ fitSquare: true, bgColor: '#F7F5F0', padding: 0.08 })}
                disabled={isProcessing}
                className="px-2 py-1 bg-white hover:bg-sand-light text-forest border border-forest/30 rounded text-[10px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                title="จัดวางกึ่งกลางกรอบสี่เหลี่ยม 1:1 พร้อมพื้นหลัง Dolomite Sand"
              >
                จัดกลาง 1:1 + พื้นหลัง Sand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preset Quick Images */}
      <div className="pt-2 border-t border-stone-light/50">
        <div className="text-[10px] text-stone font-medium mb-1.5">หรือเลือกรูปด่วนจากแคตตาล็อก:</div>
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
          {PRESET_PRODUCT_IMAGES.map((preset) => (
            <button
              key={preset.url}
              type="button"
              onClick={() => {
                onChange(preset.url);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                value === preset.url
                  ? 'bg-forest text-offwhite border-forest font-semibold'
                  : 'bg-white text-stone hover:text-charcoal hover:bg-sand-light border-stone-light'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsTab({ onToast, onPreviewProduct }) {
  const [products, setProducts] = useState(getStoredProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // all, in_stock, out_of_stock
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    name_th: '',
    categoryId: 'backpacks',
    price: 1990,
    image: '',
    imageFit: 'contain',
    badge: 'NEW',
    badge_th: 'สินค้าใหม่',
    isFeatured: false,
    inStock: true,
    weight: '350 g',
    materials: 'Technical DWR Ripstop',
    bestUse: 'Alpine Trekking'
  });

  const refreshProducts = () => {
    setProducts(getStoredProducts());
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.name_th && p.name_th.includes(searchQuery)) ||
        p.id.toString() === searchQuery.trim();

      const matchesCat =
        selectedCategory === 'all' ||
        (p.categoryId && p.categoryId.toLowerCase() === selectedCategory.toLowerCase()) ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'in_stock' && p.inStock !== false) ||
        (stockFilter === 'out_of_stock' && p.inStock === false);

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  // Handle Quick In-Stock Toggle
  const handleToggleStock = (id, currentStatus) => {
    const updated = toggleProductStock(id);
    setProducts(updated);
    onToast(
      currentStatus
        ? `ปรับสถานะสินค้า #${id} เป็น 'สินค้าหมด (Out of Stock)'`
        : `ปรับสถานะสินค้า #${id} เป็น 'มีสินค้า (In Stock)' พร้อมจำหน่าย`
    );
  };

  // Handle Quick Featured Toggle
  const handleToggleFeatured = (id, currentStatus) => {
    const updated = toggleProductFeatured(id);
    setProducts(updated);
    onToast(
      currentStatus
        ? `นำสินค้า #${id} ออกจากรายการสินค้าแนะนำ (Featured)`
        : `เพิ่มสินค้า #${id} เข้าเป็นสินค้าแนะนำหน้าแรก (Featured)!`
    );
  };

  // Handle Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = updateProduct(editingProduct.id, editingProduct);
    setProducts(updated);
    setEditingProduct(null);
    onToast(`อัปเดตข้อมูลสินค้า #${editingProduct.id} เรียบร้อยแล้ว`);
  };

  // Handle Add New Product
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    const updated = addProduct(newProd);
    setProducts(updated);
    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      name_th: '',
      categoryId: 'backpacks',
      price: 1990,
      image: '',
      imageFit: 'contain',
      badge: 'NEW',
      badge_th: 'สินค้าใหม่',
      isFeatured: false,
      inStock: true,
      weight: '350 g',
      materials: 'Technical DWR Ripstop',
      bestUse: 'Alpine Trekking'
    });
    onToast(`เพิ่มสินค้าใหม่ "${newProd.name}" เข้าสู่ระบบเรียบร้อยแล้ว`);
  };

  // Handle Delete Product
  const handleDeleteProduct = (id) => {
    const updated = deleteProduct(id);
    setProducts(updated);
    setDeleteConfirmId(null);
    onToast(`ลบสินค้า #${id} ออกจากแคตตาล็อกเรียบร้อยแล้ว`);
  };

  // Handle Reset Catalog
  const handleResetCatalog = () => {
    if (window.confirm('คุณต้องการรีเซ็ตแคตตาล็อกสินค้ากลับสู่ค่าเริ่มต้น 30 รายการเดิมใช่หรือไม่?')) {
      const defaults = resetProductsToDefault();
      setProducts(defaults);
      onToast('รีเซ็ตแคตตาล็อกสินค้ากลับสู่ค่าเริ่มต้น 30 รายการเรียบร้อยแล้ว');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">สินค้าทั้งหมด</div>
          <div className="text-2xl font-bold text-charcoal mt-1 flex items-baseline gap-2">
            <span>{products.length}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">พร้อมจำหน่าย (In Stock)</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 flex items-baseline gap-2">
            <span>{products.filter((p) => p.inStock !== false).length}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">สินค้าหมด (Out of Stock)</div>
          <div className="text-2xl font-bold text-red-600 mt-1 flex items-baseline gap-2">
            <span>{products.filter((p) => p.inStock === false).length}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs">
          <div className="text-xs uppercase tracking-wider text-stone font-medium">สินค้าแนะนำ (Featured)</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 flex items-baseline gap-2">
            <span>{products.filter((p) => p.isFeatured).length}</span>
            <span className="text-xs font-normal text-stone">รายการ</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, and Actions */}
      <div className="bg-white p-4 rounded-xl border border-stone-light shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อสินค้า, รหัส ID..."
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
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest text-offwhite text-sm font-medium rounded-lg hover:bg-forest-light transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มสินค้าใหม่</span>
            </button>

            <button
              onClick={handleResetCatalog}
              title="รีเซ็ตแคตตาล็อกกลับสู่ 30 รายการตั้งต้น"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-sand-light/80 text-charcoal hover:bg-stone-light/60 text-sm font-medium rounded-lg border border-stone-light transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-stone" />
              <span className="hidden sm:inline">คืนค่าเริ่มต้น</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-light/60">
          <span className="text-xs text-stone font-medium mr-1">หมวดหมู่:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-forest text-offwhite font-medium'
                : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
            }`}
          >
            ทั้งหมด ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter(
              (p) => p.categoryId === cat.id || p.category.toLowerCase() === cat.name.toLowerCase()
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-forest text-offwhite font-medium'
                    : 'bg-sand-light text-charcoal hover:bg-stone-light/60'
                }`}
              >
                {cat.name_th || cat.name} ({count})
              </button>
            );
          })}

          <div className="h-4 w-px bg-stone-light mx-2 hidden sm:block" />

          {/* Stock Filter */}
          <span className="text-xs text-stone font-medium mr-1">สถานะสต็อก:</span>
          <button
            onClick={() => setStockFilter('all')}
            className={`px-2.5 py-1 text-xs rounded-md ${
              stockFilter === 'all' ? 'bg-charcoal text-offwhite' : 'text-stone hover:text-charcoal'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setStockFilter('in_stock')}
            className={`px-2.5 py-1 text-xs rounded-md ${
              stockFilter === 'in_stock' ? 'bg-emerald-700 text-offwhite' : 'text-stone hover:text-emerald-700'
            }`}
          >
            มีสินค้า
          </button>
          <button
            onClick={() => setStockFilter('out_of_stock')}
            className={`px-2.5 py-1 text-xs rounded-md ${
              stockFilter === 'out_of_stock' ? 'bg-red-600 text-offwhite' : 'text-stone hover:text-red-600'
            }`}
          >
            สินค้าหมด
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-stone-light shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-light/60 text-xs font-semibold uppercase tracking-wider text-stone border-b border-stone-light">
              <tr>
                <th className="py-3.5 px-4 w-16">ID</th>
                <th className="py-3.5 px-4">สินค้า</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4 text-right">ราคา</th>
                <th className="py-3.5 px-4 text-center">สถานะสต็อก</th>
                <th className="py-3.5 px-4 text-center">แนะนำ (Featured)</th>
                <th className="py-3.5 px-4 text-center">Badge</th>
                <th className="py-3.5 px-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone">
                    <Package className="w-8 h-8 mx-auto mb-2 text-stone/60" />
                    <p>ไม่พบรายการสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isInStock = p.inStock !== false;
                  return (
                    <tr key={p.id} className="hover:bg-sand-light/30 transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono text-xs text-stone">
                        #{p.id}
                      </td>

                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-contain bg-[#F7F5F0] p-1 border border-stone-light shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = '/images/cat_backpacks.jpg';
                            }}
                          />
                          <div>
                            <div className="font-semibold text-charcoal line-clamp-1 hover:text-forest transition-colors">
                              {p.name}
                            </div>
                            <div className="text-xs text-stone line-clamp-1">
                              {p.name_th || p.shortDesc_th || p.shortDesc}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-xs font-medium text-stone">
                        <span className="inline-block px-2 py-0.5 rounded bg-sand-light border border-stone-light/60">
                          {p.category_th || p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 text-right font-semibold font-mono text-charcoal">
                        {formatPrice(p.price)}
                      </td>

                      {/* In Stock Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleStock(p.id, isInStock)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            isInStock
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                          }`}
                        >
                          {isInStock ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(p.id, p.isFeatured)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            p.isFeatured
                              ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                              : 'bg-sand-light/60 text-stone hover:text-charcoal'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{p.isFeatured ? 'Featured' : 'Standard'}</span>
                        </button>
                      </td>

                      {/* Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {p.badge ? (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-light/70 text-charcoal">
                            {p.badge_th || p.badge}
                          </span>
                        ) : (
                          <span className="text-stone/40 text-xs">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setEditingProduct({ ...p })}
                            title="แก้ไขข้อมูลสินค้า"
                            className="p-1.5 text-stone hover:text-forest hover:bg-forest/10 rounded-md transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="ลบสินค้า"
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
      {/* EDIT PRODUCT MODAL */}
      {/* =================================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-light">
            <div className="p-5 border-b border-stone-light flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-forest" />
                <h3 className="text-lg font-bold text-charcoal">แก้ไขสินค้า #{editingProduct.id}</h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 text-stone hover:text-charcoal rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ชื่อสินค้า (English) *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ชื่อสินค้า (ภาษาไทย)
                </label>
                <input
                  type="text"
                  value={editingProduct.name_th || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name_th: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    ราคาขาย (บาท) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={editingProduct.categoryId || 'backpacks'}
                    onChange={(e) => {
                      const cat = CATEGORIES.find((c) => c.id === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        categoryId: e.target.value,
                        category: cat ? cat.name : editingProduct.category,
                        category_th: cat ? cat.name_th : editingProduct.category_th
                      });
                    }}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_th || c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Image Field */}
              <ProductImageField
                value={editingProduct.image || ''}
                onChange={(imgUrl) => setEditingProduct({ ...editingProduct, image: imgUrl })}
                imageFit={editingProduct.imageFit || 'contain'}
                onImageFitChange={(fit) => setEditingProduct({ ...editingProduct, imageFit: fit })}
                categoryDefault={CATEGORIES.find((c) => c.id === editingProduct.categoryId)?.image}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Badge ป้ายกำกับ (EN)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น BESTSELLER, NEW"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Badge ป้ายกำกับ (TH)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น ขายดี, สินค้าใหม่"
                    value={editingProduct.badge_th || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge_th: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock !== false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="w-4 h-4 accent-forest rounded"
                  />
                  <span className="text-xs font-medium text-charcoal">มีสินค้าพร้อมจำหน่าย (In Stock)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.isFeatured)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <span className="text-xs font-medium text-charcoal">สินค้าแนะนำ (Featured)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-light flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-sm text-stone hover:text-charcoal"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest text-offwhite text-sm font-semibold rounded-lg hover:bg-forest-light transition-colors shadow-xs"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ADD NEW PRODUCT MODAL */}
      {/* =================================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-light">
            <div className="p-5 border-b border-stone-light flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-forest" />
                <h3 className="text-lg font-bold text-charcoal">เพิ่มสินค้าใหม่ลงแคตตาล็อก</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-stone hover:text-charcoal rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ชื่อสินค้า (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alpine Ascent Daypack 28L"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ชื่อสินค้า (ภาษาไทย)
                </label>
                <input
                  type="text"
                  placeholder="เช่น เป้เดินป่า Alpine Ascent 28L"
                  value={newProd.name_th}
                  onChange={(e) => setNewProd({ ...newProd, name_th: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    ราคาขาย (บาท) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    หมวดหมู่ *
                  </label>
                  <select
                    value={newProd.categoryId}
                    onChange={(e) => setNewProd({ ...newProd, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_th || c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Image Field */}
              <ProductImageField
                value={newProd.image || ''}
                onChange={(imgUrl) => setNewProd({ ...newProd, image: imgUrl })}
                imageFit={newProd.imageFit || 'contain'}
                onImageFitChange={(fit) => setNewProd({ ...newProd, imageFit: fit })}
                categoryDefault={CATEGORIES.find((c) => c.id === newProd.categoryId)?.image}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Badge ป้ายกำกับ
                  </label>
                  <input
                    type="text"
                    value={newProd.badge}
                    onChange={(e) => setNewProd({ ...newProd, badge: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    น้ำหนัก (Weight)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 450 g"
                    value={newProd.weight}
                    onChange={(e) => setNewProd({ ...newProd, weight: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-light rounded-lg focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.inStock}
                    onChange={(e) => setNewProd({ ...newProd, inStock: e.target.checked })}
                    className="w-4 h-4 accent-forest rounded"
                  />
                  <span className="text-xs font-medium text-charcoal">มีสินค้าพร้อมจำหน่าย</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isFeatured}
                    onChange={(e) => setNewProd({ ...newProd, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <span className="text-xs font-medium text-charcoal">ตั้งเป็นสินค้าแนะนำ</span>
                </label>
              </div>

              <div className="pt-4 border-t border-stone-light flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-stone hover:text-charcoal"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest text-offwhite text-sm font-semibold rounded-lg hover:bg-forest-light transition-colors shadow-xs"
                >
                  สร้างสินค้าใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* =================================================================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-light">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-charcoal mb-1">ยืนยันการลบสินค้า #{deleteConfirmId}?</h4>
            <p className="text-xs text-stone mb-6">
              การลบจะนำสินค้านี้ออกจากแคตตาล็อกหน้าร้านทันที (คุณสามารถกู้คืนได้โดยการกดปุ่ม 'คืนค่าเริ่มต้น')
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-medium text-stone hover:text-charcoal bg-sand-light rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
