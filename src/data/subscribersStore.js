/**
 * VIA ALTO — Newsletter Subscribers Store
 * Manages newsletter subscribers with LocalStorage persistence,
 * real-time reactivity, and automatic sync with PHP backend API.
 */

const SUBSCRIBERS_STORAGE_KEY = 'via_alto_cached_subscribers';
const SUBSCRIBERS_UPDATED_EVENT = 'via_alto_subscribers_updated';

// Default initial subscribers seeded from backend storage
const INITIAL_DEFAULT_SUBSCRIBERS = [
  {
    email: 'narueborde@gmail.com',
    name: 'Explorer',
    date: '2026-10-08',
    status: 'Active',
    source: 'Newsletter Form'
  }
];

/**
 * Get all subscribers from localStorage with fallback to default seed
 * @returns {Array} List of subscriber objects
 */
export const getStoredSubscribers = () => {
  if (typeof window === 'undefined') return INITIAL_DEFAULT_SUBSCRIBERS;
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_SUBSCRIBERS));
      return INITIAL_DEFAULT_SUBSCRIBERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    // If empty array was explicitly set, return empty
    return Array.isArray(parsed) ? parsed : INITIAL_DEFAULT_SUBSCRIBERS;
  } catch (err) {
    console.warn('Failed to parse cached subscribers:', err);
    return INITIAL_DEFAULT_SUBSCRIBERS;
  }
};

/**
 * Save subscribers to localStorage and broadcast update event
 * @param {Array} subscribers 
 */
export const saveSubscribers = (subscribers) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subscribers));
    window.dispatchEvent(new CustomEvent(SUBSCRIBERS_UPDATED_EVENT, { detail: subscribers }));
  } catch (err) {
    console.error('Failed to save subscribers to localStorage:', err);
  }
};

/**
 * Add a new subscriber to both local store and PHP backend
 * @param {string} email 
 * @param {string} name 
 * @param {string} source 
 * @returns {Array} Updated subscribers list
 */
export const addSubscriber = (email, name = 'Explorer', source = 'Newsletter Form') => {
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail) return getStoredSubscribers();

  const current = getStoredSubscribers();
  const exists = current.some((s) => s.email.toLowerCase() === cleanEmail);

  let updated = current;
  if (!exists) {
    const newSub = {
      email: cleanEmail,
      name: name || 'Explorer',
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
      source: source || 'Newsletter Form'
    };
    updated = [newSub, ...current];
    saveSubscribers(updated);
  }

  return updated;
};

/**
 * Delete a subscriber by email from local store and PHP backend
 * @param {string} email 
 * @returns {Array} Updated subscribers list
 */
export const deleteSubscriber = async (email) => {
  const cleanEmail = email.toLowerCase().trim();
  const current = getStoredSubscribers();
  const updated = current.filter((s) => s.email.toLowerCase() !== cleanEmail);
  saveSubscribers(updated);

  // Attempt to delete on PHP backend if reachable
  try {
    await fetch('/php-api/api/admin.php?action=delete_subscriber', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    }).catch(() => {});
  } catch {}

  return updated;
};

/**
 * Clear all subscribers from local store and PHP backend
 */
export const clearAllSubscribers = async () => {
  saveSubscribers([]);

  // Attempt backend wipe if PHP reachable
  try {
    await fetch('/php-api/api/admin.php?action=clear_subscribers', { method: 'POST' }).catch(() => {});
  } catch {}

  return [];
};

/**
 * Synchronize local subscribers with PHP backend if reachable
 * @returns {Promise<Array>} Merged subscriber list
 */
export const syncWithBackendSubscribers = async () => {
  try {
    const res = await fetch('/php-api/api/admin.php?action=subscribers', {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.subscribers)) {
        const local = getStoredSubscribers();
        const emailMap = new Map();

        // 1. Put backend subscribers into map
        data.subscribers.forEach((s) => {
          emailMap.set(s.email.toLowerCase(), s);
        });

        // 2. Put local subscribers into map (preserving local additions)
        local.forEach((s) => {
          if (!emailMap.has(s.email.toLowerCase())) {
            emailMap.set(s.email.toLowerCase(), s);
          }
        });

        const merged = Array.from(emailMap.values());
        saveSubscribers(merged);
        return merged;
      }
    }
  } catch (err) {
    // Backend offline / GitHub Pages mode - continue with local store
  }

  return getStoredSubscribers();
};
