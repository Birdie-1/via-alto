/**
 * VIA ALTO — Behavioral Product Recommendation Service (Step 5 ในใบงาน)
 * ระบบวิเคราะห์พฤติกรรมการใช้งานของผู้ใช้ (การเข้าชมสินค้า, สินค้าในตะกร้า, ประวัติการคลิก)
 * เพื่อแสดงผลสินค้าแนะนำแบบ Real-time ตามความสนใจและพฤติกรรมจริงของผู้ใช้งาน
 */

// บรรทัดที่ 8: กำหนด Key สำหรับบันทึกประวัติสินค้าที่ดูล่าสุดใน localStorage ของเบราว์เซอร์
const STORAGE_KEY_RECENTLY_VIEWED = 'via_alto_recently_viewed';
// บรรทัดที่ 10: กำหนดจำนวนสินค้าสูงสุดที่จะจำในประวัติการดูล่าสุด (10 ชิ้น)
const MAX_RECENT_ITEMS = 10;

// บรรทัดที่ 13: แผนผังหมวดหมู่สินค้าที่ส่งเสริมซึ่งกันและกัน (Complementary Categories) สำหรับ Cross-sell แนะนำสินค้าที่เกี่ยวข้อง
const COMPLEMENTARY_CATEGORIES = {
  backpacks: ['clothing', 'accessories', 'footwear'],   // เป้สะพายหลัง -> แนะนำเสื้อผ้า, อุปกรณ์เสริม, รองเท้า
  clothing: ['clothing', 'accessories', 'footwear'],     // เสื้อผ้า -> แนะนำเสื้อผ้าชิ้นอื่น, อุปกรณ์, รองเท้า
  footwear: ['accessories', 'clothing', 'backpacks'],    // รองเท้า -> แนะนำถุงเท้า/อุปกรณ์, เสื้อผ้า, เป้
  camping: ['camping', 'accessories', 'backpacks'],      // อุปกรณ์แคมป์ปิ้ง -> เต็นท์/ถุงนอน, อุปกรณ์, เป้
  accessories: ['backpacks', 'clothing', 'camping']      // อุปกรณ์เสริม -> เป้, เสื้อผ้า, แคมป์ปิ้ง
};

// บรรทัดที่ 22: กฎจับคู่สินค้าสัมพันธ์เฉพาะเจาะจง (Affinity Product Pairing Rules) เช่น ซื้อเป้ แนะนำเสื้อกันลมและไม้เท้าเดินป่า
const SPECIFIC_PAIRINGS = {
  // รหัส 1: Alpine 35L Backpack -> แจ็คเก็ต Alpine Shell (4), ไม้เท้าเดินป่า (25), กระบอกน้ำเก็บอุณหภูมิ (23)
  1: [4, 25, 23],
  // รหัส 2: Trail 25L Daypack -> เสื้อกันลม (6), เป้น้ำวิ่งเทรล (17), หมวกกันแดด (26)
  2: [6, 17, 26],
  // รหัส 3: Summit 50L Expedition Pack -> เต็นท์ 4 ฤดู (13), เสื้อแจ็คเก็ตขนเป็ด (7), เตาไทเทเนียม (24)
  3: [13, 7, 24],
  // รหัส 4: Alpine Shell Jacket -> เสื้อฟรีซขนแกะ Merino (8), กางเกงเดินป่า (9), ถุงกันน้ำ Dry Bag (21)
  4: [8, 9, 21],
  // รหัส 10: Alto Mountain Waterproof Boots -> ถุงเท้าขนแกะ Merino (20), ไม้เท้าเดินป่า (25), สนับแข้งกันหิมะ (28)
  10: [20, 25, 28],
  // รหัส 13: เต็นท์ Alpine 4-Season -> ถุงนอนขนเป็ด (14), แผ่นรองนอนกันหนาว (15), ตะเกียงแคมป์ (16)
  13: [14, 15, 16],
  // รหัส 14: ถุงนอน Down Sleeping Bag -> แผ่นรองนอน (15), ไฟฉายคาดหัว (18), ชุดปฐมพยาบาล (22)
  14: [15, 18, 22]
};

/**
 * 1. ฟังก์ชัน trackProductView: บันทึก ID สินค้าที่ผู้ใช้กำลังดูลงใน localStorage
 * @param {number} productId - รหัสสินค้าที่ผู้ใช้คลิกเปิดดู
 */
export function trackProductView(productId) {
  // บรรทัดที่ 46: หากไม่มีรหัสสินค้าส่งมาให้หยุดการทำงาน
  if (!productId) return;
  try {
    // บรรทัดที่ 49: อ่านประวัติเดิมจาก localStorage หากไม่มีให้เป็น Array ว่าง
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_RECENTLY_VIEWED) || '[]');
    // บรรทัดที่ 51: กรอง ID ปัจจุบันออกจากตำแหน่งเดิม แล้วนำมาวางไว้หน้าสุด (ลำดับล่าสุด) และจำกัดไม่เกิน 10 ชิ้น
    const updated = [productId, ...stored.filter((id) => id !== productId)].slice(0, MAX_RECENT_ITEMS);
    // บรรทัดที่ 53: บันทึกรายการใหม่กลับลงสู่ localStorage
    localStorage.setItem(STORAGE_KEY_RECENTLY_VIEWED, JSON.stringify(updated));
  } catch (err) {
    // บรรทัดที่ 56: ดักจับ Error กรณีเบราว์เซอร์ปิดกั้น LocalStorage
    console.warn('Failed to track product view in storage:', err);
  }
}

/**
 * 2. ฟังก์ชัน getRecentlyViewed: ดึงรายการ Object สินค้าที่ผู้ใช้เพิ่งเปิดดูล่าสุด
 * @param {Array} allProducts - รายการสินค้าทั้งหมดในระบบ
 * @param {number|null} currentProductId - รหัสสินค้าปัจจุบันที่กำลังเปิดดูอยู่ (เพื่อไม่ให้แสดงซ้ำกับหน้าปัจจุบัน)
 * @param {number} limit - จำนวนสินค้าที่ต้องการแสดง (ค่าเริ่มต้น 4 ชิ้น)
 * @returns {Array} รายการ Object ข้อมูลสินค้า
 */
export function getRecentlyViewed(allProducts = [], currentProductId = null, limit = 4) {
  try {
    // บรรทัดที่ 69: ดึงรายการ ID จาก localStorage
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY_RECENTLY_VIEWED) || '[]');
    // บรรทัดที่ 71: กรอง ID ปัจจุบันออก แมปกับ allProducts เพื่อดึงรายละเอียดสินค้า และตัดความยาวตาม limit
    return ids
      .filter((id) => id !== currentProductId)
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, limit);
  } catch {
    // บรรทัดที่ 78: กรณีเกิดข้อผิดพลาด ให้ส่งคืน Array ว่าง
    return [];
  }
}

/**
 * 3. ฟังก์ชัน getFrequentlyPaired: ดึงสินค้าแนะนำที่มักใช้งานร่วมกัน (Frequently Paired With)
 * @param {Object} product - สินค้าหลักที่กำลังเปิดดู
 * @param {Array} allProducts - รายการสินค้าทั้งหมดในแค็ตตาล็อก
 * @param {number} limit - จำนวนสินค้าคู่หูที่ต้องการ (ค่าเริ่มต้น 3 ชิ้น)
 * @returns {Array} รายการสินค้าคู่หูแนะนำ
 */
export function getFrequentlyPaired(product, allProducts = [], limit = 3) {
  // บรรทัดที่ 89: หากไม่มีสินค้าหรือไม่มีแค็ตตาล็อก ให้ส่งคืน Array ว่าง
  if (!product || !allProducts.length) return [];

  // บรรทัดที่ 92: กลยุทธ์ที่ 1 — ตรวจสอบกฎความสัมพันธ์เฉพาะ (Specific Pairings) ก่อน
  if (SPECIFIC_PAIRINGS[product.id]) {
    const specificMatches = SPECIFIC_PAIRINGS[product.id]
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean);
    // บรรทัดที่ 97: หากพบสินค้าตรงตามกฎครบตามจำนวน ให้ส่งคืนทันที
    if (specificMatches.length >= limit) {
      return specificMatches.slice(0, limit);
    }
  }

  // บรรทัดที่ 102: กลยุทธ์ที่ 2 — Fallback แนะนำสินค้าจากหมวดหมู่ที่ส่งเสริมกัน (Complementary Categories)
  const targetCategory = (product.category || product.categoryId || '').toLowerCase();
  const complementaryCats = COMPLEMENTARY_CATEGORIES[targetCategory] || ['accessories', 'clothing'];

  // บรรทัดที่ 106: กรองสินค้าที่ไม่ใช่ตัวมันเอง และอยู่ในหมวดหมู่ที่ส่งเสริมกัน
  const matches = allProducts.filter((p) => {
    if (p.id === product.id) return false;
    const cat = (p.category || p.categoryId || '').toLowerCase();
    return complementaryCats.includes(cat);
  });

  // บรรทัดที่ 113: เรียงลำดับตามคะแนนรีวิว (Rating) สูงสุด เพื่อเลือกสินค้าคุณภาพดีที่สุดให้ลูกค้า
  matches.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  // บรรทัดที่ 116: ตัดความยาวตาม limit ที่ต้องการ
  return matches.slice(0, limit);
}

/**
 * 4. ฟังก์ชัน getCartCrossSells: ดึงสินค้าแนะนำสำหรับนำเสนอในถุงช้อปปิ้ง (Cart Drawer Cross-sells)
 * @param {Array} cartItems - รายการสินค้าที่อยู่ในตะกร้าปัจจุบัน
 * @param {Array} allProducts - แค็ตตาล็อกสินค้าทั้งหมด
 * @param {number} limit - จำนวนสินค้าแนะนำที่ต้องการ (ค่าเริ่มต้น 2 ชิ้น)
 * @returns {Array} รายการสินค้า Cross-sell
 */
export function getCartCrossSells(cartItems = [], allProducts = [], limit = 2) {
  // บรรทัดที่ 127: หากไม่มีสินค้าในแค็ตตาล็อก ให้ส่งคืน Array ว่าง
  if (!allProducts.length) return [];

  // บรรทัดที่ 130: รวม ID ของสินค้าที่มีอยู่ในตะกร้าแล้วเพื่อไม่แนะนำซ้ำ
  const cartProductIds = new Set(cartItems.map((item) => item.product?.id || item.productId));

  // บรรทัดที่ 133: วิเคราะห์หาหมวดหมู่ของสินค้าที่มีอยู่ในตะกร้า
  const presentCategories = new Set(
    cartItems
      .map((item) => (item.product?.category || item.product?.categoryId || '').toLowerCase())
      .filter(Boolean)
  );

  // บรรทัดที่ 140: กรองหาสินค้าที่เป็นตัวเลือกที่เหมาะสม (Candidates)
  const candidates = allProducts.filter((p) => {
    // บรรทัดที่ 142: ถ้ามีอยู่ในตะกร้าแล้ว ไม่ต้องแนะนำซ้ำ
    if (cartProductIds.has(p.id)) return false;
    const cat = (p.category || p.categoryId || '').toLowerCase();

    // บรรทัดที่ 146: ถ้าผู้ใช้ซื้อเป้หรืออุปกรณ์แคมป์ ให้แนะนำอุปกรณ์เสริมหรือเสื้อผ้าเป็นพิเศษ
    if (presentCategories.has('backpacks') || presentCategories.has('camping')) {
      return cat === 'accessories' || cat === 'clothing';
    }
    // บรรทัดที่ 150: หรือเลือกสินค้า Featured และคะแนนรีวิวตั้งแต่ 4.8 ขึ้นไป
    return p.isFeatured || p.rating >= 4.8;
  });

  // บรรทัดที่ 154: เรียงลำดับตามคะแนนรีวิวสูงสุด
  candidates.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  // บรรทัดที่ 156: ส่งคืนสินค้าจำนวนตามที่กำหนดใน limit
  return candidates.slice(0, limit);
}
