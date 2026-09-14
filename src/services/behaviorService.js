/**
 * VIA ALTO — Behavioral Product Recommendation Service (Step 5)
 * Analyzes user interactions (page views, cart additions, browsing sequences)
 * to deliver real-time personalized recommendations.
 */

const STORAGE_KEY_RECENTLY_VIEWED = 'via_alto_recently_viewed';
const MAX_RECENT_ITEMS = 10;

// Complementary categories map for associative gear recommendations
const COMPLEMENTARY_CATEGORIES = {
  backpacks: ['clothing', 'accessories', 'footwear'],
  clothing: ['clothing', 'accessories', 'footwear'],
  footwear: ['accessories', 'clothing', 'backpacks'],
  camping: ['camping', 'accessories', 'backpacks'],
  accessories: ['backpacks', 'clothing', 'camping']
};

// Specific affinity product pairings (Handcrafted Alpine Synergy Rules)
const SPECIFIC_PAIRINGS = {
  // Alpine 35L Backpack -> Alpine Shell Jacket, Trekking Poles, Insulated Bottle
  1: [4, 25, 23],
  // Trail 25L Daypack -> Windbreaker, Hydration Vest, Sun Cap
  2: [6, 17, 26],
  // Summit 50L Expedition Pack -> Alpine 4-Season Tent, Down Jacket, Titanium Stove
  3: [13, 7, 24],
  // Alpine Shell Jacket -> Merino Mid-Layer Fleece, Alpine Trail Pants, Waterproof Dry Bags
  4: [8, 9, 21],
  // Alto Mountain Waterproof Boots -> Merino Wool Hiking Socks, Trekking Poles, Gaiters
  10: [20, 25, 28],
  // Alpine 4-Season Expedition Tent -> Down Sleeping Bag, Insulated Sleeping Pad, Camp Lantern
  13: [14, 15, 16],
  // Down Sleeping Bag -> Insulated Sleeping Pad, Headlamp, First Aid Kit
  14: [15, 18, 22]
};

/**
 * 1. Record a product view in localStorage
 * @param {number} productId 
 */
export function trackProductView(productId) {
  if (!productId) return;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_RECENTLY_VIEWED) || '[]');
    // Filter out previous occurrence and put at the front (most recent first)
    const updated = [productId, ...stored.filter((id) => id !== productId)].slice(0, MAX_RECENT_ITEMS);
    localStorage.setItem(STORAGE_KEY_RECENTLY_VIEWED, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to track product view in storage:', err);
  }
}

/**
 * 2. Get list of recently viewed product objects
 * @param {Array} allProducts 
 * @param {number|null} currentProductId 
 * @param {number} limit 
 * @returns {Array} List of product objects
 */
export function getRecentlyViewed(allProducts = [], currentProductId = null, limit = 4) {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY_RECENTLY_VIEWED) || '[]');
    return ids
      .filter((id) => id !== currentProductId)
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * 3. Get Frequently Paired With gear (Cross-sell in Product Details)
 * @param {Object} product 
 * @param {Array} allProducts 
 * @param {number} limit 
 * @returns {Array} List of paired product objects
 */
export function getFrequentlyPaired(product, allProducts = [], limit = 3) {
  if (!product || !allProducts.length) return [];

  // 1. Check specific curated pairings first
  if (SPECIFIC_PAIRINGS[product.id]) {
    const specificMatches = SPECIFIC_PAIRINGS[product.id]
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean);
    if (specificMatches.length >= limit) {
      return specificMatches.slice(0, limit);
    }
  }

  // 2. Complementary Category Fallback
  const targetCategory = (product.category || product.categoryId || '').toLowerCase();
  const complementaryCats = COMPLEMENTARY_CATEGORIES[targetCategory] || ['accessories', 'clothing'];

  const matches = allProducts.filter((p) => {
    if (p.id === product.id) return false;
    const cat = (p.category || p.categoryId || '').toLowerCase();
    return complementaryCats.includes(cat);
  });

  // Sort by rating & featured status to pick the highest quality companions
  matches.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return matches.slice(0, limit);
}

/**
 * 4. Get Cart Cross-sells (Recommended Add-ons in CartDrawer)
 * @param {Array} cartItems 
 * @param {Array} allProducts 
 * @param {number} limit 
 * @returns {Array}
 */
export function getCartCrossSells(cartItems = [], allProducts = [], limit = 2) {
  if (!allProducts.length) return [];

  const cartProductIds = new Set(cartItems.map((item) => item.product?.id || item.productId));

  // Determine categories present in cart
  const presentCategories = new Set(
    cartItems
      .map((item) => (item.product?.category || item.product?.categoryId || '').toLowerCase())
      .filter(Boolean)
  );

  // Recommend essential accessories and trail gear not already in cart
  const candidates = allProducts.filter((p) => {
    if (cartProductIds.has(p.id)) return false;
    const cat = (p.category || p.categoryId || '').toLowerCase();

    // Prefer accessories or clothing if user is buying packs or camping gear
    if (presentCategories.has('backpacks') || presentCategories.has('camping')) {
      return cat === 'accessories' || cat === 'clothing';
    }
    return p.isFeatured || p.rating >= 4.8;
  });

  candidates.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return candidates.slice(0, limit);
}
