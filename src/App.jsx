import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';
import CartDrawer from './components/layout/CartDrawer';
import AuthModal from './components/auth/AuthModal';
import GearFinderModal from './components/finder/GearFinderModal';
import Toast from './components/ui/Toast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import EmailPreviewModal from './components/emails/EmailPreviewModal';
import { sendRegisterWelcomeEmail } from './services/emailService';
import { PRODUCTS } from './data/products';
import {
  initializeAuthStore,
  getCurrentUser,
  loginUser,
  registerUser,
  updateProfile,
  logoutUser,
  createOrder
} from './data/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [shopCategory, setShopCategory] = useState('all');
  const [accountInitialTab, setAccountInitialTab] = useState('overview');
  const [cartItems, setCartItems] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);
  const [wishlist, setWishlist] = useState([1, 4]); // default sample wishlist
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGearFinderOpen, setIsGearFinderOpen] = useState(false);
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false);
  const [emailPreviewTemplate, setEmailPreviewTemplate] = useState('welcome');
  const [authModalTab, setAuthModalTab] = useState('signin');
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Language state (en / th) with localStorage persistence
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('via_alto_lang') || 'en';
    }
    return 'en';
  });

  const handleToggleLang = (newLang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('via_alto_lang', newLang);
    }
    showToast(newLang === 'th' ? 'เปลี่ยนภาษาเป็น ภาษาไทย เรียบร้อยแล้ว' : 'Language switched to English');
  };

  // Initialize auth store and parse deep link parameters on startup
  useEffect(() => {
    initializeAuthStore();
    const stored = getCurrentUser();
    if (stored) {
      setCurrentUser(stored);
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product');
      const pageParam = params.get('page');
      const voucherParam = params.get('voucher');
      const unsubParam = params.get('unsubscribe');
      const catParam = params.get('category');
      const tabParam = params.get('tab');

      // 1. Auto-apply Voucher from Email or Marketing Links
      if (voucherParam) {
        const code = voucherParam.trim().toUpperCase();
        localStorage.setItem('via_alto_active_voucher', code);
        showToast(
          lang === 'th'
            ? `🎉 รหัสส่วนลด ${code} (10% OFF) ถูกเปิดใช้งานแล้ว!`
            : `🎉 Discount code ${code} (10% OFF) auto-applied to your order!`
        );
      }

      // 2. Unsubscribe Confirmation (PDPA compliance)
      if (unsubParam === '1') {
        showToast(
          lang === 'th'
            ? '✅ คุณได้ยกเลิกการรับข่าวสารทางอีเมลเรียบร้อยแล้ว (Unsubscribed)'
            : '✅ You have successfully unsubscribed from newsletter communications.'
        );
      }

      // 3. Product Deep Linking (Direct modal popup)
      if (prodId) {
        const targetProd = PRODUCTS.find((p) => p.id === parseInt(prodId, 10));
        if (targetProd) {
          setQuickViewProduct(targetProd);
          setCurrentPage('shop');
          if (catParam) setShopCategory(catParam);
          return;
        }
      }

      // 4. Direct Page Routing
      if (pageParam) {
        setCurrentPage(pageParam);
        if (catParam) setShopCategory(catParam);
        if (tabParam) setAccountInitialTab(tabParam);
      }
    }
  }, []);

  // Listen to browser Back / Forward popstate
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        if (event.state.params?.category) setShopCategory(event.state.params.category);
        if (event.state.params?.tab) setAccountInitialTab(event.state.params.tab);
      } else if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const p = params.get('page') || 'home';
        setCurrentPage(p);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleNavigate = (page, params = {}, pushToHistory = true) => {
    setCurrentPage(page);
    if (params.category) {
      setShopCategory(params.category);
    }
    if (params.tab) {
      setAccountInitialTab(params.tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync with browser history
    if (pushToHistory && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (page === 'home') {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', page);
      }
      if (params.category) url.searchParams.set('category', params.category);
      else url.searchParams.delete('category');

      if (params.tab) url.searchParams.set('tab', params.tab);
      else url.searchParams.delete('tab');

      // Clear one-time action params
      url.searchParams.delete('product');
      url.searchParams.delete('voucher');
      url.searchParams.delete('unsubscribe');

      const newUrl = url.pathname + (url.search ? url.search : '');
      window.history.pushState({ page, params }, '', newUrl);
    }
  };

  // Auth Handlers
  const handleOpenAuth = (tab = 'signin', redirect = null) => {
    setAuthModalTab(tab);
    if (redirect) setRedirectAfterAuth(redirect);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (credentialsOrUser) => {
    try {
      let loggedUser;
      if (credentialsOrUser.id) {
        // Direct demo user object
        loggedUser = credentialsOrUser;
      } else {
        loggedUser = loginUser(credentialsOrUser.email, credentialsOrUser.password);
      }
      setCurrentUser(loggedUser);
      showToast(lang === 'th' ? `ยินดีต้อนรับกลับ, คุณ ${loggedUser.fullName}!` : `Welcome back, ${loggedUser.fullName}!`);
      setIsAuthModalOpen(false);

      if (redirectAfterAuth) {
        handleNavigate(redirectAfterAuth);
        setRedirectAfterAuth(null);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleRegisterSuccess = (formData) => {
    try {
      const newUser = registerUser(formData);
      setCurrentUser(newUser);

      // Trigger Step 4: register_welcome.php (Personalized Recommendation Email)
      sendRegisterWelcomeEmail(newUser).catch((err) =>
        console.warn('Register welcome email dispatch error:', err)
      );

      showToast(
        lang === 'th'
          ? `สร้างบัญชีสำเร็จ! ยินดีต้อนรับสู่ Explorer Club, คุณ ${newUser.fullName}!`
          : `Account created! Welcome to VIA ALTO Explorer Club, ${newUser.fullName}!`
      );
      setIsAuthModalOpen(false);

      if (redirectAfterAuth) {
        handleNavigate(redirectAfterAuth);
        setRedirectAfterAuth(null);
      } else {
        setCurrentPage('account');
      }
    } catch (err) {
      throw err;
    }
  };

  // Checkout Handlers
  const handleCheckout = () => {
    if (!currentUser) {
      showToast(lang === 'th' ? 'กรุณาเข้าสู่ระบบก่อนดำเนินการชำระเงิน' : 'Please sign in to proceed to checkout.');
      handleOpenAuth('signin', 'checkout');
      return;
    }
    handleNavigate('checkout');
  };

  const handlePlaceOrder = (orderData) => {
    try {
      if (!currentUser) {
        handleOpenAuth('signin', 'checkout');
        return;
      }

      const { updatedUser, order } = createOrder(currentUser.id, orderData);
      setCurrentUser(updatedUser);
      setLastOrder(order);
      setCartItems([]);
      showToast(
        lang === 'th'
          ? `คำสั่งซื้อ #${order.orderId} สำเร็จแล้ว! ได้รับ +${order.pointsEarned} คะแนน`
          : `Order #${order.orderId} confirmed! You earned +${order.pointsEarned} Alpine Points.`
      );
      handleNavigate('confirmation');
    } catch (err) {
      showToast(lang === 'th' ? 'เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ' : 'Failed to place order.');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    showToast(lang === 'th' ? 'คุณได้ออกจากระบบเรียบร้อยแล้ว' : 'You have been signed out.');
    setCurrentPage('home');
  };

  const handleUpdateProfile = (userId, updatedFields) => {
    try {
      const updated = updateProfile(userId, updatedFields);
      setCurrentUser(updated);
      showToast(lang === 'th' ? 'บันทึกการตั้งค่าโปรไฟล์เรียบร้อย' : 'Profile preferences updated.');
    } catch (err) {
      showToast(lang === 'th' ? 'เกิดข้อผิดพลาดในการบันทึกโปรไฟล์' : 'Failed to update profile.');
    }
  };

  // Add to Bag handler (Single item)
  const handleAddToCart = (product, quantity = 1, size = null, color = null) => {
    const selectedSize = size || product.sizes?.[0] || 'Standard';
    const selectedColor = color || product.selectedColor || product.colors?.[0] || null;
    const colorId = selectedColor?.id || 'default';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          (item.selectedColor?.id || 'default') === colorId
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize, selectedColor }];
      }
    });

    const pName = lang === 'th' ? product.name_th || product.name : product.name;
    const cName = selectedColor ? ` (${lang === 'th' ? selectedColor.name_th || selectedColor.name : selectedColor.name})` : '';
    showToast(lang === 'th' ? `เพิ่ม "${pName}${cName}" ลงในถุงสินค้าแล้ว` : `Added "${pName}${cName}" to your bag`);
  };

  // Add to Bag Batch handler (from Gear Finder)
  const handleAddToCartBatch = (items = []) => {
    setCartItems((prev) => {
      let updated = [...prev];
      items.forEach(({ product, quantity = 1, selectedSize = 'Standard', selectedColor = null }) => {
        const color = selectedColor || product.colors?.[0] || null;
        const colorId = color?.id || 'default';
        const existingIndex = updated.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            (item.selectedColor?.id || 'default') === colorId
        );
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity
          };
        } else {
          updated.push({ product, quantity, selectedSize, selectedColor: color });
        }
      });
      return updated;
    });

    showToast(
      lang === 'th'
        ? `เพิ่มชุดอุปกรณ์ที่แนะนำ ${items.length} ชิ้นลงในถุงสินค้าแล้ว!`
        : `Added ${items.length} recommended kit items to your bag!`
    );
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId, selectedSize, selectedColorId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, selectedSize, selectedColorId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === selectedSize &&
        (item.selectedColor?.id || 'default') === (selectedColorId || 'default')
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId, selectedSize, selectedColorId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            (item.selectedColor?.id || 'default') === (selectedColorId || 'default')
          )
      )
    );
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast(lang === 'th' ? 'นำออกจากรายการที่บันทึกแล้ว' : 'Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(lang === 'th' ? 'บันทึกรายการลงใน Wishlist แล้ว' : 'Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleOpenEmailPreview = (template = 'welcome') => {
    setEmailPreviewTemplate(template);
    setIsEmailPreviewOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#292B28] font-sans selection:bg-[#183C32] selection:text-white">
      {/* 1. Sticky Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => handleOpenAuth('signin')}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onSelectProduct={(product) => {
              setQuickViewProduct(product);
              handleNavigate('shop');
            }}
            onOpenGearFinder={() => setIsGearFinderOpen(true)}
            onOpenEmailPreview={handleOpenEmailPreview}
            lang={lang}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={shopCategory}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            quickViewProduct={quickViewProduct}
            setQuickViewProduct={setQuickViewProduct}
            onOpenGearFinder={() => setIsGearFinderOpen(true)}
            lang={lang}
          />
        )}

        {currentPage === 'account' && (
          <AccountPage
            user={currentUser}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            onOpenEmailPreview={handleOpenEmailPreview}
            initialTab={accountInitialTab}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            user={currentUser}
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'confirmation' && (
          <OrderConfirmationPage
            order={lastOrder}
            user={currentUser}
            onNavigate={(page) => {
              if (page === 'account') {
                setAccountInitialTab('orders');
              }
              handleNavigate(page);
            }}
            lang={lang}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEmailPreview={handleOpenEmailPreview}
        lang={lang}
      />

      {/* 4. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
          handleNavigate('shop');
        }}
        onNavigateToShop={() => handleNavigate('shop')}
        lang={lang}
      />

      {/* 5. Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onNavigateToShop={() => handleNavigate('shop')}
        onCheckout={handleCheckout}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* 6. Authentication Modal (Sign In / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* 7. Interactive Gear Finder & Product Recommender Modal */}
      <GearFinderModal
        isOpen={isGearFinderOpen}
        onClose={() => setIsGearFinderOpen(false)}
        onAddToCartBatch={handleAddToCartBatch}
        lang={lang}
      />

      {/* 8. Email Template Preview Modal */}
      <EmailPreviewModal
        isOpen={isEmailPreviewOpen}
        onClose={() => setIsEmailPreviewOpen(false)}
        initialTemplate={emailPreviewTemplate}
        lang={lang}
        user={currentUser}
        onNavigate={handleNavigate}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
          handleNavigate('shop');
          setIsEmailPreviewOpen(false);
        }}
        onApplyVoucher={(code) => {
          localStorage.setItem('via_alto_active_voucher', code);
          showToast(`🎉 รหัสส่วนลด ${code} (10% OFF) ถูกนำมาใช้งานแล้ว!`);
        }}
      />

      {/* 9. Toast Notification */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
