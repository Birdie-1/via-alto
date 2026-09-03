// VIA ALTO Customer Authentication & Marketing Profile Data Helper

const AUTH_USER_KEY = 'via_alto_current_user';
const USERS_DB_KEY = 'via_alto_registered_users';

// Demo initial user account for presentation testing
export const DEMO_USER = {
  id: 'usr_alpine_001',
  fullName: 'Marco Silva',
  email: 'marco@via-alto.com',
  telNo: '089-452-9182',
  password: 'Password123!',
  tier: 'Alpine Ascent Member',
  points: 750,
  dateOfBirth: '1996-05-18',
  joinedDate: '2026-01-15',
  marketingProfile: {
    primaryActivities: ['trekking', 'camping'],
    experienceLevel: 'intermediate',
    sizes: {
      apparel: 'L',
      footwear: '43'
    },
    region: 'northern',
    discoverySource: 'instagram',
    referralCode: 'ALTO-TRAIL',
    lineId: '@marcosilva',
    marketingConsent: true,
    consentTimestamp: '2026-01-15T08:30:00Z'
  },
  vouchers: [
    {
      code: 'GOBEYOND10',
      discount: '10% OFF',
      description: 'Welcome Explorer discount on any first purchase',
      expiresAt: '2026-12-31',
      isValid: true
    },
    {
      code: 'SUMMIT15',
      discount: '15% OFF',
      description: 'Annual VIP Alpine Birthday Reward Voucher',
      expiresAt: '2026-11-30',
      isValid: true
    },
    {
      code: 'FRIEND150',
      discount: '฿150 OFF',
      description: 'Explorer Referral Invitation Reward',
      expiresAt: '2026-12-31',
      isValid: true
    }
  ],
  mockOrders: [
    {
      orderId: 'VA-2026-0894',
      date: '2026-07-12',
      status: 'Delivered',
      items: [
        { name: 'Alpine 35L Backpack', price: 2490, qty: 1, image: '/images/prod_alpine_35l.jpg' },
        { name: 'Summit Trekking Poles', price: 1290, qty: 1, image: '/images/prod_trekking_poles.jpg' }
      ],
      total: 3780
    }
  ]
};

// Initialize localStorage with demo user if empty
export const initializeAuthStore = () => {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(USERS_DB_KEY);
  if (!existing) {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify([DEMO_USER]));
  }
};

// Get all registered users
export const getRegisteredUsers = () => {
  if (typeof window === 'undefined') return [DEMO_USER];
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : [DEMO_USER];
  } catch {
    return [DEMO_USER];
  }
};

// Get current active session
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Save current active session
export const saveCurrentUser = (user) => {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(AUTH_USER_KEY);
  } else {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

// Register a new customer with progressive marketing data
export const registerUser = (formData) => {
  const users = getRegisteredUsers();
  
  // Check if email already exists
  if (users.some((u) => u.email.toLowerCase() === formData.email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }

  const hasReferral = Boolean(formData.referralCode && formData.referralCode.trim());
  const bonusPoints = (formData.marketingProfile?.primaryActivities?.length > 0 ? 200 : 0) + (hasReferral ? 150 : 0);

  const newUser = {
    id: `usr_${Date.now()}`,
    fullName: formData.fullName,
    email: formData.email,
    telNo: formData.telNo || '',
    password: formData.password,
    tier: 'Alpine Ridge Member',
    points: 500 + bonusPoints,
    dateOfBirth: formData.dateOfBirth || '',
    joinedDate: new Date().toISOString().split('T')[0],
    marketingProfile: {
      primaryActivities: formData.marketingProfile?.primaryActivities || [],
      experienceLevel: formData.marketingProfile?.experienceLevel || 'beginner',
      sizes: {
        apparel: formData.marketingProfile?.sizes?.apparel || 'M',
        footwear: formData.marketingProfile?.sizes?.footwear || '42'
      },
      region: formData.marketingProfile?.region || 'central',
      discoverySource: formData.marketingProfile?.discoverySource || 'direct',
      referralCode: formData.referralCode || '',
      lineId: formData.marketingProfile?.lineId || '',
      marketingConsent: formData.marketingConsent ?? true,
      consentTimestamp: new Date().toISOString()
    },
    vouchers: [
      {
        code: 'GOBEYOND10',
        discount: '10% OFF',
        description: 'Welcome Explorer discount on your first order',
        expiresAt: '2026-12-31',
        isValid: true
      },
      ...(formData.dateOfBirth ? [{
        code: 'BIRTHDAY15',
        discount: '15% OFF',
        description: 'Special Annual Alpine Birthday Reward',
        expiresAt: '2026-12-31',
        isValid: true
      }] : []),
      ...(hasReferral ? [{
        code: 'FRIEND150',
        discount: '฿150 OFF',
        description: 'Explorer Referral Invitation Bonus',
        expiresAt: '2026-12-31',
        isValid: true
      }] : [])
    ],
    mockOrders: []
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsers));
  saveCurrentUser(newUser);
  return newUser;
};

// Sign in existing user
export const loginUser = (email, password) => {
  const users = getRegisteredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email address or password.');
  }

  saveCurrentUser(user);
  return user;
};

// Update profile in store and active session
export const updateProfile = (userId, updatedFields) => {
  const users = getRegisteredUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) throw new Error('User not found.');

  const updatedUser = {
    ...users[index],
    ...updatedFields,
    marketingProfile: {
      ...users[index].marketingProfile,
      ...(updatedFields.marketingProfile || {})
    }
  };

  users[index] = updatedUser;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  saveCurrentUser(updatedUser);
  return updatedUser;
};

// Log out
export const logoutUser = () => {
  saveCurrentUser(null);
};
