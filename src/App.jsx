import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';
import CartDrawer from './components/layout/CartDrawer';
import AuthModal from './components/auth/AuthModal';
import Toast from './components/ui/Toast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AccountPage from './pages/AccountPage';
import {
  initializeAuthStore,
  getCurrentUser,
  loginUser,
  registerUser,
  updateProfile,
  logoutUser
} from './data/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [shopCategory, setShopCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([1, 4]); // default sample wishlist
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin');
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Initialize auth store on startup
  useEffect(() => {
    initializeAuthStore();
    const stored = getCurrentUser();
    if (stored) {
      setCurrentUser(stored);
    }
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    if (params.category) {
      setShopCategory(params.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers
  const handleOpenAuth = (tab = 'signin') => {
    setAuthModalTab(tab);
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
      showToast(`Welcome back, ${loggedUser.fullName}!`);
      setIsAuthModalOpen(false);
    } catch (err) {
      throw err;
    }
  };

  const handleRegisterSuccess = (formData) => {
    try {
      const newUser = registerUser(formData);
      setCurrentUser(newUser);
      showToast(`Account created! Welcome to VIA ALTO Explorer Club, ${newUser.fullName}!`);
      setIsAuthModalOpen(false);
      setCurrentPage('account');
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    showToast('You have been signed out.');
    setCurrentPage('home');
  };

  const handleUpdateProfile = (userId, updatedFields) => {
    try {
      const updated = updateProfile(userId, updatedFields);
      setCurrentUser(updated);
      showToast('Profile preferences updated.');
    } catch (err) {
      showToast('Failed to update profile.');
    }
  };

  // Add to Bag handler
  const handleAddToCart = (product, quantity = 1, size = null) => {
    const selectedSize = size || product.sizes?.[0] || 'Standard';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize }];
      }
    });

    showToast(`Added "${product.name}" to your bag`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, selectedSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
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
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
          handleNavigate('shop');
        }}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      {/* 5. Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      {/* 6. Authentication Modal (Sign In / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* 7. Toast Notification */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
