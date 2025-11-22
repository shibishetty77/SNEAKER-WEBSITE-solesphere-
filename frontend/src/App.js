import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import { ResellProvider } from './context/ResellContext';
import { ReviewProvider } from './context/ReviewContext';
import { UserTrackingProvider } from './context/UserTrackingContext';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ResellPortalPage from './pages/ResellPortalPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import AdminStoreView from './pages/admin/AdminStoreView';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <ResellProvider>
                  <ReviewProvider>
                    <UserTrackingProvider>
              <div className="App">
            <Routes>
              {/* Admin Routes - No Navbar - Protected */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/products/add" element={<AdminRoute><AddProduct /></AdminRoute>} />
              <Route path="/admin/store" element={<AdminRoute><AdminStoreView /></AdminRoute>} />
              
              {/* Customer Routes - With Navbar */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/resell" element={<ResellPortalPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
                </>
              } />
            </Routes>
                  </div>
                    </UserTrackingProvider>
                  </ReviewProvider>
                </ResellProvider>
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
