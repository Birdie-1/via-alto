import { PRODUCTS, CATEGORIES, formatPrice } from './products';
import { assetUrl } from '../utils/assets';

const PRODUCTS_STORAGE_KEY = 'via_alto_custom_products';
const PRODUCTS_UPDATED_EVENT = 'via_alto_products_updated';

/**
 * Get all current products from localStorage or fall back to default PRODUCTS catalog
 * @returns {Array} List of product objects
 */
export const getStoredProducts = () => {
  if (typeof window === 'undefined') return PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return PRODUCTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PRODUCTS;
  } catch (err) {
    console.warn('Failed to parse stored products, falling back to default:', err);
    return PRODUCTS;
  }
};

/**
 * Save products to localStorage and dispatch update event for reactive components
 * @param {Array} products 
 */
export const saveProducts = (products) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: products }));
  } catch (err) {
    console.error('Failed to save products to localStorage:', err);
  }
};

/**
 * Toggle inStock status for a product by ID
 * @param {number} productId 
 * @returns {Array} Updated product list
 */
export const toggleProductStock = (productId) => {
  const products = getStoredProducts();
  const updated = products.map((p) => {
    if (p.id === productId) {
      return { ...p, inStock: !p.inStock };
    }
    return p;
  });
  saveProducts(updated);
  return updated;
};

/**
 * Toggle isFeatured status for a product by ID
 * @param {number} productId 
 * @returns {Array} Updated product list
 */
export const toggleProductFeatured = (productId) => {
  const products = getStoredProducts();
  const updated = products.map((p) => {
    if (p.id === productId) {
      return { ...p, isFeatured: !p.isFeatured };
    }
    return p;
  });
  saveProducts(updated);
  return updated;
};

/**
 * Update an existing product with new field values
 * @param {number} productId 
 * @param {Object} updates 
 * @returns {Array} Updated product list
 */
export const updateProduct = (productId, updates) => {
  const products = getStoredProducts();
  const updated = products.map((p) => {
    if (p.id === productId) {
      return {
        ...p,
        ...updates,
        specs: {
          ...(p.specs || {}),
          ...(updates.specs || {})
        }
      };
    }
    return p;
  });
  saveProducts(updated);
  return updated;
};

/**
 * Add a new product to the catalog
 * @param {Object} newProductData 
 * @returns {Array} Updated product list
 */
export const addProduct = (newProductData) => {
  const products = getStoredProducts();
  const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
  const newId = maxId + 1;

  const categoryObj = CATEGORIES.find(
    (c) => c.id === newProductData.categoryId || c.name === newProductData.category
  ) || CATEGORIES[0];

  const product = {
    id: newId,
    name: newProductData.name || `New Gear #${newId}`,
    name_th: newProductData.name_th || newProductData.name || `สินค้าใหม่ #${newId}`,
    category: categoryObj.name,
    category_th: categoryObj.name_th,
    categoryId: categoryObj.id,
    price: Number(newProductData.price) || 990,
    rating: Number(newProductData.rating) || 5.0,
    reviewsCount: 1,
    shortDesc: newProductData.shortDesc || 'Engineered for alpine technical performance.',
    shortDesc_th: newProductData.shortDesc_th || 'ออกแบบเพื่อประสิทธิภาพระดับแอลไพน์',
    description: newProductData.description || 'Precision crafted gear for alpine exploration.',
    image: newProductData.image ? assetUrl(newProductData.image) : categoryObj.image,
    badge: newProductData.badge || 'NEW',
    badge_th: newProductData.badge_th || 'ใหม่',
    isFeatured: Boolean(newProductData.isFeatured),
    sizes: newProductData.sizes || ['One Size'],
    inStock: newProductData.inStock !== false,
    colors: newProductData.colors || [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: newProductData.image ? assetUrl(newProductData.image) : categoryObj.image }
    ],
    specs: {
      weight: newProductData.weight || '350 g',
      materials: newProductData.materials || 'Technical DWR Ripstop',
      materials_th: newProductData.materials_th || 'ผ้าทอเทคนิคกันน้ำ DWR',
      waterproofRating: newProductData.waterproofRating || 'DWR Weatherproof',
      dimensions: newProductData.dimensions || 'Standard Trail Fit',
      bestUse: newProductData.bestUse || 'Alpine Exploration & Trekking',
      bestUse_th: newProductData.bestUse_th || 'การเดินป่าและปีนเขา'
    }
  };

  const updated = [product, ...products];
  saveProducts(updated);
  return updated;
};

/**
 * Delete a product by ID
 * @param {number} productId 
 * @returns {Array} Updated product list
 */
export const deleteProduct = (productId) => {
  const products = getStoredProducts();
  const updated = products.filter((p) => p.id !== productId);
  saveProducts(updated);
  return updated;
};

/**
 * Reset products catalog back to default 30 PRODUCTS
 * @returns {Array} Default product list
 */
export const resetProductsToDefault = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: PRODUCTS }));
  }
  return PRODUCTS;
};
